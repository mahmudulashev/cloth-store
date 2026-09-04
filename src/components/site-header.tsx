"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BagIcon,
  BrandMark,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/products" },
  { label: "New", href: "/products?collection=New" },
];

const circle =
  "grid size-[50px] place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper";

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-500 ${
          scrolled
            ? "bg-paper/80 shadow-[0_1px_0_rgba(10,10,10,0.07)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div
          className={`shell relative flex items-center transition-[height,padding] duration-500 ${
            scrolled ? "h-[68px]" : "h-[76px] md:h-[100px] md:pt-[50px]"
          }`}
        >
          {/* Left: menu trigger + primary nav */}
          <div className="flex items-center gap-[36px]">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="text-ink transition-opacity hover:opacity-60"
            >
              <MenuIcon />
            </button>

            <nav className="hidden items-center gap-8 lg:flex">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative text-[16px] leading-6 text-ink transition-opacity hover:opacity-60"
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-ink" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centre: brand mark */}
          <Link
            href="/"
            aria-label="XIV — home"
            className="absolute left-1/2 hidden -translate-x-1/2 text-ink transition-transform duration-500 hover:rotate-90 md:block"
          >
            <BrandMark className="size-[42px]" />
          </Link>

          {/* Right: utilities */}
          <div className="ml-auto flex items-center gap-[10px]">
            <Link href="/products" aria-label="Search" className={`${circle} mr-[24px] hidden sm:grid`}>
              <SearchIcon />
            </Link>

            <Link
              href="/cart"
              className="flex h-[50px] items-center gap-2 rounded-full border border-ink/15 px-5 text-[14px] leading-[18px] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
            >
              Cart
              {count > 0 && (
                <span className="grid size-[18px] place-items-center rounded-full bg-ink text-[10px] font-medium text-paper transition-colors group-hover:bg-paper">
                  {count}
                </span>
              )}
            </Link>

            <Link href="/checkout" aria-label="Account" className={`${circle} hidden sm:grid`}>
              <UserIcon />
            </Link>

            <Link href="/cart" aria-label="Shopping bag" className={`${circle} hidden sm:grid`}>
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-over navigation */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
        />

        <div
          className={`absolute inset-y-0 left-0 flex w-full max-w-[420px] flex-col bg-paper px-8 py-10 transition-transform duration-500 ease-[var(--ease-out-quint)] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <BrandMark className="size-[42px] text-ink" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className={circle}
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-2">
            {[...NAV, { label: "Cart", href: "/cart" }, { label: "Checkout", href: "/checkout" }].map(
              (item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="display text-[clamp(38px,9vw,56px)] text-ink transition-opacity hover:opacity-40"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="mt-auto flex gap-6 pt-10 text-[12px] text-ink-60">
            <span>Eng</span>
            <span>Esp</span>
            <span>Sve</span>
          </div>
        </div>
      </div>
    </>
  );
}
