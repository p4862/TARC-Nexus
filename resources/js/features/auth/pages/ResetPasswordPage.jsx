import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { FormField } from "@/components/form/FormField";
import { resetPassword } from "@/features/auth/services/authApi";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

export function ResetPasswordPage() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: searchParams.get("email") || "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await resetPassword({ ...form, token });
      navigate("/login?reset=complete", { replace: true });
    } catch (error) {
      setErrors(getValidationErrors(error));
      setSubmitError(
        getApiErrorMessage(
          error,
          "The password could not be reset. The link may have expired."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Choose a new password"
      description="Set a strong password for your TARC Nexus account."
    >
      <div className="grid gap-6">
        {submitError ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Reset unsuccessful</AlertTitle>
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
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
            )}
          </FormField>

          <FormField
            id="password"
            label="New password"
            hint="Use at least 8 characters with upper- and lowercase letters and a number."
            error={errors.password?.[0]}
          >
            {(fieldProps) => (
              <Input
                {...fieldProps}
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                required
              />
            )}
          </FormField>

          <FormField
            id="password_confirmation"
            label="Confirm new password"
            error={errors.password_confirmation?.[0]}
          >
            {(fieldProps) => (
              <Input
                {...fieldProps}
                type="password"
                autoComplete="new-password"
                value={form.password_confirmation}
                onChange={(event) =>
                  updateField("password_confirmation", event.target.value)
                }
                required
              />
            )}
          </FormField>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating password..." : "Update password"}
          </Button>
        </form>

        <Button variant="link" asChild>
          <Link to="/login">Return to sign in</Link>
        </Button>
      </div>
    </AuthShell>
  );
}
