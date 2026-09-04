type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 26 16" width="26" height="16" aria-hidden {...props}>
      <path d="M0 1h26M0 8h18M0 15h26" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden {...base} {...props}>
      <circle cx="7" cy="7" r="5.25" />
      <path d="m11 11 3.5 3.5" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...base} {...props}>
      <circle cx="10" cy="6.75" r="3.25" />
      <path d="M3.75 17c.9-3.1 3.3-4.75 6.25-4.75S15.35 13.9 16.25 17" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...base} {...props}>
      <path d="M4.25 6.25h11.5l-.9 10.1a1.5 1.5 0 0 1-1.5 1.4H6.65a1.5 1.5 0 0 1-1.5-1.4z" />
      <path d="M7.25 8V5.5a2.75 2.75 0 0 1 5.5 0V8" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...base} {...props}>
      <path d="M10 16.5S3.25 12.6 3.25 8.06A3.56 3.56 0 0 1 10 6.3a3.56 3.56 0 0 1 6.75 1.76C16.75 12.6 10 16.5 10 16.5Z" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...base} {...props}>
      <path d="M10 4.75v10.5M4.75 10h10.5" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...base} {...props}>
      <path d="M4.75 10h10.5" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...base} {...props}>
      <path d="m5.5 5.5 9 9M14.5 5.5l-9 9" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 8" width="14" height="8" aria-hidden {...base} {...props}>
      <path d="m1 1.5 6 5 6-5" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 8 14" width="8" height="14" aria-hidden {...base} {...props}>
      <path d="m1.5 1 5 6-5 6" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...base} {...props}>
      <path d="M16 10H4.5M9 4.5 3.5 10 9 15.5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...base} {...props}>
      <path d="M4 10h11.5M11 4.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

/** The long thin arrow that trails the pill buttons in the design. */
export function ArrowLongIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 12" width="48" height="12" aria-hidden {...base} {...props}>
      <path d="M0 6h46M40.5 1 46 6l-5.5 5" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...base} {...props}>
      <path d="M10 16V4.5M4.5 10 10 4.5 15.5 10" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden {...props}>
      <path
        d="m10 2.5 2.2 4.87 5.3.56-3.95 3.58 1.1 5.24L10 14.1l-4.65 2.65 1.1-5.24L2.5 7.93l5.3-.56z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Brand mark: the XIV monogram inside a ring. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display)"
        fontSize="15"
        fontWeight="800"
        letterSpacing="0.02em"
        fill="currentColor"
      >
        XIV
      </text>
    </svg>
  );
}
