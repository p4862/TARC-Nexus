import { apiClient } from "@/services/apiClient";

function projectListEndpoint(discoveryType, discoveryId) {
  if (!discoveryType || !discoveryId) {
    return "/public/projects";
  }

  const segments = {
    category: "categories",
    sdg: "sdgs",
    technology: "technologies",
  };
  const segment = segments[discoveryType];

  return segment
    ? `/public/${segment}/${discoveryId}/projects`
    : "/public/projects";
}

function projectListParams(filters) {
  return {
    page: filters.page || 1,
    per_page: filters.perPage || 12,
    search: filters.search || undefined,
    category_id: filters.categoryId || undefined,
    sdg_id: filters.sdgId || undefined,
    technology_id: filters.technologyId || undefined,
    year: filters.year || undefined,
    sort: filters.sort || "recent",
  };
}

export async function fetchPublishedProjects({
  discoveryType,
  discoveryId,
  ...filters
} = {}) {
  const response = await apiClient.get(
    projectListEndpoint(discoveryType, discoveryId),
    {
      params: projectListParams(filters),
    }
  );

  return response.data;
}

export async function fetchPublishedProject(slug) {
  const response = await apiClient.get(`/public/projects/${slug}`);

  return response.data.data;
}

export async function fetchPublicTaxonomies() {
  const response = await apiClient.get("/public/taxonomies");

  return response.data.data;
}

export async function fetchHomepageExhibition() {
  const response = await apiClient.get("/public/homepage");

  return response.data.data;
}
