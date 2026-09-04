"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ChevronDownIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { PRODUCTS } from "@/lib/products";

/** Best sellers lead, so the grid opens on different pieces than New This Week. */
const ORDERED = [...PRODUCTS].sort(
  (a, b) =>
    Number(b.collections.includes("Best sellers")) -
    Number(a.collections.includes("Best sellers")),
);

const AUDIENCES = ["(All)", "Men", "Women", "Kid"] as const;
type Audience = (typeof AUDIENCES)[number];

const SORTS = [
  { label: "Less to more", value: "asc" },
  { label: "More to Less", value: "desc" },
] as const;
type Sort = (typeof SORTS)[number]["value"];

const PAGE_SIZE = 3;

export function CollectionsSection() {
  const [audience, setAudience] = useState<Audience>("(All)");
  const [sort, setSort] = useState<Sort | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const products = useMemo(() => {
    const filtered =
      audience === "(All)"
        ? ORDERED
        : ORDERED.filter((p) => p.audience.includes(audience as "Men" | "Women" | "Kid"));

    if (!sort) return filtered;

    return [...filtered].sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price,
    );
  }, [audience, sort]);

  return (
    <section className="shell mt-[96px] lg:mt-[136px]">
      <Reveal>
        <h2 className="display max-w-[520px] text-[clamp(40px,6vw,54px)] leading-[0.78]">
          XIV
          <br />
          Collections
          <br />
          23-24
        </h2>
      </Reveal>

      {/* Filter rail */}
      <Reveal delay={80}>
        <div className="mt-[45px] flex flex-wrap items-end justify-between gap-y-6">
          <div className="flex items-center gap-[40px]">
            {AUDIENCES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setAudience(item);
                  setVisible(PAGE_SIZE);
                }}
                className={`text-[16px] leading-[24px] transition-opacity duration-300 ${
                  audience === item ? "opacity-100" : "opacity-45 hover:opacity-80"
                }`}
              >
                {item === "Kid" ? "KID" : item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[60px]">
            <Link
              href="/products"
              className="text-[16px] leading-[24px] transition-opacity hover:opacity-60"
            >
              Filters(+)
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((open) => !open)}
                aria-expanded={sortOpen}
                className="flex items-center gap-2 text-[16px] leading-[24px] transition-opacity hover:opacity-60"
              >
                Sorts({sortOpen ? "-" : "+"})
              </button>

              <div
                className={`absolute right-0 z-10 mt-2 flex w-[140px] flex-col items-end gap-1 transition-[opacity,transform] duration-300 ease-[var(--ease-out-quint)] ${
                  sortOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                {SORTS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSort(sort === option.value ? null : option.value);
                      setSortOpen(false);
                    }}
                    className={`text-[16px] leading-[24px] transition-opacity ${
                      sort === option.value ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-[24px] h-px w-full bg-line" />

      <ul className="mt-[37px] grid grid-cols-2 gap-x-[41px] gap-y-[52px] lg:grid-cols-3">
        {products.slice(0, visible).map((product, index) => (
          <Reveal as="li" key={product.slug} delay={(index % 3) * 90}>
            <ProductCard
              product={product}
              sizes="(min-width: 1024px) 366px, (min-width: 640px) 45vw, 90vw"
            />
          </Reveal>
        ))}
      </ul>

      {visible < products.length && (
        <div className="mt-[78px] flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
            className="group flex flex-col items-center gap-[3px] text-[16px] leading-[24px] transition-opacity hover:opacity-60"
          >
            More
            <ChevronDownIcon className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </section>
  );
}
