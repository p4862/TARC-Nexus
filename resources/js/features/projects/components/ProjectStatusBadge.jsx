import { Badge } from "@/components/ui/badge";

const STATUS_CLASSES = {
  Draft: "border-pin-red-100 bg-pin-red-50 text-primary",
  Submitted: "border-border bg-cream-card text-foreground",
  "Under Review": "border-cream-300 bg-muted text-foreground",
  Approved: "border-border bg-cream-card text-foreground",
  Published: "border-pin-red-100 bg-pin-red-50 text-primary",
};

export function ProjectStatusBadge({ status }) {
  return (
    <Badge
      variant="outline"
      className={STATUS_CLASSES[status] || STATUS_CLASSES.Draft}
    >
      {status}
    </Badge>
  );
}
