import { AlertCircle, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { FormField } from "@/components/form/FormField";
import { ConfirmActionDialog } from "@/components/feedback/ConfirmActionDialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
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
  createAdminTaxonomy,
  deleteAdminTaxonomy,
  fetchAdminTaxonomies,
  updateAdminTaxonomy,
} from "@/features/administration/services/administrationApi";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

const EMPTY_TAXONOMIES = {
  categories: [],
  technologies: [],
  sdgs: [],
};

const CONFIGURATION = {
  categories: {
    title: "Solution categories",
    description: "Digital solution types available to project submissions.",
    singular: "category",
  },
  technologies: {
    title: "Technology tags",
    description: "Reusable tools and frameworks exhibitors can assign.",
    singular: "technology",
  },
  sdgs: {
    title: "SDG tags",
    description: "The approved SDG 8, SDG 11, and SDG 12 records.",
    singular: "SDG",
  },
};

function emptyForm(type) {
  if (type === "categories") {
    return { name: "", description: "", icon: "" };
  }

  if (type === "sdgs") {
    return { code: "", title: "", description: "" };
  }

  return { name: "" };
}

function TaxonomyForm({
  type,
  initialItem,
  isSaving,
  errors,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(
    initialItem ? { ...initialItem } : emptyForm(type)
  );

  useEffect(() => {
    setValues(initialItem ? { ...initialItem } : emptyForm(type));
  }, [initialItem, type]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-xl border border-border bg-muted/30 p-4"
    >
      {type === "sdgs" ? (
        <>
          <FormField
            id={`${type}-code`}
            label="SDG code"
            hint="Only codes 8, 11, and 12 are supported."
            error={errors.code?.[0]}
          >
            {(field) => (
              <Input
                {...field}
                value={values.code || ""}
                onChange={(event) => update("code", event.target.value)}
                placeholder="8"
              />
            )}
          </FormField>
          <FormField
            id={`${type}-title`}
            label="Title"
            error={errors.title?.[0]}
          >
            {(field) => (
              <Input
                {...field}
                value={values.title || ""}
                onChange={(event) => update("title", event.target.value)}
              />
            )}
          </FormField>
        </>
      ) : (
        <FormField
          id={`${type}-name`}
          label="Name"
          error={errors.name?.[0]}
        >
          {(field) => (
            <Input
              {...field}
              value={values.name || ""}
              onChange={(event) => update("name", event.target.value)}
            />
          )}
        </FormField>
      )}

      {type !== "technologies" ? (
        <FormField
          id={`${type}-description`}
          label="Description"
          error={errors.description?.[0]}
        >
          {(field) => (
            <Textarea
              {...field}
              value={values.description || ""}
              onChange={(event) => update("description", event.target.value)}
            />
          )}
        </FormField>
      ) : null}

      {type === "categories" ? (
        <FormField
          id={`${type}-icon`}
          label="Icon reference"
          hint="Optional stored icon key; the interface retains its existing Lucide icon set."
          error={errors.icon?.[0]}
        >
          {(field) => (
            <Input
              {...field}
              value={values.icon || ""}
              onChange={(event) => update("icon", event.target.value)}
            />
          )}
        </FormField>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={isSaving}>
          {initialItem ? (
            <Save aria-hidden="true" />
          ) : (
            <Plus aria-hidden="true" />
          )}
          {isSaving
            ? "Saving…"
            : initialItem
              ? `Save ${CONFIGURATION[type].singular}`
              : `Add ${CONFIGURATION[type].singular}`}
        </Button>
        {initialItem ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            <X aria-hidden="true" />
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}

function TaxonomyPanel({
  type,
  items,
  editingItem,
  isSaving,
  errors,
  onEdit,
  onCancel,
  onSubmit,
  onDelete,
}) {
  const configuration = CONFIGURATION[type];
  const [deleteItem, setDeleteItem] = useState(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{configuration.title}</CardTitle>
        <CardDescription>{configuration.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <TaxonomyForm
          type={type}
          initialItem={editingItem}
          isSaving={isSaving}
          errors={errors}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />

        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p className="font-semibold text-foreground">
                  {type === "sdgs"
                    ? `SDG ${item.code} · ${item.title}`
                    : item.name}
                </p>
                {item.description ? (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                ) : null}
                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                  {item.projects_count} assigned{" "}
                  {item.projects_count === 1 ? "project" : "projects"}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                >
                  <Pencil aria-hidden="true" />
                  Edit
                </Button>
                <ConfirmActionDialog
                  open={deleteItem?.id === item.id}
                  onOpenChange={(open) => setDeleteItem(open ? item : null)}
                  trigger={
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={item.projects_count > 0 || isSaving}
                      title={
                        item.projects_count > 0
                          ? "Assigned records cannot be deleted."
                          : undefined
                      }
                    >
                      <Trash2 aria-hidden="true" />
                      Delete
                    </Button>
                  }
                  title={`Delete ${
                    type === "sdgs" ? `SDG ${item.code}` : item.name
                  }?`}
                  description="This taxonomy record will be removed from future administration lists."
                  confirmLabel={`Delete ${configuration.singular}`}
                  isPending={isSaving}
                  onConfirm={() => onDelete(item)}
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function AdminTaxonomiesPage() {
  const [taxonomies, setTaxonomies] = useState(EMPTY_TAXONOMIES);
  const [editing, setEditing] = useState({ type: null, item: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [errorType, setErrorType] = useState(null);

  useEffect(() => {
    let active = true;

    fetchAdminTaxonomies()
      .then((data) => {
        if (active) {
          setTaxonomies(data);
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "Unable to load taxonomy records."
            )
          );
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(type, payload) {
    setIsSaving(true);
    setError("");
    setErrors({});
    setErrorType(type);

    try {
      const data =
        editing.type === type && editing.item
          ? await updateAdminTaxonomy(type, editing.item.id, payload)
          : await createAdminTaxonomy(type, payload);
      setTaxonomies(data);
      setEditing({ type: null, item: null });
      setErrorType(null);
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to save the taxonomy record.")
      );
      setErrors(getValidationErrors(requestError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(type, item) {
    setIsSaving(true);
    setError("");

    try {
      setTaxonomies(await deleteAdminTaxonomy(type, item.id));
      if (editing.type === type && editing.item?.id === item.id) {
        setEditing({ type: null, item: null });
      }
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to delete the taxonomy record."
        )
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        eyebrow="Project classification"
        title="Manage taxonomies"
        description="Maintain solution categories, reusable technology tags, and the three SDGs approved for this exhibition."
      />

      {error ? (
        <Alert variant="destructive">
          <AlertCircle aria-hidden="true" />
          <AlertTitle>Taxonomy action failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {isLoading ? (
        <div
          className="rounded-xl border border-border bg-background p-8 text-center text-muted-foreground"
          role="status"
        >
          Loading taxonomies…
        </div>
      ) : (
        <div className="grid gap-6">
          {Object.keys(CONFIGURATION).map((type) => (
            <TaxonomyPanel
              key={type}
              type={type}
              items={taxonomies[type]}
              editingItem={editing.type === type ? editing.item : null}
              isSaving={isSaving}
              errors={errorType === type ? errors : {}}
              onEdit={(item) => {
                setEditing({ type, item });
                setErrors({});
                setErrorType(null);
              }}
              onCancel={() => {
                setEditing({ type: null, item: null });
                setErrors({});
                setErrorType(null);
              }}
              onSubmit={(payload) => handleSubmit(type, payload)}
              onDelete={(item) => handleDelete(type, item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
