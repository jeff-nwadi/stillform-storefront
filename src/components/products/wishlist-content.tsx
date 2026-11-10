"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { ProductGrid } from "@/components/products/product-card";
import { useCartStore } from "@/store/cart-provider";
import { products } from "@/lib/products";

export function WishlistContent() {
  const favorites = useCartStore((state) => state.favorites);
  const savedProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <main className="page-wrap wishlist-page">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span>Wishlist</div>
      <div className="wishlist-heading">
        <div><span className="eyebrow">Your considered collection</span><h1>Wishlist <span>({savedProducts.length})</span></h1></div>
        <Link href="/shop" className="text-link">Continue exploring <ArrowRight size={16} /></Link>
      </div>
      {savedProducts.length ? <>
        <p className="wishlist-description">A few pieces you’ve saved for later.</p>
        <ProductGrid products={savedProducts} />
      </> : <div className="wishlist-empty">
        <Heart size={25} strokeWidth={1.3} aria-hidden="true" />
        <h2>Keep the pieces you love close.</h2>
        <p>Tap the heart on a piece to save it here for later.</p>
        <Link href="/shop" className="button button-default">Explore the collection <ArrowRight size={16} /></Link>
      </div>}
    </main>
  );
}
