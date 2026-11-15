import type { BundeslandCode } from "@/data/bundeslaender";
import type { MotifKey } from "@/components/Motiv";
import {
  type Tag,
  arbeitstageBis,
  mitternacht,
  plusTage,
  tageDiff,
  tagNr,
  tagVon,
  wochenendenBis,
} from "./zeit";

export type Kategorie = "feiertage" | "ferien" | "jahreszeiten" | "alltag" | "events" | "schule" | "datum";

export type Faq = { q: string; a: string };
export type Quelle = { label: string; url: string };

export type Countdown = {
  slug: string;
  title: string; // "Weihnachten"
  question: string; // "Wie lange noch bis Weihnachten?"
  category: Kategorie;
  /** Beginn des laufenden oder nächsten Vorkommens. Am Tag selbst: heute. */
  getNextDate: (now: Date) => Date;
  /** Letzter Tag bei Zeiträumen (Tagesbeginn des letzten Tages). */
  getEndDate?: (now: Date) => Date;
  motif: MotifKey;
  intro: string; // Absätze durch Leerzeile getrennt
  faq: Faq[];
  facts: string[];
  related: string[]; // Pfade anderer Countdowns
  source?: Quelle;
  bundesland?: BundeslandCode;

  // ---- Erweiterungen (begründet in DECISIONS.md) ----
  /** Adresse der Seite, z. B. "/weihnachten". */
  pfad: string;
  /** Satzbaustein: "bis Weihnachten", "bis zum 1. Advent". */
  bis: string;
  /** Satz am Tag selbst: "Heute ist Weihnachten." */
  heute: string;
  /** Mit Artikel für ganze Sätze: "Der 1. Advent", "Die Sommerferien in Bayern". Standard: title. */
  nominativ?: string;
  /** Steht `nominativ` im Plural ("Die Sommerferien")? */
  mehrzahl?: boolean;
  /** Eigener Seitentitel statt des Standards "Frage Jahr? Noch X Tage". */
  seoTitel?: (s: Stand) => string;
  /** Kurzname für Tafelzeilen. Standard: title. */
  tafel?: string;
  /** "tag" = einzelner Tag (oder wenige Festtage), "zeitraum" = Ferien, Turniere. */
  art?: "tag" | "zeitraum";
  /** Satz während eines Zeitraums: "Es sind Sommerferien." */
  laeuft?: string;
  /** Datum im angegebenen Jahr, für die Tabelle „Die nächsten Jahre“. */
  datumImJahr?: (jahr: number) => Tag | null;
  /** Letzter Tag im angegebenen Jahr (nur Zeiträume). */
  endeImJahr?: (jahr: number) => Tag | null;
  /** Startuhrzeit, falls der Termin eine hat (Berliner Zeit). */
  uhrzeit?: { h: number; mi: number };
  /** Der Termin hat eine Uhrzeit, die von Jahr zu Jahr wechselt. Sie wird aus getNextDate gelesen. */
  hatUhrzeit?: boolean;
  /** Eigene Termintabelle statt der berechneten „nächsten Jahre“. */
  tabelle?: (now: Date) => {
    titel: string;
    spalteEins?: string;
    zeilen: { jahr: number | string; start: Tag; ende?: Tag | null; notiz?: string }[];
  };
  /** Eigener zweiter Satz der Antwort statt des Standards „… fällt auf einen …“. */
  zusatzSatz?: (s: Stand) => string;
  /** Gesetzlicher Feiertag? */
  gesetzlich?: "bundesweit" | BundeslandCode[] | false;
  /** Zusätzliche Fahrplanzeilen im Hero. */
  zeilen?: (now: Date) => { label: string; wert: string }[];
  /** Zusatzfragen, die vom Datum abhängen. */
  faqDynamisch?: (now: Date) => Faq[];
};

export type Stand = {
  phase: "vor" | "heute" | "laeuft";
  heute: Tag;
  start: Tag;
  /** Letzter Tag. Bei Einzeltagen gleich `start`. */
  ende: Tag;
  /** Exakter Beginn (Mitternacht oder Startuhrzeit). */
  startZeit: Date;
  /** Kalendertage bis zum Beginn. 0 am Tag selbst und währenddessen. */
  tage: number;
  /** Nur „laeuft“: der wievielte Tag, wie viele insgesamt, wie viele noch (heute mitgezählt). */
  tagNummer: number;
  tageGesamt: number;
  restTage: number;
};

