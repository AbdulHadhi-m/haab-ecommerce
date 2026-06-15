"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../services/auth.service";
import { useAuthStore } from "../store";
import type { RegisterPayload } from "../types";
import { AUTH_QUERY_KEYS } from "../constants";

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      authApi.register({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      }),
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setUser(response.user);
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
      toast.success("Account created!", {
        description: "Welcome to HAAB. You are now logged in.",
      });
      router.push("/");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      toast.error("Registration failed", { description: message });
    },
  });
}
