import {
  ArrowRight,
  Eye,
  ImageIcon,
  MessageCircle,
  Star,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectEngagementActions } from "@/features/engagement/components/ProjectEngagementActions";
import { isRenderableImageMedia } from "@/features/exhibition/utils/media";
import { CategoryBadge } from "@/features/projects/components/CategoryBadge";
import { SdgBadge } from "@/features/projects/components/SdgBadge";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  dateStyle: "medium",
});

const VARIANT_STYLES = {
  public: {
    media: "aspect-[16/10]",
    header: "p-5 pb-3 sm:p-6 sm:pb-3",
    content: "px-5 pb-5 sm:px-6 sm:pb-6",
  },
  featured: {
    media: "aspect-[3/2]",
    header: "p-5 pb-3 sm:p-6 sm:pb-3",
    content: "px-5 pb-5 sm:px-6 sm:pb-6",
  },
  compact: {
    media: "aspect-[4/3]",
    header: "p-4 pb-2",
    content: "px-4 pb-4",
  },
};

export function ProjectCard({
  project,
  variant = "public",
  onEngagementChange,
}) {
  const preview = project.preview_media;
  const hasPreviewImage = isRenderableImageMedia(preview);
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.public;
  const isCompact = variant === "compact";

  return (
    <Card
      className={cn(
        "h-full gap-0 rounded-xl p-0 transition duration-150 ease-standard",
        "hover:-translate-y-0.5 hover:border-cream-400 hover:shadow-md",
        "focus-within:-translate-y-0.5 focus-within:border-cream-400 focus-within:shadow-md"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          styles.media
        )}
      >
        {hasPreviewImage ? (
          <img
            src={preview.thumbnail_url || preview.url}
            alt={`${project.title} project preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-250 ease-standard group-hover/card:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground">
            <span className="flex flex-col items-center gap-2 text-sm font-semibold">
              <ImageIcon aria-hidden="true" className="size-8" />
              Preview coming soon
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <CategoryBadge category={project.category} />
          {project.featured ? (
            <Badge className="border-pin-red-100 bg-pin-red-50 text-primary shadow-xs">
              <Star aria-hidden="true" />
              Featured
            </Badge>
          ) : null}
        </div>
      </div>

      <CardHeader className={styles.header}>
        <CardTitle className={isCompact ? "text-base" : undefined}>
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex min-h-11 items-center rounded-sm text-foreground hover:text-primary hover:underline"
          >
            {project.title}
          </Link>
        </CardTitle>
        {project.subtitle ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.subtitle}
          </p>
        ) : null}
      </CardHeader>

      <CardContent className={cn("grid flex-1 gap-4", styles.content)}>
        {!isCompact ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.abstract}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-1.5">
          {project.sdgs.slice(0, isCompact ? 2 : 3).map((sdg) => (
            <SdgBadge key={sdg.id} code={sdg.code} title={sdg.title} />
          ))}
        </div>
        <div>
          <p className="line-clamp-1 font-bold italic text-foreground">
            {project.owner.institution}
          </p>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {project.team_name || project.owner.name}
          </p>
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          "flex-col items-stretch gap-3 py-4 text-sm text-muted-foreground",
          isCompact ? "mx-4" : "mx-5 sm:mx-6"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5"
              title={`${project.views_count.toLocaleString()} views`}
            >
              <Eye aria-hidden="true" className="size-4" />
              {project.views_count.toLocaleString()}
            </span>
            {isCompact ? (
              <>
                <span
                  className="inline-flex items-center gap-1.5"
                  title={`${project.votes_count.toLocaleString()} votes`}
                >
                  <Trophy aria-hidden="true" className="size-4" />
                  {project.votes_count.toLocaleString()}
                </span>
                <span
                  className="inline-flex items-center gap-1.5"
                  title={`${project.comments_count.toLocaleString()} comments`}
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {project.comments_count.toLocaleString()}
                </span>
              </>
            ) : null}
          </div>
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md text-primary hover:underline"
          >
            {isCompact ? "View" : "View project"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        {!isCompact || onEngagementChange ? (
          <ProjectEngagementActions
            project={project}
            compact
            onChange={onEngagementChange}
          />
        ) : null}
        <span className="sr-only">
          Published {dateFormatter.format(new Date(project.published_at))}
        </span>
      </CardFooter>
    </Card>
  );
}
