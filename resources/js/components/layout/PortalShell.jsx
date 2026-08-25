import {
  CircleUserRound,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { BrandIdentity } from "@/components/layout/BrandIdentity";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { cn } from "@/lib/utils";

function accountInitials(name) {
  return (
    name
      ?.split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "TN"
  );
}

function PortalNavigation({
  navigation,
  onNavigate,
  onLogout,
  isLoggingOut,
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav className="flex-1 px-3 py-5" aria-label="Workspace navigation">
        <ul className="grid gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors focus-visible:ring-sidebar-ring focus-visible:ring-offset-sidebar",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/65 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
                    )
                  }
                >
                  <Icon aria-hidden="true" className="size-5" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-1 border-t border-sidebar-border p-3">
        <Link
          to="/projects"
          onClick={onNavigate}
          className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-sidebar-foreground/65 transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-foreground focus-visible:ring-sidebar-ring focus-visible:ring-offset-sidebar"
        >
          <ExternalLink aria-hidden="true" className="size-5" />
          View public gallery
        </Link>
        <Link
          to="/profile"
          onClick={onNavigate}
          className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-sidebar-foreground/65 transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-foreground focus-visible:ring-sidebar-ring focus-visible:ring-offset-sidebar"
        >
          <CircleUserRound aria-hidden="true" className="size-5" />
          Profile
        </Link>
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-sidebar-foreground/65 transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-foreground focus-visible:ring-sidebar-ring focus-visible:ring-offset-sidebar disabled:pointer-events-none disabled:opacity-50"
        >
          <LogOut aria-hidden="true" className="size-5" />
          {isLoggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}

export function PortalShell({
  navigation,
  roleLabel,
  workspaceTitle,
  children,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await logout();
      setIsMenuOpen(false);
      navigate("/", { replace: true });
    } catch {
      setLogoutError("Unable to sign out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  const navigationProps = {
    navigation,
    onNavigate: () => setIsMenuOpen(false),
    onLogout: handleLogout,
    isLoggingOut,
  };

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[70] -translate-y-20 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-150 focus:translate-y-0"
      >
        Skip to main content
      </a>

      <aside className="sticky top-0 hidden h-screen flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="border-b border-sidebar-border px-5 py-5">
          <BrandIdentity inverse />
          <p className="mt-5 text-sm font-bold text-primary uppercase">
            {roleLabel}
          </p>
          <p className="mt-1 font-display text-xl font-bold text-sidebar-foreground">
            {workspaceTitle}
          </p>
        </div>
        <PortalNavigation {...navigationProps} />
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
            >
              {accountInitials(user?.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">
                {user?.name}
              </p>
              <p className="text-sm text-sidebar-foreground/65">{user?.role}</p>
            </div>
          </div>
          {logoutError ? (
            <Alert
              variant="destructive"
              className="mt-3 border-destructive/50 bg-destructive/15 text-sidebar-foreground"
            >
              <AlertDescription className="text-sidebar-foreground">
                {logoutError}
              </AlertDescription>
            </Alert>
          ) : null}
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-cream-canvas/95 backdrop-blur-sm lg:hidden">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-primary uppercase">
                {roleLabel}
              </p>
              <p className="truncate font-display text-lg font-bold text-foreground">
                {workspaceTitle}
              </p>
            </div>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Open workspace navigation"
                >
                  <Menu aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                showCloseButton={false}
                className="w-[min(24rem,calc(100%-1rem))] gap-0 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
              >
                <SheetHeader className="border-b border-sidebar-border px-5 py-5 text-left">
                  <div className="flex items-start justify-between gap-4">
                    <BrandIdentity
                      inverse
                      onNavigate={() => setIsMenuOpen(false)}
                    />
                    <SheetClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        aria-label="Close workspace navigation"
                      >
                        <X aria-hidden="true" />
                      </Button>
                    </SheetClose>
                  </div>
                  <SheetTitle className="mt-5 text-sidebar-foreground">
                    {workspaceTitle}
                  </SheetTitle>
                  <SheetDescription className="text-sidebar-foreground/65">
                    Navigate the {roleLabel.toLowerCase()}.
                  </SheetDescription>
                </SheetHeader>
                <PortalNavigation {...navigationProps} />
                <Separator className="bg-sidebar-border" />
                <div className="flex items-center gap-3 p-4">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                  >
                    {accountInitials(user?.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-sidebar-foreground">
                      {user?.name}
                    </p>
                    <p className="text-sm text-sidebar-foreground/65">{user?.role}</p>
                  </div>
                </div>
                {logoutError ? (
                  <p
                    className="mx-4 mb-4 text-sm font-medium text-sidebar-foreground"
                    role="alert"
                  >
                    {logoutError}
                  </p>
                ) : null}
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main id="main-content" tabIndex="-1" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
