import type { Countdown, Faq } from "@/lib/countdown";
import { ostersonntag } from "@/lib/feiertage";
import {
  datumLang,
  datumMitWochentag,
  datumOhneJahr,
  plural,
  wochentagName,
  zeitraumKurz,
} from "@/lib/format";
import { nochTage } from "@/lib/texte";
import {
  type Tag,
  ausIso,
  mitternacht,
  plusTage,
  tageDiff,
  tagNr,
  tagVon,
  wochentag,
} from "@/lib/zeit";
import { BUNDESLAENDER, type Bundesland, type BundeslandCode, land } from "./bundeslaender";
import { feiertagAm } from "./feiertage-laender";
import roh from "./ferien.json";

/**
 * Schulferien. Einzige Datenquelle ist `ferien.json`, erzeugt aus den Ferienkalendern der
 * Kultusministerkonferenz (siehe `ferien-pruefbericht.md`). Hier werden die Rohdaten nur
 * aufbereitet: zusammenhängende Zeiträume zusammengefasst, Hauptzeitraum und Zusatztage getrennt.
 */

export type Ferienart =
  | "winterferien"
  | "osterferien"
  | "pfingstferien"
  | "sommerferien"
  | "herbstferien"
  | "weihnachtsferien";

export type FerienartInfo = {
  slug: Ferienart;
  name: string; // "Sommerferien"
  kurz: string; // "Sommer"
  /** Reihenfolge im Schuljahr */
  rang: number;
};

export const FERIENARTEN: FerienartInfo[] = [
  { slug: "herbstferien", name: "Herbstferien", kurz: "Herbst", rang: 1 },
  { slug: "weihnachtsferien", name: "Weihnachtsferien", kurz: "Weihnachten", rang: 2 },
  { slug: "winterferien", name: "Winterferien", kurz: "Winter", rang: 3 },
  { slug: "osterferien", name: "Osterferien", kurz: "Ostern", rang: 4 },
  { slug: "pfingstferien", name: "Pfingstferien", kurz: "Pfingsten", rang: 5 },
  { slug: "sommerferien", name: "Sommerferien", kurz: "Sommer", rang: 6 },
];

export function ferienart(slug: string): FerienartInfo | undefined {
  return FERIENARTEN.find((a) => a.slug === slug);
}

/** Ortsübliche Namen, wo sie vom KMK-Spaltennamen abweichen. */
const LOKALER_NAME: Partial<Record<BundeslandCode, Partial<Record<Ferienart, string>>>> = {
  BY: { winterferien: "Frühjahrsferien" },
  HH: { osterferien: "Frühjahrsferien", pfingstferien: "Pfingstferien (Maiferien)" },
};

export function lokalerName(art: Ferienart, code: BundeslandCode): string | null {
  return LOKALER_NAME[code]?.[art] ?? null;
}

type RohEintrag = {
  land: string;
  art: string;
  schuljahr: string;
  zeitraeume: { von: string; bis: string }[];
  hinweis: string | null;
};

export type Zeitraum = { von: Tag; bis: Tag };

export type Ferienzeit = {
  land: BundeslandCode;
  art: Ferienart;
  schuljahr: string;
  /** Der Hauptzeitraum: darauf zählt der Countdown. */
  von: Tag;
  bis: Tag;
  /** Weitere unterrichtsfreie Tage, die die KMK in derselben Spalte führt. */
  zusatz: Zeitraum[];
  hinweis: string | null;
  /** Termin stammt nur aus der langfristigen Sommerferienregelung. */
  vorlaeufig: boolean;
  quelle: { label: string; url: string };
};

function dauer(z: Zeitraum): number {
  return tageDiff(z.von, z.bis) + 1;
}

/** Sind alle Tage zwischen a.bis und b.von ohnehin frei (Wochenende oder Feiertag im Land)? */
function lueckeFrei(a: Zeitraum, b: Zeitraum, code: BundeslandCode): boolean {
  for (let nr = tagNr(a.bis) + 1; nr < tagNr(b.von); nr++) {
    const t = plusTage(a.bis, nr - tagNr(a.bis));
    const wt = wochentag(t);
    if (wt !== 0 && wt !== 6 && !feiertagAm(t, code)) return false;
  }
  return true;
}

/** Fasst Zeiträume zusammen, zwischen denen nur Wochenenden und Feiertage liegen. */
function verschmelzen(zeitraeume: Zeitraum[], code: BundeslandCode): Zeitraum[] {
  const sortiert = [...zeitraeume].sort((a, b) => tagNr(a.von) - tagNr(b.von));
  const out: Zeitraum[] = [];
  for (const z of sortiert) {
    const letzter = out[out.length - 1];
    if (letzter && tageDiff(letzter.bis, z.von) <= 5 && lueckeFrei(letzter, z, code)) letzter.bis = z.bis;
    else out.push({ ...z });
  }
  return out;
}

const QUELLEN = roh.quellen as { schuljahr: string; label: string; url: string }[];

function quelleFuer(schuljahr: string, art: Ferienart, vorlaeufig: boolean) {
  const q =
    QUELLEN.find((x) => x.schuljahr === schuljahr) ??
    (art === "sommerferien" || vorlaeufig ? QUELLEN.find((x) => x.schuljahr.startsWith("sommer")) : undefined) ??
    QUELLEN[0];
  if (!q) throw new Error("Keine Quelle in ferien.json");
  return { label: q.label, url: q.url };
}

