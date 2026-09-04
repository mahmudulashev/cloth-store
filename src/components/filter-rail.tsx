"use client";

import { ChevronDownIcon, ChevronRightIcon } from "@/components/icons";
import { CATEGORIES, SIZES, type Category, type Size } from "@/lib/products";

export type Filters = {
  sizes: Size[];
  inStockOnly: boolean;
  outOfStockOnly: boolean;
  categories: Category[];
};

const SECONDARY_SECTIONS = ["Colors", "Price Range", "Collections", "Tags", "Ratings"];

type FilterRailProps = {
  filters: Filters;
  onChange: (next: Filters) => void;
  counts: { available: number; outOfStock: number };
  categoryOpen: boolean;
  onToggleCategory: () => void;
};

export function FilterRail({
  filters,
  onChange,
  counts,
  categoryOpen,
  onToggleCategory,
}: FilterRailProps) {
  const toggleSize = (size: Size) =>
    onChange({
      ...filters,
      sizes: filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size],
    });

  const toggleCategory = (category: Category) =>
    onChange({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    });

  return (
    <aside className="w-full lg:w-[280px] lg:shrink-0">
      <h2 className="text-[18px] leading-[24px] font-medium">Filters</h2>

      {/* Size */}
      <h3 className="mt-[24px] text-[16px] leading-[21px]">Size</h3>
      <div className="mt-[8px] flex flex-wrap gap-[4px]">
        {SIZES.map((size) => {
          const active = filters.sizes.includes(size);
          return (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              aria-pressed={active}
              className={`grid h-[39px] w-[38px] place-items-center rounded-[4px] border text-[14px] transition-colors duration-300 ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 hover:border-ink"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Availability */}
      <div className="mt-[19px] h-px w-full bg-line" />
      <div className="flex items-center justify-between pt-[19px]">
        <h3 className="text-[16px] leading-[21px]">Availability</h3>
        <ChevronDownIcon className="text-ink-40" />
      </div>

      <div className="mt-[16px] flex flex-col gap-[16px]">
        <Checkbox
          checked={filters.inStockOnly}
          onChange={(checked) =>
            onChange({ ...filters, inStockOnly: checked, outOfStockOnly: false })
          }
          label={`Availability (${counts.available})`}
        />
        <Checkbox
          checked={filters.outOfStockOnly}
          onChange={(checked) =>
            onChange({ ...filters, outOfStockOnly: checked, inStockOnly: false })
          }
          label={`Out Of Stock (${counts.outOfStock})`}
        />
      </div>

      <div className="mt-[19px] h-px w-full bg-line" />

      {/* Category */}
      <button
        type="button"
        onClick={onToggleCategory}
        aria-expanded={categoryOpen}
        className="flex w-full items-center justify-between pt-[15px] pb-[15px] text-left"
      >
        <span className="text-[16px] leading-[21px]">Category</span>
        <ChevronRightIcon
          className={`text-ink-40 transition-transform duration-300 ${
            categoryOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-quint)] ${
          categoryOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-[6px] pb-[16px]">
            {CATEGORIES.map((category) => {
              const active = filters.categories.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-pressed={active}
                  className={`rounded-full border px-[12px] py-[5px] text-[12px] transition-colors duration-300 ${
                    active ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-line" />

      {/* Remaining sections mirror the design's collapsed rows */}
      {SECONDARY_SECTIONS.map((section) => (
        <div key={section}>
          <div className="flex items-center justify-between py-[15px]">
            <span className="text-[16px] leading-[21px]">{section}</span>
            <ChevronRightIcon className="text-ink-40" />
          </div>
          <div className="h-px w-full bg-line" />
        </div>
      ))}
    </aside>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-[8px]">
      <span
        className={`grid size-[22px] place-items-center rounded-[4px] border transition-colors duration-300 ${
          checked ? "border-ink bg-ink text-paper" : "border-ink/20"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only"
        />
        {checked && (
          <svg viewBox="0 0 12 10" className="w-[11px]" aria-hidden>
            <path
              d="m1 5 3.2 3.2L11 1.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="text-[14px] leading-[18px]">{label}</span>
    </label>
  );
}
