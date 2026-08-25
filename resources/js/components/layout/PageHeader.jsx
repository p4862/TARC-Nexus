import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  backTo,
  backLabel = "Back",
}) {
  return (
    <header className="flex min-w-0 flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
      <div className="min-w-0 max-w-[70ch]">
        {backTo ? (
          <Button variant="link" asChild className="-ml-4 mb-2">
            <Link to={backTo}>
              <ArrowLeft aria-hidden="true" />
              {backLabel}
            </Link>
          </Button>
        ) : null}
        {eyebrow ? (
          <p className="text-sm font-bold text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 break-words font-display text-3xl font-bold text-foreground sm:text-h2">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
