import { apiClient } from "@/services/apiClient";

export async function getSystemStatus({ signal } = {}) {
  const response = await apiClient.get("/health", { signal });

  return response.data;
}
