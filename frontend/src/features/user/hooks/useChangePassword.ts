"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "../services/user.service";

export function useChangePassword() {
  return useMutation({
    mutationFn: userApi.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to change password");
    },
  });
}
