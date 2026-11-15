import { type Countdown, istVorbei } from "@/lib/countdown";
import { datumLang, datumMitWochentag, plural, uhrzeit, zeitraumKurz } from "@/lib/format";
import { nochTage } from "@/lib/texte";
import { ausIso, berlin, mitternacht } from "@/lib/zeit";
import { EVENT_DATEN } from "./events-inhalt";
import { type EventDaten, RUBRIK_NAME } from "./events-typ";

/**
 * Events: einmalige Termine mit offiziell bestätigtem Datum.
 * Inhalte in events-inhalt.ts, Rohdaten der Recherche in research/events.json.
 */
function bauen(e: EventDaten): Countdown {
  const start = ausIso(e.start);
  const ende = e.ende ? ausIso(e.ende) : null;
  const zeit = e.startzeit ? /^(\d{1,2}):(\d{2})$/.exec(e.startzeit) : null;
  const uhr = zeit ? { h: Number(zeit[1]), mi: Number(zeit[2]) } : undefined;
  const startZeit = uhr ? berlin(start.y, start.m, start.d, uhr.h, uhr.mi) : mitternacht(start);
  const frage = e.question.replace(/\?$/, "");
  return {
    slug: e.slug,
    pfad: `/events/${e.slug}`,
    title: e.title,
    nominativ: e.nominativ,
    mehrzahl: e.mehrzahl,
    tafel: e.tafel ?? e.title,
    question: e.question,
    category: "events",
    art: ende ? "zeitraum" : "tag",
    einmalig: true,
    vorbeiText: e.vorbei,
    getNextDate: () => startZeit,
    ...(ende ? { getEndDate: () => mitternacht(ende) } : {}),
    uhrzeit: uhr,
    bis: e.bis,
    heute: e.heute,
    laeuft: e.laeuft,
    motif: e.motif,
    source: e.source,
    intro: e.intro,
    facts: e.facts,
    faq: e.faq,
    related: e.related,
    // Einzeltermine: schlichter Terminsatz statt „fällt auf einen …“.
    ...(ende
      ? {}
      : {
          zusatzSatz: () =>
            `Termin: ${datumMitWochentag(start)}${uhr ? `, ${uhrzeit(uhr.h, uhr.mi)} deutscher Zeit` : ""}.`,
        }),
    zeilen: () => [
      { label: "Ort", wert: e.ort },
      { label: "Rubrik", wert: RUBRIK_NAME[e.rubrik] },
    ],
    seoTitel: (s) => {
      const datum = ende ? zeitraumKurz(start, ende) : datumLang(start);
      if (s.phase === "laeuft") return `${e.title}: läuft, noch ${s.restTage} ${plural(s.restTage, "Tag", "Tage")}`;
      if (s.phase === "heute") return `${e.title}: heute, ${datumLang(start)}`;
      const lang = `${frage}? ${datum} (${nochTage(s.tage)})`;
      return lang.length <= 66 ? lang : `${e.title}: ${datum} (${nochTage(s.tage)})`.slice(0, 68);
    },
  };
}

export const EVENTS: Countdown[] = EVENT_DATEN.map(bauen);

const nachSlug = new Map(EVENTS.map((c) => [c.slug, c]));
const datenNachSlug = new Map(EVENT_DATEN.map((e) => [e.slug, e]));

export function event(slug: string): Countdown | undefined {
  return nachSlug.get(slug);
}

export function eventDaten(slug: string): EventDaten | undefined {
  return datenNachSlug.get(slug);
}

/** Events, die noch bevorstehen oder gerade laufen. */
export function kommendeEvents(now: Date): Countdown[] {
  return EVENTS.filter((c) => !istVorbei(c, now));
}
