import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { FormField } from "@/components/form/FormField";
import { RouteLoadingState } from "@/features/auth/components/RouteLoadingState";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { fetchPendingGoogleRegistration } from "@/features/auth/services/authApi";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

export function GoogleRegistrationPage() {
  const { finishGoogleRegistration } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(null);
  const [form, setForm] = useState({
    name: "",
    institution: "",
    role: "Guest",
  });
  const [errors, setErrors] = useState({});
  const [pageError, setPageError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetchPendingGoogleRegistration()
      .then((registration) => {
        if (!isMounted) {
          return;
        }

        setPending(registration);
        setForm({
          name: registration.name || "",
          institution: "",
          role: registration.role || "Guest",
        });
      })
      .catch((error) => {
        if (isMounted) {
          setPageError(
            getApiErrorMessage(
              error,
              "Your Google registration session is unavailable."
            )
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    setPageError("");
    setIsSubmitting(true);

    try {
      await finishGoogleRegistration(form);
      navigate("/profile", { replace: true });
    } catch (error) {
      setErrors(getValidationErrors(error));
      setPageError(
        getApiErrorMessage(
          error,
          "Unable to complete Google registration. Please try again."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <RouteLoadingState />;
  }

  return (
    <AuthShell
      eyebrow="Google registration"
      title="Complete your exhibition profile"
      description="Google verified your identity. Add the remaining information required by TARC Nexus."
    >
      {pageError && !pending ? (
        <div className="grid gap-6">
          <Alert variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Registration session unavailable</AlertTitle>
            <AlertDescription>{pageError}</AlertDescription>
          </Alert>
          <Button asChild>
            <Link to="/register">Restart registration</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {pageError ? (
            <Alert variant="destructive">
              <AlertCircle aria-hidden="true" />
              <AlertTitle>Registration unsuccessful</AlertTitle>
              <AlertDescription>{pageError}</AlertDescription>
            </Alert>
          ) : null}

          <div className="rounded-lg border border-pin-red-100 bg-pin-red-50 p-4">
            <p className="text-sm font-semibold text-foreground">
              Google account
            </p>
            <p className="mt-1 break-all text-sm text-muted-foreground">
              {pending?.email}
            </p>
          </div>

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
              hint="Administrator accounts cannot be created through public registration."
              error={errors.role?.[0]}
            >
              {(fieldProps) => (
                <Select
                  value={form.role}
                  onValueChange={(value) => updateField("role", value)}
                >
                  <SelectTrigger {...fieldProps} className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Guest">Guest</SelectItem>
                    <SelectItem value="Exhibitor">Exhibitor</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </FormField>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Completing profile..." : "Complete registration"}
            </Button>
          </form>
        </div>
      )}
    </AuthShell>
  );
}
