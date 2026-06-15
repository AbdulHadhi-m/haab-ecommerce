"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../services/auth.service";
import { useAuthStore } from "../store";
import { AUTH_QUERY_KEYS } from "../constants";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      logout();
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
      queryClient.clear();
      toast.success("Logged out", {
        description: "You have been logged out successfully.",
      });
      router.push("/login");
    },
  });
}
