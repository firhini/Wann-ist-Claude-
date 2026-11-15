import { type Tag, plusTage, tagNr, wochentag } from "./zeit";

/**
 * Kalenderwochen nach ISO 8601 (in Deutschland: DIN ISO 8601).
 * Die Woche beginnt am Montag. KW 1 ist die Woche mit dem ersten Donnerstag des Jahres.
 */
export type Kalenderwoche = { kw: number; jahr: number };

export function kalenderwoche(t: Tag): Kalenderwoche {
  // Donnerstag derselben Woche bestimmt das Wochenjahr.
  const wt = (wochentag(t) + 6) % 7; // Mo = 0 … So = 6
  const donnerstag = plusTage(t, 3 - wt);
  const ersterJan = { y: donnerstag.y, m: 1, d: 1 };
  const kw = Math.floor((tagNr(donnerstag) - tagNr(ersterJan)) / 7) + 1;
  return { kw, jahr: donnerstag.y };
}

/** Montag der Kalenderwoche. */
export function montagDerKw(jahr: number, kw: number): Tag {
  const vierterJan = { y: jahr, m: 1, d: 4 }; // liegt immer in KW 1
  const wt = (wochentag(vierterJan) + 6) % 7;
  const montagKw1 = plusTage(vierterJan, -wt);
  return plusTage(montagKw1, (kw - 1) * 7);
}

/** 52 oder 53 Wochen. */
export function wochenImJahr(jahr: number): number {
  return kalenderwoche({ y: jahr, m: 12, d: 28 }).kw; // der 28.12. liegt immer in der letzten KW
}

export function montagDerWoche(t: Tag): Tag {
  return plusTage(t, -((wochentag(t) + 6) % 7));
}
