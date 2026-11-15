/**
 * Prüft alle Farbkombinationen aus DESIGN.md gegen WCAG 2.1 AA.
 * Normale Schrift braucht 4,5:1, große Schrift und Grafik 3:1.
 */
const HELL = {
  paper: "#f3ece0",
  "paper-deep": "#e8dfcf",
  ink: "#17151a",
  "ink-soft": "#55505a",
  orchid: "#d8439f",
  "orchid-deep": "#a11f72",
};
const DUNKEL = {
  paper: "#17151a",
  "paper-deep": "#24212a",
  ink: "#f3ece0",
  "ink-soft": "#b9b1a6",
  orchid: "#d8439f",
  "orchid-deep": "#f08ccb",
};

type Farben = typeof HELL;
type Paar = { text: keyof Farben | string; grund: keyof Farben | string; min: number; wo: string };

const PAARE: Paar[] = [
  { text: "ink", grund: "paper", min: 4.5, wo: "Fließtext" },
  { text: "ink", grund: "paper-deep", min: 4.5, wo: "Tabellenzeile" },
  { text: "ink-soft", grund: "paper", min: 4.5, wo: "Sekundärtext" },
  { text: "ink-soft", grund: "paper-deep", min: 4.5, wo: "Sekundärtext in Tabellenzeile" },
  { text: "orchid-deep", grund: "paper", min: 4.5, wo: "Akzent, kleine Schrift" },
  { text: "orchid-deep", grund: "paper-deep", min: 4.5, wo: "Akzent in Tabellenzeile" },
  { text: "orchid", grund: "paper", min: 3, wo: "Einheit neben der Zahl, Monat, Balken, Linien" },
  { text: "orchid", grund: "paper-deep", min: 3, wo: "Einheit auf dem abreißenden Blatt" },
  { text: "paper", grund: "ink", min: 4.5, wo: "Tafel, Knopf gefüllt, Kachel" },
  { text: "orchid", grund: "ink", min: 3, wo: "Sekunden-Kachel (große Ziffer)" },
  { text: "#17151a", grund: "orchid", min: 4.5, wo: "Heute-Marker, nächste Abfahrt, Textmarkierung" },
];

function leuchtdichte(hex: string): number {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(n.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function kontrast(a: string, b: string): number {
  const [l1, l2] = [leuchtdichte(a), leuchtdichte(b)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
}

let fehler = 0;
for (const [name, farben] of [
  ["Papier (hell)", HELL],
  ["Tinte (dunkel)", DUNKEL],
] as const) {
  console.log(`\n${name}`);
  for (const p of PAARE) {
    const text = (farben as Record<string, string>)[p.text] ?? p.text;
    const grund = (farben as Record<string, string>)[p.grund] ?? p.grund;
    const k = kontrast(text, grund);
    const ok = k >= p.min;
    if (!ok) fehler++;
    console.log(
      `  ${ok ? "ok    " : "FEHLER"} ${k.toFixed(2).padStart(5)}:1 (min ${p.min})  ${String(p.text).padEnd(12)} auf ${String(p.grund).padEnd(11)} ${p.wo}`,
    );
  }
}
if (fehler > 0) {
  console.error(`\n${fehler} Kombination(en) unter dem Mindestkontrast.`);
  process.exit(1);
}
console.log("\nAlle Kombinationen erfüllen WCAG AA.");
