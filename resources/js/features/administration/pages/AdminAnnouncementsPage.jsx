import {
  AlertCircle,
  BellRing,
  CalendarClock,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { FormField } from "@/components/form/FormField";
import { ConfirmActionDialog } from "@/components/feedback/ConfirmActionDialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
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
import { Textarea } from "@/components/ui/textarea";
import { AdminPageHeader } from "@/features/administration/components/AdminPageHeader";
import {
  createAdminAnnouncement,
  deleteAdminAnnouncement,
  fetchAdminAnnouncements,
  updateAdminAnnouncement,
} from "@/features/administration/services/administrationApi";
import { PaginationControls } from "@/features/exhibition/components/PaginationControls";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  dateStyle: "medium",
  timeStyle: "short",
});

function localDateTimeValue(date = new Date()) {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);

  return local.toISOString().slice(0, 16);
}

function announcementFormValue(announcement) {
  return announcement
    ? {
        title: announcement.title,
        content: announcement.content,
        published_at: localDateTimeValue(
          new Date(announcement.published_at)
        ),
      }
    : {
        title: "",
        content: "",
        published_at: localDateTimeValue(),
      };
}

function AnnouncementForm({
  announcement,
  isSaving,
  errors,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(
    announcementFormValue(announcement)
  );

  useEffect(() => {
    setValues(announcementFormValue(announcement));
  }, [announcement]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...values,
      published_at: new Date(values.published_at).toISOString(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-xl border border-pin-red-100 bg-pin-red-50 p-5 shadow-xs"
    >
      <FormField
        id="announcement-title"
        label="Title"
        error={errors.title?.[0]}
      >
        {(field) => (
          <Input
            {...field}
            value={values.title}
            onChange={(event) => update("title", event.target.value)}
            maxLength={255}
            required
          />
        )}
      </FormField>
      <FormField
        id="announcement-content"
        label="Announcement"
        error={errors.content?.[0]}
      >
        {(field) => (
          <Textarea
            {...field}
            value={values.content}
            onChange={(event) => update("content", event.target.value)}
            maxLength={10000}
            required
          />
        )}
      </FormField>
      <FormField
        id="announcement-published-at"
        label="Publication date and time"
        hint="Future dates schedule the announcement; past dates publish it immediately."
        error={errors.published_at?.[0]}
      >
        {(field) => (
          <Input
            {...field}
            type="datetime-local"
            value={values.published_at}
            onChange={(event) => update("published_at", event.target.value)}
            required
          />
        )}
      </FormField>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={isSaving}>
          {announcement ? (
            <Save aria-hidden="true" />
          ) : (
            <Plus aria-hidden="true" />
          )}
          {isSaving
            ? "Saving…"
            : announcement
              ? "Save announcement"
              : "Create announcement"}
        </Button>
        {announcement ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            <X aria-hidden="true" />
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}

export function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const loadAnnouncements = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchAdminAnnouncements({ page });
      setAnnouncements(response.data);
      setMeta(response.meta);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to load announcements."
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  async function handleSubmit(payload) {
    setIsSaving(true);
    setError("");
    setErrors({});

    try {
      if (editing) {
        await updateAdminAnnouncement(editing.id, payload);
      } else {
        await createAdminAnnouncement(payload);
      }

      setEditing(null);
      await loadAnnouncements();
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to save the announcement."
        )
      );
      setErrors(getValidationErrors(requestError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteCandidate) {
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await deleteAdminAnnouncement(deleteCandidate.id);
      if (editing?.id === deleteCandidate.id) {
        setEditing(null);
      }
      await loadAnnouncements();
      setDeleteCandidate(null);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to delete the announcement."
        )
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        eyebrow="Homepage communication"
        title="Manage announcements"
        description="Publish news, schedules, deadlines, and maintenance notices on the exhibition homepage."
      />

      {error ? (
        <Alert variant="destructive">
          <AlertCircle aria-hidden="true" />
          <AlertTitle>Announcement action failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <AnnouncementForm
        announcement={editing}
        isSaving={isSaving}
        errors={errors}
        onSubmit={handleSubmit}
        onCancel={() => {
          setEditing(null);
          setErrors({});
        }}
      />

      {isLoading ? (
        <div
          className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground shadow-xs"
          role="status"
        >
          Loading announcements…
        </div>
      ) : announcements.length === 0 ? (
        <Card className="items-center py-12 text-center">
          <BellRing
            aria-hidden="true"
            className="size-10 text-primary"
          />
          <CardHeader>
            <CardTitle>No announcements yet</CardTitle>
            <CardDescription>
              Create the first homepage notice using the form above.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {announcements.map((announcement) => {
            const isPublished =
              new Date(announcement.published_at).getTime() <= Date.now();

            return (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <Badge
                      variant="outline"
                      className={
                        isPublished
                          ? "border-pin-red-100 bg-pin-red-50 text-primary"
                          : "border-border bg-muted text-foreground"
                      }
                    >
                      <CalendarClock aria-hidden="true" />
                      {isPublished ? "Published" : "Scheduled"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {dateFormatter.format(
                        new Date(announcement.published_at)
                      )}
                    </span>
                  </div>
                  <CardTitle>{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {announcement.content}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditing(announcement);
                        setErrors({});
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <Pencil aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteCandidate(announcement)}
                      disabled={isSaving}
                    >
                      <Trash2 aria-hidden="true" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <PaginationControls meta={meta} onPageChange={setPage} />

      <ConfirmActionDialog
        open={Boolean(deleteCandidate)}
        onOpenChange={(open) => {
          if (!open && !isSaving) {
            setDeleteCandidate(null);
          }
        }}
        title={
          deleteCandidate
            ? `Delete ${deleteCandidate.title}?`
            : "Delete announcement?"
        }
        description="This announcement will be removed from administrator lists and the homepage if it is currently published."
        confirmLabel="Delete announcement"
        isPending={isSaving}
        onConfirm={handleDelete}
      />
    </div>
  );
}
