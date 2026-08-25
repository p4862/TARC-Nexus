import { BellRing, CalendarDays } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function AnnouncementCard({ announcement }) {
  return (
    <Card className="h-full">
      <BellRing aria-hidden="true" className="size-7 text-primary" />
      <CardHeader>
        <CardTitle>{announcement.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
          {announcement.content}
        </p>
        <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-muted-foreground">
          <CalendarDays aria-hidden="true" className="size-4" />
          {dateFormatter.format(new Date(announcement.published_at))}
        </p>
      </CardContent>
    </Card>
  );
}
