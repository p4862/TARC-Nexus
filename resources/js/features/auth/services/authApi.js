import { apiClient, ensureCsrfCookie } from "@/services/apiClient";

async function postWithCsrf(path, payload = {}) {
  await ensureCsrfCookie();

  return apiClient.post(path, payload);
}

export async function fetchAuthenticatedUser() {
  const response = await apiClient.get("/auth/user");

  return response.data.data;
}

export async function registerAccount(payload) {
  const response = await postWithCsrf("/auth/register", payload);

  return response.data.data;
}

export async function loginAccount(payload) {
  const response = await postWithCsrf("/auth/login", payload);

  return response.data.data;
}

export async function logoutAccount() {
  await postWithCsrf("/auth/logout");
}

export async function requestPasswordReset(email) {
  const response = await postWithCsrf("/auth/forgot-password", { email });

  return response.data;
}

export async function resetPassword(payload) {
  const response = await postWithCsrf("/auth/reset-password", payload);

  return response.data;
}

export async function resendVerificationEmail() {
  const response = await postWithCsrf(
    "/auth/email/verification-notification"
  );

  return response.data;
}

export async function fetchPendingGoogleRegistration() {
  const response = await apiClient.get("/auth/google/pending");

  return response.data.data;
}

export async function completeGoogleRegistration(payload) {
  const response = await postWithCsrf("/auth/google/complete", payload);

  return response.data.data;
}
