import type { Countdown, Faq } from "@/lib/countdown";
import {
  advent,
  aschermittwoch,
  bussUndBettag,
  christiHimmelfahrt,
  fronleichnam,
  karfreitag,
  muttertag,
  ostermontag,
  ostersonntag,
  pfingstmontag,
  pfingstsonntag,
  rosenmontag,
  sommerzeitBeginn,
  sommerzeitEnde,
  weiberfastnacht,
} from "@/lib/feiertage";
import {
  MONATE,
  MONATE_SLUG,
  datumLang,
  datumMitWochentag,
  monatName,
  plural,
  wochentagName,
} from "@/lib/format";
import { kalenderwoche } from "@/lib/kw";
import {
  type Tag,
  gleicherTag,
  istSchaltjahr,
  mitternacht,
  plusTage,
  tageDiff,
  tageImMonat,
  tagImJahr,
  tagNr,
  tagVon,
} from "@/lib/zeit";
import { BUNDESLAENDER } from "./bundeslaender";
import { GESETZLICH } from "./feiertage-laender";
import { FERIEN, FERIENARTEN } from "./ferien";

/**
 * Datumsseiten: /tage-bis/1-april … /tage-bis/31-dezember, 366 Stück.
 * Jede Seite bekommt Inhalte, die nur für dieses Datum gelten: Wochentage, Tag im Jahr,
 * feste und bewegliche Feste, Ferien in den Ländern, Sternzeichen, Jahreszeit.
 */

export type Datum = { d: number; m: number };

export const ALLE_DATEN: Datum[] = MONATE.flatMap((_, i) =>
  Array.from({ length: i === 1 ? 29 : tageImMonat(2027, i + 1) }, (_, j) => ({ d: j + 1, m: i + 1 })),
);

export function datumSlug(x: Datum): string {
  return `${x.d}-${MONATE_SLUG[x.m - 1]}`;
}

export function datumPfad(x: Datum): string {
  return `/tage-bis/${datumSlug(x)}`;
}

export function datumAusSlug(slug: string): Datum | undefined {
  const t = /^(\d{1,2})-([a-z]+)$/.exec(slug);
  if (!t) return undefined;
  const m = MONATE_SLUG.indexOf(t[2] as (typeof MONATE_SLUG)[number]) + 1;
  const d = Number(t[1]);
  if (m < 1 || d < 1 || d > (m === 2 ? 29 : tageImMonat(2027, m))) return undefined;
  return { d, m };
}

export function datumName(x: Datum): string {
  return `${x.d}. ${monatName(x.m)}`;
}

/** Das Datum im angegebenen Jahr. Der 29. Februar existiert nur in Schaltjahren. */
function imJahr(x: Datum, jahr: number): Tag | null {
  if (x.m === 2 && x.d === 29 && !istSchaltjahr(jahr)) return null;
  return { y: jahr, m: x.m, d: x.d };
}

export function naechstesVorkommen(x: Datum, now: Date): Tag {
  const heute = tagVon(now);
  for (let y = heute.y; y < heute.y + 9; y++) {
    const t = imJahr(x, y);
    if (t && tagNr(t) >= tagNr(heute)) return t;
  }
  return { y: heute.y + 1, m: x.m, d: x.d };
}

function benachbart(x: Datum, schritt: 1 | -1): Datum {
  const i = ALLE_DATEN.findIndex((e) => e.d === x.d && e.m === x.m);
  return ALLE_DATEN[(i + schritt + ALLE_DATEN.length) % ALLE_DATEN.length] as Datum;
}

export const tagDavor = (x: Datum) => benachbart(x, -1);
export const tagDanach = (x: Datum) => benachbart(x, 1);

// ---------------------------------------------------------------------------
// Sternzeichen und Jahreszeit
// ---------------------------------------------------------------------------

