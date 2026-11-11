"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { animate, createScope, stagger } from "animejs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { eyebrow, textLink } from "@/lib/styles";

const heroImages = [
  { src: "photo-1600210492486-724fe5c67fb0", alt: "A sunlit living room with natural materials, a low table and soft seating" },
  { src: "photo-1616486338812-3dadae4b4ace", alt: "A layered living room in warm neutral tones" },
  { src: "photo-1600607687939-ce8a6c25118c", alt: "A calm contemporary home with natural finishes" },
  { src: "photo-1507473885765-e6ed057f782c", alt: "A softly lit interior with sculptural lighting" },
  { src: "photo-1578749556568-bc2c40e68b61", alt: "Hand-finished tableware in a muted natural palette" },
];

const carouselArrow =
  "grid size-[30px] cursor-pointer place-items-center rounded-full border border-[#ffffff85] bg-[#16211d24] text-white transition-[background-color,border-color] duration-200 hover:border-white hover:bg-[#ffffff28] motion-reduce:transition-none max-sm:size-7";
const carouselDot =
  "size-[7px] cursor-pointer rounded-full border border-[#ffffffc0] bg-transparent transition-[width,background-color,border-radius] duration-300 motion-reduce:transition-none aria-pressed:w-5 aria-pressed:rounded-[5px] aria-pressed:bg-white max-sm:size-[6px] max-sm:aria-pressed:w-[17px]";

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const previousIndex = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    scope.current = createScope({ root }).add(() => {
      animate("[data-hero-reveal]", { opacity: [0, 1], y: [18, 0], delay: stagger(90), duration: 760, ease: "out(3)" });
    });
    return () => scope.current?.revert();
  }, []);

  useEffect(() => {
    const slides = root.current?.querySelectorAll<HTMLElement>("[data-hero-slide]");
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
    <section className="grid min-h-[560px] grid-cols-[61%_39%] max-lg:min-h-[500px] max-lg:grid-cols-[55%_45%] max-sm:flex max-sm:flex-col-reverse" ref={root}>
      <div
        className="relative isolate min-h-[560px] overflow-hidden bg-drift after:pointer-events-none after:absolute after:inset-x-0 after:top-[52%] after:bottom-0 after:z-1 after:bg-[linear-gradient(transparent,#15211c66)] max-lg:min-h-[500px] max-sm:h-[57vh] max-sm:max-h-[540px] max-sm:min-h-[390px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Stillform home collection"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false); }}
      >
        {heroImages.map((image, index) => (
          <div className="absolute inset-0 will-change-[opacity,transform] motion-reduce:will-change-auto" data-hero-slide key={image.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroImages.length}`} style={{ opacity: index === 0 ? 1 : 0, transform: index === 0 ? "scale(1)" : "scale(1.035)" }} aria-hidden={index !== activeIndex}>
            <Image src={`https://images.unsplash.com/${image.src}?auto=format&fit=crop&w=1800&q=90`} alt={image.alt} fill priority={index === 0} sizes="(max-width: 800px) 100vw, 62vw" unoptimized />
          </div>
        ))}
        <span className="absolute bottom-[25px] left-[27px] z-2 text-[11px] tracking-[.14em] text-white text-shadow-[0_1px_5px_#333] max-sm:bottom-5 max-sm:left-4 max-sm:text-[9px]">THE STILLFORM HOME <span className="px-[7px] opacity-70">/</span> {String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="absolute right-[22px] bottom-[18px] z-2 flex items-center gap-3 text-white max-sm:right-[15px] max-sm:bottom-[15px] max-sm:gap-[9px]" aria-label="Hero image controls">
          <button type="button" className={carouselArrow} aria-label="Previous image" onClick={() => showSlide(activeIndex - 1)}><ArrowLeft size={15} /></button>
          <div className="flex items-center gap-[7px] max-sm:gap-[6px]" role="group" aria-label="Choose a hero image">
            {heroImages.map((image, index) => <button type="button" key={image.src} className={carouselDot} aria-label={`Show image ${index + 1} of ${heroImages.length}`} aria-pressed={index === activeIndex} onClick={() => showSlide(index)} />)}
          </div>
          <button type="button" className={carouselArrow} aria-label="Next image" onClick={() => showSlide(activeIndex + 1)}><ArrowRight size={15} /></button>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center bg-[#f8f8f5] pt-[60px] pr-[12%] pb-[70px] pl-[13%] max-lg:px-[8%] max-lg:py-[45px] max-sm:pt-[57px] max-sm:pb-12">
        <p className={cn(eyebrow, "my-[1em] text-[#516057]")} data-hero-reveal>A quieter kind of comfort</p>
        <h1 className="my-6 font-serif text-[clamp(50px,5.2vw,76px)] leading-[.98] font-normal tracking-[-.045em] text-balance text-ink max-lg:text-[57px] max-sm:my-[17px] max-sm:text-[58px]" data-hero-reveal>Make room<br />for what<br className="hidden max-sm:block" /> matters.</h1>
        <p className="mb-7 max-w-[360px] text-[16px] leading-[1.75] text-[#48544e] max-sm:text-[15px]" data-hero-reveal>Natural textures, thoughtful forms and pieces that make everyday living feel considered.</p>
        <div className="flex items-center gap-[25px] max-sm:gap-3" data-hero-reveal>
          <Button className="max-sm:shrink-0 max-sm:gap-2 max-sm:px-2 max-sm:text-[9px] max-sm:whitespace-nowrap" asChild><Link href="/shop">Shop the collection <ArrowRight aria-hidden="true" /></Link></Button>
          <Link className={cn(textLink, "max-sm:shrink-0 max-sm:gap-[5px] max-sm:text-[10px] max-sm:whitespace-nowrap")} href="/our-story">Our approach </Link>
        </div>
      </div>
    </section>
  );
}
