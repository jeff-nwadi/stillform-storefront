import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";
import type { Product } from "@/lib/products";

export type CartLine = {
  product: Product;
  quantity: number;
  finish: string;
};

export type CartState = {
  items: CartLine[];
  favorites: string[];
  quickAddFeedback: QuickAddFeedback | null;
};

export type QuickAddFeedback = {
  id: number;
  productId: string;
  productName: string;
  status: "adding" | "added";
};

export type CartActions = {
  addItem: (product: Product, quantity?: number, finish?: string) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (productId: string) => void;
  setQuickAddFeedback: (feedback: QuickAddFeedback | null) => void;
  completeQuickAddFeedback: (id: number) => void;
  clearQuickAddFeedback: (id: number) => void;
  hydrate: (state: Partial<CartState>) => void;
};

export type CartStore = CartState & CartActions;

export const createCartStore = () =>
  createStore<CartStore>()(
    subscribeWithSelector((set) => ({
      items: [],
      favorites: [],
      quickAddFeedback: null,
      addItem: (product, quantity = 1, finish = product.finish) =>
        set((state) => {
          const existing = state.items.find(
            (line) => line.product.id === product.id && line.finish === finish,
          );
          return {
            items: existing
              ? state.items.map((line) =>
                  line.product.id === product.id && line.finish === finish
                    ? { ...line, quantity: line.quantity + quantity }
                    : line,
                )
              : [...state.items, { product, quantity, finish }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((line) => line.product.id !== productId) })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity < 1
              ? state.items.filter((line) => line.product.id !== productId)
              : state.items.map((line) =>
                  line.product.id === productId ? { ...line, quantity } : line,
                ),
        })),
      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),
      setQuickAddFeedback: (quickAddFeedback) => set({ quickAddFeedback }),
      completeQuickAddFeedback: (id) => set((state) => state.quickAddFeedback?.id === id
        ? { quickAddFeedback: { ...state.quickAddFeedback, status: "added" } }
        : state),
      clearQuickAddFeedback: (id) => set((state) => state.quickAddFeedback?.id === id
        ? { quickAddFeedback: null }
        : state),
      hydrate: (state) => set({ items: state.items ?? [], favorites: state.favorites ?? [] }),
    })),
  );
