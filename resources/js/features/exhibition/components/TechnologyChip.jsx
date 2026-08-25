import { Badge } from "@/components/ui/badge";

export function TechnologyChip({ technology }) {
  return (
    <Badge variant="secondary" className="text-foreground">
      {technology.name}
    </Badge>
  );
}
