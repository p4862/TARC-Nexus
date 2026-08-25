import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export async function ensureCsrfCookie() {
  await axios.get("/sanctum/csrf-cookie", {
    headers: {
      Accept: "application/json",
    },
    withCredentials: true,
  });
}
