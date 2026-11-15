"use client";

import { useEffect, useState } from "react";
import { monatName, wochentagName } from "@/lib/format";
import { kalenderwoche } from "@/lib/kw";
import { tageDiff, tageImJahr, tagImJahr, tagVon } from "@/lib/zeit";

/** Das heutige Kalenderblatt auf der Startseite: Tageszahl groß, daneben die Eckdaten. */
export function HeuteBlatt({ serverNow }: { serverNow: number }) {
  const [jetzt, setJetzt] = useState(serverNow);
  useEffect(() => {
    setJetzt(Date.now());
    const t = setInterval(() => setJetzt(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);
  const heute = tagVon(new Date(jetzt));
  const kw = kalenderwoche(heute);
  const rest = tageDiff(heute, { y: heute.y, m: 12, d: 31 });
  return (
    <div suppressHydrationWarning>
      <p className="flex items-end gap-x-3">
        <span className="zahl zahl-klein" suppressHydrationWarning>
          {heute.d}
        </span>
        <span className="display text-kopf pb-1" suppressHydrationWarning>
          {monatName(heute.m)}
          <span className="block text-ink-soft">{heute.y}</span>
        </span>
      </p>
      <hr className="perforation mt-4" />
      <dl className="fahrplan">
        <div>
          <dt>Wochentag</dt>
          <dd suppressHydrationWarning>{wochentagName(heute)}</dd>
        </div>
        <div>
          <dt>Kalenderwoche</dt>
          <dd suppressHydrationWarning>KW {kw.kw}</dd>
        </div>
        <div className="max-lg:hidden">
          <dt>Tag im Jahr</dt>
          <dd suppressHydrationWarning>
            {tagImJahr(heute)} von {tageImJahr(heute.y)}
          </dd>
        </div>
        <div className="max-lg:hidden">
          <dt>Bis zum Jahresende</dt>
          <dd suppressHydrationWarning>
            {rest} {rest === 1 ? "Tag" : "Tage"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
