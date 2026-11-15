import type { Countdown } from "@/lib/countdown";
import { sommerzeitBeginn, sommerzeitEnde } from "@/lib/feiertage";
import { datumLang, datumMitWochentag, uhrzeit, wochentagName } from "@/lib/format";
import { type Tag, tagNr, tagVon, teile } from "@/lib/zeit";
import roh from "../jahreszeiten.json";

/**
 * Astronomische Jahreszeiten. Die Zeitpunkte (UTC) stammen vom U.S. Naval Observatory,
 * siehe scripts/fetch-jahreszeiten.mjs. Umgerechnet wird nach Europe/Berlin.
 */
type Schluessel = "fruehling" | "sommer" | "herbst" | "winter";

const JAHRE = roh.jahre as Record<string, Record<Schluessel, string>>;
const QUELLE = { label: roh.quelle.label, url: roh.quelle.url };

function zeitpunkte(k: Schluessel): Date[] {
  return Object.keys(JAHRE)
    .sort()
    .map((jahr) => new Date((JAHRE[jahr] as Record<Schluessel, string>)[k]));
}

function naechster(k: Schluessel, now: Date): Date {
  const heute = tagNr(tagVon(now));
  const alle = zeitpunkte(k);
  return alle.find((z) => tagNr(tagVon(z)) >= heute) ?? (alle[alle.length - 1] as Date);
}

function imJahr(k: Schluessel, jahr: number): Tag | null {
  const iso = JAHRE[String(jahr)]?.[k];
  return iso ? tagVon(new Date(iso)) : null;
}

/** Alle Kalendertage (Tag.Monat), auf die der Beginn im Datenzeitraum fällt, z. B. „20. März“. */
function tageImZeitraum(k: Schluessel): string {
  const tage = [...new Set(zeitpunkte(k).map((z) => tagVon(z).d))].sort((a, b) => a - b);
  const monat = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"][
    tagVon(zeitpunkte(k)[0] as Date).m
  ];
  if (tage.length === 1) return `immer auf den ${tage[0]}. ${monat}`;
  return `auf den ${tage.slice(0, -1).join("., ")}. oder ${tage[tage.length - 1]}. ${monat}`;
}

const ERSTES = Number(Object.keys(JAHRE).sort()[0]);
const LETZTES = Number(Object.keys(JAHRE).sort().pop());

type Vorlage = {
  slug: string;
  k: Schluessel;
  title: string;
  nominativ: string;
  motif: Countdown["motif"];
  meteorologisch: string;
  ereignis: string;
  intro: string;
  facts: string[];
  faq: Countdown["faq"];
  related: string[];
};

