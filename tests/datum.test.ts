import { describe, expect, it } from "vitest";
import {
  advent,
  aschermittwoch,
  blackFriday,
  bussUndBettag,
  christiHimmelfahrt,
  fronleichnam,
  karfreitag,
  muttertag,
  ostermontag,
  ostersonntag,
  pfingstsonntag,
  rosenmontag,
  sommerzeitBeginn,
  sommerzeitEnde,
  vatertag,
  weiberfastnacht,
} from "@/lib/feiertage";
import { kalenderwoche, montagDerKw, wochenImJahr } from "@/lib/kw";
import {
  arbeitstageBis,
  berlin,
  iso,
  naechsteMitternacht,
  tageZwischen,
  tagImJahr,
  tagVon,
  teile,
  wochenendenBis,
  wochentag,
} from "@/lib/zeit";
import { einheiten, fest, jaehrlich, naechsteJahre, stand } from "@/lib/countdown";

describe("Ostern (Gauß'sche Osterformel)", () => {
  // Referenz: veröffentlichte Osterdaten, u. a. Physikalisch-Technische Bundesanstalt.
  const bekannt: Record<number, string> = {
    1954: "1954-04-18", // Ausnahmeregel der Formel
    1981: "1981-04-19", // Ausnahmeregel der Formel
    2000: "2000-04-23",
    2008: "2008-03-23", // sehr früh
    2011: "2011-04-24", // sehr spät
    2019: "2019-04-21",
    2024: "2024-03-31",
    2025: "2025-04-20",
    2026: "2026-04-05",
    2027: "2027-03-28",
    2028: "2028-04-16",
    2029: "2029-04-01",
    2030: "2030-04-21",
    2031: "2031-04-13",
    2032: "2032-03-28",
    2033: "2033-04-17",
    2038: "2038-04-25", // spätestmögliches Datum
    2049: "2049-04-18", // Ausnahmeregel der Formel
  };
  for (const [jahr, datum] of Object.entries(bekannt)) {
    it(`${jahr} → ${datum}`, () => {
      expect(iso(ostersonntag(Number(jahr)))).toBe(datum);
    });
  }

  it("ist immer ein Sonntag zwischen 22. März und 25. April", () => {
    for (let y = 1900; y <= 2200; y++) {
      const o = ostersonntag(y);
      expect(wochentag(o)).toBe(0);
      const md = o.m * 100 + o.d;
      expect(md).toBeGreaterThanOrEqual(322);
      expect(md).toBeLessThanOrEqual(425);
    }
  });
});

describe("Von Ostern abhängige Tage", () => {
  it("2026", () => {
    expect(iso(weiberfastnacht(2026))).toBe("2026-02-12");
    expect(iso(rosenmontag(2026))).toBe("2026-02-16");
    expect(iso(aschermittwoch(2026))).toBe("2026-02-18");
    expect(iso(karfreitag(2026))).toBe("2026-04-03");
    expect(iso(ostermontag(2026))).toBe("2026-04-06");
    expect(iso(christiHimmelfahrt(2026))).toBe("2026-05-14");
    expect(iso(pfingstsonntag(2026))).toBe("2026-05-24");
    expect(iso(fronleichnam(2026))).toBe("2026-06-04");
  });
  it("2027", () => {
    expect(iso(weiberfastnacht(2027))).toBe("2027-02-04");
    expect(iso(rosenmontag(2027))).toBe("2027-02-08");
    expect(iso(karfreitag(2027))).toBe("2027-03-26");
    expect(iso(christiHimmelfahrt(2027))).toBe("2027-05-06");
    expect(iso(pfingstsonntag(2027))).toBe("2027-05-16");
    expect(iso(fronleichnam(2027))).toBe("2027-05-27");
  });
  it("Wochentage stimmen über 8 Jahre", () => {
    for (let y = 2025; y <= 2032; y++) {
      expect(wochentag(weiberfastnacht(y))).toBe(4);
      expect(wochentag(rosenmontag(y))).toBe(1);
      expect(wochentag(aschermittwoch(y))).toBe(3);
      expect(wochentag(karfreitag(y))).toBe(5);
      expect(wochentag(ostermontag(y))).toBe(1);
      expect(wochentag(christiHimmelfahrt(y))).toBe(4);
      expect(wochentag(pfingstsonntag(y))).toBe(0);
      expect(wochentag(fronleichnam(y))).toBe(4);
      expect(vatertag(y)).toEqual(christiHimmelfahrt(y));
    }
  });
});

