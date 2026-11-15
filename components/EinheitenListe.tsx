"use client";

import { useJetzt } from "@/hooks/useJetzt";
import { einheiten } from "@/lib/countdown";
import { eineStelle, tausender } from "@/lib/format";
import { tagNr, tagVon } from "@/lib/zeit";
import type { Termin } from "./Zaehler";

/** Der Einheiten-Block im Fahrplan-Stil: dieselbe Spanne in Wochen, Stunden, Minuten … */
export function EinheitenListe({ serverNow, termine }: { serverNow: number; termine: Termin[] }) {
  const jetzt = new Date(useJetzt(serverNow));
  const heuteNr = tagNr(tagVon(jetzt));
  const termin = termine.find((t) => tagNr(tagVon(new Date(t.start))) > heuteNr);
  if (!termin) return null;
  const e = einheiten(jetzt, new Date(termin.start));
  const zeilen: [string, string][] = [
    ["Wochen", eineStelle(e.wochen)],
    ["Stunden", tausender(e.stunden)],
    ["Minuten", tausender(e.minuten)],
    ["Wochenenden", tausender(e.wochenenden)],
    ["Mal schlafen", tausender(e.naechte)],
    ["Arbeitstage (Mo–Fr)", tausender(e.arbeitstage)],
  ];
  return (
    <dl className="fahrplan">
      {zeilen.map(([label, wert]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd className="display text-zeile">{wert}</dd>
        </div>
      ))}
    </dl>
  );
}
