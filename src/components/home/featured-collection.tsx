"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { animate } from "animejs";
import { ProductGrid } from "@/components/products/product-card";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { eyebrow, sectionHeading, sectionHeadingLink, sectionHeadingTitle, textLink } from "@/lib/styles";

const carouselButton =
  "grid size-8 min-h-8 min-w-8 flex-[0_0_32px] cursor-pointer place-items-center rounded-[3px] border border-line bg-transparent text-ink transition-[background-color,color,border-color] duration-200 hover:border-ink hover:bg-ink hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink [&_svg]:size-[15px]";

const featuredOrder = ["miro-vase", "sora-lamp", "field-throw"];
const featuredProducts = products
  .filter((product) => product.featured || product.badge === "New")
  .sort((a, b) => {
    const aOrder = featuredOrder.indexOf(a.id);
    const bOrder = featuredOrder.indexOf(b.id);
    return (aOrder === -1 ? Number.MAX_SAFE_INTEGER : aOrder)
      - (bOrder === -1 ? Number.MAX_SAFE_INTEGER : bOrder);
  });

export function FeaturedCollection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  function scrollCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const start = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, start + direction * carousel.clientWidth));
    if (target === start) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scrollAnimationRef.current?.cancel();
    if (reducedMotion) {
      carousel.scrollLeft = target;
      return;
    }

    const carouselBounds = carousel.getBoundingClientRect();
    const cardElements = Array.from(carousel.querySelectorAll<HTMLElement>("[data-product-card]"));
    const incomingCards = cardElements.filter((card) => {
      const bounds = card.getBoundingClientRect();
      const cardStart = bounds.left - carouselBounds.left + start;
      const currentVisible = cardStart < start + carousel.clientWidth && cardStart + bounds.width > start;
      const targetVisible = cardStart < target + carousel.clientWidth && cardStart + bounds.width > target;
      return targetVisible && !currentVisible;
    });

    if (incomingCards.length) {
      animate(incomingCards, {
        opacity: [0.65, 1],
        delay: 0,
        duration: 760,
        ease: "out(3)",
      });
    }

    scrollAnimationRef.current = animate(carousel, {
      scrollLeft: target,
      duration: 760,
      ease: "out(3)",
    });
  }

  return (
    <section className="px-[7.2%] pt-[53px] pb-[110px] max-sm:px-[6%] max-sm:pt-5 max-sm:pb-[75px]">
      <div className={cn(sectionHeading, "max-sm:flex-wrap max-sm:gap-[18px]")}>
        <div>
          <span className={eyebrow}>A quieter kind of everyday</span>
          <h2 className={sectionHeadingTitle}>New & noteworthy</h2>
        </div>
        <div className="ml-auto flex items-center gap-5 max-sm:w-full max-sm:justify-between">
          <Link href="/shop" className={cn(textLink, sectionHeadingLink)}>
            View all pieces <ArrowRight size={16} />
          </Link>
          <div className="flex items-center gap-[6px]" aria-label="Carousel controls">
            <button className={carouselButton} type="button" aria-label="Previous products" onClick={() => scrollCarousel(-1)}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button className={carouselButton} type="button" aria-label="Next products" onClick={() => scrollCarousel(1)}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="New and noteworthy products"
      >
        <ProductGrid
          variant="carousel"
          products={featuredProducts}
          containerRef={carouselRef}
        />
      </div>
    </section>
  );
}