describe("Advent, Muttertag, Buß- und Bettag", () => {
  it("Adventssonntage 2026–2031", () => {
    const erster: Record<number, string> = {
      2026: "2026-11-29",
      2027: "2027-11-28",
      2028: "2028-12-03",
      2029: "2029-12-02",
      2030: "2030-12-01",
      2031: "2031-11-30",
    };
    for (const [jahr, datum] of Object.entries(erster)) {
      const y = Number(jahr);
      expect(iso(advent(y, 1))).toBe(datum);
      expect(wochentag(advent(y, 4))).toBe(0);
      // Der 4. Advent liegt zwischen 18. und 24. Dezember.
      expect(advent(y, 4).m).toBe(12);
      expect(advent(y, 4).d).toBeGreaterThanOrEqual(18);
      expect(advent(y, 4).d).toBeLessThanOrEqual(24);
    }
  });
  it("4. Advent kann auf Heiligabend fallen (2028)", () => {
    expect(iso(advent(2028, 4))).toBe("2028-12-24");
  });
  it("frühester 1. Advent ist der 27. November (2033)", () => {
    expect(iso(advent(2033, 1))).toBe("2033-11-27");
  });
  it("Muttertag", () => {
    expect(iso(muttertag(2026))).toBe("2026-05-10");
    expect(iso(muttertag(2027))).toBe("2027-05-09");
    expect(iso(muttertag(2028))).toBe("2028-05-14");
    expect(iso(muttertag(2032))).toBe("2032-05-09");
  });
  it("Buß- und Bettag", () => {
    expect(iso(bussUndBettag(2026))).toBe("2026-11-18");
    expect(iso(bussUndBettag(2027))).toBe("2027-11-17");
    expect(iso(bussUndBettag(2028))).toBe("2028-11-22");
    expect(iso(bussUndBettag(2029))).toBe("2029-11-21");
    for (let y = 2025; y <= 2035; y++) expect(wochentag(bussUndBettag(y))).toBe(3);
  });
  it("Black Friday", () => {
    expect(iso(blackFriday(2026))).toBe("2026-11-27");
    expect(iso(blackFriday(2027))).toBe("2027-11-26");
    expect(iso(blackFriday(2028))).toBe("2028-11-24");
  });
});

describe("Zeitumstellung", () => {
  it("Termine 2026–2031", () => {
    expect(iso(sommerzeitBeginn(2026))).toBe("2026-03-29");
    expect(iso(sommerzeitEnde(2026))).toBe("2026-10-25");
    expect(iso(sommerzeitBeginn(2027))).toBe("2027-03-28");
    expect(iso(sommerzeitEnde(2027))).toBe("2027-10-31");
    expect(iso(sommerzeitBeginn(2028))).toBe("2028-03-26");
    expect(iso(sommerzeitEnde(2028))).toBe("2028-10-29");
    expect(iso(sommerzeitBeginn(2031))).toBe("2031-03-30");
  });
  it("berechnete Termine decken sich mit der Zeitzonendatenbank", () => {
    for (let y = 2025; y <= 2032; y++) {
      const b = sommerzeitBeginn(y);
      // 1:59:59 MEZ = 0:59:59 UTC, eine Sekunde später ist es 3:00 MESZ.
      const vor = new Date(Date.UTC(b.y, b.m - 1, b.d, 0, 59, 59));
      expect(teile(vor).h).toBe(1);
      expect(teile(new Date(vor.getTime() + 1000)).h).toBe(3);
      const e = sommerzeitEnde(y);
      // 2:59:59 MESZ = 0:59:59 UTC, eine Sekunde später ist es 2:00 MEZ.
      const vorEnde = new Date(Date.UTC(e.y, e.m - 1, e.d, 0, 59, 59));
      expect(teile(vorEnde).h).toBe(2);
      expect(teile(new Date(vorEnde.getTime() + 1000)).h).toBe(2);
    }
  });
});

