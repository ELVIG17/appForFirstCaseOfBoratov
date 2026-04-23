    import { http } from "../../shared/api/http";
import type { Message } from "./types";

export const messagesApi = {
  send: (receiverId: number, text: string) =>
    http<Message>("/api/messages", { method: "POST", json: { receiverId, text } }),

  inbox: (limit = 50) => http<Message[]>(`/api/messages/inbox?limit=${limit}`),
  sent: (limit = 50) => http<Message[]>(`/api/messages/sent?limit=${limit}`),

  markRead: (id: number) => http<Message>(`/api/messages/${id}/read`, { method: "PATCH" }),

  unreadCount: () => http<{ count: number }>("/api/messages/unread-count"),
};