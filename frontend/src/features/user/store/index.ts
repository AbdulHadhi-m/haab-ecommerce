import { create } from "zustand";
import type { UserProfile } from "../types";

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
}

interface UserActions {
  setProfile: (profile: UserProfile | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

type UserStore = UserState & UserActions;

const initialState: UserState = {
  profile: null,
  isLoading: false,
};

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  setProfile: (profile) => set({ profile }),
  setIsLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}));
