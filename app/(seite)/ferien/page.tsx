import type { Metadata } from "next";
import Link from "next/link";
import { FaqListe } from "@/components/FaqListe";
import { HubKopf } from "@/components/HubKopf";
import { JsonLd } from "@/components/JsonLd";
import { BUNDESLAENDER } from "@/data/bundeslaender";
import {
  FERIEN,
  FERIENARTEN,
  FERIEN_ABGERUFEN,
  type FerienartInfo,
  type Ferienzeit,
  KMK_UEBERSICHT,
  aktuelle,
  ferienPfad,
  ferienart,
  ferienzeiten,
  naechsterDurchgang,
  spanneKurz,
} from "@/data/ferien";
import type { Faq } from "@/lib/countdown";
import { datumLang, datumMitWochentag, plural } from "@/lib/format";
import { type Krume, metadaten, schemaFaq, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { nochTage } from "@/lib/texte";
import { ausIso, tageDiff, tagNr, tagVon } from "@/lib/zeit";

export const revalidate = 3600;

const PFAD = "/ferien";
const KRUMEN: Krume[] = [
  { name: "Start", pfad: "/" },
  { name: "Ferien", pfad: PFAD },
];

function daten(now: Date) {
  const heute = tagVon(now);
  const heuteNr = tagNr(heute);
  // Die nächsten Ferien bundesweit: der früheste Beginn eines mehrtägigen Zeitraums, der noch bevorsteht.
  const kommend = FERIEN.filter((f) => tagNr(f.von) > heuteNr && tageDiff(f.von, f.bis) >= 2);
  const naechste = kommend[0];
  const mit = naechste
    ? kommend.filter((f) => f.art === naechste.art && tagNr(f.von) === tagNr(naechste.von)).map((f) => f.land)
    : [];
  const laufend = FERIEN.filter((f) => tagNr(f.von) <= heuteNr && tagNr(f.bis) >= heuteNr);
  // Je Ferienart: frühester und spätester Beginn des nächsten Durchgangs.
  const arten = FERIENARTEN.map((a) => {
    const zeiten: Ferienzeit[] = naechsterDurchgang(a.slug, now).map((e) => e.zeit);
    const sortiert = [...zeiten].sort((x, y) => tagNr(x.von) - tagNr(y.von));
    return { a, laender: zeiten.length, erste: sortiert[0], letzte: sortiert[sortiert.length - 1] };
  })
    .filter((e) => e.erste)
    .sort((x, y) => tagNr(x.erste!.von) - tagNr(y.erste!.von));
  return { heute, naechste, mit, laufend, arten };
}

function name(code: string) {
  return BUNDESLAENDER.find((b) => b.code === code)?.name ?? code;
}
function aufzaehlung(namen: string[]): string {
  if (namen.length <= 1) return namen.join("");
  return `${namen.slice(0, -1).join(", ")} und ${namen[namen.length - 1]}`;
}

function antwort(now: Date) {
  const d = daten(now);
  if (!d.naechste) return { ...d, satz: "Für die kommenden Schuljahre liegen noch keine Termine vor.", n: 0 };
  const art = ferienart(d.naechste.art) as FerienartInfo;
  const n = tageDiff(d.heute, d.naechste.von);
  return {
    ...d,
    n,
    satz: `Als Nächstes beginnen die ${art.name}: am ${datumMitWochentag(d.naechste.von)}, in ${aufzaehlung(d.mit.map(name))}. Das ist in ${n} ${plural(n, "Tag", "Tagen")}.`,
  };
}

export function generateMetadata(): Metadata {
  const now = new Date();
  const a = antwort(now);
  const jahr = tagVon(now).y;
  return metadaten({
    titel: `Schulferien ${jahr} und ${jahr + 1}: Wann sind die nächsten Ferien?`,
    beschreibung: `${a.satz} Alle Ferientermine der 16 Bundesländer aus den Kalendern der Kultusministerkonferenz, mit Countdown.`,
    pfad: PFAD,
    og: a.n > 0 ? { t: "Wann sind die nächsten Ferien?", z: String(a.n), e: a.n === 1 ? "Tag" : "Tage" } : { t: "Wann sind die nächsten Ferien?" },
  });
}

const FAQ: Faq[] = [
  {
    q: "Wer legt die Schulferien fest?",
    a: "Jedes Bundesland selbst. Die Kultusministerkonferenz stimmt die Termine zwischen den Ländern ab und veröffentlicht sie gesammelt. Nur für die Sommerferien gibt es einen gemeinsamen, langfristigen Plan.",
  },
  {
    q: "Wie viele Ferientage gibt es im Schuljahr?",
    a: "75 Werktage, in jedem Bundesland. So steht es im Hamburger Abkommen der Länder von 1964. Gezählt wird von Montag bis Samstag. Wie die Tage auf Herbst, Winter, Ostern, Pfingsten und Sommer verteilt werden, entscheidet jedes Land.",
  },
  {
    q: "Was sind bewegliche Ferientage?",
    a: "Einzelne freie Tage, über die nicht das Land, sondern die Schule entscheidet. Sie liegen oft als Brückentag nach einem Feiertag oder an Rosenmontag. Weil sie von Schule zu Schule verschieden sind, stehen sie in keiner landesweiten Übersicht.",
  },
  {
    q: "Warum hat nicht jedes Land Winter- oder Pfingstferien?",
    a: "Weil jedes Land seine 75 Tage anders verteilt. Bayern und Baden-Württemberg haben lange Pfingstferien und beginnen den Sommer spät. Länder im Norden und Osten haben dafür Winterferien im Februar.",
  },
];

export default function FerienHub() {
  const now = new Date();
  const a = antwort(now);
  const naechsteArt = a.naechste ? (ferienart(a.naechste.art) as FerienartInfo) : null;

  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({ titel: "Schulferien: Wann sind die nächsten Ferien?", beschreibung: a.satz, pfad: PFAD, geaendert: now }),
          schemaKrumen(KRUMEN),
          schemaFaq(FAQ),
        ]}
      />
      <HubKopf
        krumen={KRUMEN}
        h1="Wann sind die nächsten Ferien?"
        zeilenTitel="Die nächsten Ferien, bundesweit"
        zeilen={a.arten.map((e) => {
          const n = tageDiff(a.heute, e.erste!.von);
          return {
            label: e.a.name,
            wert: (
              <Link href={ferienPfad(e.a.slug)} className="link-still">
                {n > 0 ? `ab ${datumLang(e.erste!.von)}` : "laufen"}
              </Link>
            ),
          };
        })}
      >
        <p>
          <strong className="font-semibold">{a.satz}</strong>{" "}
          {a.laufend.length > 0
            ? `Gerade Ferien ${a.laufend.length === 1 ? "hat" : "haben"}: ${aufzaehlung([...new Set(a.laufend.map((f) => name(f.land)))])}.`
            : "Im Moment hat kein Bundesland Ferien."}
        </p>
      </HubKopf>

      <section className="blatt mt-12">
        <h2 className="text-kopf mb-2">Alle Ferien, alle Länder</h2>
        <p className="mb-5 max-w-text">
          Jede Zelle zeigt den nächsten Termin und führt zur Seite mit Countdown. Ein Strich heißt: Diese Ferien gibt
          es in dem Land nicht.
        </p>
        <div className="overflow-x-auto">
          <table className="tabelle matrix">
            <caption className="sr-only">Nächste Ferientermine nach Bundesland und Ferienart</caption>
            <thead>
              <tr>
                <th scope="col">Bundesland</th>
                {FERIENARTEN.map((art) => (
                  <th key={art.slug} scope="col">
                    <Link href={ferienPfad(art.slug)} className="link-still">
                      {art.kurz}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BUNDESLAENDER.map((b) => (
                <tr key={b.code}>
                  <th scope="row" className="font-text text-klein font-semibold whitespace-nowrap normal-case">
                    <Link href={`/ferien/${b.slug}`} className="link-still">
                      {b.name}
                    </Link>
                  </th>
                  {FERIENARTEN.map((art) => {
                    const z = aktuelle(ferienzeiten(art.slug, b.code), now);
                    return (
                      <td key={art.slug} className="mono text-fein whitespace-nowrap">
                        {z ? (
                          <Link
                            href={ferienPfad(art.slug, b.code)}
                            className="link-still"
                            title={`${art.name} ${b.inName}`}
                          >
                            {spanneKurz(z)}
                            <span className="text-ink-soft"> {String(z.von.y).slice(2)}</span>
                          </Link>
                        ) : (
                          <span className="text-ink-soft" aria-label={`keine ${art.name}`}>
                            –
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mono text-fein mt-3 max-w-text text-ink-soft">
          Die kleine Zahl ist das Jahr des Ferienbeginns. Quelle:{" "}
          <a href={KMK_UEBERSICHT.url} rel="noopener" className="link">
            {KMK_UEBERSICHT.label}
          </a>
          , Stand {datumLang(ausIso(FERIEN_ABGERUFEN))}.
        </p>
      </section>

      <section className="blatt mt-abschnitt">
        <h2 className="text-kopf mb-5">Nach Ferienart</h2>
        <ul className="border-t border-ink">
          {a.arten.map((e) => {
            const n = tageDiff(a.heute, e.erste!.von);
            return (
              <li key={e.a.slug} className="grid items-baseline gap-x-6 gap-y-1 border-b border-ink py-4 lg:grid-cols-12">
                <Link href={ferienPfad(e.a.slug)} className="display text-zeile link-still lg:col-span-3">
                  {e.a.name}
                </Link>
                <p className="max-w-text lg:col-span-6">
                  {e.laender} von 16 Ländern. Beginn zwischen {datumLang(e.erste!.von)} ({name(e.erste!.land)}) und{" "}
                  {datumLang(e.letzte!.von)} ({name(e.letzte!.land)}).
                </p>
                <p className="mono text-fein text-ink-soft lg:col-span-3 lg:text-right">
                  {n > 0 ? nochTage(n) : "laufen gerade"}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-5">
          Nach den Sommerferien:{" "}
          <Link href="/schule" className="link">
            Wann beginnt die Schule wieder? Schulanfang in allen Bundesländern
          </Link>
        </p>
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">Sechzehn Länder, sechzehn Kalender</h2>
          <div className="prosa max-w-text max-lg:mt-5 lg:col-span-7 lg:col-start-6">
            <p>
              Schulferien sind in Deutschland Ländersache. Deshalb gibt es keine „deutschen Sommerferien“, sondern
              sechzehn verschiedene. Einheitlich ist nur die Gesamtzahl: 75 Werktage Ferien pro Schuljahr, so
              haben es die Länder 1964 im Hamburger Abkommen vereinbart.
            </p>
            <p>
              {naechsteArt
                ? `Diese Seite zeigt für jedes Land und jede Ferienart den nächsten Termin. Aktuell stehen als Nächstes die ${naechsteArt.name} an.`
                : "Diese Seite zeigt für jedes Land und jede Ferienart den nächsten Termin."}{" "}
              Alle Daten stammen aus den Ferienkalendern der Kultusministerkonferenz für die Schuljahre 2026/27 bis
              2028/29 und aus der langfristigen Sommerferienregelung bis 2030. Wir haben jeden Termin zusätzlich
              maschinell gegengeprüft.
            </p>
            <p>
              Was fehlt, sind die beweglichen Ferientage. Über sie entscheidet jede Schule selbst, und keine
              landesweite Übersicht kann sie kennen. Im Zweifel gilt der Aushang im Schulflur.
            </p>
          </div>
        </div>
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">Häufige Fragen</h2>
          <div className="lg:col-span-8">
            <FaqListe faq={FAQ} />
          </div>
        </div>
      </section>
    </>
  );
}
