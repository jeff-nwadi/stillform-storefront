import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/products/product-card";
import { ShopPageMotion } from "@/components/products/shop-page-motion";
import { categories, products } from "@/lib/products";

type ShopSearchParams = {
  category?: string;
  sort?: string;
  search?: string;
};

type ShopPageProps = {
  searchParams: Promise<ShopSearchParams>;
};

export const metadata: Metadata = { title: "Shop" };

function matchesSearch(product: (typeof products)[number], searchTerm: string) {
  if (!searchTerm) return true;

  const searchableText = [
    product.name,
    product.category,
    product.material,
    product.finish,
    product.description,
  ].join(" ").toLowerCase();

  return searchableText.includes(searchTerm);
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const category = params.category?.trim();
  const search = params.search?.trim() ?? "";
  const searchTerm = search.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !category || product.category.toLowerCase().includes(category.toLowerCase());
    return matchesCategory && matchesSearch(product, searchTerm);
  });
  const shownProducts = params.sort === "new" ? [...filteredProducts].reverse() : filteredProducts;
  const searchSuffix = search ? `&search=${encodeURIComponent(search)}` : "";
  const transitionKey = `${category ?? "all"}:${params.sort ?? "default"}:${search}`;

  return (
    <ShopPageMotion transitionKey={transitionKey}>
      <div className="page-wrap shop-page">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          {search && <><span>/</span>Search</>}
        </div>

        <div className="shop-heading">
          <div>
            <span className="eyebrow">{search ? "Your search" : "Pieces to live with"}</span>
            <h1>{search ? `Results for “${search}”` : "Shop all"}</h1>
          </div>
          <p>Thoughtful forms, natural materials and quiet details for the everyday.</p>
        </div>

        <nav className="shop-categories" aria-label="Shop categories">
          <Link
            className={!category && params.sort !== "new" ? "active" : ""}
            href={search ? `/shop?search=${encodeURIComponent(search)}` : "/shop"}
          >
            All pieces <span>{products.length}</span>
          </Link>
          {categories.map((shopCategory) => (
            <Link
              key={shopCategory.name}
              className={category?.toLowerCase() === shopCategory.name.split(" ")[0].toLowerCase() ? "active" : ""}
              href={`/shop?category=${encodeURIComponent(shopCategory.name.split(" ")[0])}${searchSuffix}`}
            >
              {shopCategory.name}
            </Link>
          ))}
          <Link className={params.sort === "new" ? "active" : ""} href={`/shop?sort=new${searchSuffix}`}>
            New arrivals
          </Link>
        </nav>

        <div className="results-bar">
          <span>{search ? `${shownProducts.length} results for “${search}”` : `${shownProducts.length} considered pieces`}</span>
          <span>Thoughtfully made · Made to last</span>
        </div>

        {shownProducts.length > 0 ? (
          <ProductGrid products={shownProducts} />
        ) : (
          <p className="empty-state">No pieces match “{search}”. Try another material, category, or finish.</p>
        )}
      </div>
    </ShopPageMotion>
  );
}
