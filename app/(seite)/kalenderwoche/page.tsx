import type { Metadata } from "next";
import { Brotkrumen } from "@/components/Brotkrumen";
import { FaqListe } from "@/components/FaqListe";
import { JsonLd } from "@/components/JsonLd";
import { KwBlatt } from "@/components/KwBlatt";
import { KwTabelle } from "@/components/KwTabelle";
import { Prosa } from "@/components/Text";
import { KW_FAQ, KW_TEXT } from "@/data/kalenderwoche";
import { datumLang, datumOhneJahr, wochentagName } from "@/lib/format";
import { kalenderwoche, montagDerWoche, wochenImJahr } from "@/lib/kw";
import { type Krume, metadaten, schemaFaq, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { gleicherTag, plusTage, tagVon } from "@/lib/zeit";

export const revalidate = 3600;

const PFAD = "/kalenderwoche";
const KRUMEN: Krume[] = [
  { name: "Start", pfad: "/" },
  { name: "Kalenderwoche", pfad: PFAD },
];

function antwortSatz(now: Date) {
  const heute = tagVon(now);
  const kw = kalenderwoche(heute);
  const mo = montagDerWoche(heute);
  const so = plusTage(mo, 6);
  return {
    heute,
    kw,
    mo,
    so,
    satz: `Wir haben Kalenderwoche ${kw.kw}.`,
    zusatz: `Heute ist ${wochentagName(heute)}, der ${datumLang(heute)}. Die KW ${kw.kw} läuft von Montag, ${datumOhneJahr(mo)}, bis Sonntag, ${datumLang(so)}.`,
  };
}

export function generateMetadata(): Metadata {
  const a = antwortSatz(new Date());
  return metadaten({
    titel: `Welche KW haben wir? Aktuell KW ${a.kw.kw} (${a.kw.jahr})`,
    beschreibung: `${a.satz} ${a.zusatz} Dazu alle Kalenderwochen ${a.kw.jahr} mit Datum.`,
    pfad: PFAD,
    og: { t: "Welche KW haben wir?", z: String(a.kw.kw), e: "KW" },
  });
}

export default function Kalenderwoche() {
  const now = new Date();
  const a = antwortSatz(now);
  const wochentage = Array.from({ length: 7 }, (_, i) => plusTage(a.mo, i));
  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({
            titel: `Welche KW haben wir? Aktuell KW ${a.kw.kw}`,
            beschreibung: `${a.satz} ${a.zusatz}`,
            pfad: PFAD,
            geaendert: now,
          }),
          schemaKrumen(KRUMEN),
          schemaFaq(KW_FAQ),
        ]}
      />
      <div className="blatt pt-4 pb-3">
        <Brotkrumen krumen={KRUMEN} />
      </div>

      <section className="blatt">
        <div className="grid border-t border-ink lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col pt-6 pb-8 lg:col-span-8 lg:pt-8 lg:pb-12 lg:pr-6">
            <h1 className="text-frage">Welche KW haben wir?</h1>
            <p className="text-lead order-3 mt-7 max-w-text">
              <strong className="font-semibold">{a.satz}</strong> {a.zusatz}
            </p>
            <div className="order-2 mt-5 lg:mt-8">
              <KwBlatt serverNow={now.getTime()} />
            </div>
          </div>
          <aside className="pb-8 lg:col-span-4 lg:border-l lg:border-ink lg:pt-8 lg:pb-12 lg:pl-6" aria-label="Diese Woche">
            <h2 className="mono text-fein mb-1 font-medium normal-case tracking-normal text-ink-soft max-lg:mt-2">
              Die Tage der KW {a.kw.kw}
            </h2>
            <dl className="fahrplan border-t border-ink">
              {wochentage.map((t) => {
                const istHeute = gleicherTag(t, a.heute);
                return (
                  <div key={t.d}>
                    <dt className={istHeute ? "font-medium text-orchid-deep" : undefined}>
                      {wochentagName(t)}
                      {istHeute ? " · heute" : ""}
                    </dt>
                    <dd>{datumLang(t)}</dd>
                  </div>
                );
              })}
            </dl>
            <dl className="fahrplan mt-6 border-t border-ink">
              <div>
                <dt>Wochen im Jahr {a.kw.jahr}</dt>
                <dd>{wochenImJahr(a.kw.jahr)}</dd>
              </div>
              <div>
                <dt>Noch bis Jahresende</dt>
                <dd>{wochenImJahr(a.kw.jahr) - a.kw.kw} Wochen</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="blatt mt-abschnitt">
        <h2 className="text-kopf mb-5">Alle Kalenderwochen {a.kw.jahr}</h2>
        <KwTabelle jahr={a.kw.jahr} heute={a.heute} />
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">So wird die Kalenderwoche gezählt</h2>
          <Prosa text={KW_TEXT} className="max-w-text max-lg:mt-5 lg:col-span-7 lg:col-start-6" />
        </div>
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">Häufige Fragen</h2>
          <div className="lg:col-span-8">
            <FaqListe faq={KW_FAQ} />
          </div>
        </div>
      </section>
    </>
  );
}