const VORLAGEN: Vorlage[] = [
  {
    slug: "fruehlingsanfang",
    k: "fruehling",
    title: "Frühlingsanfang",
    nominativ: "Der astronomische Frühling",
    motif: "blume",
    meteorologisch: "1. März",
    ereignis: "Tagundnachtgleiche",
    intro: `Der Frühling beginnt zweimal. Für Meteorologen fängt er am 1. März an, weil sich mit ganzen Monaten leichter rechnen lässt. Astronomisch beginnt er mit der Tagundnachtgleiche im März: Das ist der Moment, in dem die Sonne genau über dem Äquator steht und von der Süd- auf die Nordhalbkugel wechselt. Auf diesen Moment zählt diese Seite, auf die Minute genau.

Rund um die Tagundnachtgleiche sind Tag und Nacht überall auf der Erde etwa gleich lang. Danach werden die Tage in Deutschland bis zum [Sommeranfang](/sommeranfang) im Juni länger. Eine Woche später kommt meist auch die [Zeitumstellung](/zeitumstellung) auf Sommerzeit, dann ist es abends schlagartig eine Stunde länger hell.

Mit dem Wetter hat das Datum nichts zu tun. Schnee im April ist kein Fehler im Kalender. Was der Frühlingsanfang aber festlegt, ist [Ostern](/ostern): Es fällt auf den ersten Sonntag nach dem ersten Vollmond im Frühling.`,
    facts: [
      "Der astronomische Frühling beginnt mit der Tagundnachtgleiche im März, wenn die Sonne den Himmelsäquator von Süden nach Norden überquert.",
      "Der meteorologische Frühling umfasst die Monate März, April und Mai und beginnt immer am 1. März.",
      "Für die Berechnung des Osterdatums gilt der Frühlingsanfang kirchlich fest als 21. März, unabhängig vom astronomischen Zeitpunkt.",
    ],
    faq: [
      {
        q: "Was ist der Unterschied zwischen meteorologischem und astronomischem Frühlingsanfang?",
        a: "Der meteorologische Frühling beginnt immer am 1. März, weil Wetterdienste ihre Statistiken nach ganzen Monaten führen. Der astronomische Frühling beginnt mit der Tagundnachtgleiche um den 20. März. Dieser Zeitpunkt wird berechnet und verschiebt sich von Jahr zu Jahr um einige Stunden.",
      },
      {
        q: "Sind Tag und Nacht am Frühlingsanfang genau gleich lang?",
        a: "Fast. Weil die Erdatmosphäre das Sonnenlicht bricht und die Sonne eine Scheibe und kein Punkt ist, ist der Tag an der Tagundnachtgleiche schon einige Minuten länger als die Nacht. Genau gleich lang sind beide ein paar Tage vorher.",
      },
      {
        q: "Warum ist der Frühlingsanfang nicht jedes Jahr zur selben Uhrzeit?",
        a: "Ein Umlauf der Erde um die Sonne dauert etwa 365 Tage und knapp 6 Stunden. Der Zeitpunkt rückt deshalb jedes Jahr um rund 6 Stunden nach hinten und springt im Schaltjahr um einen Tag zurück.",
      },
    ],
    related: ["/sommeranfang", "/zeitumstellung", "/ostern", "/herbstanfang", "/winteranfang", "/karfreitag", "/muttertag"],
  },
  {
    slug: "sommeranfang",
    k: "sommer",
    title: "Sommeranfang",
    nominativ: "Der astronomische Sommer",
    motif: "sonne",
    meteorologisch: "1. Juni",
    ereignis: "Sommersonnenwende",
    intro: `Der Sommer beginnt astronomisch mit der Sommersonnenwende im Juni. In diesem Moment steht die Sonne mittags so hoch wie an keinem anderen Tag des Jahres, senkrecht über dem nördlichen Wendekreis. Es ist der längste Tag und die kürzeste Nacht. In Deutschland ist es dann je nach Breitengrad etwa 16 bis 17 Stunden hell, im Norden länger als im Süden.

Der Haken an der Sache: Ab dem Sommeranfang werden die Tage wieder kürzer. Erst unmerklich, ab August dann spürbar, bis zum [Herbstanfang](/herbstanfang) im September. Die heißesten Wochen kommen trotzdem erst danach, weil Land und Meer Zeit brauchen, um sich aufzuheizen.

Meteorologen lassen den Sommer schon am 1. Juni beginnen. Für die meisten Familien beginnt er ohnehin an einem ganz anderen Tag, nämlich mit den [Sommerferien im eigenen Bundesland](/ferien/sommerferien).`,
    facts: [
      "Zur Sommersonnenwende steht die Sonne senkrecht über dem nördlichen Wendekreis, dem Wendekreis des Krebses.",
      "Der Tag des Sommeranfangs ist der längste des Jahres. In Deutschland dauert er je nach Breitengrad etwa 16 bis 17 Stunden.",
      "Der meteorologische Sommer umfasst die Monate Juni, Juli und August und beginnt immer am 1. Juni.",
      "Nördlich des Polarkreises geht die Sonne um diese Zeit gar nicht unter: Mitternachtssonne.",
    ],
    faq: [
      {
        q: "Wann ist der längste Tag des Jahres?",
        a: "Am Tag der Sommersonnenwende, also am Tag des astronomischen Sommeranfangs. Er fällt auf den 20. oder 21. Juni.",
      },
      {
        q: "Warum ist es nach dem Sommeranfang am heißesten, obwohl die Tage kürzer werden?",
        a: "Erde, Luft und vor allem die Meere erwärmen sich mit Verzögerung. Die höchsten Temperaturen werden deshalb meist erst im Juli und August erreicht, Wochen nach dem höchsten Sonnenstand.",
      },
      {
        q: "Was ist die Mittsommernacht?",
        a: "Die Nacht um die Sommersonnenwende. In Skandinavien wird Mittsommer groß gefeiert, in Schweden am Wochenende um den 24. Juni. In Deutschland gibt es mancherorts Sonnwendfeuer, verbreitet sind auch die Johannisfeuer am 24. Juni.",
      },
    ],
    related: ["/herbstanfang", "/fruehlingsanfang", "/winteranfang", "/zeitumstellung", "/ferien/sommerferien", "/pfingsten", "/fronleichnam"],
  },
  {
    slug: "herbstanfang",
    k: "herbst",
    title: "Herbstanfang",
    nominativ: "Der astronomische Herbst",
    motif: "laub",
    meteorologisch: "1. September",
    ereignis: "Tagundnachtgleiche",
    intro: `Der Herbst beginnt astronomisch mit der Tagundnachtgleiche im September. Die Sonne steht dann wieder genau über dem Äquator, diesmal auf dem Weg nach Süden. Tag und Nacht sind etwa gleich lang, und von nun an gewinnt die Nacht: bis zum [Winteranfang](/winteranfang) im Dezember jeden Tag ein paar Minuten.

Meteorologisch hat der Herbst da schon drei Wochen hinter sich, denn für die Wetterstatistik beginnt er am 1. September. Im Supermarkt beginnt er noch früher. Die ersten Lebkuchen liegen meist schon im Regal, wenn draußen noch Freibadwetter ist.

Ende Oktober folgt die [Zeitumstellung](/zeitumstellung) zurück auf Winterzeit, dann wird es nachmittags plötzlich früh dunkel. Wer bis dahin noch freie Tage braucht: Die Termine der [Herbstferien in allen Bundesländern](/ferien/herbstferien) stehen in der Ferienübersicht.`,
    facts: [
      "Der astronomische Herbst beginnt mit der Tagundnachtgleiche im September, wenn die Sonne den Himmelsäquator von Norden nach Süden überquert.",
      "Der meteorologische Herbst umfasst die Monate September, Oktober und November und beginnt immer am 1. September.",
      "Um den Herbstanfang herum nimmt die Tageslänge in Deutschland am schnellsten ab, um rund drei bis vier Minuten pro Tag.",
    ],
    faq: [
      {
        q: "Wann beginnt der Herbst: am 1. September oder später?",
        a: "Beides stimmt. Der meteorologische Herbst beginnt am 1. September. Der astronomische oder kalendarische Herbst beginnt mit der Tagundnachtgleiche, die auf den 22. oder 23. September fällt.",
      },
      {
        q: "Warum färben sich im Herbst die Blätter?",
        a: "Wenn die Tage kürzer werden, bauen Laubbäume das grüne Chlorophyll ab und lagern die Nährstoffe ein. Übrig bleiben gelbe und orange Farbstoffe, die vorher überdeckt waren. Rote Töne bildet das Blatt in dieser Zeit zum Teil neu.",
      },
      {
        q: "Was ist Altweibersommer?",
        a: "Eine Schönwetterphase im Frühherbst, oft Ende September, mit warmen Tagen und kühlen, klaren Nächten. Der Name bezieht sich auf die Spinnfäden, die dann durch die Luft treiben. „Weiben“ ist ein altes Wort für das Knüpfen von Spinnweben.",
      },
    ],
    related: ["/winteranfang", "/zeitumstellung", "/halloween", "/sommeranfang", "/fruehlingsanfang", "/tag-der-deutschen-einheit", "/ferien/herbstferien"],
  },
  {
    slug: "winteranfang",
    k: "winter",
    title: "Winteranfang",
    nominativ: "Der astronomische Winter",
    motif: "flocke",
    meteorologisch: "1. Dezember",
    ereignis: "Wintersonnenwende",
    intro: `Der Winter beginnt astronomisch mit der Wintersonnenwende im Dezember. Die Sonne steht dann senkrecht über dem südlichen Wendekreis und bei uns so tief wie an keinem anderen Tag. Es ist der kürzeste Tag des Jahres: In Deutschland bleibt es je nach Breitengrad nur etwa sieben bis achteinhalb Stunden hell.

Die gute Nachricht steckt im selben Datum. Ab dem Winteranfang werden die Tage wieder länger, erst um Sekunden, bald um Minuten. Bis zum [Frühlingsanfang](/fruehlingsanfang) im März kommt so jeden Tag etwas Licht dazu, auch wenn die kältesten Wochen dann erst noch bevorstehen.

Für Meteorologen hat der Winter schon am 1. Dezember begonnen. Im Kalender liegt der Winteranfang drei oder vier Tage vor [Heiligabend](/heiligabend), was die Frage nach weißer [Weihnacht](/weihnachten) jedes Jahr pünktlich neu aufwirft.`,
    facts: [
      "Zur Wintersonnenwende steht die Sonne senkrecht über dem südlichen Wendekreis, dem Wendekreis des Steinbocks.",
      "Der Tag des Winteranfangs ist der kürzeste des Jahres. In Deutschland ist es dann je nach Breitengrad nur etwa sieben bis achteinhalb Stunden hell.",
      "Der meteorologische Winter umfasst die Monate Dezember, Januar und Februar und beginnt immer am 1. Dezember.",
      "Der früheste Sonnenuntergang liegt in Deutschland schon Mitte Dezember, der späteste Sonnenaufgang erst um den Jahreswechsel. Grund ist die ungleichmäßige Bahn der Erde.",
    ],
    faq: [
      {
        q: "Wann ist der kürzeste Tag des Jahres?",
        a: "Am Tag der Wintersonnenwende, dem astronomischen Winteranfang. Er fällt auf den 21. oder 22. Dezember.",
      },
      {
        q: "Ab wann werden die Tage wieder länger?",
        a: "Direkt nach der Wintersonnenwende. In den ersten Tagen ist der Zuwachs kaum zu merken, Ende Januar sind es in Deutschland schon rund zwei bis drei Minuten pro Tag.",
      },
      {
        q: "Warum ist es im Januar kälter als am kürzesten Tag?",
        a: "Boden, Luft und Meere geben die im Sommer gespeicherte Wärme nur langsam ab. Die tiefsten Temperaturen kommen deshalb mit Verzögerung, meist im Januar und Februar.",
      },
    ],
    related: ["/weihnachten", "/heiligabend", "/silvester", "/fruehlingsanfang", "/4-advent", "/herbstanfang", "/ferien/weihnachtsferien"],
  },
];

