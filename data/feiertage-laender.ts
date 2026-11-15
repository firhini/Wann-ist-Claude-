import {
  bussUndBettag,
  christiHimmelfahrt,
  fronleichnam,
  karfreitag,
  ostermontag,
  ostersonntag,
  pfingstmontag,
  pfingstsonntag,
} from "@/lib/feiertage";
import { type Tag, gleicherTag, tagNr } from "@/lib/zeit";
import type { BundeslandCode } from "./bundeslaender";

/**
 * Gesetzliche Feiertage in Deutschland nach Bundesland.
 * Grundlage: die Feiertagsgesetze der 16 Länder; der Tag der Deutschen Einheit ist bundesrechtlich
 * geregelt (Einigungsvertrag, Art. 2 Abs. 2). Stand: November 2026.
 */
export type GesetzlicherFeiertag = {
  key: string;
  name: string;
  /** Seite mit dem Countdown, falls vorhanden. */
  pfad?: string;
  datum: (jahr: number) => Tag | null;
  laender: "alle" | BundeslandCode[];
  /** Länder, in denen der Tag nur in Teilen des Landes gilt. */
  teilweise?: Partial<Record<BundeslandCode, string>>;
  hinweis?: string;
};

const festes = (m: number, d: number) => (jahr: number) => ({ y: jahr, m, d });

export const GESETZLICH: GesetzlicherFeiertag[] = [
  { key: "neujahr", name: "Neujahr", pfad: "/neujahr", datum: festes(1, 1), laender: "alle" },
  {
    key: "heilige-drei-koenige",
    name: "Heilige Drei Könige",
    pfad: "/heilige-drei-koenige",
    datum: festes(1, 6),
    laender: ["BW", "BY", "ST"],
  },
  {
    key: "frauentag",
    name: "Internationaler Frauentag",
    pfad: "/frauentag",
    datum: festes(3, 8),
    laender: ["BE", "MV"],
  },
  { key: "karfreitag", name: "Karfreitag", pfad: "/karfreitag", datum: karfreitag, laender: "alle" },
  {
    key: "ostersonntag",
    name: "Ostersonntag",
    pfad: "/ostern",
    datum: ostersonntag,
    laender: ["BB"],
    hinweis: "Nur Brandenburg führt Oster- und Pfingstsonntag ausdrücklich als gesetzliche Feiertage.",
  },
  { key: "ostermontag", name: "Ostermontag", pfad: "/ostermontag", datum: ostermontag, laender: "alle" },
  { key: "tag-der-arbeit", name: "Tag der Arbeit", pfad: "/tag-der-arbeit", datum: festes(5, 1), laender: "alle" },
  {
    key: "christi-himmelfahrt",
    name: "Christi Himmelfahrt",
    pfad: "/christi-himmelfahrt",
    datum: christiHimmelfahrt,
    laender: "alle",
  },
  {
    key: "pfingstsonntag",
    name: "Pfingstsonntag",
    pfad: "/pfingsten",
    datum: pfingstsonntag,
    laender: ["BB"],
  },
  { key: "pfingstmontag", name: "Pfingstmontag", pfad: "/pfingstmontag", datum: pfingstmontag, laender: "alle" },
  {
    key: "fronleichnam",
    name: "Fronleichnam",
    pfad: "/fronleichnam",
    datum: fronleichnam,
    laender: ["BW", "BY", "HE", "NW", "RP", "SL"],
    teilweise: {
      SN: "nur in einigen katholisch geprägten Gemeinden im Landkreis Bautzen",
      TH: "nur im Landkreis Eichsfeld und in einzelnen Gemeinden des Unstrut-Hainich- und des Wartburgkreises",
    },
  },
  {
    key: "einmalig-be-2028",
    name: "75. Jahrestag des Volksaufstands vom 17. Juni 1953",
    datum: (jahr) => (jahr === 2028 ? { y: 2028, m: 6, d: 17 } : null),
    laender: ["BE"],
    hinweis:
      "Einmaliger Feiertag in Berlin (Viertes Gesetz zur Änderung des Gesetzes über die Sonn- und Feiertage vom 10. Juli 2024). Der 17. Juni 2028 ist ein Samstag.",
  },
  {
    key: "mariae-himmelfahrt",
    name: "Mariä Himmelfahrt",
    pfad: "/mariae-himmelfahrt",
    datum: festes(8, 15),
    laender: ["SL"],
    teilweise: {
      BY: "nur in Gemeinden mit überwiegend katholischer Bevölkerung, das ist die große Mehrheit der bayerischen Gemeinden",
    },
  },
  {
    key: "weltkindertag",
    name: "Weltkindertag",
    pfad: "/weltkindertag",
    datum: festes(9, 20),
    laender: ["TH"],
  },
  {
    key: "tag-der-deutschen-einheit",
    name: "Tag der Deutschen Einheit",
    pfad: "/tag-der-deutschen-einheit",
    datum: festes(10, 3),
    laender: "alle",
  },
  {
    key: "reformationstag",
    name: "Reformationstag",
    pfad: "/reformationstag",
    datum: festes(10, 31),
    laender: ["BB", "HB", "HH", "MV", "NI", "SN", "ST", "SH", "TH"],
  },
  {
    key: "allerheiligen",
    name: "Allerheiligen",
    pfad: "/allerheiligen",
    datum: festes(11, 1),
    laender: ["BW", "BY", "NW", "RP", "SL"],
  },
  {
    key: "buss-und-bettag",
    name: "Buß- und Bettag",
    pfad: "/buss-und-bettag",
    datum: bussUndBettag,
    laender: ["SN"],
  },
  { key: "weihnachten-1", name: "1. Weihnachtstag", pfad: "/weihnachten", datum: festes(12, 25), laender: "alle" },
  { key: "weihnachten-2", name: "2. Weihnachtstag", pfad: "/weihnachten", datum: festes(12, 26), laender: "alle" },
];

