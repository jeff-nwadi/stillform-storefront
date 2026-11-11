"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { animate, createScope, stagger } from "animejs";
import { Button } from "@/components/ui/button";

const heroImages = [
  { src: "photo-1600210492486-724fe5c67fb0", alt: "A sunlit living room with natural materials, a low table and soft seating" },
  { src: "photo-1616486338812-3dadae4b4ace", alt: "A layered living room in warm neutral tones" },
  { src: "photo-1600607687939-ce8a6c25118c", alt: "A calm contemporary home with natural finishes" },
  { src: "photo-1507473885765-e6ed057f782c", alt: "A softly lit interior with sculptural lighting" },
  { src: "photo-1578749556568-bc2c40e68b61", alt: "Hand-finished tableware in a muted natural palette" },
];

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const previousIndex = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    scope.current = createScope({ root }).add(() => {
      animate(".hero-reveal", { opacity: [0, 1], y: [18, 0], delay: stagger(90), duration: 760, ease: "out(3)" });
    });
    return () => scope.current?.revert();
  }, []);

  useEffect(() => {
    const slides = root.current?.querySelectorAll<HTMLElement>(".hero-slide");
    if (!slides) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      slides.forEach((slide, index) => { slide.style.opacity = index === activeIndex ? "1" : "0"; });
      previousIndex.current = activeIndex;
      return;
    }
    if (previousIndex.current === activeIndex) return;

    const current = slides[activeIndex];
    const previous = previousIndex.current >= 0 ? slides[previousIndex.current] : null;
    if (previous) {
      animate(previous, { opacity: [1, 0], scale: [1, 1.025], duration: 1150, ease: "inOut(2)" });
    }
    if (current) {
      animate(current, {
        opacity: [0, 1],
        scale: [1.035, 1],
        duration: previous ? 1450 : 1150,
        ease: "inOut(2)",
      });
    }
    previousIndex.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % heroImages.length), 6200);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused]);

  function showSlide(index: number) {
    setActiveIndex(((index % heroImages.length) + heroImages.length) % heroImages.length);
  }

  return (
    <section className="home-hero" ref={root}>
      <div
        className="hero-visual"
        role="region"
        aria-roledescription="carousel"
        aria-label="Stillform home collection"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false); }}
      >
        {heroImages.map((image, index) => (
          <div className="hero-slide" key={image.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroImages.length}`} style={{ opacity: index === 0 ? 1 : 0, transform: index === 0 ? "scale(1)" : "scale(1.035)" }} aria-hidden={index !== activeIndex}>
            <Image className="hero-photo" src={`https://images.unsplash.com/${image.src}?auto=format&fit=crop&w=1800&q=90`} alt={image.alt} fill priority={index === 0} sizes="(max-width: 800px) 100vw, 62vw" unoptimized />
          </div>
        ))}
        <span className="image-caption">THE STILLFORM HOME <span>/</span> {String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="hero-carousel-controls" aria-label="Hero image controls">
          <button type="button" className="hero-carousel-arrow" aria-label="Previous image" onClick={() => showSlide(activeIndex - 1)}><ArrowLeft size={15} /></button>
          <div className="hero-carousel-dots" role="group" aria-label="Choose a hero image">
            {heroImages.map((image, index) => <button type="button" key={image.src} className={`hero-carousel-dot${index === activeIndex ? " active" : ""}`} aria-label={`Show image ${index + 1} of ${heroImages.length}`} aria-pressed={index === activeIndex} onClick={() => showSlide(index)} />)}
          </div>
          <button type="button" className="hero-carousel-arrow" aria-label="Next image" onClick={() => showSlide(activeIndex + 1)}><ArrowRight size={15} /></button>
        </div>
      </div>
      <div className="hero-copy">
        <p className="eyebrow hero-reveal">A quieter kind of comfort</p>
        <h1 className="hero-reveal">Make room<br />for what<br className="hero-mobile-break" /> matters.</h1>
        <p className="hero-description hero-reveal">Natural textures, thoughtful forms and pieces that make everyday living feel considered.</p>
        <div className="hero-actions hero-reveal">
          <Button asChild><Link href="/shop">Shop the collection <ArrowRight aria-hidden="true" /></Link></Button>
          <Link className="text-link" href="/our-story">Our approach </Link>
        </div>
      </div>
    </section>
  );
}
