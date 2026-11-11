"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { ProductGrid } from "@/components/products/product-card";
import { useCartStore } from "@/store/cart-provider";
import { products } from "@/lib/products";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { breadcrumbs, eyebrow, pageWrap, textLink } from "@/lib/styles";

export function WishlistContent() {
  const favorites = useCartStore((state) => state.favorites);
  const savedProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <main className={pageWrap}>
      <div className={breadcrumbs}><Link href="/">Home</Link><span>/</span>Wishlist</div>
      <div className="flex items-end justify-between pt-[58px] pb-[34px] max-sm:block max-sm:pt-[43px] max-sm:pb-[26px]">
        <div><span className={eyebrow}>Your considered collection</span><h1 className="mt-[14px] font-serif text-[clamp(46px,5vw,66px)] leading-none font-normal tracking-[-.04em] max-sm:text-[40px]">Wishlist <span className="align-middle font-sans text-[17px] leading-[normal] tracking-normal text-[#848b85]">({savedProducts.length})</span></h1></div>
        <Link href="/shop" className={cn(textLink, "max-sm:mt-[14px]")}>Continue exploring <ArrowRight size={16} /></Link>
      </div>
      {savedProducts.length ? <>
        <p className="mb-[26px] text-[#6f7872]">A few pieces you’ve saved for later.</p>
        <ProductGrid products={savedProducts} />
      </> : <div className="flex min-h-[42vh] flex-col items-center justify-center px-[15px] pt-[55px] pb-20 text-center">
        <Heart className="text-[#78837b]" size={25} strokeWidth={1.3} aria-hidden="true" />
        <h2 className="mt-[19px] mb-2 font-serif text-[34px] leading-[1.15] font-normal max-sm:text-[24px]">Keep the pieces you love close.</h2>
        <p className="mb-[22px] text-[#6f7872]">Tap the heart on a piece to save it here for later.</p>
        <Link href="/shop" className={buttonVariants()}>Explore the collection <ArrowRight size={16} /></Link>
      </div>}
    </main>
  );
}
