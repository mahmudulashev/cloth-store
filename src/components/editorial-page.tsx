import { Breadcrumb } from "@/components/breadcrumb";

type Section = { heading: string; body: string[] };

export function EditorialPage({
  title,
  intro,
  sections,
  aside,
}: {
  title: string;
  intro: string;
  sections: Section[];
  aside?: React.ReactNode;
}) {
  return (
    <div className="shell pt-[58px] pb-[40px]">
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: title }]} />

      <h1 className="display mt-[40px] max-w-[820px] text-[clamp(34px,5.5vw,54px)] leading-[0.92]">
        {title}
      </h1>

      <p className="mt-[20px] max-w-[640px] text-[16px] leading-[24px] text-ink-60">{intro}</p>

      <div className="mt-[64px] flex flex-col gap-[64px] lg:flex-row lg:gap-[100px]">
        <div className="max-w-[640px] flex-1">
          {sections.map((section) => (
            <section key={section.heading} className="mt-[40px] first:mt-0">
              <h2 className="text-[18px] leading-[24px] font-medium">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-[12px] text-[15px] leading-[24px] text-ink-60">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {aside && <div className="w-full lg:w-[306px] lg:shrink-0">{aside}</div>}
      </div>
    </div>
  );
}
