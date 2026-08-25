import {
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Save,
  Send,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectTaxonomyFields } from "@/features/projects/components/ProjectTaxonomyFields";
import { TeamMembersEditor } from "@/features/projects/components/TeamMembersEditor";

const STORY_FIELDS = [
  ["abstract", "Abstract", "A concise summary of the project."],
  [
    "problem_statement",
    "Problem statement",
    "Describe the identified problem.",
  ],
  [
    "proposed_solution",
    "Proposed solution",
    "Explain how the project addresses the problem.",
  ],
  [
    "objectives",
    "Objectives",
    "List the outcomes the project intends to achieve.",
  ],
  [
    "target_users",
    "Target users",
    "Describe the intended users or communities.",
  ],
  [
    "expected_impact",
    "Expected impact",
    "Explain the expected benefits and tourism impact.",
  ],
];

const LINK_FIELDS = [
  ["github_url", "GitHub repository", "https://github.com/..."],
  ["demo_url", "Live demo", "https://..."],
  ["figma_url", "Figma design", "https://www.figma.com/..."],
  ["video_url", "YouTube or Vimeo video", "https://youtu.be/..."],
];

const FIELD_STEPS = {
  category_id: "basics",
  title: "basics",
  subtitle: "basics",
  team_name: "basics",
  abstract: "narrative",
  problem_statement: "narrative",
  proposed_solution: "narrative",
  objectives: "narrative",
  target_users: "narrative",
  expected_impact: "narrative",
  sdgs: "sustainability",
  technology_ids: "sustainability",
  members: "team",
  methodology: "team",
  system_architecture: "team",
  github_url: "review",
  demo_url: "review",
  figma_url: "review",
  video_url: "review",
};

function initialForm(project) {
  return {
    category_id: String(project?.category?.id || ""),
    title: project?.title || "",
    subtitle: project?.subtitle || "",
    team_name: project?.team_name || "",
    abstract: project?.abstract || "",
    problem_statement: project?.problem_statement || "",
    proposed_solution: project?.proposed_solution || "",
    objectives: project?.objectives || "",
    target_users: project?.target_users || "",
    expected_impact: project?.expected_impact || "",
    methodology: project?.methodology || "",
    system_architecture: project?.system_architecture || "",
    github_url: project?.github_url || "",
    demo_url: project?.demo_url || "",
    figma_url: project?.figma_url || "",
    video_url: project?.video_url || "",
    members: (project?.members || []).map((member) => ({
      student_name: member.student_name,
      matric_number: member.matric_number,
      programme: member.programme,
      supervisor: member.supervisor,
    })),
    sdgs: (project?.sdgs || []).map((sdg) => ({
      id: String(sdg.id),
      contribution_description: sdg.contribution_description,
    })),
    technology_ids: (project?.technologies || []).map((technology) =>
      String(technology.id)
    ),
  };
}

function payloadFromForm(form) {
  return {
    ...form,
    category_id: Number(form.category_id),
    sdgs: form.sdgs.map((sdg) => ({
      id: Number(sdg.id),
      contribution_description: sdg.contribution_description,
    })),
    technology_ids: form.technology_ids.map(Number),
  };
}

function isFilled(value) {
  return String(value || "").trim().length > 0;
}

function isStepComplete(stepId, form) {
  switch (stepId) {
    case "basics":
      return isFilled(form.title) && isFilled(form.category_id);
    case "narrative":
      return STORY_FIELDS.every(([field]) => isFilled(form[field]));
    case "sustainability":
      return (
        form.sdgs.length > 0 &&
        form.sdgs.every((sdg) => isFilled(sdg.contribution_description))
      );
    case "team":
      return (
        isFilled(form.methodology) &&
        isFilled(form.system_architecture) &&
        form.members.every((member) =>
          [
            member.student_name,
            member.matric_number,
            member.programme,
            member.supervisor,
          ].every(isFilled)
        )
      );
    default:
      return true;
  }
}

function ReviewRow({ label, children }) {
  return (
    <div className="grid gap-1 border-b border-border py-3 last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
      <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-sm text-foreground">{children || "-"}</dd>
    </div>
  );
}

