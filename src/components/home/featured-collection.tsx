import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/products/product-card";
import { products } from "@/lib/products";

const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

export function FeaturedCollection() {
  return (
    <section className="section collection-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A quieter kind of everyday</span>
          <h2>New & noteworthy</h2>
        </div>
        <Link href="/shop" className="text-link">
          View all pieces <ArrowRight size={16} />
        </Link>
      </div>
      <ProductGrid products={featuredProducts} />
    </section>
  );
}
