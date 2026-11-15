import type { Faq } from "@/lib/countdown";
import { mitLinks } from "./Text";

/** FAQ als Akkordeon. Natives <details>, keine Animation. */
export function FaqListe({ faq }: { faq: Faq[] }) {
  return (
    <div className="border-t border-ink">
      {faq.map((f) => (
        <details key={f.q} className="group border-b border-ink">
          <summary className="flex items-baseline justify-between gap-6 py-4">
            <h3 className="font-text text-body font-semibold normal-case tracking-normal">{f.q}</h3>
            <span className="mono text-zeile leading-none text-ink-soft group-open:hidden" aria-hidden="true">
              +
            </span>
            <span className="mono text-zeile hidden leading-none text-ink-soft group-open:inline" aria-hidden="true">
              −
            </span>
          </summary>
          <p className="max-w-text pb-5 prosa">{mitLinks(f.a)}</p>
        </details>
      ))}
    </div>
  );
}
