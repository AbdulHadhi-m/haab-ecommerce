import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setIsLoading: (value: boolean) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

function getInitialState(): AuthState {
  if (typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
    return { user: null, isAuthenticated: false, isLoading: false };
  }
  return { user: null, isAuthenticated: false, isLoading: true };
}

const initialState: AuthState = getInitialState();

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
}));
