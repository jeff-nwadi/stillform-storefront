import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/products/product-card";
import { ShopPageMotion } from "@/components/products/shop-page-motion";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop" };
export default async function Shop({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string; search?: string }> }) {
  const params = await searchParams;
  const category = params.category;
  const search = params.search?.trim() ?? "";
  const searchTerm = search.toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = !category || product.category.toLowerCase().includes(category.toLowerCase());
    const searchableText = `${product.name} ${product.category} ${product.material} ${product.finish} ${product.description}`.toLowerCase();
    return matchesCategory && (!searchTerm || searchableText.includes(searchTerm));
  });
  const shown = params.sort === "new" ? [...filtered].reverse() : filtered;
  const searchSuffix = search ? `&search=${encodeURIComponent(search)}` : "";
  return <ShopPageMotion transitionKey={`${category ?? "all"}:${params.sort ?? "default"}:${search}`}><div className="page-wrap shop-page"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link>{search && <><span>/</span>Search</>}</div><div className="shop-heading"><div><span className="eyebrow">{search ? "Your search" : "Pieces to live with"}</span><h1>{search ? `Results for “${search}”` : "Shop all"}</h1></div><p>Thoughtful forms, natural materials and quiet details for the everyday.</p></div><div className="shop-categories"><Link className={!category && params.sort !== "new" ? "active" : ""} href={search ? `/shop?search=${encodeURIComponent(search)}` : "/shop"}>All pieces <span>{products.length}</span></Link>{categories.map((c) => <Link key={c.name} className={category?.toLowerCase() === c.name.toLowerCase() ? "active" : ""} href={`/shop?category=${encodeURIComponent(c.name.split(" ")[0])}${searchSuffix}`}>{c.name}</Link>)}<Link className={params.sort === "new" ? "active" : ""} href={`/shop?sort=new${searchSuffix}`}>New arrivals</Link></div><div className="results-bar"><span>{search ? `${shown.length} results for “${search}”` : `${shown.length} considered pieces`}</span><span>Thoughtfully made · Made to last</span></div>{shown.length ? <ProductGrid products={shown} /> : <p className="empty-state">No pieces match “{search}”. Try another material, category, or finish.</p>}</div></ShopPageMotion>;
}
