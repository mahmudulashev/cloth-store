"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { FilterRail, type Filters } from "@/components/filter-rail";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SearchField } from "@/components/search-field";
import {
  CATEGORIES,
  COLLECTIONS,
  PRODUCTS,
  type Category,
  type Collection,
} from "@/lib/products";

/** The chip row in the design: the two collections followed by every category. */
const CHIPS: (Collection | Category)[] = [...COLLECTIONS, ...CATEGORIES];

export function ProductsBrowser() {
  const router = useRouter();
  const params = useSearchParams();

  const query = params.get("q")?.toLowerCase() ?? "";
  const activeChip = params.get("collection") ?? params.get("category");

  const [filters, setFilters] = useState<Filters>({
    sizes: [],
    inStockOnly: false,
    outOfStockOnly: false,
    categories: [],
  });
  const [categoryOpen, setCategoryOpen] = useState(true);

  const counts = useMemo(
    () => ({
      available: PRODUCTS.filter((p) => p.inStock).length,
      outOfStock: PRODUCTS.filter((p) => !p.inStock).length,
    }),
    [],
  );

  const results = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (query) {
        const haystack = [product.name, product.family, product.category, ...product.tags]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      if (activeChip) {
        const isCollection = (COLLECTIONS as readonly string[]).includes(activeChip);
        if (isCollection) {
          if (!product.collections.includes(activeChip as Collection)) return false;
        } else if (product.category !== activeChip) {
          return false;
        }
      }

      if (filters.sizes.length && !filters.sizes.some((s) => product.sizes.includes(s))) {
        return false;
      }
      if (filters.categories.length && !filters.categories.includes(product.category)) {
        return false;
      }
      if (filters.inStockOnly && !product.inStock) return false;
      if (filters.outOfStockOnly && product.inStock) return false;

      return true;
    });
  }, [query, activeChip, filters]);

  const selectChip = (chip: string) => {
    if (activeChip === chip) {
      router.push("/products");
      return;
    }
    const key = (COLLECTIONS as readonly string[]).includes(chip) ? "collection" : "category";
    router.push(`/products?${key}=${encodeURIComponent(chip)}`);
  };

  return (
    <div className="shell pt-[58px]">
      <div className="lg:pl-[305px]">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Products" }]} title="Products" />
      </div>

      <div className="mt-[25px] flex flex-col gap-[40px] lg:flex-row lg:gap-[25px]">
        <FilterRail
          filters={filters}
          onChange={setFilters}
          counts={counts}
          categoryOpen={categoryOpen}
          onToggleCategory={() => setCategoryOpen((open) => !open)}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-[16px] xl:flex-row xl:items-start xl:gap-[40px]">
            <SearchField className="w-full xl:w-[367px] xl:shrink-0" />

            <div className="grid flex-1 grid-cols-2 gap-[14px] sm:grid-cols-3 xl:grid-cols-5">
              {CHIPS.map((chip) => {
                const active = activeChip === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => selectChip(chip)}
                    aria-pressed={active}
                    className={`h-[24px] rounded-full border text-[12px] leading-[15px] transition-colors duration-300 ${
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/15 hover:border-ink"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          {results.length === 0 ? (
            <p className="mt-[80px] text-[16px] text-ink-60">
              Nothing matches that yet. Try clearing a filter.
            </p>
          ) : (
            <ul className="mt-[40px] grid grid-cols-2 gap-x-[40px] gap-y-[52px] lg:grid-cols-3">
              {results.map((product, index) => (
                <Reveal as="li" key={product.slug} delay={(index % 3) * 80}>
                  <ProductCard
                    product={product}
                    sizes="(min-width: 1024px) 265px, 45vw"
                    priority={index < 3}
                  />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
