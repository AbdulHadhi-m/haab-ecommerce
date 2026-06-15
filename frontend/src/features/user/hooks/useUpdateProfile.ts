"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "../services/user.service";
import { USER_KEYS } from "../constants";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.PROFILE() });
      toast.success("Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to update profile");
    },
  });
}
