import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HubKopf } from "@/components/HubKopf";
import { JsonLd } from "@/components/JsonLd";
import { KwTabelle } from "@/components/KwTabelle";
import { KW_JAHRE } from "@/data/kalenderwoche";
import { datumLang, datumMitWochentag, wochentagName } from "@/lib/format";
import { kalenderwoche, montagDerKw, wochenImJahr } from "@/lib/kw";
import { type Krume, metadaten, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { istSchaltjahr, plusTage, tagVon } from "@/lib/zeit";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return KW_JAHRE.map((jahr) => ({ jahr: String(jahr) }));
}

type Props = { params: Promise<{ jahr: string }> };

function daten(jahr: number) {
  const wochen = wochenImJahr(jahr);
  const ersterMontag = montagDerKw(jahr, 1);
  const letzterSonntag = plusTage(montagDerKw(jahr, wochen), 6);
  const neujahr = { y: jahr, m: 1, d: 1 };
  const silvester = { y: jahr, m: 12, d: 31 };
  return { wochen, ersterMontag, letzterSonntag, neujahr, silvester };
}

function satz(jahr: number): string {
  const d = daten(jahr);
  return `Das Jahr ${jahr} hat ${d.wochen} Kalenderwochen. Die KW 1 beginnt am ${datumMitWochentag(d.ersterMontag)}, die KW ${d.wochen} endet am ${datumMitWochentag(d.letzterSonntag)}.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { jahr } = await params;
  const j = Number(jahr);
  if (!KW_JAHRE.includes(j)) return {};
  return metadaten({
    titel: `Kalenderwochen ${j}: alle ${wochenImJahr(j)} KW mit Datum`,
    beschreibung: `${satz(j)} Alle Wochen mit Montag, Sonntag und bundesweiten Feiertagen.`,
    pfad: `/kalenderwoche/${j}`,
    og: { t: `Kalenderwochen ${j}`, z: String(wochenImJahr(j)), e: "Wochen" },
  });
}

export default async function Seite({ params }: Props) {
  const { jahr } = await params;
  const j = Number(jahr);
  if (!KW_JAHRE.includes(j)) notFound();
  const now = new Date();
  const heute = tagVon(now);
  const d = daten(j);
  const kwNeujahr = kalenderwoche(d.neujahr);
  const kwSilvester = kalenderwoche(d.silvester);
  const pfad = `/kalenderwoche/${j}`;
  const krumen: Krume[] = [
    { name: "Start", pfad: "/" },
    { name: "Kalenderwoche", pfad: "/kalenderwoche" },
    { name: String(j), pfad },
  ];
  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({ titel: `Kalenderwochen ${j}`, beschreibung: satz(j), pfad, geaendert: now }),
          schemaKrumen(krumen),
        ]}
      />
      <HubKopf
        krumen={krumen}
        h1={`Kalenderwochen ${j}`}
        zeilenTitel={`Das Jahr ${j}`}
        zeilen={[
          { label: "Kalenderwochen", wert: String(d.wochen) },
          { label: "Tage", wert: istSchaltjahr(j) ? "366 (Schaltjahr)" : "365" },
          { label: "1. Januar", wert: `${wochentagName(d.neujahr)}, KW ${kwNeujahr.kw}${kwNeujahr.jahr !== j ? ` (${kwNeujahr.jahr})` : ""}` },
          { label: "31. Dezember", wert: `${wochentagName(d.silvester)}, KW ${kwSilvester.kw}${kwSilvester.jahr !== j ? ` (${kwSilvester.jahr})` : ""}` },
        ]}
      >
        <p>
          <strong className="font-semibold">{satz(j)}</strong>{" "}
          {kwNeujahr.jahr !== j
            ? `Der 1. Januar ${j} gehört noch zur KW ${kwNeujahr.kw} des Vorjahres.`
            : `Der 1. Januar ${j} liegt in KW 1.`}
        </p>
      </HubKopf>

      <section className="blatt mt-12">
        <h2 className="text-kopf mb-5">Alle Kalenderwochen {j}</h2>
        <KwTabelle jahr={j} heute={heute} mitFeiertagen />
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">Das Jahr {j} in Wochen</h2>
          <div className="prosa max-w-text max-lg:mt-5 lg:col-span-7 lg:col-start-6">
            <p>
              {j} beginnt an einem {wochentagName(d.neujahr)} und endet an einem {wochentagName(d.silvester)}.{" "}
              {d.wochen === 53
                ? `Weil der erste Donnerstag des Jahres früh liegt und der letzte spät, kommt ${j} auf 53 Kalenderwochen. Das passiert nur etwa alle fünf bis sechs Jahre.`
                : `Wie die meisten Jahre hat ${j} 52 Kalenderwochen.`}{" "}
              Die erste Woche läuft vom {datumLang(d.ersterMontag)} bis zum {datumLang(plusTage(d.ersterMontag, 6))}.
            </p>
            <p>
              Gezählt wird nach ISO 8601: Wochen beginnen am Montag, und die KW 1 ist die Woche mit dem ersten
              Donnerstag des Jahres. Deshalb können die ersten Januartage noch zur letzten Woche des Vorjahres
              gehören und die letzten Dezembertage schon zur ersten Woche des Folgejahres.
            </p>
            <p>
              Andere Jahre:{" "}
              {KW_JAHRE.filter((x) => x !== j).map((x, i, alle) => (
                <span key={x}>
                  <Link href={`/kalenderwoche/${x}`}>Kalenderwochen {x}</Link>
                  {i < alle.length - 1 ? ", " : "."}
                </span>
              ))}{" "}
              Die laufende Woche steht unter <Link href="/kalenderwoche">Welche KW haben wir?</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
