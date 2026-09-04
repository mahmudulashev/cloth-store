import type { Metadata } from "next";

import { EditorialPage } from "@/components/editorial-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "XIV is a small ready-to-wear label working in natural fibres, with two collections a year.",
};

export default function AboutPage() {
  return (
    <EditorialPage
      title="About XIV"
      intro="A small ready-to-wear label working in natural fibres, with two collections a year and no mid-season churn."
      sections={[
        {
          heading: "The approach",
          body: [
            "We blend creativity with craftsmanship to make clothes that outlast a trend cycle. Every pattern is cut to a fit block we have refined over fourteen seasons, which is where the name comes from.",
            "Nothing ships until it has been worn, washed and worn again by the people who drew it.",
          ],
        },
        {
          heading: "Materials",
          body: [
            "Long-staple combed cotton, 12oz rigid denim, washed linen, extra-fine merino and a wool-cashmere blend for outerwear. No blended synthetics in the main line.",
            "Colour is achieved by garment dyeing wherever the fabric allows, which gives depth up front and softens the piece before it reaches you.",
          ],
        },
        {
          heading: "Making",
          body: [
            "Cut and sewn across two family-run factories, both audited annually. Runs are deliberately short: when a size sells through, it sells through.",
          ],
        },
      ]}
    />
  );
}
