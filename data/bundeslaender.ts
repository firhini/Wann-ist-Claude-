export type BundeslandCode =
  | "BW"
  | "BY"
  | "BE"
  | "BB"
  | "HB"
  | "HH"
  | "HE"
  | "MV"
  | "NI"
  | "NW"
  | "RP"
  | "SL"
  | "SN"
  | "ST"
  | "SH"
  | "TH";

export type Bundesland = {
  code: BundeslandCode;
  slug: string;
  name: string;
  /** Mit Präposition: "in Bayern", "im Saarland". */
  inName: string;
  hauptstadt: string;
  nachbarn: BundeslandCode[];
  /** Zuständiges Ministerium für Schulferien. */
  ministerium: string;
};

export const BUNDESLAENDER: Bundesland[] = [
  {
    code: "BW",
    slug: "baden-wuerttemberg",
    name: "Baden-Württemberg",
    inName: "in Baden-Württemberg",
    hauptstadt: "Stuttgart",
    nachbarn: ["BY", "HE", "RP"],
    ministerium: "Ministerium für Kultus, Jugend und Sport Baden-Württemberg",
  },
  {
    code: "BY",
    slug: "bayern",
    name: "Bayern",
    inName: "in Bayern",
    hauptstadt: "München",
    nachbarn: ["BW", "HE", "TH", "SN"],
    ministerium: "Bayerisches Staatsministerium für Unterricht und Kultus",
  },
  {
    code: "BE",
    slug: "berlin",
    name: "Berlin",
    inName: "in Berlin",
    hauptstadt: "Berlin",
    nachbarn: ["BB"],
    ministerium: "Senatsverwaltung für Bildung, Jugend und Familie Berlin",
  },
  {
    code: "BB",
    slug: "brandenburg",
    name: "Brandenburg",
    inName: "in Brandenburg",
    hauptstadt: "Potsdam",
    nachbarn: ["BE", "MV", "NI", "ST", "SN"],
    ministerium: "Ministerium für Bildung, Jugend und Sport Brandenburg",
  },
  {
    code: "HB",
    slug: "bremen",
    name: "Bremen",
    inName: "in Bremen",
    hauptstadt: "Bremen",
    nachbarn: ["NI"],
    ministerium: "Senatorin für Kinder und Bildung Bremen",
  },
  {
    code: "HH",
    slug: "hamburg",
    name: "Hamburg",
    inName: "in Hamburg",
    hauptstadt: "Hamburg",
    nachbarn: ["SH", "NI"],
    ministerium: "Behörde für Schule und Berufsbildung Hamburg",
  },
  {
    code: "HE",
    slug: "hessen",
    name: "Hessen",
    inName: "in Hessen",
    hauptstadt: "Wiesbaden",
    nachbarn: ["NW", "NI", "TH", "BY", "BW", "RP"],
    ministerium: "Hessisches Kultusministerium",
  },
  {
    code: "MV",
    slug: "mecklenburg-vorpommern",
    name: "Mecklenburg-Vorpommern",
    inName: "in Mecklenburg-Vorpommern",
    hauptstadt: "Schwerin",
    nachbarn: ["SH", "NI", "BB"],
    ministerium: "Ministerium für Bildung und Kindertagesförderung Mecklenburg-Vorpommern",
  },
  {
    code: "NI",
    slug: "niedersachsen",
    name: "Niedersachsen",
    inName: "in Niedersachsen",
    hauptstadt: "Hannover",
    nachbarn: ["SH", "HH", "HB", "MV", "BB", "ST", "TH", "HE", "NW"],
    ministerium: "Niedersächsisches Kultusministerium",
  },
  {
    code: "NW",
    slug: "nordrhein-westfalen",
    name: "Nordrhein-Westfalen",
    inName: "in Nordrhein-Westfalen",
    hauptstadt: "Düsseldorf",
    nachbarn: ["NI", "HE", "RP"],
    ministerium: "Ministerium für Schule und Bildung Nordrhein-Westfalen",
  },
  {
    code: "RP",
    slug: "rheinland-pfalz",
    name: "Rheinland-Pfalz",
    inName: "in Rheinland-Pfalz",
    hauptstadt: "Mainz",
    nachbarn: ["NW", "HE", "BW", "SL"],
    ministerium: "Ministerium für Bildung Rheinland-Pfalz",
  },
  {
    code: "SL",
    slug: "saarland",
    name: "Saarland",
    inName: "im Saarland",
    hauptstadt: "Saarbrücken",
    nachbarn: ["RP"],
    ministerium: "Ministerium für Bildung und Kultur Saarland",
  },
  {
    code: "SN",
    slug: "sachsen",
    name: "Sachsen",
    inName: "in Sachsen",
    hauptstadt: "Dresden",
    nachbarn: ["BB", "ST", "TH", "BY"],
    ministerium: "Sächsisches Staatsministerium für Kultus",
  },
  {
    code: "ST",
    slug: "sachsen-anhalt",
    name: "Sachsen-Anhalt",
    inName: "in Sachsen-Anhalt",
    hauptstadt: "Magdeburg",
    nachbarn: ["NI", "BB", "SN", "TH"],
    ministerium: "Ministerium für Bildung Sachsen-Anhalt",
  },
  {
    code: "SH",
    slug: "schleswig-holstein",
    name: "Schleswig-Holstein",
    inName: "in Schleswig-Holstein",
    hauptstadt: "Kiel",
    nachbarn: ["HH", "NI", "MV"],
    ministerium: "Ministerium für Allgemeine und Berufliche Bildung Schleswig-Holstein",
  },
  {
    code: "TH",
    slug: "thueringen",
    name: "Thüringen",
    inName: "in Thüringen",
    hauptstadt: "Erfurt",
    nachbarn: ["NI", "ST", "SN", "BY", "HE"],
    ministerium: "Thüringer Ministerium für Bildung, Wissenschaft und Kultur",
  },
];

const nachCode = new Map(BUNDESLAENDER.map((b) => [b.code, b]));
const nachSlug = new Map(BUNDESLAENDER.map((b) => [b.slug, b]));

export function land(code: BundeslandCode): Bundesland {
  const b = nachCode.get(code);
  if (!b) throw new Error(`Unbekanntes Bundesland: ${code}`);
  return b;
}

export function landNachSlug(slug: string): Bundesland | undefined {
  return nachSlug.get(slug);
}
