"use client";

import { useEffect, useState } from "react";
import { tageImJahr, tagImJahr, tagVon } from "@/lib/zeit";

/**
 * Der Balken am Seitenkopf ist das Jahr, die Marke in Orchid ist heute.
 * Am 1. Januar sitzt sie ganz links, an Silvester ganz rechts.
 */
export function Jahresleiste({ serverNow }: { serverNow: number }) {
  const [jetzt, setJetzt] = useState(serverNow);
  useEffect(() => {
    setJetzt(Date.now());
    const t = setInterval(() => setJetzt(Date.now()), 600_000);
    return () => clearInterval(t);
  }, []);
  const heute = tagVon(new Date(jetzt));
  const anteil = ((tagImJahr(heute) - 0.5) / tageImJahr(heute.y)) * 100;
  return (
    <div className="jahresleiste" aria-hidden="true">
      <span className="jahresmarke" style={{ left: `${anteil.toFixed(2)}%` }} suppressHydrationWarning />
    </div>
  );
}
