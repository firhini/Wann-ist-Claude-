"use client";

import { useEffect, useState } from "react";
import { useJetzt } from "@/hooks/useJetzt";
import { plural, tausender, zweistellig } from "@/lib/format";
import { naechsteMitternacht, tagNr, tagVon } from "@/lib/zeit";
import { Flap } from "./Flap";
import { Konfetti } from "./Konfetti";

export type Termin = {
  /** Exakter Beginn (ms). */
  start: number;
  /** Tagesbeginn des letzten Tages (ms). */
  ende: number;
};

type Props = {
  serverNow: number;
  /** Laufendes oder nächstes Vorkommen, danach das folgende (für den Sprung nach dem Termin). */
  termine: Termin[];
  art: "tag" | "zeitraum";
  /** "bis Weihnachten" */
  bis: string;
  /** "Heute ist Weihnachten." */
  heuteText: string;
  /** "Es sind Sommerferien." */
  laeuftText?: string;
  /** Der Start hat eine Uhrzeit (Anpfiff, eigener Countdown). */
  hatUhrzeit?: boolean;
  /** Einheit des Zeitraums für "Noch 9 Tage Ferien". */
  zeitraumWort?: string;
  /** Satz, wenn der Termin vorbei ist und kein weiterer folgt. */
  vorbeiText?: string;
};

export function Uhr({
  ms,
  mitStunden = true,
  mitTagen = false,
}: {
  ms: number;
  mitStunden?: boolean;
  mitTagen?: boolean;
}) {
  const sek = Math.max(0, Math.floor(ms / 1000));
  const tage = mitTagen ? Math.floor(sek / 86_400) : 0;
  const h = Math.floor((sek - tage * 86_400) / 3600);
  const m = Math.floor((sek % 3600) / 60);
  const s = sek % 60;
  return (
    <span className="uhr flex flex-wrap items-end gap-x-3 gap-y-2" aria-hidden="true">
      {mitTagen && (
        <span className="flex items-end gap-1.5">
          <Flap text={zweistellig(tage)} />
          <span className="mono text-fein pb-1">{tage === 1 ? "Tag" : "Tage"}</span>
        </span>
      )}
      {mitStunden && (
        <span className="flex items-end gap-1.5">
          <Flap text={zweistellig(h)} />
          <span className="mono text-fein pb-1">Std</span>
        </span>
      )}
      <span className="flex items-end gap-1.5">
        <Flap text={zweistellig(m)} />
        <span className="mono text-fein pb-1">Min</span>
      </span>
      <span className="flex items-end gap-1.5">
        <Flap text={zweistellig(s)} akzent />
        <span className="mono text-fein pb-1">Sek</span>
      </span>
    </span>
  );
}

function uhrText(ms: number): string {
  const sek = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(sek / 3600);
  const m = Math.floor((sek % 3600) / 60);
  return `${h} ${plural(h, "Stunde", "Stunden")} und ${m} ${plural(m, "Minute", "Minuten")}`;
}

