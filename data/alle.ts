import type { TafelZeile } from "@/components/Tafel";
import { type Countdown, type Kategorie, stand } from "@/lib/countdown";
import { datumTagMonat } from "@/lib/format";
import { STAMM } from "./countdowns";
import { alleFeiertageLandCountdowns } from "./feiertage-land-seiten";
import { alleFerienCountdowns, alleFerienLandCountdowns, alleSchulanfangCountdowns } from "./ferien";

/** Jeder Countdown der Seite, egal unter welchem Pfad. */
let alle: Countdown[] | null = null;

export function alleCountdowns(): Countdown[] {
  alle ??= [
    ...STAMM,
    ...alleFeiertageLandCountdowns(),
    ...alleFerienCountdowns(), ...alleFerienLandCountdowns(), ...alleSchulanfangCountdowns(),
  ];
  return alle;
}

let index: Map<string, Countdown> | null = null;

export function nachPfad(pfad: string): Countdown | undefined {
  if (!index) index = new Map(alleCountdowns().map((c) => [c.pfad, c]));
  return index.get(pfad);
}

export const KATEGORIE_NAME: Record<Kategorie, string> = {
  feiertage: "Feiertag",
  ferien: "Ferien",
  jahreszeiten: "Jahreszeit",
  alltag: "Alltag",
  events: "Event",
  schule: "Schule",
  datum: "Datum",
};

function notizVon(c: Countdown, now: Date): string {
  if (c.category === "feiertage" && c.bundesland) {
    return c.zeilen?.(now)[0]?.wert ?? "Feiertage";
  }
  if (c.category === "feiertage") {
    if (c.gesetzlich === "bundesweit") return "gesetzlicher Feiertag";
    if (Array.isArray(c.gesetzlich)) return `Feiertag in ${c.gesetzlich.length} ${c.gesetzlich.length === 1 ? "Land" : "Ländern"}`;
    return "kein Feiertag";
  }
  return KATEGORIE_NAME[c.category];
}

export function tafelZeile(c: Countdown, now: Date, notiz?: string): TafelZeile {
  const s = stand(c, now);
  if (!notiz && c.art === "zeitraum" && s.tageGesamt > 1) {
    notiz = `${s.tageGesamt} Tage, bis ${datumTagMonat(s.ende)}`;
  }
  return {
    pfad: c.pfad,
    titel: c.tafel ?? c.title,
    datum: s.start,
    tage: s.tage,
    phase: s.phase,
    notiz: notiz ?? notizVon(c, now),
  };
}

function sortiert(zeilen: TafelZeile[]): TafelZeile[] {
  return zeilen.sort((a, b) => a.tage - b.tage || a.titel.localeCompare(b.titel, "de"));
}

/** Die nächsten n Ereignisse aus einer Auswahl. */
export function naechste(auswahl: Countdown[], now: Date, n: number): TafelZeile[] {
  return sortiert(auswahl.map((c) => tafelZeile(c, now))).slice(0, n);
}

/** Verwandte Countdowns: erst die ausdrücklich genannten, dann Auffüllen aus derselben Kategorie. */
export function verwandte(c: Countdown, now: Date, n = 7): TafelZeile[] {
  const gewaehlt: Countdown[] = [];
  for (const pfad of c.related) {
    const r = nachPfad(pfad);
    if (r && r.pfad !== c.pfad && !gewaehlt.includes(r)) gewaehlt.push(r);
  }
  if (gewaehlt.length < n) {
    const rest = alleCountdowns()
      .filter((k) => k.category === c.category && k.pfad !== c.pfad && !gewaehlt.includes(k))
      .map((k) => ({ k, tage: stand(k, now).tage }))
      .sort((a, b) => a.tage - b.tage);
    for (const { k } of rest) {
      if (gewaehlt.length >= n) break;
      gewaehlt.push(k);
    }
  }
  return sortiert(gewaehlt.slice(0, n).map((k) => tafelZeile(k, now)));
}
