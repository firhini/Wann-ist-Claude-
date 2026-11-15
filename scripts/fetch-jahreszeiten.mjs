// Holt Tagundnachtgleichen und Sonnenwenden (UTC) vom U.S. Naval Observatory
// und schreibt sie nach data/jahreszeiten.json. Aufruf: node scripts/fetch-jahreszeiten.mjs
import { writeFile } from "node:fs/promises";

const VON = 2026;
const BIS = 2036;
const out = {
  abgerufen: new Date().toISOString().slice(0, 10),
  quelle: {
    label: "U.S. Naval Observatory, Astronomical Applications: Earth's Seasons",
    url: "https://aa.usno.navy.mil/data/Earth_Seasons",
  },
  hinweis: "Zeiten in UTC, auf die Minute. Umrechnung nach Europe/Berlin erfolgt im Code.",
  jahre: {},
};
for (let jahr = VON; jahr <= BIS; jahr++) {
  const res = await fetch(`https://aa.usno.navy.mil/api/seasons?year=${jahr}`);
  if (!res.ok) throw new Error(`USNO ${jahr}: ${res.status}`);
  const json = await res.json();
  const iso = (e) =>
    `${e.year}-${String(e.month).padStart(2, "0")}-${String(e.day).padStart(2, "0")}T${e.time}:00Z`;
  const eq = json.data.filter((e) => e.phenom === "Equinox");
  const so = json.data.filter((e) => e.phenom === "Solstice");
  if (eq.length !== 2 || so.length !== 2) throw new Error(`USNO ${jahr}: unerwartete Daten`);
  out.jahre[jahr] = {
    fruehling: iso(eq[0]),
    sommer: iso(so[0]),
    herbst: iso(eq[1]),
    winter: iso(so[1]),
  };
}
await writeFile(new URL("../data/jahreszeiten.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log("ok", Object.keys(out.jahre).length, "Jahre");
