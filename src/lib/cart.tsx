"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getProduct, type Product, type Size } from "@/lib/products";

const STORAGE_KEY = "xiv.cart.v1";
const FAVOURITES_KEY = "xiv.favourites.v1";

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

type CartContextValue = {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  favourites: string[];
  add: (line: CartLine) => void;
  setQuantity: (index: number, quantity: number) => void;
  remove: (index: number) => void;
  clear: () => void;
  toggleFavourite: (slug: string) => void;
  isFavourite: (slug: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const SHIPPING_FLAT = 10;

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Restore after mount so server and client markup match on the first paint.
  useEffect(() => {
    setRawLines(readStorage<CartLine[]>(STORAGE_KEY, []));
    setFavourites(readStorage<string[]>(FAVOURITES_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines));
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — the cart
      // still works for the session, it just will not survive a reload.
    }
  }, [rawLines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
    } catch {
      // See above.
    }
  }, [favourites, hydrated]);

  const add = useCallback((line: CartLine) => {
    setRawLines((current) => {
      const match = current.findIndex(
        (l) => l.slug === line.slug && l.size === line.size && l.color === line.color,
      );

      if (match === -1) return [...current, line];

      const next = [...current];
      next[match] = {
        ...next[match],
        quantity: next[match].quantity + line.quantity,
      };
      return next;
    });
  }, []);

  const setQuantity = useCallback((index: number, quantity: number) => {
    setRawLines((current) => {
      if (quantity < 1) return current.filter((_, i) => i !== index);
      return current.map((line, i) => (i === index ? { ...line, quantity } : line));
    });
  }, []);

  const remove = useCallback((index: number) => {
    setRawLines((current) => current.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setRawLines([]), []);

  const toggleFavourite = useCallback((slug: string) => {
    setFavourites((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    );
  }, []);

  const value = useMemo<CartContextValue>(() => {
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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}
