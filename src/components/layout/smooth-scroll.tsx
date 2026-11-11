"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore, type ReactNode } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSmoothScrollSnapshot() {
  return !window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSmoothScrollSnapshot() {
  return false;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(
    subscribeToMotionPreference,
    getSmoothScrollSnapshot,
    getServerSmoothScrollSnapshot,
  );

  if (!enabled) return children;

  return (
    <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
