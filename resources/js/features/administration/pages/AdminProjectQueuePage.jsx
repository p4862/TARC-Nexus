import { AlertCircle, FolderSearch2, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminPageHeader } from "@/features/administration/components/AdminPageHeader";
import { fetchAdminProjects } from "@/features/administration/services/administrationApi";
import { PaginationControls } from "@/features/exhibition/components/PaginationControls";
import { CategoryBadge } from "@/features/projects/components/CategoryBadge";
import { ProjectStatusBadge } from "@/features/projects/components/ProjectStatusBadge";
import { getApiErrorMessage } from "@/utils/apiError";

const STATUSES = ["Submitted", "Under Review", "Approved", "Published"];

export function AdminProjectQueuePage() {
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchAdminProjects({
        page,
        search,
        status: status === "all" ? "" : status,
      });
      setProjects(response.data);
      setMeta(response.meta);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to load the project review queue."
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  function handleSearch(event) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        eyebrow="Review and publication"
        title="Project review queue"
        description="Inspect submitted work, record review notes, approve eligible projects, choose featured work, and control publication."
      />

      <form
        onSubmit={handleSearch}
        className="grid gap-4 rounded-xl border border-border bg-card p-4 shadow-xs md:grid-cols-[1fr_220px_auto]"
        aria-label="Filter project review queue"
      >
        <label className="grid gap-2 text-sm font-semibold">
          Search
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Project, team, owner, or institution"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Status
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All review statuses</SelectItem>
              {STATUSES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <Button type="submit" className="self-end">
          <Search aria-hidden="true" />
          Search
        </Button>
      </form>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle aria-hidden="true" />
          <AlertTitle>Review queue unavailable</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {isLoading ? (
        <div
          className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground shadow-xs"
          role="status"
        >
          Loading project submissions…
        </div>
      ) : projects.length === 0 ? (
        <Card className="items-center py-12 text-center">
          <FolderSearch2
            aria-hidden="true"
            className="size-10 text-primary"
          />
          <CardHeader>
            <CardTitle>No matching submissions</CardTitle>
            <CardDescription>
              Adjust the status or search filter to see other projects.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="h-full">
              <CardHeader>
                <div className="mb-2 flex flex-wrap gap-2">
                  <ProjectStatusBadge status={project.status} />
                  <CategoryBadge category={project.category} />
                </div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  {project.team_name || project.owner.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid flex-1 gap-4">
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {project.abstract}
                </p>
                <dl className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="rounded-lg bg-muted p-3">
                    <dt className="text-muted-foreground">Views</dt>
                    <dd className="mt-1 font-bold text-foreground">
                      {project.views_count}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <dt className="text-muted-foreground">Favorites</dt>
                    <dd className="mt-1 font-bold text-foreground">
                      {project.favorites_count}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <dt className="text-muted-foreground">Votes</dt>
                    <dd className="mt-1 font-bold text-foreground">
                      {project.votes_count}
                    </dd>
                  </div>
                </dl>
                <p className="text-sm text-muted-foreground">
                  {project.owner.name} · {project.owner.institution}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/administrator/projects/${project.id}`}>
                    Inspect submission
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <PaginationControls meta={meta} onPageChange={setPage} />
    </div>
  );
}
