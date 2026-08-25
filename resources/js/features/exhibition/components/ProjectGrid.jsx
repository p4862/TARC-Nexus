import { FolderSearch } from "lucide-react";

import { EmptyState } from "@/components/feedback/EmptyState";
import { ProjectCard } from "@/features/exhibition/components/ProjectCard";
import { cn } from "@/lib/utils";

export function ProjectGrid({
  projects,
  variant = "public",
  emptyTitle = "No published projects found",
  emptyDescription = "Try changing the search or filters.",
  onProjectEngagementChange,
}) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderSearch}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div
      className={cn(
        "grid gap-5 md:grid-cols-2",
        variant === "compact"
          ? "lg:grid-cols-3 xl:grid-cols-4"
          : "xl:grid-cols-3"
      )}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          variant={variant}
          onEngagementChange={(state) =>
            onProjectEngagementChange?.(project, state)
          }
        />
      ))}
    </div>
  );
}
