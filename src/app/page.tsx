import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/home/home-hero";
import { ProductGrid } from "@/components/products/product-card";
import { products } from "@/lib/products";

export default function Home() {
  return <>
    <HomeHero />
    <section className="section intro-section">
      <div className="eyebrow">Considered living · Est. 2024</div>
      <h2>Objects for a life<br /><em>well lived.</em></h2>
      <p>Thoughtful pieces for slower mornings, long dinners and all the little rituals in between.</p>
      <Link href="/our-story" className="text-link">A little about us <ArrowDownRight size={16} /></Link>
    </section>
    <section className="section collection-section">
      <div className="section-heading"><div><span className="eyebrow">A quieter kind of everyday</span><h2>New & noteworthy</h2></div><Link href="/shop" className="text-link">View all pieces <ArrowRight size={16} /></Link></div>
      <ProductGrid products={products.slice(0, 4)} />
    </section>
    <section className="feature-story">
      <div className="feature-image" />
      <div className="feature-copy"><span className="eyebrow">Made to be kept</span><h2>Good things<br />take their time.</h2><p>We partner with independent makers who believe in the beauty of doing one thing, beautifully.</p><Link href="/our-story" className="text-link">Discover our approach <ArrowRight size={16} /></Link></div>
    </section>
    <section className="section category-section"><span className="eyebrow">Find your moment</span><div className="category-grid">
      {[{ name: "Objects", image: "photo-1578749556568-bc2c40e68b61", href: "/shop?category=Objects" }, { name: "Lighting", image: "photo-1507473885765-e6ed057f782c", href: "/shop?category=Lighting" }, { name: "For the home", image: "photo-1600607687939-ce8a6c25118c", href: "/shop?category=Home" }].map((c) => <Link className="category-card" href={c.href} key={c.name} style={{ backgroundImage: `url(https://images.unsplash.com/${c.image}?auto=format&fit=crop&w=1000&q=85)` }}><span>{c.name}<ArrowRight size={17} /></span></Link>)}
    </div></section>
    <section className="newsletter-band"><span className="eyebrow">A note from us</span><h2>Make room for good things.</h2><p>New arrivals, thoughtful stories and a little inspiration for home.</p><Link href="/shop" className="button button-default">Explore the collection</Link></section>
  </>;
}
