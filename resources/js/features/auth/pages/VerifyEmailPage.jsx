import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AlertCircle, MailCheck } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { resendVerificationEmail } from "@/features/auth/services/authApi";
import { getApiErrorMessage } from "@/utils/apiError";

export function VerifyEmailPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (user?.email_verified_at) {
    return <Navigate to="/profile" replace />;
  }

  async function handleResend() {
    setMessage("");
    setError("");
    setIsSending(true);

    try {
      const response = await resendVerificationEmail();
      setMessage(response.message);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to send another verification link."
        )
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Email verification"
      title="Check your email"
      description={`We sent a verification link to ${user?.email}. Open it in this browser to verify your account.`}
    >
      <div className="grid gap-6">
        <div className="grid place-items-center rounded-lg bg-pin-red-50 p-8 text-center">
          <MailCheck
            className="size-12 text-primary"
            aria-hidden="true"
          />
          <p className="mt-4 max-w-[44ch] text-sm text-foreground">
            The link is time-limited. Check your spam folder if it does not
            arrive within a few minutes.
          </p>
        </div>

        {message ? (
          <Alert className="border-border bg-cream-card">
            <AlertTitle>Verification link sent</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}

        {error ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Unable to resend</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="button" onClick={handleResend} disabled={isSending}>
          {isSending ? "Sending..." : "Resend verification email"}
        </Button>
      </div>
    </AuthShell>
  );
}
