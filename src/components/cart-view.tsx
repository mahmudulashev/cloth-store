"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { ArrowLongIcon, CloseIcon, HeartIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { QuantityStepper } from "@/components/quantity-stepper";
import { useCart } from "@/lib/cart";
import { photo } from "@/lib/images";
import { formatPrice, getProduct } from "@/lib/products";

type Tab = "bag" | "favourites";

export function CartView() {
  const { lines, favourites, subtotal, shipping, total, setQuantity, remove } = useCart();
  const params = useSearchParams();
  const [tab, setTab] = useState<Tab>(params.get("tab") === "favourites" ? "favourites" : "bag");
  const [agreed, setAgreed] = useState(false);

  const saved = favourites.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [product] : [];
  });

  return (
    <div className="shell pt-[58px]">
      {/* Tabs */}
      <div className="flex items-center gap-[21px]">
        <button
          type="button"
          onClick={() => setTab("bag")}
          className={`text-[24px] leading-[30px] font-medium transition-opacity duration-300 ${
            tab === "bag" ? "opacity-100" : "opacity-35 hover:opacity-70"
          }`}
        >
          Shopping bag
        </button>

        <span className="grid size-[34px] place-items-center rounded-full border border-ink/15">
          <HeartIcon className="size-[17px]" />
        </span>

        <button
          type="button"
          onClick={() => setTab("favourites")}
          className={`text-[24px] leading-[30px] font-medium transition-opacity duration-300 ${
            tab === "favourites" ? "opacity-100" : "opacity-35 hover:opacity-70"
          }`}
        >
          favourites
        </button>
      </div>

      <div className="mt-[18px] h-px w-full bg-line" />

      <div className="mt-[17px] flex flex-col gap-[40px] lg:flex-row lg:gap-[40px]">
        <div className="min-w-0 flex-1">
          {tab === "bag" ? (
            lines.length === 0 ? (
              <EmptyState
                title="Your bag is empty"
                body="Pieces you add will collect here."
              />
            ) : (
              <>
              <ul className="grid grid-cols-1 gap-x-[40px] gap-y-[44px] sm:grid-cols-2">
                {lines.map((line, index) => (
                  <li key={`${line.slug}-${line.size}-${line.color}`}>
                    <div className="flex gap-[15px]">
                      <Link
                        href={`/products/${line.slug}`}
                        className="relative block aspect-[265/314] w-full max-w-[265px] shrink-0 overflow-hidden rounded-[4px] bg-tile"
                      >
                        <Image
                          src={photo(line.product.images[0], { width: 530, height: 628 })}
                          alt={line.product.name}
                          fill
                          sizes="265px"
                          priority={index < 2}
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex flex-col items-center pt-[2px]">
                        <QuantityStepper
                          value={line.quantity}
                          onChange={(next) => setQuantity(index, next)}
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          aria-label={`Remove ${line.product.name}`}
                          className="mt-[16px] grid size-[25px] place-items-center rounded-full border border-ink/15 text-ink-60 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                        >
                          <CloseIcon className="size-[13px]" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-[14px] max-w-[280px]">
                      <p className="text-[14px] leading-[18px] text-ink-60">
                        {line.color} · {line.size}
                      </p>
                      <div className="mt-[3px] flex items-baseline justify-between gap-4">
                        <h3 className="text-[16px] leading-[21px]">{line.product.name}</h3>
                        <p className="shrink-0 text-[16px] leading-[21px]">
                          {formatPrice(line.lineTotal)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-[36px] h-px w-full bg-line" />
              </>
            )
          ) : saved.length === 0 ? (
            <EmptyState
              title="No favourites yet"
              body="Tap the heart on a product to save it here."
            />
          ) : (
            <ul className="grid grid-cols-2 gap-x-[26px] gap-y-[48px] lg:grid-cols-3">
              {saved.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} sizes="(min-width: 1024px) 265px, 45vw" />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Order summary */}
        <aside className="w-full rounded-[8px] bg-paper-2/80 p-[40px] lg:w-[306px] lg:shrink-0 lg:self-start">
          <h2 className="text-[16px] leading-[21px] tracking-[0.02em] uppercase">Order summary</h2>

          <dl className="mt-[22px] flex flex-col gap-[5px] text-[14px] leading-[18px]">
            <div className="flex justify-between">
              <dt className="text-ink-60">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-60">Shipping</dt>
              <dd>{shipping === 0 ? "—" : formatPrice(shipping)}</dd>
            </div>
          </dl>

          <div className="mt-[18px] h-px w-full bg-line" />

          <div className="mt-[16px] flex items-baseline justify-between text-[16px] leading-[24px]">
            <span>Total (Tax incl.)</span>
            <span>{formatPrice(total)}</span>
          </div>

          <label className="mt-[36px] flex cursor-pointer items-start gap-[8px]">
            <span
              className={`mt-[1px] grid size-[17px] shrink-0 place-items-center rounded-[3px] border transition-colors duration-300 ${
                agreed ? "border-ink bg-ink text-paper" : "border-ink/25"
              }`}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="sr-only"
              />
              {agreed && (
                <svg viewBox="0 0 12 10" className="w-[9px]" aria-hidden>
                  <path
                    d="m1 5 3.2 3.2L11 1.4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="text-[13px] leading-[16px] text-ink-60">
              I agree to the Terms and Conditions
            </span>
          </label>

          {agreed && lines.length > 0 ? (
            <Link
              href="/checkout"
              className="group mt-[16px] flex h-[40px] w-full items-center justify-between gap-4 rounded-full border border-ink px-[20px] text-[14px] transition-colors duration-500 hover:bg-ink hover:text-paper"
            >
              Checkout
              <ArrowLongIcon className="w-[40px] shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              title={
                lines.length === 0
                  ? "Add a piece to your bag first"
                  : "Accept the terms to continue"
              }
              className="mt-[16px] flex h-[40px] w-full cursor-not-allowed items-center justify-between gap-4 rounded-full border border-ink/20 px-[20px] text-[14px] text-ink-40"
            >
              Checkout
              <ArrowLongIcon className="w-[40px] shrink-0" />
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="py-[80px]">
      <p className="display text-[clamp(28px,4vw,40px)] leading-[1]">{title}</p>
      <p className="mt-[12px] text-[16px] text-ink-60">{body}</p>
      <Link
        href="/products"
        className="mt-[24px] inline-flex h-[40px] items-center rounded-full border border-ink px-[26px] text-[14px] transition-colors duration-500 hover:bg-ink hover:text-paper"
      >
        Browse the collection
      </Link>
    </div>
  );
}
