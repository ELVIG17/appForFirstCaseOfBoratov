import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "../../entities/user/types";
import { authApi } from "../../features/auth/authApi";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  refreshMe: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshMe() {
    try {
      const me = await authApi.me();
      setUser(me);
    } catch {
      setUser(null);
    }
  }

  async function login(email: string, password: string) {
    const resp = await authApi.login(email, password);
    setUser(resp.user);
  }

  async function register(username: string, email: string, password: string) {
    await authApi.register(username, email, password);
  }

  async function logout() {
    await authApi.logout();
    setUser(null);
  }

  useEffect(() => {
    (async () => {
      await refreshMe();
      setLoading(false);
    })();
  }, []);

  const value = useMemo(
    () => ({ user, loading, refreshMe, login, register, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}