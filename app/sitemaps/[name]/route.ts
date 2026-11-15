import { sitemapGruppen } from "@/lib/sitemap";
import { absolut } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(sitemapGruppen()).map((name) => ({ name: `${name}.xml` }));
}

/** Teil-Sitemap einer Kategorie, z. B. /sitemaps/feiertage.xml. */
export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const pfade = sitemapGruppen()[name.replace(/\.xml$/, "")];
  if (!pfade) return new Response("Nicht gefunden", { status: 404 });
  // Die Tageszahl ändert sich täglich, deshalb ist das Änderungsdatum immer heute.
  const heute = new Date().toISOString().slice(0, 10);
  const urls = pfade
    .map((p) => `  <url><loc>${absolut(p)}</loc><lastmod>${heute}</lastmod><changefreq>daily</changefreq></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
