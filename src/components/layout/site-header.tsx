"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-provider";
import { cn } from "@/lib/utils";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "New in", href: "/shop?sort=new" },
  { label: "Objects", href: "/shop?category=Objects" },
  { label: "Our story", href: "/our-story" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.items.reduce((count, item) => count + item.quantity, 0));

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
          <Link className="header-tool" href="/shop" aria-label="Search products"><Search size={18} strokeWidth={1.5} /><span>Search</span></Link>
          <Link className="header-tool bag-link" href="/cart" aria-label={`Shopping bag, ${itemCount} items`}>
            <ShoppingBag size={18} strokeWidth={1.5} /><span>Bag</span><span className="bag-count">({itemCount})</span>
          </Link>
        </div>

        <nav id="mobile-navigation" className={cn("mobile-navigation", menuOpen && "is-open")} aria-label="Mobile navigation" hidden={!menuOpen}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          ))}
          <Link href="/cart" onClick={() => setMenuOpen(false)}>Your bag ({itemCount})<ShoppingBag size={16} aria-hidden="true" /></Link>
        </nav>
      </header>
    </>
  );
}
