import { apiClient, ensureCsrfCookie } from "@/services/apiClient";

export async function updateProfile(payload) {
  await ensureCsrfCookie();
  const response = await apiClient.patch("/profile", payload);

  return response.data.data;
}

export async function uploadAvatar(file) {
  await ensureCsrfCookie();

  const formData = new FormData();
  formData.append("avatar", file);

  const response = await apiClient.post("/profile/avatar", formData);

  return response.data.data;
}

export async function removeAvatar() {
  await ensureCsrfCookie();
  const response = await apiClient.delete("/profile/avatar");

  return response.data.data;
}
