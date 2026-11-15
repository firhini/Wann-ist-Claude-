import { type Tag, wochentag } from "./zeit";

export const WOCHENTAGE = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
] as const;

export const WOCHENTAGE_KURZ = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"] as const;

export const MONATE = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
] as const;

/** Monatsnamen für URLs. */
export const MONATE_SLUG = [
  "januar",
  "februar",
  "maerz",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "dezember",
] as const;

export function wochentagName(t: Tag): string {
  return WOCHENTAGE[wochentag(t)] as string;
}

export function wochentagKurz(t: Tag): string {
  return WOCHENTAGE_KURZ[wochentag(t)] as string;
}

export function monatName(m: number): string {
  return MONATE[m - 1] as string;
}

/** „25. Dezember 2026“ */
export function datumLang(t: Tag): string {
  return `${t.d}. ${monatName(t.m)} ${t.y}`;
}

/** „25. Dezember“ */
export function datumOhneJahr(t: Tag): string {
  return `${t.d}. ${monatName(t.m)}`;
}

/** „Freitag, 25. Dezember 2026“ */
export function datumMitWochentag(t: Tag): string {
  return `${wochentagName(t)}, ${datumLang(t)}`;
}

/** „25.12.2026“ */
export function datumKurz(t: Tag): string {
  return `${String(t.d).padStart(2, "0")}.${String(t.m).padStart(2, "0")}.${t.y}`;
}

/** „25.12.“ */
export function datumTagMonat(t: Tag): string {
  return `${String(t.d).padStart(2, "0")}.${String(t.m).padStart(2, "0")}.`;
}

/** „Fr 25.12.“ */
export function datumTafel(t: Tag): string {
  return `${wochentagKurz(t)} ${datumTagMonat(t)}`;
}

/** Zeitraum kompakt: „24.12.2026 bis 08.01.2027“ bzw. „01.08. bis 13.09.2027“. */
export function zeitraumKurz(von: Tag, bis: Tag): string {
  if (von.y === bis.y && von.m === bis.m && von.d === bis.d) return datumKurz(von);
  if (von.y === bis.y) return `${datumTagMonat(von)} bis ${datumKurz(bis)}`;
  return `${datumKurz(von)} bis ${datumKurz(bis)}`;
}

const zahl = new Intl.NumberFormat("de-DE");
const zahl1 = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** 57024 → „57.024“ */
export function tausender(n: number): string {
  return zahl.format(n);
}

/** 5.71 → „5,7“ */
export function eineStelle(n: number): string {
  return zahl1.format(n);
}

/** plural(1, "Tag", "Tage") → „Tag“ */
export function plural(n: number, eins: string, viele: string): string {
  return n === 1 ? eins : viele;
}

/** „1 Tag“, „39 Tage“ */
export function tageText(n: number): string {
  return `${tausender(n)} ${plural(n, "Tag", "Tage")}`;
}

export function zweistellig(n: number): string {
  return String(n).padStart(2, "0");
}

/** „14:30 Uhr“ */
export function uhrzeit(h: number, mi: number): string {
  return `${h}:${zweistellig(mi)} Uhr`;
}