function aufbereiten(): Ferienzeit[] {
  const out: Ferienzeit[] = [];
  for (const e of roh.eintraege as RohEintrag[]) {
    const code = e.land as BundeslandCode;
    const art = e.art as Ferienart;
    const teile = verschmelzen(
      e.zeitraeume.map((z) => ({ von: ausIso(z.von), bis: ausIso(z.bis) })),
      code,
    );
    const vorlaeufig = !QUELLEN.some((q) => q.schuljahr === e.schuljahr);
    const quelle = quelleFuer(e.schuljahr, art, vorlaeufig);

    // Bayern: Die KMK führt die Frühjahrsferien im Februar in der Spalte „Ostern/Frühjahr“.
    // Sie liegen Wochen vor Ostern und bekommen deshalb eine eigene Seite unter den Winterferien.
    let rest = teile;
    if (art === "osterferien" && teile.length > 1) {
      const ostern = ostersonntag(ausIso(e.zeitraeume[e.zeitraeume.length - 1]!.bis).y);
      const frueh = teile.filter((z) => dauer(z) >= 4 && tageDiff(z.bis, ostern) > 21);
      for (const z of frueh) {
        out.push({
          land: code,
          art: "winterferien",
          schuljahr: e.schuljahr,
          von: z.von,
          bis: z.bis,
          zusatz: [],
          hinweis: "Die KMK führt diese Woche in der Spalte „Ostern/Frühjahr“. In Bayern heißt sie Frühjahrsferien.",
          vorlaeufig,
          quelle,
        });
      }
      rest = teile.filter((z) => !frueh.includes(z));
    }
    if (rest.length === 0) continue;

    // Hauptzeitraum ist der längste Block. Bei Gleichstand gewinnt der spätere (näher am namensgebenden Fest).
    const haupt = [...rest].sort((a, b) => dauer(b) - dauer(a) || tagNr(b.von) - tagNr(a.von))[0]!;
    out.push({
      land: code,
      art,
      schuljahr: e.schuljahr,
      von: haupt.von,
      bis: haupt.bis,
      zusatz: rest.filter((z) => z !== haupt),
      hinweis: e.hinweis && !/kursiv/i.test(e.hinweis) ? e.hinweis : null,
      vorlaeufig,
      quelle,
    });
  }
  return out.sort((a, b) => tagNr(a.von) - tagNr(b.von));
}

export const FERIEN: Ferienzeit[] = aufbereiten();
export const FERIEN_ABGERUFEN: string = roh.abgerufen;
export const KMK_UEBERSICHT = {
  label: "Kultusministerkonferenz: Ferienregelung",
  url: "https://www.kmk.org/service/ferien.html",
};

export function ferienzeiten(art: Ferienart, code: BundeslandCode): Ferienzeit[] {
  return FERIEN.filter((f) => f.art === art && f.land === code);
}

export function ferienImLand(code: BundeslandCode): Ferienzeit[] {
  return FERIEN.filter((f) => f.land === code);
}

/** Laufende oder nächste Ferienzeit aus einer Liste. */
export function aktuelle(liste: Ferienzeit[], now: Date): Ferienzeit | undefined {
  const heute = tagNr(tagVon(now));
  return liste.find((f) => tagNr(f.bis) >= heute);
}

/**
 * Der nächste Durchgang einer Ferienart: alle Länder, deren laufender oder nächster Termin
 * im selben Schuljahr liegt wie der früheste. Länder, die erst später wieder dran sind, fehlen.
 */
export function naechsterDurchgang(art: Ferienart, now: Date): { land: Bundesland; zeit: Ferienzeit }[] {
  const alle = BUNDESLAENDER.map((b) => ({ land: b, zeit: aktuelle(ferienzeiten(art, b.code), now) }))
    .filter((e): e is { land: Bundesland; zeit: Ferienzeit } => Boolean(e.zeit))
    .sort((x, y) => tagNr(x.zeit.von) - tagNr(y.zeit.von) || x.land.name.localeCompare(y.land.name, "de"));
  const sj = alle[0]?.zeit.schuljahr;
  return alle.filter((e) => e.zeit.schuljahr === sj);
}

/** Länder, die diese Ferienart haben. */
export function laenderMit(art: Ferienart): Bundesland[] {
  return BUNDESLAENDER.filter((b) => ferienzeiten(art, b.code).length > 0);
}

/** Alle (Art, Land)-Kombinationen, für die es Termine gibt. */
export function ferienKombinationen(): { art: FerienartInfo; land: Bundesland }[] {
  const out: { art: FerienartInfo; land: Bundesland }[] = [];
  for (const art of FERIENARTEN) for (const b of laenderMit(art.slug)) out.push({ art, land: b });
  return out;
}

/** Der freie Block inklusive angrenzender Wochenenden und Feiertage. */
export function freierBlock(f: Zeitraum, code: BundeslandCode): Zeitraum {
  const frei = (t: Tag) => wochentag(t) === 0 || wochentag(t) === 6 || feiertagAm(t, code) !== null;
  let von = f.von;
  let bis = f.bis;
  while (frei(plusTage(von, -1))) von = plusTage(von, -1);
  while (frei(plusTage(bis, 1))) bis = plusTage(bis, 1);
  return { von, bis };
}

/** Erster Schultag nach einem Ferienzeitraum: der nächste Tag, der weder Wochenende noch Feiertag ist. */
export function ersterSchultag(f: Zeitraum, code: BundeslandCode): Tag {
  return plusTage(freierBlock(f, code).bis, 1);
}

