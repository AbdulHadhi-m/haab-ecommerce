"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "../services/user.service";
import { USER_KEYS } from "../constants";

export function useProfile() {
  return useQuery({
    queryKey: USER_KEYS.PROFILE(),
    queryFn: userApi.getProfile,
  });
}