const STERNZEICHEN: { name: string; ab: [number, number] }[] = [
  { name: "Steinbock", ab: [12, 22] },
  { name: "Wassermann", ab: [1, 21] },
  { name: "Fische", ab: [2, 20] },
  { name: "Widder", ab: [3, 21] },
  { name: "Stier", ab: [4, 21] },
  { name: "Zwillinge", ab: [5, 21] },
  { name: "Krebs", ab: [6, 22] },
  { name: "Löwe", ab: [7, 23] },
  { name: "Jungfrau", ab: [8, 24] },
  { name: "Waage", ab: [9, 24] },
  { name: "Skorpion", ab: [10, 24] },
  { name: "Schütze", ab: [11, 23] },
];

export function sternzeichen(x: Datum): string {
  const wert = x.m * 100 + x.d;
  let aktuell = "Steinbock";
  for (const z of STERNZEICHEN.slice(1)) {
    if (wert >= z.ab[0] * 100 + z.ab[1]) aktuell = z.name;
  }
  if (wert >= 1222) aktuell = "Steinbock";
  return aktuell;
}

export function jahreszeit(x: Datum): string {
  if (x.m >= 3 && x.m <= 5) return "Frühling";
  if (x.m >= 6 && x.m <= 8) return "Sommer";
  if (x.m >= 9 && x.m <= 11) return "Herbst";
  return "Winter";
}

// ---------------------------------------------------------------------------
// Was an diesem Tag ist
// ---------------------------------------------------------------------------

