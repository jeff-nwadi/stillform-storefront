"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { animate, createScope, stagger, type Target } from "animejs";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-provider";
import type { Product } from "@/lib/products";

export function QuickAddButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const feedback = useCartStore((state) => state.quickAddFeedback);
  const setFeedback = useCartStore((state) => state.setQuickAddFeedback);
  const completeFeedback = useCartStore((state) => state.completeQuickAddFeedback);
  const clearFeedback = useCartStore((state) => state.clearQuickAddFeedback);
  const buttonRef = useRef<HTMLSpanElement>(null);
  const isAdding = feedback?.productId === product.id && feedback.status === "adding";
  const isAdded = feedback?.productId === product.id && feedback.status === "added";

  useEffect(() => {
    if (!isAdded || !buttonRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scope = createScope({ root: buttonRef }).add(() => {
      animate(".quick-add-ribbon", {
        y: ["-14px", "54px"],
        x: (_target: Target | undefined, index = 0) => (index - 4) * 22,
        rotate: [-90, 270],
        opacity: [1, 0],
        delay: stagger(42),
        duration: 880,
        ease: "in(2)",
      });
    });
    return () => scope.revert();
  }, [isAdded]);

  const handleQuickAdd = () => {
    if (isAdding) return;

    const id = Date.now();
    setFeedback({ id, productId: product.id, productName: product.name, status: "adding" });
    addItem(product);
    setTimeout(() => completeFeedback(id), 180);
    setTimeout(() => clearFeedback(id), 2200);
  };

  return (
    <span ref={buttonRef} className="quick-add-animation-root">
      <Button className={`quick-add-button${isAdding ? " is-adding" : ""}${isAdded ? " is-added" : ""}`} variant="secondary" onClick={handleQuickAdd} aria-label={isAdding ? `Adding ${product.name} to bag` : isAdded ? `${product.name} added to bag` : `Add ${product.name} to bag`} aria-live="polite" disabled={isAdding}>
        <span className="quick-add-label">{isAdding ? "Adding" : isAdded ? "Added" : "Quick add"}</span>
        {isAdding ? <LoaderCircle className="quick-add-spinner" aria-hidden="true" /> : isAdded ? <Check aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
        {isAdded && <span className="quick-add-ribbons" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i className="quick-add-ribbon" key={index} />)}</span>}
      </Button>
    </span>
  );
}
