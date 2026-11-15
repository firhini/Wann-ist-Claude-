import type { Countdown, Faq } from "@/lib/countdown";
import { datumLang, datumMitWochentag, datumOhneJahr, plural, wochentagName } from "@/lib/format";
import { type Tag, mitternacht, plusTage, tagNr, tagVon, wochentag } from "@/lib/zeit";
import { BUNDESLAENDER, type BundeslandCode, land } from "./bundeslaender";
import { type FeiertagImLand, anzahlFeiertage, feiertageImLand } from "./feiertage-laender";

/**
 * Seiten „Feiertage in <Bundesland>“: Countdown zum nächsten gesetzlichen Feiertag des Landes,
 * dazu alle Feiertage des laufenden und des nächsten Jahres mit Brückentagen.
 */

function liste(namen: string[]): string {
  if (namen.length <= 1) return namen.join("");
  return `${namen.slice(0, -1).join(", ")} und ${namen[namen.length - 1]}`;
}

/** Nächster landesweiter Feiertag ab heute (einschließlich). */
export function naechsterFeiertag(code: BundeslandCode, now: Date): FeiertagImLand {
  const heute = tagVon(now);
  const kandidaten = [...feiertageImLand(code, heute.y, false), ...feiertageImLand(code, heute.y + 1, false)];
  return kandidaten.find((f) => tagNr(f.tag) >= tagNr(heute)) as FeiertagImLand;
}

export type Brueckentag = { feiertag: FeiertagImLand; tag: Tag; frei: number };

/** Brückentage: Feiertag am Dienstag (Montag frei nehmen) oder am Donnerstag (Freitag frei nehmen). */
export function brueckentage(code: BundeslandCode, jahr: number): Brueckentag[] {
  const feiertage = feiertageImLand(code, jahr, false);
  const istFeiertag = (t: Tag) => feiertage.some((f) => tagNr(f.tag) === tagNr(t));
  const out: Brueckentag[] = [];
  for (const f of feiertage) {
    const wt = wochentag(f.tag);
    if (wt === 2 && !istFeiertag(plusTage(f.tag, -1))) out.push({ feiertag: f, tag: plusTage(f.tag, -1), frei: 4 });
    if (wt === 4 && !istFeiertag(plusTage(f.tag, 1))) out.push({ feiertag: f, tag: plusTage(f.tag, 1), frei: 4 });
  }
  return out;
}

/** Feiertage, die auf Samstag oder Sonntag fallen und damit für die meisten „verloren“ sind. */
export function amWochenende(code: BundeslandCode, jahr: number): FeiertagImLand[] {
  return feiertageImLand(code, jahr, false).filter((f) => wochentag(f.tag) === 0 || wochentag(f.tag) === 6);
}

const cache = new Map<BundeslandCode, Countdown>();

