import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { HomeHero } from "@/components/home/home-hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { eyebrow, textLink } from "@/lib/styles";

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

      <section className="px-[7.2%] pt-[100px] pb-[98px] text-center max-sm:px-[8%] max-sm:py-[74px]">
        <div className={eyebrow}>Considered living · Est. 2024</div>
        <h2 className="my-5 font-serif text-[clamp(38px,4vw,56px)] leading-[1.04] font-normal tracking-[-.035em] max-sm:text-[34px]">Objects for a life<br /><em className="font-normal text-[#7f8983]">well lived.</em></h2>
        <p className="mx-auto mb-[25px] max-w-[385px] leading-[1.8] text-[#6f7772]">Thoughtful pieces for slower mornings, long dinners and all the little rituals in between.</p>
        <Link href="/our-story" className={cn(textLink, "mt-[6px]")}>
          A little about us <ArrowDownRight size={16} />
        </Link>
      </section>

      <FeaturedCollection />

      <section className="grid min-h-[500px] grid-cols-[1fr_1fr] bg-[#e2e1db] max-sm:grid-cols-[1fr]">
        <div className="bg-[url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85)] bg-cover bg-center max-sm:min-h-[330px]" />
        <div className="flex flex-col items-start justify-center px-[15%] py-[12%] max-lg:p-[12%] max-sm:px-[8%] max-sm:pt-[55px] max-sm:pb-16">
          <span className={eyebrow}>Made to be kept</span>
          <h2 className="my-5 font-serif text-[clamp(45px,5vw,68px)] leading-[1.04] font-normal tracking-[-.035em] max-sm:text-[41px]">Good things<br />take their time.</h2>
          <p className="mb-6 max-w-[360px] leading-[1.8] text-[#66706a]">We partner with independent makers who believe in the beauty of doing one thing, beautifully.</p>
          <Link href="/our-story" className={textLink}>
            Discover our approach <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="px-[7.2%] py-[100px] max-sm:px-[6%] max-sm:py-[70px]">
        <span className={eyebrow}>Find your moment</span>
        <div className="mt-[25px] grid grid-cols-[repeat(3,1fr)] gap-4 max-sm:grid-cols-[1fr] max-sm:gap-3">
          {homeCategories.map((category) => (
            <Link
              className="relative aspect-[.88] overflow-hidden bg-cover bg-center after:absolute after:inset-x-0 after:top-[45%] after:bottom-0 after:bg-[linear-gradient(transparent,#0007)] max-sm:aspect-[1.08]"
              href={category.href}
              key={category.name}
              style={{
                backgroundImage: `url(https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=1000&q=85)`,
              }}
            >
              <span className="absolute right-[22px] bottom-5 left-[22px] z-1 flex items-center justify-between font-serif text-[28px] text-white max-sm:text-[21px]">
                {category.name}
                <ArrowRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#e1e2dc] px-5 pt-[75px] pb-[82px] text-center max-sm:px-[8%] max-sm:py-[59px]">
        <span className={eyebrow}>A note from us</span>
        <h2 className="mt-[15px] mb-[10px] font-serif text-[47px] leading-[1.04] font-normal tracking-[-.035em] max-sm:text-[30px]">Make room for good things.</h2>
        <p className="mx-auto mb-6 text-muted">New arrivals, thoughtful stories and a little inspiration for home.</p>
        <Link href="/shop" className={buttonVariants()}>Explore the collection</Link>
      </section>
    </>
  );
}
