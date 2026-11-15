import { BUNDESLAENDER } from "./bundeslaender";
import { STAMM } from "./countdowns";
import { FERIENARTEN } from "./ferien";
import { KW_JAHRE } from "./kalenderwoche";

export type NavLink = { name: string; pfad: string };

/** Hauptnavigation: echte Textlinks, diese Seiten bekommen die meisten internen Links. */
export const HAUPTNAVI: NavLink[] = [
  { name: "Feiertage", pfad: "/feiertage" },
  { name: "Ferien", pfad: "/ferien" },
  { name: "Kalenderwoche", pfad: "/kalenderwoche" },
  { name: "Alltag", pfad: "/alltag" },
];

export type FussGruppe = { titel: string; pfad?: string; links: NavLink[] };

/** Die vollständige, gegliederte Sitemap für den Footer. Wird aus den Daten erzeugt. */
export function fussGruppen(): FussGruppe[] {
  const nach = (kategorie: string) =>
    STAMM.filter((c) => c.category === kategorie).map((c) => ({ name: c.title, pfad: c.pfad }));
  const gruppen: FussGruppe[] = [
    { titel: "Feiertage", pfad: "/feiertage", links: nach("feiertage") },
    {
      titel: "Ferien",
      pfad: "/ferien",
      links: [
        ...FERIENARTEN.map((a) => ({ name: a.name, pfad: `/ferien/${a.slug}` })),
        { name: "Schulanfang", pfad: "/schule" },
      ],
    },
    {
      titel: "Ferien nach Land",
      links: BUNDESLAENDER.map((b) => ({ name: `Ferien ${b.name}`, pfad: `/ferien/${b.slug}` })),
    },
    {
      titel: "Feiertage nach Land",
      links: BUNDESLAENDER.map((b) => ({ name: `Feiertage ${b.name}`, pfad: `/feiertage/${b.slug}` })),
    },
    { titel: "Jahreszeiten", pfad: "/jahreszeiten", links: nach("jahreszeiten") },
    { titel: "Alltag", pfad: "/alltag", links: nach("alltag") },
    {
      titel: "Kalender",
      links: [
        { name: "Welche KW haben wir?", pfad: "/kalenderwoche" },
        ...KW_JAHRE.map((j) => ({ name: `Kalenderwochen ${j}`, pfad: `/kalenderwoche/${j}` })),
        { name: "Tage bis zu einem Datum", pfad: "/tage-bis" },
      ],
    },
  ];
  return gruppen.filter((g) => g.links.length > 0);
}
