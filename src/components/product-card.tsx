"use client";

import Image from "next/image";
import Link from "next/link";

import { PlusIcon } from "@/components/icons";
import { useCart } from "@/lib/cart";
import { photo } from "@/lib/images";
import { formatPrice, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  /** Rendered width of the image tile, used to size the CDN request. */
  sizes?: string;
  priority?: boolean;
};

export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 305px, (min-width: 640px) 45vw, 90vw",
  priority = false,
}: ProductCardProps) {
  const { add } = useCart();
  const [swatch, ...rest] = product.colors;

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[4px] bg-tile">
          <div className="relative aspect-[305/313]">
            <Image
              src={photo(product.images[0], { width: 620, height: 636 })}
              alt={product.name}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]"
            />
          </div>

          {/* Secondary shot cross-fades in on hover */}
          {product.images[1] && (
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <Image
                src={photo(product.images[1], { width: 620, height: 636 })}
                alt=""
                fill
                sizes={sizes}
                className="object-cover"
              />
            </div>
          )}

          {!product.inStock && (
            <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-[10px] tracking-[0.12em] uppercase">
              Sold out
            </span>
          )}

          <button
            type="button"
            aria-label={`Add ${product.name} to bag`}
            onClick={(event) => {
              event.preventDefault();
              add({
                slug: product.slug,
                size: product.sizes[Math.floor(product.sizes.length / 2)],
                color: product.colors[0].name,
                quantity: 1,
              });
            }}
            className="absolute bottom-0 left-1/2 grid size-[34px] -translate-x-1/2 place-items-center rounded-full bg-paper text-ink shadow-[0_1px_12px_rgba(10,10,10,0.14)] transition-[transform,background-color,color] duration-500 ease-[var(--ease-out-quint)] hover:bg-ink hover:text-paper group-hover:-translate-y-3"
          >
            <PlusIcon className="size-4" />
          </button>
        </div>

        <div className="mt-[14px] flex items-center justify-between gap-3">
          <p className="text-[14px] leading-[18px] text-ink-60">{product.family}</p>

          <div className="flex shrink-0 items-center gap-[2px]">
            <span
              className="size-[12px] rounded-[3px] ring-1 ring-ink/10"
              style={{ backgroundColor: swatch.hex }}
              aria-hidden
            />
            {rest.length > 0 && (
              <span className="text-[12px] leading-[15px] text-ink-60">+{rest.length}</span>
            )}
          </div>
        </div>

        <div className="mt-[3px] flex items-baseline justify-between gap-4">
          <h3 className="text-[16px] leading-[21px]">{product.name}</h3>
          <p className="shrink-0 text-[16px] leading-[21px]">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