/** Feste Gedenk- und Aktionstage. Nur allgemein bekannte, eindeutig datierte Tage. */
const FESTE_TAGE: Record<string, { name: string; text: string; pfad?: string }[]> = {
  "1-1": [{ name: "Neujahr", text: "Gesetzlicher Feiertag in ganz Deutschland.", pfad: "/neujahr" }],
  "6-1": [{ name: "Heilige Drei Könige", text: "Feiertag in Baden-Württemberg, Bayern und Sachsen-Anhalt. Die Sternsinger sind unterwegs.", pfad: "/heilige-drei-koenige" }],
  "27-1": [{ name: "Tag des Gedenkens an die Opfer des Nationalsozialismus", text: "Am 27. Januar 1945 wurde das Konzentrationslager Auschwitz befreit. Seit 1996 ist der Tag in Deutschland gesetzlich verankerter Gedenktag." }],
  "2-2": [{ name: "Mariä Lichtmess", text: "40 Tage nach Weihnachten. Früher endete an diesem Tag die Weihnachtszeit, in den USA ist Murmeltiertag." }],
  "14-2": [{ name: "Valentinstag", text: "Tag der Verliebten, kein Feiertag.", pfad: "/valentinstag" }],
  "29-2": [{ name: "Schalttag", text: "Der 29. Februar existiert nur in Schaltjahren, also meist alle vier Jahre." }],
  "8-3": [{ name: "Internationaler Frauentag", text: "Gesetzlicher Feiertag in Berlin und Mecklenburg-Vorpommern.", pfad: "/frauentag" }],
  "14-3": [{ name: "Pi-Tag", text: "In amerikanischer Schreibweise 3/14, die ersten Stellen der Kreiszahl Pi. Zugleich der Geburtstag von Albert Einstein (1879)." }],
  "17-3": [{ name: "St. Patrick’s Day", text: "Irischer Nationalfeiertag zu Ehren des heiligen Patrick." }],
  "22-3": [{ name: "Weltwassertag", text: "Aktionstag der Vereinten Nationen seit 1993." }],
  "1-4": [{ name: "Erster April", text: "Der Tag der Aprilscherze. Was heute in der Zeitung steht, stimmt nicht unbedingt." }],
  "22-4": [{ name: "Tag der Erde", text: "Internationaler Aktionstag für den Umweltschutz, erstmals 1970 in den USA begangen." }],
  "23-4": [{ name: "Welttag des Buches", text: "Von der UNESCO ausgerufen. In Deutschland außerdem Tag des Bieres: Am 23. April 1516 wurde in Bayern das Reinheitsgebot erlassen." }],
  "30-4": [{ name: "Walpurgisnacht", text: "Die Nacht zum 1. Mai, mit Tanz in den Mai und Maifeuern." }],
  "1-5": [{ name: "Tag der Arbeit", text: "Gesetzlicher Feiertag in ganz Deutschland.", pfad: "/tag-der-arbeit" }],
  "4-5": [{ name: "Star-Wars-Tag", text: "Wegen des Wortspiels „May the Fourth be with you“." }],
  "8-5": [{ name: "Tag der Befreiung", text: "Am 8. Mai 1945 endete in Europa der Zweite Weltkrieg." }],
  "9-5": [{ name: "Europatag", text: "Erinnert an die Schuman-Erklärung vom 9. Mai 1950, den Ausgangspunkt der europäischen Einigung." }],
  "23-5": [{ name: "Tag des Grundgesetzes", text: "Am 23. Mai 1949 wurde das Grundgesetz verkündet." }],
  "1-6": [{ name: "Internationaler Kindertag", text: "In vielen Ländern Kindertag. In Deutschland wird er vor allem im Osten gefeiert, der Weltkindertag folgt am 20. September." }],
  "5-6": [{ name: "Weltumwelttag", text: "Aktionstag der Vereinten Nationen seit 1972." }],
  "17-6": [{ name: "Jahrestag des Volksaufstands in der DDR", text: "Am 17. Juni 1953 gingen in der DDR rund eine Million Menschen auf die Straße. In der Bundesrepublik war der Tag bis 1990 als „Tag der deutschen Einheit“ Feiertag." }],
  "24-6": [{ name: "Johannistag", text: "Hochfest der Geburt Johannes des Täufers. Traditionell endet die Spargel- und Rhabarberernte." }],
  "27-6": [{ name: "Siebenschläfertag", text: "Nach der Bauernregel bleibt das Wetter sieben Wochen so, wie es heute ist. Die Regel hat mit dem Nagetier nichts zu tun." }],
  "4-7": [{ name: "Unabhängigkeitstag der USA", text: "Am 4. Juli 1776 wurde die Unabhängigkeitserklärung angenommen." }],
  "14-7": [{ name: "Französischer Nationalfeiertag", text: "Erinnert an den Sturm auf die Bastille am 14. Juli 1789." }],
  "20-7": [{ name: "Jahrestag des 20. Juli 1944", text: "Gedenken an das gescheiterte Attentat auf Hitler. Am 20. Juli 1969 landeten außerdem die ersten Menschen auf dem Mond (in deutscher Zeit: in der Nacht zum 21. Juli)." }],
  "1-8": [{ name: "Schweizer Bundesfeiertag", text: "Nationalfeiertag der Schweiz." }],
  "8-8": [{ name: "Augsburger Friedensfest", text: "Gesetzlicher Feiertag nur im Stadtgebiet von Augsburg. Damit hat Augsburg die meisten Feiertage in Deutschland." }],
  "13-8": [{ name: "Jahrestag des Mauerbaus", text: "Am 13. August 1961 begann die DDR mit dem Bau der Berliner Mauer." }],
  "15-8": [{ name: "Mariä Himmelfahrt", text: "Feiertag im Saarland und in den überwiegend katholischen Gemeinden Bayerns.", pfad: "/mariae-himmelfahrt" }],
  "1-9": [{ name: "Antikriegstag", text: "Am 1. September 1939 begann mit dem deutschen Überfall auf Polen der Zweite Weltkrieg. Zugleich meteorologischer Herbstanfang." }],
  "20-9": [{ name: "Weltkindertag", text: "Gesetzlicher Feiertag in Thüringen.", pfad: "/weltkindertag" }],
  "3-10": [{ name: "Tag der Deutschen Einheit", text: "Gesetzlicher Feiertag in ganz Deutschland.", pfad: "/tag-der-deutschen-einheit" }],
  "4-10": [{ name: "Welttierschutztag", text: "Am Gedenktag des heiligen Franz von Assisi." }],
  "26-10": [{ name: "Österreichischer Nationalfeiertag", text: "Erinnert an das Neutralitätsgesetz von 1955." }],
  "31-10": [
    { name: "Reformationstag", text: "Feiertag in neun Bundesländern.", pfad: "/reformationstag" },
    { name: "Halloween", text: "Der Abend vor Allerheiligen.", pfad: "/halloween" },
  ],
  "1-11": [{ name: "Allerheiligen", text: "Feiertag in fünf Bundesländern.", pfad: "/allerheiligen" }],
  "2-11": [{ name: "Allerseelen", text: "Katholischer Gedenktag für die Verstorbenen, kein Feiertag." }],
  "9-11": [{ name: "9. November", text: "Ein Datum, an dem sich deutsche Geschichte mehrfach entschied: Ausrufung der Republik 1918, Novemberpogrome 1938, Fall der Berliner Mauer 1989." }],
  "11-11": [
    { name: "Sankt Martin", text: "Martinstag mit Laternenumzügen.", pfad: "/sankt-martin" },
    { name: "Beginn der Karnevalssession", text: "Um 11:11 Uhr.", pfad: "/karneval" },
  ],
  "1-12": [{ name: "Welt-AIDS-Tag", text: "Seit 1988. Außerdem meteorologischer Winteranfang, und am Adventskalender geht das erste Türchen auf." }],
  "4-12": [{ name: "Barbaratag", text: "Heute geschnittene Kirsch- oder Forsythienzweige blühen zu Weihnachten." }],
  "6-12": [{ name: "Nikolaus", text: "Die Stiefel sollten seit gestern Abend vor der Tür stehen.", pfad: "/nikolaus" }],
  "10-12": [{ name: "Tag der Menschenrechte", text: "Am 10. Dezember 1948 verabschiedeten die Vereinten Nationen die Allgemeine Erklärung der Menschenrechte. In Oslo und Stockholm werden die Nobelpreise verliehen." }],
  "13-12": [{ name: "Luciafest", text: "Lichterfest, vor allem in Schweden." }],
  "24-12": [{ name: "Heiligabend", text: "Kein Feiertag, aber Bescherung.", pfad: "/heiligabend" }],
  "25-12": [{ name: "1. Weihnachtstag", text: "Gesetzlicher Feiertag in ganz Deutschland.", pfad: "/weihnachten" }],
  "26-12": [{ name: "2. Weihnachtstag", text: "Gesetzlicher Feiertag in ganz Deutschland.", pfad: "/weihnachten" }],
  "31-12": [{ name: "Silvester", text: "Der letzte Tag des Jahres, kein Feiertag.", pfad: "/silvester" }],
};

