"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "../services/user.service";
import { USER_KEYS } from "../constants";

export function useAddAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.PROFILE() });
      toast.success("Address added successfully");
    },
    onError: (error: Error) => { toast.error(error.message ?? "Failed to add address"); },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ addressId, ...payload }: { addressId: string } & Record<string, unknown>) =>
      userApi.updateAddress(addressId, payload as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.PROFILE() });
      toast.success("Address updated successfully");
    },
    onError: (error: Error) => { toast.error(error.message ?? "Failed to update address"); },
  });
}

export function useRemoveAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.removeAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.PROFILE() });
      toast.success("Address removed successfully");
    },
    onError: (error: Error) => { toast.error(error.message ?? "Failed to remove address"); },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.PROFILE() });
      toast.success("Default address updated");
    },
    onError: (error: Error) => { toast.error(error.message ?? "Failed to set default address"); },
  });
}
