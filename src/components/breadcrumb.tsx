import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumb({ trail, title }: { trail: Crumb[]; title?: string }) {
  return (
    <div>
      <nav aria-label="Breadcrumb" className="text-[14px] leading-[18px] text-ink-60">
        {trail.map((crumb, index) => (
          <span key={crumb.label}>
            {crumb.href ? (
              <Link href={crumb.href} className="-my-2 inline-block py-2 transition-colors hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              crumb.label
            )}
            {index < trail.length - 1 && <span className="px-[6px]">/</span>}
          </span>
        ))}
      </nav>

      {title && <h1 className="display mt-[9px] text-[24px] leading-[30px]">{title}</h1>}
    </div>
  );
}