describe("Europe/Berlin statt Server-UTC", () => {
  it("23:30 UTC im Winter ist in Berlin schon der nächste Tag", () => {
    const now = new Date("2026-12-23T23:30:00Z"); // 00:30 MEZ am 24.12.
    expect(iso(tagVon(now))).toBe("2026-12-24");
  });
  it("22:30 UTC im Sommer ist in Berlin schon der nächste Tag", () => {
    const now = new Date("2027-07-31T22:30:00Z"); // 00:30 MESZ am 1.8.
    expect(iso(tagVon(now))).toBe("2027-08-01");
  });
  it("berlin() liefert Mitternacht in Ortszeit", () => {
    expect(berlin(2026, 12, 25).toISOString()).toBe("2026-12-24T23:00:00.000Z");
    expect(berlin(2027, 7, 1).toISOString()).toBe("2027-06-30T22:00:00.000Z");
  });
  it("Tage zählen über die Zeitumstellung hinweg richtig", () => {
    // Vom 27. März bis 29. März 2027 liegt die Umstellung (28.3.): nur 47 Stunden, aber 2 Kalendertage.
    expect(tageZwischen(berlin(2027, 3, 27, 12), berlin(2027, 3, 29, 12))).toBe(2);
    expect(tageZwischen(berlin(2027, 10, 30, 23, 59), berlin(2027, 11, 1, 0, 1))).toBe(2);
  });
  it("der Tag der Zeitumstellung hat 23 bzw. 25 Stunden", () => {
    const fruehjahr = berlin(2027, 3, 28, 0, 0, 0);
    expect((naechsteMitternacht(fruehjahr).getTime() - fruehjahr.getTime()) / 3_600_000).toBe(23);
    const herbst = berlin(2027, 10, 31, 0, 0, 0);
    expect((naechsteMitternacht(herbst).getTime() - herbst.getTime()) / 3_600_000).toBe(25);
  });
});

