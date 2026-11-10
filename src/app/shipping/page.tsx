import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/content/info-page";

export const metadata: Metadata = { title: "Delivery & returns" };

export default function ShippingPage() {
  return <InfoPage eyebrow="Help & information" title="Delivery & returns" intro="A little more about how your Stillform pieces make their way home." >
    <p className="policy-preview-note">This storefront is currently a preview. Orders and shipping are not yet connected, so no purchase or shipment can be placed from this site.</p>
    <InfoSection title="Delivery"><p>Complimentary shipping is shown for orders over $150. For orders below that amount, shipping costs are intended to be calculated after a delivery address is entered.</p><p>Delivery availability, rates, and estimated dates will be confirmed at checkout once ordering is connected. We’ll share tracking details for dispatched orders.</p></InfoSection>
    <InfoSection title="Returns"><p>The product pages describe a 30-day return window. Final eligibility, return instructions, and any return-shipping costs will be confirmed before orders are accepted.</p><p>If you have a question about an existing order, contact our team through the form on the <Link href="/contact">Contact page</Link>.</p></InfoSection>
    <InfoSection title="Questions"><p>Visit our <Link href="/faq">FAQs</Link> for quick answers, or send us a note through the <Link href="/contact">Contact page</Link>.</p></InfoSection>
  </InfoPage>;
}
