import { sitemapGruppen } from "@/lib/sitemap";
import { absolut } from "@/lib/seo";

export const revalidate = 3600;

/** Sitemap-Index: verweist auf eine Teil-Sitemap pro Kategorie. */
export function GET() {
  const heute = new Date().toISOString().slice(0, 10);
  const eintraege = Object.keys(sitemapGruppen())
    .map((name) => `  <sitemap><loc>${absolut(`/sitemaps/${name}.xml`)}</loc><lastmod>${heute}</lastmod></sitemap>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${eintraege}\n</sitemapindex>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
