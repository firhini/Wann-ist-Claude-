import type { Countdown } from "@/lib/countdown";
import { datumLang, datumMitWochentag, monatName, tausender, wochentagName } from "@/lib/format";
import {
  type Tag,
  berlin,
  mitternacht,
  plusTage,
  tageDiff,
  tageImJahr,
  tageImMonat,
  tagImJahr,
  tagNr,
  tagVon,
  teile,
  wochentag,
  wochentagAmOderNach,
} from "@/lib/zeit";
import { kalenderwoche } from "@/lib/kw";
import { bundesweiterFeiertagAm } from "../feiertage-laender";

const kwVon = (t: Tag) => kalenderwoche(t).kw;

// ---------------------------------------------------------------------------
// Hilfen
// ---------------------------------------------------------------------------

/** Der Samstag des laufenden oder nächsten Wochenendes. */
function wochenendeSamstag(heute: Tag): Tag {
  const wt = wochentag(heute);
  if (wt === 0) return plusTage(heute, -1); // Sonntag gehört zum laufenden Wochenende
  return wochentagAmOderNach(heute, 6);
}

function letzterTagDesMonats(t: Tag): Tag {
  return { y: t.y, m: t.m, d: tageImMonat(t.y, t.m) };
}

function istWerktag(t: Tag): boolean {
  return wochentag(t) !== 0 && bundesweiterFeiertagAm(t) === null;
}

function vorherigerWerktag(t: Tag): Tag {
  let x = plusTage(t, -1);
  while (!istWerktag(x)) x = plusTage(x, -1);
  return x;
}

/**
 * Zahltag nach § 24 Abs. 1 TVöD: der letzte Tag des Monats. Fällt er auf einen Samstag,
 * einen Wochenfeiertag oder den 31. Dezember, gilt der vorhergehende Werktag,
 * fällt er auf einen Sonntag, der zweite vorhergehende Werktag.
 */
export function zahltag(jahr: number, monat: number): Tag {
  const letzter = { y: jahr, m: monat, d: tageImMonat(jahr, monat) };
  const wt = wochentag(letzter);
  if (wt === 0) return vorherigerWerktag(vorherigerWerktag(letzter));
  if (wt === 6 || bundesweiterFeiertagAm(letzter) !== null || (monat === 12 && letzter.d === 31)) {
    return vorherigerWerktag(letzter);
  }
  return letzter;
}

function naechsterZahltag(heute: Tag): Tag {
  const dieser = zahltag(heute.y, heute.m);
  if (tagNr(dieser) >= tagNr(heute)) return dieser;
  const folge = heute.m === 12 ? { y: heute.y + 1, m: 1 } : { y: heute.y, m: heute.m + 1 };
  return zahltag(folge.y, folge.m);
}

