import type { ReactNode } from "react";
import type { Krume } from "@/lib/seo";
import { Brotkrumen } from "./Brotkrumen";

/** Kopf einer Hub-Seite: links Frage und Antwort, rechts eine Fahrplanspalte. */
export function HubKopf({
  krumen,
  h1,
  children,
  zeilen,
  zeilenTitel,
}: {
  krumen: Krume[];
  h1: string;
  children: ReactNode;
  zeilen?: { label: string; wert: ReactNode }[];
  zeilenTitel?: string;
}) {
  return (
    <>
      <div className="blatt pt-4 pb-3">
        <Brotkrumen krumen={krumen} />
      </div>
      <section className="blatt">
        <div className="grid border-t border-ink lg:grid-cols-12 lg:gap-x-6">
          <div className="pt-7 pb-8 lg:col-span-8 lg:pt-10 lg:pb-12 lg:pr-6">
            <h1 className="text-plakat max-w-[16ch]">{h1}</h1>
            <div className="text-lead mt-6 max-w-text">{children}</div>
          </div>
          {zeilen && zeilen.length > 0 && (
            <aside className="pb-8 lg:col-span-4 lg:border-l lg:border-ink lg:pt-10 lg:pb-12 lg:pl-6" aria-label={zeilenTitel ?? "Eckdaten"}>
              {zeilenTitel && (
                <h2 className="mono text-fein mb-1 font-medium normal-case tracking-normal text-ink-soft">
                  {zeilenTitel}
                </h2>
              )}
              <dl className="fahrplan border-t border-ink">
                {zeilen.map((z) => (
                  <div key={z.label}>
                    <dt>{z.label}</dt>
                    <dd>{z.wert}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
