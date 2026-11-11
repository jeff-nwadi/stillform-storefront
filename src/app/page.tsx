import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { HomeHero } from "@/components/home/home-hero";

const homeCategories = [
  {
    name: "Objects",
    image: "photo-1578749556568-bc2c40e68b61",
    href: "/shop?category=Objects",
  },
  {
    name: "Lighting",
    image: "photo-1507473885765-e6ed057f782c",
    href: "/shop?category=Lighting",
  },
  {
    name: "For the home",
    image: "photo-1600607687939-ce8a6c25118c",
    href: "/shop",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="section intro-section">
        <div className="eyebrow">Considered living · Est. 2024</div>
        <h2>Objects for a life<br /><em>well lived.</em></h2>
        <p>Thoughtful pieces for slower mornings, long dinners and all the little rituals in between.</p>
        <Link href="/our-story" className="text-link ">
          A little about us <ArrowDownRight size={16} />
        </Link>
      </section>

      <FeaturedCollection />

      <section className="feature-story">
        <div className="feature-image" />
        <div className="feature-copy">
          <span className="eyebrow">Made to be kept</span>
          <h2>Good things<br />take their time.</h2>
          <p>We partner with independent makers who believe in the beauty of doing one thing, beautifully.</p>
          <Link href="/our-story" className="text-link">
            Discover our approach <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section category-section">
        <span className="eyebrow">Find your moment</span>
        <div className="category-grid">
          {homeCategories.map((category) => (
            <Link
              className="category-card"
              href={category.href}
              key={category.name}
              style={{
                backgroundImage: `url(https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=1000&q=85)`,
              }}
            >
              <span>
                {category.name}
                <ArrowRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="newsletter-band">
        <span className="eyebrow">A note from us</span>
        <h2>Make room for good things.</h2>
        <p>New arrivals, thoughtful stories and a little inspiration for home.</p>
        <Link href="/shop" className="button button-default">Explore the collection</Link>
      </section>
    </>
  );
}
