import { Link } from "react-router-dom";

import { BrandIdentity } from "@/components/layout/BrandIdentity";

const FOOTER_GROUPS = [
  {
    title: "Explore",
    links: [
      { label: "Project gallery", to: "/projects" },
      { label: "Categories", href: "/#categories" },
      { label: "SDG showcase", href: "/#sdgs" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Latest projects", to: "/projects?sort=recent" },
      { label: "Popular projects", to: "/projects?sort=popular" },
      { label: "Most viewed", to: "/projects?sort=viewed" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", to: "/login" },
      { label: "Create account", to: "/register" },
      { label: "Profile", to: "/profile" },
    ],
  },
  {
    title: "Exhibition",
    links: [
      { label: "About TARC Nexus", href: "/#about" },
      { label: "VM2026 focus", href: "/#about" },
      { label: "Browse all projects", to: "/projects" },
    ],
  },
];

function FooterLink({ link }) {
  const className =
    "inline-flex min-h-11 items-center rounded-md text-sm text-muted-foreground hover:text-primary hover:underline";

  return link.to ? (
    <Link to={link.to} className={className}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-cream-canvas">
      <div className="page-container py-10 lg:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.25fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <BrandIdentity />
            <p className="mt-4 text-sm text-muted-foreground">
              Student digital solutions for sustainable tourism, community,
              and responsible innovation.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <section key={group.title} aria-labelledby={`footer-${group.title}`}>
              <h2
                id={`footer-${group.title}`}
                className="text-sm font-bold text-foreground"
              >
                {group.title}
              </h2>
              <ul className="mt-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TARC Nexus</p>
          <p>Collaborative Development · Visit Malaysia 2026</p>
        </div>
      </div>
    </footer>
  );
}
