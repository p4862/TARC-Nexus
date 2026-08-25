import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({ icon: Icon, label, value, className = "" }) {
  return (
    <Card
      className={cn(
        "grid min-w-0 gap-4 rounded-lg p-5 shadow-xs",
        className
      )}
    >
      <Icon aria-hidden="true" className="size-6 opacity-80" />
      <CardContent>
        <p className="font-display text-3xl font-bold leading-tight">
          {Number(value || 0).toLocaleString()}
        </p>
        <p className="mt-1 text-sm font-semibold opacity-80">{label}</p>
      </CardContent>
    </Card>
  );
}
