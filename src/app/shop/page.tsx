import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/products/product-card";
import { ShopPageMotion } from "@/components/products/shop-page-motion";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { breadcrumbs, eyebrow, pageWrap } from "@/lib/styles";

type ShopSearchParams = {
  category?: string;
  sort?: string;
  search?: string;
};

type ShopPageProps = {
  searchParams: Promise<ShopSearchParams>;
};

export const metadata: Metadata = { title: "Shop" };

const categoryLink = "pb-[14px] text-[12px] text-[#787f7a]";
const activeCategoryLink = "border-b border-ink text-ink";

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
  const allActive = !category && params.sort !== "new";
  const newActive = params.sort === "new";
  const transitionKey = `${category ?? "all"}:${params.sort ?? "default"}:${search}`;

  return (
    <ShopPageMotion transitionKey={transitionKey}>
      <div className={pageWrap}>
        <div className={breadcrumbs}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          {search && <><span>/</span>Search</>}
        </div>

        <div className="flex items-end justify-between pt-14 pb-[38px] max-sm:block max-sm:pt-[43px] max-sm:pb-[27px]">
          <div>
            <span className={eyebrow}>{search ? "Your search" : "Pieces to live with"}</span>
            <h1 className="mt-[14px] font-serif text-[clamp(48px,5vw,68px)] leading-none font-normal tracking-[-.04em] max-sm:text-[42px]">{search ? `Results for “${search}”` : "Shop all"}</h1>
          </div>
          <p className="mb-[5px] max-w-[310px] text-[16px] leading-[1.8] text-muted max-sm:mt-[17px] max-sm:text-[14px]">Thoughtful forms, natural materials and quiet details for the everyday.</p>
        </div>

        <nav className="flex items-center gap-7 overflow-auto border-b border-line whitespace-nowrap max-sm:gap-[22px]" aria-label="Shop categories" data-shop-categories>
          <Link
            className={cn(categoryLink, allActive && activeCategoryLink)}
            data-active={allActive || undefined}
            href={search ? `/shop?search=${encodeURIComponent(search)}` : "/shop"}
          >
            All pieces <span className="ml-1 text-[11px] text-[#949a94]">{products.length}</span>
          </Link>
          {categories.map((shopCategory) => {
            const slug = shopCategory.name.split(" ")[0];
            const active = category?.toLowerCase() === slug.toLowerCase();

            return (
              <Link
                key={shopCategory.name}
                className={cn(categoryLink, active && activeCategoryLink)}
                data-active={active || undefined}
                href={`/shop?category=${encodeURIComponent(slug)}${searchSuffix}`}
              >
                {shopCategory.name}
              </Link>
            );
          })}
          <Link
            className={cn(categoryLink, newActive && activeCategoryLink)}
            data-active={newActive || undefined}
            href={`/shop?sort=new${searchSuffix}`}
          >
            New arrivals
          </Link>
        </nav>

        <div className="flex justify-between py-5 text-[11px] tracking-[.04em] text-[#848b85] max-sm:text-[10px]" data-results-bar>
          <span>{search ? `${shownProducts.length} results for “${search}”` : `${shownProducts.length} considered pieces`}</span>
          <span>Thoughtfully made · Made to last</span>
        </div>

        {shownProducts.length > 0 ? (
          <ProductGrid
            className="gap-y-[35px] max-lg:gap-y-[35px] max-sm:gap-y-[25px] max-sm:[&_[data-quick-add]]:text-[9px]"
            products={shownProducts}
          />
        ) : (
          <p className="my-[1em] py-20 text-center text-muted">No pieces match “{search}”. Try another material, category, or finish.</p>
        )}
      </div>
    </ShopPageMotion>
  );
}
