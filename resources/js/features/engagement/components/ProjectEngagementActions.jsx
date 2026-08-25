import {
  Heart,
  LoaderCircle,
  MessageCircle,
  Share2,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import {
  addFavorite,
  castVote,
  removeFavorite,
} from "@/features/engagement/services/engagementApi";
import { getApiErrorMessage } from "@/utils/apiError";

function projectState(project) {
  return {
    project_id: project.id,
    is_favorited: Boolean(project.is_favorited),
    has_voted: Boolean(project.has_voted),
    favorites_count: Number(project.favorites_count || 0),
    votes_count: Number(project.votes_count || 0),
    comments_count: Number(project.comments_count || 0),
  };
}

export function ProjectEngagementActions({
  project,
  compact = false,
  onChange,
}) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState(() => projectState(project));
  const [pendingAction, setPendingAction] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const canEngage = user?.role === "Guest";

  useEffect(() => {
    setState(projectState(project));
  }, [
    project.id,
    project.is_favorited,
    project.has_voted,
    project.favorites_count,
    project.votes_count,
    project.comments_count,
  ]);

  function requireGuestAccount() {
    if (!user) {
      navigate("/login", {
        state: { from: location },
      });

      return false;
    }

    return canEngage;
  }

  function applyState(nextState, successMessage) {
    setState(nextState);
    setMessage(successMessage);
    onChange?.(nextState);
  }

  async function handleFavorite() {
    if (!requireGuestAccount()) {
      return;
    }

    setPendingAction("favorite");
    setError("");
    setMessage("");

    try {
      const nextState = state.is_favorited
        ? await removeFavorite(project.slug)
        : await addFavorite(project.slug);
      applyState(
        nextState,
        nextState.is_favorited
          ? "Saved to your favorites."
          : "Removed from your favorites."
      );
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Your favorite could not be updated."
        )
      );
    } finally {
      setPendingAction("");
    }
  }

  async function handleVote() {
    if (!requireGuestAccount() || state.has_voted) {
      return;
    }

    setPendingAction("vote");
    setError("");
    setMessage("");

    try {
      const nextState = await castVote(project.slug);
      applyState(nextState, "Your People's Choice vote has been recorded.");
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Your vote could not be recorded.")
      );
    } finally {
      setPendingAction("");
    }
  }

  async function handleShare() {
    const url = `${window.location.origin}/projects/${project.slug}`;
    const shareData = {
      title: project.title,
      text: `Explore ${project.title} in the TARC Nexus VM2026 exhibition.`,
      url,
    };

    setError("");
    setMessage("");

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMessage("Project shared.");
      } else {
        await navigator.clipboard.writeText(url);
        setMessage("Project link copied.");
      }
    } catch (shareError) {
      if (shareError?.name !== "AbortError") {
        setError("The project link could not be shared.");
      }
    }
  }

  const unavailableTitle =
    user && !canEngage
      ? "Favorites and voting are available to Guest accounts."
      : undefined;

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={state.is_favorited ? "secondary" : "outline"}
          size={compact ? "sm" : "default"}
          onClick={handleFavorite}
          disabled={pendingAction !== "" || (user && !canEngage)}
          aria-pressed={state.is_favorited}
          title={unavailableTitle}
        >
          {pendingAction === "favorite" ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            <Heart
              aria-hidden="true"
              className={state.is_favorited ? "fill-current" : undefined}
            />
          )}
          {compact
            ? state.favorites_count.toLocaleString()
            : state.is_favorited
              ? `Saved (${state.favorites_count.toLocaleString()})`
              : `Favorite (${state.favorites_count.toLocaleString()})`}
        </Button>

        <Button
          type="button"
          variant="highlight"
          size={compact ? "sm" : "default"}
          onClick={handleVote}
          disabled={
            pendingAction !== "" || state.has_voted || (user && !canEngage)
          }
          aria-pressed={state.has_voted}
          title={
            state.has_voted
              ? "You have already voted for this project."
              : unavailableTitle
          }
        >
          {pendingAction === "vote" ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            <Trophy aria-hidden="true" />
          )}
          {compact
            ? state.votes_count.toLocaleString()
            : state.has_voted
              ? `Voted (${state.votes_count.toLocaleString()})`
              : `Vote (${state.votes_count.toLocaleString()})`}
        </Button>

        {compact ? (
          <Button variant="ghost" size="sm" asChild>
            <Link
              to={`/projects/${project.slug}#discussion`}
              aria-label={`${state.comments_count} comments on ${project.title}`}
            >
              <MessageCircle aria-hidden="true" />
              {state.comments_count.toLocaleString()}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <a href="#discussion">
              <MessageCircle aria-hidden="true" />
              Discussion ({state.comments_count.toLocaleString()})
            </a>
          </Button>
        )}

        <Button
          type="button"
          variant="ghost"
          size={compact ? "sm" : "default"}
          onClick={handleShare}
        >
          <Share2 aria-hidden="true" />
          {compact ? "Share" : "Share project"}
        </Button>
      </div>

      <div
        className={`text-sm ${error ? "font-medium text-destructive" : "text-muted-foreground"}`}
        role={error ? "alert" : "status"}
        aria-live="polite"
      >
        {error || message}
      </div>
    </div>
  );
}