/** Gesetzliche Feiertage des Landes, die in den Zeitraum fallen. */
export function feiertageIn(f: Zeitraum, code: BundeslandCode): { name: string; tag: Tag }[] {
  const out: { name: string; tag: Tag }[] = [];
  for (let i = 0; i <= tageDiff(f.von, f.bis); i++) {
    const t = plusTage(f.von, i);
    const name = feiertagAm(t, code);
    if (name) out.push({ name, tag: t });
  }
  return out;
}

export function ferienPfad(art: Ferienart, code?: BundeslandCode): string {
  return code ? `/ferien/${art}/${land(code).slug}` : `/ferien/${art}`;
}

/** Länder, deren Hauptzeitraum sich mit dem angegebenen überschneidet. */
export function gleichzeitig(f: Ferienzeit): { land: Bundesland; zeit: Ferienzeit }[] {
  return FERIEN.filter(
    (g) =>
      g.art === f.art &&
      g.land !== f.land &&
      tagNr(g.von) <= tagNr(f.bis) &&
      tagNr(g.bis) >= tagNr(f.von),
  ).map((zeit) => ({ land: land(zeit.land), zeit }));
}

// ---------------------------------------------------------------------------
// Texte je Ferienart
// ---------------------------------------------------------------------------

const ART_TEXT: Record<Ferienart, { absatz: string; faq: Faq[] }> = {
  sommerferien: {
    absatz:
      "Die Sommerferien dauern in jedem Bundesland rund sechs Wochen, beginnen aber nicht überall gleichzeitig. Die Länder wechseln sich nach einem festen Plan ab, damit nicht ganz Deutschland am selben Wochenende auf der Autobahn steht. Nur Baden-Württemberg und Bayern machen bei diesem Wechsel nicht mit und starten immer als Letzte. Die Termine legt die Kultusministerkonferenz Jahre im Voraus fest, derzeit bis 2030.",
    faq: [
      {
        q: "Warum beginnen die Sommerferien nicht überall gleichzeitig?",
        a: "Die Länder haben sich im Hamburger Abkommen von 1964 darauf geeinigt, die Sommerferien zu staffeln. Das entzerrt den Reiseverkehr und verteilt die Nachfrage in den Urlaubsregionen. Die Reihenfolge rolliert von Jahr zu Jahr.",
      },
      {
        q: "Warum haben Bayern und Baden-Württemberg immer als Letzte Sommerferien?",
        a: "Beide Länder haben zwei Wochen Pfingstferien. Ein früher Sommerferienbeginn würde das Schuljahr dazwischen zu sehr verkürzen. Deshalb nehmen sie am rollierenden System nicht teil.",
      },
    ],
  },
  herbstferien: {
    absatz:
      "Herbstferien gibt es in allen 16 Bundesländern, meist im Oktober und je nach Land eine oder zwei Wochen lang. Ihren Ursprung haben sie in der Landwirtschaft: Früher hießen sie Kartoffelferien, weil die Kinder bei der Ernte gebraucht wurden. Heute liegen sie oft so, dass der Tag der Deutschen Einheit, der Reformationstag oder Allerheiligen hineinfallen.",
    faq: [
      {
        q: "Warum heißen Herbstferien auch Kartoffelferien?",
        a: "Bis ins 20. Jahrhundert halfen Schulkinder im Herbst bei der Kartoffelernte. Die schulfreie Zeit dafür nannte man Kartoffelferien. Aus ihnen sind die heutigen Herbstferien entstanden.",
      },
    ],
  },
  weihnachtsferien: {
    absatz:
      "Weihnachtsferien haben alle 16 Bundesländer. Sie beginnen kurz vor Heiligabend und reichen über den Jahreswechsel bis in die erste Januarwoche. Weil mehrere Feiertage und meist zwei Wochenenden hineinfallen, sind es wenige Ferientage, die viel freie Zeit ergeben. In Ländern mit dem Feiertag Heilige Drei Könige am 6. Januar dauern sie oft bis nach diesem Tag.",
    faq: [
      {
        q: "Zählen Feiertage als Ferientage?",
        a: "Nein. Die Länder haben im Hamburger Abkommen vereinbart, dass die Ferien im Schuljahr zusammen 75 Werktage umfassen. Werktage sind Montag bis Samstag, Sonn- und Feiertage zählen nicht mit.",
      },
    ],
  },
  winterferien: {
    absatz:
      "Winterferien gibt es nicht in jedem Bundesland. Wo es sie gibt, liegen sie im Januar oder Februar, direkt nach den Halbjahreszeugnissen, und dauern zwischen einem Tag und zwei Wochen. Länder im Norden und Osten haben meist eine oder zwei volle Wochen, andere nur ein verlängertes Wochenende. Manche Länder verzichten ganz darauf und haben dafür längere Oster- oder Pfingstferien.",
    faq: [
      {
        q: "Warum haben nicht alle Bundesländer Winterferien?",
        a: "Jedes Land verteilt seine 75 Ferien-Werktage im Schuljahr selbst. Länder mit langen Pfingst- oder Osterferien haben für eine Winterwoche keine Tage übrig. Laut Ferienkalender der KMK haben Baden-Württemberg, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz und Schleswig-Holstein derzeit keine Winterferien.",
      },
    ],
  },
  osterferien: {
    absatz:
      "Die Osterferien richten sich nach dem Osterfest und wandern deshalb jedes Jahr mit: Ostern kann zwischen dem 22. März und dem 25. April liegen. In den meisten Ländern dauern die Ferien zwei Wochen und schließen Karfreitag und Ostermontag ein. Hamburg nennt sie Frühjahrsferien und legt sie unabhängig vom Osterdatum in den März.",
    faq: [
      {
        q: "Warum sind die Osterferien jedes Jahr an einem anderen Datum?",
        a: "Ostern ist ein bewegliches Fest: Es fällt auf den ersten Sonntag nach dem ersten Vollmond im Frühling. Die Osterferien werden um dieses Datum herum gelegt und verschieben sich mit ihm.",
      },
    ],
  },
  pfingstferien: {
    absatz:
      "Richtige Pfingstferien mit ein bis zwei Wochen gibt es nur in wenigen Ländern, vor allem in Bayern und Baden-Württemberg. In vielen anderen Ländern führt die Kultusministerkonferenz unter „Himmelfahrt/Pfingsten“ nur einzelne freie Tage: den Freitag nach Christi Himmelfahrt oder den Dienstag nach Pfingsten. Auch das ist ein freier Tag, aber eben kein Urlaub.",
    faq: [
      {
        q: "Welche Bundesländer haben lange Pfingstferien?",
        a: "Zwei Wochen Pfingstferien haben traditionell Bayern und Baden-Württemberg. Einige weitere Länder haben rund eine Woche, die meisten nur einzelne Brückentage nach Himmelfahrt oder Pfingsten. Die genauen Termine stehen in der Übersicht aller Bundesländer.",
      },
    ],
  },
};

