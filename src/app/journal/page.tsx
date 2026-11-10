import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { InfoPage } from "@/components/content/info-page";

export const metadata: Metadata = { title: "Our journal" };

const stories = [
  { category: "At home", title: "A slower start to the day", copy: "Small rituals for mornings that leave a little room to breathe.", image: "photo-1600210492486-724fe5c67fb0", alt: "A softly lit living room with natural textures", href: "/shop?category=Objects" },
  { category: "Materials", title: "The beauty of things made by hand", copy: "On the quiet character in a glaze, a grain, and a hand-finished edge.", image: "photo-1578749556568-bc2c40e68b61", alt: "Hand-finished ceramics in muted colors", href: "/shop?category=Tableware" },
  { category: "Lighting", title: "Finding the softer light", copy: "A considered glow can change the pace and feeling of a room.", image: "photo-1507473885765-e6ed057f782c", alt: "A sculptural lamp in a quiet interior", href: "/shop?category=Lighting" },
];

export default function JournalPage() {
  return <InfoPage eyebrow="Notes from our world" title="The Stillform journal" intro="Thoughts on considered living, the makers behind the details, and the rituals that make a home your own." >
    <div className="journal-grid">{stories.map((story) => <article className="journal-card" key={story.title}><Link className="journal-image" href={story.href}><Image src={`https://images.unsplash.com/${story.image}?auto=format&fit=crop&w=900&q=85`} alt={story.alt} fill sizes="(max-width: 700px) 100vw, 33vw" unoptimized /></Link><span className="eyebrow">{story.category}</span><h2>{story.title}</h2><p>{story.copy}</p><Link href={story.href} className="text-link">Explore the collection <ArrowUpRight size={15} /></Link></article>)}</div>
  </InfoPage>;
}
