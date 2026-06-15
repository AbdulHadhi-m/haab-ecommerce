import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/constants";
import type { UserProfile, UpdateProfilePayload, ChangePasswordPayload, AddAddressPayload, UpdateAddressPayload, Address } from "../types";

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await apiClient.get<UserProfile>(API_ROUTES.USERS.PROFILE);
    return data;
  },
  updateProfile: async (payload: UpdateProfilePayload): Promise<UserProfile> => {
    const { data } = await apiClient.put<UserProfile>(API_ROUTES.USERS.PROFILE, payload);
    return data;
  },
  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    await apiClient.put(API_ROUTES.USERS.PASSWORD, payload);
  },
  addAddress: async (payload: AddAddressPayload): Promise<UserProfile> => {
    const { data } = await apiClient.post<UserProfile>(API_ROUTES.USERS.ADDRESSES, payload);
    return data;
  },
  updateAddress: async (addressId: string, payload: UpdateAddressPayload): Promise<UserProfile> => {
    const { data } = await apiClient.put<UserProfile>(API_ROUTES.USERS.ADDRESS_BY_ID(addressId), payload);
    return data;
  },
  removeAddress: async (addressId: string): Promise<UserProfile> => {
    const { data } = await apiClient.delete<UserProfile>(API_ROUTES.USERS.ADDRESS_BY_ID(addressId));
    return data;
  },
  setDefaultAddress: async (addressId: string): Promise<UserProfile> => {
    const { data } = await apiClient.put<UserProfile>(API_ROUTES.USERS.ADDRESS_DEFAULT(addressId));
    return data;
  },
};
