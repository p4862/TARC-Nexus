import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { ProjectPageHeader } from "@/features/projects/components/ProjectPageHeader";
import {
  createProject,
  fetchProjectTaxonomies,
} from "@/features/projects/services/projectApi";
import {
  getApiErrorMessage,
  getValidationErrors,
} from "@/utils/apiError";

export function ProjectCreatePage() {
  const navigate = useNavigate();
  const [taxonomies, setTaxonomies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProjectTaxonomies()
      .then(setTaxonomies)
      .catch((requestError) => {
        setError(
          getApiErrorMessage(
            requestError,
            "Unable to load project categories and SDGs."
          )
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function handleCreate(payload) {
    setIsSubmitting(true);
    setError("");
    setErrors({});

    try {
      const project = await createProject(payload);
      navigate(`/exhibitor/projects/${project.id}/edit`, {
        replace: true,
        state: { message: "Project draft created successfully." },
      });
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to create the project draft.")
      );
      setErrors(getValidationErrors(requestError));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-muted/30 py-12 lg:py-16">
      <div className="mx-auto grid max-w-[1024px] gap-8 px-4 sm:px-6 lg:px-8">
        <ProjectPageHeader
          eyebrow="New draft"
          title="Create an exhibition project"
          description="Complete the documented project information. You can add media after the draft is created."
        />

        {error ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Draft could not be created</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {isLoading ? (
          <div
            className="rounded-xl border border-border bg-background p-8 text-center text-muted-foreground"
            role="status"
          >
            Loading project form...
          </div>
        ) : taxonomies ? (
          <ProjectForm
            taxonomies={taxonomies}
            onSubmit={handleCreate}
            isSubmitting={isSubmitting}
            errors={errors}
            submitLabel="Create draft"
          />
        ) : null}
      </div>
    </section>
  );
}