function WorkflowStepper({
  steps,
  activeIndex,
  furthestStep,
  canVisitAll,
  onStepChange,
}) {
  return (
    <nav aria-label="Project workflow" className="min-w-0 max-w-full overflow-hidden">
      <ol className="scrollbar-none flex w-full max-w-full items-center overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const complete = index < activeIndex;
          const active = index === activeIndex;
          const canVisit = canVisitAll || index <= furthestStep;

          return (
            <li
              key={step.id}
              className="flex shrink-0 items-center last:pr-2"
            >
              <button
                type="button"
                className="flex min-h-11 items-center gap-2 rounded-lg px-1 text-left disabled:cursor-not-allowed"
                aria-current={active ? "step" : undefined}
                disabled={!canVisit}
                onClick={() => onStepChange(index)}
              >
                <span
                  className={[
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                    active
                      ? "bg-pin-red-500 text-white"
                      : complete
                        ? "bg-ink-900 text-white"
                        : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  {complete ? (
                    <Check aria-hidden="true" className="size-4" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={[
                    "hidden text-sm font-semibold sm:block",
                    active ? "text-foreground" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </button>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={[
                    "mx-2 h-px w-8 sm:w-10",
                    index < activeIndex ? "bg-primary" : "bg-border",
                  ].join(" ")}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-sm font-semibold text-foreground sm:hidden">
        Step {activeIndex + 1} of {steps.length}: {steps[activeIndex].label}
      </p>
    </nav>
  );
}

export function ProjectForm({
  initialProject,
  taxonomies,
  onSubmit,
  isSubmitting,
  errors = {},
  disabled = false,
  submitLabel = "Save draft",
  mediaContent = null,
  onRequestSubmission,
  isSubmittingForReview = false,
}) {
  const [form, setForm] = useState(() => initialForm(initialProject));
  const [activeIndex, setActiveIndex] = useState(0);
  const [furthestStep, setFurthestStep] = useState(
    initialProject ? Number.MAX_SAFE_INTEGER : 0
  );
  const [stepError, setStepError] = useState("");
  const formRef = useRef(null);
  const hasMediaStep = Boolean(mediaContent);
  const steps = useMemo(
    () => [
      { id: "basics", label: "Basic info" },
      { id: "narrative", label: "Narrative" },
      { id: "sustainability", label: "SDGs & technology" },
      { id: "team", label: "Team & development" },
      ...(hasMediaStep ? [{ id: "media", label: "Media" }] : []),
      { id: "review", label: "Review" },
    ],
    [hasMediaStep]
  );
  const activeStep = steps[activeIndex];
  const reviewIndex = steps.findIndex((step) => step.id === "review");

  useEffect(() => {
    const firstError = Object.keys(errors)[0];

    if (!firstError) {
      return;
    }

    const baseField = firstError.split(".")[0];
    const targetStep = FIELD_STEPS[baseField];
    const targetIndex = steps.findIndex((step) => step.id === targetStep);

    if (targetIndex >= 0) {
      setActiveIndex(targetIndex);
      setFurthestStep((current) => Math.max(current, targetIndex));
    }
  }, [errors, steps]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function visitStep(index) {
    if (disabled || initialProject || index <= furthestStep) {
      setStepError("");
      setActiveIndex(index);
    }
  }

  function handleContinue() {
    if (!isStepComplete(activeStep.id, form)) {
      setStepError(
        "Complete the required fields in this step before continuing."
      );
      formRef.current?.reportValidity();
      return;
    }

    const nextIndex = Math.min(activeIndex + 1, steps.length - 1);
    setStepError("");
    setFurthestStep((current) => Math.max(current, nextIndex));
    setActiveIndex(nextIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setStepError("");
    setActiveIndex((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function findIncompleteStep() {
    return steps.findIndex(
      (step) => step.id !== "media" && !isStepComplete(step.id, form)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const incompleteStep = findIncompleteStep();

    if (incompleteStep >= 0) {
      setActiveIndex(incompleteStep);
      setFurthestStep((current) => Math.max(current, incompleteStep));
      setStepError(
        "Complete the required fields in this step before saving the draft."
      );
      return;
    }

    setStepError("");
    await onSubmit(payloadFromForm(form));
  }

  function handleRequestSubmission() {
    const incompleteStep = findIncompleteStep();

    if (incompleteStep >= 0) {
      setActiveIndex(incompleteStep);
      setStepError(
        "Complete the required fields in this step before submitting for review."
      );
      return;
    }

    onRequestSubmission?.(payloadFromForm(form));
  }

  const selectedCategory = taxonomies.categories.find(
    (category) => String(category.id) === form.category_id
  );
  const selectedTechnologies = taxonomies.technologies.filter((technology) =>
    form.technology_ids.includes(String(technology.id))
  );
  const selectedSdgs = taxonomies.sdgs.filter((sdg) =>
    form.sdgs.some((item) => item.id === String(sdg.id))
  );
  const providedLinks = LINK_FIELDS.filter(([field]) => isFilled(form[field]));
  const isBusy = isSubmitting || isSubmittingForReview;
  const showForm = activeStep.id !== "media";

  return (
    <div className="grid min-w-0 gap-6">
      <WorkflowStepper
        steps={steps}
        activeIndex={activeIndex}
        furthestStep={furthestStep}
        canVisitAll={Boolean(initialProject)}
        onStepChange={visitStep}
      />

      {stepError ? (
        <p
          className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
          role="alert"
        >
          {stepError}
        </p>
      ) : null}

      {showForm ? (
        <form
          id="project-workflow-form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <fieldset disabled={disabled || isBusy}>
            {activeStep.id === "basics" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Basic information</CardTitle>
                  <CardDescription>
                    Name the project, identify the team, and choose its solution
                    category.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    id="title"
                    label="Project title"
                    error={errors.title?.[0]}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        value={form.title}
                        maxLength={255}
                        onChange={(event) =>
                          updateField("title", event.target.value)
                        }
                        required
                      />
                    )}
                  </FormField>
                  <FormField
                    id="subtitle"
                    label="Project subtitle"
                    hint="Optional"
                    error={errors.subtitle?.[0]}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        value={form.subtitle}
                        maxLength={255}
                        onChange={(event) =>
                          updateField("subtitle", event.target.value)
                        }
                      />
                    )}
                  </FormField>
                  <FormField
                    id="team_name"
                    label="Team name"
                    hint="Optional for individual exhibitors"
                    error={errors.team_name?.[0]}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        value={form.team_name}
                        maxLength={255}
                        onChange={(event) =>
                          updateField("team_name", event.target.value)
                        }
                      />
                    )}
                  </FormField>
                  <FormField
                    id="category_id"
                    label="Solution category"
                    error={errors.category_id?.[0]}
                  >
                    {(fieldProps) => (
                      <select
                        {...fieldProps}
                        value={form.category_id}
                        className="flex min-h-11 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
                        onChange={(event) =>
                          updateField("category_id", event.target.value)
                        }
                        required
                      >
                        <option value="">Select a category</option>
                        {taxonomies.categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </FormField>
                </CardContent>
              </Card>
            ) : null}

            {activeStep.id === "narrative" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Project narrative</CardTitle>
                  <CardDescription>
                    Explain the need, solution, audience, and expected benefits.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-5">
                  {STORY_FIELDS.map(([field, label, hint]) => (
                    <FormField
                      key={field}
                      id={field}
                      label={label}
                      hint={hint}
                      error={errors[field]?.[0]}
                    >
                      {(fieldProps) => (
                        <Textarea
                          {...fieldProps}
                          value={form[field]}
                          maxLength={10000}
                          onChange={(event) =>
                            updateField(field, event.target.value)
                          }
                          required
                          className="min-h-32"
                        />
                      )}
                    </FormField>
                  ))}
                </CardContent>
              </Card>
            ) : null}

            {activeStep.id === "sustainability" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Taxonomies and SDG contributions</CardTitle>
                  <CardDescription>
                    Connect the project to VM2026 sustainability goals and the
                    technologies actually used.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectTaxonomyFields
                    form={form}
                    setForm={setForm}
                    taxonomies={taxonomies}
                    errors={errors}
                    disabled={disabled || isBusy}
                    showCategory={false}
                  />
                </CardContent>
              </Card>
            ) : null}

            {activeStep.id === "team" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Team and development information</CardTitle>
                  <CardDescription>
                    Record delivery details and the students and supervisor
                    behind the work.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <div className="grid gap-5">
                    <FormField
                      id="methodology"
                      label="Development methodology"
                      error={errors.methodology?.[0]}
                    >
                      {(fieldProps) => (
                        <Textarea
                          {...fieldProps}
                          value={form.methodology}
                          maxLength={10000}
                          onChange={(event) =>
                            updateField("methodology", event.target.value)
                          }
                          required
                          className="min-h-32"
                        />
                      )}
                    </FormField>
                    <FormField
                      id="system_architecture"
                      label="System architecture"
                      error={errors.system_architecture?.[0]}
                    >
                      {(fieldProps) => (
                        <Textarea
                          {...fieldProps}
                          value={form.system_architecture}
                          maxLength={10000}
                          onChange={(event) =>
                            updateField(
                              "system_architecture",
                              event.target.value
                            )
                          }
                          required
                          className="min-h-32"
                        />
                      )}
                    </FormField>
                  </div>
                  <div className="border-t border-border pt-8">
                    <TeamMembersEditor
                      members={form.members}
                      onChange={(members) => updateField("members", members)}
                      errors={errors}
                      disabled={disabled || isBusy}
                    />
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {activeStep.id === "review" ? (
              <Card>
                <CardHeader>
                  <CardTitle>External links and review</CardTitle>
                  <CardDescription>
                    Add the documented links, then review the persisted project
                    information before saving or submitting.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {LINK_FIELDS.map(([field, label, placeholder]) => (
                      <FormField
                        key={field}
                        id={field}
                        label={label}
                        hint="Optional"
                        error={errors[field]?.[0]}
                      >
                        {(fieldProps) => (
                          <Input
                            {...fieldProps}
                            type="url"
                            placeholder={placeholder}
                            value={form[field]}
                            maxLength={2048}
                            onChange={(event) =>
                              updateField(field, event.target.value)
                            }
                          />
                        )}
                      </FormField>
                    ))}
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Project review
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Confirm the supported project details before the final
                      transition.
                    </p>
                    <dl className="mt-4">
                      <ReviewRow label="Project title">{form.title}</ReviewRow>
                      <ReviewRow label="Subtitle">{form.subtitle}</ReviewRow>
                      <ReviewRow label="Team name">{form.team_name}</ReviewRow>
                      <ReviewRow label="Category">
                        {selectedCategory?.name}
                      </ReviewRow>
                      <ReviewRow label="Abstract">{form.abstract}</ReviewRow>
                      <ReviewRow label="SDG alignment">
                        {selectedSdgs.length > 0
                          ? selectedSdgs
                              .map((sdg) => `SDG ${sdg.code}`)
                              .join(", ")
                          : "-"}
                      </ReviewRow>
                      <ReviewRow label="Technologies">
                        {selectedTechnologies.length > 0
                          ? selectedTechnologies
                              .map((technology) => technology.name)
                              .join(", ")
                          : "None selected"}
                      </ReviewRow>
                      <ReviewRow label="Team members">
                        {form.members.length === 0
                          ? "Individual project"
                          : `${form.members.length} member${form.members.length === 1 ? "" : "s"}`}
                      </ReviewRow>
                      <ReviewRow label="External links">
                        {providedLinks.length > 0 ? (
                          <span className="flex flex-wrap gap-x-4 gap-y-2">
                            {providedLinks.map(([field, label]) => (
                              <span
                                key={field}
                                className="inline-flex items-center gap-1"
                              >
                                <ExternalLink
                                  aria-hidden="true"
                                  className="size-4"
                                />
                                {label}
                              </span>
                            ))}
                          </span>
                        ) : (
                          "None provided"
                        )}
                      </ReviewRow>
                    </dl>
                  </div>

                  {initialProject && !disabled ? (
                    <div className="rounded-xl border border-border bg-cream-card p-4">
                      <p className="font-semibold text-foreground">
                        Submission is final for this workflow.
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Saving and submitting moves this draft to Submitted and
                        locks project details and media while it is reviewed.
                      </p>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}
          </fieldset>
        </form>
      ) : (
        mediaContent
      )}

      <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          {activeIndex > 0 ? (
            <Button
              type="button"
              variant="secondary"
              disabled={isBusy}
              onClick={handleBack}
            >
              <ChevronLeft aria-hidden="true" />
              Back
            </Button>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          {initialProject && !disabled && activeStep.id !== "media" ? (
            <Button
              type="submit"
              form="project-workflow-form"
              variant={activeIndex === reviewIndex ? "outline" : "secondary"}
              disabled={isBusy}
            >
              <Save aria-hidden="true" />
              {isSubmitting ? "Saving draft..." : submitLabel}
            </Button>
          ) : null}

          {activeIndex < reviewIndex ? (
            <Button
              type="button"
              disabled={isBusy}
              onClick={handleContinue}
            >
              Continue
              <ChevronRight aria-hidden="true" />
            </Button>
          ) : !initialProject && !disabled ? (
            <Button
              type="submit"
              form="project-workflow-form"
              disabled={isBusy}
            >
              <Save aria-hidden="true" />
              {isSubmitting ? "Creating draft..." : submitLabel}
            </Button>
          ) : initialProject && !disabled && onRequestSubmission ? (
            <Button
              type="button"
              disabled={isBusy}
              onClick={handleRequestSubmission}
            >
              <Send aria-hidden="true" />
              {isSubmittingForReview
                ? "Submitting..."
                : "Save and submit for review"}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
