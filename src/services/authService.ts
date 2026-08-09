import { mockUser } from "@/mock/data";
import { ok } from "./apiClient";
import type { User } from "@/types";

const SESSION_KEY = "applyiq.session";

export const authService = {
  async login(email: string, _password: string): Promise<User> {
    const user: User = { ...mockUser, email: email || mockUser.email };
    await ok(null, 900);
    if (typeof window !== "undefined")
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  async signup(name: string, email: string, _password: string): Promise<User> {
    const initials = name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
    const user: User = {
      ...mockUser,
      name: name || mockUser.name,
      email: email || mockUser.email,
      initials: initials || mockUser.initials,
    };
    await ok(null, 900);
    if (typeof window !== "undefined")
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  getSession(): User | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  logout() {
    if (typeof window !== "undefined") window.localStorage.removeItem(SESSION_KEY);
  },
};
