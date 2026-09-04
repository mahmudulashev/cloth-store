"use client";

import Image from "next/image";
import { useState } from "react";

import { ArrowLongIcon, HeartIcon } from "@/components/icons";
import { photo } from "@/lib/images";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product, type Size } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const { add, toggleFavourite, isFavourite } = useCart();
  const [shot, setShot] = useState(0);
  const [size, setSize] = useState<Size>(product.sizes[2] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [added, setAdded] = useState(false);

  const favourite = isFavourite(product.slug);

  const addToBag = () => {
    add({ slug: product.slug, size, color, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-[40px] lg:flex-row lg:justify-center lg:gap-[39px]">
      {/* Primary shot */}
      <div className="relative w-full self-start overflow-hidden rounded-[4px] bg-tile lg:w-[367px] lg:shrink-0">
        <div className="relative aspect-[367/438]">
          {product.images.map((id, index) => (
            <Image
              key={id}
              src={photo(id, { width: 750, height: 895 })}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 367px, 100vw"
              priority={index === 0}
              className={`object-cover transition-opacity duration-700 ${
                index === shot ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail rail */}
      <div className="flex gap-[13px] self-start lg:flex-col">
        {product.images.map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => setShot(index)}
            aria-label={`View shot ${index + 1}`}
            aria-current={index === shot}
            className={`relative h-[78px] w-[64px] shrink-0 overflow-hidden rounded-[4px] bg-tile ring-1 transition-[--tw-ring-color,opacity] duration-300 ${
              index === shot ? "ring-ink" : "ring-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={photo(id, { width: 128, height: 156 })}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Detail card */}
      <div className="relative w-full rounded-[8px] bg-paper-2/80 p-[40px] lg:w-[306px] lg:shrink-0">
        <button
          type="button"
          onClick={() => toggleFavourite(product.slug)}
          aria-pressed={favourite}
          aria-label={favourite ? "Remove from favourites" : "Save to favourites"}
          className="absolute top-[16px] right-[16px] grid size-[34px] place-items-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-ink"
        >
          <HeartIcon className={`size-[18px] ${favourite ? "fill-ink" : ""}`} />
        </button>

        <h1 className="mt-[11px] text-[16px] leading-[21px] tracking-[0.02em] uppercase">
          {product.name}
        </h1>
        <p className="mt-[6px] text-[16px] leading-[21px]">{formatPrice(product.price)}</p>
        <p className="mt-[13px] text-[14px] leading-[18px] text-ink-60">MRP incl. of all taxes</p>

        <p className="mt-[38px] text-[14px] leading-[18px] text-ink-60">{product.description}</p>

        {/* Colour */}
        <p className="mt-[45px] text-[14px] leading-[18px]">Color</p>
        <div className="mt-[8px] flex flex-wrap gap-[8px]">
          {product.colors.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => setColor(option.name)}
              aria-label={option.name}
              aria-pressed={color === option.name}
              className={`size-[28px] rounded-full ring-1 transition-[box-shadow,--tw-ring-color] duration-300 ${
                color === option.name
                  ? "ring-ink ring-offset-2 ring-offset-paper-2"
                  : "ring-ink/15 hover:ring-ink/40"
              }`}
              style={{ backgroundColor: option.hex }}
            />
          ))}
        </div>

        {/* Size */}
        <p className="mt-[24px] text-[14px] leading-[18px]">Size</p>
        <div className="mt-[8px] flex flex-wrap gap-[4px]">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={size === option}
              className={`h-[32px] min-w-[34px] rounded-[4px] border px-[6px] text-[13px] transition-colors duration-300 ${
                size === option ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="mt-[24px] text-[11px] leading-[15px] text-ink-60 uppercase">
          Find your size | Measurement guide
        </p>

        <button
          type="button"
          onClick={addToBag}
          disabled={!product.inStock}
          className="group mt-[24px] flex h-[40px] w-full items-center justify-between gap-4 rounded-full border border-ink px-[20px] text-[14px] transition-colors duration-500 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/20 disabled:text-ink-40 disabled:hover:bg-transparent"
        >
          <span>
            {!product.inStock ? "Sold out" : added ? "Added to bag" : "Add to cart"}
          </span>
          <ArrowLongIcon className="w-[40px] shrink-0 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
