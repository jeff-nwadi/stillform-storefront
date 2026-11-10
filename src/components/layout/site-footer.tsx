"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <footer className="site-footer">
      <div className="footer-newsletter">
        <div className="footer-newsletter-copy">
          <p className="eyebrow eyebrow-accent">A note from Stillform</p>
          <h2>Make space for good things.</h2>
          <p>New collections, thoughtful interiors and occasional notes from our world.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
          <Input id="newsletter-email" name="email" type="email" placeholder="Your email address" required autoComplete="email" />
          <Button type="submit" variant="secondary">{subscribed ? "YOU’RE ON THE LIST" : "SIGN UP"}<ArrowRight aria-hidden="true" /></Button>
          <span className="newsletter-status" aria-live="polite">{subscribed ? "Thank you. We’ll be in touch." : ""}</span>
        </form>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark wordmark-light" href="/">STILLFORM</Link>
          <p>Considered homewares for everyday rituals.<br />Thoughtfully chosen, made to live with.</p>
        </div>
        <div className="footer-column"><h3>Explore</h3><Link href="/shop?category=Furniture">Furniture</Link><Link href="/shop?category=Lighting">Lighting</Link><Link href="/shop?category=Objects">Objects &amp; textiles</Link><Link href="/shop?sort=new">New arrivals</Link></div>
        <div className="footer-column"><h3>Help &amp; information</h3><Link href="/shipping">Delivery &amp; returns</Link><Link href="/care">Care guide</Link><Link href="/faq">FAQs</Link><Link href="/contact">Contact us</Link></div>
        <div className="footer-column"><h3>Follow along</h3><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowRight aria-hidden="true" /></a><a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">Pinterest <ArrowRight aria-hidden="true" /></a><Link href="/journal">Our journal</Link></div>
      </div>

      <div className="footer-legal">
        <span>© 2026 Stillform · Designed for everyday living</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><span>United States / USD $</span></div>
      </div>
    </footer>
  );
}
