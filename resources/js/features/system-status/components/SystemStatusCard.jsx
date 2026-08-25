import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSystemStatus } from "@/features/system-status/hooks/useSystemStatus";

const STATUS_PRESENTATION = {
  loading: {
    badge: "Checking",
    badgeClassName: "border-border bg-secondary text-secondary-foreground",
    icon: LoaderCircle,
    iconClassName: "animate-spin text-primary",
  },
  ok: {
    badge: "Connected",
    badgeClassName: "border-border bg-card text-foreground",
    icon: CircleCheck,
    iconClassName: "text-primary",
  },
  error: {
    badge: "Unavailable",
    badgeClassName: "border-destructive/20 bg-destructive/10 text-destructive",
    icon: CircleAlert,
    iconClassName: "text-destructive",
  },
};

export function SystemStatusCard() {
  const systemStatus = useSystemStatus();
  const presentation =
    STATUS_PRESENTATION[systemStatus.status] ?? STATUS_PRESENTATION.error;
  const StatusIcon = presentation.icon;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Application status</CardTitle>
            <CardDescription className="mt-1">
              Live connection to the versioned REST API.
            </CardDescription>
          </div>
          <StatusIcon
            aria-hidden="true"
            className={`size-6 shrink-0 ${presentation.iconClassName}`}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-3" aria-live="polite">
          <Badge
            variant="outline"
            className={presentation.badgeClassName}
          >
            {presentation.badge}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {systemStatus.message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
