import type { Metadata } from "next";
import { infoFootnote, InfoPage, InfoSection } from "@/components/content/info-page";

export const metadata: Metadata = { title: "Care guide" };

export default function CarePage() {
  return (
    <InfoPage
      eyebrow="A longer life, by design"
      title="Care guide"
      intro="Natural materials settle in with time. A little gentle care helps every piece keep its character."
    >
      <InfoSection title="Wood">
        <p>
          Dust with a soft, dry cloth and wipe spills promptly. Keep wooden pieces away from
          prolonged direct sunlight, standing water, and direct heat. Use coasters beneath warm or
          damp objects.
        </p>
      </InfoSection>
      <InfoSection title="Ceramics & stoneware">
        <p>
          For everyday ceramic pieces, wash with warm water and a mild dish soap, then dry
          thoroughly. Avoid sudden temperature changes and check individual product details before
          using a piece in a microwave or dishwasher.
        </p>
      </InfoSection>
      <InfoSection title="Linen & cotton">
        <p>
          Air pieces regularly. Spot-clean small marks with cool water and a gentle detergent. For a
          full wash, follow the care label and use a low-temperature cycle; line drying helps
          preserve the natural texture.
        </p>
      </InfoSection>
      <InfoSection title="Metal & glass">
        <p>
          Wipe metal finishes with a soft cloth and avoid abrasive pads or harsh cleaners. Clean
          glass with a damp lint-free cloth, then dry to prevent water marks.
        </p>
      </InfoSection>
      <p className={infoFootnote}>
        These are general care notes. Always follow the instructions included with your specific
        piece.
      </p>
    </InfoPage>
  );
}
