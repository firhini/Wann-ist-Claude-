"use client";

import { useEffect, useState } from "react";
import { datumKurz, wochentagKurz } from "@/lib/format";
import { kalenderwoche } from "@/lib/kw";
import { tagVon } from "@/lib/zeit";

/** Datum und Kalenderwoche im Seitenkopf. Bleibt auch auf zwischengespeicherten Seiten aktuell. */
export function HeuteZeile({ serverNow }: { serverNow: number }) {
  const [jetzt, setJetzt] = useState(serverNow);
  useEffect(() => {
    setJetzt(Date.now());
    const t = setInterval(() => setJetzt(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);
  const heute = tagVon(new Date(jetzt));
  return (
    <p className="mono text-fein whitespace-nowrap" suppressHydrationWarning>
      {wochentagKurz(heute)} {datumKurz(heute)} · KW {kalenderwoche(heute).kw}
    </p>
  );
}
