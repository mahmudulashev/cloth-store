"use client";

import Link from "next/link";

import { ArrowUpIcon, BrandMark } from "@/components/icons";

const INFO = [
  { label: "Pricing", href: "/products" },
  { label: "About", href: "/products" },
  { label: "Contacts", href: "/checkout" },
];

const LANGUAGES = ["Eng", "Esp", "Sve"];

const TECHNOLOGIES = [
  { word: "VR", note: null },
  { word: "XIV", note: "Near-field communication" },
  { word: "QR", note: null },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-[120px] border-t border-line bg-paper-2/70 pt-[70px] pb-[34px] md:mt-[180px]">
      <div className="shell">
        <div className="grid gap-[56px] md:grid-cols-2 md:gap-[80px]">
          {/* Info + languages */}
          <div className="flex gap-[80px] md:gap-[120px]">
            <div>
              <h2 className="text-[14px] leading-[14px] font-medium">Info</h2>
              <ul className="mt-[32px] flex flex-col gap-[8px]">
                {INFO.map((item, index) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className="text-[11px] leading-[9px] text-ink-60 transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                    {index < INFO.length - 1 && (
                      <span className="text-[11px] text-ink-40">/</span>
                    )}
                  </li>
                ))}
              </ul>

              <h2 className="mt-[42px] text-[14px] leading-[14px] font-medium">Languages</h2>
              <ul className="mt-[32px] flex flex-col gap-[8px]">
                {LANGUAGES.map((lang, index) => (
                  <li key={lang} className="flex items-center gap-2">
                    <span className="text-[11px] leading-[9px] text-ink-60">{lang}</span>
                    {index < LANGUAGES.length - 1 && (
                      <span className="text-[11px] text-ink-40">/</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h2 className="text-[14px] leading-[14px] font-medium">Technologies</h2>
            <BrandMark className="mt-[38px] size-[47px] text-ink" />

            <ul className="mt-[30px] flex flex-col gap-[12px]">
              {TECHNOLOGIES.map((tech) => (
                <li key={tech.word} className="flex items-baseline gap-[16px]">
                  <span className="display text-[clamp(38px,5vw,48px)] leading-[1]">
                    {tech.word}
                  </span>
                  {tech.note && (
                    <>
                      <span className="max-w-[150px] text-[12px] leading-[16px] text-ink-60">
                        {tech.note}
                      </span>
                      <span className="text-[28px] leading-none text-ink-40">/</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-[80px] flex flex-col-reverse items-start justify-between gap-6 md:mt-[120px] md:flex-row md:items-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="group grid size-[64px] shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
          >
            <ArrowUpIcon className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>

          <div className="flex w-full flex-wrap items-center justify-between gap-x-[80px] gap-y-3 text-[12px] leading-[13px] text-ink-60 md:w-auto md:flex-nowrap">
            <span>© {new Date().getFullYear()} — copyright</span>
            <div className="flex items-center gap-[80px]">
              <Link href="/" className="transition-colors hover:text-ink">
                privacy
              </Link>
              <Link href="/" className="transition-colors hover:text-ink">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
