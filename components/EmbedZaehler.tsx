"use client";

import { useJetzt } from "@/hooks/useJetzt";
import { tausender, zweistellig } from "@/lib/format";
import { naechsteMitternacht, tagNr, tagVon } from "@/lib/zeit";
import type { Termin } from "./Zaehler";

/** Kompakter Zähler für das Widget. */
export function EmbedZaehler({
  serverNow,
  termine,
  heuteText,
  laeuftText,
}: {
  serverNow: number;
  termine: Termin[];
  heuteText: string;
  laeuftText?: string;
}) {
  const jetztMs = useJetzt(serverNow);
  const jetzt = new Date(jetztMs);
  const heuteNr = tagNr(tagVon(jetzt));
  const termin =
    termine.find((t) => tagNr(tagVon(new Date(t.ende))) >= heuteNr) ?? termine[termine.length - 1];
  if (!termin) return null;
  const tage = tagNr(tagVon(new Date(termin.start))) - heuteNr;

  if (tage <= 0) {
    const laeuft = laeuftText && tagNr(tagVon(new Date(termin.ende))) > tagNr(tagVon(new Date(termin.start)));
    return <p className="display embed-wort">{laeuft ? laeuftText : heuteText}</p>;
  }

  const rest = Math.max(0, Math.floor((naechsteMitternacht(jetzt).getTime() - jetztMs) / 1000));
  const h = Math.floor(rest / 3600);
  const m = Math.floor((rest % 3600) / 60);
  const s = rest % 60;
  return (
    <div className="flex items-end justify-between gap-3">
      <p className="flex items-end gap-x-[0.05em]">
        <span className="zahl embed-zahl">{tausender(tage)}</span>
        <span className="zahl-einheit embed-einheit">{tage === 1 ? "Tag" : "Tage"}</span>
      </p>
      <p className="mono text-fein pb-1 text-right" aria-hidden="true">
        {zweistellig(h)}:{zweistellig(m)}:<span className="text-orchid-deep">{zweistellig(s)}</span>
        <span className="block text-ink-soft">bis Mitternacht</span>
      </p>
    </div>
  );
}
