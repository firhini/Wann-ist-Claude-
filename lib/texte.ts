import { site } from "@/site.config";
import type { Countdown, Einheiten, Stand } from "./countdown";
import {
  datumLang,
  datumMitWochentag,
  datumOhneJahr,
  plural,
  tausender,
  uhrzeit,
  wochentagName,
} from "./format";
import { type Tag, teile } from "./zeit";

/** Startuhrzeit eines Countdowns in Berliner Zeit, falls er eine hat. */
export function uhrVon(c: Pick<Countdown, "uhrzeit" | "hatUhrzeit">, s: Stand): { h: number; mi: number } | null {
  if (c.uhrzeit) return c.uhrzeit;
  if (c.hatUhrzeit) {
    const t = teile(s.startZeit);
    return { h: t.h, mi: t.mi };
  }
  return null;
}

export function grossAnfang(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "noch 40 Tage" / "noch 1 Tag" */
export function nochTage(n: number): string {
  return `noch ${tausender(n)} ${plural(n, "Tag", "Tage")}`;
}

/**
 * Der Antwortsatz: steht als erster Satz nach der H1 im HTML.
 * `satz` ist die direkte Antwort, `zusatz` das konkrete Datum.
 */
export function antwort(c: Countdown, s: Stand, folge?: Tag | null): { satz: string; zusatz: string } {
  const name = c.nominativ ?? c.title;
  const mz = c.mehrzahl === true;

  if (s.phase === "heute") {
    return {
      satz: c.heute,
      zusatz: folge ? `Das nächste Mal: ${datumMitWochentag(folge)}.` : "",
    };
  }

  if (s.phase === "laeuft") {
    return {
      satz: c.laeuft ?? c.heute,
      zusatz:
        s.restTage === 1
          ? `Heute ist der letzte Tag (${datumMitWochentag(s.ende)}).`
          : `Noch ${s.restTage} Tage, der letzte ist ${datumMitWochentag(s.ende)}.`,
    };
  }

  const satz =
    s.tage === 1
      ? `${grossAnfang(c.bis)} ist es noch 1 Tag: Morgen ist es so weit.`
      : `${grossAnfang(c.bis)} sind es noch ${tausender(s.tage)} Tage.`;

  let zusatz: string;
  const uhr = uhrVon(c, s);
  if (c.zusatzSatz) {
    zusatz = c.zusatzSatz(s);
  } else if (c.art === "zeitraum" && s.tageGesamt > 1) {
    zusatz = `${name} ${mz ? "beginnen" : "beginnt"} am ${datumMitWochentag(s.start)}, und ${mz ? "enden" : "endet"} am ${datumMitWochentag(s.ende)}.`;
  } else if (uhr) {
    zusatz = `${name} ${mz ? "beginnen" : "beginnt"} am ${datumMitWochentag(s.start)}, um ${uhrzeit(uhr.h, uhr.mi)}.`;
  } else {
    zusatz = `${name} ${mz ? "fallen" : "fällt"} ${s.start.y} auf einen ${wochentagName(s.start)}, den ${datumOhneJahr(s.start)}.`;
  }
  return { satz, zusatz };
}

/** Seitentitel, ohne Markennamen (der kommt über das Template dazu). */
export function seitenTitel(c: Countdown, s: Stand): string {
  if (c.seoTitel) return c.seoTitel(s);
  const frage = c.question.replace(/\?$/, "");
  if (s.phase === "heute") return `${c.heute.replace(/\.$/, "")} (${datumLang(s.start)})`;
  if (s.phase === "laeuft") return `${frage}? Jetzt, noch ${s.restTage} ${plural(s.restTage, "Tag", "Tage")}`;
  return `${frage} ${s.start.y}? ${grossAnfang(nochTage(s.tage))}`;
}

export function beschreibung(c: Countdown, s: Stand, e: Einheiten, folge?: Tag | null): string {
  const a = antwort(c, s, folge);
  if (s.phase !== "vor") return `${a.satz} ${a.zusatz}`.trim();
  const wochen =
    e.wochenGanz > 0
      ? ` Das sind ${e.wochenGanz} ${plural(e.wochenGanz, "Woche", "Wochen")}${
          e.wochenRestTage ? ` und ${e.wochenRestTage} ${plural(e.wochenRestTage, "Tag", "Tage")}` : ""
        }, ${e.wochenenden} ${plural(e.wochenenden, "Wochenende", "Wochenenden")} oder ${e.naechte}-mal schlafen.`
      : "";
  return `${a.satz} ${a.zusatz}${wochen}`.trim();
}

export function vollerTitel(titel: string): string {
  return `${titel} | ${site.name}`;
}