function bauen(v: Vorlage): Countdown {
  return {
    slug: v.slug,
    pfad: `/${v.slug}`,
    title: v.title,
    nominativ: v.nominativ,
    question: `Wann ist ${v.title}?`,
    category: "jahreszeiten",
    art: "tag",
    hatUhrzeit: true,
    getNextDate: (now) => naechster(v.k, now),
    datumImJahr: (jahr) => imJahr(v.k, jahr),
    bis: `bis zum ${v.title}`,
    heute: `Heute ist ${v.title}.`,
    motif: v.motif,
    source: QUELLE,
    zeilen: () => [
      { label: "Ereignis", wert: v.ereignis },
      { label: "Meteorologisch", wert: v.meteorologisch },
    ],
    intro: v.intro,
    facts: [
      ...v.facts,
      `Von ${ERSTES} bis ${LETZTES} fällt der astronomische ${v.title} in deutscher Zeit ${tageImZeitraum(v.k)}.`,
    ],
    faq: v.faq,
    faqDynamisch: (now) => {
      const z = naechster(v.k, now);
      const t = teile(z);
      const folge = zeitpunkte(v.k).find((x) => x.getTime() > z.getTime());
      return [
        {
          q: `Wann genau ist ${v.title} ${t.y}?`,
          a: `Der astronomische ${v.title} ${t.y} ist am ${datumMitWochentag(tagVon(z))}, um ${uhrzeit(t.h, t.mi)} deutscher Zeit (${v.ereignis}).${
            folge ? ` Im Jahr darauf ist es der ${datumLang(tagVon(folge))} um ${uhrzeit(teile(folge).h, teile(folge).mi)}.` : ""
          } Der meteorologische ${v.title} ist jedes Jahr am ${v.meteorologisch}.`,
        },
      ];
    },
    related: v.related,
  };
}

