import {
  ArrowRight,
  Eye,
  FolderKanban,
  Grid2X2,
  List,
  Plus,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { ConfirmActionDialog } from "@/components/feedback/ConfirmActionDialog";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationControls } from "@/features/exhibition/components/PaginationControls";
import { isRenderableImageMedia } from "@/features/exhibition/utils/media";
import { CategoryBadge } from "@/features/projects/components/CategoryBadge";
import { ProjectStatusBadge } from "@/features/projects/components/ProjectStatusBadge";
import { SdgBadge } from "@/features/projects/components/SdgBadge";
import {
  deleteProject,
  fetchOwnedProjects,
} from "@/features/projects/services/projectApi";
import { getApiErrorMessage } from "@/utils/apiError";

const STATUS_FILTERS = [
  "All",
  "Draft",
  "Submitted",
  "Under Review",
  "Approved",
  "Published",
];

const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  dateStyle: "medium",
});

function projectPreview(project) {
  const preview = project.media?.find(isRenderableImageMedia);

  return preview ? preview.thumbnail_url || preview.url : null;
}

function projectAction(project) {
  const isPubliclyVisible =
    project.status === "Published" &&
    project.published_at &&
    new Date(project.published_at) <= new Date();

  if (isPubliclyVisible) {
    return {
      label: "View published project",
      to: `/projects/${project.slug}`,
      icon: Eye,
    };
  }

  return {
    label: project.status === "Draft" ? "Manage project" : "View submission",
    to: `/exhibitor/projects/${project.id}/edit`,
    icon: ArrowRight,
  };
}

function ProjectPreview({ project, compact = false }) {
  const preview = projectPreview(project);

  return (
    <div
      className={
        compact
          ? "flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-pin-red-50"
          : "flex aspect-[16/9] items-center justify-center overflow-hidden bg-pin-red-50"
      }
    >
      {preview ? (
        <img
          src={preview}
          alt={`${project.title} preview`}
          className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <FolderKanban
          aria-hidden="true"
          className={compact ? "size-6 text-primary" : "size-10 text-primary"}
        />
      )}
    </div>
  );
}