export function feiertageLandCountdown(code: BundeslandCode): Countdown {
  const vorhanden = cache.get(code);
  if (vorhanden) return vorhanden;
  const b = land(code);
  const anzahl = anzahlFeiertage(code);
  const rang = [...BUNDESLAENDER].sort((x, y) => anzahlFeiertage(y.code) - anzahlFeiertage(x.code));
  const max = anzahlFeiertage((rang[0] as (typeof rang)[number]).code);
  const min = anzahlFeiertage((rang[rang.length - 1] as (typeof rang)[number]).code);
  const eigene = feiertageImLand(code, 2027, true).filter((f) => {
    const bundesweit = BUNDESLAENDER.every((x) => feiertageImLand(x.code, 2027, false).some((g) => g.key === f.key));
    return !bundesweit;
  });

  const c: Countdown = {
    slug: `feiertage-${b.slug}`,
    pfad: `/feiertage/${b.slug}`,
    title: `Feiertage ${b.name}`,
    nominativ: `Der nächste Feiertag ${b.inName}`,
    tafel: `Feiertage ${b.name}`,
    question: `Wann ist der nächste Feiertag ${b.inName}?`,
    category: "feiertage",
    art: "tag",
    bundesland: code,
    motif: "blatt-1",
    bis: `bis zum nächsten Feiertag ${b.inName}`,
    heute: `Heute ist ${b.inName} Feiertag.`,
    getNextDate: (now) => mitternacht(naechsterFeiertag(code, now).tag),
    seoTitel: (s) =>
      s.phase === "vor"
        ? `Feiertage ${b.name} ${s.heute.y} und ${s.heute.y + 1}: nächster in ${s.tage} ${plural(s.tage, "Tag", "Tagen")}`
        : `Feiertage ${b.name} ${s.heute.y}: Heute ist Feiertag`,
    zusatzSatz: (s) => {
      const f = naechsterFeiertag(code, s.startZeit);
      return `Es ist ${f.name}: ${datumMitWochentag(f.tag)}.`;
    },
    zeilen: (now) => {
      const f = naechsterFeiertag(code, now);
      return [
        { label: "Welcher Feiertag", wert: f.name },
        { label: "Feiertage im Jahr", wert: `${anzahl} gesetzliche` },
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
        const f = naechsterFeiertag(code, now);
        const jahr = f.tag.y;
        const verloren = amWochenende(code, jahr);
        const bruecken = brueckentage(code, jahr);
        const regional = eigene.filter((x) => x.teilweise);
        const landesweit = eigene.filter((x) => !x.teilweise && !x.key.startsWith("einmalig"));
        const a: string[] = [];
        a.push(
          `${b.name} hat ${anzahl} gesetzliche Feiertage im Jahr. Neun davon gelten in ganz Deutschland${
            landesweit.length
              ? `, dazu ${landesweit.length === 1 ? "kommt" : "kommen"} ${b.inName} ${liste(landesweit.map((x) => (x.pfad ? `[${x.name}](${x.pfad})` : x.name)))}`
              : ", weitere hat das Land nicht"
          }. Im Ländervergleich reicht die Spanne von ${min} bis ${max} Feiertagen.`,
        );
        a.push(
          `Der nächste Feiertag ${b.inName} ist ${f.pfad ? `[${f.name}](${f.pfad})` : f.name} am ${datumMitWochentag(f.tag)}. ${
            verloren.length
              ? `${jahr} ${verloren.length === 1 ? "fällt ein Feiertag" : `fallen ${verloren.length} Feiertage`} auf ein Wochenende: ${liste(verloren.map((x) => `${x.name} (${wochentagName(x.tag)})`))}. Einen Ersatztag gibt es in Deutschland dafür nicht.`
              : `${jahr} fällt kein Feiertag auf ein Wochenende.`
          }${
            bruecken.length
              ? ` Für Brückentage ${bruecken.length === 1 ? "bietet sich ein Termin an" : `bieten sich ${bruecken.length} Termine an`}: ${liste(bruecken.map((x) => `${wochentagName(x.tag)}, ${datumOhneJahr(x.tag)} (${x.feiertag.name})`))}.`
              : ""
          }`,
        );
        if (regional.length) {
          a.push(
            regional
              .map((x) => `${x.name} ist ${b.inName} kein landesweiter Feiertag, sondern gilt ${x.teilweise}.`)
              .join(" "),
          );
        }
        a.push(
          `Schulfrei ist an Feiertagen sowieso. Wann die Schule darüber hinaus zu ist, steht unter [Schulferien ${b.inName}](/ferien/${b.slug}). Alle Feste im Jahreslauf, auch die ohne freien Tag, findest du in der [Übersicht der Feiertage](/feiertage).`,
        );
        return a.join("\n\n");
      },
    },
    facts: {
      enumerable: true,
      get: () => {
        const meiste = rang.filter((x) => anzahlFeiertage(x.code) === max).map((x) => x.name);
        const wenigste = rang.filter((x) => anzahlFeiertage(x.code) === min).map((x) => x.name);
        return [
          `Die meisten landesweiten Feiertage haben ${liste(meiste)} (${max}), die wenigsten ${liste(wenigste)} (${min}).`,
          "Fällt ein Feiertag auf einen Sonntag, wird er in Deutschland nicht nachgeholt.",
          "Feiertage sind Ländersache. Bundesrechtlich festgelegt ist nur der Tag der Deutschen Einheit.",
          ...eigene.filter((x) => x.hinweis).map((x) => x.hinweis as string),
        ];
      },
    },
    related: {
      enumerable: true,
      get: () => [
        ...b.nachbarn.map((n) => `/feiertage/${land(n).slug}`),
        `/ferien/${b.slug}`,
        "/weihnachten",
        "/ostern",
      ],
    },
  });

  c.faqDynamisch = (now) => {
    const f = naechsterFeiertag(code, now);
    const jahr = tagVon(now).y;
    const b1 = brueckentage(code, jahr + 1);
    const faq: Faq[] = [
      {
        q: `Wann ist der nächste Feiertag ${b.inName}?`,
        a: `${f.name} am ${datumMitWochentag(f.tag)}.`,
      },
      {
        q: `Wie viele Feiertage hat ${b.name}?`,
        a: `${anzahl} gesetzliche Feiertage im Jahr: die neun bundesweiten${
          anzahl > 9 ? ` und ${anzahl - 9} ${plural(anzahl - 9, "weiteren", "weitere")} nach Landesrecht` : ""
        }. ${jahr + 1} fallen davon ${amWochenende(code, jahr + 1).length} auf ein Wochenende.`,
      },
      {
        q: `Welche Brückentage gibt es ${jahr + 1} ${b.inName}?`,
        a: b1.length
          ? `${liste(b1.map((x) => `${wochentagName(x.tag)}, ${datumLang(x.tag)} (${x.feiertag.name} ist ein ${wochentagName(x.feiertag.tag)})`))}. Mit je einem Urlaubstag sind das vier freie Tage am Stück.`
          : `${jahr + 1} liegt ${b.inName} kein Feiertag an einem Dienstag oder Donnerstag. Klassische Brückentage gibt es deshalb nicht.`,
      },
      {
        q: `Welche Feiertage gelten ${b.inName}, aber nicht bundesweit?`,
        a: eigene.filter((x) => !x.teilweise && !x.key.startsWith("einmalig")).length
          ? `${liste(
              eigene
                .filter((x) => !x.teilweise && !x.key.startsWith("einmalig"))
                .map((x) => {
                  const auch = BUNDESLAENDER.filter(
                    (y) => y.code !== code && feiertageImLand(y.code, 2027, false).some((g) => g.key === x.key),
                  ).map((y) => y.name);
                  return `${x.name} (${auch.length ? `auch in ${liste(auch)}` : `nur ${b.inName}`})`;
                }),
            )}.`
          : `Keine. ${b.name} hat nur die neun bundesweiten Feiertage.`,
      },
    ];
    return faq;
  };
  c.faq = [];
  cache.set(code, c);
  return c;
}

export function alleFeiertageLandCountdowns(): Countdown[] {
  return BUNDESLAENDER.map((b) => feiertageLandCountdown(b.code));
}
