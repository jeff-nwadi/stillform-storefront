"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { animate, createScope, stagger } from "animejs";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-provider";
import { cn } from "@/lib/utils";
import { eyebrow } from "@/lib/styles";
import { products } from "@/lib/products";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "New in", href: "/shop?sort=new" },
  { label: "Objects", href: "/shop?category=Objects" },
  { label: "Our story", href: "/our-story" },
];

const desktopLink =
  "font-serif text-[15px] tracking-[.025em] transition-opacity duration-200 hover:opacity-[.58] max-lg:text-[12px]";
const headerTool =
  "flex items-center gap-[7px] text-[15px] tracking-[.025em] transition-opacity duration-200 hover:opacity-[.58] max-sm:[&_svg]:w-[19px]";
const mobileLink =
  "flex justify-between border-b border-line py-[14px] font-serif text-[22px] will-change-[transform,opacity]";

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
    const icon = headerRef.current?.querySelector<HTMLElement>("[data-menu-icon]");
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
      <div className="flex h-8 items-center justify-center gap-[13px] bg-ink text-[11px] tracking-[.07em] text-[#e9e9e4] max-sm:hidden">
        <span>Complimentary shipping on orders over $150</span>
        <span className="text-[#87908b]">·</span>
        <Link className="flex items-center gap-1" href="/shop">Discover the new collection <ArrowUpRight aria-hidden="true" size={12} /></Link>
      </div>
      {announcementOpen && <div className="fixed inset-0 z-50 hidden items-center justify-center bg-[rgba(19,27,29,.48)] p-6 backdrop-blur-[3px] max-sm:flex" onMouseDown={(event) => { if (event.target === event.currentTarget) dismissAnnouncement(); }}>
        <section className="relative w-[min(380px,100%)] animate-modal-in bg-paper px-[30px] pt-[38px] pb-8 text-center text-ink shadow-[0_24px_70px_#10171440] motion-reduce:animate-none" role="dialog" aria-modal="true" aria-labelledby="announcement-modal-title">
          <button className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center" type="button" aria-label="Close announcement" onClick={dismissAnnouncement}><X size={18} /></button>
          <p className={cn(eyebrow, "my-[1em]")}>A little extra, on us</p>
          <h2 className="mt-[15px] mb-[22px] font-serif text-[30px] leading-[1.12] font-normal max-sm:text-[23px]" id="announcement-modal-title">Complimentary shipping on orders over $150</h2>
          <Link href="/shop" className="inline-flex items-center gap-2 border-b border-[#9ca29d] pb-[5px] text-[11px] tracking-[.06em] uppercase" onClick={dismissAnnouncement}>Discover the new collection <ArrowUpRight aria-hidden="true" size={14} /></Link>
        </section>
      </div>}
      <header className="relative z-5 grid h-[73px] grid-cols-[1fr_2fr_1fr] items-center border-b border-[rgba(30,43,49,.08)] bg-paper px-[5.4%] max-lg:grid-cols-[1fr_1fr_1fr] max-lg:px-[4%] max-sm:h-16 max-sm:grid-cols-[28px_minmax(0,1fr)_auto] max-sm:gap-2 max-sm:px-[5%]" ref={headerRef}>
        <Button
          className="hidden max-sm:-ml-2 max-sm:inline-flex max-sm:size-9 max-sm:min-h-9"
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
          <span className="inline-flex origin-center items-center justify-center will-change-transform" data-menu-icon aria-hidden="true">{menuOpen ? <X /> : <Menu />}</span>
        </Button>

        <Link className="justify-self-start font-serif text-[17px] font-medium tracking-[.2em] max-sm:text-[15px]" href="/" aria-label="Stillform home">STILLFORM</Link>

        <nav className="flex items-center justify-center gap-10 max-lg:gap-[19px] max-sm:hidden" aria-label="Main navigation">
          {links.map((link) => <Link className={desktopLink} key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>

        <div className="flex justify-end gap-[25px] max-sm:gap-3">
          <button className={cn(headerTool, "cursor-pointer")} type="button" aria-label={searchOpen ? "Close search" : "Search products"} aria-expanded={searchOpen} aria-controls="site-search-panel" onClick={() => setSearchOpen((open) => !open)}>{searchOpen ? <X size={18} strokeWidth={1.5} /> : <Search size={18} strokeWidth={1.5} />}<span className="max-sm:hidden">Search</span></button>
          <Link className={cn(headerTool, "max-sm:hidden")} href="/wishlist" aria-label="Wishlist"><Heart size={18} strokeWidth={1.5} /></Link>
          <Link className={cn(headerTool, "max-sm:hidden")} href="/account" aria-label="Your account"><UserRound size={18} strokeWidth={1.5} /><span>Account</span></Link>
          <Link className={headerTool} href="/cart" aria-label={`Shopping bag, ${itemCount} items`}>
            <ShoppingBag size={18} strokeWidth={1.5} /><span className="max-sm:hidden">Bag</span><span className="text-muted">({itemCount})</span>
          </Link>
        </div>

        {searchOpen && <div className="absolute top-full right-[5.4%] z-12 w-[min(470px,90vw)] border border-line bg-ivory p-[15px] shadow-[0_18px_38px_#1e2b3118] max-sm:right-[4%] max-sm:w-[92%]" id="site-search-panel">
          <form action="/shop" method="get" className="grid grid-cols-[20px_1fr_34px] items-center gap-[10px] border-b border-[#aeb5ae] px-[2px] pb-[11px] text-[#778078]">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="site-search-input">Search products</label>
            <input className="h-9 w-full bg-transparent px-[2px] text-[14px] leading-[normal] text-ink outline-none placeholder:text-[#8b938d]" id="site-search-input" ref={searchInput} name="search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setSearchOpen(false); }} placeholder="Search pieces, materials, finishes…" autoComplete="off" />
            <button className="grid size-[34px] cursor-pointer place-items-center bg-ink text-white" type="submit" aria-label="View search results"><ArrowRight size={18} /></button>
          </form>
          {query ? <div className="pt-[7px]" aria-live="polite">
            {suggestions.length ? suggestions.map((product) => <Link className="flex items-center justify-between gap-3 border-b border-[#e3e5e0] px-[3px] py-[11px]" href={`/products/${product.slug}`} key={product.id} onClick={() => setSearchOpen(false)}><span className="flex flex-col gap-[3px]"><strong className="text-[13px] font-medium">{product.name}</strong><small className="text-[11px] text-[#818982]">{product.category} · {product.material}</small></span><ArrowRight size={15} aria-hidden="true" /></Link>) : <p className="mx-[2px] mt-3 mb-[2px] text-[12px] text-[#818982]">No pieces match “{searchQuery.trim()}”.</p>}
            <Link className="mt-[10px] flex items-center justify-between gap-[10px] px-[3px] py-2 text-[12px] text-[#58665d]" href={`/shop?search=${encodeURIComponent(searchQuery.trim())}`} onClick={() => setSearchOpen(false)}>See all results for “{searchQuery.trim()}” <ArrowRight size={14} /></Link>
          </div> : <p className="mx-[2px] mt-3 mb-[2px] text-[12px] text-[#818982]">Try “lighting”, “stoneware”, or “linen”.</p>}
        </div>}

        <nav id="mobile-navigation" className="absolute inset-x-0 top-16 hidden flex-col bg-paper px-[6%] pt-3 pb-[23px] shadow-[0_14px_20px_#1e2b3110] max-sm:flex" aria-label="Mobile navigation" hidden={!menuVisible}>
          {links.map((link) => (
            <Link className={mobileLink} key={link.href} href={link.href} onClick={closeMobileMenu}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          ))}
          <Link className={mobileLink} href="/account" onClick={closeMobileMenu}>Your account<UserRound size={16} aria-hidden="true" /></Link>
          <Link className={mobileLink} href="/wishlist" onClick={closeMobileMenu}>Wishlist<Heart size={16} aria-hidden="true" /></Link>
          <Link className={mobileLink} href="/cart" onClick={closeMobileMenu}>Your bag ({itemCount})<ShoppingBag size={16} aria-hidden="true" /></Link>
        </nav>
      </header>
    </>
  );
}
