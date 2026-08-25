import { BarChart3, FolderKanban, PlusCircle } from "lucide-react";
import { Outlet } from "react-router-dom";

import { PortalShell } from "@/components/layout/PortalShell";

const NAVIGATION = [
  {
    to: "/exhibitor/projects",
    label: "My projects",
    icon: FolderKanban,
    end: true,
  },
  {
    to: "/exhibitor/projects/new",
    label: "Create project",
    icon: PlusCircle,
  },
  {
    to: "/exhibitor/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

export function ExhibitorLayout() {
  return (
    <PortalShell
      navigation={NAVIGATION}
      roleLabel="Exhibitor workspace"
      workspaceTitle="Project studio"
    >
      <Outlet />
    </PortalShell>
  );
}
