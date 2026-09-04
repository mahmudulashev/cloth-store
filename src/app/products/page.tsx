import { Suspense } from "react";
import type { Metadata } from "next";

import { ProductsBrowser } from "@/components/products-browser";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the XIV 23–24 collections by size, category and availability.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="shell pt-[58px]" />}>
      <ProductsBrowser />
    </Suspense>
  );
}
