import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { nachPfad } from "@/data/alle";
import { stand } from "@/lib/countdown";
import { datumKurz, datumMitWochentag, tausender } from "@/lib/format";
import { ausIso, tageDiff, tagVon } from "@/lib/zeit";
import { site } from "@/site.config";

/**
 * Dynamisches Vorschaubild im Seiten-Design, mit aktueller Zahl.
 *   /og?s=/weihnachten         Countdown aus den Daten
 *   /og?t=Titel&d=2027-06-12   eigener Countdown
 *   /og?t=Titel&z=46&e=KW      freie Zahl mit Einheit
 *   /og?t=Titel                nur Titel
 */

const PAPER = "#f3ece0";
const INK = "#17151a";
const SOFT = "#55505a";
const ORCHID = "#d8439f";

let schriften: Promise<{ display: Buffer; mono: Buffer; text: Buffer }> | null = null;
function ladeSchriften() {
  schriften ??= (async () => {
    const ordner = join(process.cwd(), "assets", "og");
    const [display, mono, text] = await Promise.all([
      readFile(join(ordner, "BigShouldersDisplay-800.woff")),
      readFile(join(ordner, "MartianMono-400.woff")),
      readFile(join(ordner, "AtkinsonHyperlegibleNext-400.woff")),
    ]);
    return { display, mono, text };
  })();
  return schriften;
}

export async function GET(request: Request) {
  const p = new URL(request.url).searchParams;
  const now = new Date();
  const heute = tagVon(now);

  let frage: string = (p.get("t") ?? site.claim).slice(0, 80);
  let zahl: string | null = p.get("z")?.slice(0, 6) ?? null;
  let einheit = (p.get("e") ?? "").slice(0, 12);
  let unterzeile: string = site.domain;

  const pfad = p.get("s");
  const c = pfad ? nachPfad(pfad) : undefined;
  if (c) {
    const s = stand(c, now);
    frage = c.question;
    unterzeile = datumMitWochentag(s.start);
    if (s.phase === "vor") {
      zahl = tausender(s.tage);
      einheit = s.tage === 1 ? "Tag" : "Tage";
    } else if (s.phase === "laeuft") {
      zahl = String(s.restTage);
      einheit = s.restTage === 1 ? "Tag noch" : "Tage noch";
    } else {
      zahl = "Heute";
      einheit = "";
    }
  } else if (p.get("d")) {
    try {
      const ziel = ausIso(p.get("d") as string);
      const n = tageDiff(heute, ziel);
      unterzeile = datumMitWochentag(ziel);
      frage = `Wie lange noch bis ${(p.get("t") ?? "dahin").slice(0, 60)}?`;
      if (n > 0) {
        zahl = tausender(n);
        einheit = n === 1 ? "Tag" : "Tage";
      } else {
        zahl = n === 0 ? "Heute" : "Vorbei";
        einheit = "";
      }
    } catch {
      // Ungültiges Datum: Titelkarte ohne Zahl.
    }
  }

  const f = await ladeSchriften();
  const istWort = zahl !== null && /[A-Za-z]/.test(zahl);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          borderTop: `18px solid ${INK}`,
          padding: "44px 64px 48px",
          fontFamily: "Display",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 40, letterSpacing: 1, textTransform: "uppercase" }}>{site.name}</div>
          <div style={{ fontFamily: "Mono", fontSize: 22, color: SOFT }}>{site.domain}</div>
        </div>
        <div style={{ display: "flex", borderTop: `2px solid ${INK}`, marginTop: 22 }} />
        <div
          style={{
            display: "flex",
            fontSize: zahl ? 56 : 104,
            lineHeight: 1.02,
            textTransform: "uppercase",
            marginTop: zahl ? 30 : 90,
            maxWidth: 1000,
          }}
        >
          {frage}
        </div>
        {zahl ? (
          <div style={{ display: "flex", alignItems: "flex-end", flexGrow: 1, marginTop: 4 }}>
            <div
              style={{
                display: "flex",
                fontSize: istWort ? 220 : 290,
                lineHeight: 0.8,
                letterSpacing: -4,
                textTransform: "uppercase",
              }}
            >
              {zahl}
            </div>
            {einheit ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 22,
                  marginBottom: 8,
                }}
              >
                <div style={{ display: "flex", fontSize: 84, lineHeight: 0.9, textTransform: "uppercase", color: ORCHID }}>
                  {einheit}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div style={{ display: "flex", flexGrow: 1 }} />
        )}
        <div style={{ display: "flex", borderTop: `3px dashed ${INK}`, marginTop: 26 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Mono",
            fontSize: 26,
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex" }}>{unterzeile}</div>
          <div style={{ display: "flex", color: SOFT }}>Stand {datumKurz(heute)}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Display", data: f.display, weight: 800, style: "normal" },
        { name: "Mono", data: f.mono, weight: 400, style: "normal" },
        { name: "Text", data: f.text, weight: 400, style: "normal" },
      ],
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=3600",
      },
    },
  );
}