/** Nächste Zeitumstellung: Beginn oder Ende der Sommerzeit. Beide liegen um 1:00 Uhr UTC. */
function umstellungen(jahr: number): { tag: Tag; zeit: Date; art: "vor" | "zurueck" }[] {
  const b = sommerzeitBeginn(jahr);
  const e = sommerzeitEnde(jahr);
  return [
    { tag: b, zeit: new Date(Date.UTC(b.y, b.m - 1, b.d, 1)), art: "vor" },
    { tag: e, zeit: new Date(Date.UTC(e.y, e.m - 1, e.d, 1)), art: "zurueck" },
  ];
}

export function naechsteUmstellung(now: Date) {
  const heute = tagVon(now);
  const kandidaten = [...umstellungen(heute.y), ...umstellungen(heute.y + 1)];
  return kandidaten.find((u) => tagNr(u.tag) >= tagNr(heute)) ?? (kandidaten[0] as (typeof kandidaten)[number]);
}

function umstellungSatz(u: { tag: Tag; art: "vor" | "zurueck" }): string {
  return u.art === "vor"
    ? `In der Nacht zum ${datumMitWochentag(u.tag)}, werden die Uhren von 2 auf 3 Uhr vorgestellt. Dann gilt die Sommerzeit, und die Nacht ist eine Stunde kürzer.`
    : `In der Nacht zum ${datumMitWochentag(u.tag)}, werden die Uhren von 3 auf 2 Uhr zurückgestellt. Dann gilt wieder die Normalzeit, und die Nacht ist eine Stunde länger.`;
}

