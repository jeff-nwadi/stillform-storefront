import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InfoPage } from "@/components/content/info-page";
import { cn } from "@/lib/utils";
import { eyebrow, textLink } from "@/lib/styles";

type JournalStory = {
  category: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
  href: string;
};

export const metadata: Metadata = { title: "Our journal" };

const stories: JournalStory[] = [
  {
    category: "At home",
    title: "A slower start to the day",
    copy: "Small rituals for mornings that leave a little room to breathe.",
    image: "photo-1600210492486-724fe5c67fb0",
    alt: "A softly lit living room with natural textures",
    href: "/shop?category=Objects",
  },
  {
    category: "Materials",
    title: "The beauty of things made by hand",
    copy: "On the quiet character in a glaze, a grain, and a hand-finished edge.",
    image: "photo-1578749556568-bc2c40e68b61",
    alt: "Hand-finished ceramics in muted colors",
    href: "/shop?category=Tableware",
  },
  {
    category: "Lighting",
    title: "Finding the softer light",
    copy: "A considered glow can change the pace and feeling of a room.",
    image: "photo-1507473885765-e6ed057f782c",
    alt: "A sculptural lamp in a quiet interior",
    href: "/shop?category=Lighting",
  },
];

export default function JournalPage() {
  return (
    <InfoPage
      eyebrow="Notes from our world"
      title="The Stillform journal"
      intro="Thoughts on considered living, the makers behind the details, and the rituals that make a home your own."
    >
      <div className="grid grid-cols-3 gap-[23px] pt-[35px] max-md:grid-cols-[1fr] max-md:gap-[34px] max-md:pt-[25px]">
        {stories.map((story) => (
          <article className="group min-w-0" key={story.title}>
            <Link className="relative mb-5 block aspect-[.9] overflow-hidden bg-[#e2e0d8] max-md:aspect-[1.08]" href={story.href}>
              <Image
                className="[transition:scale_.65s_cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.035]"
                src={`https://images.unsplash.com/${story.image}?auto=format&fit=crop&w=900&q=85`}
                alt={story.alt}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                unoptimized
              />
            </Link>
            <span className={cn(eyebrow, "mb-[11px]")}>{story.category}</span>
            <h2 className="mb-[10px] font-serif text-[28px] leading-[1.1] font-normal max-sm:text-[23px]">{story.title}</h2>
            <p className="min-h-12 text-[13px] max-md:min-h-0">{story.copy}</p>
            <Link href={story.href} className={cn(textLink, "mt-[3px] text-[11px]")}>
              Explore the collection <ArrowUpRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </InfoPage>
  );
}
