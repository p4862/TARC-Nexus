import {
  ArrowLeft,
  CalendarDays,
  Code2,
  ExternalLink,
  Eye,
  ImageIcon,
  MonitorPlay,
  Palette,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MediaGallery } from "@/features/exhibition/components/MediaGallery";
import { TechnologyChip } from "@/features/exhibition/components/TechnologyChip";
import { useDocumentMetadata } from "@/features/exhibition/hooks/useDocumentMetadata";
import { fetchPublishedProject } from "@/features/exhibition/services/publicExhibitionApi";
import { isRenderableImageMedia } from "@/features/exhibition/utils/media";
import { CommentSection } from "@/features/engagement/components/CommentSection";
import { ProjectEngagementActions } from "@/features/engagement/components/ProjectEngagementActions";
import { CategoryBadge } from "@/features/projects/components/CategoryBadge";
import { SdgBadge } from "@/features/projects/components/SdgBadge";
import { getApiErrorMessage } from "@/utils/apiError";

const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  dateStyle: "long",
});

function NarrativeSection({ title, children }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
        {children}
      </p>
    </section>
  );
}

function ExternalResource({ href, icon: Icon, children }) {
  if (!href) {
    return null;
  }

  return (
    <Button variant="outline" className="w-full justify-between" asChild>
      <a href={href} target="_blank" rel="noreferrer">
        <span className="inline-flex items-center gap-2">
          <Icon aria-hidden="true" />
          {children}
        </span>
        <ExternalLink aria-hidden="true" />
      </a>
    </Button>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [activeVisualId, setActiveVisualId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);

  const visualMedia = useMemo(
    () => project?.media.filter(isRenderableImageMedia) || [],
    [project]
  );
  const activeVisual =
    visualMedia.find((item) => item.id === activeVisualId) || visualMedia[0];

  useDocumentMetadata({
    title: project ? `${project.title} | TARC Nexus` : "",
    description: project?.abstract || "",
    image: activeVisual?.thumbnail_url || activeVisual?.url,
  });

  useEffect(() => {
    let active = true;

    async function loadProject() {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchPublishedProject(slug);
        const firstVisual = data.media.find(isRenderableImageMedia);

        if (active) {
          setProject(data);
          setActiveVisualId(firstVisual?.id || null);
        }
      } catch (requestError) {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "This published project could not be loaded."
            )
          );
          setProject(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      active = false;
    };
  }, [requestVersion, slug]);

  if (isLoading) {
    return (
      <section className="bg-muted/40 py-16 lg:py-24">
        <div className="page-container">
          <LoadingState
            title="Loading project exhibition..."
            description="The project story, media, and discussion are being prepared."
          />
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="bg-muted/40 py-16 lg:py-24">
        <div className="page-container-reading">
          <ErrorState
            title="Project unavailable"
            description={error || "This project is not available."}
            onRetry={() => setRequestVersion((current) => current + 1)}
          />
          <Button variant="outline" asChild className="mt-6">
            <Link to="/projects">
              <ArrowLeft aria-hidden="true" />
              Back to the gallery
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  function updateEngagement(nextState) {
    setProject((current) => ({
      ...current,
      ...nextState,
    }));
  }

  return (
    <>
      <section className="relative flex min-h-[31.25rem] items-end overflow-hidden bg-ink-900 text-white">
        {activeVisual ? (
          <img
            src={activeVisual.url}
            alt={`${project.title} featured project media`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sidebar-foreground/75">
            <ImageIcon aria-hidden="true" className="size-24" />
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink-900/70"
        />

        <div className="page-container relative grid gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={project.category} />
              {project.featured ? (
                <Badge className="border-pin-red-100 bg-primary text-primary-foreground">
                  <Star aria-hidden="true" />
                  Featured project
                </Badge>
              ) : null}
            </div>
            <h1 className="mt-5 max-w-[20ch] font-display text-4xl leading-tight font-bold sm:text-h1">
              {project.title}
            </h1>
            {project.subtitle ? (
              <p className="mt-3 max-w-[60ch] text-lg text-sidebar-foreground/80">
                {project.subtitle}
              </p>
            ) : null}
          </div>

          {visualMedia.length > 1 ? (
            <div
              className="scrollbar-none flex max-w-full gap-2 overflow-x-auto pb-1"
              aria-label="Choose featured project media"
            >
              {visualMedia.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveVisualId(item.id)}
                  className={`size-14 shrink-0 overflow-hidden rounded-xl border-2 bg-sidebar-accent transition duration-150 ${
                    activeVisual?.id === item.id
                      ? "border-white"
                      : "border-white/40 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Show project media ${index + 1}: ${item.filename}`}
                  aria-pressed={activeVisual?.id === item.id}
                >
                  <img
                    src={item.thumbnail_url || item.url}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="page-container flex flex-col gap-4 py-4 lg:flex-row lg:items-start lg:justify-between">
          <nav
            aria-label="Breadcrumb"
            className="flex min-h-11 min-w-0 items-center gap-2 text-sm text-muted-foreground"
          >
            <Link
              to="/"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center hover:text-primary"
            >
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              to="/projects"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center hover:text-primary"
            >
              Projects
            </Link>
            <span aria-hidden="true">/</span>
            <span
              className="truncate font-medium text-foreground"
              aria-current="page"
            >
              {project.title}
            </span>
          </nav>
          <ProjectEngagementActions
            project={project}
            onChange={updateEngagement}
          />
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="page-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Users aria-hidden="true" className="size-4" />
                {project.team_name || project.owner.name}
              </span>
              <span className="font-bold italic text-foreground">
                {project.owner.institution}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays aria-hidden="true" className="size-4" />
                Published{" "}
                {dateFormatter.format(new Date(project.published_at))}
              </span>
              <span className="inline-flex items-center gap-2">
                <Eye aria-hidden="true" className="size-4" />
                {project.views_count.toLocaleString()} views
              </span>
            </div>

            <section className="mt-8">
              <p className="text-sm font-bold text-primary uppercase">
                Project overview
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                The idea and its impact
              </h2>
              <p className="mt-6 whitespace-pre-line text-lg leading-relaxed">
                {project.abstract}
              </p>
            </section>

            <div className="mt-10 grid gap-8">
              <NarrativeSection title="The problem">
                {project.problem_statement}
              </NarrativeSection>
              <NarrativeSection title="Proposed solution">
                {project.proposed_solution}
              </NarrativeSection>
              <NarrativeSection title="Objectives">
                {project.objectives}
              </NarrativeSection>
              <div className="grid gap-8 md:grid-cols-2">
                <NarrativeSection title="Target users">
                  {project.target_users}
                </NarrativeSection>
                <NarrativeSection title="Expected impact">
                  {project.expected_impact}
                </NarrativeSection>
              </div>
            </div>

            <section className="mt-14 border-t border-border pt-10">
              <p className="text-sm font-bold text-primary uppercase">
                Project media
              </p>
              <div className="mt-5">
                {project.media.length > 0 ? (
                  <MediaGallery
                    media={project.media}
                    projectTitle={project.title}
                  />
                ) : (
                  <EmptyState
                    icon={ImageIcon}
                    title="No project media available"
                    description="The team has not published screenshots, videos, posters, or documents."
                  />
                )}
              </div>
            </section>

            <section className="mt-14 border-t border-border pt-10">
              <p className="text-sm font-bold text-primary uppercase">
                Sustainability
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                SDG contributions
              </h2>
              <div className="mt-6 grid gap-4">
                {project.sdgs.map((sdg) => (
                  <Card key={sdg.id} className="rounded-xl">
                    <CardHeader>
                      <div className="mb-2">
                        <SdgBadge code={sdg.code} title={sdg.title} />
                      </div>
                      <CardTitle>{sdg.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="leading-relaxed text-muted-foreground">
                        {sdg.contribution_description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mt-14 border-t border-border pt-10">
              <p className="text-sm font-bold text-primary uppercase">
                Development
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                How it was built
              </h2>
              <div className="mt-8 grid gap-8">
                <NarrativeSection title="Methodology">
                  {project.methodology}
                </NarrativeSection>
                <NarrativeSection title="System architecture">
                  {project.system_architecture}
                </NarrativeSection>
              </div>
            </section>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="grid gap-4">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Project details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-muted-foreground">
                      Presented by
                    </p>
                    <p className="mt-1 text-foreground">
                      {project.team_name || project.owner.name}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">
                      Institution
                    </p>
                    <p className="mt-1 font-bold italic text-foreground">
                      {project.owner.institution}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">
                      Category
                    </p>
                    <div className="mt-2">
                      <CategoryBadge category={project.category} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Team members</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {project.members.length > 0 ? (
                    project.members.map((member) => (
                      <div
                        key={member.id}
                        className="border-b border-border pb-4 last:border-0 last:pb-0"
                      >
                        <p className="font-semibold text-foreground">
                          {member.student_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.programme}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Supervisor: {member.supervisor}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Team information has not been added.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Technologies used</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {project.technologies.length > 0 ? (
                    project.technologies.map((technology) => (
                      <TechnologyChip
                        key={technology.id}
                        technology={technology}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No technology tags have been published.
                    </p>
                  )}
                </CardContent>
              </Card>

              {[
                project.github_url,
                project.demo_url,
                project.figma_url,
                project.video_url,
              ].some(Boolean) ? (
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>External resources</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <ExternalResource
                      href={project.github_url}
                      icon={Code2}
                    >
                      GitHub repository
                    </ExternalResource>
                    <ExternalResource
                      href={project.demo_url}
                      icon={MonitorPlay}
                    >
                      Live demonstration
                    </ExternalResource>
                    <ExternalResource
                      href={project.figma_url}
                      icon={Palette}
                    >
                      Figma design
                    </ExternalResource>
                    <ExternalResource
                      href={project.video_url}
                      icon={PlayCircle}
                    >
                      Video demonstration
                    </ExternalResource>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <div className="border-t border-border bg-muted/40">
        <CommentSection
          project={project}
          onCountChange={(commentsCount) =>
            updateEngagement({ comments_count: commentsCount })
          }
        />
      </div>
    </>
  );
}
