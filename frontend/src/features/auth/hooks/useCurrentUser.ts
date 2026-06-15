"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "../services/auth.service";
import { useAuthStore } from "../store";
import { AUTH_QUERY_KEYS } from "../constants";

export function useCurrentUser() {
  const setUser = useAuthStore((s) => s.setUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: async () => {
      const data = await authApi.getCurrentUser();
      setUser(data.user);
      return data.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !!(
      typeof window !== "undefined" && localStorage.getItem("accessToken")
    ),
    meta: {
      onError: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
      },
    },
  });
}
