// Smoke-Test: ruft alle Seiten aus den Sitemaps auf und prüft die Grundregeln.
// Erwartet einen laufenden Server (BASE_URL, Standard http://localhost:3100).
// Aufruf: node scripts/smoke.mjs [--alle]   (ohne --alle: Stichprobe pro Sitemap)
const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const alle = process.argv.includes("--alle");

async function text(pfad) {
  for (let versuch = 0; ; versuch++) {
    try {
      const res = await fetch(BASE + pfad, { redirect: "manual" });
      return { status: res.status, body: await res.text(), headers: res.headers };
    } catch (e) {
      if (versuch >= 3) throw e;
      await new Promise((r) => setTimeout(r, 300));
    }
  }
}

const fehler = [];
const index = await text("/sitemap.xml");
if (index.status !== 200) throw new Error("sitemap.xml fehlt");
const teilSitemaps = [...index.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

let seiten = [];
for (const s of teilSitemaps) {
  const r = await text(s);
  if (r.status !== 200) fehler.push(`${s}: Status ${r.status}`);
  const pfade = [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  seiten.push(...(alle ? pfade : pfade.filter((_, i) => i < 3 || i % 17 === 0 || i === pfade.length - 1)));
}
seiten = [...new Set(seiten)];

const gesehen = new Set(seiten);
const interneLinks = new Set();
let n = 0;
async function pruefe(pfad) {
  const r = await text(pfad);
  n++;
  const f = (msg) => fehler.push(`${pfad}: ${msg}`);
  if (r.status !== 200) return f(`Status ${r.status}`);
  const b = r.body;
  if (!/<html[^>]+lang="de"/.test(b)) f('lang="de" fehlt');
  const h1 = b.match(/<h1[\s>]/g) ?? [];
  if (h1.length !== 1) f(`${h1.length} H1 statt 1`);
  const title = b.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  if (title.length < 15) f(`Title zu kurz: "${title}"`);
  if (title.length > 75) f(`Title zu lang (${title.length}): "${title}"`);
  const desc = b.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  if (desc.length < 50) f(`Description zu kurz (${desc.length})`);
  if (!/<link rel="canonical" href="[^"]+"/.test(b)) f("Canonical fehlt");
  if (!/application\/ld\+json/.test(b)) f("JSON-LD fehlt");
  if (/"@type":"Event"/.test(b)) f("Event-Schema gefunden");
  if (/\[\[|undefined|NaN|\bnull\b(?![^<]*<\/script>)/.test(b.replace(/<script[\s\S]*?<\/script>/g, "")) && !/impressum|datenschutz/.test(pfad))
    f("Platzhalter, undefined oder NaN im sichtbaren Text");
  if (/noindex/.test(b.match(/<meta name="robots"[^>]*>/)?.[0] ?? "")) f("noindex auf einer Sitemap-Seite");
  for (const m of b.matchAll(/href="(\/[^"#?]*)/g)) {
    const ziel = m[1];
    if (ziel.startsWith("/_next") || ziel.startsWith("/og") || /\.(svg|ico|png|xml|txt|woff2?)$/.test(ziel)) continue;
    interneLinks.add(ziel);
  }
}

const warteschlange = [...seiten];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (warteschlange.length) await pruefe(warteschlange.pop());
  }),
);

// Jeder interne Link muss auf eine erreichbare Seite zeigen.
const ziele = [...interneLinks].filter((z) => !gesehen.has(z));
let kaputt = 0;
const zw = [...ziele];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (zw.length) {
      const z = zw.pop();
      const res = await text(z);
      if (res.status !== 200) {
        kaputt++;
        fehler.push(`Interner Link ${z}: Status ${res.status}`);
      }
    }
  }),
);

// noindex-Seiten
for (const p of ["/embed/weihnachten"]) {
  const r = await text(p);
  if (r.status === 200 && !/noindex/.test(r.body)) fehler.push(`${p}: noindex fehlt`);
}
const robots = await text("/robots.txt");
if (!/Sitemap: /.test(robots.body)) fehler.push("robots.txt ohne Sitemap");
const og = await fetch(BASE + "/og?s=/weihnachten");
if (og.status !== 200 || !og.headers.get("content-type")?.includes("image/png")) fehler.push("/og liefert kein PNG");

console.log(`${n} Seiten geprüft (${teilSitemaps.length} Sitemaps), ${ziele.length} weitere Linkziele, ${kaputt} kaputt.`);
if (fehler.length) {
  console.error(`\n${fehler.length} Fehler:`);
  for (const f of fehler.slice(0, 60)) console.error("  " + f);
  process.exit(1);
}
console.log("Smoke-Test ohne Fehler.");