describe("Countdown-Stand", () => {
  const weihnachten = { ...fest(12, 25, 2), art: "tag" as const };
  const silvester = { ...fest(12, 31), art: "tag" as const };
  const neujahr = { ...fest(1, 1), art: "tag" as const };

  it("15. November 2026: noch 40 Tage bis zum 1. Weihnachtstag", () => {
    const s = stand(weihnachten, berlin(2026, 11, 15, 9, 37, 52));
    expect(s.phase).toBe("vor");
    expect(s.tage).toBe(40);
    expect(iso(s.start)).toBe("2026-12-25");
  });
  it("am Vortag um 23:59:59 noch 1 Tag, eine Sekunde später: heute", () => {
    const vor = berlin(2026, 12, 24, 23, 59, 59);
    expect(stand(weihnachten, vor).tage).toBe(1);
    expect(stand(weihnachten, vor).phase).toBe("vor");
    const dann = new Date(vor.getTime() + 1000);
    expect(stand(weihnachten, dann).phase).toBe("heute");
    expect(stand(weihnachten, dann).tage).toBe(0);
  });
  it("am 2. Weihnachtstag ist immer noch Weihnachten, am 27. zählt es neu", () => {
    expect(stand(weihnachten, berlin(2026, 12, 26, 18)).phase).toBe("heute");
    const s = stand(weihnachten, berlin(2026, 12, 27, 0, 0, 1));
    expect(s.phase).toBe("vor");
    expect(iso(s.start)).toBe("2027-12-25");
    expect(s.tage).toBe(363);
  });
  it("Silvester um 23:59:59: heute ist Silvester, Neujahr in 1 Tag", () => {
    const now = berlin(2026, 12, 31, 23, 59, 59);
    expect(stand(silvester, now).phase).toBe("heute");
    expect(stand(neujahr, now).tage).toBe(1);
    const neu = new Date(now.getTime() + 1000);
    expect(stand(neujahr, neu).phase).toBe("heute");
    expect(iso(stand(neujahr, neu).start)).toBe("2027-01-01");
    // Silvester springt aufs nächste Jahr.
    expect(iso(stand(silvester, neu).start)).toBe("2027-12-31");
    expect(stand(silvester, neu).tage).toBe(364);
  });
  it("Jahreswechsel über 6 Jahre, inklusive Schaltjahr 2028", () => {
    for (let y = 2026; y <= 2031; y++) {
      const erwartet = (y % 4 === 0 ? 366 : 365) - 1;
      const s = stand(silvester, berlin(y, 1, 1, 0, 0, 0));
      expect(s.tage).toBe(erwartet);
      expect(s.start.y).toBe(y);
    }
  });
  it("29. Februar: springt im Nicht-Schaltjahr nicht auf den 1. März", () => {
    const schalttag = {
      art: "tag" as const,
      ...jaehrlich((jahr) => {
        let y = jahr;
        while (!((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0)) y++;
        return { y, m: 2, d: 29 };
      }),
    };
    const s = stand(schalttag, berlin(2026, 11, 15));
    expect(iso(s.start)).toBe("2028-02-29");
    expect(s.tage).toBe(471);
    expect(stand(schalttag, berlin(2028, 2, 29, 12)).phase).toBe("heute");
  });
  it("bewegliches Fest: Ostern rollt nach dem Tag aufs nächste Jahr", () => {
    const ostern = { ...jaehrlich(ostersonntag), art: "tag" as const };
    expect(iso(stand(ostern, berlin(2026, 4, 5, 23, 59, 59)).start)).toBe("2026-04-05");
    expect(iso(stand(ostern, berlin(2026, 4, 6, 0, 0, 0)).start)).toBe("2027-03-28");
    expect(iso(stand(ostern, berlin(2026, 11, 15)).start)).toBe("2027-03-28");
  });
  it("Zeitraum: vor, während und nach den Ferien", () => {
    const ferien = {
      art: "zeitraum" as const,
      getNextDate: (now: Date) => (now < berlin(2027, 1, 9) ? berlin(2026, 12, 24) : berlin(2027, 12, 24)),
      getEndDate: (now: Date) => (now < berlin(2027, 1, 9) ? berlin(2027, 1, 8) : berlin(2028, 1, 7)),
    };
    const vor = stand(ferien, berlin(2026, 11, 15, 10));
    expect(vor.phase).toBe("vor");
    expect(vor.tage).toBe(39);
    expect(vor.tageGesamt).toBe(16);
    const drin = stand(ferien, berlin(2026, 12, 31, 10));
    expect(drin.phase).toBe("laeuft");
    expect(drin.tagNummer).toBe(8);
    expect(drin.restTage).toBe(9);
    const letzter = stand(ferien, berlin(2027, 1, 8, 23, 59, 59));
    expect(letzter.phase).toBe("laeuft");
    expect(letzter.restTage).toBe(1);
    expect(stand(ferien, berlin(2027, 1, 9, 0, 0, 0)).phase).toBe("vor");
  });
  it("Tabelle der nächsten Jahre beginnt beim nächsten Vorkommen", () => {
    const liste = naechsteJahre(weihnachten, berlin(2026, 12, 27), 6);
    expect(liste.map((e) => e.jahr)).toEqual([2027, 2028, 2029, 2030, 2031, 2032]);
    const jetzt = naechsteJahre(weihnachten, berlin(2026, 11, 15), 6);
    expect(jetzt[0]?.jahr).toBe(2026);
    expect(jetzt).toHaveLength(6);
  });
});

describe("Einheiten", () => {
  it("15.11.2026 09:37:52 bis 25.12.2026", () => {
    const e = einheiten(berlin(2026, 11, 15, 9, 37, 52), berlin(2026, 12, 25));
    expect(e.tage).toBe(40);
    expect(e.wochenGanz).toBe(5);
    expect(e.wochenRestTage).toBe(5);
    expect(e.stunden).toBe(39 * 24 + 14);
    expect(e.minuten).toBe((39 * 24 + 14) * 60 + 22);
    expect(e.wochenenden).toBe(5); // Samstage 21.11., 28.11., 5.12., 12.12., 19.12.
  });
  it("Wochenenden zählt Samstage nach heute bis einschließlich Ziel", () => {
    // So 15.11. → Fr 25.12.: Samstage 21., 28. Nov, 5., 12., 19. Dez = 5
    expect(wochenendenBis({ y: 2026, m: 11, d: 15 }, { y: 2026, m: 12, d: 25 })).toBe(5);
    expect(wochenendenBis({ y: 2026, m: 11, d: 20 }, { y: 2026, m: 11, d: 21 })).toBe(1);
    expect(wochenendenBis({ y: 2026, m: 11, d: 21 }, { y: 2026, m: 11, d: 27 })).toBe(0);
  });
  it("Arbeitstage Mo–Fr zwischen heute und Ziel", () => {
    // Mo 16.11. bis Fr 20.11. = 5
    expect(arbeitstageBis({ y: 2026, m: 11, d: 15 }, { y: 2026, m: 11, d: 21 })).toBe(5);
  });
});

describe("Kalenderwochen nach ISO 8601", () => {
  it("bekannte Wochen", () => {
    expect(kalenderwoche({ y: 2026, m: 11, d: 15 })).toEqual({ kw: 46, jahr: 2026 });
    expect(kalenderwoche({ y: 2026, m: 1, d: 1 })).toEqual({ kw: 1, jahr: 2026 });
    expect(kalenderwoche({ y: 2026, m: 12, d: 31 })).toEqual({ kw: 53, jahr: 2026 });
    expect(kalenderwoche({ y: 2027, m: 1, d: 1 })).toEqual({ kw: 53, jahr: 2026 });
    expect(kalenderwoche({ y: 2027, m: 1, d: 4 })).toEqual({ kw: 1, jahr: 2027 });
    expect(kalenderwoche({ y: 2024, m: 12, d: 30 })).toEqual({ kw: 1, jahr: 2025 });
    expect(kalenderwoche({ y: 2028, m: 1, d: 2 })).toEqual({ kw: 52, jahr: 2027 });
  });
  it("Jahre mit 53 Wochen", () => {
    expect(wochenImJahr(2026)).toBe(53);
    expect(wochenImJahr(2027)).toBe(52);
    expect(wochenImJahr(2032)).toBe(53);
    expect(wochenImJahr(2037)).toBe(53);
    expect(wochenImJahr(2025)).toBe(52);
  });
  it("Montag der KW und Rückrechnung", () => {
    expect(iso(montagDerKw(2026, 46))).toBe("2026-11-09");
    expect(iso(montagDerKw(2026, 1))).toBe("2025-12-29");
    for (let y = 2025; y <= 2032; y++) {
      for (let kw = 1; kw <= wochenImJahr(y); kw++) {
        const mo = montagDerKw(y, kw);
        expect(wochentag(mo)).toBe(1);
        expect(kalenderwoche(mo)).toEqual({ kw, jahr: y });
      }
    }
  });
  it("Tag im Jahr", () => {
    expect(tagImJahr({ y: 2026, m: 11, d: 15 })).toBe(319);
    expect(tagImJahr({ y: 2028, m: 12, d: 31 })).toBe(366);
  });
});
