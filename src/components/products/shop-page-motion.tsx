"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, createScope, stagger } from "animejs";

export function ShopPageMotion({ children, transitionKey }: { children: ReactNode; transitionKey: string }) {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    scope.current?.revert();
    scope.current = createScope({ root }).add(() => {
      animate("[data-results-bar]", {
        opacity: [0, 1],
        y: [8, 0],
        duration: 420,
        ease: "out(3)",
      });
      animate("[data-product-card]", {
        opacity: [0, 1],
        y: [18, 0],
        delay: stagger(65, { from: "first" }),
        duration: 560,
        ease: "out(3)",
      });
      animate("[data-shop-categories] a[data-active]", {
        opacity: [0.65, 1],
        y: [3, 0],
        duration: 360,
        ease: "out(3)",
      });
    });

    return () => scope.current?.revert();
  }, [transitionKey]);

  return <div ref={root}>{children}</div>;
}
