import { create } from "zustand";

interface CheckoutState {
  currentStep: number;
}

interface CheckoutActions {
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

type CheckoutStore = CheckoutState & CheckoutActions;

const initialState: CheckoutState = {
  currentStep: 0,
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  ...initialState,
  nextStep: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
  goToStep: (currentStep) => set({ currentStep }),
  reset: () => set(initialState),
}));