export function artText(art: Ferienart) {
  return ART_TEXT[art];
}

// ---------------------------------------------------------------------------
// Countdown je Ferienart und Land
// ---------------------------------------------------------------------------

function liste(namen: string[]): string {
  if (namen.length <= 1) return namen.join("");
  return `${namen.slice(0, -1).join(", ")} und ${namen[namen.length - 1]}`;
}

function zusatzText(z: Zeitraum[]): string {
  return liste(
    z.map((t) =>
      dauer(t) === 1 ? `${wochentagName(t.von)}, ${datumLang(t.von)}` : `${datumOhneJahr(t.von)} bis ${datumLang(t.bis)}`,
    ),
  );
}

const cache = new Map<string, Countdown | null>();

export function ferienCountdown(art: Ferienart, code: BundeslandCode): Countdown | null {
  const key = `${art}:${code}`;
  if (cache.has(key)) return cache.get(key) ?? null;
  const zeiten = ferienzeiten(art, code);
  const info = ferienart(art);
  if (zeiten.length === 0 || !info) {
    cache.set(key, null);
    return null;
  }
  const b = land(code);
  const lokal = lokalerName(art, code);
  const name = `${info.name} ${b.inName}`;
  const letzte = zeiten[zeiten.length - 1] as Ferienzeit;
  const wahl = (now: Date) => aktuelle(zeiten, now) ?? letzte;

  const c: Countdown = {
    slug: `${art}-${b.slug}`,
    pfad: ferienPfad(art, code),
    title: `${info.name} ${b.name}`,
    nominativ: `Die ${name}`,
    mehrzahl: true,
    tafel: `${info.name} ${b.name}`,
    question: `Wann sind ${info.name} ${b.inName}?`,
    category: "ferien",
    art: "zeitraum",
    bundesland: code,
    motif: "stempel",
    bis: `bis zu den ${info.name.replace(/ferien$/, "ferien")} ${b.inName}`,
    heute: `Heute beginnen die ${name}.`,
    laeuft: `${b.name} hat ${info.name}.`,
    getNextDate: (now) => mitternacht(wahl(now).von),
    getEndDate: (now) => mitternacht(wahl(now).bis),
    source: letzte.quelle,
    seoTitel: (s) => {
      const kopf = `${info.name} ${b.name} ${s.start.y}: ${spanneKurz({ von: s.start, bis: s.ende })}`;
      const lang =
        s.phase === "vor"
          ? `${kopf} (${nochTage(s.tage)})`
          : `${kopf}, noch ${s.restTage} ${plural(s.restTage, "Tag", "Tage")}`;
      return lang.length <= 64 ? lang : kopf;
    },
    zeilen: (now) => {
      const f = wahl(now);
      const block = freierBlock(f, code);
      const schule = ersterSchultag(f, code);
      return [
        ...(tagNr(block.von) !== tagNr(f.von) || tagNr(block.bis) !== tagNr(f.bis)
          ? [{ label: "Frei am Stück", wert: `${tageDiff(block.von, block.bis) + 1} Tage` }]
          : []),
        { label: "Erster Schultag danach", wert: `${wochentagName(schule).slice(0, 2)}, ${datumLang(schule)}` },
        { label: "Schuljahr", wert: f.schuljahr },
      ];
    },
    intro: "",
    facts: [],
    faq: [],
    related: [],
  };

  // Text, Fakten und Fragen hängen vom Datum ab und werden bei jedem Rendern frisch gebaut.
  Object.defineProperties(c, {
    intro: { get: () => ferienIntro(art, code, new Date()), enumerable: true },
    facts: { get: () => ferienFakten(art, code, new Date()), enumerable: true },
    faq: { get: () => [] as Faq[], enumerable: true },
    related: { get: () => ferienVerwandte(art, code), enumerable: true },
    source: { get: () => wahl(new Date()).quelle, enumerable: true },
  });
  c.faqDynamisch = (now) => ferienFaq(art, code, now);
  void lokal;
  cache.set(key, c);
  return c;
}

export function alleFerienCountdowns(): Countdown[] {
  return ferienKombinationen()
    .map(({ art, land: b }) => ferienCountdown(art.slug, b.code))
    .filter((c): c is Countdown => c !== null);
}

