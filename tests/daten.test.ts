import { describe, expect, it } from "vitest";
import { alleCountdowns, nachPfad, verwandte } from "@/data/alle";
import { BUNDESLAENDER } from "@/data/bundeslaender";
import { STAMM } from "@/data/countdowns";
import { naechsterFreitagDer13, zahltag } from "@/data/countdowns/alltag";
import { naechsteUmstellung } from "@/data/countdowns/jahreszeiten";
import { EVENTS, kommendeEvents } from "@/data/events";
import { EVENT_DATEN } from "@/data/events-inhalt";
import { brueckentage, naechsterFeiertag } from "@/data/feiertage-land-seiten";
import { anzahlFeiertage, feiertagAm, feiertageImLand } from "@/data/feiertage-laender";
import {
  FERIEN,
  ersterSchultag,
  ferienCountdown,
  ferienKombinationen,
  ferienzeiten,
  freierBlock,
  schulanfaenge,
} from "@/data/ferien";
import { ALLE_DATEN, datumAusSlug, datumCountdown, datumSlug, ferienAm, sternzeichen } from "@/data/tage";
import { istVorbei, stand } from "@/lib/countdown";
import { eigeneTermine, eigenerAusParametern, eigenerPfad } from "@/lib/eigener";
import { sitemapGruppen } from "@/lib/sitemap";
import { seitenTitel } from "@/lib/texte";
import { berlin, iso, tageDiff, tagNr, tagVon, wochentag } from "@/lib/zeit";

const JETZT = berlin(2026, 11, 15, 10);

function woerter(text: string): number {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;
}

