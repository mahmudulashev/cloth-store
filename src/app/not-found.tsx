import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell pt-[120px] pb-[160px]">
      <p className="eyebrow">404</p>
      <h1 className="display mt-[16px] text-[clamp(40px,7vw,54px)] leading-[0.85]">
        This piece
        <br />
        is not in stock
      </h1>
      <p className="mt-[16px] max-w-[420px] text-[16px] leading-[24px] text-ink-60">
        The page you were after has moved or never existed. The collection is still here.
      </p>
      <Link
        href="/products"
        className="mt-[28px] inline-flex h-[40px] items-center rounded-full border border-ink px-[26px] text-[14px] transition-colors duration-500 hover:bg-ink hover:text-paper"
      >
        Browse the collection
      </Link>
    </div>
  );
}