function ferienVerwandte(art: Ferienart, code: BundeslandCode): string[] {
  const b = land(code);
  const andereArten = FERIENARTEN.filter((a) => a.slug !== art && ferienzeiten(a.slug, code).length > 0).map((a) =>
    ferienPfad(a.slug, code),
  );
  const nachbarn = b.nachbarn.filter((n) => ferienzeiten(art, n).length > 0).map((n) => ferienPfad(art, n));
  return [...nachbarn, ...andereArten];
}

export function ferienIntro(art: Ferienart, code: BundeslandCode, now: Date): string {
  const zeiten = ferienzeiten(art, code);
  const f = aktuelle(zeiten, now) ?? (zeiten[zeiten.length - 1] as Ferienzeit);
  const info = ferienart(art) as FerienartInfo;
  const b = land(code);
  const lokal = lokalerName(art, code);
  const n = dauer(f);
  const block = freierBlock(f, code);
  const blockTage = tageDiff(block.von, block.bis) + 1;
  const schule = ersterSchultag(f, code);
  const feiertage = feiertageIn(block, code);
  const jahr = f.von.y === f.bis.y ? `${f.von.y}` : `${f.von.y}/${String(f.bis.y).slice(2)}`;

  const absaetze: string[] = [];

  // 1. Termin
  let a1 =
    n === 1
      ? `Die ${info.name} ${jahr} ${b.inName} bestehen aus einem einzigen Tag: ${datumMitWochentag(f.von)}.`
      : `Die ${info.name} ${jahr} ${b.inName} beginnen am ${datumMitWochentag(f.von)}, und enden am ${datumMitWochentag(f.bis)}. Das sind ${n} Tage.`;
  if (blockTage > n) {
    a1 += ` Mit den Wochenenden${feiertage.length ? " und Feiertagen" : ""} davor und danach sind ${blockTage} Tage am Stück frei, vom ${datumOhneJahr(block.von)} bis zum ${datumLang(block.bis)}.`;
  }
  a1 += ` Der erste Schultag danach ist ${datumMitWochentag(schule)}.`;
  if (lokal) a1 += ` Vor Ort heißen diese Ferien ${lokal}.`;
  absaetze.push(a1);

  // 2. Zusatztage, Feiertage, Hinweise
  const a2: string[] = [];
  if (f.zusatz.length) {
    const einer = f.zusatz.length === 1 && dauer(f.zusatz[0] as Zeitraum) === 1;
    a2.push(
      einer
        ? `Dazu kommt ein weiterer unterrichtsfreier Tag, den die Kultusministerkonferenz in derselben Spalte führt: ${zusatzText(f.zusatz)}.`
        : `Dazu kommen weitere unterrichtsfreie Tage, die die Kultusministerkonferenz in derselben Spalte führt: ${zusatzText(f.zusatz)}.`,
    );
  }
  if (feiertage.length) {
    a2.push(
      `In die freie Zeit ${feiertage.length === 1 ? "fällt ein gesetzlicher Feiertag" : `fallen ${feiertage.length} gesetzliche Feiertage`}: ${liste(feiertage.map((x) => `${x.name} (${datumOhneJahr(x.tag)})`))}.`,
    );
  }
  if (f.hinweis) a2.push(f.hinweis);
  if (f.vorlaeufig)
    a2.push(
      "Dieser Termin stammt aus der langfristigen Sommerferienregelung der Kultusministerkonferenz. Den genauen Ferienkalender für das Schuljahr hat sie noch nicht veröffentlicht.",
    );
  if (a2.length) absaetze.push(a2.join(" "));

  // 3. Einordnung im Ländervergleich
  const alle = FERIEN.filter((g) => g.art === art && g.schuljahr === f.schuljahr).sort(
    (x, y) => tagNr(x.von) - tagNr(y.von),
  );
  if (alle.length > 1) {
    const frueher = alle.filter((g) => tagNr(g.von) < tagNr(f.von)).length;
    const gleich = alle.filter((g) => g.land !== code && tagNr(g.von) === tagNr(f.von)).map((g) => land(g.land).name);
    const laengste = Math.max(...alle.map(dauer));
    const kuerzeste = Math.min(...alle.map(dauer));
    let a3 = `Im Vergleich: ${alle.length} Bundesländer haben in diesem Schuljahr ${info.name}. `;
    if (frueher === 0) a3 += `${b.name} startet ${gleich.length ? "mit als Erstes" : "als erstes Land"}`;
    else if (frueher + gleich.length === alle.length - 1 && frueher >= alle.length - 1 - gleich.length)
      a3 += `${b.name} startet ${gleich.length ? "mit als Letztes" : "als letztes Land"}`;
    else a3 += `${frueher} ${frueher === 1 ? "Land beginnt" : "Länder beginnen"} früher als ${b.name}`;
    if (gleich.length) a3 += `, am selben Tag wie ${liste(gleich)}`;
    a3 += ". ";
    if (laengste !== kuerzeste)
      a3 += `Die Dauer reicht je nach Land von ${kuerzeste} ${plural(kuerzeste, "Tag", "Tagen")} bis ${laengste} Tagen. `;
    a3 += `Alle Termine nebeneinander stehen in der [Übersicht der ${info.name} in allen Bundesländern](${ferienPfad(art)}), alle Ferien des Landes unter [Schulferien ${b.inName}](/ferien/${b.slug}).`;
    absaetze.push(a3);
  }

  // 4. Allgemeines zur Ferienart
  absaetze.push(ART_TEXT[art].absatz);
  return absaetze.join("\n\n");
}

