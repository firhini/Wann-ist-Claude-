import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountdownSeite, termineVon } from "@/components/CountdownSeite";
import { naechste } from "@/data/alle";
import { STAMM } from "@/data/countdowns";
import { startTafel } from "@/data/start";
import {
  ALLE_DATEN,
  datumAusSlug,
  datumCountdown,
  datumName,
  datumPfad,
  datumSlug,
  naechstesVorkommen,
  tagDanach,
  tagDavor,
} from "@/data/tage";
import { einheiten, stand } from "@/lib/countdown";
import { datumLang, monatName } from "@/lib/format";
import { metadaten } from "@/lib/seo";
import { beschreibung, seitenTitel } from "@/lib/texte";
import { iso, tageDiff, tagNr, tagVon } from "@/lib/zeit";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ALLE_DATEN.map((x) => ({ datum: datumSlug(x) }));
}

type Props = { params: Promise<{ datum: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { datum } = await params;
  const x = datumAusSlug(datum);
  if (!x) return {};
  const c = datumCountdown(x);
  const now = new Date();
  const s = stand(c, now);
  const folge = termineVon(c, now)[1];
  return metadaten({
    titel: seitenTitel(c, s),
    beschreibung: beschreibung(c, s, einheiten(now, s.startZeit), folge ? tagVon(new Date(folge.start)) : null),
    pfad: c.pfad,
    og: { t: datumName(x), d: iso(s.start) },
  });
}

export default async function Seite({ params }: Props) {
  const { datum } = await params;
  const x = datumAusSlug(datum);
  if (!x) notFound();
  const c = datumCountdown(x);
  const now = new Date();
  const ziel = naechstesVorkommen(x, now);
  const davor = tagDavor(x);
  const danach = tagDanach(x);

  // Feste rund um dieses Datum, im Jahr des nächsten Vorkommens.
  const umfeld = STAMM.filter((k) => k.category === "feiertage" || k.category === "jahreszeiten")
    .map((k) => ({ k, t: k.datumImJahr?.(ziel.y) ?? null }))
    .filter((e): e is { k: (typeof STAMM)[number]; t: NonNullable<ReturnType<NonNullable<(typeof STAMM)[number]["datumImJahr"]>>> } => e.t !== null)
    .map((e) => ({ ...e, abstand: tageDiff(ziel, e.t) }))
    .sort((a, b) => Math.abs(a.abstand) - Math.abs(b.abstand))
    .slice(0, 8)
    .sort((a, b) => tagNr(a.t) - tagNr(b.t));

  return (
    <CountdownSeite
      c={c}
      now={now}
      textTitel={`Der ${datumName(x)} im Kalender`}
      krumen={[
        { name: "Start", pfad: "/" },
        { name: "Tage bis", pfad: "/tage-bis" },
        { name: datumName(x), pfad: c.pfad },
      ]}
      tafel={{ titel: "Nächste Abfahrten", zeilen: naechste(startTafel(), now, 7) }}
      zusatz={
        <>
          <section className="blatt mt-abschnitt">
            <h2 className="text-kopf mb-5">
              Rund um den {datumName(x)} {ziel.y}
            </h2>
            <div className="overflow-x-auto">
              <table className="tabelle">
                <caption className="sr-only">
                  Feste und Feiertage in zeitlicher Nähe zum {datumLang(ziel)}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Fest</th>
                    <th scope="col">Datum</th>
                    <th scope="col" className="rechts">
                      Abstand zum {x.d}.{x.m}.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {umfeld.map(({ k, t, abstand }) => (
                    <tr key={k.pfad}>
                      <th scope="row" className="display text-zeile text-ink">
                        <Link href={k.pfad} className="link-still">
                          {k.title}
                        </Link>
                      </th>
                      <td className="mono text-daten whitespace-nowrap">{datumLang(t)}</td>
                      <td className="mono text-daten rechts whitespace-nowrap">
                        {abstand === 0 ? (
                          <span className="font-medium text-orchid-deep">am selben Tag</span>
                        ) : abstand > 0 ? (
                          `${abstand} ${abstand === 1 ? "Tag" : "Tage"} danach`
                        ) : (
                          `${-abstand} ${abstand === -1 ? "Tag" : "Tage"} davor`
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <nav className="blatt mt-12" aria-label="Benachbarte Tage">
            <ul className="mono text-daten grid border-t border-b border-ink sm:grid-cols-3">
              <li className="border-ink py-3 max-sm:border-b sm:border-r sm:pr-4">
                <Link href={datumPfad(davor)} className="link-still inline-block py-2">
                  ‹ Tage bis zum {datumName(davor)}
                </Link>
              </li>
              <li className="border-ink py-3 max-sm:border-b sm:border-r sm:px-4 sm:text-center">
                <Link href={`/tage-bis#${monatName(x.m).toLowerCase().replace("ä", "ae")}`} className="link-still inline-block py-2">
                  Alle Tage im {monatName(x.m)}
                </Link>
              </li>
              <li className="py-3 sm:pl-4 sm:text-right">
                <Link href={datumPfad(danach)} className="link-still inline-block py-2">
                  Tage bis zum {datumName(danach)} ›
                </Link>
              </li>
            </ul>
          </nav>
        </>
      }
    />
  );
}
