import { BUNDESLAENDER } from "@/data/bundeslaender";
import { STAMM } from "@/data/countdowns";
import { FERIENARTEN, alleFerienCountdowns, alleSchulanfangCountdowns } from "@/data/ferien";

/**
 * Teil-Sitemaps pro Kategorie. Alles wird aus /data erzeugt.
 * /c und /embed stehen nicht drin (noindex).
 */
export function sitemapGruppen(): Record<string, string[]> {
  const stamm = (kategorie: string) => STAMM.filter((c) => c.category === kategorie).map((c) => c.pfad);
  const gruppen: Record<string, string[]> = {
    seiten: ["/", "/feiertage", "/kalenderwoche", "/impressum", "/datenschutz"],
    feiertage: stamm("feiertage"),
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
