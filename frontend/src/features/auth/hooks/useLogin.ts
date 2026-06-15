"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../services/auth.service";
import { useAuthStore } from "../store";
import type { LoginPayload } from "../types";
import { AUTH_QUERY_KEYS } from "../constants";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setUser(response.user);
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
      toast.success("Welcome back!", {
        description: "You have been logged in successfully.",
      });
      router.push(response.user.role === "admin" ? "/admin" : "/");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Invalid email or password. Please try again.";
      toast.error("Login failed", { description: message });
    },
  });
}
