import { apiClient } from "@/services/apiClient";

export async function fetchAdminDashboard() {
  const response = await apiClient.get("/administrator/dashboard");

  return response.data.data;
}

export async function fetchAdminUsers({
  page = 1,
  perPage = 15,
  search = "",
  role = "",
} = {}) {
  const response = await apiClient.get("/administrator/users", {
    params: {
      page,
      per_page: perPage,
      search: search || undefined,
      role: role || undefined,
    },
  });

  return response.data;
}

export async function updateAdminUserRole(userId, role) {
  const response = await apiClient.patch(
    `/administrator/users/${userId}/role`,
    { role }
  );

  return response.data.data;
}

export async function deleteAdminUser(userId) {
  await apiClient.delete(`/administrator/users/${userId}`);
}

export async function fetchAdminTaxonomies() {
  const response = await apiClient.get("/administrator/taxonomies");

  return response.data.data;
}

export async function createAdminTaxonomy(type, payload) {
  const response = await apiClient.post(`/administrator/${type}`, payload);

  return response.data.data;
}

export async function updateAdminTaxonomy(type, id, payload) {
  const response = await apiClient.patch(
    `/administrator/${type}/${id}`,
    payload
  );

  return response.data.data;
}

export async function deleteAdminTaxonomy(type, id) {
  const response = await apiClient.delete(`/administrator/${type}/${id}`);

  return response.data.data;
}

export async function fetchAdminProjects({
  page = 1,
  perPage = 12,
  search = "",
  status = "",
} = {}) {
  const response = await apiClient.get("/administrator/projects", {
    params: {
      page,
      per_page: perPage,
      search: search || undefined,
      status: status || undefined,
    },
  });

  return response.data;
}

export async function fetchAdminProject(projectId) {
  const response = await apiClient.get(
    `/administrator/projects/${projectId}`
  );

  return response.data.data;
}

export async function startAdminProjectReview(projectId, reviewNotes) {
  const response = await apiClient.post(
    `/administrator/projects/${projectId}/start-review`,
    { review_notes: reviewNotes || null }
  );

  return response.data.data;
}

export async function approveAdminProject(projectId, reviewNotes) {
  const response = await apiClient.post(
    `/administrator/projects/${projectId}/approve`,
    { review_notes: reviewNotes || null }
  );

  return response.data.data;
}

export async function publishAdminProject(projectId, publishedAt) {
  const response = await apiClient.post(
    `/administrator/projects/${projectId}/publish`,
    { published_at: publishedAt || null }
  );

  return response.data.data;
}

export async function featureAdminProject(projectId, featured) {
  const response = await apiClient.patch(
    `/administrator/projects/${projectId}/featured`,
    { featured }
  );

  return response.data.data;
}

export async function fetchAdminAnnouncements({
  page = 1,
  perPage = 15,
} = {}) {
  const response = await apiClient.get("/administrator/announcements", {
    params: {
      page,
      per_page: perPage,
    },
  });

  return response.data;
}

export async function createAdminAnnouncement(payload) {
  const response = await apiClient.post(
    "/administrator/announcements",
    payload
  );

  return response.data.data;
}

export async function updateAdminAnnouncement(announcementId, payload) {
  const response = await apiClient.patch(
    `/administrator/announcements/${announcementId}`,
    payload
  );

  return response.data.data;
}

export async function deleteAdminAnnouncement(announcementId) {
  await apiClient.delete(
    `/administrator/announcements/${announcementId}`
  );
}

export async function fetchAdminReports() {
  const response = await apiClient.get("/administrator/reports");

  return response.data.data;
}

export async function fetchExhibitorAnalytics({
  page = 1,
  perPage = 15,
} = {}) {
  const response = await apiClient.get("/exhibitor/analytics", {
    params: {
      page,
      per_page: perPage,
    },
  });

  return response.data.data;
}
