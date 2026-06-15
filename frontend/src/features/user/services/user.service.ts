import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/constants";
import type { UserProfile, UpdateProfilePayload, ChangePasswordPayload, AddAddressPayload, UpdateAddressPayload, Address } from "../types";

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await apiClient.get<{ success: boolean; data: UserProfile }>(API_ROUTES.USERS.PROFILE);
    return data.data;
  },
  updateProfile: async (payload: UpdateProfilePayload): Promise<UserProfile> => {
    const { data } = await apiClient.put<{ success: boolean; data: UserProfile }>(API_ROUTES.USERS.PROFILE, payload);
    return data.data;
  },
  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    await apiClient.put(API_ROUTES.USERS.PASSWORD, payload);
  },
  addAddress: async (payload: AddAddressPayload): Promise<UserProfile> => {
    const { data } = await apiClient.post<{ success: boolean; data: UserProfile }>(API_ROUTES.USERS.ADDRESSES, payload);
    return data.data;
  },
  updateAddress: async (addressId: string, payload: UpdateAddressPayload): Promise<UserProfile> => {
    const { data } = await apiClient.put<{ success: boolean; data: UserProfile }>(API_ROUTES.USERS.ADDRESS_BY_ID(addressId), payload);
    return data.data;
  },
  removeAddress: async (addressId: string): Promise<UserProfile> => {
    const { data } = await apiClient.delete<{ success: boolean; data: UserProfile }>(API_ROUTES.USERS.ADDRESS_BY_ID(addressId));
    return data.data;
  },
  setDefaultAddress: async (addressId: string): Promise<UserProfile> => {
    const { data } = await apiClient.put<{ success: boolean; data: UserProfile }>(API_ROUTES.USERS.ADDRESS_DEFAULT(addressId));
    return data.data;
  },
};
