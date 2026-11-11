import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { ProductGrid } from "@/components/products/product-card";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductActions } from "@/components/products/product-actions";
import { formatPrice, getProduct, products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { breadcrumbs, eyebrow, pageWrap, sectionHeading, sectionHeadingLink, sectionHeadingTitle, textLink } from "@/lib/styles";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

function DetailAccordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-[17px] text-[13px] [&::-webkit-details-marker]:hidden">
        {title} <Plus size={16} />
      </summary>
      <p className="mr-[15px] mb-[18px] text-[13px] leading-[1.8] text-[#727b75]">{children}</p>
    </details>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return { title: product?.name ?? "Piece" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <div className={cn(pageWrap, "pb-0")}>
      <div className={breadcrumbs}>
        <Link href="/shop"><ArrowLeft size={14} /> Back to shop</Link>
        <span>/</span>
        {product.category}
      </div>

      <div className="grid grid-cols-[1.05fr_.95fr] gap-[9%] px-[4%] pt-[30px] pb-[90px] max-lg:gap-[5%] max-lg:px-0 max-sm:flex max-sm:flex-col max-sm:gap-0 max-sm:pt-[22px] max-sm:pb-[65px]">
        <ProductImageGallery product={product} />

        <div className="pt-10 pr-[3%] max-sm:pt-[31px] max-sm:pr-0">
          <span className={eyebrow}>{product.category} · {product.material}</span>
          <h1 className="mt-[17px] mb-[13px] font-serif text-[clamp(42px,4.5vw,64px)] leading-[1.02] font-normal tracking-[-.04em] max-sm:text-[38px]">{product.name}</h1>
          <p className="my-[1em] text-[16px]">{formatPrice(product.price)}</p>
          <div className="my-[25px] h-px bg-line" />
          <p className="my-[1em] max-w-[430px] leading-[1.9] text-[#6e7771]">{product.description}</p>
          <p className="mt-[27px] mb-4 text-[12px] text-[#7a827d]">Finish <strong className="mt-[7px] block font-normal text-ink">{product.finish}</strong></p>

          <ProductActions product={product} />
          <div className="border-b border-line pt-4 pb-[25px] text-[12px] text-[#727b75]">Complimentary shipping on orders over $150</div>

          <div>
            <DetailAccordion title="Materials & dimensions">
              Made with {product.material.toLowerCase()}. Each piece is thoughtfully finished
              with subtle variations that make it uniquely yours.
            </DetailAccordion>
            <DetailAccordion title="Delivery & returns">
              Carefully packed and shipped with complimentary delivery on orders over $150.
              Returns accepted within 30 days.
            </DetailAccordion>
            <DetailAccordion title="Care instructions">
              Wipe gently with a soft, dry cloth. Keep away from prolonged direct sunlight and
              excess moisture.
            </DetailAccordion>
          </div>

          <Link href="/our-story" className={cn(textLink, "mt-[25px]")}>
            Our makers & materials <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <section className="px-[7.2%] pt-[30px] pb-[100px] max-sm:px-0 max-sm:pt-[10px] max-sm:pb-[70px]">
        <div className={sectionHeading}>
          <div>
            <span className={eyebrow}>Continue exploring</span>
            <h2 className={sectionHeadingTitle}>You may also like</h2>
          </div>
          <Link href="/shop" className={cn(textLink, sectionHeadingLink)}>
            Shop all <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid products={relatedProducts} />
      </section>
    </div>
  );
}
