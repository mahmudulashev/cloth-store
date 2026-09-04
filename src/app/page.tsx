import Image from "next/image";
import Link from "next/link";

import { Hero } from "@/components/hero";
import { CollectionsSection } from "@/components/collections-section";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { photo } from "@/lib/images";
import { PRODUCTS } from "@/lib/products";

const NEW_THIS_WEEK = PRODUCTS.filter((p) => p.collections.includes("New")).slice(0, 4);

const APPROACH_SHOTS = [
  { id: "photo-1523381210434-271e8be1f52b", height: 389, offset: 0 },
  { id: "photo-1509319117193-57bab727e09d", height: 419, offset: 73 },
  { id: "photo-1490481651871-ab68de25d43d", height: 419, offset: 0 },
  { id: "photo-1445205170230-053b83016050", height: 389, offset: 103 },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ------------------------------------------------------- New this week */}
      <section className="shell mt-[86px] lg:mt-[80px]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <Reveal>
            <h2 className="display flex items-start gap-[12px] text-[clamp(40px,6vw,54px)] leading-[0.78]">
              <span>
                New
                <br />
                This Week
              </span>
              <span className="mt-[8px] font-sans text-[24px] leading-[28px] font-normal tracking-normal text-ink-60 normal-case">
                (50)
              </span>
            </h2>
          </Reveal>

          <Reveal delay={100} className="self-end">
            <Link
              href="/products"
              className="-m-2 inline-block p-2 text-[16px] leading-[24px] underline-offset-[6px] transition-opacity hover:opacity-60 hover:underline"
            >
              See All
            </Link>
          </Reveal>
        </div>

        <ul className="mt-[62px] grid grid-cols-2 gap-x-[26px] gap-y-[48px] lg:grid-cols-4">
          {NEW_THIS_WEEK.map((product, index) => (
            <Reveal as="li" key={product.slug} delay={index * 90}>
              <ProductCard product={product} priority={index < 2} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-[52px] flex justify-center">
          <Link
            href="/products?collection=New"
            className="inline-flex h-[40px] items-center rounded-full border border-ink/20 px-[26px] text-[14px] transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
          >
            See more
          </Link>
        </Reveal>
      </section>

      {/* ------------------------------------------------- XIV Collections 23-24 */}
      <CollectionsSection />

      {/* ------------------------------------------------------- Our approach */}
      <section className="mt-[96px] lg:mt-[164px]">
        <div className="shell">
          <Reveal>
            <h2 className="display mx-auto max-w-[924px] text-center text-[clamp(26px,3.6vw,40px)] leading-[1.05]">
              Our Approach to fashion design
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mx-auto mt-[24px] max-w-[685px] text-center text-[16px] leading-[24px] text-ink-60">
              At Elegant Vogue, we blend creativity with craftsmanship to create fashion that
              transcends trends and stands the test of time. Each design is meticulously crafted,
              ensuring the highest quality and an exquisite finish.
            </p>
          </Reveal>
        </div>

        {/* Staggered strip — intentionally runs past the right gutter */}
        <div className="mt-[102px] overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max items-start gap-[36px] px-5 md:px-[50px]">
            {APPROACH_SHOTS.map((shot, index) => (
              <Reveal as="li" key={shot.id} delay={index * 110}>
                <div
                  className="relative w-[220px] overflow-hidden rounded-[4px] bg-tile md:w-[317px]"
                  style={{ marginTop: shot.offset * 0.5 }}
                >
                  <div
                    className="relative"
                    style={{ aspectRatio: `317 / ${shot.height}` }}
                  >
                    <Image
                      src={photo(shot.id, { width: 640, height: shot.height * 2 })}
                      alt="Atelier detail"
                      fill
                      sizes="(min-width: 768px) 317px, 220px"
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quint)] hover:scale-[1.05]"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
