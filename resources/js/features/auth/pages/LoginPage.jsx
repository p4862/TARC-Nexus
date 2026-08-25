import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { FormField } from "@/components/form/FormField";
import { GoogleButton } from "@/features/auth/components/GoogleButton";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

export function LoginPage() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const oauthError = searchParams.get("oauth_error");
  const resetCompleted = searchParams.get("reset") === "complete";

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setErrors({});
    setIsSubmitting(true);

    try {
      await login(form);
      const destination = location.state?.from?.pathname || "/profile";
      navigate(destination, { replace: true });
    } catch (error) {
      setErrors(getValidationErrors(error));
      setSubmitError(
        getApiErrorMessage(error, "Unable to sign in. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to TARC Nexus"
      description="Access your exhibition profile and continue contributing to the VM2026 showcase."
    >
      <div className="grid gap-6">
        {resetCompleted ? (
          <Alert className="border-border bg-cream-card">
            <CheckCircle2
              className="text-foreground"
              aria-hidden="true"
            />
            <AlertTitle>Password updated</AlertTitle>
            <AlertDescription>
              You can now sign in with your new password.
            </AlertDescription>
          </Alert>
        ) : null}

        {oauthError || submitError ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Sign-in unsuccessful</AlertTitle>
            <AlertDescription>{oauthError || submitError}</AlertDescription>
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
            label="Password"
            error={errors.password?.[0]}
          >
            {(fieldProps) => (
              <Input
                {...fieldProps}
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                required
              />
            )}
          </FormField>

          <div className="flex min-h-11 flex-wrap items-center justify-between gap-3">
            <div className="flex min-h-11 items-center gap-3">
              <Checkbox
                id="remember"
                checked={form.remember}
                onCheckedChange={(checked) =>
                  updateField("remember", checked === true)
                }
              />
              <Label htmlFor="remember">Keep me signed in</Label>
            </div>
            <Link
              to="/forgot-password"
              className="inline-flex min-h-11 items-center rounded-md text-sm font-semibold text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center gap-4" aria-hidden="true">
          <Separator className="flex-1" />
          <span className="text-sm font-semibold text-muted-foreground uppercase">
            Or
          </span>
          <Separator className="flex-1" />
        </div>

        <GoogleButton />

        <p className="text-center text-sm text-muted-foreground">
          New to the exhibition?{" "}
          <Link
            to="/register"
            className="inline-flex min-h-11 items-center font-semibold text-primary underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
