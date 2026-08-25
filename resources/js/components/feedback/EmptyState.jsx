import { Inbox } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}) {
  return (
    <Card
      className={cn(
        "items-center gap-4 rounded-xl py-12 text-center shadow-xs",
        className
      )}
    >
      <span className="grid size-14 place-items-center rounded-full bg-pin-red-50 text-primary">
        <Icon aria-hidden="true" className="size-7" />
      </span>
      <CardHeader className="max-w-lg justify-items-center">
        <CardTitle>{title}</CardTitle>
        {description ? (
          <CardDescription>{description}</CardDescription>
        ) : null}
      </CardHeader>
      {action ? <CardContent>{action}</CardContent> : null}
    </Card>
  );
}
