import type { Metadata } from "next";
import { InfoPage } from "@/components/content/info-page";

export const metadata: Metadata = { title: "FAQs" };

const questions = [
  ["Can I place an order here?", "This storefront is currently a frontend preview. You can explore the catalog and try the cart, but account access, payment, and order placement are not connected yet."],
  ["How much is delivery?", "The storefront shows complimentary shipping on orders over $150. Other delivery rates and dates would be calculated after you enter an address at checkout."],
  ["What is your return window?", "Product details currently describe a 30-day return window. Final conditions and return instructions will be confirmed before orders are accepted."],
  ["How should I care for my pieces?", "Care depends on the material. Visit the Care guide for general notes and check the product details for piece-specific instructions."],
  ["Are the items handmade?", "The sample collection describes a mix of natural materials and considered finishes. Catalog information is sample content and may change before a live launch."],
  ["How can I contact Stillform?", "Use the Contact page to prepare a message. The form is a preview and does not send messages yet."],
];

export default function FaqPage() {
  return <InfoPage eyebrow="Here to help" title="Frequently asked questions" intro="A few useful details about the collection, delivery, and this storefront." >
    <div className="mt-4 border-t border-line">
      {questions.map(([question, answer]) => (
        <details className="group border-b border-line" key={question}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-[2px] py-5 font-serif text-[22px] leading-[1.25] font-normal max-md:px-0 max-md:py-[17px] max-md:text-[19px] max-sm:text-[16px] [&::-webkit-details-marker]:hidden">
            {question}
            <span className="font-sans text-[22px] leading-[normal] text-[#7d867f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="mb-0! max-w-[680px] pr-[30px] pb-[21px] pl-[2px]">{answer}</p>
        </details>
      ))}
    </div>
  </InfoPage>;
}
