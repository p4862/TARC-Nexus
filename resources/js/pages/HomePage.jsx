import {
  ArrowRight,
  Building2,
  Compass,
  FolderKanban,
  GraduationCap,
  Leaf,
  MapPinned,
  Shapes,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { AnnouncementCard } from "@/features/announcements/components/AnnouncementCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectCollectionSection } from "@/features/exhibition/components/ProjectCollectionSection";
import { useDocumentMetadata } from "@/features/exhibition/hooks/useDocumentMetadata";
import { fetchHomepageExhibition } from "@/features/exhibition/services/publicExhibitionApi";
import { isRenderableImageMedia } from "@/features/exhibition/utils/media";
import { SdgBadge } from "@/features/projects/components/SdgBadge";
import { getApiErrorMessage } from "@/utils/apiError";

const EMPTY_HOMEPAGE = {
  statistics: {
    projects: 0,
    students: 0,
    institutions: 0,
  },
  featured_projects: [],
  newest_projects: [],
  popular_projects: [],
  categories: [],
  sdgs: [],
  announcements: [],
};

const STATISTICS = [
  {
    key: "projects",
    label: "Published projects",
    icon: FolderKanban,
  },
  {
    key: "students",
    label: "Student contributors",
    icon: GraduationCap,
  },
  {
    key: "institutions",
    label: "Institutions",
    icon: Building2,
  },
];

export function HomePage() {
  const [homepage, setHomepage] = useState(EMPTY_HOMEPAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);
  const heroProject = homepage.featured_projects[0];
  const heroPreview = heroProject?.preview_media;
  const hasHeroPreview = isRenderableImageMedia(heroPreview);

  useDocumentMetadata({
    title: "TARC Nexus | VM2026 Online Exhibition",
    description:
      "Explore student-built digital solutions advancing sustainable tourism for Visit Malaysia 2026.",
  });

  useEffect(() => {
    let active = true;

    async function loadHomepage() {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchHomepageExhibition();

        if (active) {
          setHomepage(data);
        }
      } catch (requestError) {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "The exhibition collections could not be loaded."
            )
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadHomepage();

    return () => {
      active = false;
    };
  }, [requestVersion]);

  return (
    <>
      <section className="relative flex min-h-[37.5rem] items-center overflow-hidden bg-ink-900 text-white">
        {hasHeroPreview ? (
          <img
            src={heroPreview.url}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink-900/75"
        />
        <div className="page-container relative py-16 lg:py-24">
          <div className="max-w-[38rem]">
            <Badge className="mb-5 border-pin-red-100 bg-primary text-primary-foreground">
              Collaborative Development / VM2026
            </Badge>
            <h1 className="max-w-[13ch] font-display text-4xl leading-[1.05] font-bold italic sm:text-5xl lg:text-display">
              A digital stage for Malaysian student innovation.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-sidebar-foreground/80">
              Explore software and digital solutions that reimagine tourism,
              support local communities, and encourage responsible travel for
              Visit Malaysia 2026.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="highlight" size="lg">
                <Link to="/projects">
                  Explore projects
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-sidebar-border bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <a href="#about">About the exhibition</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {homepage.categories.length > 0 ? (
        <nav
          aria-label="Browse project categories"
          className="sticky top-18 z-30 border-b border-border bg-background/95 backdrop-blur-sm"
        >
          <div className="scrollbar-none page-container-wide flex items-center gap-2 overflow-x-auto py-3">
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full"
              asChild
            >
              <Link to="/projects">All projects</Link>
            </Button>
            {homepage.categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className="rounded-full"
                asChild
              >
                <Link to={`/projects/category/${category.id}`}>
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      ) : null}

      <section id="about" className="scroll-mt-28 py-16 lg:py-24">
        <div className="page-container grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <div className="relative grid aspect-[6/5] place-items-center overflow-hidden rounded-2xl bg-pin-red-50 text-primary">
            <MapPinned aria-hidden="true" className="size-24" />
            <div
              aria-hidden="true"
              className="absolute right-5 bottom-5 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground"
            >
              <Compass className="size-7" />
            </div>
          </div>
          <div className="max-w-[70ch]">
            <p className="text-sm font-bold text-primary uppercase">
              About the exhibition
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-h2">
              Technology for a more thoughtful journey.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              TARC Nexus brings student work into one accessible virtual
              exhibition hall. Visitors can discover practical ideas for
              tourism businesses, connected communities, cultural
              preservation, and sustainable travel choices.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Each exhibition story connects the challenge, solution,
              development approach, media, and sustainability contribution in
              one place.
            </p>
            <Button variant="link" asChild className="mt-4 px-0">
              <Link to="/projects">
                Start exploring
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="bg-muted/40 py-16">
          <div className="page-container">
            <LoadingState
              title="Loading exhibition highlights..."
              description="Featured work, collections, and announcements are being prepared."
            />
          </div>
        </section>
      ) : error ? (
        <section className="bg-muted/40 py-16">
          <div className="page-container">
            <ErrorState
              title="Live exhibition data unavailable"
              description={error}
              onRetry={() => setRequestVersion((current) => current + 1)}
            />
          </div>
        </section>
      ) : (
        <>
          <section className="border-y border-border bg-muted/40 py-12">
            <div className="page-container">
              <h2 className="sr-only">Exhibition statistics</h2>
              <div className="grid gap-8 text-center sm:grid-cols-3">
                {STATISTICS.map((statistic) => {
                  const StatisticIcon = statistic.icon;

                  return (
                    <div key={statistic.key} className="grid gap-2">
                      <StatisticIcon
                        aria-hidden="true"
                        className="mx-auto size-5 text-primary"
                      />
                      <p className="font-display text-4xl font-bold text-foreground">
                        {homepage.statistics[
                          statistic.key
                        ].toLocaleString()}
                      </p>
                      <p className="text-sm font-semibold text-muted-foreground">
                        {statistic.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <ProjectCollectionSection
            eyebrow="Featured projects"
            title="Innovation in the spotlight"
            description="Selected projects that demonstrate distinctive ideas, thoughtful execution, and meaningful tourism impact."
            projects={homepage.featured_projects}
            variant="featured"
          />

          <section
            id="categories"
            className="scroll-mt-28 bg-muted/40 py-16 lg:py-24"
          >
            <div className="page-container">
              <div className="max-w-[70ch]">
                <p className="text-sm font-bold text-primary uppercase">
                  Solution categories
                </p>
                <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-h2">
                  Browse by the kind of digital experience.
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Explore web, mobile, AI, immersive, data, and connected
                  solutions built for the exhibition.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {homepage.categories.map((category) => (
                  <Card
                    key={category.id}
                    size="sm"
                    className="rounded-xl transition duration-150 ease-standard hover:-translate-y-0.5 hover:border-pin-red-100 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-pin-red-50 text-primary">
                        <Shapes aria-hidden="true" className="size-5" />
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {category.projects_count.toLocaleString()}
                      </span>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <Link
                          to={`/projects/category/${category.id}`}
                          className="inline-flex min-h-11 min-w-11 items-center rounded-sm text-foreground hover:text-primary hover:underline"
                        >
                          {category.name}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="sdgs" className="scroll-mt-28 py-16 lg:py-24">
            <div className="page-container">
              <div className="max-w-[70ch]">
                <p className="text-sm font-bold text-primary uppercase">
                  SDG showcase
                </p>
                <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-h2">
                  Innovation grounded in sustainability.
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Every published project explains how its work contributes to
                  the exhibition's three supported Sustainable Development
                  Goals.
                </p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {homepage.sdgs.map((sdg) => (
                  <Card key={sdg.id} className="h-full rounded-xl">
                    <div className="flex items-center justify-between gap-3">
                      <SdgBadge code={sdg.code} title={sdg.title} />
                      <Sparkles
                        aria-hidden="true"
                        className="size-5 text-primary"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{sdg.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {sdg.description}
                      </p>
                      <Button
                        variant="link"
                        asChild
                        className="mt-4 w-fit px-0"
                      >
                        <Link to={`/projects/sdg/${sdg.id}`}>
                          View {sdg.projects_count.toLocaleString()}{" "}
                          {sdg.projects_count === 1 ? "project" : "projects"}
                          <ArrowRight aria-hidden="true" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <ProjectCollectionSection
            eyebrow="Latest projects"
            title="Newly opened exhibition booths"
            description="Meet the most recently published student solutions in the VM2026 exhibition."
            projects={homepage.newest_projects}
            muted
            variant="compact"
          />

          <ProjectCollectionSection
            eyebrow="Popular projects"
            title="Projects attracting the most attention"
            description="See the published projects leading the combined views, favorites, and People's Choice votes across the gallery."
            projects={homepage.popular_projects}
            variant="compact"
          />

          {homepage.announcements.length > 0 ? (
            <section className="bg-muted/40 py-16 lg:py-24">
              <div className="page-container">
                <div className="max-w-[70ch]">
                  <p className="text-sm font-bold text-primary uppercase">
                    Announcements
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-h2">
                    Exhibition updates and important dates.
                  </h2>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {homepage.announcements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="bg-ink-900 py-16 text-white lg:py-20">
            <div className="page-container-reading text-center">
              <Leaf
                aria-hidden="true"
                className="mx-auto size-9 text-primary"
              />
              <h2 className="mt-5 text-3xl font-bold sm:text-h2">
                Find the idea that changes your view of travel.
              </h2>
              <p className="mt-4 text-sidebar-foreground/80">
                Browse every published project or create an account to save,
                vote for, and discuss the solutions that inspire you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="highlight" size="lg" asChild>
                  <Link to="/projects">Explore the gallery</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-sidebar-border bg-transparent text-white hover:bg-sidebar-accent hover:text-white"
                  asChild
                >
                  <Link to="/register">Create an account</Link>
                </Button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
