import {
  BarChart3,
  CircleUserRound,
  FolderKanban,
  Heart,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { BrandIdentity } from "@/components/layout/BrandIdentity";
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
import { SearchBar } from "@/features/exhibition/components/SearchBar";

function PrimaryNavigation({ onNavigate, mobile = false }) {
  const linkClass = ({ isActive }) =>
    mobile
      ? `flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-semibold ${
          isActive
            ? "bg-accent text-foreground"
            : "text-foreground hover:bg-muted"
        }`
      : `inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold hover:bg-muted hover:text-foreground ${
          isActive ? "bg-accent text-foreground" : "text-foreground"
        }`;

  return (
    <nav aria-label="Primary navigation">
      <ul className={mobile ? "grid gap-1" : "flex items-center"}>
        <li>
          <NavLink to="/projects" onClick={onNavigate} className={linkClass}>
            Explore
          </NavLink>
        </li>
        <li>
          <a
            href="/#about"
            onClick={onNavigate}
            className={
              mobile
                ? "flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                : "inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground"
            }
          >
            About
          </a>
        </li>
        {mobile ? (
          <>
            <li>
              <a
                href="/#categories"
                onClick={onNavigate}
                className="flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="/#sdgs"
                onClick={onNavigate}
                className="flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
              >
                SDG showcase
              </a>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

function WorkspaceLink({ user, compact = false, onNavigate }) {
  if (user?.role === "Exhibitor") {
    return (
      <Button variant="ghost" size={compact ? "default" : "icon"} asChild>
        <Link
          to="/exhibitor/projects"
          onClick={onNavigate}
          aria-label={compact ? undefined : "Open Exhibitor workspace"}
        >
          <FolderKanban aria-hidden="true" />
          {compact ? "Exhibitor workspace" : null}
        </Link>
      </Button>
    );
  }

  if (user?.role === "Administrator") {
    return (
      <Button variant="ghost" size={compact ? "default" : "icon"} asChild>
        <Link
          to="/administrator"
          onClick={onNavigate}
          aria-label={compact ? undefined : "Open Administration"}
        >
          <ShieldCheck aria-hidden="true" />
          {compact ? "Administration" : null}
        </Link>
      </Button>
    );
  }

  if (user?.role === "Guest") {
    return (
      <Button variant="ghost" size={compact ? "default" : "icon"} asChild>
        <Link
          to="/favorites"
          onClick={onNavigate}
          aria-label={compact ? undefined : "Open favorite projects"}
        >
          <Heart aria-hidden="true" />
          {compact ? "My favorites" : null}
        </Link>
      </Button>
    );
  }

  return null;
}

export function AppHeader() {
  const { user, isLoading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(
      location.pathname === "/projects" ? searchParams.get("search") || "" : ""
    );
  }, [location.pathname, searchParams]);

  function handleSearch(event) {
    event.preventDefault();
    const query = searchQuery.trim();

    navigate(query ? `/projects?search=${encodeURIComponent(query)}` : "/projects");
    setIsMenuOpen(false);
  }

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

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream-canvas/95 backdrop-blur-sm">
      <div className="page-container flex min-h-16 items-center gap-4">
        <BrandIdentity />

        <SearchBar
          id="desktop-project-search"
          value={searchQuery}
          onValueChange={setSearchQuery}
          onSubmit={handleSearch}
          className="mx-auto hidden max-w-[30rem] flex-1 md:flex"
        />

        <div className="ml-auto hidden items-center gap-1 md:flex">
          <PrimaryNavigation />
          <Separator orientation="vertical" className="mx-1 h-7" />

          {isLoading ? (
            <span className="px-3 text-sm text-muted-foreground" role="status">
              Checking session…
            </span>
          ) : user ? (
            <>
              <WorkspaceLink user={user} />
              {user.role === "Exhibitor" ? (
                <Button variant="ghost" size="icon" asChild>
                  <Link
                    to="/exhibitor/analytics"
                    aria-label="Open Exhibitor analytics"
                  >
                    <BarChart3 aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
              <Button variant="outline" size="icon" asChild>
                <Link to="/profile" aria-label={`Open profile for ${user.name}`}>
                  <CircleUserRound aria-hidden="true" />
                </Link>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label={isLoggingOut ? "Signing out" : "Sign out"}
              >
                <LogOut aria-hidden="true" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          {!isLoading && !user ? (
            <Button size="sm" asChild className="hidden min-[380px]:inline-flex">
              <Link to="/register">Sign up</Link>
            </Button>
          ) : null}
          {user ? (
            <Button variant="outline" size="icon" asChild>
              <Link to="/profile" aria-label={`Open profile for ${user.name}`}>
                <CircleUserRound aria-hidden="true" />
              </Link>
            </Button>
          ) : null}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[min(24rem,calc(100%-1rem))] gap-0 p-0"
            >
              <SheetHeader className="border-b border-border px-5 py-5 text-left">
                <div className="flex items-start justify-between gap-4">
                  <BrandIdentity onNavigate={() => setIsMenuOpen(false)} />
                  <SheetClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      aria-label="Close navigation menu"
                    >
                      <X aria-hidden="true" />
                    </Button>
                  </SheetClose>
                </div>
                <SheetTitle className="mt-5">Navigation</SheetTitle>
                <SheetDescription>
                  Explore the exhibition or open your account workspace.
                </SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-4 py-5">
                <SearchBar
                  id="mobile-project-search"
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  onSubmit={handleSearch}
                />

                <div className="mt-5">
                  <PrimaryNavigation
                    mobile
                    onNavigate={() => setIsMenuOpen(false)}
                  />
                </div>

                <Separator className="my-5" />

                <div className="grid gap-2">
                  {isLoading ? (
                    <p className="px-3 py-2 text-sm text-muted-foreground">
                      Checking session…
                    </p>
                  ) : user ? (
                    <>
                      <WorkspaceLink
                        user={user}
                        compact
                        onNavigate={() => setIsMenuOpen(false)}
                      />
                      {user.role === "Exhibitor" ? (
                        <Button variant="ghost" asChild>
                          <Link
                            to="/exhibitor/analytics"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <BarChart3 aria-hidden="true" />
                            Analytics
                          </Link>
                        </Button>
                      ) : null}
                      <Button variant="outline" asChild>
                        <Link
                          to="/profile"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <CircleUserRound aria-hidden="true" />
                          {user.name}
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                      >
                        <LogOut aria-hidden="true" />
                        {isLoggingOut ? "Signing out…" : "Sign out"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link
                          to="/login"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Log in
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link
                          to="/register"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign up
                        </Link>
                      </Button>
                    </>
                  )}
                </div>

                {logoutError ? (
                  <p
                    className="mt-4 text-sm font-medium text-destructive"
                    role="alert"
                  >
                    {logoutError}
                  </p>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {logoutError ? (
          <span className="sr-only" role="alert">
            {logoutError}
          </span>
        ) : null}
      </div>
    </header>
  );
}
