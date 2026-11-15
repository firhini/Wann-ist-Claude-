import { type Countdown, istVorbei, stand } from "@/lib/countdown";
import { alleCountdowns } from "./alle";

/** Was auf der großen Tafel der Startseite stehen darf: alles außer Alltag und den Länderseiten. */
export function startTafel(): Countdown[] {
  return alleCountdowns().filter((c) => c.category !== "alltag" && !c.bundesland);
}

export type StartHub = { name: string; pfad: string; text: string; naechstes: string };

function naechstesIn(auswahl: Countdown[], now: Date): string {
  const liste = auswahl
    .map((c) => ({ c, s: stand(c, now) }))
    .sort((a, b) => a.s.tage - b.s.tage);
  const erster = liste[0];
  if (!erster) return "";
  const name = erster.c.tafel ?? erster.c.title;
  if (erster.s.phase !== "vor") return `Heute: ${name}`;
  return `Als Nächstes: ${name}, ${erster.s.tage} ${erster.s.tage === 1 ? "Tag" : "Tage"}`;
}

/** Einstiege in alle Hubs, mit dem jeweils nächsten Termin. */
export function startHubs(now: Date): StartHub[] {
  const alle = alleCountdowns();
  const feiertage = alle.filter((c) => c.category === "feiertage" && !c.bundesland);
  return [
    {
      name: "Feiertage",
      pfad: "/feiertage",
      text: `${feiertage.length} Feste und Feiertage von Neujahr bis Silvester, mit Datum, Wochentag und der Frage, ob man frei hat.`,
      naechstes: naechstesIn(feiertage, now),
    },
    {
      name: "Ferien",
      pfad: "/ferien",
      text: "Schulferien aller 16 Bundesländer aus den Kalendern der Kultusministerkonferenz: Sommer, Herbst, Weihnachten, Winter, Ostern, Pfingsten.",
      naechstes: naechstesIn(alle.filter((c) => c.category === "ferien" && c.slug.startsWith("ferien-")), now),
    },
    {
      name: "Events",
      pfad: "/events",
      text: "Turniere, Spielereleases, Feste, Wahlen und Finsternisse. Nur Termine mit offiziell bestätigtem Datum, jeweils mit Quelle.",
      naechstes: naechstesIn(alle.filter((c) => c.category === "events" && !istVorbei(c, now)), now),
    },
    {
      name: "Jahreszeiten",
      pfad: "/jahreszeiten",
      text: "Frühlings-, Sommer-, Herbst- und Winteranfang auf die Minute, dazu die nächste Zeitumstellung.",
      naechstes: naechstesIn(alle.filter((c) => c.category === "jahreszeiten"), now),
    },
    {
      name: "Alltag",
      pfad: "/alltag",
      text: "Wochenende, Freitag, Feierabend, Monatsende, Zahltag, Jahresende: die kleinen Ziele.",
      naechstes: naechstesIn(alle.filter((c) => c.category === "alltag" && c.slug !== "feierabend"), now),
    },
    {
      name: "Schulanfang",
      pfad: "/schule",
      text: "Der erste Schultag nach den Sommerferien, für jedes Bundesland.",
      naechstes: naechstesIn(alle.filter((c) => c.category === "schule"), now),
    },
    {
      name: "Kalenderwoche",
      pfad: "/kalenderwoche",
      text: "Die aktuelle KW und alle Wochen des Jahres mit Montag und Sonntag.",
      naechstes: "Wechselt jeden Montag",
    },
    {
      name: "Tage bis",
      pfad: "/tage-bis",
      text: "Jeder Tag des Jahres mit eigener Seite: Countdown, Wochentag, Kalenderwoche und was an dem Tag los ist.",
      naechstes: "366 Daten",
    },
    {
      name: "Eigener Countdown",
      pfad: "/eigener-countdown",
      text: "Name, Datum, Uhrzeit: fertig ist der Link zum Teilen. Ohne Anmeldung, gespeichert wird nichts.",
      naechstes: "Dein Termin",
    },
  ];
}

/** Die meistgefragten Countdowns als Schnelleinstieg. Nur Seiten, die es gibt. */
export function startSchnell(): { name: string; pfad: string }[] {
  const wunsch: [string, string][] = [
    ["/weihnachten", "Tage bis Weihnachten"],
    ["/silvester", "Tage bis Silvester"],
    ["/ferien/sommerferien", "Sommerferien"],
    ["/wochenende", "Wochenende"],
    ["/ostern", "Ostern"],
    ["/eigener-countdown", "Eigener Countdown"],
  ];
  const vorhanden = new Set([...alleCountdowns().map((c) => c.pfad), ...EXTRA_SEITEN]);
  return wunsch.filter(([pfad]) => vorhanden.has(pfad)).map(([pfad, name]) => ({ pfad, name }));
}

/** Seiten ohne eigenen Countdown-Datensatz, die als Schnelleinstieg taugen. */
const EXTRA_SEITEN: string[] = ["/ferien/sommerferien", "/eigener-countdown"];
