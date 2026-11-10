"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!enabled) return children;

  return (
    <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
