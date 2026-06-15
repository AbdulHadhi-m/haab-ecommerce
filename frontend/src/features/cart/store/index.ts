import { create } from "zustand";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

type CartStore = CartState & CartActions;

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const useCartStore = create<CartStore>((set) => ({
  ...initialState,
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.productId === item.productId &&
          i.size === item.size &&
          i.color === item.color,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId &&
            i.size === item.size &&
            i.color === item.color
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (productId, size, color) =>
    set((state) => ({
      items: state.items.filter(
        (i) =>
          !(i.productId === productId && i.size === size && i.color === color),
      ),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      ),
    })),
  clearCart: () => set({ items: [] }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
