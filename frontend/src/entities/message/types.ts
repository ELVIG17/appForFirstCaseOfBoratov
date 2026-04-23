export type Message = {
  id: number;
  text: string;
  createdAt: string;
  readAt?: string | null;
  senderId: number;
  receiverId: number;
  sender?: { id: number; username: string; email?: string };
  receiver?: { id: number; username: string; email?: string };
};