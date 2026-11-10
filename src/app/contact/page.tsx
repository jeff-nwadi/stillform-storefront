import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/content/info-page";
import { ContactForm } from "@/components/content/contact-form";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return <InfoPage eyebrow="We’d love to hear from you" title="Contact" intro="Questions about a piece, a material, or the Stillform point of view? Leave us a note." >
    <div className="contact-layout"><div className="contact-copy"><h2>A thoughtful reply, soon.</h2><p>Choose a topic and share a few details. Our contact form is a visual preview and is not connected to a mail service yet.</p><p>For quick answers, take a look at the <Link href="/faq">FAQs</Link> or our <Link href="/shipping">delivery information</Link>.</p></div><ContactForm /></div>
  </InfoPage>;
}
