import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import { ProductDetail } from "@/components/product-detail";
import { Reveal } from "@/components/reveal";
import { PRODUCTS, getProduct, relatedProducts } from "@/lib/products";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(slug, 4);

  return (
    <div className="shell pt-[58px]">
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="mt-[40px]">
        <ProductDetail product={product} />
      </div>

      <section className="mt-[120px]">
        <h2 className="display text-[clamp(28px,4vw,40px)] leading-[1]">You may also like</h2>

        <ul className="mt-[40px] grid grid-cols-2 gap-x-[26px] gap-y-[48px] lg:grid-cols-4">
          {related.map((item, index) => (
            <Reveal as="li" key={item.slug} delay={index * 80}>
              <ProductCard product={item} />
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
