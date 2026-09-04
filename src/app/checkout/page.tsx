import type { Metadata } from "next";

import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Contact details, shipping address and order summary.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
