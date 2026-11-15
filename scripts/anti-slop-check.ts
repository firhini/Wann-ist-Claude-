/**
 * Anti-Slop-Prüfung. Durchsucht den Quellcode nach Mustern, die DESIGN.md verbietet,
 * und beendet sich mit Fehler, wenn eines vorkommt. Läuft vor jedem Build (npm run build).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const WURZEL = process.cwd();
const ORDNER = ["app", "components", "data", "lib", "hooks"];
const ENDUNGEN = new Set([".ts", ".tsx", ".css", ".json"]);
/** Dateien, die Muster nur nennen, um sie zu verbieten oder zurückzusetzen. */
const AUSNAHMEN = new Set(["scripts/anti-slop-check.ts"]);

type Regel = { name: string; muster: RegExp; nur?: RegExp; ausser?: RegExp };

const TAILWIND_FARBEN =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";

const REGELN: Regel[] = [
  { name: "Tailwind-Standardfarbe", muster: new RegExp(`\\b(?:${TAILWIND_FARBEN})-(?:50|[1-9]00|950)\\b`) },
  { name: "Lila/Indigo-Palette", muster: /\b(?:indigo|purple|violet)-/ },
  { name: "Glassmorphism (backdrop-blur)", muster: /backdrop-blur|backdrop-filter/ },
  { name: "Verlauf", muster: /bg-gradient|bg-linear-|bg-radial|bg-conic|(?:linear|radial|conic)-gradient\(/ },
  { name: "Verlaufsschrift", muster: /bg-clip-text|text-transparent/ },
  { name: "Schatten", muster: /\bshadow-|box-shadow|drop-shadow|text-shadow/, ausser: /:\s*initial/ },
  { name: "Unschärfe", muster: /\bblur-(?:sm|md|lg|xl|2xl|3xl|\[)|filter:\s*blur/, ausser: /:\s*initial/ },
  { name: "Große Rundung", muster: /\brounded(?:-[trblxyse]{1,2})?-(?:md|lg|xl|2xl|3xl|4xl|full)\b|\brounded\b(?!-)/ },
  { name: "Verbotene Schrift", muster: /font-inter\b|\b(?:Inter|Roboto|Open Sans|Montserrat|Poppins|Space Grotesk|Playfair Display|Instrument Serif)\b|system-ui|ui-sans-serif/ },
  { name: "Hüpf-/Puls-Animation", muster: /animate-(?:bounce|pulse|ping|spin)|fade-up|fade-in-up/ },
  { name: "Scroll-Effekt", muster: /IntersectionObserver|onScroll|addEventListener\(["']scroll|parallax|mousemove/ },
  { name: "Emoji", muster: /\p{Extended_Pictographic}/u, ausser: /[©®™]/ },
  {
    name: "KI-Werbedeutsch",
    muster: /\b(?:Entdecke|Entdecken Sie|nahtlos|revolutionär|ultimativ|Tauche ein|Tauchen Sie ein|Willkommen bei|Begleiter für|im Handumdrehen|kinderleicht)\b/i,
  },
  { name: "Gedankenstrich-Kette", muster: / [–—] [^"`]{1,80} [–—] / },
  { name: "Geviertstrich", muster: /—/ },
];

function dateien(ordner: string): string[] {
  const out: string[] = [];
  let eintraege: string[];
  try {
    eintraege = readdirSync(ordner);
  } catch {
    return out;
  }
  for (const name of eintraege) {
    const pfad = join(ordner, name);
    const st = statSync(pfad);
    if (st.isDirectory()) out.push(...dateien(pfad));
    else if (ENDUNGEN.has(extname(name))) out.push(pfad);
  }
  return out;
}

const treffer: string[] = [];
let geprueft = 0;
for (const ordner of ORDNER) {
  for (const datei of dateien(join(WURZEL, ordner))) {
    const rel = relative(WURZEL, datei);
    if (AUSNAHMEN.has(rel)) continue;
    // Recherche-Rohdaten und Prüfberichte sind kein Seiteninhalt.
    if (rel.startsWith("data/research/")) continue;
    geprueft++;
    const zeilen = readFileSync(datei, "utf8").split("\n");
    zeilen.forEach((zeile, i) => {
      for (const regel of REGELN) {
        if (regel.ausser?.test(zeile)) continue;
        if (regel.muster.test(zeile)) {
          treffer.push(`${rel}:${i + 1}  ${regel.name}\n    ${zeile.trim().slice(0, 140)}`);
        }
      }
    });
  }
}

if (treffer.length > 0) {
  console.error(`\nAnti-Slop-Prüfung: ${treffer.length} Treffer in ${geprueft} Dateien.\n`);
  for (const t of treffer) console.error(`  ${t}\n`);
  console.error("Siehe DESIGN.md, Abschnitte 2, 5, 8 und 9.\n");
  process.exit(1);
}
console.log(`Anti-Slop-Prüfung: ${geprueft} Dateien, keine Treffer.`);
