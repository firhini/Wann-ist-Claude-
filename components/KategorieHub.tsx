import type { ReactNode } from "react";
import { type Countdown, type Faq, stand } from "@/lib/countdown";
import { type Krume, schemaFaq, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { FaqListe } from "./FaqListe";
import { HubKopf } from "./HubKopf";
import { JsonLd } from "./JsonLd";
import { Prosa } from "./Text";
import { Uebersicht, type UebersichtZeile } from "./Uebersicht";

/** Hub einer Kategorie: Frage, Antwort, Übersichtstabelle aller Countdowns, Text, FAQ. */
export function KategorieHub({
  pfad,
  krumen,
  h1,
  antwort,
  countdowns,
  now,
  tabellenTitel,
  spalteName,
  extra,
  spalteExtra,
  textTitel,
  text,
  faq,
  zeilen,
  zeilenTitel,
  danach,
}: {
  pfad: string;
  krumen: Krume[];
  h1: string;
  antwort: ReactNode;
  countdowns: Countdown[];
  now: Date;
  tabellenTitel: string;
  spalteName: string;
  extra?: (c: Countdown) => ReactNode;
  spalteExtra?: string;
  textTitel: string;
  text: string;
  faq?: Faq[];
  zeilen?: { label: string; wert: ReactNode }[];
  zeilenTitel?: string;
  danach?: ReactNode;
}) {
  const liste: UebersichtZeile[] = countdowns
    .map((c) => ({ c, s: stand(c, now) }))
    .sort((a, b) => a.s.tage - b.s.tage)
    .map(({ c, s }) => ({
      pfad: c.pfad,
      titel: c.tafel ?? c.title,
      datum: s.start,
      tage: s.tage,
      phase: s.phase,
      extra: extra?.(c),
    }));
  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({ titel: h1, beschreibung: tabellenTitel, pfad, geaendert: now }),
          schemaKrumen(krumen),
          ...(faq?.length ? [schemaFaq(faq)] : []),
        ]}
      />
      <HubKopf krumen={krumen} h1={h1} zeilen={zeilen} zeilenTitel={zeilenTitel}>
        {antwort}
      </HubKopf>
      <section className="blatt mt-12">
        <h2 className="text-kopf mb-5">{tabellenTitel}</h2>
        <Uebersicht titel={tabellenTitel} zeilen={liste} spalteName={spalteName} spalteExtra={spalteExtra} ersteMarkieren />
      </section>
      {danach}
      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">{textTitel}</h2>
          <Prosa text={text} className="max-w-text max-lg:mt-5 lg:col-span-7 lg:col-start-6" />
        </div>
      </section>
      {faq && faq.length > 0 && (
        <section className="blatt mt-abschnitt">
          <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-6">
            <h2 className="text-kopf lg:col-span-4">Häufige Fragen</h2>
            <div className="lg:col-span-8">
              <FaqListe faq={faq} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
