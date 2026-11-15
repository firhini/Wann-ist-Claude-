import type { Metadata } from "next";
import Link from "next/link";
import { HubKopf } from "@/components/HubKopf";
import { JsonLd } from "@/components/JsonLd";
import { datumPfad, monatsDaten } from "@/data/tage";
import { MONATE, MONATE_SLUG, datumMitWochentag, monatName, wochentagName } from "@/lib/format";
import { kalenderwoche } from "@/lib/kw";
import { type Krume, metadaten, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { tageDiff, tageImJahr, tagImJahr, tagVon } from "@/lib/zeit";

export const revalidate = 3600;

const PFAD = "/tage-bis";
const KRUMEN: Krume[] = [
  { name: "Start", pfad: "/" },
  { name: "Tage bis", pfad: PFAD },
];

export function generateMetadata(): Metadata {
  const heute = tagVon(new Date());
  return metadaten({
    titel: "Tage bis zu einem Datum: Wie viele Tage sind es noch?",
    beschreibung: `Heute ist ${datumMitWochentag(heute)}, Tag ${tagImJahr(heute)} von ${tageImJahr(heute.y)}. Such dir ein Datum aus: Jeder Tag des Jahres hat eine eigene Seite mit Countdown, Wochentag und Kalenderwoche.`,
    pfad: PFAD,
    og: { t: "Wie viele Tage bis …?" },
  });
}

export default function TageBisHub() {
  const now = new Date();
  const heute = tagVon(now);
  const rest = tageDiff(heute, { y: heute.y, m: 12, d: 31 });
  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({
            titel: "Tage bis zu einem Datum",
            beschreibung: "Jeder Tag des Jahres mit Countdown, Wochentag und Kalenderwoche.",
            pfad: PFAD,
            geaendert: now,
          }),
          schemaKrumen(KRUMEN),
        ]}
      />
      <HubKopf
        krumen={KRUMEN}
        h1="Wie viele Tage bis zum …?"
        zeilenTitel="Heute"
        zeilen={[
          { label: "Datum", wert: `${heute.d}. ${monatName(heute.m)} ${heute.y}` },
          { label: "Wochentag", wert: wochentagName(heute) },
          { label: "Tag im Jahr", wert: `${tagImJahr(heute)} von ${tageImJahr(heute.y)}` },
          { label: "Kalenderwoche", wert: `KW ${kalenderwoche(heute).kw}` },
          { label: "Bis Jahresende", wert: `${rest} Tage` },
        ]}
      >
        <p>
          <strong className="font-semibold">
            Jeder Tag des Jahres hat hier eine eigene Seite. Sie zeigt, wie viele Tage es bis dahin noch sind.
          </strong>{" "}
          Dazu den Wochentag in den nächsten Jahren, die Kalenderwoche und was an dem Tag sonst los ist.
        </p>
      </HubKopf>

      <section className="blatt mt-12">
        <h2 className="text-kopf mb-5">Alle 366 Tage</h2>
        <div className="border-t border-ink">
          {MONATE.map((name, i) => (
            <div
              key={name}
              id={MONATE_SLUG[i]}
              className="grid gap-x-6 gap-y-2 border-b border-ink py-4 lg:grid-cols-12"
            >
              <h3 className="text-zeile lg:col-span-2">{name}</h3>
              <ul className="tagesraster mono text-daten lg:col-span-10">
                {monatsDaten(i + 1).map((x) => {
                  const istHeute = x.d === heute.d && x.m === heute.m;
                  return (
                    <li key={x.d}>
                      <Link
                        href={datumPfad(x)}
                        aria-label={`Tage bis zum ${x.d}. ${name}`}
                        aria-current={istHeute ? "date" : undefined}
                        className={`flex h-11 items-center justify-center link-still ${istHeute ? "font-medium text-orchid-deep" : ""}`}
                      >
                        {x.d}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">So wird gezählt</h2>
          <div className="prosa max-w-text max-lg:mt-5 lg:col-span-7 lg:col-start-6">
            <p>
              Gezählt werden Kalendertage in deutscher Zeit. Von heute bis morgen ist es ein Tag, egal ob es gerade
              8 Uhr morgens oder 23 Uhr abends ist. Um Mitternacht springt jede Zahl um eins weiter. So zählt auch
              jeder Wandkalender.
            </p>
            <p>
              Ist ein Datum in diesem Jahr schon vorbei, zählt die Seite bis zum selben Datum im nächsten Jahr. Der
              29. Februar ist die Ausnahme: Ihn gibt es nur in Schaltjahren, und die Seite zählt entsprechend weiter.
            </p>
            <p>
              Wer ein Datum mit Uhrzeit, einen Namen dazu oder ein Jahr weiter in der Zukunft braucht, nimmt den{" "}
              <Link href="/eigener-countdown">eigenen Countdown</Link>. Für feste Anlässe gibt es fertige Seiten: die{" "}
              <Link href="/feiertage">Feiertage</Link>, die <Link href="/ferien">Schulferien</Link> und die{" "}
              <Link href="/kalenderwoche">Kalenderwochen</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
