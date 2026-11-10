"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickAddButton } from "@/components/products/quick-add-button";
import { useCartStore } from "@/store/cart-provider";
import { formatPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const favorites = useCartStore((state) => state.favorites);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(product.id);

  return (
    <article className="product-card" style={{ "--card-index": index } as React.CSSProperties}>
      <div className="product-card-image-wrap">
        <Link className="product-card-image-link" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          <Image className="product-card-image" src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 80vw, (max-width: 1000px) 45vw, 25vw" unoptimized />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <Button className={cn("favorite-button", isFavorite && "is-favorite")} variant="ghost" size="icon" aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`} aria-pressed={isFavorite} onClick={() => toggleFavorite(product.id)}>
          <Heart aria-hidden="true" fill={isFavorite ? "currentColor" : "none"} />
        </Button>
        <QuickAddButton product={product} />
      </div>
      <div className="product-card-meta">
        <Link href={`/products/${product.slug}`} className="product-card-name">{product.name}</Link>
        <span className="product-card-price">{formatPrice(product.price)}</span>
      </div>
      <p className="product-card-finish">{product.material} · {product.finish}</p>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>;
}
