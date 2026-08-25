import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ProjectGrid } from "@/features/exhibition/components/ProjectGrid";

export function ProjectCollectionSection({
  eyebrow,
  title,
  description,
  projects,
  muted = false,
  variant = "public",
}) {
  return (
    <section className={muted ? "bg-muted/50 py-16 lg:py-24" : "py-16 lg:py-24"}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[70ch]">
            <p className="text-sm font-bold text-primary uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-h2">
              {title}
            </h2>
            <p className="mt-3 text-muted-foreground">{description}</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/projects">
              Explore all
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ProjectGrid
          projects={projects}
          variant={variant}
          emptyTitle="No projects in this collection yet"
          emptyDescription="Published projects will appear here when they are available."
        />
      </div>
    </section>
  );
}
