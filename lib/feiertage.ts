import {
  type Tag,
  letzterWochentag,
  nterWochentag,
  plusTage,
  tag,
  wochentagAmOderVor,
} from "./zeit";

/**
 * Bewegliche Feiertage. Alles wird berechnet, nichts ist als Liste hinterlegt.
 */

/**
 * Ostersonntag nach der ergänzten Gauß'schen Osterformel
 * (Gauß 1816, Fassung nach Lichtenberg 1997), gültig im gregorianischen Kalender.
 */
export function ostersonntag(jahr: number): Tag {
  const k = Math.floor(jahr / 100); // Säkularzahl
  const m = 15 + Math.floor((3 * k + 3) / 4) - Math.floor((8 * k + 13) / 25); // säkulare Mondschaltung
  const s = 2 - Math.floor((3 * k + 3) / 4); // säkulare Sonnenschaltung
  const a = jahr % 19; // Mondparameter
  const d = (19 * a + m) % 30; // Keim für den ersten Frühlingsvollmond
  const r = Math.floor((d + Math.floor(a / 11)) / 29); // kalendarische Korrektur
  const og = 21 + d - r; // Ostergrenze
  const sz = 7 - ((jahr + Math.floor(jahr / 4) + s) % 7); // erster Sonntag im März
  const oe = 7 - ((og - sz) % 7); // Entfernung des Ostersonntags von der Ostergrenze
  return tag(jahr, 3, og + oe); // als Märzdatum, 32. März = 1. April
}

const relativZuOstern = (versatz: number) => (jahr: number) => plusTage(ostersonntag(jahr), versatz);

export const weiberfastnacht = relativZuOstern(-52);
export const rosenmontag = relativZuOstern(-48);
export const fastnachtsdienstag = relativZuOstern(-47);
export const aschermittwoch = relativZuOstern(-46);
export const palmsonntag = relativZuOstern(-7);
export const gruendonnerstag = relativZuOstern(-3);
export const karfreitag = relativZuOstern(-2);
export const ostermontag = relativZuOstern(1);
export const christiHimmelfahrt = relativZuOstern(39);
export const pfingstsonntag = relativZuOstern(49);
export const pfingstmontag = relativZuOstern(50);
export const fronleichnam = relativZuOstern(60);

/** Vatertag fällt in Deutschland auf Christi Himmelfahrt. */
export const vatertag = christiHimmelfahrt;

/** Muttertag: zweiter Sonntag im Mai. */
export function muttertag(jahr: number): Tag {
  return nterWochentag(jahr, 5, 0, 2);
}

/** n-ter Advent (1–4). Der 4. Advent ist der letzte Sonntag vor dem 25. Dezember. */
export function advent(jahr: number, n: 1 | 2 | 3 | 4): Tag {
  const vierter = wochentagAmOderVor({ y: jahr, m: 12, d: 24 }, 0);
  return plusTage(vierter, -7 * (4 - n));
}

/** Buß- und Bettag: Mittwoch vor dem 23. November. */
export function bussUndBettag(jahr: number): Tag {
  return wochentagAmOderVor({ y: jahr, m: 11, d: 22 }, 3);
}

/** Totensonntag (Ewigkeitssonntag): Sonntag vor dem 1. Advent. */
export function totensonntag(jahr: number): Tag {
  return plusTage(advent(jahr, 1), -7);
}

/** Volkstrauertag: zwei Sonntage vor dem 1. Advent. */
export function volkstrauertag(jahr: number): Tag {
  return plusTage(advent(jahr, 1), -14);
}

/** Beginn der Sommerzeit: letzter Sonntag im März, 2:00 Uhr MEZ → 3:00 Uhr MESZ. */
export function sommerzeitBeginn(jahr: number): Tag {
  return letzterWochentag(jahr, 3, 0);
}

/** Ende der Sommerzeit: letzter Sonntag im Oktober, 3:00 Uhr MESZ → 2:00 Uhr MEZ. */
export function sommerzeitEnde(jahr: number): Tag {
  return letzterWochentag(jahr, 10, 0);
}

/** Erntedank (evangelisch/üblich): erster Sonntag im Oktober. */
export function erntedank(jahr: number): Tag {
  return nterWochentag(jahr, 10, 0, 1);
}

/** Black Friday: der Freitag nach dem vierten Donnerstag im November (US-Thanksgiving). */
export function blackFriday(jahr: number): Tag {
  return plusTage(nterWochentag(jahr, 11, 4, 4), 1);
}
