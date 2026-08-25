import { Badge } from "@/components/ui/badge";

const CATEGORY_CLASSES = [
  "border-pin-red-100 bg-pin-red-50 text-primary",
  "border-border bg-cream-card text-foreground",
  "border-cream-300 bg-muted text-foreground",
  "border-pin-red-100 bg-pin-red-50 text-primary",
  "border-border bg-cream-card text-foreground",
  "border-destructive/20 bg-destructive/10 text-destructive",
  "border-border bg-muted text-foreground",
  "border-pin-red-100 bg-pin-red-50 text-primary",
];

function categoryIndex(name) {
  return Array.from(name || "").reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    0
  );
}

export function CategoryBadge({ category }) {
  const index = categoryIndex(category?.name) % CATEGORY_CLASSES.length;

  return (
    <Badge variant="outline" className={CATEGORY_CLASSES[index]}>
      {category?.name || "Uncategorized"}
    </Badge>
  );
}
