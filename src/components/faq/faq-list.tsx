import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Faq } from "@/data/faqs";

export function FaqList({ items, name, openFirst }: { items: Faq[]; name: string; openFirst?: boolean }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((faq, index) => (
        <details key={faq.question} name={name} open={openFirst && index === 0} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[17px] font-medium text-ink transition-colors hover:text-brand-forest [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-brand-forest transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:bg-brand-sage-soft"
            >
              <Plus size={16} />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 pr-12 leading-relaxed text-ink-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
