import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <section className="relative grid min-h-[70vh] place-items-center overflow-hidden bg-muted/40 px-4 py-16 sm:px-6">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute font-display text-[10rem] leading-none font-bold text-pin-red-50 sm:text-[15rem]"
      >
        404
      </p>
      <div className="relative max-w-[32rem] text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
          <Compass aria-hidden="true" className="size-7" />
        </span>
        <p className="mt-6 text-sm font-bold text-destructive uppercase">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">
          This exhibition page is off the map.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          The address may be incorrect, or the project may not be available in
          the public exhibition.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
              Return home
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/projects">Browse projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
