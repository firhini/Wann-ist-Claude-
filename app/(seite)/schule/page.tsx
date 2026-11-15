import type { Metadata } from "next";
import Link from "next/link";
import { HubKopf } from "@/components/HubKopf";
import { JsonLd } from "@/components/JsonLd";
import { Uebersicht, type UebersichtZeile } from "@/components/Uebersicht";
import { BUNDESLAENDER } from "@/data/bundeslaender";
import { KMK_UEBERSICHT, schulanfaenge } from "@/data/ferien";
import { datumLang, datumMitWochentag, plural, zeitraumKurz } from "@/lib/format";
import { type Krume, metadaten, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { tageDiff, tagNr, tagVon } from "@/lib/zeit";

export const revalidate = 3600;

const PFAD = "/schule";
const KRUMEN: Krume[] = [
  { name: "Start", pfad: "/" },
  { name: "Schule", pfad: PFAD },
];

function daten(now: Date) {
  const heute = tagVon(now);
  const zeilen = BUNDESLAENDER.map((b) => {
    const t = schulanfaenge(b.code).find((e) => tagNr(e.tag) >= tagNr(heute));
    return t ? { b, t } : null;
  })
    .filter((e): e is NonNullable<typeof e> => e !== null)
    .sort((x, y) => tagNr(x.t.tag) - tagNr(y.t.tag) || x.b.name.localeCompare(y.b.name, "de"));
  return { heute, zeilen, erste: zeilen[0], letzte: zeilen[zeilen.length - 1] };
}

function satz(now: Date): string {
  const d = daten(now);
  if (!d.erste || !d.letzte) return "";
  const n = tageDiff(d.heute, d.erste.t.tag);
  return `Nach den Sommerferien ${d.erste.t.jahr} beginnt die Schule zuerst in ${d.erste.b.name}: am ${datumMitWochentag(d.erste.t.tag)}, in ${n} ${plural(n, "Tag", "Tagen")}. Zuletzt startet ${d.letzte.b.name} am ${datumLang(d.letzte.t.tag)}.`;
}

export function generateMetadata(): Metadata {
  const now = new Date();
  const d = daten(now);
  return metadaten({
    titel: `Schulanfang ${d.erste?.t.jahr ?? ""}: erster Schultag in allen Bundesländern`,
    beschreibung: `${satz(now)} Alle 16 Länder mit Datum und Countdown.`,
    pfad: PFAD,
    og: { t: "Wann beginnt die Schule wieder?" },
  });
}

export default function SchuleHub() {
  const now = new Date();
  const d = daten(now);
  const zeilen: UebersichtZeile[] = d.zeilen.map(({ b, t }) => {
    const n = tageDiff(d.heute, t.tag);
    return {
      pfad: `/schule/${b.slug}/schulanfang`,
      titel: b.name,
      datum: t.tag,
      tage: Math.max(0, n),
      phase: n > 0 ? "vor" : "heute",
      extra: (
        <Link href={`/ferien/sommerferien/${b.slug}`} className="link-still">
          Sommerferien {zeitraumKurz(t.ferien.von, t.ferien.bis)}
        </Link>
      ),
    };
  });
  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({ titel: "Schulanfang in allen Bundesländern", beschreibung: satz(now), pfad: PFAD, geaendert: now }),
          schemaKrumen(KRUMEN),
        ]}
      />
      <HubKopf
        krumen={KRUMEN}
        h1="Wann beginnt die Schule wieder?"
        zeilenTitel={`Schulanfang ${d.erste?.t.jahr ?? ""}`}
        zeilen={[
          ...(d.erste ? [{ label: "Frühester Start", wert: `${d.erste.b.name}, ${datumLang(d.erste.t.tag)}` }] : []),
          ...(d.letzte ? [{ label: "Spätester Start", wert: `${d.letzte.b.name}, ${datumLang(d.letzte.t.tag)}` }] : []),
          ...(d.erste && d.letzte
            ? [{ label: "Abstand dazwischen", wert: `${tageDiff(d.erste.t.tag, d.letzte.t.tag)} Tage` }]
            : []),
        ]}
      >
        <p>
          <strong className="font-semibold">{satz(now)}</strong>
        </p>
      </HubKopf>

      <section className="blatt mt-12">
        <h2 className="text-kopf mb-5">Erster Schultag nach den Sommerferien</h2>
        <Uebersicht
          titel="Schulanfang nach den Sommerferien in allen Bundesländern"
          zeilen={zeilen}
          spalteName="Bundesland"
          spalteExtra="Davor"
        />
        <p className="mono text-fein mt-3 max-w-text text-ink-soft">
          Berechnet aus den Sommerferien-Terminen der{" "}
          <a href={KMK_UEBERSICHT.url} rel="noopener" className="link">
            Kultusministerkonferenz
          </a>
          : der erste Tag nach den Ferien, der kein Wochenende und kein Feiertag ist.
        </p>
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">Schulanfang ist nicht gleich Einschulung</h2>
          <div className="prosa max-w-text max-lg:mt-5 lg:col-span-7 lg:col-start-6">
            <p>
              Der Schulanfang ist der erste Unterrichtstag nach den Sommerferien. Weil die Sommerferien gestaffelt
              sind, liegt er je nach Land zwischen Anfang August und Mitte September. Zwischen dem ersten und dem
              letzten Bundesland vergehen rund sechs Wochen.
            </p>
            <p>
              Für Erstklässler gilt ein anderer Termin. Die Einschulung legt jede Grundschule selbst fest, meist
              einige Tage nach dem ersten Schultag, in manchen Ländern traditionell an einem Samstag. Den Termin
              nennt die Schule.
            </p>
            <p>
              Alle Ferien dazwischen stehen in der{" "}
              <Link href="/ferien">Übersicht der Schulferien in allen Bundesländern</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
