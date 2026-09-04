import { Suspense } from "react";
import type { Metadata } from "next";

import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Shopping bag",
  description: "Review the pieces in your bag before checkout.",
};

export default function CartPage() {
  return (
    <Suspense fallback={<div className="shell pt-[58px]" />}>
      <CartView />
    </Suspense>
  );
}
