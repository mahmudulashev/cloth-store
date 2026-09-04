"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { CloseIcon, SearchIcon } from "@/components/icons";
import { photo } from "@/lib/images";
import { PRODUCTS, formatPrice } from "@/lib/products";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    return PRODUCTS.filter((product) =>
      [product.name, product.family, product.category, ...product.tags]
        .join(" ")
        .toLowerCase()
        .includes(term),
    ).slice(0, 5);
  }, [query]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    router.push(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      inert={!open}
      className={`fixed inset-0 z-50 transition-opacity duration-400 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
        aria-hidden
      />

      <div
        className={`absolute inset-x-0 top-0 bg-paper px-5 pt-[26px] pb-[34px] transition-transform duration-500 ease-[var(--ease-out-quint)] md:px-[50px] ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="flex items-center gap-4">
            <form onSubmit={submit} className="flex flex-1 items-center gap-3 border-b border-ink/20 pb-3">
              <SearchIcon className="shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for a piece, a fabric, a category…"
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent text-[clamp(18px,3vw,28px)] outline-none placeholder:text-ink-40"
              />
            </form>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="grid size-[44px] shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
            >
              <CloseIcon />
            </button>
          </div>

          {query.trim() && (
            <div className="mt-[24px]">
              {results.length === 0 ? (
                <p className="text-[14px] text-ink-60">No pieces match “{query.trim()}”.</p>
              ) : (
                <ul className="flex flex-col gap-[14px]">
                  {results.map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-[16px]"
                      >
                        <div className="relative size-[56px] shrink-0 overflow-hidden rounded-[4px] bg-tile">
                          <Image
                            src={photo(product.images[0], { width: 112, height: 112 })}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] text-ink-60">{product.family}</p>
                          <p className="text-[15px] transition-opacity group-hover:opacity-60">
                            {product.name}
                          </p>
                        </div>

                        <p className="shrink-0 text-[15px]">{formatPrice(product.price)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
