import { FormField } from "@/components/form/FormField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SdgBadge } from "@/features/projects/components/SdgBadge";

export function ProjectTaxonomyFields({
  form,
  setForm,
  taxonomies,
  errors,
  disabled = false,
  showCategory = true,
}) {
  function toggleSdg(sdg, checked) {
    setForm((current) => ({
      ...current,
      sdgs: checked
        ? [
            ...current.sdgs,
            { id: String(sdg.id), contribution_description: "" },
          ]
        : current.sdgs.filter((item) => item.id !== String(sdg.id)),
    }));
  }

  function updateSdgContribution(sdgId, contribution) {
    setForm((current) => ({
      ...current,
      sdgs: current.sdgs.map((item) =>
        item.id === String(sdgId)
          ? { ...item, contribution_description: contribution }
          : item
      ),
    }));
  }

  function toggleTechnology(technologyId, checked) {
    const id = String(technologyId);

    setForm((current) => ({
      ...current,
      technology_ids: checked
        ? [...current.technology_ids, id]
        : current.technology_ids.filter((item) => item !== id),
    }));
  }

  return (
    <div className="grid gap-8">
      {showCategory ? (
        <FormField
          id="category_id"
          label="Solution category"
          error={errors.category_id?.[0]}
        >
          {(fieldProps) => (
            <Select
              value={form.category_id}
              onValueChange={(value) =>
                setForm((current) => ({ ...current, category_id: value }))
              }
              disabled={disabled}
              required
            >
              <SelectTrigger {...fieldProps} className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {taxonomies.categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
      ) : null}

      <fieldset className="grid gap-4" disabled={disabled}>
        <legend className="font-semibold text-foreground">
          SDG alignment
        </legend>
        <p className="text-sm text-muted-foreground">
          Select at least one goal and explain the project&apos;s contribution.
        </p>
        {taxonomies.sdgs.map((sdg) => {
          const selectedIndex = form.sdgs.findIndex(
            (item) => item.id === String(sdg.id)
          );
          const selected = selectedIndex >= 0;

          return (
            <div
              key={sdg.id}
              className="grid gap-4 rounded-lg border border-border p-4"
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={`sdg-${sdg.id}`}
                  checked={selected}
                  onCheckedChange={(checked) => toggleSdg(sdg, checked === true)}
                />
                <Label
                  htmlFor={`sdg-${sdg.id}`}
                  className="grid cursor-pointer gap-2"
                >
                  <SdgBadge code={sdg.code} title={sdg.title} />
                  <span>{sdg.title}</span>
                  <span className="font-normal text-muted-foreground">
                    {sdg.description}
                  </span>
                </Label>
              </div>
              {selected ? (
                <FormField
                  id={`sdg-${sdg.id}-contribution`}
                  label={`How this project contributes to SDG ${sdg.code}`}
                  error={
                    errors[
                      `sdgs.${selectedIndex}.contribution_description`
                    ]?.[0]
                  }
                >
                  {(fieldProps) => (
                    <Textarea
                      {...fieldProps}
                      value={
                        form.sdgs[selectedIndex].contribution_description
                      }
                      onChange={(event) =>
                        updateSdgContribution(sdg.id, event.target.value)
                      }
                      disabled={disabled}
                      required
                      className="min-h-28"
                    />
                  )}
                </FormField>
              ) : null}
            </div>
          );
        })}
        {errors.sdgs?.[0] ? (
          <p className="text-sm font-medium text-destructive" role="alert">
            {errors.sdgs[0]}
          </p>
        ) : null}
      </fieldset>

      <fieldset className="grid gap-4" disabled={disabled}>
        <legend className="font-semibold text-foreground">
          Technology stack
        </legend>
        {taxonomies.technologies.length === 0 ? (
          <p className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            No technology tags are available yet. An administrator can add them
            during taxonomy management.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {taxonomies.technologies.map((technology) => {
              const id = String(technology.id);

              return (
                <div
                  key={technology.id}
                  className="flex min-h-11 items-center gap-3 rounded-lg border border-border px-4 py-2"
                >
                  <Checkbox
                    id={`technology-${id}`}
                    checked={form.technology_ids.includes(id)}
                    onCheckedChange={(checked) =>
                      toggleTechnology(id, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`technology-${id}`}
                    className="cursor-pointer"
                  >
                    {technology.name}
                  </Label>
                </div>
              );
            })}
          </div>
        )}
        {errors.technology_ids?.[0] ? (
          <p className="text-sm font-medium text-destructive" role="alert">
            {errors.technology_ids[0]}
          </p>
        ) : null}
      </fieldset>
    </div>
  );
}
