import Link from "next/link";
import type { ReactNode } from "react";
import { datumLang, tausender, wochentagName } from "@/lib/format";
import type { Tag } from "@/lib/zeit";

export type UebersichtZeile = {
  pfad?: string;
  titel: string;
  datum: Tag;
  ende?: Tag | null;
  tage: number;
  phase: "vor" | "heute" | "laeuft";
  extra?: ReactNode;
};

/** Übersichtstabelle auf Hub-Seiten: Name, Datum, Wochentag, Zusatz, Abstand. */
export function Uebersicht({
  titel,
  zeilen,
  spalteName = "Tag",
  spalteExtra,
  ersteMarkieren = false,
}: {
  titel: string;
  zeilen: UebersichtZeile[];
  spalteName?: string;
  spalteExtra?: string;
  /** Den nächsten Termin (erste Zeile) in Orchid hervorheben. Nur bei zeitlich sortierten Tabellen. */
  ersteMarkieren?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="tabelle">
        <caption className="sr-only">{titel}</caption>
        <thead>
          <tr>
            <th scope="col">{spalteName}</th>
            <th scope="col">Datum</th>
            <th scope="col" className="max-md:hidden">
              Wochentag
            </th>
            {spalteExtra && (
              <th scope="col" className="max-lg:hidden">
                {spalteExtra}
              </th>
            )}
            <th scope="col" className="rechts">
              Noch
            </th>
          </tr>
        </thead>
        <tbody>
          {zeilen.map((z, i) => (
            <tr key={`${z.pfad ?? z.titel}-${z.datum.y}${z.datum.m}${z.datum.d}`}>
              <th scope="row" className="display text-zeile text-ink">
                {z.pfad ? (
                  <Link href={z.pfad} className="link-still">
                    {z.titel}
                  </Link>
                ) : (
                  z.titel
                )}
              </th>
              <td className="mono text-daten whitespace-nowrap">
                {datumLang(z.datum)}
                {z.ende ? <span className="max-sm:block"> bis {datumLang(z.ende)}</span> : null}
              </td>
              <td className="max-md:hidden">{wochentagName(z.datum)}</td>
              {spalteExtra && <td className="text-klein max-lg:hidden">{z.extra}</td>}
              <td className="mono text-daten rechts whitespace-nowrap">
                {z.phase === "vor" ? (
                  ersteMarkieren && i === 0 ? (
                    <span className="font-medium text-orchid-deep">
                      {tausender(z.tage)} {z.tage === 1 ? "Tag" : "Tage"}
                    </span>
                  ) : (
                    `${tausender(z.tage)} ${z.tage === 1 ? "Tag" : "Tage"}`
                  )
                ) : (
                  <span className="font-medium text-orchid-deep">{z.phase === "heute" ? "heute" : "läuft"}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
