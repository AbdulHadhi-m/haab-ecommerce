import { create } from "zustand";

interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
}

interface WishlistActions {
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

type WishlistStore = WishlistState & WishlistActions;

const initialState: WishlistState = {
  items: [],
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  ...initialState,
  addItem: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.productId === item.productId);
      if (exists) {
        return {
          items: state.items.filter((i) => i.productId !== item.productId),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),
  isInWishlist: (productId) => {
    return get().items.some((i) => i.productId === productId);
  },
  clearWishlist: () => set({ items: [] }),
}));
