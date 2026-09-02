"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AUTH_EXPIRED_EVENT, apiRequest } from "@/lib/api";
import { clearStoredToken, getStoredToken, storeToken } from "@/lib/auth";
import type {
  AuthUser,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from "@/types/auth";

import { useToast } from "./ToastProvider";

export type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<RegisterResponse>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const clearSession = useCallback(() => {
    clearStoredToken();
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let isActive = true;

    void Promise.resolve().then(async () => {
      const storedToken = getStoredToken();

      if (!storedToken) {
        if (isActive) {
          setIsLoading(false);
        }
        return;
      }

      if (isActive) {
        setToken(storedToken);
      }

      try {
        const currentUser = await apiRequest<AuthUser>("/auth/me", {
          token: storedToken,
        });
        if (isActive) {
          setUser(currentUser);
        }
      } catch {
        if (isActive) {
          clearSession();
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    });

    return () => {
      isActive = false;
    };
  }, [clearSession]);

  useEffect(() => {
    const handleExpiredSession = () => {
      if (getStoredToken()) {
        clearSession();
        showToast("Your session expired. Please sign in again.", "info");
      }
    };

    window.addEventListener(AUTH_EXPIRED_EVENT, handleExpiredSession);
    return () =>
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleExpiredSession);
  }, [clearSession, showToast]);

  const login = useCallback(async (input: LoginInput) => {
    const response = await apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });

    storeToken(response.accessToken);
    setToken(response.accessToken);
    setUser(response.user);
    return response.user;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    return apiRequest<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }, []);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      login,
      register,
      logout,
    }),
    [isLoading, login, logout, register, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