function ProjectCard({ project, deletingId, onDelete }) {
  const action = projectAction(project);
  const ActionIcon = action.icon;

  return (
    <Card className="group h-full overflow-hidden p-0">
      <ProjectPreview project={project} />
      <CardHeader className="px-5 pt-5">
        <div className="mb-1 flex flex-wrap gap-2">
          <ProjectStatusBadge status={project.status} />
          <CategoryBadge category={project.category} />
        </div>
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.subtitle || project.abstract}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 gap-4 px-5">
        {project.sdgs.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.sdgs.map((sdg) => (
              <SdgBadge key={sdg.id} code={sdg.code} title={sdg.title} />
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>Updated {dateFormatter.format(new Date(project.updated_at))}</span>
          <span>{Number(project.views_count || 0).toLocaleString()} views</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2 px-5 pb-5">
        <Button variant="outline" asChild>
          <Link to={action.to}>
            {action.label}
            <ActionIcon aria-hidden="true" />
          </Link>
        </Button>
        {project.status === "Draft" ? (
          <Button
            type="button"
            variant="ghost"
            className="text-destructive"
            disabled={deletingId === project.id}
            onClick={() => onDelete(project)}
          >
            <Trash2 aria-hidden="true" />
            {deletingId === project.id ? "Deleting..." : "Delete"}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

function ProjectListItem({ project, deletingId, onDelete }) {
  const action = projectAction(project);
  const ActionIcon = action.icon;

  return (
    <li className="grid gap-4 p-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center lg:grid-cols-[auto_minmax(0,1fr)_auto_auto]">
      <ProjectPreview project={project} compact />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate font-semibold text-foreground">
            {project.title}
          </h2>
          <ProjectStatusBadge status={project.status} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <CategoryBadge category={project.category} />
          <span>Updated {dateFormatter.format(new Date(project.updated_at))}</span>
          <span>{Number(project.views_count || 0).toLocaleString()} views</span>
        </div>
      </div>
      <Button variant="outline" asChild className="w-full sm:col-start-2 lg:col-auto lg:w-auto">
        <Link to={action.to}>
          {action.label}
          <ActionIcon aria-hidden="true" />
        </Link>
      </Button>
      {project.status === "Draft" ? (
        <Button
          type="button"
          variant="ghost"
          className="w-full text-destructive sm:col-start-2 lg:col-auto lg:w-auto"
          disabled={deletingId === project.id}
          onClick={() => onDelete(project)}
        >
          <Trash2 aria-hidden="true" />
          {deletingId === project.id ? "Deleting..." : "Delete"}
        </Button>
      ) : null}
    </li>
  );
}

export function ProjectListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedStatus = searchParams.get("status") || "All";
  const status = STATUS_FILTERS.includes(requestedStatus)
    ? requestedStatus
    : "All";
  const requestedPage = Number(searchParams.get("page") || 1);
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState(null);
  const [view, setView] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const query = useMemo(
    () => ({
      page,
      status: status === "All" ? "" : status,
    }),
    [page, status]
  );

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchOwnedProjects(query);
      setProjects(response.data);
      setMeta(response.meta);
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to load your projects.")
      );
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  function updateQuery(next) {
    const params = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(next)) {
      if (!value || value === "All" || value === 1) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    }

    setSearchParams(params);
  }

  async function handleDelete() {
    if (!projectToDelete) {
      return;
    }

    setDeletingId(projectToDelete.id);
    setError("");

    try {
      await deleteProject(projectToDelete.id);
      setProjectToDelete(null);

      if (projects.length === 1 && page > 1) {
        updateQuery({ page: page - 1 });
      } else {
        await loadProjects();
      }
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to delete the project draft.")
      );
      throw requestError;
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="page-section-compact bg-muted/30">
      <div className="page-container">
        <PageHeader
          eyebrow="My work"
          title="My projects"
          description={
            meta
              ? `${meta.total} ${status === "All" ? "owned" : status.toLowerCase()} project${meta.total === 1 ? "" : "s"}. Manage drafts and follow every submission through review and publication.`
              : "Manage drafts and follow every submission through review and publication."
          }
          actions={
            <Button asChild>
              <Link to="/exhibitor/projects/new">
                <Plus aria-hidden="true" />
                New project
              </Link>
            </Button>
          }
        />

        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="scrollbar-none flex max-w-full gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Filter projects by status"
          >
            {STATUS_FILTERS.map((filter) => (
              <Button
                key={filter}
                type="button"
                size="sm"
                variant={status === filter ? "default" : "secondary"}
                className="shrink-0"
                aria-pressed={status === filter}
                onClick={() => updateQuery({ status: filter, page: 1 })}
              >
                {filter}
              </Button>
            ))}
          </div>
          <div
            className="flex w-fit rounded-lg bg-muted p-1"
            role="group"
            aria-label="Project display"
          >
            <Button
              type="button"
              size="sm"
              variant={view === "grid" ? "outline" : "ghost"}
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
            >
              <Grid2X2 aria-hidden="true" />
              Grid
            </Button>
            <Button
              type="button"
              size="sm"
              variant={view === "list" ? "outline" : "ghost"}
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              <List aria-hidden="true" />
              List
            </Button>
          </div>
        </div>

        {error ? (
          <ErrorState
            className="mt-8"
            title="Project workspace unavailable"
            description={error}
            onRetry={loadProjects}
          />
        ) : null}

        {isLoading ? (
          <LoadingState
            className="mt-8"
            title="Loading your projects..."
            description="Preparing the latest project status and activity."
          />
        ) : projects.length === 0 ? (
          <EmptyState
            className="mt-8"
            icon={FolderKanban}
            title={
              status === "All"
                ? "No projects yet"
                : `No ${status.toLowerCase()} projects`
            }
            description={
              status === "All"
                ? "Start the first project draft for your exhibition team."
                : "Choose another status or return to all projects."
            }
            action={
              status === "All" ? (
                <Button asChild>
                  <Link to="/exhibitor/projects/new">Create project</Link>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => updateQuery({ status: "All", page: 1 })}
                >
                  View all projects
                </Button>
              )
            }
          />
        ) : (
          <>
            {view === "grid" ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    deletingId={deletingId}
                    onDelete={setProjectToDelete}
                  />
                ))}
              </div>
            ) : (
              <ul className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
                {projects.map((project) => (
                  <ProjectListItem
                    key={project.id}
                    project={project}
                    deletingId={deletingId}
                    onDelete={setProjectToDelete}
                  />
                ))}
              </ul>
            )}

            <PaginationControls
              meta={meta}
              onPageChange={(nextPage) => updateQuery({ page: nextPage })}
            />
          </>
        )}

        <ConfirmActionDialog
          open={Boolean(projectToDelete)}
          onOpenChange={(open) => {
            if (!open && deletingId === null) {
              setProjectToDelete(null);
            }
          }}
          title="Delete project draft?"
          description={
            projectToDelete
              ? `"${projectToDelete.title}" and its uploaded media will be permanently deleted.`
              : ""
          }
          confirmLabel="Delete draft"
          isPending={deletingId !== null}
          onConfirm={handleDelete}
        />
      </div>
    </section>
  );
}
