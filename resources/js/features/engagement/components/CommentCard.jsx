import { MessageSquareReply, ShieldCheck, Trash2 } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  dateStyle: "medium",
  timeStyle: "short",
});

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function CommentCard({
  comment,
  canReply,
  canModerate,
  onReply,
  onDelete,
  depth = 0,
}) {
  return (
    <div
      className={
        depth > 0
          ? "ml-4 border-l-2 border-pin-red-100 pl-4 sm:ml-8 sm:pl-6"
          : undefined
      }
    >
      <Card size="sm">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar size="lg">
              {comment.author.avatar_url ? (
                <AvatarImage
                  src={comment.author.avatar_url}
                  alt={`${comment.author.name} profile`}
                />
              ) : null}
              <AvatarFallback>{initials(comment.author.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate font-semibold text-foreground">
                  {comment.author.name}
                </p>
                {comment.author.role === "Exhibitor" ? (
                  <Badge
                    variant="secondary"
                    className="text-primary"
                  >
                    Exhibitor
                  </Badge>
                ) : null}
              </div>
              <time
                dateTime={comment.created_at}
                className="text-sm text-muted-foreground"
              >
                {dateFormatter.format(new Date(comment.created_at))}
              </time>
            </div>
          </div>

          {canModerate ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(comment)}
              aria-label={`Remove comment by ${comment.author.name}`}
              title="Remove this comment thread"
            >
              <Trash2 aria-hidden="true" className="text-destructive" />
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="whitespace-pre-wrap leading-relaxed text-foreground">
            {comment.comment}
          </p>
          {canReply ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-fit"
              onClick={() => onReply(comment)}
            >
              <MessageSquareReply aria-hidden="true" />
              Reply
            </Button>
          ) : null}
          {canModerate ? (
            <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <ShieldCheck aria-hidden="true" className="size-4" />
              Administrator moderation controls
            </p>
          ) : null}
        </CardContent>
      </Card>

      {comment.replies.length > 0 ? (
        <div className="mt-4 grid gap-4">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              canReply={canReply}
              canModerate={canModerate}
              onReply={onReply}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
