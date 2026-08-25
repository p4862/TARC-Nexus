import { Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { Badge } from "@/components/ui/badge";
import { PaginationControls } from "@/features/exhibition/components/PaginationControls";
import { ProjectGrid } from "@/features/exhibition/components/ProjectGrid";
import { useDocumentMetadata } from "@/features/exhibition/hooks/useDocumentMetadata";
import { fetchFavoriteProjects } from "@/features/engagement/services/engagementApi";
import { getApiErrorMessage } from "@/utils/apiError";

export function FavoritesPage() {
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);

  useDocumentMetadata({
    title: "My favorites | TARC Nexus",
    description: "Revisit your saved VM2026 student exhibition projects.",
  });

  useEffect(() => {
    let active = true;

    async function loadFavorites() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetchFavoriteProjects(page);

        if (active) {
          setProjects(response.data);
          setMeta(response.meta);
        }
      } catch (requestError) {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "Your favorite projects could not be loaded."
            )
          );
          setProjects([]);
          setMeta(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      active = false;
    };
  }, [page, requestVersion]);

  function handleEngagementChange(project, state) {
    if (!state.is_favorited) {
      if (projects.length === 1 && page > 1) {
        setPage((current) => current - 1);
      }

      setProjects((current) =>
        current.filter((item) => item.id !== project.id)
      );
      setMeta((current) =>
        current
          ? {
              ...current,
              total: Math.max(0, current.total - 1),
            }
          : current
      );
      return;
    }

    setProjects((current) =>
      current.map((item) =>
        item.id === project.id ? { ...item, ...state } : item
      )
    );
  }

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="page-container page-section-compact grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Badge variant="secondary" className="mb-5 text-primary">
              Personal collection
            </Badge>
            <h1 className="flex items-center gap-4 font-display text-4xl leading-tight font-bold text-foreground sm:text-h1">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive sm:size-14">
                <Heart aria-hidden="true" className="size-6 sm:size-7" />
              </span>
              My favorites
            </h1>
            <p className="mt-4 max-w-[70ch] text-lg text-muted-foreground">
              Keep the projects that inspire you close and return to their
              exhibition stories at any time.
            </p>
          </div>

          <div className="hidden items-center gap-3 rounded-2xl bg-pin-red-50 px-5 py-4 text-primary md:flex">
            <Sparkles aria-hidden="true" className="size-5" />
            <p className="text-sm font-semibold">
              {meta?.total?.toLocaleString() || 0} saved
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-12 lg:py-16">
        <div className="page-container">
          <div className="mb-6" aria-live="polite">
            <h2 className="text-2xl font-bold text-foreground">
              Saved projects
            </h2>
            {!isLoading && !error ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {meta?.total?.toLocaleString() || 0}{" "}
                {meta?.total === 1 ? "project" : "projects"} saved
              </p>
            ) : null}
          </div>

          {isLoading ? (
            <LoadingState
              title="Loading favorite projects..."
              description="Your saved exhibition collection is being prepared."
            />
          ) : error ? (
            <ErrorState
              title="Favorites unavailable"
              description={error}
              onRetry={() => setRequestVersion((current) => current + 1)}
            />
          ) : (
            <>
              <ProjectGrid
                projects={projects}
                variant="compact"
                emptyTitle="No favorite projects yet"
                emptyDescription="Use the Favorite action on a published project to save it here."
                onProjectEngagementChange={handleEngagementChange}
              />
              <PaginationControls
                meta={meta}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
