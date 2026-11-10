"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-provider";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "New in", href: "/shop?sort=new" },
  { label: "Objects", href: "/shop?category=Objects" },
  { label: "Our story", href: "/our-story" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const itemCount = useCartStore((state) => state.items.reduce((count, item) => count + item.quantity, 0));
  const query = searchQuery.trim().toLowerCase();
  const suggestions = query ? products.filter((product) => `${product.name} ${product.category} ${product.material} ${product.finish} ${product.description}`.toLowerCase().includes(query)).slice(0, 4) : [];

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  return (
    <>
      <div className="announcement-bar">
        <span>Complimentary shipping on orders over $150</span>
        <span className="announcement-divider">·</span>
        <Link href="/shop">Discover the new collection <ArrowUpRight aria-hidden="true" size={12} /></Link>
      </div>
      <header className="site-header">
        <Button
          className="mobile-menu-trigger"
          variant="ghost"
          size="icon"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>

        <Link className="wordmark" href="/" aria-label="Stillform home">STILLFORM</Link>

        <nav className="desktop-navigation" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>

        <div className="header-tools">
          <button className="header-tool search-trigger" type="button" aria-label={searchOpen ? "Close search" : "Search products"} aria-expanded={searchOpen} aria-controls="site-search-panel" onClick={() => setSearchOpen((open) => !open)}>{searchOpen ? <X size={18} strokeWidth={1.5} /> : <Search size={18} strokeWidth={1.5} />}<span>Search</span></button>
          <Link className="header-tool account-header-link" href="/account" aria-label="Your account"><UserRound size={18} strokeWidth={1.5} /><span>Account</span></Link>
          <Link className="header-tool bag-link" href="/cart" aria-label={`Shopping bag, ${itemCount} items`}>
            <ShoppingBag size={18} strokeWidth={1.5} /><span>Bag</span><span className="bag-count">({itemCount})</span>
          </Link>
        </div>

        {searchOpen && <div className="site-search-panel" id="site-search-panel">
          <form action="/shop" method="get" className="site-search-form">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="site-search-input">Search products</label>
            <input id="site-search-input" ref={searchInput} name="search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setSearchOpen(false); }} placeholder="Search pieces, materials, finishes…" autoComplete="off" />
            <button type="submit" aria-label="View search results"><ArrowRight size={18} /></button>
          </form>
          {query ? <div className="site-search-suggestions" aria-live="polite">
            {suggestions.length ? suggestions.map((product) => <Link href={`/products/${product.slug}`} key={product.id} onClick={() => setSearchOpen(false)}><span><strong>{product.name}</strong><small>{product.category} · {product.material}</small></span><ArrowRight size={15} aria-hidden="true" /></Link>) : <p>No pieces match “{searchQuery.trim()}”.</p>}
            <Link className="site-search-all" href={`/shop?search=${encodeURIComponent(searchQuery.trim())}`} onClick={() => setSearchOpen(false)}>See all results for “{searchQuery.trim()}” <ArrowRight size={14} /></Link>
          </div> : <p className="site-search-hint">Try “lighting”, “stoneware”, or “linen”.</p>}
        </div>}

        <nav id="mobile-navigation" className={cn("mobile-navigation", menuOpen && "is-open")} aria-label="Mobile navigation" hidden={!menuOpen}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          ))}
          <Link href="/account" onClick={() => setMenuOpen(false)}>Your account<UserRound size={16} aria-hidden="true" /></Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>Your bag ({itemCount})<ShoppingBag size={16} aria-hidden="true" /></Link>
        </nav>
      </header>
    </>
  );
}
