/**
 * Adressen der Vorschaubilder. Alles steckt im Pfad, nichts hinter einem Fragezeichen:
 * Der Zwischenspeicher von Netlify unterscheidet Bilder nur nach dem Pfad. Mit Parametern
 * (?s=…) bekam jede Seite dasselbe Bild.
 *
 *   /og/s/weihnachten/bild.png                 Countdown aus den Daten (Pfad der Seite)
 *   /og/d/2027-06-12/Hochzeit/bild.png         eigener Countdown: Datum und Name
 *   /og/z/46/KW/Welche%20KW…/bild.png          freie Zahl mit Einheit
 *   /og/t/Titel/bild.png                       nur Titel
 */
export type OgAngabe = { s?: string; t?: string; d?: string; z?: string; e?: string };

function teil(text: string): string {
  // Schrägstriche würden den Pfad zerlegen.
  return encodeURIComponent(text.replace(/\//g, " ").trim().slice(0, 80) || "-");
}

export function ogPfad(a: OgAngabe): string {
  if (a.s) return `/og/s${a.s === "/" ? "" : a.s}/bild.png`;
  if (a.d) return `/og/d/${teil(a.d)}/${teil(a.t ?? "dahin")}/bild.png`;
  if (a.z) return `/og/z/${teil(a.z)}/${teil(a.e || "-")}/${teil(a.t ?? "")}/bild.png`;
  return `/og/t/${teil(a.t ?? "")}/bild.png`;
}

function roh(s: string | undefined): string {
  if (!s) return "";
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/** Liest die Angaben aus den Pfadteilen hinter /og/. */
export function ogAusPfad(teile: string[]): OgAngabe {
  const t = teile.filter((x) => x !== "bild.png").map(roh);
  const [art, ...rest] = t;
  if (art === "s") return { s: `/${rest.join("/")}` };
  if (art === "d") return { d: rest[0], t: rest[1] };
  if (art === "z") return { z: rest[0], e: rest[1] === "-" ? "" : rest[1], t: rest[2] };
  if (art === "t") return { t: rest[0] === "-" ? "" : rest[0] };
  return {};
}
