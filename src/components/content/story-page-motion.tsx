"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, stagger } from "animejs";

export function StoryPageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.classList.add("story-motion-ready");
    if (!("IntersectionObserver" in window)) {
      element.classList.remove("story-motion-ready");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        const childrenToReveal = target.querySelectorAll<HTMLElement>(":scope > *");
        if (childrenToReveal.length) {
          animate(childrenToReveal, { opacity: [0, 1], y: [22, 0], delay: stagger(95), duration: 720, ease: "out(3)" });
        }
        target.removeAttribute("data-story-reveal");
        observer.unobserve(target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -6% 0px" });

    element.querySelectorAll<HTMLElement>("[data-story-reveal]").forEach((target) => observer.observe(target));
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const image = entry.target as HTMLElement;
        image.dataset.animated = "true";
        animate(image, { opacity: [0, 1], scale: [1.04, 1], duration: 1100, ease: "out(3)" });
        imageObserver.unobserve(image);
      });
    }, { threshold: 0.15 });
    element.querySelectorAll<HTMLElement>("[data-story-image]").forEach((image) => imageObserver.observe(image));

    return () => {
      observer.disconnect();
      imageObserver.disconnect();
      element.classList.remove("story-motion-ready");
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