export type FeiertagImLand = {
  key: string;
  name: string;
  pfad?: string;
  tag: Tag;
  /** Gilt nur in Teilen des Landes. */
  teilweise?: string;
  hinweis?: string;
};

function giltIn(f: GesetzlicherFeiertag, code: BundeslandCode): boolean {
  return f.laender === "alle" || f.laender.includes(code);
}

/** Alle gesetzlichen Feiertage eines Landes in einem Jahr, chronologisch. Mit `mitTeilweise` auch regionale. */
export function feiertageImLand(code: BundeslandCode, jahr: number, mitTeilweise = true): FeiertagImLand[] {
  const liste: FeiertagImLand[] = [];
  for (const f of GESETZLICH) {
    const tag = f.datum(jahr);
    if (!tag) continue;
    if (giltIn(f, code)) liste.push({ key: f.key, name: f.name, pfad: f.pfad, tag, hinweis: f.hinweis });
    else if (mitTeilweise && f.teilweise?.[code])
      liste.push({ key: f.key, name: f.name, pfad: f.pfad, tag, teilweise: f.teilweise[code] });
  }
  return liste.sort((a, b) => tagNr(a.tag) - tagNr(b.tag));
}

/** Name des landesweiten gesetzlichen Feiertags an diesem Tag, sonst null. */
export function feiertagAm(tag: Tag, code: BundeslandCode): string | null {
  for (const f of GESETZLICH) {
    if (!giltIn(f, code)) continue;
    const d = f.datum(tag.y);
    if (d && gleicherTag(d, tag)) return f.name;
  }
  return null;
}

/** Bundesweite Feiertage (gelten in allen 16 Ländern). */
export function bundesweiterFeiertagAm(tag: Tag): string | null {
  for (const f of GESETZLICH) {
    if (f.laender !== "alle") continue;
    const d = f.datum(tag.y);
    if (d && gleicherTag(d, tag)) return f.name;
  }
  return null;
}

/** Anzahl landesweiter gesetzlicher Feiertage pro Jahr (ohne einmalige und regionale). */
export function anzahlFeiertage(code: BundeslandCode): number {
  return GESETZLICH.filter((f) => giltIn(f, code) && !f.key.startsWith("einmalig")).length;
}

/** In welchen Ländern gilt der Feiertag mit diesem Schlüssel? */
export function laenderVon(key: string): "alle" | BundeslandCode[] | undefined {
  return GESETZLICH.find((f) => f.key === key)?.laender;
}
