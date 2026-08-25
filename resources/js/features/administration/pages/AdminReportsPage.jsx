import {
  AlertCircle,
  Award,
  BarChart3,
  FolderKanban,
  Users,
  Vote,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminPageHeader } from "@/features/administration/components/AdminPageHeader";
import { MetricCard } from "@/features/administration/components/MetricCard";
import { fetchAdminReports } from "@/features/administration/services/administrationApi";
import { getApiErrorMessage } from "@/utils/apiError";

const EMPTY_REPORTS = {
  projects: {
    total: 0,
    by_status: {},
    by_category: [],
    by_sdg: [],
  },
  users: {
    total: 0,
    by_role: {},
    institutions: [],
  },
  voting: {
    total_votes: 0,
    top_projects: [],
    people_choice_leaders: [],
  },
};

function CountList({ items, labelKey = "name" }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((item) => (
        <li
          key={item.id || item[labelKey]}
          className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
        >
          <span className="font-medium">{item[labelKey]}</span>
          <span className="text-sm font-bold text-primary">
            {item.projects_count ?? item.users_count}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function AdminReportsPage() {
  const [reports, setReports] = useState(EMPTY_REPORTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchAdminReports()
      .then((data) => {
        if (active) {
          setReports(data);
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "Unable to generate administration reports."
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
        eyebrow="Schema-backed reporting"
        title="Exhibition reports"
        description="Review project, user, institution, SDG, category, and voting totals supported by the current data model."
      />

      <Alert className="border-pin-red-100 bg-pin-red-50">
        <BarChart3 aria-hidden="true" className="text-primary" />
        <AlertTitle className="text-primary">
          Aggregate reporting only
        </AlertTitle>
        <AlertDescription>
          Active users, daily or monthly visitors, referral sources, and
          visitor trends require the planned visitor-analytics schema and are
          intentionally excluded.
        </AlertDescription>
      </Alert>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle aria-hidden="true" />
          <AlertTitle>Reports unavailable</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {isLoading ? (
        <div
          className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground shadow-xs"
          role="status"
        >
          Generating reports…
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              icon={FolderKanban}
              label="Total projects"
              value={reports.projects.total}
              className="border-primary bg-primary text-primary-foreground"
            />
            <MetricCard
              icon={Users}
              label="Total users"
              value={reports.users.total}
              className="bg-ink-900 text-cream-soft"
            />
            <MetricCard
              icon={Vote}
              label="Total votes"
              value={reports.voting.total_votes}
              className="bg-pin-red-50 text-foreground"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Projects by status</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3">
                  {Object.entries(reports.projects.by_status).map(
                    ([status, total]) => (
                      <li
                        key={status}
                        className="flex items-center justify-between rounded-lg bg-muted px-4 py-3"
                      >
                        <span className="font-medium">{status}</span>
                        <span className="font-bold text-primary">
                          {total}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Users by role</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3">
                  {Object.entries(reports.users.by_role).map(
                    ([role, total]) => (
                      <li
                        key={role}
                        className="flex items-center justify-between rounded-lg bg-muted px-4 py-3"
                      >
                        <span className="font-medium">{role}</span>
                        <span className="font-bold text-primary">
                          {total}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projects by category</CardTitle>
              </CardHeader>
              <CardContent>
                <CountList items={reports.projects.by_category} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projects by SDG</CardTitle>
              </CardHeader>
              <CardContent>
                <CountList
                  items={reports.projects.by_sdg.map((sdg) => ({
                    ...sdg,
                    name: `SDG ${sdg.code} · ${sdg.title}`,
                  }))}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Users by institution</CardTitle>
                <CardDescription>
                  Up to 20 institutions with the most registered accounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CountList items={reports.users.institutions} />
              </CardContent>
            </Card>

            <Card className="border-pin-red-100 bg-pin-red-50">
              <CardHeader>
                <Award
                  aria-hidden="true"
                  className="size-7 text-primary"
                />
                <CardTitle>People’s Choice leaders</CardTitle>
                <CardDescription>
                  Published projects currently tied for the highest vote total.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reports.voting.people_choice_leaders.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No votes have been recorded for published projects.
                  </p>
                ) : (
                  <ul className="grid gap-3">
                    {reports.voting.people_choice_leaders.map((project) => (
                      <li
                        key={project.id}
                        className="rounded-lg border border-pin-red-100 bg-card p-4"
                      >
                        <Link
                          to={`/projects/${project.slug}`}
                          className="font-semibold text-foreground hover:text-primary hover:underline"
                        >
                          {project.title}
                        </Link>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{project.owner.name}</span>
                          <Badge variant="outline">
                            {project.votes_count} votes
                          </Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top-voted published projects</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b border-border text-foreground">
                  <tr>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      Project
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Institution
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Category
                    </th>
                    <th scope="col" className="py-3 pl-4 text-right font-semibold">
                      Votes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {reports.voting.top_projects.map((project) => (
                    <tr key={project.id}>
                      <td className="py-3 pr-4">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="font-semibold text-foreground hover:text-primary hover:underline"
                        >
                          {project.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        {project.owner.institution}
                      </td>
                      <td className="px-4 py-3">{project.category.name}</td>
                      <td className="py-3 pl-4 text-right font-bold">
                        {project.votes_count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
