import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

export function BrandIdentity({
  inverse = false,
  descriptorClassName = "sr-only",
  className,
  onNavigate,
}) {
  return (
    <Link
      to="/"
      aria-label="TARC Nexus home"
      onClick={onNavigate}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-1",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-full bg-primary text-sm font-bold leading-none text-primary-foreground shadow-xs"
      >
        T
      </span>
      <span className="flex min-w-0 flex-col justify-center">
        <span
          className={cn(
            "text-base leading-none font-bold",
            inverse ? "text-sidebar-foreground" : "text-foreground"
          )}
        >
          TARC Nexus
        </span>
        <span
          className={cn(
            "mt-1 text-sm leading-none font-medium",
            inverse ? "text-sidebar-foreground/65" : "text-muted-foreground",
            descriptorClassName
          )}
        >
          VM2026 Online Exhibition
        </span>
      </span>
    </Link>
  );
}
