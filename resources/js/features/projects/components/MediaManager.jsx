import {
  Download,
  FileText,
  FileUp,
  Image as ImageIcon,
  MonitorPlay,
  Trash2,
} from "lucide-react";
import { useState } from "react";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isRenderableImageMedia } from "@/features/exhibition/utils/media";
import {
  deleteProjectMedia,
  uploadProjectMedia,
} from "@/features/projects/services/projectApi";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

const TYPE_OPTIONS = [
  {
    value: "image",
    label: "Screenshot",
    accept: ".jpg,.jpeg,.png,.webp",
    hint: "JPG, PNG, or WEBP up to 10 MB",
  },
  {
    value: "poster",
    label: "Poster",
    accept: ".jpg,.jpeg,.png,.webp,.pdf",
    hint: "JPG, PNG, WEBP, or PDF up to 20 MB",
  },
  {
    value: "video",
    label: "Uploaded video",
    accept: ".mp4,.webm",
    hint: "MP4 or WEBM up to 100 MB",
  },
  {
    value: "document",
    label: "Document or slides",
    accept: ".pdf,.docx,.ppt,.pptx",
    hint: "PDF, DOCX, PPT, or PPTX up to 20 MB",
  },
];

const TYPE_LABELS = Object.fromEntries(
  TYPE_OPTIONS.map((option) => [option.value, option.label])
);

const TYPE_ICONS = {
  image: ImageIcon,
  poster: ImageIcon,
  video: MonitorPlay,
  document: FileText,
};

export function MediaManager({
  projectId,
  media,
  onChange,
  disabled = false,
}) {
  const [type, setType] = useState("image");
  const [file, setFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const selectedType = TYPE_OPTIONS.find((option) => option.value === type);

  async function handleUpload(event) {
    event.preventDefault();

    if (!file) {
      setErrors({ file: ["Select a file to upload."] });
      return;
    }

    setMessage("");
    setError("");
    setErrors({});
    setIsUploading(true);

    try {
      const uploaded = await uploadProjectMedia(projectId, { type, file });
      onChange([...media, uploaded]);
      setMessage("Media uploaded successfully.");
      setFile(null);
      setFileInputKey((current) => current + 1);
    } catch (uploadError) {
      setError(
        getApiErrorMessage(uploadError, "Unable to upload project media.")
      );
      setErrors(getValidationErrors(uploadError));
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete() {
    if (!assetToDelete) {
      return;
    }

    setMessage("");
    setError("");
    setDeletingId(assetToDelete.id);

    try {
      await deleteProjectMedia(projectId, assetToDelete.id);
      onChange(media.filter((item) => item.id !== assetToDelete.id));
      setMessage("Media removed successfully.");
      setAssetToDelete(null);
    } catch (deleteError) {
      setError(
        getApiErrorMessage(deleteError, "Unable to remove project media.")
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project media</CardTitle>
        <CardDescription>
          Add screenshots, posters, demonstrations, reports, manuals, technical
          documentation, and presentation decks.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {message ? (
          <Alert className="border-border bg-cream-card">
            <AlertTitle className="text-foreground">Media updated</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Media action failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {!disabled ? (
          <form
            className="grid gap-4 rounded-xl border border-border bg-muted/30 p-4 md:grid-cols-[minmax(180px,0.45fr)_minmax(0,1fr)_auto] md:items-end"
            onSubmit={handleUpload}
          >
            <div className="grid gap-2">
              <Label htmlFor="media-type">Media type</Label>
              <Select
                value={type}
                onValueChange={(value) => {
                  setType(value);
                  setFile(null);
                  setErrors({});
                  setFileInputKey((current) => current + 1);
                }}
              >
                <SelectTrigger id="media-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-media-file">Choose file</Label>
              <Input
                key={fileInputKey}
                id="project-media-file"
                type="file"
                accept={selectedType.accept}
                aria-describedby="project-media-hint"
                aria-invalid={errors.file ? true : undefined}
                onChange={(event) => setFile(event.target.files?.[0] || null)}
                required
              />
              <p
                id="project-media-hint"
                className="text-sm text-muted-foreground"
              >
                {selectedType.hint}
              </p>
              {errors.file?.[0] ? (
                <p
                  className="text-sm font-medium text-destructive"
                  role="alert"
                >
                  {errors.file[0]}
                </p>
              ) : null}
            </div>
            <Button type="submit" disabled={isUploading}>
              <FileUp aria-hidden="true" />
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        ) : (
          <Alert>
            <AlertTitle>Media is locked</AlertTitle>
            <AlertDescription>
              Submitted projects cannot change media while they are in the
              review workflow.
            </AlertDescription>
          </Alert>
        )}

        {media.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No media has been uploaded yet.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {media.map((asset) => {
              const TypeIcon = TYPE_ICONS[asset.type] || FileText;
              const preview = isRenderableImageMedia(asset)
                ? asset.thumbnail_url || asset.url
                : null;

              return (
                <li
                  key={asset.id}
                  className="overflow-hidden rounded-xl border border-border bg-background"
                >
                  <div className="flex aspect-[16/7] items-center justify-center bg-muted">
                    {preview ? (
                      <img
                        src={preview}
                        alt=""
                        className="size-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <TypeIcon
                        aria-hidden="true"
                        className="size-9 text-primary"
                      />
                    )}
                  </div>
                  <div className="grid gap-3 p-4">
                    <div className="min-w-0">
                      <Badge variant="secondary" className="mb-2">
                        {TYPE_LABELS[asset.type] || asset.type}
                      </Badge>
                      <p
                        className="truncate font-semibold text-foreground"
                        title={asset.filename}
                      >
                        {asset.filename}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={asset.url}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          <Download aria-hidden="true" />
                          Open
                        </a>
                      </Button>
                      {!disabled ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          disabled={deletingId === asset.id}
                          onClick={() => setAssetToDelete(asset)}
                        >
                          <Trash2 aria-hidden="true" />
                          {deletingId === asset.id ? "Removing..." : "Remove"}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <ConfirmActionDialog
          open={Boolean(assetToDelete)}
          onOpenChange={(open) => {
            if (!open && deletingId === null) {
              setAssetToDelete(null);
            }
          }}
          title="Remove project media?"
          description={
            assetToDelete
              ? `"${assetToDelete.filename}" will be permanently removed from this project.`
              : ""
          }
          confirmLabel="Remove media"
          isPending={deletingId !== null}
          onConfirm={handleDelete}
        />
      </CardContent>
    </Card>
  );
}