export function festeTage(x: Datum) {
  return FESTE_TAGE[`${x.d}-${x.m}`] ?? [];
}

const BEWEGLICH: { name: string; pfad?: string; datum: (jahr: number) => Tag }[] = [
  { name: "Weiberfastnacht", pfad: "/weiberfastnacht", datum: weiberfastnacht },
  { name: "Rosenmontag", pfad: "/rosenmontag", datum: rosenmontag },
  { name: "Aschermittwoch", pfad: "/aschermittwoch", datum: aschermittwoch },
  { name: "Karfreitag", pfad: "/karfreitag", datum: karfreitag },
  { name: "Ostersonntag", pfad: "/ostern", datum: ostersonntag },
  { name: "Ostermontag", pfad: "/ostermontag", datum: ostermontag },
  { name: "Muttertag", pfad: "/muttertag", datum: muttertag },
  { name: "Christi Himmelfahrt", pfad: "/christi-himmelfahrt", datum: christiHimmelfahrt },
  { name: "Pfingstsonntag", pfad: "/pfingsten", datum: pfingstsonntag },
  { name: "Pfingstmontag", pfad: "/pfingstmontag", datum: pfingstmontag },
  { name: "Fronleichnam", pfad: "/fronleichnam", datum: fronleichnam },
  { name: "Beginn der Sommerzeit", pfad: "/zeitumstellung", datum: sommerzeitBeginn },
  { name: "Ende der Sommerzeit", pfad: "/zeitumstellung", datum: sommerzeitEnde },
  { name: "Buß- und Bettag", pfad: "/buss-und-bettag", datum: bussUndBettag },
  { name: "1. Advent", pfad: "/1-advent", datum: (j) => advent(j, 1) },
  { name: "2. Advent", pfad: "/2-advent", datum: (j) => advent(j, 2) },
  { name: "3. Advent", pfad: "/3-advent", datum: (j) => advent(j, 3) },
  { name: "4. Advent", pfad: "/4-advent", datum: (j) => advent(j, 4) },
];

