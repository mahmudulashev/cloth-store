"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ArrowLeftIcon, ArrowLongIcon, ChevronDownIcon } from "@/components/icons";
import { useCart } from "@/lib/cart";
import { photo } from "@/lib/images";

const STEPS = ["Information", "Shipping", "Payment"] as const;
type Step = (typeof STEPS)[number];

const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Sweden",
  "Spain",
  "Germany",
  "France",
  "Uzbekistan",
];

export function CheckoutView() {
  const { lines, subtotal, total, shipping, clear } = useCart();
  const [step, setStep] = useState<Step>("Information");
  const [placed, setPlaced] = useState(false);

  const advance = (event: React.FormEvent) => {
    event.preventDefault();
    const next = STEPS[STEPS.indexOf(step) + 1];
    if (next) {
      setStep(next);
      return;
    }
    clear();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="shell pt-[100px] pb-[120px]">
        <h1 className="display text-[clamp(36px,6vw,54px)] leading-[0.9]">
          Thank you
          <br />
          for your order
        </h1>
        <p className="mt-[16px] max-w-[480px] text-[16px] leading-[24px] text-ink-60">
          A confirmation is on its way. Your pieces leave the atelier within two working days.
        </p>
        <Link
          href="/products"
          className="mt-[28px] inline-flex h-[40px] items-center rounded-full border border-ink px-[26px] text-[14px] transition-colors duration-500 hover:bg-ink hover:text-paper"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="shell pt-[20px]">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-[14px] text-ink-60 transition-colors hover:text-ink"
      >
        <ArrowLeftIcon className="size-[16px]" />
        Back to bag
      </Link>

      <h1 className="mt-[32px] text-[32px] leading-[40px] font-semibold">Checkout</h1>

      {/* Steps */}
      <nav className="mt-[13px] flex items-center gap-[26px]">
        {STEPS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(label)}
            className={`text-[16px] leading-[24px] transition-opacity duration-300 ${
              step === label ? "opacity-100" : "opacity-35 hover:opacity-70"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-[32px] flex flex-col gap-[40px] lg:flex-row lg:gap-[244px]">
        {/* Form */}
        <form onSubmit={advance} className="w-full lg:w-[468px] lg:shrink-0">
          <h2 className="text-[18px] leading-[24px]">
            {step === "Information"
              ? "Contact info"
              : step === "Shipping"
                ? "Shipping address"
                : "Payment"}
          </h2>

          {step === "Information" && (
            <div className="mt-[20px] flex flex-col gap-[15px]">
              <Field label="Email" type="email" name="email" autoComplete="email" required />
              <Field label="Phone" type="tel" name="phone" autoComplete="tel" required />
            </div>
          )}

          {step === "Shipping" && (
            <div className="mt-[20px] flex flex-col gap-[15px]">
              <div className="flex gap-[6px]">
                <Field label="First Name" name="given-name" autoComplete="given-name" required half />
                <Field label="Last Name" name="family-name" autoComplete="family-name" required half />
              </div>
              <Select label="Country" options={COUNTRIES} />
              <Field label="State / Region" name="region" autoComplete="address-level1" />
              <Field label="Address" name="address" autoComplete="street-address" required />
              <div className="flex gap-[6px]">
                <Field label="City" name="city" autoComplete="address-level2" required half />
                <Field label="Postal Code" name="postal-code" autoComplete="postal-code" required half />
              </div>
            </div>
          )}

          {step === "Payment" && (
            <div className="mt-[20px] flex flex-col gap-[15px]">
              <p className="text-[14px] leading-[18px] text-ink-60">
                This storefront is a portfolio build, so no payment is taken and no card details
                are collected.
              </p>
            </div>
          )}

          <div className="mt-[11px] flex justify-end">
            <button
              type="submit"
              className="group flex h-[44px] w-full items-center justify-between gap-4 rounded-full border border-ink px-[21px] text-[14px] transition-colors duration-500 hover:bg-ink hover:text-paper sm:w-[231px]"
            >
              {step === "Payment" ? "Place order" : STEPS[STEPS.indexOf(step) + 1]}
              <ArrowLongIcon className="w-[47px] shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </div>
        </form>

        {/* Order panel */}
        <aside className="w-full rounded-[8px] bg-paper-2/80 p-[39px] lg:w-[406px] lg:shrink-0 lg:self-start">
          <h2 className="text-[16px] leading-[21px] tracking-[0.02em] uppercase">Your order</h2>

          {lines.length === 0 ? (
            <p className="mt-[24px] text-[14px] text-ink-60">
              Your bag is empty.{" "}
              <Link href="/products" className="underline underline-offset-4">
                Add something first
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-[26px] flex flex-col gap-[23px]">
              {lines.map((line) => (
                <li key={`${line.slug}-${line.size}-${line.color}`} className="flex gap-[16px]">
                  <div className="relative size-[100px] shrink-0 overflow-hidden rounded-[4px] bg-tile">
                    <Image
                      src={photo(line.product.images[0], { width: 200, height: 200 })}
                      alt={line.product.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="text-[14px] leading-[18px]">{line.product.name}</p>
                    <p className="mt-[4px] text-[13px] leading-[16px] text-ink-60">
                      {line.color} · {line.size} · Qty {line.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 self-center text-[14px]">
                    ${line.lineTotal.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-[33px] h-px w-full bg-line" />

          <dl className="mt-[11px] flex flex-col gap-[5px] text-[14px] leading-[18px]">
            <div className="flex justify-between">
              <dt className="text-ink-60">Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-60">Shipping</dt>
              <dd className="text-[12px] leading-[15px] text-ink-60">
                {step === "Information" ? "Calculated at next step" : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
          </dl>

          <div className="mt-[14px] h-px w-full bg-line" />

          <div className="mt-[15px] flex items-baseline justify-between text-[16px] leading-[21px]">
            <span>Total</span>
            <span>${(step === "Information" ? subtotal : total).toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

const fieldBase =
  "h-[44px] w-full rounded-[6px] border border-ink/15 bg-transparent px-[23px] text-[14px] outline-none transition-colors duration-300 placeholder:text-ink-60 focus:border-ink";

function Field({
  label,
  half,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; half?: boolean }) {
  return (
    <div className={half ? "flex-1" : "w-full"}>
      <label className="sr-only" htmlFor={props.name}>
        {label}
      </label>
      <input id={props.name} placeholder={label} className={fieldBase} {...props} />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="relative w-full">
      <label className="sr-only" htmlFor={label}>
        {label}
      </label>
      <select id={label} defaultValue="" className={`${fieldBase} appearance-none pr-[44px]`}>
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-[21px] -translate-y-1/2 text-ink-40" />
    </div>
  );
}
