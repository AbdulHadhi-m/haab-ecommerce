import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/constants";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from "../types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      payload,
    );
    return data;
  },

  register: async (
    payload: Omit<RegisterPayload, "confirmPassword">,
  ): Promise<RegisterResponse> => {
    const { data } = await apiClient.post<RegisterResponse>(
      API_ROUTES.AUTH.REGISTER,
      payload,
    );
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ROUTES.AUTH.LOGOUT);
  },

  getCurrentUser: async (): Promise<{ user: User }> => {
    const { data } = await apiClient.get<{ user: User }>(
      API_ROUTES.AUTH.ME,
    );
    return data;
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const { data } = await apiClient.post<{ accessToken: string }>(
      API_ROUTES.AUTH.REFRESH,
    );
    return data;
  },
};
