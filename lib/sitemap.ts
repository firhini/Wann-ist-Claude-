import { STAMM } from "@/data/countdowns";

/**
 * Teil-Sitemaps pro Kategorie. Alles wird aus /data erzeugt.
 * /c und /embed stehen nicht drin (noindex).
 */
export function sitemapGruppen(): Record<string, string[]> {
  const stamm = (kategorie: string) => STAMM.filter((c) => c.category === kategorie).map((c) => c.pfad);
  const gruppen: Record<string, string[]> = {
    seiten: ["/", "/feiertage", "/kalenderwoche", "/impressum", "/datenschutz"],
    feiertage: stamm("feiertage"),
  };
  return Object.fromEntries(Object.entries(gruppen).filter(([, pfade]) => pfade.length > 0));
}
