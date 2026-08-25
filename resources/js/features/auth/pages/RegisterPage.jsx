import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { FormField } from "@/components/form/FormField";
import { GoogleButton } from "@/features/auth/components/GoogleButton";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

const PUBLIC_ROLES = [
  {
    value: "Guest",
    label: "Guest",
  },
  {
    value: "Exhibitor",
    label: "Exhibitor",
  },
];

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    institution: "",
    role: "Guest",
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
      await register(form);
      navigate("/email/verify", { replace: true });
    } catch (error) {
      setErrors(getValidationErrors(error));
      setSubmitError(
        getApiErrorMessage(
          error,
          "Unable to create your account. Please review the form and try again."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Join the exhibition"
      title="Create your account"
      description="Register as a guest or exhibitor. Administrator access is granted only through the trusted administration process."
    >
      <div className="grid gap-6">
        {submitError ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Registration unsuccessful</AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        ) : null}

        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <FormField id="name" label="Full name" error={errors.name?.[0]}>
            {(fieldProps) => (
              <Input
                {...fieldProps}
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
              />
            )}
          </FormField>

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
            id="institution"
            label="Institution"
            error={errors.institution?.[0]}
          >
            {(fieldProps) => (
              <Input
                {...fieldProps}
                autoComplete="organization"
                value={form.institution}
                onChange={(event) =>
                  updateField("institution", event.target.value)
                }
                required
              />
            )}
          </FormField>

          <FormField
            id="role"
            label="Account type"
            hint="Choose Exhibitor if you will submit a student project."
            error={errors.role?.[0]}
          >
            {(fieldProps) => (
              <Select
                value={form.role}
                onValueChange={(value) => updateField("role", value)}
              >
                <SelectTrigger {...fieldProps} className="w-full">
                  <SelectValue placeholder="Choose an account type" />
                </SelectTrigger>
                <SelectContent>
                  {PUBLIC_ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormField>

          <FormField
            id="password"
            label="Password"
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
            label="Confirm password"
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
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="flex items-center gap-4" aria-hidden="true">
          <Separator className="flex-1" />
          <span className="text-sm font-semibold text-muted-foreground uppercase">
            Or
          </span>
          <Separator className="flex-1" />
        </div>

        <GoogleButton role={form.role}>
          Register with Google as {form.role}
        </GoogleButton>

        <p className="text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center font-semibold text-primary underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
