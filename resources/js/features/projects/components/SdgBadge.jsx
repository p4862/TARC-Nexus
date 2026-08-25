import { Badge } from "@/components/ui/badge";

const SDG_CLASSES = {
  8: "border-sdg-8 bg-sdg-8 text-white",
  11: "border-sdg-11 bg-sdg-11 text-foreground",
  12: "border-sdg-12 bg-sdg-12 text-foreground",
};

export function SdgBadge({ code, title }) {
  return (
    <Badge className={SDG_CLASSES[code] || "bg-muted text-foreground"}>
      SDG {code}
      {title ? <span className="sr-only">: {title}</span> : null}
    </Badge>
  );
}
