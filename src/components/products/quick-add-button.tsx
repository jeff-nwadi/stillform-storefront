"use client";

import { useEffect, useRef } from "react";
import { Check, LoaderCircle, Plus } from "lucide-react";
import { animate, createScope, stagger, type Target } from "animejs";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-provider";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const ribbonColors = [
  "bg-sand",
  "bg-[#87988e]",
  "bg-[#d4a878]",
  "bg-[#c18d84]",
  "bg-[#8497a0]",
  "bg-sand",
  "bg-sand",
  "bg-sand",
  "bg-sand",
];

/*
 * Sits over the bottom of the card image and fades in on hover or focus.
 * From tablet down it is always visible, and on phones it drops below the
 * product details instead.
 */
const quickAddButton =
  "relative isolate z-4 col-start-1 row-start-1 mb-[10px] w-max max-w-[calc(100%-20px)] min-w-28 translate-y-[5px] self-end justify-self-center overflow-hidden opacity-0 transition-[background-color,color,border-color,opacity,translate] group-hover/card:translate-none group-hover/card:opacity-100 hover:translate-none focus-visible:translate-none focus-visible:opacity-100 max-lg:-translate-x-1/2 max-lg:translate-y-0 max-lg:opacity-100 max-sm:row-start-4 max-sm:mt-2 max-sm:mb-0 max-sm:min-h-[39px] max-sm:translate-none max-sm:self-start max-sm:justify-self-start max-sm:text-[10px]";

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
      animate("[data-ribbon]", {
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

  const label = isAdding ? "Adding" : isAdded ? "Added" : "Quick add";
  const buttonLabel = isAdding
    ? `Adding ${product.name} to bag`
    : isAdded
      ? `${product.name} added to bag`
      : `Add ${product.name} to bag`;

  return (
    <span ref={buttonRef} className="contents">
      <Button
        className={cn(
          quickAddButton,
          (isAdding || isAdded) && "translate-none! opacity-100!",
          isAdding && "cursor-wait",
          isAdded && "border-[#bdc8be] bg-[#e5e9e3] text-ink hover:bg-[#e5e9e3]",
        )}
        variant="secondary"
        onClick={handleQuickAdd}
        aria-label={buttonLabel}
        aria-live="polite"
        disabled={isAdding}
        data-quick-add
      >
        <span className="relative z-2">{label}</span>
        {isAdding ? (
          <LoaderCircle className="relative z-2 animate-spinner-roam motion-reduce:animate-none" aria-hidden="true" />
        ) : isAdded ? (
          <Check className="relative z-2" aria-hidden="true" />
        ) : (
          <Plus className="relative z-2" aria-hidden="true" />
        )}
        {isAdded && (
          <span className="pointer-events-none absolute inset-0 z-1 overflow-hidden" aria-hidden="true">
            {ribbonColors.map((color, index) => (
              <i className={cn("absolute top-0 left-1/2 h-[14px] w-[7px] rounded-[2px] opacity-0 will-change-[transform,opacity]", color)} data-ribbon key={index} />
            ))}
          </span>
        )}
      </Button>
    </span>
  );
}
