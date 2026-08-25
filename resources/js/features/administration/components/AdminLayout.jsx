import {
  BarChart3,
  BellRing,
  FolderSearch2,
  LayoutDashboard,
  Shapes,
  Users,
} from "lucide-react";
import { Outlet } from "react-router-dom";

import { PortalShell } from "@/components/layout/PortalShell";

const NAVIGATION = [
  {
    to: "/administrator",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/administrator/projects",
    label: "Project review",
    icon: FolderSearch2,
  },
  {
    to: "/administrator/users",
    label: "Users",
    icon: Users,
  },
  {
    to: "/administrator/taxonomies",
    label: "Taxonomies",
    icon: Shapes,
  },
  {
    to: "/administrator/announcements",
    label: "Announcements",
    icon: BellRing,
  },
  {
    to: "/administrator/reports",
    label: "Reports",
    icon: BarChart3,
  },
];

export function AdminLayout() {
  return (
    <PortalShell
      navigation={NAVIGATION}
      roleLabel="Administration"
      workspaceTitle="Exhibition operations"
    >
      <section className="page-section-compact">
        <div className="page-container">
          <Outlet />
        </div>
      </section>
    </PortalShell>
  );
}
