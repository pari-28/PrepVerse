const STORAGE_KEY = "prepverse-ai-coach-history";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function getChatSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveChatSession(messages: ChatMessage[], sessionId?: string): ChatSession {
  const sessions = getChatSessions();
  const now = Date.now();

  if (sessionId) {
    const idx = sessions.findIndex((s) => s.id === sessionId);
    if (idx !== -1) {
      sessions[idx].messages = messages;
      sessions[idx].updatedAt = now;
      if (messages.length > 0) {
        const firstUserMsg = messages.find((m) => m.role === "user");
        sessions[idx].title = firstUserMsg
          ? firstUserMsg.content.substring(0, 50) + (firstUserMsg.content.length > 50 ? "..." : "")
          : "New conversation";
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      return sessions[idx];
    }
  }

  const newSession: ChatSession = {
    id: generateId(),
    title: messages.find((m) => m.role === "user")?.content.substring(0, 50) || "New conversation",
    messages,
    createdAt: now,
    updatedAt: now,
  };
  sessions.unshift(newSession);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  return newSession;
}

export function deleteChatSession(sessionId: string): void {
  const sessions = getChatSessions().filter((s) => s.id !== sessionId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function clearAllChatHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
