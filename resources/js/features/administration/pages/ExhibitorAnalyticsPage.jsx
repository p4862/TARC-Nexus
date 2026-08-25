import {
  ArrowRight,
  BarChart3,
  Eye,
  FolderKanban,
  Heart,
  Plus,
  Vote,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MetricCard } from "@/features/administration/components/MetricCard";
import { fetchExhibitorAnalytics } from "@/features/administration/services/administrationApi";
import { PaginationControls } from "@/features/exhibition/components/PaginationControls";
import { CategoryBadge } from "@/features/projects/components/CategoryBadge";
import { ProjectStatusBadge } from "@/features/projects/components/ProjectStatusBadge";
import { getApiErrorMessage } from "@/utils/apiError";

const EMPTY_ANALYTICS = {
  summary: {
    projects: 0,
    views: 0,
    favorites: 0,
    votes: 0,
  },
  projects: [],
  pagination: null,
};

const QUICK_ACTIONS = [
  {
    to: "/exhibitor/projects/new",
    label: "Create a new project",
    description: "Start a schema-backed draft.",
    icon: Plus,
  },
  {
    to: "/exhibitor/projects",
    label: "Manage my projects",
    description: "Edit drafts and track review status.",
    icon: FolderKanban,
  },
  {
    to: "/projects",
    label: "Browse the gallery",
    description: "See published VM2026 projects.",
    icon: Eye,
  },
];

function AnalyticsProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <ProjectStatusBadge status={project.status} />
          <CategoryBadge category={project.category} />
        </div>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-3 text-center">
        {[
          ["Views", project.views_count],
          ["Favorites", project.favorites_count],
          ["Votes", project.votes_count],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-muted p-3">
            <p className="font-display text-xl font-bold text-foreground">
              {Number(value || 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ExhibitorAnalyticsPage() {
  const [analytics, setAnalytics] = useState(EMPTY_ANALYTICS);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      setAnalytics(await fetchExhibitorAnalytics({ page }));
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to load your project analytics."
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return (
    <section className="page-section-compact bg-muted/30">
      <div className="page-container">
        <PageHeader
          eyebrow="Exhibitor overview"
          title="Project engagement"
          description="Compare the aggregate views, favorites, and People’s Choice votes recorded for your own projects."
          actions={
            <Button asChild>
              <Link to="/exhibitor/projects/new">
                <Plus aria-hidden="true" />
                New project
              </Link>
            </Button>
          }
        />

        {error ? (
          <ErrorState
            className="mt-8"
            title="Analytics unavailable"
            description={error}
            onRetry={loadAnalytics}
          />
        ) : null}

        {isLoading ? (
          <LoadingState
            className="mt-8"
            title="Loading analytics…"
            description="Calculating aggregate engagement for your projects."
          />
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
              <MetricCard
                icon={FolderKanban}
                label="Projects"
                value={analytics.summary.projects}
                className="border-primary bg-primary text-primary-foreground"
              />
              <MetricCard
                icon={Eye}
                label="Total views"
                value={analytics.summary.views}
                className="bg-ink-900 text-cream-soft"
              />
              <MetricCard
                icon={Heart}
                label="Total favorites"
                value={analytics.summary.favorites}
                className="bg-card text-card-foreground"
              />
              <MetricCard
                icon={Vote}
                label="Total votes"
                value={analytics.summary.votes}
                className="bg-pin-red-50 text-foreground"
              />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Project comparison
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Aggregate engagement only; individual visitors are not
                      identified.
                    </p>
                  </div>
                  <Button variant="link" asChild>
                    <Link to="/exhibitor/projects">
                      View all projects
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>

                {analytics.projects.length === 0 ? (
                  <EmptyState
                    icon={BarChart3}
                    title="No project analytics yet"
                    description="Create a project to begin tracking supported aggregate engagement."
                    action={
                      <Button asChild>
                        <Link to="/exhibitor/projects/new">
                          Create project
                        </Link>
                      </Button>
                    }
                  />
                ) : (
                  <>
                    <div className="grid gap-4 md:hidden">
                      {analytics.projects.map((project) => (
                        <AnalyticsProjectCard
                          key={project.id}
                          project={project}
                        />
                      ))}
                    </div>

                    <div className="hidden max-w-full overflow-x-auto rounded-xl border border-border bg-background md:block">
                      <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="bg-muted/70 text-foreground">
                          <tr>
                            <th scope="col" className="px-4 py-3 font-semibold">
                              Project
                            </th>
                            <th scope="col" className="px-4 py-3 font-semibold">
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-right font-semibold"
                            >
                              Views
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-right font-semibold"
                            >
                              Favorites
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-right font-semibold"
                            >
                              Votes
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {analytics.projects.map((project) => (
                            <tr key={project.id}>
                              <td className="px-4 py-4">
                                <p className="font-semibold text-foreground">
                                  {project.title}
                                </p>
                                <div className="mt-2">
                                  <CategoryBadge
                                    category={project.category}
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <ProjectStatusBadge status={project.status} />
                              </td>
                              <td className="px-4 py-4 text-right font-semibold">
                                {project.views_count.toLocaleString()}
                              </td>
                              <td className="px-4 py-4 text-right font-semibold">
                                {project.favorites_count.toLocaleString()}
                              </td>
                              <td className="px-4 py-4 text-right font-semibold">
                                {project.votes_count.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <PaginationControls
                      meta={analytics.pagination}
                      onPageChange={setPage}
                    />
                  </>
                )}
              </div>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Quick actions</CardTitle>
                  <CardDescription>
                    Continue the most common Exhibitor tasks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {QUICK_ACTIONS.map(
                    ({ to, label, description, icon: Icon }) => (
                      <Button
                        key={to}
                        variant="outline"
                        asChild
                        className="h-auto justify-start px-4 py-3 text-left"
                      >
                        <Link to={to}>
                          <Icon aria-hidden="true" className="size-5 shrink-0" />
                          <span>
                            <span className="block font-semibold">{label}</span>
                            <span className="block text-sm font-normal text-muted-foreground">
                              {description}
                            </span>
                          </span>
                        </Link>
                      </Button>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
