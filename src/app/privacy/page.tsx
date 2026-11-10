import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/content/info-page";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <InfoPage eyebrow="Your information" title="Privacy notice" intro="A plain-language explanation of what this Stillform storefront preview does with information." >
    <p className="policy-preview-note">This page describes the current demo storefront, not a final production privacy policy. Review and update it before collecting customer information or launching live commerce.</p>
    <InfoSection title="Information stored in your browser"><p>Your bag and favorite products are saved in local storage on this device so they remain available when you return. You can clear this information by clearing this site’s browser storage.</p><p>Search terms are used to filter the sample product catalog and appear in the page URL when you view search results.</p></InfoSection>
    <InfoSection title="Forms, accounts, and checkout"><p>The newsletter, contact, account, and checkout forms are interface previews. They do not send their fields to Stillform or a payment provider, and the site does not create an account or place an order.</p></InfoSection>
    <InfoSection title="Product imagery"><p>Product and editorial images are loaded from Unsplash. Your browser requests those image files from Unsplash when the relevant pages load.</p></InfoSection>
    <InfoSection title="Questions"><p>For questions about the preview, use the Contact page. Its form is not connected to a message service yet.</p></InfoSection>
    <p className="info-page-footnote">Last updated November 10, 2026.</p>
  </InfoPage>;
}
