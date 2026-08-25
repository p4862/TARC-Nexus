import { Outlet } from "react-router-dom";

import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-50 -translate-y-20 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-150 focus:translate-y-0"
      >
        Skip to main content
      </a>
      <AppHeader />
      <main id="main-content" className="flex-1" tabIndex="-1">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
