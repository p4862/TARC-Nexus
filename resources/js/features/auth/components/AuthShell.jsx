import { Leaf, Lightbulb, MapPinned, ShieldCheck } from "lucide-react";

import { BrandIdentity } from "@/components/layout/BrandIdentity";

const AUTH_HIGHLIGHTS = [
  {
    icon: MapPinned,
    title: "Tourism with purpose",
    description: "Discover ideas shaped for Visit Malaysia 2026.",
  },
  {
    icon: Lightbulb,
    title: "Student-built innovation",
    description: "Showcase practical digital solutions and creative work.",
  },
  {
    icon: Leaf,
    title: "Responsible impact",
    description: "Connect projects to SDGs 8, 11, and 12.",
  },
];

export function AuthShell({ eyebrow, title, description, children }) {
  return (
    <section
      aria-labelledby="auth-page-title"
      className="min-h-[calc(100svh-5rem)] overflow-hidden bg-background"
    >
      <div className="grid min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(30rem,36rem)]">
        <aside className="relative hidden min-h-[44rem] overflow-hidden bg-ink-900 p-10 text-sidebar-foreground lg:flex lg:flex-col xl:p-14">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-80 rounded-full border border-primary/30 bg-pin-red-500/15"
          />
          <div
            aria-hidden="true"
            className="absolute top-36 -right-16 size-52 rounded-full border border-primary/25"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-12 left-10 size-28 rotate-12 rounded-2xl bg-primary/10"
          />

          <div className="relative">
            <BrandIdentity inverse />
          </div>

          <div className="relative mt-auto max-w-[38rem]">
            <p className="text-sm font-bold tracking-widest text-primary uppercase">
              Visit Malaysia 2026
            </p>
            <h2 className="mt-4 max-w-[15ch] font-display text-h2 font-bold text-sidebar-foreground">
              Where bold ideas meet meaningful destinations.
            </h2>
            <p className="mt-5 max-w-[58ch] text-base text-sidebar-foreground/75">
              TARC Nexus brings together software, digital experiences, and
              sustainable tourism thinking from the next generation of
              creators.
            </p>

            <div className="mt-8 grid gap-3">
              {AUTH_HIGHLIGHTS.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-xl border border-sidebar-border bg-sidebar-accent/45 p-4"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-sidebar-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-sidebar-foreground/65">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="relative flex items-center justify-center px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-64 rounded-full bg-pin-red-50/70 lg:hidden"
          />

          <div className="relative w-full max-w-[30rem]">
            <header>
              <span className="grid size-12 place-items-center rounded-full bg-pin-red-50 text-primary">
              <ShieldCheck className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-bold text-primary uppercase">
                {eyebrow}
              </p>
              <h1
                id="auth-page-title"
                className="mt-2 font-display text-h3 font-bold text-foreground"
              >
                {title}
              </h1>
              <p className="mt-3 max-w-[60ch] text-base text-muted-foreground">
                {description}
              </p>
            </header>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
