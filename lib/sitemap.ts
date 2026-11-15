import { BUNDESLAENDER } from "@/data/bundeslaender";
import { KW_JAHRE } from "@/data/kalenderwoche";
import { ALLE_DATEN, datumPfad } from "@/data/tage";
import { STAMM } from "@/data/countdowns";
import { FERIENARTEN, alleFerienCountdowns, alleSchulanfangCountdowns } from "@/data/ferien";

/**
 * Teil-Sitemaps pro Kategorie. Alles wird aus /data erzeugt.
 * /c und /embed stehen nicht drin (noindex).
 */
export function sitemapGruppen(): Record<string, string[]> {
  const stamm = (kategorie: string) => STAMM.filter((c) => c.category === kategorie).map((c) => c.pfad);
  const gruppen: Record<string, string[]> = {
    seiten: ["/", "/kalenderwoche", ...KW_JAHRE.map((j) => `/kalenderwoche/${j}`), "/impressum", "/datenschutz"],
    "tage-bis": ["/tage-bis", ...ALLE_DATEN.map(datumPfad)],
    feiertage: ["/feiertage", ...stamm("feiertage"), ...BUNDESLAENDER.map((b) => `/feiertage/${b.slug}`)],
    jahreszeiten: ["/jahreszeiten", ...stamm("jahreszeiten")],
    alltag: ["/alltag", ...stamm("alltag")],
    ferien: [
      "/ferien",
      ...FERIENARTEN.map((a) => `/ferien/${a.slug}`),
      ...BUNDESLAENDER.map((b) => `/ferien/${b.slug}`),
      ...alleFerienCountdowns().map((c) => c.pfad),
    ],
    schule: ["/schule", ...alleSchulanfangCountdowns().map((c) => c.pfad)],
  };
  return Object.fromEntries(Object.entries(gruppen).filter(([, pfade]) => pfade.length > 0));
}
