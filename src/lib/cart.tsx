"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { createPersistedStore } from "@/lib/persisted-store";
import { getProduct, type Product, type Size } from "@/lib/products";

export type CartLine = {
  slug: string;
  size: Size;
  color: string;
  quantity: number;
};

export type ResolvedLine = CartLine & {
  product: Product;
  lineTotal: number;
};

const SHIPPING_FLAT = 10;

const NO_LINES: CartLine[] = [];
const NO_FAVOURITES: string[] = [];

const cartStore = createPersistedStore<CartLine[]>("xiv.cart.v1", NO_LINES);
const favouritesStore = createPersistedStore<string[]>("xiv.favourites.v1", NO_FAVOURITES);

/**
 * The bag and the favourites list. Both live outside React in localStorage and
 * are read through useSyncExternalStore, so every component that calls this
 * hook stays in step without a provider in the tree.
 */
export function useCart() {
  const rawLines = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  const favourites = useSyncExternalStore(
    favouritesStore.subscribe,
    favouritesStore.getSnapshot,
    favouritesStore.getServerSnapshot,
  );

  const add = useCallback((line: CartLine) => {
    cartStore.set((current) => {
      const match = current.findIndex(
        (l) => l.slug === line.slug && l.size === line.size && l.color === line.color,
      );

      if (match === -1) return [...current, line];

      return current.map((existing, index) =>
        index === match
          ? { ...existing, quantity: existing.quantity + line.quantity }
          : existing,
      );
    });
  }, []);

  const setQuantity = useCallback((index: number, quantity: number) => {
    cartStore.set((current) =>
      quantity < 1
        ? current.filter((_, i) => i !== index)
        : current.map((line, i) => (i === index ? { ...line, quantity } : line)),
    );
  }, []);

  const remove = useCallback((index: number) => {
    cartStore.set((current) => current.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => cartStore.set(() => []), []);

  const toggleFavourite = useCallback((slug: string) => {
    favouritesStore.set((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    );
  }, []);

  return useMemo(() => {
    const lines: ResolvedLine[] = rawLines.flatMap((line) => {
      const product = getProduct(line.slug);
      if (!product) return [];
      return [{ ...line, product, lineTotal: product.price * line.quantity }];
    });

    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const shipping = lines.length === 0 ? 0 : SHIPPING_FLAT;

    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      favourites,
      add,
      setQuantity,
      remove,
      clear,
      toggleFavourite,
      isFavourite: (slug: string) => favourites.includes(slug),
    };
  }, [rawLines, favourites, add, setQuantity, remove, clear, toggleFavourite]);
}
