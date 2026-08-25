import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Link2,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/form/FormField";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import {
  removeAvatar,
  updateProfile,
  uploadAvatar,
} from "@/features/profile/services/profileApi";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

export function ProfilePage() {
  const { user, setUser } = useAuth();
  const [searchParams] = useSearchParams();
  const avatarInputRef = useRef(null);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    institution: user.institution,
    biography: user.biography || "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [requestError, setRequestError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  const googleStatus = searchParams.get("google");
  const googleError = searchParams.get("google_error");
  const initials = useMemo(
    () =>
      user.name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join(""),
    [user.name]
  );

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      institution: user.institution,
      biography: user.biography || "",
    });
  }, [user]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleProfileSubmit(event) {
    event.preventDefault();
    setMessage("");
    setRequestError("");
    setErrors({});
    setIsSaving(true);

    try {
      const updatedUser = await updateProfile(form);
      setUser(updatedUser);
      setMessage(
        updatedUser.email_verified_at
          ? "Your profile has been updated."
          : "Your profile has been updated. Verify your email address to complete the email change."
      );
    } catch (error) {
      setErrors(getValidationErrors(error));
      setRequestError(
        getApiErrorMessage(
          error,
          "Unable to update your profile. Please try again."
        )
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAvatarChange(event) {
    const [file] = event.target.files;

    if (!file) {
      return;
    }

    setMessage("");
    setRequestError("");
    setErrors({});
    setIsUpdatingAvatar(true);

    try {
      const updatedUser = await uploadAvatar(file);
      setUser(updatedUser);
      setMessage("Your profile picture has been updated.");
    } catch (error) {
      setErrors(getValidationErrors(error));
      setRequestError(
        getApiErrorMessage(error, "Unable to upload the profile picture.")
      );
    } finally {
      setIsUpdatingAvatar(false);
      event.target.value = "";
    }
  }

  async function handleAvatarRemove() {
    setMessage("");
    setRequestError("");
    setErrors({});
    setIsUpdatingAvatar(true);

    try {
      const updatedUser = await removeAvatar();
      setUser(updatedUser);
      setMessage("Your profile picture has been removed.");
    } catch (error) {
      setRequestError(
        getApiErrorMessage(error, "Unable to remove the profile picture.")
      );
    } finally {
      setIsUpdatingAvatar(false);
    }
  }

  return (
    <section className="bg-muted/40">
      <div className="page-container page-section-compact">
        <PageHeader
          eyebrow="Account"
          title="Profile"
          description="Manage your exhibition identity, personal details, and connected sign-in methods."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <aside>
            <Card className="lg:sticky lg:top-24">
              <CardContent className="grid place-items-center gap-5 text-center">
                <Avatar className="size-28 ring-4 ring-pin-red-50">
                  <AvatarImage src={user.avatar_url || undefined} alt="" />
                  <AvatarFallback className="bg-pin-red-50 text-2xl font-bold text-primary">
                    {initials || <UserRound aria-hidden="true" />}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-display text-h4 font-bold text-foreground">
                    {user.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">
                    {user.institution}
                  </p>
                </div>

                <div className="grid w-full gap-3 border-t border-border pt-5 text-left">
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase">
                      Account type
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {user.role}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase">
                      Email address
                    </p>
                    <p className="mt-1 break-all text-sm text-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="grid w-full gap-3 border-t border-border pt-5">
                  <div className="text-left">
                    <p className="font-semibold text-foreground">
                      Profile picture
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      JPG, PNG, or WEBP, up to 2 MB.
                    </p>
                  </div>
                  <Label htmlFor="avatar" className="sr-only">
                    Profile picture file
                  </Label>
                  <input
                    ref={avatarInputRef}
                    id="avatar"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="absolute size-px overflow-hidden border-0 p-0 whitespace-nowrap [clip:rect(0,0,0,0)]"
                    onChange={handleAvatarChange}
                    aria-describedby={
                      errors.avatar?.[0] ? "avatar-error" : undefined
                    }
                  />
                  {errors.avatar?.[0] ? (
                    <p
                      id="avatar-error"
                      className="text-left text-sm font-medium text-destructive"
                      role="alert"
                    >
                      {errors.avatar[0]}
                    </p>
                  ) : null}
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={isUpdatingAvatar}
                  >
                    <Camera aria-hidden="true" />
                    {isUpdatingAvatar ? "Updating..." : "Choose picture"}
                  </Button>
                  {user.avatar_url ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleAvatarRemove}
                      disabled={isUpdatingAvatar}
                    >
                      <Trash2 aria-hidden="true" />
                      Remove picture
                    </Button>
                  ) : null}
                </div>

                {!user.email_verified_at ? (
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/email/verify">Verify email address</Link>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          </aside>

          <div className="grid min-w-0 gap-6">
            {message || googleStatus ? (
              <Alert className="border-border bg-cream-card">
                <CheckCircle2
                  className="text-foreground"
                  aria-hidden="true"
                />
                <AlertTitle>Profile ready</AlertTitle>
                <AlertDescription>
                  {message ||
                    (googleStatus === "linked"
                      ? "Google has been connected to your profile."
                      : "You signed in successfully with Google.")}
                </AlertDescription>
              </Alert>
            ) : null}

            {requestError || googleError ? (
              <Alert variant="destructive">
                <AlertCircle aria-hidden="true" />
                <AlertTitle>Action unsuccessful</AlertTitle>
                <AlertDescription>
                  {requestError || googleError}
                </AlertDescription>
              </Alert>
            ) : null}

            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Personal information</CardTitle>
                <CardDescription>
                  Keep your exhibition identity and institution details
                  current.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="grid gap-5 md:grid-cols-2"
                  onSubmit={handleProfileSubmit}
                  noValidate
                >
                  <FormField
                    id="name"
                    label="Full name"
                    error={errors.name?.[0]}
                  >
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
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

                  <div className="md:col-span-2">
                    <FormField
                      id="email"
                      label="Email address"
                      hint="Changing your email requires verification of the new address."
                      error={errors.email?.[0]}
                    >
                      {(fieldProps) => (
                        <Input
                          {...fieldProps}
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(event) =>
                            updateField("email", event.target.value)
                          }
                          required
                        />
                      )}
                    </FormField>
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      id="biography"
                      label="Biography"
                      hint="Share a concise introduction of up to 2,000 characters."
                      error={errors.biography?.[0]}
                    >
                      {(fieldProps) => (
                        <Textarea
                          {...fieldProps}
                          className="min-h-32 resize-y"
                          value={form.biography}
                          onChange={(event) =>
                            updateField("biography", event.target.value)
                          }
                        />
                      )}
                    </FormField>
                  </div>

                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      className="w-full sm:w-fit"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving changes..." : "Save profile"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Connected sign-in methods</CardTitle>
                <CardDescription>
                  Connect Google only when its email matches this profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-pin-red-50 text-primary">
                    <Link2 aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Google</p>
                    <p className="text-sm text-muted-foreground">
                      {user.google_connected ? "Connected" : "Not connected"}
                    </p>
                  </div>
                </div>
                {user.google_connected ? (
                  <Badge className="bg-cream-card text-foreground">
                    Connected
                  </Badge>
                ) : (
                  <Button variant="outline" asChild>
                    <a href="/api/v1/profile/google/redirect">
                      Connect Google
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
