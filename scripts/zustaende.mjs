// Screenshots besonderer Zustände: Die Uhr im Browser wird vorgestellt, der Zähler rechnet im Client neu.
// Aufruf: node scripts/zustaende.mjs <ordner>   (Server auf Port 3100)
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const ordner = process.argv[2] ?? "tmp/zustaende";
await mkdir(`screenshots/${ordner}`, { recursive: true });

const FAELLE = [
  { name: "laeuft-ferien", pfad: "/ferien/weihnachtsferien/bayern", zeit: "2026-12-30T10:15:00+01:00" },
  { name: "heute-weihnachten", pfad: "/weihnachten", zeit: "2026-12-25T09:00:00+01:00", bewegung: true },
  { name: "letzter-tag-pokalfinale", pfad: "/events/dfb-pokalfinale-2027", zeit: "2027-05-29T16:42:10+02:00" },
  { name: "morgen-silvester", pfad: "/silvester", zeit: "2026-12-30T23:59:40+01:00" },
  { name: "vorbei-eigener", pfad: "/c?n=Abgabe+Steuererkl%C3%A4rung&d=2026-09-01", zeit: "2026-11-15T12:00:00+01:00" },
];

const browser = await chromium.launch();
for (const fall of FAELLE) {
  for (const [breite, hoehe] of [[1440, 900], [375, 760]]) {
    const ctx = await browser.newContext({
      viewport: { width: breite, height: hoehe },
      timezoneId: "Europe/Berlin",
      locale: "de-DE",
      reducedMotion: fall.bewegung ? "no-preference" : "reduce",
    });
    const page = await ctx.newPage();
    await page.clock.install({ time: new Date(fall.zeit) });
    await page.goto(BASE + fall.pfad, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.clock.runFor(fall.bewegung ? 900 : 2500);
    const datei = `screenshots/${ordner}/${fall.name}-${breite}.png`;
    await page.screenshot({ path: datei });
    console.log(datei);
    await ctx.close();
  }
}
await browser.close();
