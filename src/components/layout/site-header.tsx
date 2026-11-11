"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { animate, createScope, stagger } from "animejs";
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
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuAnimationScope = useRef<ReturnType<typeof createScope> | null>(null);
  const previousMenuOpen = useRef(false);
  const itemCount = useCartStore((state) => state.items.reduce((count, item) => count + item.quantity, 0));
  const query = searchQuery.trim().toLowerCase();
  const suggestions = query ? products.filter((product) => `${product.name} ${product.category} ${product.material} ${product.finish} ${product.description}`.toLowerCase().includes(query)).slice(0, 4) : [];

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    menuAnimationScope.current?.revert();
    if (previousMenuOpen.current === menuOpen) return;
    previousMenuOpen.current = menuOpen;
    const navigation = headerRef.current?.querySelector<HTMLElement>("#mobile-navigation");
    const icon = headerRef.current?.querySelector<HTMLElement>(".mobile-menu-icon");
    if (!navigation || !icon) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    menuAnimationScope.current = createScope({ root: headerRef }).add(() => {
      animate(icon, {
        rotate: menuOpen ? [-90, 0] : [90, 0],
        scale: [0.82, 1],
        duration: 360,
        ease: "out(3)",
      });

      if (menuOpen) {
        animate(navigation, { opacity: [0, 1], y: [-14, 0], duration: 420, ease: "out(3)" });
        animate(navigation.querySelectorAll("a"), {
          opacity: [0, 1],
          x: [-10, 0],
          delay: stagger(45),
          duration: 320,
          ease: "out(3)",
        });
      } else {
        animate(navigation, {
          opacity: [1, 0],
          y: [0, -12],
          duration: 240,
          ease: "in(2)",
          onComplete: () => setMenuVisible(false),
        });
      }
    });

    return () => menuAnimationScope.current?.revert();
  }, [menuOpen]);

  useEffect(() => {
    const dismissedKey = "stillform-mobile-announcement-dismissed";
    const media = window.matchMedia("(max-width: 640px)");
    const syncAnnouncement = () => {
      setAnnouncementOpen(media.matches && window.sessionStorage.getItem(dismissedKey) !== "true");
    };
    syncAnnouncement();
    media.addEventListener("change", syncAnnouncement);
    return () => media.removeEventListener("change", syncAnnouncement);
  }, []);

  useEffect(() => {
    if (!announcementOpen) return;
    const previousOverflow = document.body.style.overflow;
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.sessionStorage.setItem("stillform-mobile-announcement-dismissed", "true");
        setAnnouncementOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", dismissOnEscape);
    };
  }, [announcementOpen]);

  function dismissAnnouncement() {
    window.sessionStorage.setItem("stillform-mobile-announcement-dismissed", "true");
    setAnnouncementOpen(false);
  }

  function closeMobileMenu() {
    setMenuOpen(false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMenuVisible(false);
  }

  return (
    <>
      <div className="announcement-bar">
        <span>Complimentary shipping on orders over $150</span>
        <span className="announcement-divider">·</span>
        <Link href="/shop">Discover the new collection <ArrowUpRight aria-hidden="true" size={12} /></Link>
      </div>
      {announcementOpen && <div className="announcement-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) dismissAnnouncement(); }}>
        <section className="announcement-modal" role="dialog" aria-modal="true" aria-labelledby="announcement-modal-title">
          <button className="announcement-modal-close" type="button" aria-label="Close announcement" onClick={dismissAnnouncement}><X size={18} /></button>
          <p className="eyebrow">A little extra, on us</p>
          <h2 id="announcement-modal-title">Complimentary shipping on orders over $150</h2>
          <Link href="/shop" className="announcement-modal-link" onClick={dismissAnnouncement}>Discover the new collection <ArrowUpRight aria-hidden="true" size={14} /></Link>
        </section>
      </div>}
      <header className="site-header" ref={headerRef}>
        <Button
          className="mobile-menu-trigger"
          variant="ghost"
          size="icon"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            if (menuOpen) closeMobileMenu();
            else {
              setMenuVisible(true);
              setMenuOpen(true);
            }
          }}
        >
          <span className="mobile-menu-icon" aria-hidden="true">{menuOpen ? <X /> : <Menu />}</span>
        </Button>

        <Link className="wordmark" href="/" aria-label="Stillform home">STILLFORM</Link>

        <nav className="desktop-navigation" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>

        <div className="header-tools">
          <button className="header-tool search-trigger" type="button" aria-label={searchOpen ? "Close search" : "Search products"} aria-expanded={searchOpen} aria-controls="site-search-panel" onClick={() => setSearchOpen((open) => !open)}>{searchOpen ? <X size={18} strokeWidth={1.5} /> : <Search size={18} strokeWidth={1.5} />}<span>Search</span></button>
          <Link className="header-tool wishlist-header-link" href="/wishlist" aria-label="Wishlist"><Heart size={18} strokeWidth={1.5} /></Link>
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

        <nav id="mobile-navigation" className={cn("mobile-navigation", menuOpen && "is-open")} aria-label="Mobile navigation" hidden={!menuVisible}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMobileMenu}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          ))}
          <Link href="/account" onClick={closeMobileMenu}>Your account<UserRound size={16} aria-hidden="true" /></Link>
          <Link href="/wishlist" onClick={closeMobileMenu}>Wishlist<Heart size={16} aria-hidden="true" /></Link>
          <Link href="/cart" onClick={closeMobileMenu}>Your bag ({itemCount})<ShoppingBag size={16} aria-hidden="true" /></Link>
        </nav>
      </header>
    </>
  );
}
