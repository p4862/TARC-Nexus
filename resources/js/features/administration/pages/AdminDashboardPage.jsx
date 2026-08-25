import {
  ArrowRight,
  FolderCheck,
  FolderKanban,
  Hourglass,
  UserRound,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
import { AdminPageHeader } from "@/features/administration/components/AdminPageHeader";
import { MetricCard } from "@/features/administration/components/MetricCard";
import { fetchAdminDashboard } from "@/features/administration/services/administrationApi";
import { ProjectStatusBadge } from "@/features/projects/components/ProjectStatusBadge";
import { getApiErrorMessage } from "@/utils/apiError";

const EMPTY_DASHBOARD = {
  statistics: {
    total_projects: 0,
    total_exhibitors: 0,
    total_guests: 0,
    published_projects: 0,
    pending_approvals: 0,
  },
  popular_categories: [],
  recent_submissions: [],
};

export function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchAdminDashboard()
      .then((data) => {
        if (active) {
          setDashboard(data);
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "Unable to load the administrator dashboard."
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
  }, []);

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        eyebrow="Platform overview"
        title="Administrator dashboard"
        description="Monitor project throughput, account roles, published work, and the current approval queue."
      />

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Dashboard unavailable</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {isLoading ? (
        <div
          className="rounded-xl border border-border bg-background p-8 text-center text-muted-foreground"
          role="status"
        >
          Loading dashboard…
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <MetricCard
              icon={FolderKanban}
              label="Total projects"
              value={dashboard.statistics.total_projects}
              className="border-primary bg-primary text-primary-foreground"
            />
            <MetricCard
              icon={Users}
              label="Exhibitors"
              value={dashboard.statistics.total_exhibitors}
              className="bg-ink-900 text-cream-soft"
            />
            <MetricCard
              icon={UserRound}
              label="Guests"
              value={dashboard.statistics.total_guests}
              className="bg-card text-card-foreground"
            />
            <MetricCard
              icon={FolderCheck}
              label="Published"
              value={dashboard.statistics.published_projects}
              className="bg-secondary text-secondary-foreground"
            />
            <MetricCard
              icon={Hourglass}
              label="Pending approvals"
              value={dashboard.statistics.pending_approvals}
              className="bg-pin-red-50 text-foreground"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <Card>
              <CardHeader className="flex-row items-center justify-between gap-4">
                <CardTitle>Recent submissions</CardTitle>
                <Button variant="link" asChild className="px-0">
                  <Link to="/administrator/projects">
                    Review queue
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {dashboard.recent_submissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    There are no projects waiting for review.
                  </p>
                ) : (
                  <ul className="divide-y divide-border">
                    {dashboard.recent_submissions.map((project) => (
                      <li
                        key={project.id}
                        className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <Link
                            to={`/administrator/projects/${project.id}`}
                            className="font-semibold text-foreground hover:text-primary hover:underline"
                          >
                            {project.title}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {project.owner.name} · {project.owner.institution}
                          </p>
                        </div>
                        <ProjectStatusBadge status={project.status} />
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular categories</CardTitle>
              </CardHeader>
              <CardContent>
                {dashboard.popular_categories.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Published projects will populate this ranking.
                  </p>
                ) : (
                  <ol className="grid gap-4">
                    {dashboard.popular_categories.map((category, index) => (
                      <li
                        key={category.id}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
                      >
                        <span className="grid size-8 place-items-center rounded-full bg-pin-red-50 text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {category.projects_count}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
