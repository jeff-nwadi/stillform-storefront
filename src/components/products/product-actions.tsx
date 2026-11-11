"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-provider";
import type { Product } from "@/lib/products";

const stepButton = "grid h-full w-[34px] cursor-pointer place-items-center";

export function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const confirmationTimer = useRef<number | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => () => {
    if (confirmationTimer.current !== null) window.clearTimeout(confirmationTimer.current);
  }, []);

  function handleAddToBag() {
    addItem(product, quantity);
    setAdded(true);

    if (confirmationTimer.current !== null) window.clearTimeout(confirmationTimer.current);
    confirmationTimer.current = window.setTimeout(() => {
      setAdded(false);
      confirmationTimer.current = null;
    }, 1800);
  }

  return (
    <>
      <div className="mr-[10px] inline-flex h-12 w-[115px] items-center justify-between border border-line align-top">
        <button className={stepButton} type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
          <Minus size={15} />
        </button>
        <span className="text-[13px]" aria-live="polite">{quantity}</span>
        <button className={stepButton} type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}>
          <Plus size={15} />
        </button>
      </div>
      <Button className="w-[calc(100%-130px)] align-top max-sm:text-[9px]" onClick={handleAddToBag}>
        {added ? <Check size={17} /> : <ShoppingBag size={17} />}
        {added ? "Added to your bag" : "Add to bag"}
      </Button>
    </>
  );
}
