"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import type { StoreApi } from "zustand/vanilla";
import { createCartStore, type CartStore } from "@/store/cart-store";

const CartContext = createContext<StoreApi<CartStore> | null>(null);
const STORAGE_KEY = "stillform-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<StoreApi<CartStore> | null>(null);
  if (!storeRef.current) storeRef.current = createCartStore();

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) store.getState().hydrate(JSON.parse(saved) as Partial<CartStore>);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    return store.subscribe((state) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items, favorites: state.favorites }));
    });
  }, []);

  return <CartContext.Provider value={storeRef.current}>{children}</CartContext.Provider>;
}

export function useCartStore<T>(selector: (state: CartStore) => T) {
  const store = useContext(CartContext);
  if (!store) throw new Error("useCartStore must be used inside CartProvider");
  return useStore(store, selector);
}
