"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { animate, createScope, stagger } from "animejs";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    scope.current = createScope({ root }).add(() => {
      animate(".hero-reveal", { opacity: [0, 1], y: [18, 0], delay: stagger(90), duration: 760, ease: "out(3)" });
      animate(".hero-photo", { opacity: [0, 1], scale: [1.035, 1], duration: 1100, ease: "out(3)" });
    });
    return () => scope.current?.revert();
  }, []);

  return (
    <section className="home-hero" ref={root}>
      <div className="hero-visual">
        <Image className="hero-photo" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90" alt="A sunlit living room with natural materials, a low table and soft seating" fill priority sizes="(max-width: 800px) 100vw, 62vw" unoptimized />
        <span className="image-caption">THE STILLFORM HOME <span>/</span> 01</span>
      </div>
      <div className="hero-copy">
        <p className="eyebrow hero-reveal">A quieter kind of comfort</p>
        <h1 className="hero-reveal">Make room<br />for what<br className="hero-mobile-break" /> matters.</h1>
        <p className="hero-description hero-reveal">Natural textures, thoughtful forms and pieces that make everyday living feel considered.</p>
        <div className="hero-actions hero-reveal">
          <Button asChild><Link href="/shop">Shop the collection <ArrowRight aria-hidden="true" /></Link></Button>
          <Link className="text-link" href="/our-story">Our approach <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
