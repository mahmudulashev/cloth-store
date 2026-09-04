"use client";

import { MinusIcon, PlusIcon } from "@/components/icons";

type Props = {
  value: number;
  onChange: (value: number) => void;
  /** The design stacks the control vertically beside the cart thumbnail. */
  orientation?: "vertical" | "horizontal";
};

export function QuantityStepper({ value, onChange, orientation = "vertical" }: Props) {
  return (
    <div
      className={`flex items-center gap-[10px] ${
        orientation === "vertical" ? "flex-col" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="grid size-[25px] place-items-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
      >
        <PlusIcon className="size-[13px]" />
      </button>

      <span className="text-[14px] tabular-nums">{value}</span>

      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label={value === 1 ? "Remove item" : "Decrease quantity"}
        className="grid size-[25px] place-items-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
      >
        <MinusIcon className="size-[13px]" />
      </button>
    </div>
  );
}
