import { http } from "../../shared/api/http";
import type { Post } from "./types";

export const postsApi = {
  list: () => http<Post[]>("/api/posts"),
  byId: (id: number) => http<Post>(`/api/posts/${id}`),

  create: (title: string, content: string) =>
    http<Post>("/api/posts", { method: "POST", json: { title, content } }),

  update: (id: number, patch: { title?: string; content?: string | null }) =>
    http<Post>(`/api/posts/${id}`, { method: "PATCH", json: patch }),

  remove: (id: number) => http<void>(`/api/posts/${id}`, { method: "DELETE" }),
};