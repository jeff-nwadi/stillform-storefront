"use client";

import Image from "next/image";
import Link from "next/link";
import type { Ref } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickAddButton } from "@/components/products/quick-add-button";
import { useCartStore } from "@/store/cart-provider";
import { formatPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductLayout = "grid" | "carousel";

const cardImage =
  "[transition:opacity_.42s_ease,scale_.7s_cubic-bezier(.2,.7,.2,1)]";

type ProductCardProps = {
  product: Product;
  index?: number;
  variant?: ProductLayout;
};

export function ProductCard({ product, index = 0, variant = "grid" }: ProductCardProps) {
  const favorites = useCartStore((state) => state.favorites);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(product.id);
  const inCarousel = variant === "carousel";

  return (
    <article
      className={cn(
        "group/card grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_auto_auto]",
        inCarousel && "min-w-0 flex-[0_0_calc((100%-36px)/3)] max-lg:basis-[calc((100%-15px)/2)] max-sm:basis-[82%]",
      )}
      data-product-card
      style={{ "--card-index": index } as React.CSSProperties}
    >
      <div
        className={cn(
          "relative col-start-1 row-start-1 overflow-hidden bg-[#e4e3dc]",
          inCarousel ? "aspect-[1.5] max-sm:aspect-[1.2]" : "aspect-[.79] max-sm:aspect-[.73]",
        )}
      >
        <Link
          className="group/link absolute inset-0 block"
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
        >
          <Image
            className={cn(cardImage, "z-1 group-hover/card:scale-[1.035] group-hover/card:opacity-0 group-focus-visible/link:scale-[1.035] group-focus-visible/link:opacity-0")}
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1000px) 45vw, 25vw"
            unoptimized
          />
          {product.hoverImage && (
            <Image
              className={cn(cardImage, "z-2 scale-[1.025] opacity-0 group-hover/card:scale-100 group-hover/card:opacity-100 group-focus-visible/link:scale-100 group-focus-visible/link:opacity-100")}
              src={product.hoverImage}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1000px) 45vw, 25vw"
              unoptimized
            />
          )}
        </Link>
        {product.badge && <span className="absolute top-[13px] left-[13px] z-3 bg-paper px-[9px] py-[6px] text-[10px] tracking-[.1em] uppercase">{product.badge}</span>}
        <Button
          className={cn("absolute top-[10px] right-[10px] z-4 size-[34px] min-h-[34px] bg-[#fafaf0bb] [&_svg]:size-4", isFavorite && "text-[#8b5a54]")}
          variant="ghost"
          size="icon"
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart aria-hidden="true" fill={isFavorite ? "currentColor" : "none"} />
        </Button>
      </div>
      <QuickAddButton product={product} />
      <div className="col-start-1 row-start-2 mt-[13px] flex justify-between gap-2 text-[13px] max-sm:text-[12px]">
        <Link href={`/products/${product.slug}`} className="text-[14px] max-sm:text-[13px]">{product.name}</Link>
        <span className="whitespace-nowrap">{formatPrice(product.price)}</span>
      </div>
      <p className="col-start-1 row-start-3 my-1 text-[12px] text-[#858b86] max-sm:text-[11px]">{product.material} · {product.finish}</p>
    </article>
  );
}

type ProductGridProps = {
  products: Product[];
  className?: string;
  variant?: ProductLayout;
  containerRef?: Ref<HTMLDivElement>;
};

export function ProductGrid({ products, className, variant = "grid", containerRef }: ProductGridProps) {
  return (
    <div
      ref={containerRef}
      className={cn(
        "grid grid-cols-4 gap-[18px] max-lg:grid-cols-2 max-lg:gap-x-[15px] max-lg:gap-y-7",
        variant === "carousel" && "flex snap-none overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} variant={variant} />
      ))}
    </div>
  );
}
