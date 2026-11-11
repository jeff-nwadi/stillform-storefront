"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";

type ProductImage = {
  src: string;
  alt: string;
};

export function ProductImageGallery({ product }: { product: Product }) {
  const images: ProductImage[] = [
    { src: product.image, alt: product.alt },
    ...(product.hoverImage
      ? [{ src: product.hoverImage, alt: `${product.name}, alternate view` }]
      : []),
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = images[activeImageIndex] ?? images[0];

  return (
    <div className="product-detail-gallery">
      <div className="product-detail-image">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width: 800px) 100vw, 55vw"
          unoptimized
        />
      </div>

      {images.length > 1 && (
        <div className="product-detail-thumbnails" role="group" aria-label="Product images">
          {images.map((image, index) => (
            <button
              className="product-detail-thumbnail"
              key={image.src}
              type="button"
              aria-label={`Show ${product.name}, image ${index + 1}`}
              aria-pressed={activeImageIndex === index}
              onClick={() => setActiveImageIndex(index)}
            >
              <Image src={image.src} alt="" fill sizes="100px" unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