export function ferienFakten(art: Ferienart, code: BundeslandCode, now: Date): string[] {
  const zeiten = ferienzeiten(art, code);
  const f = aktuelle(zeiten, now) ?? (zeiten[zeiten.length - 1] as Ferienzeit);
  const info = ferienart(art) as FerienartInfo;
  const b = land(code);
  const fakten: string[] = [];
  const folgende = zeiten.filter((z) => tagNr(z.von) > tagNr(f.von));
  const naechste = folgende[0];
  if (naechste)
    fakten.push(
      `Im Schuljahr ${naechste.schuljahr} sind die ${info.name} ${b.inName} vom ${zeitraumKurz(naechste.von, naechste.bis)}.`,
    );
  const fehlend = FERIENARTEN.filter((a) => ferienzeiten(a.slug, code).length === 0).map((a) => a.name);
  if (fehlend.length) fakten.push(`${b.name} hat laut KMK-Kalender keine ${liste(fehlend)}.`);
  fakten.push(`Zuständig für die Ferientermine ist das Land: ${b.ministerium}.`);
  fakten.push(
    "Zusätzlich zu den festen Ferien gibt es bewegliche Ferientage, über die jede Schule selbst entscheidet. Sie stehen nicht in dieser Übersicht.",
  );
  return fakten;
}

export function ferienFaq(art: Ferienart, code: BundeslandCode, now: Date): Faq[] {
  const zeiten = ferienzeiten(art, code);
  const f = aktuelle(zeiten, now) ?? (zeiten[zeiten.length - 1] as Ferienzeit);
  const info = ferienart(art) as FerienartInfo;
  const b = land(code);
  const n = dauer(f);
  const block = freierBlock(f, code);
  const schule = ersterSchultag(f, code);
  const jahr = f.von.y === f.bis.y ? `${f.von.y}` : `${f.von.y}/${String(f.bis.y).slice(2)}`;
  const parallel = gleichzeitig(f);
  const faq: Faq[] = [
    {
      q: `Wann beginnen die ${info.name} ${jahr} ${b.inName}?`,
      a:
        n === 1
          ? `Die ${info.name} ${b.inName} sind ${jahr} nur ein Tag: ${datumMitWochentag(f.von)}.`
          : `Am ${datumMitWochentag(f.von)}. Der letzte Ferientag ist ${datumMitWochentag(f.bis)}.`,
    },
    {
      q: `Wie lange dauern die ${info.name} ${b.inName}?`,
      a: `${n} ${plural(n, "Tag", "Tage")}, vom ${zeitraumKurz(f.von, f.bis)}. Rechnet man die angrenzenden Wochenenden und Feiertage dazu, sind ${tageDiff(block.von, block.bis) + 1} Tage am Stück frei.`,
    },
    {
      q: `Wann ist der erste Schultag nach den ${info.name}?`,
      a: `Am ${datumMitWochentag(schule)}. Einzelne Schulen können durch bewegliche Ferientage davon abweichen.`,
    },
  ];
  if (parallel.length) {
    faq.push({
      q: `Welche Bundesländer haben gleichzeitig ${info.name}?`,
      a: `In dieser Zeit haben auch ${liste(parallel.map((p) => p.land.name))} ${info.name}, zumindest an einem Teil der Tage.`,
    });
  }
  faq.push(...ART_TEXT[art].faq);
  faq.push({
    q: "Woher stammen die Termine?",
    a: `Aus dem Ferienkalender der Kultusministerkonferenz für das Schuljahr ${f.schuljahr}, abgerufen am ${datumLang(ausIso(FERIEN_ABGERUFEN))}. Verbindlich sind die Veröffentlichungen des Landes (${b.ministerium}).`,
  });
  return faq;
}

// ---------------------------------------------------------------------------
// Alle Ferien eines Landes: /ferien/<bundesland>
// ---------------------------------------------------------------------------

