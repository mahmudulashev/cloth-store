import type { Metadata } from "next";

import { EditorialPage } from "@/components/editorial-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms this demonstration storefront operates under.",
};

export default function TermsPage() {
  return (
    <EditorialPage
      title="Terms"
      intro="Plain terms for a storefront that demonstrates a shopping flow rather than running one."
      sections={[
        {
          heading: "Nature of this site",
          body: [
            "XIV is a portfolio project. The catalogue, prices, stock levels and studio details are illustrative. Placing an order creates no contract and no goods will be dispatched.",
          ],
        },
        {
          heading: "Payment",
          body: [
            "No payment is processed at any point. The checkout does not ask for card details and no payment provider is connected.",
          ],
        },
        {
          heading: "Imagery and copy",
          body: [
            "Photography is served from Unsplash under the Unsplash licence and remains the property of the photographers. The interface is an original implementation of a publicly shared design concept.",
          ],
        },
        {
          heading: "Availability",
          body: [
            "The site is provided as is, without warranty, and may change or go offline at any time.",
          ],
        },
      ]}
    />
  );
}