export function stand(c: Pick<Countdown, "getNextDate" | "getEndDate" | "art">, now: Date): Stand {
  const heute = tagVon(now);
  const startZeit = c.getNextDate(now);
  const start = tagVon(startZeit);
  const ende = c.getEndDate ? tagVon(c.getEndDate(now)) : start;
  const tage = Math.max(0, tageDiff(heute, start));
  const tageGesamt = tageDiff(start, ende) + 1;
  let phase: Stand["phase"] = "vor";
  if (tagNr(heute) >= tagNr(start)) phase = c.art === "zeitraum" ? "laeuft" : "heute";
  return {
    phase,
    heute,
    start,
    ende,
    startZeit,
    tage,
    tagNummer: phase === "vor" ? 0 : tageDiff(start, heute) + 1,
    tageGesamt,
    restTage: phase === "vor" ? tageGesamt : Math.max(0, tageDiff(heute, ende) + 1),
  };
}

/**
 * Baut Datumsfunktionen für ein jährlich wiederkehrendes Ereignis.
 * `dauer` in Tagen: Weihnachten dauert 2 Tage, Ferien entsprechend länger.
 */
export function jaehrlich(datum: (jahr: number) => Tag, dauer = 1) {
  const naechstes = (now: Date): Tag => {
    const heute = tagVon(now);
    for (let y = heute.y - 1; y <= heute.y + 1; y++) {
      const start = datum(y);
      if (tagNr(plusTage(start, dauer - 1)) >= tagNr(heute)) return start;
    }
    return datum(heute.y + 2);
  };
  return {
    datumImJahr: datum,
    getNextDate: (now: Date) => mitternacht(naechstes(now)),
    ...(dauer > 1
      ? {
          getEndDate: (now: Date) => mitternacht(plusTage(naechstes(now), dauer - 1)),
          endeImJahr: (jahr: number) => plusTage(datum(jahr), dauer - 1),
        }
      : {}),
  };
}

/** Festes Datum jedes Jahr. */
export function fest(m: number, d: number, dauer = 1) {
  return jaehrlich((jahr) => ({ y: jahr, m, d }), dauer);
}

export type Einheiten = {
  tage: number;
  wochen: number;
  wochenGanz: number;
  wochenRestTage: number;
  stunden: number;
  minuten: number;
  sekunden: number;
  wochenenden: number;
  naechte: number;
  arbeitstage: number;
};

/** Alle Umrechnungen für den Einheiten-Block. */
export function einheiten(now: Date, startZeit: Date): Einheiten {
  const heute = tagVon(now);
  const ziel = tagVon(startZeit);
  const tage = Math.max(0, tageDiff(heute, ziel));
  const ms = Math.max(0, startZeit.getTime() - now.getTime());
  return {
    tage,
    wochen: tage / 7,
    wochenGanz: Math.floor(tage / 7),
    wochenRestTage: tage % 7,
    stunden: Math.floor(ms / 3_600_000),
    minuten: Math.floor(ms / 60_000),
    sekunden: Math.floor(ms / 1000),
    wochenenden: wochenendenBis(heute, ziel),
    naechte: tage,
    arbeitstage: arbeitstageBis(heute, ziel),
  };
}

/** Die nächsten n Vorkommen ab dem laufenden/nächsten. */
export function naechsteJahre(
  c: Pick<Countdown, "datumImJahr" | "endeImJahr" | "getNextDate">,
  now: Date,
  n = 6,
): { jahr: number; start: Tag; ende: Tag | null }[] {
  if (!c.datumImJahr) return [];
  const erstes = tagVon(c.getNextDate(now));
  const out: { jahr: number; start: Tag; ende: Tag | null }[] = [];
  // Das Startjahr finden: das Jahr, dessen Datum dem nächsten Vorkommen entspricht.
  let jahr = erstes.y - 1;
  for (let i = 0; i < 3; i++) {
    const d = c.datumImJahr(jahr);
    if (d && tagNr(d) >= tagNr(erstes)) break;
    jahr++;
  }
  for (let i = 0; out.length < n && i < n + 4; i++) {
    const start = c.datumImJahr(jahr + i);
    if (!start) continue;
    out.push({ jahr: jahr + i, start, ende: c.endeImJahr?.(jahr + i) ?? null });
  }
  return out;
}
