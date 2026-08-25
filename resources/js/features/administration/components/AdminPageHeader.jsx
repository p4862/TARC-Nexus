import { PageHeader } from "@/components/layout/PageHeader";

export function AdminPageHeader({ eyebrow, title, description, actions }) {
  return (
    <PageHeader
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={actions}
    />
  );
}
