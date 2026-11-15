import Link from "next/link";
import type { ReactNode } from "react";
import { datumTafel, tausender } from "@/lib/format";
import type { Tag } from "@/lib/zeit";
import { FlapStatisch } from "./FlapStatisch";

export type TafelZeile = {
  pfad: string;
  titel: string;
  datum: Tag;
  tage: number;
  phase: "vor" | "heute" | "laeuft";
  /** Kleine Zusatzangabe, z. B. Kategorie oder Bundesland. */
  notiz?: string;
};

/**
 * Die Abfahrtstafel: invertierter Block, Zeilen statt Karten.
 * Spalten: Datum, Ziel, Notiz, verbleibende Tage in Fallblatt-Kacheln.
 */
export function Tafel({
  titel,
  zeilen,
  ebene = "h2",
  fuss,
  jahrZeigen = false,
}: {
  titel: string;
  zeilen: TafelZeile[];
  ebene?: "h1" | "h2";
  fuss?: ReactNode;
  jahrZeigen?: boolean;
}) {
  const H = ebene;
  return (
    <section className="tafel bg-ink text-paper">
      <div className="blatt py-10 lg:py-14">
        <div className="flex items-end justify-between gap-6 pb-5">
          <H className={ebene === "h1" ? "text-plakat" : "text-kopf"}>{titel}</H>
          <p className="mono text-fein hidden sm:block" aria-hidden="true">
            Datum · Ziel · Noch
          </p>
        </div>
        <ol className="border-t border-paper/30">
          {zeilen.map((z, i) => (
            <li
              key={z.pfad}
              className={`${i === 0 && z.phase === "vor" ? "tafel-erste " : ""}grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-paper/30 py-3 sm:grid-cols-[7.5rem_1fr_auto] lg:grid-cols-[9rem_1fr_14rem_auto] lg:py-3.5`}
            >
              <span className="mono text-daten max-sm:col-start-1 max-sm:row-start-2 max-sm:text-fein">
                {datumTafel(z.datum)}
                {jahrZeigen ? <span className="max-sm:inline sm:block">{" "}{z.datum.y}</span> : null}
              </span>
              <Link
                href={z.pfad}
                className="display text-zeile link-still max-sm:col-start-1 max-sm:row-start-1"
              >
                {z.titel}
              </Link>
              <span className="mono text-fein hidden lg:block">{z.notiz}</span>
              <span className="flex items-center justify-end gap-2 text-zeile max-sm:row-span-2">
                <span className="sr-only">
                  {z.phase === "vor"
                    ? `noch ${tausender(z.tage)} ${z.tage === 1 ? "Tag" : "Tage"}`
                    : z.phase === "heute"
                      ? "heute"
                      : "läuft gerade"}
                </span>
                <span className="flex items-center gap-2" aria-hidden="true">
                  {z.phase === "vor" ? (
                    <>
                      <FlapStatisch text={tausender(z.tage).padStart(2, "0")} />
                      <span className="mono text-fein w-9">{z.tage === 1 ? "Tag" : "Tage"}</span>
                    </>
                  ) : (
                    <FlapStatisch text={z.phase === "heute" ? "HEUTE" : "LÄUFT"} breit />
                  )}
                </span>
              </span>
            </li>
          ))}
        </ol>
        {fuss ? <div className="mono text-fein pt-5">{fuss}</div> : null}
      </div>
    </section>
  );
}
