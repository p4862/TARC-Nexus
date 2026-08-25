import { Download, ExternalLink, FileText, ImageIcon, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isRenderableImageMedia } from "@/features/exhibition/utils/media";
import { cn } from "@/lib/utils";

export function MediaGallery({ media, projectTitle }) {
  const visuals = media.filter(isRenderableImageMedia);
  const videos = media.filter((item) => item.type === "video");
  const documents = media.filter(
    (item) =>
      item.type === "document" ||
      (item.type === "poster" && !isRenderableImageMedia(item))
  );

  return (
    <div className="grid gap-12">
      {visuals.length > 0 ? (
        <section aria-labelledby="visual-gallery-heading">
          <h2
            id="visual-gallery-heading"
            className="flex items-center gap-3 text-2xl font-bold text-foreground"
          >
            <ImageIcon aria-hidden="true" className="size-6" />
            Screenshots and posters
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            {visuals.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${item.filename} in a new tab`}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-border bg-muted shadow-sm",
                  index === 0 ? "col-span-2 aspect-video" : "aspect-[4/3]"
                )}
              >
                <img
                  src={item.thumbnail_url || item.url}
                  alt={`${projectTitle} ${item.type} ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-250 ease-standard group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-ink-900/80 px-4 py-3 text-sm text-white">
                  <p className="truncate">{item.filename}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {videos.length > 0 ? (
        <section aria-labelledby="video-gallery-heading">
          <h2
            id="video-gallery-heading"
            className="flex items-center gap-3 text-2xl font-bold text-foreground"
          >
            <Video aria-hidden="true" className="size-6" />
            Video demonstrations
          </h2>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {videos.map((item) => (
              <Card key={item.id} className="rounded-xl p-0">
                <video
                  controls
                  preload="metadata"
                  poster={item.thumbnail_url || undefined}
                  className="aspect-video w-full bg-ink-900"
                  aria-label={item.filename}
                >
                  <source src={item.url} />
                  Your browser does not support embedded video.
                </video>
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <span className="truncate text-sm">{item.filename}</span>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${item.filename} in a new tab`}
                    >
                      <ExternalLink aria-hidden="true" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {documents.length > 0 ? (
        <section aria-labelledby="documents-heading">
          <h2
            id="documents-heading"
            className="flex items-center gap-3 text-2xl font-bold text-foreground"
          >
            <FileText aria-hidden="true" className="size-6" />
            Project documentation
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {documents.map((item) => (
              <Card key={item.id} size="sm" className="rounded-xl">
                <CardHeader className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-lg bg-pin-red-50 text-primary">
                    <FileText aria-hidden="true" />
                  </span>
                  <CardTitle className="truncate text-base">
                    {item.filename}
                  </CardTitle>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Download or open ${item.filename}`}
                    >
                      <Download aria-hidden="true" />
                    </a>
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
