"use client";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-provider";
import type { Product } from "@/lib/products";

export function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  return <><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity((n) => Math.max(1, n - 1))}><Minus size={15} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((n) => n + 1)}><Plus size={15} /></button></div><Button className="add-to-bag" onClick={() => { addItem(product, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1800); }}>{added ? <Check size={17} /> : <ShoppingBag size={17} />}{added ? "Added to your bag" : "Add to bag"}</Button></>;
}
