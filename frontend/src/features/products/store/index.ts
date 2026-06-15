import { create } from "zustand";

interface ProductsState {
  selectedCategory: string | null;
  searchQuery: string;
}

interface ProductsActions {
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

type ProductsStore = ProductsState & ProductsActions;

const initialState: ProductsState = {
  selectedCategory: null,
  searchQuery: "",
};

export const useProductsStore = create<ProductsStore>((set) => ({
  ...initialState,
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  reset: () => set(initialState),
}));
