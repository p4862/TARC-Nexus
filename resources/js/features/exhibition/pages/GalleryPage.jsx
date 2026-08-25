import {
  Boxes,
  Code2,
  Leaf,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Badge } from "@/components/ui/badge";
import { ProjectFilters } from "@/features/exhibition/components/ProjectFilters";
import { PaginationControls } from "@/features/exhibition/components/PaginationControls";
import { ProjectGrid } from "@/features/exhibition/components/ProjectGrid";
import { useDocumentMetadata } from "@/features/exhibition/hooks/useDocumentMetadata";
import {
  fetchPublishedProjects,
  fetchPublicTaxonomies,
} from "@/features/exhibition/services/publicExhibitionApi";
import { getApiErrorMessage } from "@/utils/apiError";

const EMPTY_TAXONOMIES = {
  categories: [],
  sdgs: [],
  technologies: [],
};

const DISCOVERY_CONFIG = {
  category: {
    parameter: "categoryId",
    collection: "categories",
    eyebrow: "Solution collection",
    icon: Boxes,
    label: (item) => item.name,
    description: (item) => item.description,
  },
  sdg: {
    parameter: "sdgId",
    collection: "sdgs",
    eyebrow: "Sustainability collection",
    icon: Leaf,
    label: (item) => `SDG ${item.code}: ${item.title}`,
    description: (item) => item.description,
  },
  technology: {
    parameter: "technologyId",
    collection: "technologies",
    eyebrow: "Technology collection",
    icon: Code2,
    label: (item) => item.name,
    description: (item) =>
      `Explore published projects built with ${item.name}.`,
  },
};

function filtersFromSearchParams(searchParams) {
  return {
    page: Number(searchParams.get("page") || 1),
    search: searchParams.get("search") || "",
    categoryId: searchParams.get("category") || "",
    sdgId: searchParams.get("sdg") || "",
    technologyId: searchParams.get("technology") || "",
    year: searchParams.get("year") || "",
    sort: searchParams.get("sort") || "recent",
  };
}

