import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PaginationControls({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) {
    return null;
  }

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-4"
      aria-label="Project result pages"
    >
      <Button
        type="button"
        variant="outline"
        disabled={meta.current_page <= 1}
        onClick={() => onPageChange(meta.current_page - 1)}
      >
        <ArrowLeft aria-hidden="true" />
        Previous
      </Button>
      <span className="text-sm text-muted-foreground" aria-live="polite">
        Page {meta.current_page} of {meta.last_page}
      </span>
      <Button
        type="button"
        variant="outline"
        disabled={meta.current_page >= meta.last_page}
        onClick={() => onPageChange(meta.current_page + 1)}
      >
        Next
        <ArrowRight aria-hidden="true" />
      </Button>
    </nav>
  );
}
