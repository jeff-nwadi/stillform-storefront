import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StoryPageMotion } from "@/components/content/story-page-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { eyebrow, textLink } from "@/lib/styles";

export const metadata: Metadata = { title: "Our story" };

const storyHeading = "my-5 font-serif leading-[1.04] font-normal tracking-[-.035em] max-sm:text-[37px]";
const storyCopy = "text-[16px] leading-[1.9] text-[#4c5851] max-sm:text-[15px]";
const accent = "font-normal text-[#7f8983]";

export default function StoryPage() {
  return (
    <StoryPageMotion>
      <div>
        <section className="relative flex h-[560px] items-center overflow-hidden bg-[#777] px-[10%] text-white after:absolute after:inset-0 after:bg-[linear-gradient(90deg,#121a17f0_0%,#121a17d9_34%,#121a1780_66%,#121a1730_100%),linear-gradient(0deg,#121a174d,transparent_55%)] max-sm:h-[520px] max-sm:px-[8%] max-sm:after:bg-[linear-gradient(90deg,#121a17e8_0%,#121a17b8_65%,#121a1759_100%)]">
          <Image data-story-image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90" alt="Warm daylight across a quiet, thoughtfully furnished home" fill priority sizes="100vw" unoptimized />
          <div className="relative z-1 max-w-[640px]" data-story-reveal>
            <span className={cn(eyebrow, "text-[#e2e0d5]")}>A little about us</span>
            <h1 className="my-6 font-serif text-[clamp(55px,6vw,82px)] leading-[.98] font-normal tracking-[-.045em] text-shadow-[0_2px_20px_#10171445] max-sm:text-[46px]">Less, but<br /><em className={accent}>more meaningful.</em></h1>
            <p className="my-[1em] max-w-[410px] text-[17px] leading-[1.85] text-white text-shadow-[0_1px_8px_#1017145c] max-sm:text-[16px]">We believe the things we live with should make life feel a little more like itself.</p>
          </div>
        </section>
        <section className="px-5 pt-[106px] pb-[110px] text-center max-sm:px-[8%] max-sm:py-[78px]" data-story-reveal>
          <span className={eyebrow}>Our point of view</span>
          <h2 className={cn("text-[56px]", storyHeading)}>A home is never<br />really finished.</h2>
          <p className={cn(storyCopy, "mx-auto mt-[22px] max-w-[600px]")}>It grows with us. It gathers stories, catches the afternoon light, and holds the small rituals that make an ordinary day feel like our own. Stillform began with a simple thought: the objects around us should earn their place.</p>
        </section>
        <section className="grid min-h-[480px] grid-cols-[1fr_1fr] bg-[#e3e3dd] max-sm:grid-cols-[1fr]">
          <div className="bg-[url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1300&q=85)] bg-cover bg-center max-sm:min-h-[340px]" data-story-image />
          <div className="flex flex-col items-start justify-center px-[15%] py-[13%] max-sm:px-[9%] max-sm:pt-[62px] max-sm:pb-[70px]" data-story-reveal>
            <span className={eyebrow}>Thoughtfully chosen</span>
            <h2 className={cn("text-[52px]", storyHeading)}>Made with<br />intention.</h2>
            <p className={cn(storyCopy, "my-[1em] max-w-[470px]")}>We work with independent makers and small workshops who value honest materials, considered forms and the patience to get the details right.</p>
            <p className={cn(storyCopy, "my-[1em] max-w-[470px]")}>Natural materials bring their own character. A grain, a glaze, a softly uneven edge. These are not imperfections to us; they are the marks of something made with care.</p>
            <Link href="/shop" className={textLink}>Find a piece to keep <ArrowRight size={16} /></Link>
          </div>
        </section>
        <section className="px-5 pt-[100px] pb-[110px] text-center max-sm:px-[8%] max-sm:py-[76px]" data-story-reveal>
          <span className={eyebrow}>The Stillform promise</span>
          <h2 className={cn("text-[58px]", storyHeading)}>Good things are<br /><em className={accent}>worth keeping.</em></h2>
          <p className={cn(storyCopy, "mx-auto mb-[25px] max-w-[500px]")}>Buy thoughtfully. Live with it fully. Let it become part of your story.</p>
          <Link href="/shop" className={buttonVariants()}>Explore the collection</Link>
        </section>
      </div>
    </StoryPageMotion>
  );
}
