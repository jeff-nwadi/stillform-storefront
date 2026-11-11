import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/content/info-page";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Using this storefront"
      title="Terms of use"
      intro="These notes describe the current Stillform storefront preview."
    >
      <p className="policy-preview-note">
        This is not a final set of terms for a live store. No orders or payments can currently be
        submitted through this site.
      </p>
      <InfoSection title="A storefront preview">
        <p>
          The site is provided to explore a sample catalog and preview the shopping experience.
          Product descriptions, availability, imagery, prices, and promotional details are
          illustrative and may change before a live launch.
        </p>
      </InfoSection>
      <InfoSection title="Orders and accounts">
        <p>
          The cart and favorites are stored locally in your browser. Account sign-in, order
          placement, delivery booking, and payment processing are not connected. Adding an item to
          the cart does not place an order or reserve inventory.
        </p>
      </InfoSection>
      <InfoSection title="Images and product details">
        <p>
          Product and editorial images are served from Unsplash. Sample product details are
          provided to demonstrate the catalog and may not represent a final item listing.
        </p>
      </InfoSection>
      <InfoSection title="Updates">
        <p>
          These preview notes may be revised as the storefront changes. Final terms and store
          policies should be published before live ordering becomes available.
        </p>
      </InfoSection>
      <p className="info-page-footnote">Last updated November 10, 2026.</p>
    </InfoPage>
  );
}
