import Link from "next/link";

import { ArrowLongIcon } from "@/components/icons";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** The wide pill with a trailing long arrow used for the primary calls to action. */
export function PillButton({ href, children, className = "" }: PillButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-[40px] items-center justify-between gap-6 overflow-hidden rounded-full border border-ink px-[27px] text-[16px] leading-6 transition-colors duration-500 hover:bg-ink hover:text-paper ${className}`}
    >
      <span>{children}</span>
      <ArrowLongIcon className="w-[48px] shrink-0 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-1" />
    </Link>
  );
}
