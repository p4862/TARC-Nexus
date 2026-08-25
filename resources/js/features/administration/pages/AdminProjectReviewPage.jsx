import {
  AlertCircle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  Eye,
  Heart,
  MessageCircle,
  Send,
  Star,
  Vote,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  approveAdminProject,
  featureAdminProject,
  fetchAdminProject,
  publishAdminProject,
  startAdminProjectReview,
} from "@/features/administration/services/administrationApi";
import { MediaGallery } from "@/features/exhibition/components/MediaGallery";
import { TechnologyChip } from "@/features/exhibition/components/TechnologyChip";
import { CategoryBadge } from "@/features/projects/components/CategoryBadge";
import { ProjectStatusBadge } from "@/features/projects/components/ProjectStatusBadge";
import { SdgBadge } from "@/features/projects/components/SdgBadge";
import { getApiErrorMessage } from "@/utils/apiError";

function localDateTimeValue(date = new Date()) {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);

  return local.toISOString().slice(0, 16);
}

function DetailSection({ title, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="leading-relaxed text-muted-foreground">
        {children}
      </CardContent>
    </Card>
  );
}

export function AdminProjectReviewPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [publishedAt, setPublishedAt] = useState(localDateTimeValue());
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchAdminProject(projectId)
      .then((data) => {
        if (active) {
          setProject(data);
          setReviewNotes(data.review_notes || "");
          if (data.published_at) {
            setPublishedAt(localDateTimeValue(new Date(data.published_at)));
          }
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "Unable to load the project submission."
            )
          );
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [projectId]);

  async function runAction(action, successMessage) {
    setIsProcessing(true);
    setError("");
    setMessage("");

    try {
      const updated = await action();
      setProject(updated);
      setReviewNotes(updated.review_notes || "");
      setMessage(successMessage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to update this project.")
      );
    } finally {
      setIsProcessing(false);
    }
  }

  if (isLoading) {
    return (
      <div
        className="rounded-xl border border-border bg-background p-8 text-center text-muted-foreground"
        role="status"
      >
        Loading project submission…
      </div>
    );
  }

  if (!project) {
    return (
      <Alert variant="destructive">
        <AlertCircle aria-hidden="true" />
        <AlertTitle>Submission unavailable</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-8">
      <div>
        <Button variant="link" asChild className="mb-4 px-0">
          <Link to="/administrator/projects">
            <ArrowLeft aria-hidden="true" />
            Back to review queue
          </Link>
        </Button>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[70ch]">
            <p className="text-sm font-bold text-primary uppercase">
              Project review
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-h2">
              {project.title}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {project.owner.name} · {project.owner.institution}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {project.featured ? (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-pin-red-100 bg-pin-red-50 px-3 text-sm font-bold text-primary">
                <Star aria-hidden="true" className="fill-current" />
                Featured
              </span>
            ) : null}
            <ProjectStatusBadge status={project.status} />
            <CategoryBadge category={project.category} />
          </div>
        </div>
      </div>

      {message ? (
        <Alert className="border-pin-red-100 bg-pin-red-50">
          <CheckCircle2
            aria-hidden="true"
            className="text-primary"
          />
          <AlertTitle className="text-primary">Project updated</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
      {error ? (
        <Alert variant="destructive">
          <AlertCircle aria-hidden="true" />
          <AlertTitle>Review action failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Views", project.views_count, Eye],
          ["Favorites", project.favorites_count, Heart],
          ["Votes", project.votes_count, Vote],
          ["Comments", project.comments_count, MessageCircle],
        ].map(([label, value, Icon]) => (
          <Card key={label} size="sm">
            <Icon aria-hidden="true" className="size-5 text-primary" />
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-pin-red-100 bg-pin-red-50">
        <CardHeader>
          <CardTitle>Review controls</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          {["Submitted", "Under Review"].includes(project.status) ? (
            <label className="grid gap-2 text-sm font-semibold">
              Review notes
              <Textarea
                value={reviewNotes}
                onChange={(event) => setReviewNotes(event.target.value)}
                maxLength={5000}
                placeholder="Record clear, actionable review feedback."
              />
            </label>
          ) : project.review_notes ? (
            <div>
              <p className="text-sm font-semibold text-foreground">
                Recorded review notes
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {project.review_notes}
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {project.status === "Submitted" ? (
              <Button
                type="button"
                onClick={() =>
                  runAction(
                    () =>
                      startAdminProjectReview(project.id, reviewNotes),
                    "The project is now under review."
                  )
                }
                disabled={isProcessing}
              >
                <Send aria-hidden="true" />
                {isProcessing ? "Starting…" : "Start review"}
              </Button>
            ) : null}

            {project.status === "Under Review" ? (
              <Button
                type="button"
                onClick={() =>
                  runAction(
                    () => approveAdminProject(project.id, reviewNotes),
                    "The project has been approved."
                  )
                }
                disabled={isProcessing}
              >
                <CheckCircle2 aria-hidden="true" />
                {isProcessing ? "Approving…" : "Approve project"}
              </Button>
            ) : null}

            {project.status === "Approved" ? (
              <>
                <label className="grid gap-2 text-sm font-semibold">
                  Publication date and time
                  <Input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(event) => setPublishedAt(event.target.value)}
                  />
                </label>
                <Button
                  type="button"
                  className="self-end"
                  onClick={() =>
                    runAction(
                      () =>
                        publishAdminProject(
                          project.id,
                          new Date(publishedAt).toISOString()
                        ),
                      "The project publication has been scheduled."
                    )
                  }
                  disabled={isProcessing || !publishedAt}
                >
                  <CalendarClock aria-hidden="true" />
                  {isProcessing ? "Publishing…" : "Schedule publication"}
                </Button>
              </>
            ) : null}

            {["Approved", "Published"].includes(project.status) ? (
              <Button
                type="button"
                variant={project.featured ? "outline" : "default"}
                onClick={() =>
                  runAction(
                    () =>
                      featureAdminProject(project.id, !project.featured),
                    project.featured
                      ? "The project was removed from featured selection."
                      : "The project is now in the featured selection."
                  )
                }
                disabled={isProcessing}
              >
                <Star aria-hidden="true" />
                {project.featured ? "Remove featured" : "Mark as featured"}
              </Button>
            ) : null}
          </div>

          {project.status === "Under Review" ? (
            <p className="text-sm text-muted-foreground">
              Reject and return-for-revision controls remain unavailable until
              their project status outcomes are approved.
            </p>
          ) : null}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <DetailSection title="Abstract">{project.abstract}</DetailSection>
        <DetailSection title="Problem statement">
          {project.problem_statement}
        </DetailSection>
        <DetailSection title="Proposed solution">
          {project.proposed_solution}
        </DetailSection>
        <DetailSection title="Objectives">{project.objectives}</DetailSection>
        <DetailSection title="Target users">
          {project.target_users}
        </DetailSection>
        <DetailSection title="Expected impact">
          {project.expected_impact}
        </DetailSection>
        <DetailSection title="Methodology">
          {project.methodology}
        </DetailSection>
        <DetailSection title="System architecture">
          {project.system_architecture}
        </DetailSection>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SDG contributions and technologies</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {project.sdgs.map((sdg) => (
              <div
                key={sdg.id}
                className="rounded-xl border border-border p-4"
              >
                <SdgBadge code={sdg.code} title={sdg.title} />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {sdg.contribution_description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <TechnologyChip key={technology.id} technology={technology} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team members</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-foreground">
              <tr>
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Student
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Matric number
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Programme
                </th>
                <th scope="col" className="py-3 pl-4 font-semibold">
                  Supervisor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {project.members.map((member) => (
                <tr key={member.id}>
                  <td className="py-3 pr-4">{member.student_name}</td>
                  <td className="px-4 py-3">{member.matric_number}</td>
                  <td className="px-4 py-3">{member.programme}</td>
                  <td className="py-3 pl-4">{member.supervisor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {project.media.length > 0 ? (
        <MediaGallery media={project.media} projectTitle={project.title} />
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>External resources</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {[
            ["GitHub repository", project.github_url],
            ["Live demo", project.demo_url],
            ["Figma design", project.figma_url],
            ["Video demonstration", project.video_url],
          ]
            .filter(([, url]) => url)
            .map(([label, url]) => (
              <Button key={label} variant="outline" asChild>
                <a href={url} target="_blank" rel="noreferrer">
                  <ExternalLink aria-hidden="true" />
                  {label}
                </a>
              </Button>
            ))}
          {![
            project.github_url,
            project.demo_url,
            project.figma_url,
            project.video_url,
          ].some(Boolean) ? (
            <p className="text-sm text-muted-foreground">
              No external resources were supplied.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
