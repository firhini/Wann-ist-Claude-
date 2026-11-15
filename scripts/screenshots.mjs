// Screenshots für die Qualitätsschleife.
// Aufruf: node scripts/screenshots.mjs <ordner> [pfad ...]
// Erwartet einen laufenden Server (BASE_URL, Standard http://localhost:3100).
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const [ordner = "tmp", ...pfade] = process.argv.slice(2);
const seiten = pfade.length ? pfade : ["/", "/weihnachten", "/kalenderwoche", "/feiertage"];
const BREITEN = [
  { name: "375", width: 375, height: 760 },
  { name: "1440", width: 1440, height: 900 },
];
const schema = process.env.SCHEMA ?? "light";
const ganz = process.env.GANZ !== "0";

await mkdir(`screenshots/${ordner}`, { recursive: true });
const browser = await chromium.launch();
for (const b of BREITEN) {
  const context = await browser.newContext({
    viewport: { width: b.width, height: b.height },
    deviceScaleFactor: 1,
    colorScheme: schema,
    reducedMotion: process.env.BEWEGUNG === "1" ? "no-preference" : "reduce",
    locale: "de-DE",
    timezoneId: "Europe/Berlin",
  });
  const page = await context.newPage();
  for (const pfad of seiten) {
    await page.goto(BASE + pfad, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const name = (pfad === "/" ? "start" : pfad.replace(/^\//, "").replace(/[/?=&]/g, "_")) || "start";
    const datei = `screenshots/${ordner}/${name}-${b.name}${schema === "dark" ? "-dunkel" : ""}${ganz ? "" : "-falz"}.png`;
    await page.screenshot({ path: datei, fullPage: ganz });
    console.log(datei);
  }
  await context.close();
}
await browser.close();
