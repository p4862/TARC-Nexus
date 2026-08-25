import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { FormField } from "@/components/form/FormField";
import { requestPasswordReset } from "@/features/auth/services/authApi";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
    } catch (error) {
      setErrors(getValidationErrors(error));
      setSubmitError(
        getApiErrorMessage(
          error,
          "Unable to request a reset link. Please try again."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Reset your password"
      description="Enter your account email and we will send a time-limited password reset link if the account exists."
    >
      <div className="grid gap-6">
        {isSubmitted ? (
          <Alert className="border-border bg-cream-card">
            <CheckCircle2
              className="text-foreground"
              aria-hidden="true"
            />
            <AlertTitle>Check your inbox</AlertTitle>
            <AlertDescription>
              If an account exists for that email, a reset link has been sent.
            </AlertDescription>
          </Alert>
        ) : null}

        {submitError ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Request unsuccessful</AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}

        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <FormField id="email" label="Email address" error={errors.email?.[0]}>
            {(fieldProps) => (
              <Input
                {...fieldProps}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors({});
                }}
                required
              />
            )}
          </FormField>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending link..." : "Send reset link"}
          </Button>
        </form>

        <Button variant="link" asChild>
          <Link to="/login">Return to sign in</Link>
        </Button>
      </div>
    </AuthShell>
  );
}
