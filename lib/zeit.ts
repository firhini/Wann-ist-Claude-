import { TZDate } from "@date-fns/tz";

/**
 * Alles rund um Kalendertage in Europe/Berlin.
 *
 * Grundsatz: Ein `Tag` ist ein Kalendertag in Berliner Ortszeit (kein Zeitpunkt).
 * Ein `Date` ist immer ein exakter Zeitpunkt. Wir rechnen nie mit der Zeitzone
 * des Servers, sondern wandeln jeden Zeitpunkt ausdrücklich nach Berlin um.
 */
export const TZ = "Europe/Berlin";

export type Tag = { y: number; m: number; d: number };

export type Teile = Tag & {
  h: number;
  mi: number;
  s: number;
  /** 0 = Sonntag … 6 = Samstag */
  wt: number;
};

/** Zeitpunkt für eine Berliner Ortszeit. Monat 1–12. */
export function berlin(y: number, m: number, d: number, h = 0, mi = 0, s = 0): Date {
  return new Date(new TZDate(y, m - 1, d, h, mi, s, TZ).getTime());
}

/** Zerlegt einen Zeitpunkt in Berliner Ortszeit. */
export function teile(date: Date): Teile {
  const z = new TZDate(date.getTime(), TZ);
  return {
    y: z.getFullYear(),
    m: z.getMonth() + 1,
    d: z.getDate(),
    h: z.getHours(),
    mi: z.getMinutes(),
    s: z.getSeconds(),
    wt: z.getDay(),
  };
}

/** Berliner Kalendertag eines Zeitpunkts. */
export function tagVon(date: Date): Tag {
  const { y, m, d } = teile(date);
  return { y, m, d };
}

/** Fortlaufende Tagesnummer (Tage seit 1970-01-01), unabhängig von Zeitzonen. */
export function tagNr(t: Tag): number {
  return Math.round(Date.UTC(t.y, t.m - 1, t.d) / 86_400_000);
}

export function tagAusNr(nr: number): Tag {
  const u = new Date(nr * 86_400_000);
  return { y: u.getUTCFullYear(), m: u.getUTCMonth() + 1, d: u.getUTCDate() };
}

export function tag(y: number, m: number, d: number): Tag {
  // Normalisiert Überläufe (z. B. 32. Januar → 1. Februar).
  return tagAusNr(tagNr({ y, m, d }));
}

export function plusTage(t: Tag, n: number): Tag {
  return tagAusNr(tagNr(t) + n);
}

/** Kalendertage von a bis b (b − a). */
export function tageDiff(a: Tag, b: Tag): number {
  return tagNr(b) - tagNr(a);
}

/** Kalendertage zwischen zwei Zeitpunkten in Berliner Ortszeit. */
export function tageZwischen(von: Date, bis: Date): number {
  return tageDiff(tagVon(von), tagVon(bis));
}

/** 0 = Sonntag … 6 = Samstag */
export function wochentag(t: Tag): number {
  return new Date(Date.UTC(t.y, t.m - 1, t.d)).getUTCDay();
}

/** Mitternacht (Tagesbeginn) eines Berliner Kalendertags als Zeitpunkt. */
export function mitternacht(t: Tag): Date {
  return berlin(t.y, t.m, t.d);
}

/** Beginn des folgenden Berliner Kalendertags. */
export function naechsteMitternacht(now: Date): Date {
  return mitternacht(plusTage(tagVon(now), 1));
}

export function gleicherTag(a: Tag, b: Tag): boolean {
  return a.y === b.y && a.m === b.m && a.d === b.d;
}

export function istSchaltjahr(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

export function tageImJahr(y: number): number {
  return istSchaltjahr(y) ? 366 : 365;
}

export function tageImMonat(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/** Laufende Nummer des Tages im Jahr, 1. Januar = 1. */
export function tagImJahr(t: Tag): number {
  return tagNr(t) - tagNr({ y: t.y, m: 1, d: 1 }) + 1;
}

/** n-ter Wochentag eines Monats, z. B. 2. Sonntag im Mai: nterWochentag(y, 5, 0, 2). */
export function nterWochentag(y: number, m: number, wt: number, n: number): Tag {
  const erster = { y, m, d: 1 };
  const versatz = (wt - wochentag(erster) + 7) % 7;
  return tag(y, m, 1 + versatz + (n - 1) * 7);
}

/** Letzter Wochentag eines Monats, z. B. letzter Sonntag im März. */
export function letzterWochentag(y: number, m: number, wt: number): Tag {
  const letzter = { y, m, d: tageImMonat(y, m) };
  const zurueck = (wochentag(letzter) - wt + 7) % 7;
  return plusTage(letzter, -zurueck);
}

/** Der Wochentag `wt` am oder vor dem angegebenen Tag. */
export function wochentagAmOderVor(t: Tag, wt: number): Tag {
  return plusTage(t, -((wochentag(t) - wt + 7) % 7));
}

/** Der Wochentag `wt` am oder nach dem angegebenen Tag. */
export function wochentagAmOderNach(t: Tag, wt: number): Tag {
  return plusTage(t, (wt - wochentag(t) + 7) % 7);
}

export function iso(t: Tag): string {
  return `${t.y}-${String(t.m).padStart(2, "0")}-${String(t.d).padStart(2, "0")}`;
}

export function ausIso(s: string): Tag {
  const teil = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!teil) throw new Error(`Kein ISO-Datum: ${s}`);
  return { y: Number(teil[1]), m: Number(teil[2]), d: Number(teil[3]) };
}

/** Wie viele Samstage (= Wochenenden) liegen in (heute, ziel]? */
export function wochenendenBis(heute: Tag, ziel: Tag): number {
  const a = tagNr(heute);
  const b = tagNr(ziel);
  if (b <= a) return 0;
  // Erster Samstag nach heute
  const ersterSa = a + ((6 - wochentag(heute) + 7) % 7 || 7);
  if (ersterSa > b) return 0;
  return Math.floor((b - ersterSa) / 7) + 1;
}

/** Werktage Mo–Fr in (heute, ziel), ohne Feiertagsprüfung. */
export function arbeitstageBis(heute: Tag, ziel: Tag): number {
  let n = 0;
  for (let i = tagNr(heute) + 1; i < tagNr(ziel); i++) {
    const wt = wochentag(tagAusNr(i));
    if (wt !== 0 && wt !== 6) n++;
  }
  return n;
}
