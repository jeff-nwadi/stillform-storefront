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
    <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
  </InfoPage>;
}
