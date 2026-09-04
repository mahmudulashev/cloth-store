import type { Metadata } from "next";

import { EditorialPage } from "@/components/editorial-page";

export const metadata: Metadata = {
  title: "Contacts",
  description: "How to reach XIV about an order, a return, a fit question or press.",
};

const LINES = [
  { label: "Orders and returns", value: "orders@xiv.example" },
  { label: "Fit and sizing", value: "atelier@xiv.example" },
  { label: "Press", value: "press@xiv.example" },
  { label: "Telephone", value: "+44 20 7000 0014" },
];

export default function ContactPage() {
  return (
    <EditorialPage
      title="Contacts"
      intro="Someone reads every message. Expect a reply within one working day."
      sections={[
        {
          heading: "Studio",
          body: [
            "14 Bell Yard Mews, London SE1 3TY, United Kingdom.",
            "Open by appointment, Tuesday to Friday, 10:00–17:00.",
          ],
        },
        {
          heading: "Returns",
          body: [
            "Unworn pieces can be returned within 30 days of delivery. Start a return by emailing orders with your order number and we will send a prepaid label.",
          ],
        },
      ]}
      aside={
        <dl className="rounded-[8px] bg-paper-2/80 p-[32px]">
          {LINES.map((line) => (
            <div key={line.label} className="mt-[20px] first:mt-0">
              <dt className="text-[12px] tracking-[0.08em] text-ink-60 uppercase">{line.label}</dt>
              <dd className="mt-[4px] text-[15px]">{line.value}</dd>
            </div>
          ))}
        </dl>
      }
    />
  );
}
