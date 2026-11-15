"use client";

import { useJetzt } from "@/hooks/useJetzt";
import { einheiten } from "@/lib/countdown";
import { eineStelle, tausender } from "@/lib/format";
import { tagNr, tagVon } from "@/lib/zeit";
import type { Termin } from "./Zaehler";

/**
 * Der Einheiten-Block im Fahrplan-Stil: dieselbe Spanne in Wochen, Stunden, Minuten …
 * Erscheint nur, solange der Termin noch bevorsteht. Am Tag selbst und während eines
 * Zeitraums verschwindet er samt Überschrift.
 */
export function EinheitenListe({ serverNow, termine }: { serverNow: number; termine: Termin[] }) {
  const jetzt = new Date(useJetzt(serverNow));
  const heuteNr = tagNr(tagVon(jetzt));
  // Dasselbe Vorkommen wie im Zähler: das erste, das noch nicht vorbei ist.
  const termin = termine.find((t) => tagNr(tagVon(new Date(t.ende))) >= heuteNr);
  if (!termin || tagNr(tagVon(new Date(termin.start))) <= heuteNr) return null;
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
    <>
      <h2 className="mono text-fein mt-8 mb-1 font-medium normal-case tracking-normal text-ink-soft">
        Dieselbe Strecke in anderen Einheiten
      </h2>
      <dl className="fahrplan border-t border-ink">
        {zeilen.map(([label, wert]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd className="display text-zeile">{wert}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
