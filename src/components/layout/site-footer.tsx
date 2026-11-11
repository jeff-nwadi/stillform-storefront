"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { eyebrow } from "@/lib/styles";

const footerColumn = "flex flex-col gap-[11px] text-[12px] text-[#c2c8c3] [&_a]:flex [&_a]:items-center [&_a]:gap-2";
const footerColumnTitle = "mt-[3px] mb-2 text-[11px] font-medium tracking-[.13em] text-white uppercase";

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSubscribed(true);
    form.reset();
  }

  return (
    <footer className="bg-ink px-[7.2%] pt-[58px] text-[#e9eae5] max-sm:px-[6%] max-sm:pt-12">
      <div className="flex items-center justify-between border-b border-[#ffffff30] pb-[46px] max-sm:block max-sm:pb-[30px]">
        <div>
          <p className={cn(eyebrow, "my-[1em] text-[#c3b99e]")}>A note from Stillform</p>
          <h2 className="mt-3 mb-[5px] font-serif text-[34px] font-normal max-sm:text-[24px]">Make space for good things.</h2>
          <p className="text-[13px] text-[#b7bfbb]">New collections, thoughtful interiors and <br /> occasional notes from our world.</p>
        </div>
        <form className="grid w-[min(410px,45%)] grid-cols-[1fr_auto] gap-x-4 max-sm:mt-5 max-sm:w-full max-sm:gap-x-2" onSubmit={handleSubscribe}>
          <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
          <Input id="newsletter-email" name="email" type="email" placeholder="Your email address" required autoComplete="email" />
          <Button className="min-w-32 max-sm:min-w-[100px] max-sm:px-3 max-sm:text-[10px]" type="submit" variant="secondary">{subscribed ? "YOU’RE ON THE LIST" : "SIGN UP"}<ArrowRight aria-hidden="true" /></Button>
          <span className="col-span-full min-h-[18px] pt-[5px] text-[12px] text-[#c6cabc]" aria-live="polite">{subscribed ? "Thank you. We’ll be in touch." : ""}</span>
        </form>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1.2fr_1fr] gap-8 pt-[46px] pb-[55px] max-lg:grid-cols-[1.5fr_1fr_1fr] max-lg:gap-7 max-sm:grid-cols-[1fr_1fr] max-sm:gap-x-[18px] max-sm:gap-y-[30px] max-sm:py-9">
        <div className="max-lg:col-span-full">
          <Link className="justify-self-start text-[17px] font-medium tracking-[.2em] text-white max-sm:text-[15px]" href="/">STILLFORM</Link>
          <p className="my-[1em] text-[13px] leading-[1.8] text-[#abb4af]">Considered homewares for everyday rituals.<br />Thoughtfully chosen, made to live with.</p>
        </div>
        <div className={footerColumn}><h3 className={footerColumnTitle}>Explore</h3><Link href="/shop?category=Furniture">Furniture</Link><Link href="/shop?category=Lighting">Lighting</Link><Link href="/shop?category=Objects">Objects &amp; textiles</Link><Link href="/shop?sort=new">New arrivals</Link></div>
        <div className={footerColumn}><h3 className={footerColumnTitle}>Help &amp; information</h3><Link href="/shipping">Delivery &amp; returns</Link><Link href="/care">Care guide</Link><Link href="/faq">FAQs</Link><Link href="/contact">Contact us</Link></div>
        <div className={footerColumn}><h3 className={footerColumnTitle}>Follow along</h3><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowRight aria-hidden="true" /></a><a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">Pinterest <ArrowRight aria-hidden="true" /></a><Link href="/journal">Our journal</Link></div>
      </div>

      <div className="flex justify-between border-t border-[#ffffff30] pt-[18px] pb-5 text-[11px] text-[#aeb7b2] max-sm:block max-sm:leading-[2.3]">
        <span>© 2026 Stillform · Designed for everyday living</span>
        <div className="flex gap-[21px] max-sm:flex-wrap max-sm:gap-[15px]"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><span>United States / USD $</span></div>
      </div>
    </footer>
  );
}