function links(text: string): string[] {
  return [...text.matchAll(/\]\((\/[^)#]*)/g)].map((m) => m[1] as string);
}

describe("Register aller Countdowns", () => {
  const alle = alleCountdowns();
  const bekanntePfade = new Set([
    ...Object.values(sitemapGruppen()).flat(),
    ...alle.map((c) => c.pfad),
  ]);

  it("hat eindeutige Pfade", () => {
    const pfade = alle.map((c) => c.pfad);
    expect(new Set(pfade).size).toBe(pfade.length);
  });

  it("jeder Countdown hat Frage, Text, Fragen und Fakten", () => {
    for (const c of alle) {
      expect(c.question.endsWith("?"), c.pfad).toBe(true);
      expect(c.bis.startsWith("bis"), c.pfad).toBe(true);
      expect(woerter(c.intro), `Intro ${c.pfad}`).toBeGreaterThanOrEqual(70);
      expect(c.facts.length, `Fakten ${c.pfad}`).toBeGreaterThanOrEqual(3);
      const fragen = [...c.faq, ...(c.faqDynamisch?.(JETZT) ?? [])];
      expect(fragen.length, `FAQ ${c.pfad}`).toBeGreaterThanOrEqual(3);
      expect(new Set(fragen.map((f) => f.q)).size, `doppelte Frage ${c.pfad}`).toBe(fragen.length);
    }
  });

  it("Links im Fließtext und in den Antworten zeigen auf vorhandene Seiten", () => {
    for (const c of alle) {
      const texte = [c.intro, ...c.faq.map((f) => f.a), ...(c.faqDynamisch?.(JETZT) ?? []).map((f) => f.a)];
      for (const pfad of texte.flatMap(links)) {
        expect(bekanntePfade.has(pfad), `${c.pfad} verlinkt ${pfad}`).toBe(true);
      }
    }
  });

  it("verwandte Countdowns existieren und die Tafel hat mindestens vier Zeilen", () => {
    for (const c of alle) {
      const gefunden = c.related.filter((p) => nachPfad(p));
      expect(gefunden.length, `related ${c.pfad}`).toBeGreaterThanOrEqual(3);
      expect(verwandte(c, JETZT).length, `Tafel ${c.pfad}`).toBeGreaterThanOrEqual(4);
    }
  });

  it("Seitentitel sind nie länger als 70 Zeichen", () => {
    for (const c of alle) {
      const titel = seitenTitel(c, stand(c, JETZT));
      const mitMarke = titel.length > 50 ? titel : `${titel} | Nochtage`;
      expect(mitMarke.length, `${c.pfad}: ${mitMarke}`).toBeLessThanOrEqual(70);
    }
  });

  it("jeder wiederkehrende Countdown liefert ein Datum in der Zukunft oder heute", () => {
    for (const c of alle.filter((x) => !x.einmalig)) {
      const s = stand(c, JETZT);
      expect(tagNr(s.ende), c.pfad).toBeGreaterThanOrEqual(tagNr(tagVon(JETZT)));
    }
  });

  it("Stammseiten kollidieren nicht mit festen Routen", () => {
    const reserviert = ["feiertage", "ferien", "schule", "events", "kalenderwoche", "tage-bis", "alltag", "jahreszeiten", "c", "embed", "og", "impressum", "datenschutz", "eigener-countdown", "api", "sitemaps"];
    for (const c of STAMM) expect(reserviert, c.slug).not.toContain(c.slug);
  });
});

describe("Schulferien", () => {
  it("jeder Zeitraum ist gültig und liegt in den Schuljahren 2026/27 bis 2029/30", () => {
    expect(FERIEN.length).toBeGreaterThan(250);
    for (const f of FERIEN) {
      expect(tagNr(f.von), `${f.land} ${f.art}`).toBeLessThanOrEqual(tagNr(f.bis));
      expect(f.von.y).toBeGreaterThanOrEqual(2026);
      expect(f.bis.y).toBeLessThanOrEqual(2030);
      for (const z of f.zusatz) expect(tagNr(z.von)).toBeLessThanOrEqual(tagNr(z.bis));
    }
  });

  it("jedes Land hat Sommer-, Herbst-, Weihnachts- und Osterferien", () => {
    for (const b of BUNDESLAENDER) {
      for (const art of ["sommerferien", "herbstferien", "weihnachtsferien", "osterferien"] as const) {
        expect(ferienzeiten(art, b.code).length, `${b.name} ${art}`).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("Sommerferien dauern rund sechs Wochen", () => {
    for (const f of FERIEN.filter((x) => x.art === "sommerferien")) {
      const dauer = tageDiff(f.von, f.bis) + 1;
      expect(dauer, `${f.land} ${f.schuljahr}`).toBeGreaterThanOrEqual(38);
      expect(dauer, `${f.land} ${f.schuljahr}`).toBeLessThanOrEqual(48);
    }
  });

  it("bekannte Termine aus dem KMK-Kalender", () => {
    const by = ferienzeiten("weihnachtsferien", "BY")[0]!;
    expect([iso(by.von), iso(by.bis)]).toEqual(["2026-12-24", "2027-01-08"]);
    const sommerBy = ferienzeiten("sommerferien", "BY")[0]!;
    expect([iso(sommerBy.von), iso(sommerBy.bis)]).toEqual(["2027-08-02", "2027-09-13"]);
  });

  it("Bayerns Frühjahrsferien stehen unter Winterferien, die Osterferien liegen um Ostern", () => {
    const winter = ferienzeiten("winterferien", "BY")[0]!;
    expect([iso(winter.von), iso(winter.bis)]).toEqual(["2027-02-08", "2027-02-12"]);
    const ostern = ferienzeiten("osterferien", "BY")[0]!;
    expect([iso(ostern.von), iso(ostern.bis)]).toEqual(["2027-03-22", "2027-04-02"]);
  });

  it("Teile, zwischen denen nur Feiertage und Wochenende liegen, werden zusammengefasst", () => {
    // Baden-Württemberg, Ostern 2027: 25.3. (Gründonnerstag) + 30.3.–3.4., dazwischen Karfreitag bis Ostermontag.
    const bw = ferienzeiten("osterferien", "BW")[0]!;
    expect([iso(bw.von), iso(bw.bis)]).toEqual(["2027-03-25", "2027-04-03"]);
    expect(bw.zusatz).toHaveLength(0);
  });

  it("Hauptzeitraum ist der längste Block, Einzeltage sind Zusatz", () => {
    // Berlin, Pfingsten 2027: 7.5. + 18.–19.5.
    const be = ferienzeiten("pfingstferien", "BE")[0]!;
    expect([iso(be.von), iso(be.bis)]).toEqual(["2027-05-18", "2027-05-19"]);
    expect(be.zusatz.map((z) => iso(z.von))).toEqual(["2027-05-07"]);
  });

  it("freier Block und erster Schultag überspringen Wochenenden und Feiertage", () => {
    const by = ferienzeiten("weihnachtsferien", "BY")[0]!;
    // Letzter Ferientag Fr 8.1.2027, dann Wochenende: Schule ab Mo 11.1.
    expect(iso(ersterSchultag(by, "BY"))).toBe("2027-01-11");
    expect(iso(freierBlock(by, "BY").bis)).toBe("2027-01-10");
  });

  it("es gibt 89 Kombinationen aus Ferienart und Land, jede mit Countdown", () => {
    const k = ferienKombinationen();
    expect(k).toHaveLength(89);
    for (const { art, land } of k) expect(ferienCountdown(art.slug, land.code), `${art.slug} ${land.name}`).not.toBeNull();
  });

  it("Schulanfang ist immer ein Werktag ohne Feiertag", () => {
    for (const b of BUNDESLAENDER) {
      for (const s of schulanfaenge(b.code)) {
        expect([1, 2, 3, 4, 5], `${b.name} ${iso(s.tag)}`).toContain(wochentag(s.tag));
        expect(feiertagAm(s.tag, b.code), `${b.name} ${iso(s.tag)}`).toBeNull();
      }
    }
  });
});

describe("Gesetzliche Feiertage", () => {
  it("Anzahl landesweiter Feiertage je Land", () => {
    const erwartet: Record<string, number> = {
      BW: 12, BY: 12, BE: 10, BB: 12, HB: 10, HH: 10, HE: 10, MV: 11,
      NI: 10, NW: 11, RP: 11, SL: 12, SN: 11, ST: 11, SH: 10, TH: 11,
    };
    for (const b of BUNDESLAENDER) expect(anzahlFeiertage(b.code), b.name).toBe(erwartet[b.code]);
  });

  it("Berlin hat 2028 einen einmaligen zusätzlichen Feiertag", () => {
    expect(feiertageImLand("BE", 2028, false)).toHaveLength(11);
    expect(feiertageImLand("BE", 2027, false)).toHaveLength(10);
  });

  it("nächster Feiertag und Brückentage", () => {
    expect(naechsterFeiertag("SN", JETZT).name).toBe("Buß- und Bettag");
    expect(naechsterFeiertag("BY", JETZT).name).toBe("1. Weihnachtstag");
    // 2027: Christi Himmelfahrt (Do 6.5.) → Brückentag Fr 7.5.
    expect(brueckentage("HH", 2027).map((b) => iso(b.tag))).toContain("2027-05-07");
  });
});

describe("Alltag", () => {
  it("Zahltag nach § 24 TVöD", () => {
    expect(iso(zahltag(2026, 11))).toBe("2026-11-30"); // Montag
    expect(iso(zahltag(2026, 12))).toBe("2026-12-30"); // 31.12. nie
    expect(iso(zahltag(2027, 1))).toBe("2027-01-29"); // 31.1. ist Sonntag → Freitag
    expect(iso(zahltag(2027, 7))).toBe("2027-07-30"); // 31.7. ist Samstag → Freitag
    expect(iso(zahltag(2027, 10))).toBe("2027-10-29"); // 31.10. ist Sonntag → Freitag
    expect(iso(zahltag(2028, 12))).toBe("2028-12-29"); // 31.12. Sonntag → zweiter Werktag davor
  });

  it("Freitag, der 13.", () => {
    expect(iso(naechsterFreitagDer13(tagVon(JETZT)))).toBe("2027-08-13");
  });

  it("Zeitumstellung", () => {
    const u = naechsteUmstellung(JETZT);
    expect([iso(u.tag), u.art]).toEqual(["2027-03-28", "vor"]);
    const h = naechsteUmstellung(berlin(2027, 6, 1));
    expect([iso(h.tag), h.art]).toEqual(["2027-10-31", "zurueck"]);
  });

  it("Feierabend: werktags 17 Uhr, am Wochenende Montag", () => {
    const c = STAMM.find((x) => x.slug === "feierabend")!;
    expect(c.getNextDate(berlin(2026, 11, 16, 9)).toISOString()).toBe(berlin(2026, 11, 16, 17).toISOString());
    expect(c.getNextDate(berlin(2026, 11, 15, 9)).toISOString()).toBe(berlin(2026, 11, 16, 17).toISOString());
    expect(stand(c, berlin(2026, 11, 16, 18)).phase).toBe("heute");
  });

  it("Wochenende: läuft samstags und sonntags, zählt sonst bis Samstag", () => {
    const c = STAMM.find((x) => x.slug === "wochenende")!;
    expect(stand(c, berlin(2026, 11, 15, 12)).phase).toBe("laeuft"); // Sonntag
    expect(stand(c, berlin(2026, 11, 16, 12)).tage).toBe(5); // Montag
    expect(stand(c, berlin(2026, 11, 21, 0, 0, 1)).phase).toBe("laeuft"); // Samstag
  });
});

describe("Events", () => {
  it("37 Events, chronologisch, mit Quelle", () => {
    expect(EVENT_DATEN).toHaveLength(37);
    for (let i = 1; i < EVENT_DATEN.length; i++) {
      expect(EVENT_DATEN[i]!.start >= EVENT_DATEN[i - 1]!.start, EVENT_DATEN[i]!.slug).toBe(true);
    }
    for (const e of EVENT_DATEN) {
      expect(e.source.url.startsWith("https://"), e.slug).toBe(true);
      expect((e.tafel ?? e.title).length, e.slug).toBeLessThanOrEqual(28);
      if (e.ende) expect(e.ende > e.start, e.slug).toBe(true);
    }
  });

  it("vergangene Events fallen aus den Listen", () => {
    expect(kommendeEvents(JETZT)).toHaveLength(37);
    const gta = EVENTS.find((c) => c.slug === "gta-6-release")!;
    expect(istVorbei(gta, berlin(2026, 11, 19, 12))).toBe(false);
    expect(stand(gta, berlin(2026, 11, 19, 12)).phase).toBe("heute");
    expect(istVorbei(gta, berlin(2026, 11, 20, 0, 0, 1))).toBe(true);
    expect(kommendeEvents(berlin(2026, 11, 20, 0, 0, 1))).toHaveLength(36);
  });

  it("Startzeiten gelten in deutscher Zeit", () => {
    const olympia = EVENTS.find((c) => c.slug === "olympia-2028-eroeffnung")!;
    // 15. Juli 2028, 2:00 MESZ = 14. Juli, 17:00 in Los Angeles = 0:00 UTC
    expect(olympia.getNextDate(JETZT).toISOString()).toBe("2028-07-15T00:00:00.000Z");
    const pokal = EVENTS.find((c) => c.slug === "dfb-pokalfinale-2027")!;
    expect(pokal.getNextDate(JETZT).toISOString()).toBe("2027-05-29T18:00:00.000Z");
  });
});

describe("Datumsseiten", () => {
  it("366 Seiten, Slugs lassen sich zurücklesen", () => {
    expect(ALLE_DATEN).toHaveLength(366);
    for (const x of ALLE_DATEN) expect(datumAusSlug(datumSlug(x))).toEqual(x);
    expect(datumAusSlug("31-februar")).toBeUndefined();
    expect(datumAusSlug("0-mai")).toBeUndefined();
  });

  it("der 29. Februar zählt bis zum nächsten Schaltjahr", () => {
    const c = datumCountdown({ d: 29, m: 2 });
    expect(iso(stand(c, JETZT).start)).toBe("2028-02-29");
  });

  it("jede Datumsseite hat eigenen Text", () => {
    const texte = new Set(ALLE_DATEN.map((x) => datumCountdown(x).intro));
    expect(texte.size).toBe(366);
    for (const x of ALLE_DATEN) expect(woerter(datumCountdown(x).intro), datumSlug(x)).toBeGreaterThanOrEqual(80);
  });

  it("Sternzeichen an den Grenzen", () => {
    expect(sternzeichen({ d: 20, m: 3 })).toBe("Fische");
    expect(sternzeichen({ d: 21, m: 3 })).toBe("Widder");
    expect(sternzeichen({ d: 31, m: 12 })).toBe("Steinbock");
    expect(sternzeichen({ d: 20, m: 1 })).toBe("Steinbock");
    expect(sternzeichen({ d: 21, m: 1 })).toBe("Wassermann");
  });

  it("Ferien an einem Tag", () => {
    const heiligabend = ferienAm({ y: 2026, m: 12, d: 24 });
    expect(heiligabend).toHaveLength(16);
    expect(ferienAm({ y: 2026, m: 11, d: 17 })).toHaveLength(0);
  });
});

describe("Eigener Countdown", () => {
  it("liest gültige Parameter und verwirft ungültige", () => {
    const e = eigenerAusParametern({ n: "  Urlaub  in Lissabon ", d: "2027-07-24", t: "06:30", m: "horizont" })!;
    expect(e.name).toBe("Urlaub in Lissabon");
    expect(e.zeit).toEqual({ h: 6, mi: 30 });
    expect(e.motiv).toBe("horizont");
    expect(eigenerAusParametern({ n: "x", d: "2027-02-30" })).toBeNull();
    expect(eigenerAusParametern({ n: "", d: "2027-02-01" })).toBeNull();
    expect(eigenerAusParametern({ n: "x", d: "morgen" })).toBeNull();
    expect(eigenerAusParametern({ n: "x", d: "2027-02-01", t: "25:00" })!.zeit).toBeNull();
    expect(eigenerAusParametern({ n: "x".repeat(200), d: "2027-02-01" })!.name).toHaveLength(60);
    expect(eigenerAusParametern({ n: "x", d: "2027-02-01", m: "gibt-es-nicht" })!.motiv).toBe("blatt-1");
  });

  it("baut einen Pfad, der sich wieder lesen lässt", () => {
    const pfad = eigenerPfad({ name: "Omas 80. & Party", datum: "2027-03-14", zeit: "15:00", motiv: "blume", jaehrlich: true });
    const q = Object.fromEntries(new URL(`https://x.de${pfad}`).searchParams);
    const e = eigenerAusParametern(q)!;
    expect(e.name).toBe("Omas 80. & Party");
    expect(e.jaehrlich).toBe(true);
  });

  it("jährliche Countdowns springen aufs nächste Jahr, der 29. Februar auf den 28.", () => {
    const geburtstag = eigenerAusParametern({ n: "Geburtstag", d: "1990-03-14", j: "1" })!;
    expect(eigeneTermine(geburtstag, JETZT).map((t) => iso(t.tag))).toEqual(["2027-03-14", "2028-03-14"]);
    const schalt = eigenerAusParametern({ n: "Schalttagskind", d: "2000-02-29", j: "1" })!;
    expect(eigeneTermine(schalt, JETZT).map((t) => iso(t.tag))).toEqual(["2027-02-28", "2028-02-29"]);
    const einmal = eigenerAusParametern({ n: "Hochzeit", d: "2027-06-12", t: "14:00" })!;
    expect(new Date(eigeneTermine(einmal, JETZT)[0]!.start).toISOString()).toBe("2027-06-12T12:00:00.000Z");
  });
});

describe("Sitemaps", () => {
  it("enthalten alle indexierbaren Seiten genau einmal", () => {
    const alle = Object.values(sitemapGruppen()).flat();
    expect(new Set(alle).size).toBe(alle.length);
    expect(alle.length).toBeGreaterThanOrEqual(600);
    expect(alle).not.toContain("/c");
    expect(alle.some((p) => p.startsWith("/embed"))).toBe(false);
  });
});