export function Zaehler({
  serverNow,
  termine,
  art,
  bis,
  heuteText,
  laeuftText,
  hatUhrzeit,
  zeitraumWort,
  vorbeiText,
}: Props) {
  const jetztMs = useJetzt(serverNow);
  const jetzt = new Date(jetztMs);
  const heuteNr = tagNr(tagVon(jetzt));

  const [hydriert, setHydriert] = useState(false);
  useEffect(() => setHydriert(true), []);

  // Das erste Vorkommen, das noch nicht vorbei ist.
  const termin =
    termine.find((t) => tagNr(tagVon(new Date(t.ende))) >= heuteNr) ?? termine[termine.length - 1];
  if (!termin) return null;

  const startNr = tagNr(tagVon(new Date(termin.start)));
  const endeNr = tagNr(tagVon(new Date(termin.ende)));
  const tage = startNr - heuteNr;
  const bisMitternacht = naechsteMitternacht(jetzt).getTime() - jetztMs;

  // ---- Vor dem Termin: Kalendertage zählen ----
  if (tage > 0) {
    const stellen = String(tage).length;
    return (
      <div className="zaehler" data-phase="vor">
        <div className="relative">
          <p className="zahl-reihe" data-stellen={stellen}>
            <span className="sr-only">Noch </span>
            <span className="zahl" aria-live="polite" aria-atomic="true" data-testid="tageszahl">
              {tausender(tage)}
            </span>
            <span className="zahl-einheit">{plural(tage, "Tag", "Tage")}</span>
            <span className="sr-only"> {bis}</span>
          </p>
          <div className="abriss" aria-hidden="true">
            <span className="zahl-reihe" data-stellen={String(tage + 1).length}>
              <span className="zahl">{tausender(tage + 1)}</span>
              <span className="zahl-einheit">Tage</span>
            </span>
          </div>
        </div>
        <hr className="perforation mt-5 mb-5" />
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <Uhr ms={bisMitternacht} />
          <p className="mono text-fein text-ink-soft max-w-[22rem]">
            {tage === 1
              ? "bis Mitternacht. Dann ist es so weit."
              : `bis das nächste Blatt fällt. Dann sind es noch ${tausender(tage - 1)}.`}
          </p>
        </div>
        <p className="sr-only">
          Bis Mitternacht sind es noch {uhrText(bisMitternacht)}.
        </p>
      </div>
    );
  }

  // ---- Am Starttag vor der Startuhrzeit ----
  const bisStart = termin.start - jetztMs;
  if (tage === 0 && hatUhrzeit && bisStart > 0) {
    const stunden = Math.floor(bisStart / 3_600_000);
    const minuten = Math.floor(bisStart / 60_000);
    const gross = stunden >= 1 ? stunden : minuten >= 1 ? minuten : Math.floor(bisStart / 1000);
    const einheit =
      stunden >= 1
        ? plural(stunden, "Stunde", "Stunden")
        : minuten >= 1
          ? plural(minuten, "Minute", "Minuten")
          : "Sekunden";
    return (
      <div className="zaehler" data-phase="gleich">
        <p className="zahl-reihe" data-stellen={String(gross).length}>
          <span className="sr-only">Noch </span>
          <span className="zahl" data-testid="tageszahl">
            {gross}
          </span>
          <span className="zahl-einheit">{einheit}</span>
          <span className="sr-only"> {bis}</span>
        </p>
        <hr className="perforation mt-5 mb-5" />
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <Uhr ms={stunden >= 1 ? bisStart % 3_600_000 : bisStart} mitStunden={false} />
          <p className="mono text-fein text-ink-soft">Heute ist es so weit.</p>
        </div>
      </div>
    );
  }

  // ---- Zeitraum läuft ----
  if (art === "zeitraum" && heuteNr <= endeNr) {
    const gesamt = endeNr - startNr + 1;
    const tagNummer = heuteNr - startNr + 1;
    const rest = endeNr - heuteNr + 1;
    return (
      <div className="zaehler" data-phase="laeuft">
        <p className="display text-plakat">{laeuftText ?? heuteText}</p>
        <p className="zahl-reihe mt-4" data-stellen={String(rest).length}>
          <span className="sr-only">Noch </span>
          <span className="zahl" aria-live="polite" aria-atomic="true" data-testid="tageszahl">
            {rest}
          </span>
          <span className="zahl-einheit">
            {plural(rest, "Tag", "Tage")}
            {zeitraumWort ? <span className="block">{zeitraumWort}</span> : null}
          </span>
        </p>
        <div className="mt-6">
          <div
            className="fortschritt"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={gesamt}
            aria-valuenow={tagNummer}
            aria-label={`Tag ${tagNummer} von ${gesamt}`}
          >
            <span style={{ width: `${Math.round((tagNummer / gesamt) * 100)}%` }} />
          </div>
          <p className="mono text-fein text-ink-soft mt-2">
            Tag {tagNummer} von {gesamt}
          </p>
        </div>
      </div>
    );
  }

  // ---- Heute ----
  if (heuteNr <= endeNr) {
    return (
      <div className="zaehler" data-phase="heute">
        <p className="display text-plakat" aria-live="polite" data-testid="tageszahl">
          {heuteText}
        </p>
        <hr className="perforation mt-6 mb-5" />
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <Uhr ms={bisMitternacht} />
          <p className="mono text-fein text-ink-soft">bleiben vom heutigen Tag.</p>
        </div>
        {hydriert && <Konfetti />}
      </div>
    );
  }

  // ---- Vorbei, kein Folgetermin bekannt ----
  return (
    <div className="zaehler" data-phase="vorbei">
      <p className="display text-plakat">Vorbei.</p>
      <p className="mono text-fein text-ink-soft mt-4">
        {vorbeiText ?? "Ein neuer Termin steht noch nicht fest."}
        {heuteNr - endeNr > 0 ? ` Das war vor ${tausender(heuteNr - endeNr)} ${plural(heuteNr - endeNr, "Tag", "Tagen")}.` : ""}
      </p>
    </div>
  );
}
