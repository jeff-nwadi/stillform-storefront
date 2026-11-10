import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { getProduct, products, formatPrice } from "@/lib/products";
import { ProductActions } from "@/components/products/product-actions";
import { ProductGrid } from "@/components/products/product-card";

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const p = getProduct((await params).slug); return { title: p?.name ?? "Piece" }; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug); if (!product) notFound();
  return <div className="page-wrap product-page"><div className="breadcrumbs"><Link href="/shop"><ArrowLeft size={14} /> Back to shop</Link><span>/</span>{product.category}</div><div className="product-detail"><div className="product-detail-image"><Image src={product.image} alt={product.alt} fill priority sizes="(max-width: 800px) 100vw, 55vw" unoptimized /></div><div className="product-detail-copy"><span className="eyebrow">{product.category} · {product.material}</span><h1>{product.name}</h1><p className="detail-price">{formatPrice(product.price)}</p><div className="detail-rule" /><p className="detail-description">{product.description}</p><p className="finish-label">Finish <strong>{product.finish}</strong></p><ProductActions product={product} /><div className="delivery-note">Complimentary shipping on orders over $150</div><div className="detail-accordions"><details><summary>Materials & dimensions <Plus size={16} /></summary><p>Made with {product.material.toLowerCase()}. Each piece is thoughtfully finished with subtle variations that make it uniquely yours.</p></details><details><summary>Delivery & returns <Plus size={16} /></summary><p>Carefully packed and shipped with complimentary delivery on orders over $150. Returns accepted within 30 days.</p></details><details><summary>Care instructions <Plus size={16} /></summary><p>Wipe gently with a soft, dry cloth. Keep away from prolonged direct sunlight and excess moisture.</p></details></div><Link href="/our-story" className="text-link maker-link">Our makers & materials <ArrowRight size={16} /></Link></div></div><section className="section related-section"><div className="section-heading"><div><span className="eyebrow">Continue exploring</span><h2>You may also like</h2></div><Link href="/shop" className="text-link">Shop all <ArrowRight size={16} /></Link></div><ProductGrid products={products.filter((p) => p.id !== product.id).slice(0, 4)} /></section></div>;
}