/** Nächster Freitag, der 13., ab dem angegebenen Tag (einschließlich). */
export function naechsterFreitagDer13(ab: Tag): Tag {
  let y = ab.y;
  let m = ab.m;
  for (let i = 0; i < 36; i++) {
    const t = { y, m, d: 13 };
    if (tagNr(t) >= tagNr(ab) && wochentag(t) === 5) return t;
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  return ab;
}

/** Feierabend: Montag bis Freitag um 17 Uhr. */
const FEIERABEND_STUNDE = 17;

function feierabend(now: Date): Date {
  let t = tagVon(now);
  while (wochentag(t) === 0 || wochentag(t) === 6) t = plusTage(t, 1);
  return berlin(t.y, t.m, t.d, FEIERABEND_STUNDE);
}

// ---------------------------------------------------------------------------
// Countdowns
// ---------------------------------------------------------------------------

export const ALLTAG: Countdown[] = [
  {
    slug: "wochenende",
    pfad: "/wochenende",
    title: "Wochenende",
    nominativ: "Das Wochenende",
    question: "Wie lange noch bis zum Wochenende?",
    category: "alltag",
    art: "zeitraum",
    getNextDate: (now) => mitternacht(wochenendeSamstag(tagVon(now))),
    getEndDate: (now) => mitternacht(plusTage(wochenendeSamstag(tagVon(now)), 1)),
    bis: "bis zum Wochenende",
    heute: "Es ist Wochenende.",
    laeuft: "Es ist Wochenende.",
    motif: "horizont",
    seoTitel: (s) =>
      s.phase === "vor"
        ? `Wie lange noch bis zum Wochenende? Noch ${s.tage} ${s.tage === 1 ? "Tag" : "Tage"}`
        : "Wie lange noch bis zum Wochenende? Es ist Wochenende",
    zusatzSatz: (s) => `Es beginnt am ${datumMitWochentag(s.start)}, um 0 Uhr und endet am Sonntag um Mitternacht.`,
    tabelle: (now) => {
      const sa = wochenendeSamstag(tagVon(now));
      return {
        titel: "Die nächsten Wochenenden",
        spalteEins: "KW",
        zeilen: Array.from({ length: 6 }, (_, i) => {
          const start = plusTage(sa, i * 7);
          const feiertage = [plusTage(start, -1), plusTage(start, 2)]
            .map((t) => bundesweiterFeiertagAm(t))
            .filter((x): x is string => x !== null);
          return {
            jahr: `KW ${kwVon(start)}`,
            start,
            ende: plusTage(start, 1),
            notiz: feiertage.length ? `verlängert durch ${feiertage.join(" und ")}` : undefined,
          };
        }),
      };
    },
    intro: `Das Wochenende beginnt im Kalender am Samstag um 0 Uhr. Darauf zählt diese Seite. Gefühlt fängt es natürlich früher an, nämlich in dem Moment, in dem man am Freitag den Rechner zuklappt. Wer diesen Moment meint, schaut besser beim [Countdown bis Feierabend](/feierabend) oder beim [Countdown bis Freitag](/freitag).

Samstag und Sonntag als feste freie Tage sind jünger, als man denkt. Der Sonntag ist seit Jahrhunderten Ruhetag und steht heute sogar im Grundgesetz. Den freien Samstag haben die Gewerkschaften erst ab den 1950er-Jahren durchgesetzt, Branche für Branche.

Die Tabelle unten zeigt die nächsten Wochenenden und markiert, welche durch einen bundesweiten Feiertag am Freitag oder Montag länger werden. Mehr davon findest du bei den [Feiertagen](/feiertage). Wer nach Wochen plant: [Welche KW haben wir?](/kalenderwoche)`,
    facts: [
      "Der Schutz des Sonntags als „Tag der Arbeitsruhe“ steht im Grundgesetz (Artikel 140, übernommen aus der Weimarer Verfassung).",
      "Die Fünf-Tage-Woche forderte der Deutsche Gewerkschaftsbund ab 1956 mit dem Slogan „Samstags gehört Vati mir“.",
      "Nach ISO 8601 ist der Samstag der sechste und der Sonntag der siebte Tag der Woche. Die Woche beginnt am Montag.",
      "Das Wort Wochenende ist eine Lehnübersetzung des englischen „weekend“.",
    ],
    faq: [
      {
        q: "Wann beginnt das Wochenende?",
        a: "Im Kalender am Samstag um 0 Uhr, es endet am Sonntag um 24 Uhr. Im Sprachgebrauch beginnt es für die meisten am Freitag nach Feierabend.",
      },
      {
        q: "Ist der Samstag ein Werktag?",
        a: "Ja. Rechtlich sind alle Tage Werktage, die keine Sonn- oder gesetzlichen Feiertage sind, also auch der Samstag. Das ist zum Beispiel bei Fristen und beim Urlaubsanspruch wichtig. Arbeitstage sind dagegen die Tage, an denen im Betrieb tatsächlich gearbeitet wird.",
      },
      {
        q: "Seit wann ist der Samstag frei?",
        a: "Die Fünf-Tage-Woche setzte sich in der Bundesrepublik ab Ende der 1950er-Jahre durch, zuerst in einzelnen Branchen per Tarifvertrag. Ein Gesetz, das den Samstag allgemein freistellt, gibt es bis heute nicht.",
      },
      {
        q: "Wie viele Wochenenden hat ein Jahr?",
        a: "52, in manchen Jahren 53. Ein Jahr hat 52 Wochen und einen Tag, im Schaltjahr zwei Tage. Fällt dieser Rest auf einen Samstag oder Sonntag, gibt es einen 53. Samstag oder Sonntag.",
      },
    ],
    related: ["/freitag", "/feierabend", "/monatsende", "/payday", "/jahresende", "/kalenderwoche"],
  },
  {
    slug: "freitag",
    pfad: "/freitag",
    title: "Freitag",
    nominativ: "Der nächste Freitag",
    question: "Wie lange noch bis Freitag?",
    category: "alltag",
    art: "tag",
    getNextDate: (now) => mitternacht(wochentagAmOderNach(tagVon(now), 5)),
    bis: "bis Freitag",
    heute: "Heute ist Freitag.",
    motif: "blatt-1",
    seoTitel: (s) =>
      s.phase === "vor"
        ? `Wie lange noch bis Freitag? Noch ${s.tage} ${s.tage === 1 ? "Tag" : "Tage"}`
        : "Wie lange noch bis Freitag? Heute ist Freitag",
    zusatzSatz: (s) => `Der nächste Freitag ist der ${datumLang(s.start)}.`,
    zeilen: (now) => {
      const f13 = naechsterFreitagDer13(tagVon(now));
      return [{ label: "Nächster Freitag, der 13.", wert: datumLang(f13) }];
    },
    tabelle: (now) => {
      const fr = wochentagAmOderNach(tagVon(now), 5);
      return {
        titel: "Die nächsten Freitage",
        spalteEins: "KW",
        zeilen: Array.from({ length: 6 }, (_, i) => {
          const start = plusTage(fr, i * 7);
          const feiertag = bundesweiterFeiertagAm(start);
          return {
            jahr: `KW ${kwVon(start)}`,
            start,
            notiz: feiertag ?? (start.d === 13 ? "Freitag, der 13." : undefined),
          };
        }),
      };
    },
    intro: `Freitag ist der fünfte Tag der Woche und der letzte Arbeitstag für alle, die von Montag bis Freitag arbeiten. Diese Seite zählt die Tage bis zum nächsten Freitag. Am Freitag selbst steht hier nur noch, dass Freitag ist. Mehr gibt es dann auch nicht zu sagen.

Der Name geht auf die germanische Göttin Frija zurück, das Gegenstück zur römischen Venus. Deshalb heißt der Tag auf Französisch vendredi und auf Italienisch venerdì. Im Christentum ist der Freitag der Tag der Kreuzigung, daher kommen der [Karfreitag](/karfreitag) und die alte Sitte, freitags Fisch zu essen.

Wem der Freitag als Ziel zu ungenau ist: Der [Countdown bis Feierabend](/feierabend) zählt bis 17 Uhr, der [Countdown bis zum Wochenende](/wochenende) bis Samstag um Mitternacht.`,
    facts: [
      "Der Freitag ist nach der germanischen Göttin Frija benannt, in Anlehnung an den römischen „Tag der Venus“.",
      "Jedes Jahr hat mindestens einen und höchstens drei Freitage, die auf einen 13. fallen.",
      "Nach ISO 8601 ist der Freitag der fünfte Tag der Woche.",
      "Im Islam ist der Freitag der Tag des gemeinsamen Mittagsgebets, im Judentum beginnt am Freitagabend der Sabbat.",
    ],
    faq: [
      {
        q: "Woher hat der Freitag seinen Namen?",
        a: "Von der germanischen Göttin Frija (nordisch Frigg). Die Germanen übertrugen damit den römischen Wochentagsnamen „dies Veneris“, Tag der Venus, auf ihre eigene Göttin.",
      },
      {
        q: "Wie oft gibt es Freitag, den 13.?",
        a: "Mindestens einmal und höchstens dreimal im Jahr. Ein Monat hat genau dann einen Freitag, den 13., wenn er an einem Sonntag beginnt.",
      },
      {
        q: "Warum gilt Freitag, der 13., als Unglückstag?",
        a: "Der Aberglaube verbindet zwei ältere Vorstellungen: die 13 als Unglückszahl und den Freitag als Tag der Kreuzigung. Als feste Kombination ist er erst seit dem 20. Jahrhundert verbreitet. Unfallstatistiken zeigen an diesen Tagen keine Auffälligkeiten.",
      },
      {
        q: "Warum isst man freitags Fisch?",
        a: "In der katholischen Kirche ist der Freitag ein Tag der Enthaltsamkeit, an dem auf Fleisch verzichtet wird, zur Erinnerung an den Tod Jesu. Fisch galt nicht als Fleisch und wurde so zum Freitagsessen.",
      },
    ],
    faqDynamisch: (now) => {
      const f13 = naechsterFreitagDer13(tagVon(now));
      const danach = naechsterFreitagDer13(plusTage(f13, 1));
      return [
        {
          q: "Wann ist der nächste Freitag, der 13.?",
          a: `Am ${datumLang(f13)}. Der übernächste ist am ${datumLang(danach)}.`,
        },
      ];
    },
    related: ["/wochenende", "/feierabend", "/karfreitag", "/monatsende", "/payday", "/kalenderwoche"],
  },
  {
    slug: "feierabend",
    pfad: "/feierabend",
    title: "Feierabend",
    nominativ: "Der Feierabend",
    question: "Wie lange noch bis Feierabend?",
    category: "alltag",
    art: "tag",
    uhrzeit: { h: FEIERABEND_STUNDE, mi: 0 },
    getNextDate: (now) => feierabend(now),
    bis: "bis Feierabend",
    heute: "Feierabend.",
    motif: "uhr",
    seoTitel: () => "Wie lange noch bis Feierabend? Countdown bis 17 Uhr",
    zusatzSatz: (s) => {
      const t = teile(s.startZeit);
      return `Gezählt wird bis ${wochentagName(s.start)}, ${t.h} Uhr. Am Wochenende zählt die Seite bis Montag.`;
    },
    intro: `Diese Seite zählt bis 17 Uhr, montags bis freitags. Das ist die Uhrzeit, zu der in Deutschland klassisch Schluss ist, auch wenn die eigene Realität davon abweichen mag. Solange es noch Stunden sind, steht oben die Stundenzahl. In der letzten Stunde zählt die Seite Minuten, in der letzten Minute Sekunden. Danach steht da nur noch: Feierabend.

Wer um 16 Uhr geht oder bis 18:30 Uhr bleiben muss, legt sich in einer Minute einen [eigenen Countdown mit eigener Uhrzeit](/eigener-countdown) an. Der Link lässt sich als Lesezeichen speichern und funktioniert dann jeden Tag.

Das Wort Feierabend meinte ursprünglich den Vorabend eines Feiertags. Heute meint es den Moment, ab dem einem niemand mehr eine Mail schicken sollte. Das Gesetz sieht das ähnlich und schreibt danach mindestens elf Stunden Ruhe vor. Bis zum [Wochenende](/wochenende) dauert es je nach Wochentag trotzdem noch etwas.`,
    facts: [
      "Das Arbeitszeitgesetz erlaubt werktäglich acht Stunden Arbeit. Verlängern auf zehn Stunden ist möglich, wenn der Schnitt über sechs Monate bei acht bleibt.",
      "Nach Feierabend stehen Beschäftigten mindestens elf Stunden ununterbrochene Ruhezeit zu (§ 5 Arbeitszeitgesetz).",
      "Feierabend bezeichnete ursprünglich den Vorabend eines Festtags. Die heutige Bedeutung „Ende der Arbeit“ kam später dazu.",
    ],
    faq: [
      {
        q: "Bis wann zählt dieser Countdown?",
        a: "Bis 17:00 Uhr deutscher Zeit, von Montag bis Freitag. Nach 17 Uhr zeigt die Seite „Feierabend“, am Wochenende zählt sie bis zum Feierabend am Montag.",
      },
      {
        q: "Kann ich eine andere Uhrzeit einstellen?",
        a: "Ja, mit einem eigenen Countdown. Dort gibst du Namen, Datum und Uhrzeit ein und bekommst einen Link, den du speichern oder teilen kannst.",
      },
      {
        q: "Wie lange darf man am Tag arbeiten?",
        a: "In der Regel acht Stunden an Werktagen. Bis zu zehn Stunden sind erlaubt, wenn innerhalb von sechs Kalendermonaten oder 24 Wochen im Durchschnitt acht Stunden nicht überschritten werden. Tarifverträge können davon abweichen.",
      },
      {
        q: "Woher kommt das Wort Feierabend?",
        a: "Aus dem Mittelhochdeutschen: Der „vîrabent“ war der Vorabend eines Feiertags. Weil an diesem Abend die Arbeit ruhte, wurde daraus das allgemeine Wort für das Ende des Arbeitstags.",
      },
    ],
    related: ["/wochenende", "/freitag", "/monatsende", "/payday", "/jahresende", "/kalenderwoche"],
  },
  {
    slug: "monatsende",
    pfad: "/monatsende",
    title: "Monatsende",
    nominativ: "Das Monatsende",
    question: "Wie viele Tage noch bis Monatsende?",
    category: "alltag",
    art: "tag",
    getNextDate: (now) => mitternacht(letzterTagDesMonats(tagVon(now))),
    bis: "bis zum Monatsende",
    heute: "Heute ist der letzte Tag des Monats.",
    motif: "blatt-30",
    seoTitel: (s) =>
      s.phase === "vor"
        ? `Wie viele Tage noch bis Monatsende? Noch ${s.tage} ${s.tage === 1 ? "Tag" : "Tage"}`
        : "Monatsende: Heute ist der letzte Tag des Monats",
    zusatzSatz: (s) =>
      `Der ${monatName(s.start.m)} ${s.start.y} hat ${s.start.d} Tage und endet an einem ${wochentagName(s.start)}.`,
    zeilen: (now) => {
      const heute = tagVon(now);
      return [
        { label: "Tag im Monat", wert: `${heute.d} von ${tageImMonat(heute.y, heute.m)}` },
        { label: "Nächster Monat beginnt", wert: wochentagName(plusTage(letzterTagDesMonats(heute), 1)) },
      ];
    },
    tabelle: (now) => {
      const heute = tagVon(now);
      return {
        titel: "Die nächsten Monatsenden",
        spalteEins: "Monat",
        zeilen: Array.from({ length: 6 }, (_, i) => {
          const m0 = heute.m - 1 + i;
          const y = heute.y + Math.floor(m0 / 12);
          const m = (m0 % 12) + 1;
          const start = { y, m, d: tageImMonat(y, m) };
          return { jahr: monatName(m), start, notiz: `${start.d} Tage` };
        }),
      };
    },
    intro: `Das Monatsende ist der letzte Kalendertag des Monats: der 28., 29., 30. oder 31. Für viele ist es der Tag, an dem das Gehalt kommt, die Miete fast fällig ist und das Datenvolumen längst aufgebraucht wurde. Diese Seite zählt die Tage bis dahin.

Sieben Monate haben 31 Tage, vier haben 30, und der Februar macht, was er will. Wer sich das nie merken kann, zählt an den Fingerknöcheln ab: Jeder Knöchel ist ein Monat mit 31 Tagen, jede Vertiefung dazwischen ein kürzerer. Juli und August liegen beide auf einem Knöchel, weil man beim Wechsel der Hand wieder auf einem Knöchel anfängt.

Wann das Geld tatsächlich auf dem Konto ist, hängt vom Wochentag ab. Fällt der Monatsletzte auf ein Wochenende, wird früher überwiesen. Die Regel dazu steht beim [Countdown bis zum Zahltag](/payday). Das größere Bild liefert der [Countdown bis zum Jahresende](/jahresende).`,
    facts: [
      "Januar, März, Mai, Juli, August, Oktober und Dezember haben 31 Tage, April, Juni, September und November 30.",
      "Der Februar hat 28 Tage, in Schaltjahren 29. Schaltjahre sind durch 4 teilbar, volle Jahrhunderte nur, wenn sie durch 400 teilbar sind.",
      "Dass Juli und August beide 31 Tage haben, geht auf den römischen Kalender zurück. Die Monate sind nach Julius Caesar und Augustus benannt.",
    ],
    faq: [
      {
        q: "Wie viele Tage hat dieser Monat?",
        a: "Das steht oben in der Fahrplanspalte unter „Tag im Monat“. Allgemein gilt: 31 Tage haben Januar, März, Mai, Juli, August, Oktober und Dezember, 30 Tage April, Juni, September und November, der Februar 28 oder 29.",
      },
      {
        q: "Wie funktioniert die Knöchelregel?",
        a: "Mach eine Faust und zähle die Monate über die Knöchel und die Vertiefungen dazwischen ab, beginnend mit dem Knöchel des Zeigefingers als Januar. Knöchel sind Monate mit 31 Tagen, Vertiefungen die kürzeren. Nach dem Juli auf dem letzten Knöchel geht es mit dem August wieder auf einem Knöchel weiter.",
      },
      {
        q: "Wann ist das Gehalt am Monatsende auf dem Konto?",
        a: "Das regelt der Arbeits- oder Tarifvertrag. Im öffentlichen Dienst ist Zahltag der letzte Tag des Monats. Fällt er auf ein Wochenende oder einen Feiertag, wird früher gezahlt.",
      },
    ],
    faqDynamisch: (now) => {
      const heute = tagVon(now);
      const ende = letzterTagDesMonats(heute);
      return [
        {
          q: `Auf welchen Wochentag fällt das Monatsende im ${monatName(heute.m)} ${heute.y}?`,
          a: `Der ${datumLang(ende)} ist ein ${wochentagName(ende)}. Der ${monatName(plusTage(ende, 1).m)} beginnt damit an einem ${wochentagName(plusTage(ende, 1))}.`,
        },
      ];
    },
    related: ["/payday", "/jahresende", "/wochenende", "/freitag", "/feierabend", "/kalenderwoche"],
  },
  {
    slug: "jahresende",
    pfad: "/jahresende",
    title: "Jahresende",
    nominativ: "Das Jahresende",
    question: "Wie viele Tage hat das Jahr noch?",
    category: "alltag",
    art: "tag",
    getNextDate: (now) => {
      const heute = tagVon(now);
      return mitternacht({ y: heute.y, m: 12, d: 31 });
    },
    datumImJahr: (jahr) => ({ y: jahr, m: 12, d: 31 }),
    bis: "bis zum Jahresende",
    heute: "Heute ist der letzte Tag des Jahres.",
    motif: "blatt-31",
    seoTitel: (s) =>
      s.phase === "vor"
        ? `Wie viele Tage hat das Jahr ${s.start.y} noch? Noch ${s.tage} ${s.tage === 1 ? "Tag" : "Tage"}`
        : `Jahresende ${s.start.y}: Heute ist der letzte Tag des Jahres`,
    zusatzSatz: (s) => {
      const nr = tagImJahr(s.heute);
      const gesamt = tageImJahr(s.heute.y);
      return `Heute ist Tag ${nr} von ${gesamt}. Damit sind ${Math.round((nr / gesamt) * 100)} Prozent von ${s.heute.y} vorbei.`;
    },
    zeilen: (now) => {
      const heute = tagVon(now);
      const nr = tagImJahr(heute);
      const gesamt = tageImJahr(heute.y);
      return [
        { label: "Tag im Jahr", wert: `${nr} von ${gesamt}` },
        { label: "Vom Jahr vorbei", wert: `${Math.round((nr / gesamt) * 100)} %` },
      ];
    },
    intro: `Das Jahr endet am 31. Dezember um Mitternacht. Diese Seite zeigt, wie viele Tage bis zum letzten Tag des Jahres bleiben, und rechnet in der Fahrplanspalte vor, der wievielte Tag heute ist und wie viel Prozent des Jahres schon weg sind. Die Zahl ist je nach Monat beruhigend oder alarmierend.

Praktisch ist das Jahresende vor allem eine Frist. Resturlaub muss in der Regel bis zum 31. Dezember genommen sein. Viele Verträge lassen sich nur zum Jahresende kündigen, Steuerbelege gehören ins richtige Jahr, und gute Vorsätze brauchen ein Startdatum.

Wer den letzten Tag selbst feiern will, ist beim [Countdown bis Silvester](/silvester) richtig. Der Moment um Mitternacht gehört zum [Countdown bis Neujahr](/neujahr). Und wer in Wochen statt in Tagen denkt, findet die verbleibenden unter [Welche KW haben wir?](/kalenderwoche)`,
    facts: [
      "Ein Jahr hat 365 Tage, ein Schaltjahr 366. Der zusätzliche Tag ist der 29. Februar.",
      "Der gesetzliche Urlaub muss grundsätzlich im laufenden Kalenderjahr genommen werden (§ 7 Bundesurlaubsgesetz). Eine Übertragung bis Ende März ist nur in bestimmten Fällen vorgesehen.",
      "Die regelmäßige Verjährungsfrist von drei Jahren endet immer mit dem Schluss eines Jahres, also am 31. Dezember um Mitternacht.",
      "Der 31. Dezember gehört nicht immer zur letzten Kalenderwoche des Jahres. Er kann schon in KW 1 des Folgejahres liegen.",
    ],
    faq: [
      {
        q: "Wie viele Tage hat ein Jahr?",
        a: "365 Tage, in Schaltjahren 366. Schaltjahre sind alle durch 4 teilbaren Jahre, ausgenommen volle Jahrhunderte, die nicht durch 400 teilbar sind. Das nächste Schaltjahr ist 2028.",
      },
      {
        q: "Verfällt mein Urlaub am Jahresende?",
        a: "Der gesetzliche Urlaub ist an das Kalenderjahr gebunden. Er verfällt aber nur, wenn der Arbeitgeber vorher klar darauf hingewiesen und zum Urlaubnehmen aufgefordert hat. Arbeits- und Tarifverträge enthalten oft großzügigere Regeln.",
      },
      {
        q: "Zählt dieser Countdown bis Silvester oder bis Neujahr?",
        a: "Bis zum 31. Dezember, dem letzten Tag des Jahres. Am 31. Dezember steht hier „Heute ist der letzte Tag des Jahres“. Bis Mitternacht zählt der Countdown bis Neujahr.",
      },
    ],
    faqDynamisch: (now) => {
      const heute = tagVon(now);
      const ende = { y: heute.y, m: 12, d: 31 };
      const rest = tageDiff(heute, ende);
      return [
        {
          q: `Wie viele Wochen hat ${heute.y} noch?`,
          a: `Bis zum ${datumLang(ende)} sind es noch ${tausender(rest)} Tage, das sind ${Math.floor(rest / 7)} volle Wochen und ${rest % 7} ${rest % 7 === 1 ? "Tag" : "Tage"}. Der 31. Dezember ${heute.y} ist ein ${wochentagName(ende)}.`,
        },
      ];
    },
    related: ["/silvester", "/neujahr", "/monatsende", "/weihnachten", "/payday", "/kalenderwoche"],
  },
  {
    slug: "payday",
    pfad: "/payday",
    title: "Zahltag",
    nominativ: "Der nächste Zahltag",
    tafel: "Zahltag (Payday)",
    question: "Wann ist Zahltag?",
    category: "alltag",
    art: "tag",
    getNextDate: (now) => mitternacht(naechsterZahltag(tagVon(now))),
    bis: "bis zum Zahltag",
    heute: "Heute ist Zahltag.",
    motif: "muenze",
    seoTitel: (s) =>
      s.phase === "vor"
        ? `Wann ist Zahltag? Payday am ${datumLang(s.start)}, noch ${s.tage} ${s.tage === 1 ? "Tag" : "Tage"}`
        : "Wann ist Zahltag? Heute ist Payday",
    zusatzSatz: (s) => {
      const letzter = letzterTagDesMonats(s.start);
      return tagNr(letzter) === tagNr(s.start)
        ? `Der nächste Zahltag ist ${datumMitWochentag(s.start)}, der letzte Tag des Monats.`
        : `Der nächste Zahltag ist ${datumMitWochentag(s.start)}. ${
            wochentag(letzter) === 0 || wochentag(letzter) === 6
              ? `Der Monatsletzte (${datumLang(letzter)}) fällt auf einen ${wochentagName(letzter)}`
              : letzter.m === 12
                ? "Der 31. Dezember gilt im öffentlichen Dienst nie als Zahltag"
                : `Der Monatsletzte (${datumLang(letzter)}) ist ein Feiertag`
          }, deshalb wird früher gezahlt.`;
    },
    tabelle: (now) => {
      const heute = tagVon(now);
      const erster = naechsterZahltag(heute);
      return {
        titel: "Die nächsten Zahltage",
        spalteEins: "Monat",
        zeilen: Array.from({ length: 8 }, (_, i) => {
          const m0 = erster.m - 1 + i;
          const y = erster.y + Math.floor(m0 / 12);
          const m = (m0 % 12) + 1;
          const start = zahltag(y, m);
          const letzter = { y, m, d: tageImMonat(y, m) };
          return {
            jahr: monatName(m),
            start,
            notiz: tagNr(start) === tagNr(letzter) ? undefined : `vorgezogen vom ${letzter.d}.`,
          };
        }),
      };
    },
    intro: `Einen gesetzlichen Zahltag für alle gibt es in Deutschland nicht. Das Gesetz sagt nur: Der Lohn ist nach geleisteter Arbeit fällig, bei monatlicher Zahlung also am Monatsende. Wann genau überwiesen wird, steht im Arbeits- oder Tarifvertrag. Manche bekommen ihr Geld am 15., manche am 25., Beamte schon im Voraus zum Monatsersten.

Diese Seite rechnet nach der verbreitetsten festen Regel, der des öffentlichen Dienstes. Dort ist Zahltag der letzte Tag des Monats. Fällt er auf einen Samstag, einen Feiertag oder auf Silvester, gilt der Werktag davor. Fällt er auf einen Sonntag, ist es der zweite Werktag davor, also der Freitag. Die Tabelle unten zeigt, in welchen Monaten das Geld dadurch früher kommt.

Wer nach einem anderen Stichtag bezahlt wird, legt sich einen [eigenen Countdown](/eigener-countdown) an. Wie viele Tage der Monat überhaupt noch hat, zeigt der [Countdown bis zum Monatsende](/monatsende).`,
    facts: [
      "Im öffentlichen Dienst ist Zahltag der letzte Tag des Monats (§ 24 Absatz 1 TVöD).",
      "Fällt dieser Tag auf einen Samstag, einen Wochenfeiertag oder den 31. Dezember, gilt der vorhergehende Werktag, bei einem Sonntag der zweite vorhergehende Werktag.",
      "Nach § 614 BGB ist die Vergütung nach der Leistung der Dienste zu zahlen, bei Bemessung nach Monaten also nach Ablauf des Monats.",
      "Beamte erhalten ihre Bezüge im Voraus, zum Monatsbeginn.",
    ],
    faq: [
      {
        q: "Wann muss der Arbeitgeber das Gehalt zahlen?",
        a: "Ohne besondere Vereinbarung am Ende des Monats, für den gearbeitet wurde (§ 614 BGB). Die meisten Arbeits- und Tarifverträge legen einen festen Termin fest, etwa den letzten Bankarbeitstag oder den 15. des Monats.",
      },
      {
        q: "Was gilt, wenn der Zahltag auf ein Wochenende fällt?",
        a: "Im öffentlichen Dienst wird dann früher gezahlt: bei einem Samstag am Freitag davor, bei einem Sonntag ebenfalls am Freitag. In der Privatwirtschaft entscheidet der Vertrag. Viele Arbeitgeber überweisen so, dass das Geld am letzten Bankarbeitstag auf dem Konto ist.",
      },
      {
        q: "Was bedeutet Payday?",
        a: "Payday ist das englische Wort für Zahltag: der Tag, an dem Lohn oder Gehalt ausgezahlt wird. In den USA ist eine Zahlung alle zwei Wochen üblich, in Deutschland die monatliche.",
      },
      {
        q: "Wann kommt das Gehalt im Dezember?",
        a: "Nach der Regel des öffentlichen Dienstes gilt der 31. Dezember nie als Zahltag. Gezahlt wird am Werktag davor, meist also am 30. Dezember.",
      },
    ],
    related: ["/monatsende", "/wochenende", "/freitag", "/feierabend", "/jahresende", "/kalenderwoche"],
  },
];
