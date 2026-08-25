import { apiClient, ensureCsrfCookie } from "@/services/apiClient";

async function mutate(method, path, payload) {
  await ensureCsrfCookie();

  const response = await apiClient.request({
    method,
    url: path,
    data: payload,
  });

  return response.data;
}

export async function fetchFavoriteProjects(page = 1) {
  const response = await apiClient.get("/engagement/favorites", {
    params: {
      page,
      per_page: 12,
    },
  });

  return response.data;
}

export async function addFavorite(slug) {
  const response = await mutate(
    "post",
    `/engagement/projects/${slug}/favorite`
  );

  return response.data;
}

export async function removeFavorite(slug) {
  const response = await mutate(
    "delete",
    `/engagement/projects/${slug}/favorite`
  );

  return response.data;
}

export async function castVote(slug) {
  const response = await mutate(
    "post",
    `/engagement/projects/${slug}/vote`
  );

  return response.data;
}

export async function fetchProjectComments(slug, page = 1) {
  const response = await apiClient.get(`/public/projects/${slug}/comments`, {
    params: {
      page,
      per_page: 20,
    },
  });

  return response.data;
}

export async function postComment(slug, payload) {
  return mutate("post", `/engagement/projects/${slug}/comments`, payload);
}

export async function deleteComment(commentId) {
  return mutate("delete", `/engagement/comments/${commentId}`);
}
