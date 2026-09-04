import type { Metadata } from "next";

import { EditorialPage } from "@/components/editorial-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this storefront stores, where it stores it, and what it does not collect.",
};

export default function PrivacyPage() {
  return (
    <EditorialPage
      title="Privacy"
      intro="This storefront is a portfolio build. It keeps as little as possible, and none of it leaves your browser."
      sections={[
        {
          heading: "What is stored",
          body: [
            "Your bag and your saved pieces are held in your browser's local storage under the keys xiv.cart.v1 and xiv.favourites.v1. They stay on the device you used and are never sent to a server.",
            "Clearing your browser's site data removes them completely.",
          ],
        },
        {
          heading: "What is not collected",
          body: [
            "No account, no analytics, no advertising identifiers, and no payment details. The checkout flow validates and steps through its fields but takes no money and stores nothing.",
          ],
        },
        {
          heading: "Third parties",
          body: [
            "Product photography is requested from the Unsplash image CDN as you browse, which means Unsplash receives the standard request information any image host would. Hosting is provided by Vercel.",
          ],
        },
      ]}
    />
  );
}
