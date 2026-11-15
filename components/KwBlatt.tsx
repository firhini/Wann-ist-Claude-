"use client";

import { useJetzt } from "@/hooks/useJetzt";
import { kalenderwoche, montagDerWoche } from "@/lib/kw";
import { mitternacht, plusTage, tagVon } from "@/lib/zeit";
import { Uhr } from "./Zaehler";

/** Die aktuelle Kalenderwoche groß, darunter die Uhr bis zum nächsten Montag. */
export function KwBlatt({ serverNow }: { serverNow: number }) {
  const jetztMs = useJetzt(serverNow);
  const heute = tagVon(new Date(jetztMs));
  const kw = kalenderwoche(heute);
  const naechsterMontag = plusTage(montagDerWoche(heute), 7);
  const folge = kalenderwoche(naechsterMontag);
  const rest = mitternacht(naechsterMontag).getTime() - jetztMs;
  return (
    <div>
      <p className="zahl-reihe" data-stellen="2">
        <span className="sr-only">Kalenderwoche </span>
        <span className="zahl" aria-live="polite" aria-atomic="true" data-testid="tageszahl">
          {kw.kw}
        </span>
        <span className="zahl-einheit" aria-hidden="true">
          KW
        </span>
      </p>
      <hr className="perforation mt-5 mb-5" />
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Uhr ms={rest} mitTagen />
        <p className="mono text-fein text-ink-soft">bis KW {folge.kw} beginnt.</p>
      </div>
    </div>
  );
}
