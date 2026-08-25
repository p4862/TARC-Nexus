import { PageHeader } from "@/components/layout/PageHeader";

export function ProjectPageHeader({ eyebrow, title, description, actions }) {
  return (
    <PageHeader
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={actions}
      backTo="/exhibitor/projects"
      backLabel="Back to projects"
    />
  );
}
