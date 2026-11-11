"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import type { StoreApi } from "zustand/vanilla";
import { products } from "@/lib/products";
import { createCartStore, type CartLine, type CartState, type CartStore } from "@/store/cart-store";

const CartContext = createContext<StoreApi<CartStore> | null>(null);
const STORAGE_KEY = "stillform-cart-v1";
const productsById = new Map(products.map((product) => [product.id, product]));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseCartLine(value: unknown): CartLine | null {
  if (!isRecord(value) || !isRecord(value.product)) return null;

  const productId = value.product.id;
  const product = typeof productId === "string" ? productsById.get(productId) : undefined;
  const quantity = value.quantity;
  if (!product || typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1) return null;

  return {
    product,
    quantity,
    finish: typeof value.finish === "string" ? value.finish : product.finish,
  };
}

function restoreCart(store: StoreApi<CartStore>) {
  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);
    if (!savedCart) return;

    const parsed: unknown = JSON.parse(savedCart);
    if (!isRecord(parsed)) throw new TypeError("Saved cart must be an object");

    const items = Array.isArray(parsed.items)
      ? parsed.items.map(parseCartLine).filter((line): line is CartLine => line !== null)
      : [];
    const favorites = Array.isArray(parsed.favorites)
      ? parsed.favorites.filter((id): id is string => typeof id === "string" && productsById.has(id))
      : [];

    store.getState().hydrate({ items, favorites });
  } catch {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage may be unavailable; the in-memory cart remains usable.
    }
  }
}

function persistCart(state: CartState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items, favorites: state.favorites }));
  } catch {
    // Storage may be full or unavailable; the in-memory cart remains usable.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createCartStore);

  useEffect(() => {
    restoreCart(store);
    return store.subscribe((state) => persistCart(state));
  }, [store]);

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
}

export function useCartStore<T>(selector: (state: CartStore) => T) {
  const store = useContext(CartContext);
  if (!store) throw new Error("useCartStore must be used inside CartProvider");
  return useStore(store, selector);
}
