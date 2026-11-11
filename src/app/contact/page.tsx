import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/content/contact-form";
import { InfoPage } from "@/components/content/info-page";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="We’d love to hear from you"
      title="Contact"
      intro="Questions about a piece, a material, or the Stillform point of view? Leave us a note."
    >
      <div className="grid grid-cols-[.8fr_1.2fr] gap-[8%] pt-[25px] max-md:grid-cols-[1fr] max-md:gap-[23px] max-md:pt-5">
        <div className="[&_p]:text-[14px]">
          <h2 className="mb-4 font-serif text-[28px] leading-[1.15] font-normal max-sm:text-[21px]">A thoughtful reply, soon.</h2>
          <p>
            Choose a topic and share a few details. Our contact form is a visual preview and is not
            connected to a mail service yet.
          </p>
          <p>
            For quick answers, take a look at the <Link href="/faq">FAQs</Link> or our{" "}
            <Link href="/shipping">delivery information</Link>.
          </p>
        </div>
        <ContactForm />
      </div>
    </InfoPage>
  );
}
