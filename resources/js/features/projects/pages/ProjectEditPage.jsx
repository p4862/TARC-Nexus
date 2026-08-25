import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { ConfirmActionDialog } from "@/components/feedback/ConfirmActionDialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { MediaManager } from "@/features/projects/components/MediaManager";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { ProjectPageHeader } from "@/features/projects/components/ProjectPageHeader";
import { ProjectStatusBadge } from "@/features/projects/components/ProjectStatusBadge";
import {
  fetchOwnedProject,
  fetchProjectTaxonomies,
  submitProject,
  updateProject,
} from "@/features/projects/services/projectApi";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

export function ProjectEditPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [taxonomies, setTaxonomies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(location.state?.message || "");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [pendingSubmissionPayload, setPendingSubmissionPayload] =
    useState(null);

  useEffect(() => {
    Promise.all([
      fetchOwnedProject(projectId),
      fetchProjectTaxonomies(),
    ])
      .then(([projectData, taxonomyData]) => {
        setProject(projectData);
        setTaxonomies(taxonomyData);
      })
      .catch((requestError) => {
        setError(
          getApiErrorMessage(requestError, "Unable to load this project.")
        );
      })
      .finally(() => setIsLoading(false));
  }, [projectId]);

  async function handleSave(payload) {
    setIsSaving(true);
    setMessage("");
    setError("");
    setErrors({});

    try {
      const updated = await updateProject(projectId, payload);
      setProject(updated);
      setMessage("Project draft saved successfully.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to save the project draft.")
      );
      setErrors(getValidationErrors(requestError));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSubmitForReview() {
    if (!pendingSubmissionPayload) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setError("");
    setErrors({});

    try {
      await updateProject(projectId, pendingSubmissionPayload);
      const submitted = await submitProject(projectId);
      setProject(submitted);
      setMessage("Project submitted for review successfully.");
      setPendingSubmissionPayload(null);
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to submit the project.")
      );
      setErrors(getValidationErrors(requestError));
      setPendingSubmissionPayload(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isLocked = project?.status !== "Draft";

  return (
    <section className="page-section-compact bg-muted/30">
      <div className="mx-auto grid max-w-[1024px] gap-8 px-4 sm:px-6 lg:px-8">
        <ProjectPageHeader
          eyebrow={isLocked ? "Project submission" : "Draft workspace"}
          title={project?.title || "Manage project"}
          description={
            isLocked
              ? "Review the read-only project and media while it moves through the approved workflow."
              : "Work through every section, save persisted changes, manage media, and submit from the final review step."
          }
          actions={
            project ? <ProjectStatusBadge status={project.status} /> : null
          }
        />

        {message ? (
          <Alert className="border-border bg-cream-card">
            <CheckCircle2
              aria-hidden="true"
              className="text-foreground"
            />
            <AlertTitle className="text-foreground">Project updated</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}
        {error ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Project action failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {isLoading ? (
          <div
            className="rounded-xl border border-border bg-background p-8 text-center text-muted-foreground"
            role="status"
          >
            Loading project...
          </div>
        ) : project && taxonomies ? (
          <ProjectForm
            initialProject={project}
            taxonomies={taxonomies}
            onSubmit={handleSave}
            isSubmitting={isSaving}
            errors={errors}
            disabled={isLocked}
            mediaContent={
              <MediaManager
                projectId={project.id}
                media={project.media}
                onChange={(media) =>
                  setProject((current) => ({ ...current, media }))
                }
                disabled={isLocked}
              />
            }
            onRequestSubmission={setPendingSubmissionPayload}
            isSubmittingForReview={isSubmitting}
          />
        ) : null}

        <ConfirmActionDialog
          open={Boolean(pendingSubmissionPayload)}
          onOpenChange={(open) => {
            if (!open && !isSubmitting) {
              setPendingSubmissionPayload(null);
            }
          }}
          title="Submit project for review?"
          description={
            project
              ? `"${project.title}" will be saved, moved to Submitted, and locked with its media while it is reviewed.`
              : ""
          }
          confirmLabel="Save and submit"
          isPending={isSubmitting}
          onConfirm={handleSubmitForReview}
          destructive={false}
        />
      </div>
    </section>
  );
}