export function ferienLandCountdown(code: BundeslandCode): Countdown {
  const key = `land:${code}`;
  const vorhanden = cache.get(key);
  if (vorhanden) return vorhanden;
  const b = land(code);
  const zeiten = ferienImLand(code).filter((f) => dauer(f) >= 2);
  const letzte = zeiten[zeiten.length - 1] as Ferienzeit;
  const wahl = (now: Date) => aktuelle(zeiten, now) ?? letzte;
  const artName = (f: Ferienzeit) => (ferienart(f.art) as FerienartInfo).name;

  const c: Countdown = {
    slug: `ferien-${b.slug}`,
    pfad: `/ferien/${b.slug}`,
    title: `Ferien ${b.name}`,
    nominativ: `Die nächsten Ferien ${b.inName}`,
    mehrzahl: true,
    tafel: `Ferien ${b.name}`,
    question: `Wann sind die nächsten Ferien ${b.inName}?`,
    category: "ferien",
    art: "zeitraum",
    bundesland: code,
    motif: "stempel",
    bis: `bis zu den nächsten Ferien ${b.inName}`,
    heute: `Heute beginnen ${b.inName} die Ferien.`,
    laeuft: `${b.name} hat Ferien.`,
    getNextDate: (now) => mitternacht(wahl(now).von),
    getEndDate: (now) => mitternacht(wahl(now).bis),
    source: KMK_UEBERSICHT,
    seoTitel: (s) =>
      s.phase === "vor"
        ? `Schulferien ${b.name} ${s.heute.y}/${String(s.heute.y + 1).slice(2)}: Ferien in ${s.tage} ${plural(s.tage, "Tag", "Tagen")}`
        : `Schulferien ${b.name}: Ferien, noch ${s.restTage} ${plural(s.restTage, "Tag", "Tage")}`,
    zeilen: (now) => {
      const f = wahl(now);
      return [
        { label: "Welche Ferien", wert: artName(f) },
        { label: "Erster Schultag danach", wert: datumLang(ersterSchultag(f, code)) },
      ];
    },
    intro: "",
    facts: [],
    faq: [],
    related: [],
  };
  Object.defineProperties(c, {
    intro: {
      enumerable: true,
      get: () => {
        const now = new Date();
        const f = wahl(now);
        const danach = zeiten.find((z) => tagNr(z.von) > tagNr(f.bis));
        const fehlend = FERIENARTEN.filter((a) => ferienzeiten(a.slug, code).length === 0).map((a) => a.name);
        const teile = [
          `Die nächsten Ferien ${b.inName} sind die [${artName(f)}](${ferienPfad(f.art, code)}): vom ${datumMitWochentag(f.von)}, bis zum ${datumMitWochentag(f.bis)}. Das sind ${dauer(f)} Tage.${
            danach
              ? ` Danach folgen die [${artName(danach)}](${ferienPfad(danach.art, code)}) ab dem ${datumLang(danach.von)}.`
              : ""
          }`,
          `Die Tabelle weiter unten zeigt alle Ferien ${b.inName} für die Schuljahre, deren Kalender die Kultusministerkonferenz schon veröffentlicht hat.${
            fehlend.length ? ` ${b.name} hat keine ${liste(fehlend)}.` : ""
          } Einzelne freie Tage, etwa der Freitag nach Christi Himmelfahrt, stehen bei der jeweiligen Ferienart.`,
          `Bewegliche Ferientage fehlen in jeder landesweiten Übersicht, auch in dieser: Über sie entscheidet die einzelne Schule. Wer es genau wissen muss, fragt dort nach. Die gesetzlichen Feiertage des Landes stehen unter [Feiertage ${b.inName}](/feiertage/${b.slug}).`,
        ];
        return teile.join("\n\n");
      },
    },
    facts: {
      enumerable: true,
      get: () => [
        "Die Länder haben vereinbart, dass die Ferien eines Schuljahres zusammen 75 Werktage umfassen.",
        `Zuständig für die Ferientermine: ${b.ministerium}.`,
        `Stand der Daten: ${datumLang(ausIso(FERIEN_ABGERUFEN))}.`,
      ],
    },
    related: {
      enumerable: true,
      get: () => [
        ...FERIENARTEN.filter((a) => ferienzeiten(a.slug, code).length > 0).map((a) => ferienPfad(a.slug, code)),
        ...b.nachbarn.map((n) => `/ferien/${land(n).slug}`),
      ],
    },
  });
  c.faqDynamisch = (now) => {
    const f = wahl(now);
    const sommer = aktuelle(ferienzeiten("sommerferien", code), now);
    const faq: Faq[] = [
      {
        q: `Wann sind die nächsten Ferien ${b.inName}?`,
        a: `Die ${artName(f)}: vom ${zeitraumKurz(f.von, f.bis)}.`,
      },
    ];
    if (sommer)
      faq.push({
        q: `Wann sind Sommerferien ${b.inName}?`,
        a: `Die nächsten Sommerferien ${b.inName} dauern vom ${datumMitWochentag(sommer.von)}, bis zum ${datumMitWochentag(sommer.bis)}.`,
      });
    faq.push(
      {
        q: `Wie viele Ferientage gibt es ${b.inName}?`,
        a: "In allen Bundesländern sind es 75 Werktage im Schuljahr, gezählt von Montag bis Samstag. Darauf haben sich die Länder im Hamburger Abkommen geeinigt. Hinzu kommen je nach Land einige bewegliche Ferientage.",
      },
      {
        q: "Woher stammen die Termine?",
        a: `Aus den Ferienkalendern der Kultusministerkonferenz, abgerufen am ${datumLang(ausIso(FERIEN_ABGERUFEN))}. Verbindlich sind die Veröffentlichungen des Landes (${b.ministerium}).`,
      },
    );
    return faq;
  };
  cache.set(key, c);
  return c;
}

function datumKurzOhne(t: Tag): string {
  return `am ${t.d}. ${["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"][t.m - 1]}`;
}

/** Kompakter Zeitraum ohne Jahr: „24.12.–08.01.“ */
export function spanneKurz(f: Zeitraum): string {
  const tm = (t: Tag) => `${String(t.d).padStart(2, "0")}.${String(t.m).padStart(2, "0")}.`;
  return tagNr(f.von) === tagNr(f.bis) ? tm(f.von) : `${tm(f.von)}–${tm(f.bis)}`;
}

// ---------------------------------------------------------------------------
// Schulanfang nach den Sommerferien: /schule/<bundesland>/schulanfang
// ---------------------------------------------------------------------------

export function schulanfaenge(code: BundeslandCode): { jahr: number; tag: Tag; ferien: Ferienzeit }[] {
  return ferienzeiten("sommerferien", code).map((f) => {
    const tag = ersterSchultag(f, code);
    return { jahr: tag.y, tag, ferien: f };
  });
}