/** Bewegliche Feste, die in den nächsten Jahren auf dieses Datum fallen. */
export function beweglicheAm(x: Datum, abJahr: number, jahre = 12): { name: string; pfad?: string; jahr: number }[] {
  const out: { name: string; pfad?: string; jahr: number }[] = [];
  for (let y = abJahr; y < abJahr + jahre; y++) {
    const t = imJahr(x, y);
    if (!t) continue;
    for (const b of BEWEGLICH) if (gleicherTag(b.datum(y), t)) out.push({ name: b.name, pfad: b.pfad, jahr: y });
  }
  return out;
}

/** Gesetzliche Feiertage mit festem Datum an diesem Tag, samt Geltungsbereich. */
export function gesetzlichAm(x: Datum): { name: string; pfad?: string; wo: string }[] {
  const out: { name: string; pfad?: string; wo: string }[] = [];
  for (const f of GESETZLICH) {
    if (f.key.startsWith("einmalig")) continue;
    const a = f.datum(2027);
    const b = f.datum(2028);
    // Fest ist ein Datum nur, wenn es in zwei Jahren auf denselben Kalendertag fällt.
    if (!a || !b || a.m !== b.m || a.d !== b.d || a.m !== x.m || a.d !== x.d) continue;
    out.push({
      name: f.name,
      pfad: f.pfad,
      wo:
        f.laender === "alle"
          ? "in ganz Deutschland"
          : `in ${f.laender.map((c) => BUNDESLAENDER.find((b2) => b2.code === c)?.name ?? c).join(", ")}`,
    });
  }
  return out;
}

/** Länder, die am angegebenen Tag Schulferien haben (nur Hauptzeiträume). */
export function ferienAm(t: Tag): { land: string; art: string }[] {
  const nr = tagNr(t);
  return FERIEN.filter((f) => tagNr(f.von) <= nr && tagNr(f.bis) >= nr).map((f) => ({
    land: BUNDESLAENDER.find((b) => b.code === f.land)?.name ?? f.land,
    art: FERIENARTEN.find((a) => a.slug === f.art)?.name ?? f.art,
  }));
}

/** Reichen die Feriendaten bis zu diesem Tag? */
export function ferienDatenReichenBis(t: Tag): boolean {
  const letzter = FERIEN.filter((f) => !f.vorlaeufig).reduce((max, f) => Math.max(max, tagNr(f.bis)), 0);
  return tagNr(t) <= letzter;
}

function liste(namen: string[]): string {
  if (namen.length <= 1) return namen.join("");
  return `${namen.slice(0, -1).join(", ")} und ${namen[namen.length - 1]}`;
}

// ---------------------------------------------------------------------------
// Countdown
// ---------------------------------------------------------------------------

const cache = new Map<string, Countdown>();