const ZEITUMSTELLUNG: Countdown = {
  slug: "zeitumstellung",
  pfad: "/zeitumstellung",
  title: "Zeitumstellung",
  nominativ: "Die Zeitumstellung",
  question: "Wann ist die nächste Zeitumstellung?",
  category: "jahreszeiten",
  art: "tag",
  hatUhrzeit: true,
  getNextDate: (now) => naechsteUmstellung(now).zeit,
  bis: "bis zur Zeitumstellung",
  heute: "Heute Nacht wurde die Uhr umgestellt.",
  motif: "uhr",
  source: {
    label: "Physikalisch-Technische Bundesanstalt: Darstellung der gesetzlichen Zeit",
    url: "https://www.ptb.de/cms/ptb/fachabteilungen/abt4/fb-44/ag-441/darstellung-der-gesetzlichen-zeit.html",
  },
  zusatzSatz: (s) => umstellungSatz(naechsteUmstellung(s.startZeit)),
  tabelle: (now) => {
    const heute = tagVon(now);
    const liste = [heute.y, heute.y + 1, heute.y + 2, heute.y + 3]
      .flatMap(umstellungen)
      .filter((u) => tagNr(u.tag) >= tagNr(heute))
      .slice(0, 6);
    return {
      titel: "Die nächsten Zeitumstellungen",
      zeilen: liste.map((u) => ({
        jahr: u.tag.y,
        start: u.tag,
        notiz: u.art === "vor" ? "eine Stunde vor" : "eine Stunde zurück",
      })),
    };
  },
  zeilen: (now) => {
    const u = naechsteUmstellung(now);
    return [
      { label: "Richtung", wert: u.art === "vor" ? "eine Stunde vor (2 → 3 Uhr)" : "eine Stunde zurück (3 → 2 Uhr)" },
      { label: "Danach gilt", wert: u.art === "vor" ? "Sommerzeit (MESZ)" : "Normalzeit (MEZ)" },
    ];
  },
  seoTitel: (s) =>
    s.phase === "vor"
      ? `Zeitumstellung ${s.start.y}: am ${datumLang(s.start)}, noch ${s.tage} ${s.tage === 1 ? "Tag" : "Tage"}`
      : `Zeitumstellung: Heute Nacht wurde die Uhr umgestellt`,
  intro: `Zweimal im Jahr wird in Deutschland die Uhr umgestellt, immer in der Nacht von Samstag auf Sonntag. Am letzten Sonntag im März springt sie von 2 auf 3 Uhr, das ist der Beginn der Sommerzeit. Am letzten Sonntag im Oktober geht es von 3 auf 2 Uhr zurück zur Normalzeit, die viele Winterzeit nennen.

Die Merkhilfe dazu kommt aus dem Garten: Im Frühjahr stellt man die Stühle vor die Tür, im Herbst stellt man sie zurück in den Schuppen. Vor heißt eine Stunde weniger Schlaf, zurück heißt eine Stunde mehr.

Seit Jahren wird darüber gestritten, die Umstellung abzuschaffen. Das Europäische Parlament hat sich 2019 dafür ausgesprochen, die Mitgliedstaaten haben sich aber bis heute nicht geeinigt, welche Zeit dann dauerhaft gelten soll. Solange das so ist, bleibt alles beim Alten, und diese Seite zählt weiter. Zum Sonnenstand passen übrigens andere Termine: [Frühlingsanfang](/fruehlingsanfang) und [Herbstanfang](/herbstanfang).`,
  facts: [
    "Die Sommerzeit beginnt am letzten Sonntag im März und endet am letzten Sonntag im Oktober, jeweils um 1:00 Uhr Weltzeit (UTC). So regelt es eine EU-Richtlinie für alle Mitgliedstaaten einheitlich.",
    "In Deutschland gibt es die Sommerzeit durchgehend seit 1980.",
    "Funkuhren stellen sich selbst um. Das Signal dafür sendet der Langwellensender DCF77 in Mainflingen bei Frankfurt im Auftrag der Physikalisch-Technischen Bundesanstalt.",
    "Das Europäische Parlament stimmte 2019 für das Ende der Zeitumstellung. Umgesetzt ist das nicht, weil sich die Mitgliedstaaten nicht geeinigt haben.",
  ],
  faq: [
    {
      q: "Wird die Uhr vor- oder zurückgestellt?",
      a: "Im März eine Stunde vor (von 2 auf 3 Uhr), im Oktober eine Stunde zurück (von 3 auf 2 Uhr). Merkhilfe: Im Frühjahr kommen die Gartenstühle vor die Tür, im Herbst zurück in den Schuppen.",
    },
    {
      q: "Welche Zeit ist die richtige: Sommerzeit oder Winterzeit?",
      a: "Die Normalzeit ist die Mitteleuropäische Zeit (MEZ), umgangssprachlich Winterzeit. Die Sommerzeit (MESZ) ist die um eine Stunde vorgestellte Zeit.",
    },
    {
      q: "Wird die Zeitumstellung abgeschafft?",
      a: "Bisher nicht. Die EU-Kommission hat 2018 die Abschaffung vorgeschlagen, das Europäische Parlament hat 2019 zugestimmt. Die Mitgliedstaaten müssten sich aber einigen, ob dauerhaft Sommer- oder Normalzeit gelten soll, und das ist nicht geschehen.",
    },
    {
      q: "Muss ich mein Handy umstellen?",
      a: "Nein. Smartphones, Computer und Funkuhren stellen sich von selbst um. Von Hand umstellen musst du nur Uhren ohne Funk oder Netzanbindung: Backofen, Armbanduhr, manche Autos.",
    },
  ],
  faqDynamisch: (now) => {
    const u = naechsteUmstellung(now);
    const danach = naechsteUmstellung(new Date(u.zeit.getTime() + 2 * 86_400_000));
    return [
      {
        q: `Wann ist die nächste Zeitumstellung?`,
        a: `${umstellungSatz(u)} Die übernächste Umstellung ist am ${wochentagName(danach.tag)}, ${datumLang(danach.tag)}, dann eine Stunde ${danach.art === "vor" ? "vor" : "zurück"}.`,
      },
    ];
  },
  related: ["/fruehlingsanfang", "/herbstanfang", "/sommeranfang", "/winteranfang", "/ostern", "/halloween", "/kalenderwoche"],
};

export const JAHRESZEITEN: Countdown[] = [...VORLAGEN.map(bauen), ZEITUMSTELLUNG];