export function schulanfangCountdown(code: BundeslandCode): Countdown {
  const key = `schule:${code}`;
  const vorhanden = cache.get(key);
  if (vorhanden) return vorhanden;
  const b = land(code);
  const termine = schulanfaenge(code);
  const wahl = (now: Date) => {
    const heute = tagNr(tagVon(now));
    return termine.find((t) => tagNr(t.tag) >= heute) ?? (termine[termine.length - 1] as (typeof termine)[number]);
  };
  const c: Countdown = {
    slug: `schulanfang-${b.slug}`,
    pfad: `/schule/${b.slug}/schulanfang`,
    title: `Schulanfang ${b.name}`,
    nominativ: `Der Schulanfang ${b.inName}`,
    tafel: `Schulanfang ${b.name}`,
    question: `Wann beginnt die Schule ${b.inName}?`,
    category: "schule",
    art: "tag",
    bundesland: code,
    motif: "schultuete",
    bis: `bis zum Schulanfang ${b.inName}`,
    heute: `Heute beginnt ${b.inName} die Schule.`,
    getNextDate: (now) => mitternacht(wahl(now).tag),
    datumImJahr: (jahr) => termine.find((t) => t.jahr === jahr)?.tag ?? null,
    source: KMK_UEBERSICHT,
    seoTitel: (s) =>
      s.phase === "vor"
        ? `Schulanfang ${b.name} ${s.start.y}: erster Schultag ${datumKurzOhne(s.start)}`
        : `Schulanfang ${b.name}: Heute ist der erste Schultag`,
    zeilen: (now) => {
      const t = wahl(now);
      return [{ label: "Sommerferien davor", wert: zeitraumKurz(t.ferien.von, t.ferien.bis) }];
    },
    intro: "",
    facts: [
      "Das Schuljahr beginnt in allen Bundesländern rechtlich am 1. August und endet am 31. Juli. Der Unterricht startet nach den Sommerferien.",
      "Der Termin der Einschulungsfeier ist Sache der einzelnen Schule.",
      `Zuständig: ${b.ministerium}.`,
    ],
    faq: [
      {
        q: "Wann ist die Einschulung der Erstklässler?",
        a: "Das legt jede Grundschule selbst fest. Üblich ist ein Termin in den ersten Tagen des neuen Schuljahres, in manchen Ländern traditionell am Samstag. Den genauen Tag teilt die Schule den Eltern mit.",
      },
      {
        q: "Beginnt das Schuljahr am ersten Schultag?",
        a: "Rechtlich nicht. Das Schuljahr läuft in allen Ländern vom 1. August bis zum 31. Juli. Der erste Schultag ist der erste Unterrichtstag nach den Sommerferien, und der liegt je nach Land zwischen Anfang August und Mitte September.",
      },
    ],
    related: [],
  };
  Object.defineProperties(c, {
    intro: {
      enumerable: true,
      get: () => {
        const t = wahl(new Date());
        const sortiert = BUNDESLAENDER.map((x) => ({ x, s: schulanfaenge(x.code).find((e) => e.jahr === t.jahr) }))
          .filter((e) => e.s)
          .sort((p, q) => tagNr(p.s!.tag) - tagNr(q.s!.tag));
        const rang = sortiert.findIndex((e) => e.x.code === code) + 1;
        const erster = sortiert[0];
        const letzter = sortiert[sortiert.length - 1];
        return [
          `Der erste Schultag nach den Sommerferien ${t.jahr} ${b.inName} ist ${datumMitWochentag(t.tag)}. Die [Sommerferien ${b.inName}](${ferienPfad("sommerferien", code)}) enden am ${datumMitWochentag(t.ferien.bis)}. Der Schulanfang ist der erste Tag danach, der weder auf ein Wochenende noch auf einen gesetzlichen Feiertag fällt.`,
          `Im Ländervergleich ${t.jahr}: ${b.name} ist das ${rang}. von 16 Ländern, in denen die Schule wieder beginnt.${
            erster && letzter
              ? ` Als Erstes startet ${erster.x.name} am ${datumLang(erster.s!.tag)}, als Letztes ${letzter.x.name} am ${datumLang(letzter.s!.tag)}.`
              : ""
          } Alle Termine stehen in der [Übersicht zum Schulanfang in allen Bundesländern](/schule).`,
          "Der Termin ist aus dem Ferienkalender der Kultusministerkonferenz abgeleitet. Einzelne Schulen können durch bewegliche Ferientage oder Konferenztage einen Tag später beginnen. Für Erstklässler gilt ohnehin ein eigener Termin: Die Einschulung findet meist einige Tage nach dem ersten Schultag statt.",
        ].join("\n\n");
      },
    },
    related: {
      enumerable: true,
      get: () => [
        ferienPfad("sommerferien", code),
        ...b.nachbarn.map((n) => `/schule/${land(n).slug}/schulanfang`),
        ferienPfad("herbstferien", code),
        `/ferien/${b.slug}`,
      ],
    },
  });
  c.faqDynamisch = (now) => {
    const t = wahl(now);
    return [
      {
        q: `Wann ist der erste Schultag ${t.jahr} ${b.inName}?`,
        a: `Am ${datumMitWochentag(t.tag)}. Das ist der erste Werktag nach dem Ende der Sommerferien am ${datumLang(t.ferien.bis)}.`,
      },
      {
        q: "Woher stammt der Termin?",
        a: `Er ist aus dem Sommerferien-Termin der Kultusministerkonferenz berechnet (Stand ${datumLang(ausIso(FERIEN_ABGERUFEN))}). Verbindlich sind die Angaben des Landes und der einzelnen Schule.`,
      },
    ];
  };
  cache.set(key, c);
  return c;
}

export function alleSchulanfangCountdowns(): Countdown[] {
  return BUNDESLAENDER.map((b) => schulanfangCountdown(b.code));
}

export function alleFerienLandCountdowns(): Countdown[] {
  return BUNDESLAENDER.map((b) => ferienLandCountdown(b.code));
}
