import type { MotifKey } from "@/components/Motiv";
import type { Faq, Quelle } from "@/lib/countdown";

/** Rubriken im Events-Hub. */
export type EventRubrik = "sport" | "games" | "popkultur" | "feste" | "astronomie" | "wahlen";

export const RUBRIK_NAME: Record<EventRubrik, string> = {
  sport: "Sport",
  games: "Games",
  popkultur: "Popkultur",
  feste: "Feste und Messen",
  astronomie: "Astronomie",
  wahlen: "Wahlen",
};

/**
 * Ein einmaliges Event mit offiziell bestätigtem Datum.
 * Die Rohdaten der Recherche liegen in data/research/events.json.
 */
export type EventDaten = {
  slug: string; // ohne Jahreszahl, wo das Event jährlich wiederkehrt und die Seite weiterleben soll
  title: string; // "Handball-WM 2027"
  /** Kurzname für Tafelzeilen, höchstens ca. 28 Zeichen. */
  tafel?: string;
  /** Die Suchfrage, wird zur H1: "Wann beginnt die Handball-WM 2027?" */
  question: string;
  /** Mit Artikel für ganze Sätze: "Die Handball-WM 2027". */
  nominativ: string;
  mehrzahl?: boolean;
  /** Satzbaustein: "bis zur Handball-WM 2027". */
  bis: string;
  /** Am ersten Tag: "Heute beginnt die Handball-WM." */
  heute: string;
  /** Während eines mehrtägigen Events: "Die Handball-WM läuft." */
  laeuft?: string;
  /** Wenn es vorbei ist: "Die Handball-WM 2027 ist vorbei." */
  vorbei: string;
  rubrik: EventRubrik;
  motif: MotifKey;
  /** Erster Tag in deutscher Zeit, ISO. */
  start: string;
  /** Startuhrzeit in deutscher Zeit "HH:MM", nur wenn offiziell bestätigt. */
  startzeit?: string;
  /** Letzter Tag, ISO. Nur bei mehrtägigen Events. */
  ende?: string;
  ort: string;
  source: Quelle;
  intro: string;
  facts: string[];
  faq: Faq[];
  /** Pfade verwandter Seiten, z. B. "/events/olympia-2028" oder "/sommeranfang". */
  related: string[];
};
