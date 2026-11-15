import { STAMM } from "./countdowns";

export type NavLink = { name: string; pfad: string };

/** Hauptnavigation: echte Textlinks, diese Seiten bekommen die meisten internen Links. */
export const HAUPTNAVI: NavLink[] = [
  { name: "Feiertage", pfad: "/feiertage" },
  { name: "Kalenderwoche", pfad: "/kalenderwoche" },
];

export type FussGruppe = { titel: string; pfad?: string; links: NavLink[] };

/** Die vollständige, gegliederte Sitemap für den Footer. Wird aus den Daten erzeugt. */
export function fussGruppen(): FussGruppe[] {
  const nach = (kategorie: string) =>
    STAMM.filter((c) => c.category === kategorie).map((c) => ({ name: c.title, pfad: c.pfad }));
  const gruppen: FussGruppe[] = [
    { titel: "Feiertage", pfad: "/feiertage", links: nach("feiertage") },
    {
      titel: "Kalender",
      links: [{ name: "Welche KW haben wir?", pfad: "/kalenderwoche" }],
    },
  ];
  return gruppen.filter((g) => g.links.length > 0);
}
