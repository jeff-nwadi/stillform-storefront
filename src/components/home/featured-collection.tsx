"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { animate } from "animejs";
import { ProductGrid } from "@/components/products/product-card";
import { products } from "@/lib/products";

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
    const cardElements = Array.from(carousel.querySelectorAll<HTMLElement>(".product-card"));
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
    <section className="section collection-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A quieter kind of everyday</span>
          <h2>New & noteworthy</h2>
        </div>
        <div className="featured-carousel-actions">
          <Link href="/shop" className="text-link">
            View all pieces <ArrowRight size={16} />
          </Link>
          <div className="featured-carousel-controls" aria-label="Carousel controls">
            <button type="button" aria-label="Previous products" onClick={() => scrollCarousel(-1)}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next products" onClick={() => scrollCarousel(1)}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div
        className="featured-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="New and noteworthy products"
      >
        <ProductGrid
          className="featured-carousel-track"
          products={featuredProducts}
          containerRef={carouselRef}
        />
      </div>
    </section>
  );
}
