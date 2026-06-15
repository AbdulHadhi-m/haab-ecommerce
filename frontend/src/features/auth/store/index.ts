import { create } from "zustand";

interface User {
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
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  reset: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}));