function GalleryHeader({ activeTaxonomy, discoveryConfig, search }) {
  if (activeTaxonomy && discoveryConfig) {
    const CollectionIcon = discoveryConfig.icon;

    return (
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="page-container page-section-compact grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="max-w-[70ch]">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-primary">
                <CollectionIcon aria-hidden="true" className="size-6" />
              </span>
              <p className="text-sm font-bold text-primary uppercase">
                {discoveryConfig.eyebrow}
              </p>
            </div>
            <h1 className="max-w-[20ch] font-display text-4xl leading-tight font-bold sm:text-h1">
              {discoveryConfig.label(activeTaxonomy)}
            </h1>
            <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-sidebar-foreground/80">
              {discoveryConfig.description(activeTaxonomy)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-ink-900 p-5">
            <Sparkles
              aria-hidden="true"
              className="size-6 text-primary"
            />
            <p className="mt-4 font-display text-3xl font-bold">
              {activeTaxonomy.projects_count.toLocaleString()}
            </p>
            <p className="text-sm text-sidebar-foreground/80">
              {activeTaxonomy.projects_count === 1
                ? "published project"
                : "published projects"}{" "}
              in this collection
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-background">
      <div className="page-container py-8 lg:py-10">
        <Badge
          variant="secondary"
          className="mb-5 text-primary"
        >
          Public exhibition
        </Badge>
        <h1 className="max-w-[20ch] font-display text-4xl leading-tight font-bold text-foreground sm:text-h1">
          {search ? `Results for "${search}"` : "Explore student innovation"}
        </h1>
        <p className="mt-4 max-w-[70ch] text-lg leading-relaxed text-muted-foreground">
          Discover digital solutions for sustainable tourism, stronger
          communities, and responsible travel across Malaysia.
        </p>
      </div>
    </section>
  );
}

export function GalleryPage({ discoveryType = null }) {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [taxonomies, setTaxonomies] = useState(EMPTY_TAXONOMIES);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);
  const filters = filtersFromSearchParams(searchParams);
  const [searchInput, setSearchInput] = useState(filters.search);
  const discoveryConfig = DISCOVERY_CONFIG[discoveryType];
  const discoveryId = discoveryConfig
    ? params[discoveryConfig.parameter]
    : null;
  const queryKey = searchParams.toString();

  const activeTaxonomy = useMemo(() => {
    if (!discoveryConfig || !discoveryId) {
      return null;
    }

    return taxonomies[discoveryConfig.collection].find(
      (item) => String(item.id) === String(discoveryId)
    );
  }, [discoveryConfig, discoveryId, taxonomies]);

  const pageTitle = activeTaxonomy
    ? `${discoveryConfig.label(activeTaxonomy)} projects`
    : filters.search
      ? `Search results for ${filters.search}`
      : "Explore student innovation";

  useDocumentMetadata({
    title: `${pageTitle} | TARC Nexus`,
    description:
      "Browse published VM2026 student projects by category, SDG, technology, year, and popularity.",
  });

  useEffect(() => {
    setSearchInput(filtersFromSearchParams(searchParams).search);
  }, [queryKey, searchParams]);

  useEffect(() => {
    let active = true;

    async function loadGallery() {
      setIsLoading(true);
      setError("");

      try {
        const currentFilters = filtersFromSearchParams(
          new URLSearchParams(queryKey)
        );
        const [projectResponse, taxonomyResponse] = await Promise.all([
          fetchPublishedProjects({
            ...currentFilters,
            discoveryType,
            discoveryId,
          }),
          fetchPublicTaxonomies(),
        ]);

        if (active) {
          setProjects(projectResponse.data);
          setMeta(projectResponse.meta);
          setTaxonomies(taxonomyResponse);
        }
      } catch (requestError) {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "Unable to load the public exhibition."
            )
          );
          setProjects([]);
          setMeta(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadGallery();

    return () => {
      active = false;
    };
  }, [discoveryId, discoveryType, queryKey, requestVersion]);

  function updateQuery(name, value) {
    const queryNames = {
      categoryId: "category",
      sdgId: "sdg",
      technologyId: "technology",
      year: "year",
      sort: "sort",
    };
    const next = new URLSearchParams(searchParams);
    const queryName = queryNames[name];

    if (!queryName) {
      return;
    }

    if (!value || value === "all" || (name === "sort" && value === "recent")) {
      next.delete(queryName);
    } else {
      next.set(queryName, value);
    }

    next.delete("page");
    setSearchParams(next);
  }

  function handleSearch(event) {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    const value = searchInput.trim();

    if (value) {
      next.set("search", value);
    } else {
      next.delete("search");
    }

    next.delete("page");
    setSearchParams(next);
  }

  function handleClear() {
    setSearchInput("");
    setSearchParams({});
  }

  function handlePageChange(page) {
    const next = new URLSearchParams(searchParams);

    if (page <= 1) {
      next.delete("page");
    } else {
      next.set("page", String(page));
    }

    setSearchParams(next);
  }

  return (
    <>
      <GalleryHeader
        activeTaxonomy={activeTaxonomy}
        discoveryConfig={discoveryConfig}
        search={filters.search}
      />

      <section className="bg-muted/40 py-6 lg:py-8">
        <div className="page-container">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            Search and filter
          </div>
          <ProjectFilters
            filters={filters}
            searchInput={searchInput}
            taxonomies={taxonomies}
            discoveryType={discoveryType}
            onSearchInput={setSearchInput}
            onSearch={handleSearch}
            onFilterChange={updateQuery}
            onClear={handleClear}
          />

          <div id="project-results" className="scroll-mt-28 pt-10">
            <div className="mb-6" aria-live="polite">
              <h2 className="text-2xl font-bold text-foreground">
                Published projects
              </h2>
              {!isLoading && meta ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {meta.total.toLocaleString()}{" "}
                  {meta.total === 1 ? "project" : "projects"} found
                </p>
              ) : null}
            </div>

            {isLoading ? (
              <LoadingState
                title="Loading published projects..."
                description="The latest exhibition collection is being prepared."
              />
            ) : error ? (
              <ErrorState
                title="Exhibition unavailable"
                description={error}
                onRetry={() => setRequestVersion((current) => current + 1)}
              />
            ) : (
              <>
                <ProjectGrid
                  projects={projects}
                  variant="compact"
                  emptyDescription="Try changing the search term or removing one of the filters."
                />
                <PaginationControls
                  meta={meta}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
