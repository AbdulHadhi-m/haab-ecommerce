import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

type CartStore = CartState & CartActions;

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      ...initialState,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.slug === item.slug,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.slug === item.slug
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: Math.min(item.quantity, item.stock) }] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.quantity < i.stock
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          ),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
              : i,
          ),
        })),

      clearCart: () => set({ items: [] }),

      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "adiwear-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
