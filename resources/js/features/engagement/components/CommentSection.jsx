import {
  AlertCircle,
  LoaderCircle,
  MessageCircle,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { ConfirmActionDialog } from "@/components/feedback/ConfirmActionDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { CommentCard } from "@/features/engagement/components/CommentCard";
import {
  deleteComment,
  fetchProjectComments,
  postComment,
} from "@/features/engagement/services/engagementApi";
import { getApiErrorMessage } from "@/utils/apiError";

export function CommentSection({ project, onCountChange }) {
  const { user } = useAuth();
  const composerRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [meta, setMeta] = useState(null);
  const [commentsCount, setCommentsCount] = useState(
    Number(project.comments_count || 0)
  );
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const canComment =
    user?.role === "Guest" ||
    (user?.role === "Exhibitor" && user.id === project.owner.id);
  const canModerate = user?.role === "Administrator";

  async function loadComments(page = 1, append = false) {
    append ? setIsLoadingMore(true) : setIsLoading(true);
    setError("");

    try {
      const response = await fetchProjectComments(project.slug, page);
      setComments((current) =>
        append ? [...current, ...response.data] : response.data
      );
      setMeta(response.meta);
      setCommentsCount(response.comments_count);
      onCountChange?.(response.comments_count);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "The project discussion could not be loaded."
        )
      );
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    setComments([]);
    setMeta(null);
    loadComments();
  }, [project.slug]);

  function handleReply(selectedComment) {
    setReplyingTo(selectedComment);
    setFormError("");
    requestAnimationFrame(() => {
      composerRef.current?.focus();
      composerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!comment.trim()) {
      setFormError("Enter a comment before posting.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      await postComment(project.slug, {
        comment: comment.trim(),
        parent_id: replyingTo?.id || undefined,
      });
      setComment("");
      setReplyingTo(null);
      await loadComments();
    } catch (requestError) {
      setFormError(
        getApiErrorMessage(requestError, "Your comment could not be posted.")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!commentToDelete) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      await deleteComment(commentToDelete.id);
      await loadComments();
      setCommentToDelete(null);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "The comment thread could not be removed."
        )
      );
      throw requestError;
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section id="discussion" className="scroll-mt-8 py-16 lg:py-24">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold text-primary uppercase">
          Visitor engagement
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground">
          Comments and discussion
        </h2>
        <p className="mt-3 max-w-[70ch] text-muted-foreground">
          Ask the project team a question, exchange ideas, and continue the
          discussion in a thread.
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle aria-hidden="true" />
              {commentsCount.toLocaleString()}{" "}
              {commentsCount === 1 ? "comment" : "comments"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {canComment ? (
              <form className="grid gap-4" onSubmit={handleSubmit}>
                {replyingTo ? (
                  <div className="flex items-center justify-between gap-3 rounded-lg bg-pin-red-50 px-4 py-3 text-sm text-foreground">
                    <span>
                      Replying to <strong>{replyingTo.author.name}</strong>
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setReplyingTo(null)}
                      aria-label="Cancel reply"
                    >
                      <X aria-hidden="true" />
                    </Button>
                  </div>
                ) : null}
                <div className="grid gap-2">
                  <Label htmlFor="project-comment">
                    {replyingTo ? "Your reply" : "Join the discussion"}
                  </Label>
                  <Textarea
                    ref={composerRef}
                    id="project-comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    maxLength={2000}
                    rows={5}
                    aria-invalid={formError ? "true" : undefined}
                    aria-describedby={
                      formError ? "project-comment-error" : undefined
                    }
                    placeholder="Write a respectful, project-focused comment."
                  />
                  <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
                    <span>Plain text only. Maximum 2,000 characters.</span>
                    <span>{comment.length}/2,000</span>
                  </div>
                  {formError ? (
                    <p
                      id="project-comment-error"
                      className="text-sm font-medium text-destructive"
                      role="alert"
                    >
                      {formError}
                    </p>
                  ) : null}
                </div>
                <Button type="submit" className="w-fit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="animate-spin"
                    />
                  ) : null}
                  {isSubmitting
                    ? "Posting..."
                    : replyingTo
                      ? "Post reply"
                      : "Post comment"}
                </Button>
              </form>
            ) : user ? (
              <p className="text-sm text-muted-foreground">
                Guest accounts can ask questions, and the owning Exhibitor can
                reply. Administrators can moderate the discussion.
              </p>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Sign in with a Guest account to join this discussion.
                </p>
                <Button variant="outline" asChild>
                  <Link
                    to="/login"
                    state={{
                      from: {
                        pathname: `/projects/${project.slug}`,
                        hash: "#discussion",
                      },
                    }}
                  >
                    Sign in to comment
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {error ? (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Discussion unavailable</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <div className="mt-8">
          {isLoading ? (
            <p className="text-center text-muted-foreground" role="status">
              Loading project discussion...
            </p>
          ) : comments.length === 0 ? (
            <Card className="items-center py-10 text-center">
              <CardContent>
                <p className="font-semibold text-foreground">
                  No comments yet
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start the conversation with a thoughtful question.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {comments.map((item) => (
                <CommentCard
                  key={item.id}
                  comment={item}
                  canReply={canComment}
                  canModerate={canModerate}
                  onReply={handleReply}
                  onDelete={setCommentToDelete}
                />
              ))}
            </div>
          )}

          {meta && meta.current_page < meta.last_page ? (
            <Button
              type="button"
              variant="outline"
              className="mt-8"
              onClick={() => loadComments(meta.current_page + 1, true)}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <LoaderCircle aria-hidden="true" className="animate-spin" />
              ) : null}
              {isLoadingMore ? "Loading..." : "Load more comments"}
            </Button>
          ) : null}
        </div>

        <ConfirmActionDialog
          open={Boolean(commentToDelete)}
          onOpenChange={(open) => {
            if (!open && !isDeleting) {
              setCommentToDelete(null);
            }
          }}
          title="Remove this comment thread?"
          description="The selected comment and every reply beneath it will be removed. This action cannot be undone."
          confirmLabel="Remove thread"
          isPending={isDeleting}
          onConfirm={handleDelete}
        />
      </div>
    </section>
  );
}