export function datumCountdown(x: Datum): Countdown {
  const slug = datumSlug(x);
  const vorhanden = cache.get(slug);
  if (vorhanden) return vorhanden;
  const name = datumName(x);
  const schalttag = x.m === 2 && x.d === 29;
  // Tag im Jahr: im Gemeinjahr und im Schaltjahr.
  const nrGemein = schalttag ? null : tagImJahr({ y: 2027, m: x.m, d: x.d });
  const nrSchalt = tagImJahr({ y: 2028, m: x.m, d: x.d });
  const feste = festeTage(x);
  const gesetzlich = gesetzlichAm(x);

  const c: Countdown = {
    slug,
    pfad: datumPfad(x),
    title: name,
    nominativ: `Der ${name}`,
    question: `Wie viele Tage bis zum ${name}?`,
    category: "datum",
    art: "tag",
    motif: (`blatt-${x.d === 30 ? 30 : x.d === 31 ? 31 : 1}` as Countdown["motif"]),
    getNextDate: (now) => mitternacht(naechstesVorkommen(x, now)),
    datumImJahr: (jahr) => imJahr(x, jahr),
    bis: `bis zum ${name}`,
    heute: `Heute ist der ${name}.`,
    seoTitel: (s) =>
      s.phase === "vor"
        ? `Wie viele Tage bis zum ${name} ${s.start.y}? Noch ${s.tage} ${plural(s.tage, "Tag", "Tage")}`
        : `Heute ist der ${name} ${s.start.y} (${wochentagName(s.start)})`,
    zeilen: () => [
      {
        label: "Tag im Jahr",
        wert: nrGemein === null ? `${nrSchalt}. (nur im Schaltjahr)` : nrGemein === nrSchalt ? `${nrGemein}.` : `${nrGemein}., im Schaltjahr ${nrSchalt}.`,
      },
      { label: "Sternzeichen", wert: sternzeichen(x) },
      { label: "Jahreszeit", wert: jahreszeit(x) },
    ],
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
        const t = naechstesVorkommen(x, now);
        const kw = kalenderwoche(t);
        const rest = tageDiff(t, { y: t.y, m: 12, d: 31 });
        const bisWeihnachten = tageDiff(t, { y: t.y, m: 12, d: 25 });
        const a: string[] = [];

        // 1. Kalender
        let a1 = schalttag
          ? `Der 29. Februar ist der Schalttag. Es gibt ihn nur in Schaltjahren, das nächste Mal ${t.y}. Er ist dann der 60. Tag des Jahres.`
          : `Der ${name} ist der ${nrGemein}. Tag des Jahres${nrGemein !== nrSchalt ? `, in Schaltjahren der ${nrSchalt}.` : "."}`;
        a1 += ` ${t.y} fällt er auf einen ${wochentagName(t)} und liegt in Kalenderwoche ${kw.kw}.`;
        a1 +=
          rest === 0
            ? " Es ist der letzte Tag des Jahres."
            : ` Danach hat das Jahr noch ${rest} ${plural(rest, "Tag", "Tage")}${
                bisWeihnachten > 0 ? `, bis [Weihnachten](/weihnachten) sind es von dort aus ${bisWeihnachten}` : ""
              }.`;
        a.push(a1);

        // 2. Was an dem Tag ist
        const teile: string[] = [];
        for (const f of feste) teile.push(`${f.pfad ? `[${f.name}](${f.pfad})` : f.name}: ${f.text}`);
        if (gesetzlich.length && !feste.some((f) => /Feiertag/.test(f.text))) {
          teile.push(
            ...gesetzlich.map((g) => `${g.pfad ? `[${g.name}](${g.pfad})` : g.name} ist gesetzlicher Feiertag ${g.wo}.`),
          );
        }
        const bew = beweglicheAm(x, t.y);
        if (bew.length) {
          const gruppen = new Map<string, { pfad?: string; jahre: number[] }>();
          for (const b of bew) {
            const g = gruppen.get(b.name) ?? { pfad: b.pfad, jahre: [] };
            g.jahre.push(b.jahr);
            gruppen.set(b.name, g);
          }
          teile.push(
            `In manchen Jahren fällt ein bewegliches Fest auf den ${name}: ${[...gruppen.entries()]
              .map(([n, g]) => `${g.pfad ? `[${n}](${g.pfad})` : n} ${liste(g.jahre.map(String))}`)
              .join(", ")}.`,
          );
        }
        if (teile.length === 0) {
          teile.push(
            `Ein fester Feiertag ist der ${name} in keinem Bundesland, und auch kein bewegliches Fest fällt in den nächsten zwölf Jahren auf dieses Datum. Ein ganz normaler Tag also, was ja auch etwas für sich hat.`,
          );
        }
        a.push(teile.join(" "));

        // 3. Ferien
        if (ferienDatenReichenBis(t)) {
          const ferien = ferienAm(t);
          if (ferien.length === 0) {
            a.push(
              `Schulferien sind am ${datumLang(t)} in keinem Bundesland. Wann das nächste Mal frei ist, zeigt die [Übersicht der Schulferien](/ferien).`,
            );
          } else {
            const arten = [...new Set(ferien.map((f) => f.art))];
            a.push(
              `Am ${datumLang(t)} ${ferien.length === 1 ? "hat ein Bundesland" : `haben ${ferien.length} Bundesländer`} Schulferien (${liste(arten)}): ${liste(ferien.map((f) => f.land))}. Die genauen Termine stehen in der [Übersicht der Schulferien](/ferien).`,
            );
          }
        }

        // 4. Geburtstag
        a.push(
          `Wer am ${name} Geburtstag hat, ist nach der üblichen Einteilung im Sternzeichen ${sternzeichen(x)} geboren. Meteorologisch gehört der Tag zum ${jahreszeit(x)}. Für ein Datum mit Uhrzeit oder einen Countdown mit eigenem Namen gibt es den [eigenen Countdown](/eigener-countdown).`,
        );
        return a.join("\n\n");
      },
    },
    facts: {
      enumerable: true,
      get: () => {
        const now = new Date();
        const t = naechstesVorkommen(x, now);
        const wochentage = [0, 1, 2, 3, 4, 5]
          .map((i) => imJahr(x, t.y + i))
          .filter((e): e is Tag => e !== null)
          .map((e) => `${e.y}: ${wochentagName(e)}`);
        const halb = plusTage(t, 182);
        return [
          `Wochentage in den nächsten Jahren: ${wochentage.join(", ")}.`,
          schalttag
            ? "Schaltjahre sind alle durch 4 teilbaren Jahre. Volle Jahrhunderte sind nur dann Schaltjahre, wenn sie durch 400 teilbar sind."
            : `Vom Jahr sind am ${name} ${Math.round(((nrGemein as number) / 365) * 100)} Prozent vorbei.`,
          `Ein halbes Jahr später, 182 Tage nach dem ${datumLang(t)}, ist der ${datumLang(halb)}.`,
        ];
      },
    },
  });

  c.faqDynamisch = (now) => {
    const t = naechstesVorkommen(x, now);
    const heute = tagVon(now);
    const n = tageDiff(heute, t);
    const folge = imJahr(x, t.y + 1) ?? imJahr(x, t.y + 4);
    const faq: Faq[] = [
      {
        q: `Wie viele Tage sind es noch bis zum ${name}?`,
        a:
          n === 0
            ? `Keiner mehr: Heute ist der ${datumLang(t)}.`
            : `Vom ${datumLang(heute)} bis zum ${datumLang(t)} sind es ${n} ${plural(n, "Tag", "Tage")}. Das sind ${Math.floor(n / 7)} Wochen und ${n % 7} ${plural(n % 7, "Tag", "Tage")}.`,
      },
      {
        q: `Welcher Wochentag ist der ${name} ${t.y}?`,
        a: `Der ${datumLang(t)} ist ein ${wochentagName(t)}.${folge ? ` ${folge.y} fällt das Datum auf einen ${wochentagName(folge)}.` : ""}`,
      },
      {
        q: `Der wievielte Tag des Jahres ist der ${name}?`,
        a: schalttag
          ? "Der 29. Februar ist der 60. Tag eines Schaltjahres. In normalen Jahren gibt es ihn nicht."
          : nrGemein === nrSchalt
            ? `Der ${nrGemein}. Tag, in jedem Jahr.`
            : `Der ${nrGemein}. Tag in einem normalen Jahr und der ${nrSchalt}. Tag in einem Schaltjahr.`,
      },
      {
        q: `Welches Sternzeichen hat man am ${name}?`,
        a: `${sternzeichen(x)}. Die Grenzen zwischen den Sternzeichen verschieben sich je nach Jahr und Quelle um einen Tag. Wer genau an einem Übergang geboren ist, schaut am besten in ein Horoskop für sein Geburtsjahr.`,
      },
    ];
    if (ferienDatenReichenBis(t)) {
      const ferien = ferienAm(t);
      faq.push({
        q: `Sind am ${name} ${t.y} Schulferien?`,
        a: ferien.length
          ? `Ja, in ${liste(ferien.map((f) => f.land))}.`
          : `Nein, am ${datumMitWochentag(t)}, hat laut den Ferienkalendern der Kultusministerkonferenz kein Bundesland Ferien.`,
      });
    }
    return faq;
  };

  cache.set(slug, c);
  return c;
}

export function monatsDaten(m: number): Datum[] {
  return ALLE_DATEN.filter((x) => x.m === m);
}
