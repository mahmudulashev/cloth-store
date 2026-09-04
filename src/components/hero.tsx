"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { PillButton } from "@/components/pill-button";
import { Reveal } from "@/components/reveal";
import { SearchField } from "@/components/search-field";
import { photo } from "@/lib/images";

/** Each slide is the pair of shots shown side by side in the hero. */
const SLIDES: [string, string][] = [
  ["photo-1554568218-0f1715e72254", "photo-1503341455253-b2e723bb3dbb"],
  ["photo-1571945153237-4929e783af4a", "photo-1622519407650-3df9883f76a5"],
  ["photo-1581044777550-4cfa60707c03", "photo-1617137968427-85924c800a22"],
];

const control =
  "grid size-[40px] place-items-center rounded-full border border-ink/20 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper";

export function Hero() {
  const [index, setIndex] = useState(0);

  const go = useCallback((step: number) => {
    setIndex((current) => (current + step + SLIDES.length) % SLIDES.length);
  }, []);

  // Advance on its own, but never fight a reduced-motion preference.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => go(1), 6500);
    return () => window.clearInterval(timer);
  }, [go]);

  return (
    <section className="shell pt-[56px]">
      <div className="grid gap-[41px] lg:grid-cols-[367px_minmax(0,1fr)]">
        {/* Left rail */}
        <div className="flex flex-col">
          <Reveal>
            <p className="text-[16px] leading-[24px] tracking-[0.02em] uppercase">
              Men
              <br />
              Women
              <br />
              Kids
            </p>
          </Reveal>

          <Reveal delay={80}>
            <SearchField className="mt-[14px] max-w-[367px]" />
          </Reveal>

          <Reveal delay={160}>
            <h1 className="display mt-[74px] text-[clamp(46px,7vw,54px)] leading-[0.78] lg:mt-[94px]">
              New
              <br />
              Collection
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-[10px] text-[16px] leading-[24px]">
              Summer
              <br />
              2024
            </p>
          </Reveal>

          <Reveal delay={280} className="mt-[48px] lg:mt-auto lg:pt-[60px]">
            <div className="flex items-center gap-[12px]">
              <PillButton href="/products" className="w-[265px] shrink-0">
                Go To Shop
              </PillButton>

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous look"
                className={control}
              >
                <ArrowLeftIcon className="size-[18px]" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next look"
                className={control}
              >
                <ArrowRightIcon className="size-[18px]" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Paired look shots */}
        <Reveal delay={120} className="lg:pt-[230px]">
          <div className="grid grid-cols-2 gap-[16px] md:gap-[41px]">
            {[0, 1].map((slot) => (
              <div
                key={slot}
                className="relative overflow-hidden rounded-[4px] bg-tile"
              >
                <div className="relative aspect-[366/376]">
                  {SLIDES.map((pair, slideIndex) => (
                    <Image
                      key={pair[slot]}
                      src={photo(pair[slot], { width: 740, height: 760 })}
                      alt="Summer 2024 look"
                      fill
                      sizes="(min-width: 1024px) 366px, 45vw"
                      priority={slideIndex === 0}
                      className={`object-cover transition-opacity duration-[1100ms] ease-[var(--ease-out-quint)] ${
                        slideIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-[6px] lg:hidden">
            {SLIDES.map((pair, slideIndex) => (
              <button
                key={pair[0]}
                type="button"
                onClick={() => setIndex(slideIndex)}
                aria-label={`Show look ${slideIndex + 1}`}
                className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
                  slideIndex === index ? "bg-ink" : "bg-ink/15"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
