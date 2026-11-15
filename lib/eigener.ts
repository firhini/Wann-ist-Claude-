import type { MotifKey } from "@/components/Motiv";
import { type Tag, ausIso, berlin, istSchaltjahr, mitternacht, tagNr, tagVon } from "./zeit";

/**
 * Eigener Countdown: Alles steckt in der Adresse, nichts wird gespeichert.
 *   /c?n=Name&d=2027-06-12&t=14:30&m=herz&j=1
 * n = Name, d = Datum (ISO), t = Uhrzeit (optional), m = Motiv, j = 1 für „jedes Jahr“.
 */
export const EIGENE_MOTIVE: { key: MotifKey; name: string }[] = [
  { key: "blatt-1", name: "Kalenderblatt" },
  { key: "herz", name: "Herz" },
  { key: "stern", name: "Stern" },
  { key: "feuerwerk", name: "Feuerwerk" },
  { key: "sonne", name: "Sonne" },
  { key: "horizont", name: "Urlaub" },
  { key: "blume", name: "Blume" },
  { key: "pokal", name: "Pokal" },
  { key: "mikro", name: "Konzert" },
  { key: "schultuete", name: "Schule" },
  { key: "uhr", name: "Uhr" },
  { key: "muenze", name: "Geld" },
];

export type Eigener = {
  name: string;
  datum: Tag;
  zeit: { h: number; mi: number } | null;
  motiv: MotifKey;
  jaehrlich: boolean;
};

export function eigenerAusParametern(p: Record<string, string | string[] | undefined>): Eigener | null {
  const eins = (k: string) => {
    const v = p[k];
    return (Array.isArray(v) ? v[0] : v) ?? "";
  };
  const name = eins("n").replace(/\s+/g, " ").trim().slice(0, 60);
  let datum: Tag;
  try {
    datum = ausIso(eins("d"));
  } catch {
    return null;
  }
  if (!name || datum.y < 1900 || datum.y > 2200 || datum.m < 1 || datum.m > 12 || datum.d < 1) return null;
  const maxTag = new Date(Date.UTC(datum.y, datum.m, 0)).getUTCDate();
  if (datum.d > maxTag) return null;
  const tz = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(eins("t"));
  const motiv = EIGENE_MOTIVE.find((m) => m.key === eins("m"))?.key ?? "blatt-1";
  return {
    name,
    datum,
    zeit: tz ? { h: Number(tz[1]), mi: Number(tz[2]) } : null,
    motiv,
    jaehrlich: eins("j") === "1",
  };
}

export function eigenerPfad(e: { name: string; datum: string; zeit?: string; motiv?: string; jaehrlich?: boolean }): string {
  const q = new URLSearchParams({ n: e.name, d: e.datum });
  if (e.zeit) q.set("t", e.zeit);
  if (e.motiv && e.motiv !== "blatt-1") q.set("m", e.motiv);
  if (e.jaehrlich) q.set("j", "1");
  return `/c?${q.toString()}`;
}

function imJahr(e: Eigener, jahr: number): Tag {
  // Der 29. Februar wird in Nicht-Schaltjahren am 28. gefeiert.
  if (e.datum.m === 2 && e.datum.d === 29 && !istSchaltjahr(jahr)) return { y: jahr, m: 2, d: 28 };
  return { y: jahr, m: e.datum.m, d: e.datum.d };
}

function zeitpunkt(e: Eigener, t: Tag): Date {
  return e.zeit ? berlin(t.y, t.m, t.d, e.zeit.h, e.zeit.mi) : mitternacht(t);
}

/** Die Termine für den Zähler: laufendes/nächstes Vorkommen und bei jährlichen das folgende. */
export function eigeneTermine(e: Eigener, now: Date): { tag: Tag; start: number; ende: number }[] {
  if (!e.jaehrlich) {
    return [{ tag: e.datum, start: zeitpunkt(e, e.datum).getTime(), ende: mitternacht(e.datum).getTime() }];
  }
  const heute = tagVon(now);
  let jahr = Math.max(heute.y, e.datum.y);
  if (tagNr(imJahr(e, jahr)) < tagNr(heute)) jahr++;
  return [jahr, jahr + 1].map((y) => {
    const t = imJahr(e, y);
    return { tag: t, start: zeitpunkt(e, t).getTime(), ende: mitternacht(t).getTime() };
  });
}
