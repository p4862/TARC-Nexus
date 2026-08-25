import { apiClient } from "@/services/apiClient";

export async function fetchProjectTaxonomies() {
  const response = await apiClient.get("/exhibitor/taxonomies");

  return response.data.data;
}

export async function fetchOwnedProjects({
  page = 1,
  perPage = 12,
  status = "",
} = {}) {
  const response = await apiClient.get("/exhibitor/projects", {
    params: {
      page,
      per_page: perPage,
      status: status || undefined,
    },
  });

  return response.data;
}

export async function fetchOwnedProject(projectId) {
  const response = await apiClient.get(`/exhibitor/projects/${projectId}`);

  return response.data.data;
}

export async function createProject(payload) {
  const response = await apiClient.post("/exhibitor/projects", payload);

  return response.data.data;
}

export async function updateProject(projectId, payload) {
  const response = await apiClient.patch(
    `/exhibitor/projects/${projectId}`,
    payload
  );

  return response.data.data;
}

export async function submitProject(projectId) {
  const response = await apiClient.post(
    `/exhibitor/projects/${projectId}/submit`
  );

  return response.data.data;
}

export async function deleteProject(projectId) {
  await apiClient.delete(`/exhibitor/projects/${projectId}`);
}

export async function uploadProjectMedia(projectId, { type, file }) {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("file", file);

  const response = await apiClient.post(
    `/exhibitor/projects/${projectId}/media`,
    formData
  );

  return response.data.data;
}

export async function deleteProjectMedia(projectId, mediaId) {
  await apiClient.delete(
    `/exhibitor/projects/${projectId}/media/${mediaId}`
  );
}
