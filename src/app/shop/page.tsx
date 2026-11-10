import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/products/product-card";
import { ShopPageMotion } from "@/components/products/shop-page-motion";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop" };
export default async function Shop({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string }> }) {
  const params = await searchParams;
  const category = params.category;
  const filtered = products.filter((p) => !category || p.category.toLowerCase().includes(category.toLowerCase()));
  const shown = params.sort === "new" ? [...filtered].reverse() : filtered;
  return <ShopPageMotion transitionKey={`${category ?? "all"}:${params.sort ?? "default"}`}><div className="page-wrap shop-page"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span>Shop</div><div className="shop-heading"><div><span className="eyebrow">Pieces to live with</span><h1>Shop all</h1></div><p>Thoughtful forms, natural materials and quiet details for the everyday.</p></div><div className="shop-categories"><Link className={!category && params.sort !== "new" ? "active" : ""} href="/shop">All pieces <span>{products.length}</span></Link>{categories.map((c) => <Link key={c.name} className={category?.toLowerCase() === c.name.toLowerCase() ? "active" : ""} href={`/shop?category=${encodeURIComponent(c.name.split(" ")[0])}`}>{c.name}</Link>)}<Link className={params.sort === "new" ? "active" : ""} href="/shop?sort=new">New arrivals</Link></div><div className="results-bar"><span>{shown.length} considered pieces</span><span>Thoughtfully made · Made to last</span></div>{shown.length ? <ProductGrid products={shown} /> : <p className="empty-state">No pieces found in this collection just yet.</p>}</div></ShopPageMotion>;
}
