import { LoaderCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function LoadingState({
  title = "Loading content…",
  description = "Please wait while the latest information is prepared.",
  className,
}) {
  return (
    <div
      className={cn(
        "flex min-h-48 items-center justify-center rounded-xl border border-border bg-card p-6 text-center shadow-xs",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="grid max-w-md justify-items-center gap-3">
        <span className="grid size-12 place-items-center rounded-full bg-pin-red-50 text-primary">
          <LoaderCircle aria-hidden="true" className="size-6 animate-spin" />
        </span>
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div
          aria-hidden="true"
          className="mt-2 grid w-full max-w-xs justify-items-center gap-2"
        >
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="h-2.5 w-4/5" />
        </div>
      </div>
    </div>
  );
}
