import type { Countdown } from "@/lib/countdown";
import { fest, jaehrlich } from "@/lib/countdown";
import { advent } from "@/lib/feiertage";
import { datumLang, datumMitWochentag, wochentagName } from "@/lib/format";
import { plusTage, tageDiff, tagVon } from "@/lib/zeit";

const BMI = {
  label: "Bundesministerium des Innern: Nationale Feiertage",
  url: "https://www.bmi.bund.de/DE/themen/verfassung/staatliche-symbole/nationale-feiertage/nationale-feiertage-node.html",
};

type AdventText = Pick<Countdown, "intro" | "facts" | "faq">;

const ADVENT_FAQ_FEIERTAG = {
  q: "Sind die Adventssonntage Feiertage?",
  a: "Sie sind Sonntage und damit ohnehin arbeitsfrei, aber keine gesetzlichen Feiertage. Einige Städte erlauben an einzelnen Adventssonntagen verkaufsoffene Nachmittage, das regelt jedes Bundesland selbst.",
};

const ADVENT: Record<1 | 2 | 3 | 4, AdventText> = {
  1: {
    intro: `Der 1. Advent ist der vierte Sonntag vor dem 25. Dezember. Mit ihm beginnt die Adventszeit und in den westlichen Kirchen auch das neue Kirchenjahr. Auf dem Adventskranz brennt die erste von vier Kerzen, die Weihnachtsmärkte haben meist schon ein paar Tage geöffnet.

Das Datum wandert: Der 1. Advent liegt immer zwischen dem 27. November und dem 3. Dezember. Je früher er kommt, desto länger dauert die Adventszeit. Im längsten Fall sind es 28 Tage bis Heiligabend, im kürzesten nur 22.

Der Adventskalender richtet sich übrigens nicht nach dem 1. Advent. Er beginnt immer am 1. Dezember, egal ob die erste Kerze dann schon brennt oder noch nicht. Wie es danach weitergeht, zeigen die Zähler für den [2. Advent](/2-advent), den [Nikolaustag](/nikolaus) und [Heiligabend](/heiligabend).`,
    facts: [
      "Der 1. Advent fällt immer auf einen Sonntag zwischen dem 27. November und dem 3. Dezember.",
      "Mit dem 1. Advent beginnt in der katholischen und der evangelischen Kirche das neue Kirchenjahr.",
      "Den Adventskranz erfand der Hamburger Theologe Johann Hinrich Wichern 1839 für die Kinder im Rauhen Haus. Sein Kranz hatte für jeden Tag eine Kerze.",
      "Der Sonntag vor dem 1. Advent ist der Totensonntag. Vor ihm öffnen viele Weihnachtsmärkte traditionell nicht.",
    ],
    faq: [
      {
        q: "Wie wird der 1. Advent berechnet?",
        a: "Man nimmt den 25. Dezember und geht zum Sonntag davor zurück: Das ist der 4. Advent. Drei Wochen früher liegt der 1. Advent. Fällt der 25. Dezember selbst auf einen Sonntag, ist der 4. Advent der 18. Dezember.",
      },
      {
        q: "Welches ist das früheste und das späteste Datum?",
        a: "Der früheste mögliche Termin ist der 27. November, der späteste der 3. Dezember.",
      },
      {
        q: "Beginnt der Adventskalender am 1. Advent?",
        a: "Nein. Der übliche Adventskalender beginnt am 1. Dezember und hat 24 Türchen. Der 1. Advent kann davor oder danach liegen.",
      },
      ADVENT_FAQ_FEIERTAG,
    ],
  },
  2: {
    intro: `Der 2. Advent ist der dritte Sonntag vor dem 25. Dezember und liegt immer zwischen dem 4. und dem 10. Dezember. Auf dem Kranz brennen zwei Kerzen, und es wird ernst mit den Geschenken: Wer online bestellt, sollte ab jetzt die Lieferzeiten lesen.

In manchen Jahren fällt der 2. Advent genau auf den 6. Dezember und damit auf den [Nikolaustag](/nikolaus). In diese Woche gehört auch der Barbaratag am 4. Dezember. Wer an dem Tag Zweige von Kirsche oder Forsythie schneidet und ins Wasser stellt, hat nach altem Brauch zu Weihnachten Blüten in der Vase.

Nach dem 2. Advent ist die Adventszeit ziemlich genau zur Hälfte vorbei. Weiter geht es mit dem [3. Advent](/3-advent). Wer lieber direkt das Ziel im Blick behält: der [Countdown bis Weihnachten](/weihnachten).`,
    facts: [
      "Der 2. Advent fällt immer auf einen Sonntag zwischen dem 4. und dem 10. Dezember.",
      "In der katholischen Liturgie heißt der Sonntag nach seinem Eröffnungsvers „Populus Sion“.",
      "Am 4. Dezember ist Barbaratag. Dann geschnittene Obstbaumzweige blühen im warmen Zimmer um Weihnachten.",
    ],
    faq: [
      {
        q: "Wann ist der 2. Advent frühestens und spätestens?",
        a: "Frühestens am 4. Dezember, spätestens am 10. Dezember. Das hängt davon ab, auf welchen Wochentag der 25. Dezember fällt.",
      },
      {
        q: "Wie viele Kerzen brennen am 2. Advent?",
        a: "Zwei. An jedem Adventssonntag kommt eine Kerze dazu, bis am 4. Advent alle vier brennen.",
      },
      {
        q: "Kann der 2. Advent auf Nikolaus fallen?",
        a: "Ja, immer dann, wenn der 6. Dezember ein Sonntag ist. Das war zuletzt 2020 so und ist 2026 wieder der Fall.",
      },
      ADVENT_FAQ_FEIERTAG,
    ],
  },
  3: {
    intro: `Der 3. Advent ist der zweite Sonntag vor dem 25. Dezember und liegt immer zwischen dem 11. und dem 17. Dezember. Drei Kerzen brennen, die Adventszeit ist über den Berg.

In der katholischen Kirche heißt dieser Sonntag „Gaudete“, auf Deutsch: Freut euch. Er ist als kleine Atempause in der sonst eher ernsten Adventszeit gedacht. Deshalb darf der Priester an diesem Tag Rosa statt Violett tragen, und auf manchen Adventskränzen steht eine rosafarbene Kerze zwischen drei violetten. Sie ist für den 3. Advent.

Praktisch gesehen ist der 3. Advent das letzte Wochenende, an dem Geschenke per Post noch entspannt ankommen. Danach wird es eng. Es folgen der [4. Advent](/4-advent) und [Heiligabend](/heiligabend), die in manchen Jahren sogar auf denselben Tag fallen.`,
    facts: [
      "Der 3. Advent fällt immer auf einen Sonntag zwischen dem 11. und dem 17. Dezember.",
      "Der Sonntag heißt „Gaudete“ (Freut euch). Die liturgische Farbe darf an diesem Tag Rosa sein.",
      "Auf Adventskränzen in den liturgischen Farben ist die dritte Kerze rosa, die anderen drei sind violett.",
    ],
    faq: [
      {
        q: "Warum ist am 3. Advent eine Kerze rosa?",
        a: "Der 3. Advent heißt in der katholischen Kirche Gaudete, der Sonntag der Vorfreude. Rosa ist ein aufgehelltes Violett und steht dafür, dass Weihnachten näher rückt. Auf Kränzen in liturgischen Farben ist deshalb die dritte Kerze rosa.",
      },
      {
        q: "Wann ist der 3. Advent frühestens und spätestens?",
        a: "Frühestens am 11. Dezember, spätestens am 17. Dezember.",
      },
      {
        q: "Wie viele Kerzen brennen am 3. Advent?",
        a: "Drei. Die vierte kommt eine Woche später dazu.",
      },
      ADVENT_FAQ_FEIERTAG,
    ],
  },
  4: {
    intro: `Der 4. Advent ist der letzte Sonntag vor dem 25. Dezember. Er liegt immer zwischen dem 18. und dem 24. Dezember. Alle vier Kerzen brennen, und wer jetzt noch kein Geschenk hat, ist in guter Gesellschaft.

Besonders ist der späteste Termin: Ist der 24. Dezember ein Sonntag, fallen 4. Advent und [Heiligabend](/heiligabend) zusammen. Die Adventszeit dauert dann nur 22 Tage, die vierte Kerze brennt morgens und abends ist schon Bescherung. So war es 2023, das nächste Mal ist 2028.

Im umgekehrten Fall, wenn der 25. Dezember ein Sonntag ist, liegt der 4. Advent schon am 18. Dezember und es bleibt eine volle Woche bis zum Fest. Wie viele Tage es dieses Jahr sind, zeigt der [Countdown bis Weihnachten](/weihnachten).`,
    facts: [
      "Der 4. Advent fällt immer auf einen Sonntag zwischen dem 18. und dem 24. Dezember.",
      "Fällt der 24. Dezember auf einen Sonntag, sind 4. Advent und Heiligabend derselbe Tag. Das nächste Mal ist das 2028 so.",
      "In der katholischen Liturgie heißt der Sonntag „Rorate“, nach dem Vers „Tauet, ihr Himmel, von oben“.",
    ],
    faq: [
      {
        q: "Kann der 4. Advent auf Heiligabend fallen?",
        a: "Ja. Wenn der 24. Dezember ein Sonntag ist, ist er zugleich der 4. Advent. Das war 2023 der Fall und passiert 2028 und 2034 wieder.",
      },
      {
        q: "Wann ist der 4. Advent frühestens und spätestens?",
        a: "Frühestens am 18. Dezember, spätestens am 24. Dezember.",
      },
      {
        q: "Gibt es einen 5. Advent?",
        a: "Nein. Die Adventszeit hat immer genau vier Sonntage. Sie ist nur unterschiedlich lang, je nachdem, wie viele Tage zwischen dem 4. Advent und Weihnachten liegen.",
      },
      ADVENT_FAQ_FEIERTAG,
    ],
  },
};

export const WINTER: Countdown[] = [
  {
    slug: "weihnachten",
    pfad: "/weihnachten",
    title: "Weihnachten",
    question: "Wie lange noch bis Weihnachten?",
    category: "feiertage",
    art: "tag",
    ...fest(12, 25, 2),
    bis: "bis Weihnachten",
    heute: "Heute ist Weihnachten.",
    motif: "stern",
    gesetzlich: "bundesweit",
    source: BMI,
    zeilen: (now) => {
      const heute = tagVon(now);
      let hl = { y: heute.y, m: 12, d: 24 };
      if (tageDiff(heute, hl) < 0) hl = { y: heute.y + 1, m: 12, d: 24 };
      const n = tageDiff(heute, hl);
      return [{ label: "Heiligabend", wert: n === 0 ? "heute" : `in ${n} ${n === 1 ? "Tag" : "Tagen"}` }];
    },
    intro: `Weihnachten beginnt im Kalender am 25. Dezember. Der 1. und der 2. Weihnachtstag sind in allen 16 Bundesländern gesetzliche Feiertage, Heiligabend ist es nicht. Gefeiert wird in Deutschland trotzdem vor allem am Abend des 24. Dezember: Dann ist Bescherung, und die Läden schließen in der Regel um 14 Uhr.

Der Zähler auf dieser Seite läuft bis zum 25. Dezember um 0 Uhr. Wer bis zur Bescherung rechnet, zieht einen Tag ab oder schaut gleich auf den [Countdown bis Heiligabend](/heiligabend). Wer vor allem auf freie Tage wartet, findet die Termine der [Weihnachtsferien in allen Bundesländern](/ferien/weihnachtsferien).

Die Zahl oben zählt Kalendertage in deutscher Zeit. Sie springt um Mitternacht um, nicht irgendwann am Vormittag, und sie stimmt auch dann, wenn du die Seite aus einer anderen Zeitzone öffnest.`,
    facts: [
      "Der 25. und der 26. Dezember sind bundesweit gesetzliche Feiertage. Heiligabend und Silvester sind rechtlich normale Werktage.",
      "Der 25. Dezember als Weihnachtsdatum ist für Rom erstmals für das Jahr 336 belegt, überliefert im Chronographen von 354.",
      "Der Adventskalender hat 24 Türchen, weil er bis Heiligabend zählt und nicht bis zum 1. Weihnachtstag.",
      "Orthodoxe Kirchen, die dem julianischen Kalender folgen, feiern Weihnachten am 7. Januar. Das ist deren 25. Dezember.",
    ],
    faq: [
      {
        q: "Ist Weihnachten am 24. oder am 25. Dezember?",
        a: "Im Kalender ist Weihnachten am 25. Dezember, dem 1. Weihnachtstag. Der 24. Dezember heißt Heiligabend und ist der Vorabend des Festes. Weil in Deutschland die Bescherung traditionell an Heiligabend stattfindet, meinen viele mit Weihnachten schon den 24.",
      },
      {
        q: "Ist Heiligabend ein Feiertag?",
        a: "Nein. Der 24. Dezember ist in keinem Bundesland ein gesetzlicher Feiertag. Viele Betriebe geben trotzdem frei oder schließen mittags, Geschäfte dürfen in der Regel bis 14 Uhr öffnen.",
      },
      {
        q: "Welche Weihnachtstage sind arbeitsfrei?",
        a: "Der 1. Weihnachtstag (25. Dezember) und der 2. Weihnachtstag (26. Dezember) sind in ganz Deutschland gesetzliche Feiertage. Fallen sie auf ein Wochenende, gibt es keinen Ersatztag.",
      },
      {
        q: "Warum feiern manche Länder Weihnachten erst im Januar?",
        a: "Mehrere orthodoxe Kirchen rechnen kirchliche Feste weiter nach dem julianischen Kalender. Der liegt derzeit 13 Tage hinter dem gregorianischen, deshalb fällt ihr 25. Dezember auf unseren 7. Januar.",
      },
    ],
    faqDynamisch: (now) => {
      const heute = tagVon(now);
      let w = { y: heute.y, m: 12, d: 25 };
      if (tageDiff(heute, w) < 0) w = { y: heute.y + 1, m: 12, d: 25 };
      const zweiter = plusTage(w, 1);
      return [
        {
          q: `Auf welche Wochentage fällt Weihnachten ${w.y}?`,
          a: `Heiligabend ${w.y} ist ein ${wochentagName(plusTage(w, -1))}, der 1. Weihnachtstag ein ${wochentagName(w)} und der 2. Weihnachtstag ein ${wochentagName(zweiter)}.`,
        },
      ];
    },
    related: ["/heiligabend", "/4-advent", "/nikolaus", "/silvester", "/neujahr", "/1-advent", "/ferien/weihnachtsferien"],
  },
  {
    slug: "heiligabend",
    pfad: "/heiligabend",
    title: "Heiligabend",
    question: "Wie lange noch bis Heiligabend?",
    category: "feiertage",
    art: "tag",
    ...fest(12, 24),
    bis: "bis Heiligabend",
    heute: "Heute ist Heiligabend.",
    motif: "tanne",
    gesetzlich: false,
    intro: `Heiligabend ist der 24. Dezember, der Vorabend von Weihnachten. Für die meisten Familien in Deutschland ist er der eigentliche Höhepunkt: Am späten Nachmittag oder Abend ist Bescherung, vorher gehen viele in die Christvesper, danach wird gegessen. Laut Umfragen landet dabei erstaunlich oft Kartoffelsalat mit Würstchen auf dem Tisch.

Ein gesetzlicher Feiertag ist Heiligabend nicht. Wer arbeiten muss, hat Anspruch auf nichts außer Mitgefühl, es sei denn, Tarifvertrag oder Betrieb regeln es anders. Geschäfte schließen in der Regel um 14 Uhr, Busse und Bahnen fahren abends oft nach Sonntagsfahrplan.

Der Zähler läuft bis zum 24. Dezember um 0 Uhr. Die Bescherung selbst kommt dann noch rund 17 Stunden später, je nach Geduld der Kinder.`,
    facts: [
      "Heiligabend ist kein gesetzlicher Feiertag, weder bundesweit noch in einem einzelnen Bundesland.",
      "Fällt der 24. Dezember auf einen Sonntag, ist er zugleich der 4. Advent. Das war 2023 so und passiert 2028 wieder.",
      "Geschäfte dürfen an Heiligabend, wenn er auf einen Werktag fällt, in der Regel nur bis 14 Uhr öffnen.",
      "Kirchlich beginnt ein Festtag schon am Vorabend. Daher kommt der Name: der heilige Abend vor dem Fest.",
    ],
    faq: [
      {
        q: "Muss ich an Heiligabend arbeiten?",
        a: "Rechtlich ist der 24. Dezember ein normaler Werktag. Ob du frei hast, hängt von Arbeitsvertrag, Tarifvertrag oder Betriebsvereinbarung ab. Viele Arbeitgeber geben einen halben oder ganzen Tag frei, manche rechnen dafür einen halben Urlaubstag an.",
      },
      {
        q: "Wie lange haben Geschäfte an Heiligabend geöffnet?",
        a: "In der Regel bis 14 Uhr, sofern der 24. Dezember ein Werktag ist. Fällt Heiligabend auf einen Sonntag, bleiben die meisten Läden ganz zu. Ausnahmen gibt es etwa für Bäckereien, Tankstellen und den Verkauf von Weihnachtsbäumen.",
      },
      {
        q: "Wann ist Bescherung?",
        a: "Dafür gibt es keine feste Uhrzeit. In den meisten Familien ist Bescherung am späten Nachmittag oder frühen Abend des 24. Dezember, oft nach dem Kirchgang und vor oder nach dem Essen.",
      },
      {
        q: "Was ist der Unterschied zwischen Heiligabend und Weihnachten?",
        a: "Heiligabend ist der 24. Dezember, der Abend vor dem Fest. Weihnachten im engeren Sinn sind der 25. und der 26. Dezember, die beiden gesetzlichen Feiertage.",
      },
    ],
    faqDynamisch: (now) => {
      const heute = tagVon(now);
      let h = { y: heute.y, m: 12, d: 24 };
      if (tageDiff(heute, h) < 0) h = { y: heute.y + 1, m: 12, d: 24 };
      return [
        {
          q: `Auf welchen Wochentag fällt Heiligabend ${h.y}?`,
          a: `Heiligabend ${h.y} ist ein ${wochentagName(h)}. Im Jahr darauf fällt der 24. Dezember auf einen ${wochentagName({ ...h, y: h.y + 1 })}.`,
        },
      ];
    },
    related: ["/weihnachten", "/4-advent", "/3-advent", "/nikolaus", "/silvester", "/neujahr", "/ferien/weihnachtsferien"],
  },
  {
    slug: "silvester",
    pfad: "/silvester",
    title: "Silvester",
    question: "Wie viele Tage noch bis Silvester?",
    category: "feiertage",
    art: "tag",
    ...fest(12, 31),
    bis: "bis Silvester",
    heute: "Heute ist Silvester.",
    motif: "feuerwerk",
    gesetzlich: false,
    intro: `Silvester ist der 31. Dezember, der letzte Tag des Jahres. Seinen Namen hat er von Papst Silvester I., der am 31. Dezember 335 starb. Mit Raketen hatte der Mann nichts zu tun, der Tag ist schlicht sein Gedenktag.

Ein gesetzlicher Feiertag ist Silvester nicht. Der freie Tag kommt erst danach: [Neujahr](/neujahr) am 1. Januar. Feuerwerk für Privatleute darf nur an den letzten drei Werktagen des Jahres verkauft und nur am 31. Dezember und 1. Januar gezündet werden. Viele Städte richten zusätzlich Verbotszonen ein.

Der Zähler oben läuft bis zum Beginn des 31. Dezember. Wer den Sekunden bis Mitternacht hinterherzählen will, nimmt den [Countdown bis Neujahr](/neujahr). Der endet genau um 0 Uhr.`,
    facts: [
      "Der Tag ist nach Papst Silvester I. benannt, der am 31. Dezember 335 in Rom starb.",
      "Silvester ist kein gesetzlicher Feiertag. Gesetzlich frei ist erst der 1. Januar.",
      "Der Sketch „Dinner for One“ wurde 1963 aufgezeichnet und läuft seit 1972 jedes Jahr an Silvester im deutschen Fernsehen.",
      "Bleigießen-Sets dürfen seit 2018 nicht mehr verkauft werden, weil sie zu viel Blei enthalten. Der Ersatz heißt Wachsgießen.",
      "Feuerwerk der Kategorie F2 dürfen nur Erwachsene kaufen, und nur an den letzten drei Werktagen des Jahres.",
    ],
    faq: [
      {
        q: "Ist Silvester ein Feiertag?",
        a: "Nein. Der 31. Dezember ist in ganz Deutschland ein normaler Werktag. Viele Betriebe schließen mittags oder geben frei, einen gesetzlichen Anspruch darauf gibt es nicht. Gesetzlicher Feiertag ist erst Neujahr am 1. Januar.",
      },
      {
        q: "Warum heißt Silvester Silvester?",
        a: "Der 31. Dezember ist der Gedenktag von Papst Silvester I., der an diesem Tag im Jahr 335 starb. Als der Jahreswechsel später auf den 1. Januar fiel, blieb der Name des Tagesheiligen am letzten Tag des Jahres hängen.",
      },
      {
        q: "Ab wann darf man Silvesterfeuerwerk kaufen?",
        a: "An den letzten drei Werktagen des Jahres, normalerweise vom 29. bis 31. Dezember. Fällt einer dieser Tage auf einen Sonntag, beginnt der Verkauf schon am 28. Dezember. Zünden ist nur am 31. Dezember und 1. Januar erlaubt, sofern die Gemeinde nichts Strengeres festlegt.",
      },
      {
        q: "Wie lange haben Geschäfte an Silvester geöffnet?",
        a: "In den meisten Bundesländern bis 14 Uhr, wenn der 31. Dezember auf einen Werktag fällt. Supermärkte sind am Vormittag entsprechend voll.",
      },
    ],
    faqDynamisch: (now) => {
      const heute = tagVon(now);
      const s = { y: heute.y, m: 12, d: 31 };
      return [
        {
          q: `Auf welchen Wochentag fällt Silvester ${s.y}?`,
          a: `Der 31. Dezember ${s.y} ist ein ${wochentagName(s)}. Neujahr ${s.y + 1} fällt damit auf einen ${wochentagName(plusTage(s, 1))}.`,
        },
      ];
    },
    related: ["/neujahr", "/jahresende", "/weihnachten", "/heiligabend", "/heilige-drei-koenige", "/ferien/weihnachtsferien", "/kalenderwoche"],
  },
  {
    slug: "neujahr",
    pfad: "/neujahr",
    title: "Neujahr",
    question: "Wie lange noch bis Neujahr?",
    category: "feiertage",
    art: "tag",
    ...fest(1, 1),
    bis: "bis Neujahr",
    heute: "Heute ist Neujahr. Frohes Neues.",
    motif: "blatt-1",
    gesetzlich: "bundesweit",
    source: BMI,
    intro: `Neujahr ist der 1. Januar und in ganz Deutschland ein gesetzlicher Feiertag. Der Zähler auf dieser Seite endet genau um Mitternacht in deutscher Zeit, also in dem Moment, in dem das neue Jahr beginnt. Am 31. Dezember steht hier „1 Tag“, darunter laufen Stunden, Minuten und Sekunden bis 0 Uhr.

Dass das Jahr am 1. Januar anfängt, ist eine römische Erfindung: Ab 153 vor Christus traten die Konsuln an diesem Tag ihr Amt an. Im Mittelalter begann das Jahr je nach Gegend an Weihnachten, Ostern oder am 25. März. Erst in der Neuzeit setzte sich der 1. Januar überall durch.

Wer wissen will, wie viel vom alten Jahr noch übrig ist, findet das beim [Countdown bis zum Jahresende](/jahresende). Die Kalenderwoche, mit der das neue Jahr startet, steht in der [Übersicht der Kalenderwochen](/kalenderwoche).`,
    facts: [
      "Der 1. Januar ist in allen 16 Bundesländern gesetzlicher Feiertag.",
      "Als Erste begrüßen die Line Islands von Kiribati das neue Jahr. Dort ist es schon Mitternacht, wenn es in Deutschland am 31. Dezember 11 Uhr vormittags ist.",
      "Ab 153 vor Christus begann das Amtsjahr der römischen Konsuln am 1. Januar. Daher kommt unser Jahresanfang.",
      "Die erste Kalenderwoche eines Jahres ist die Woche, in der der erste Donnerstag liegt. Der 1. Januar kann deshalb noch zur letzten Woche des alten Jahres gehören.",
    ],
    faq: [
      {
        q: "Ist Neujahr ein gesetzlicher Feiertag?",
        a: "Ja. Der 1. Januar ist in ganz Deutschland gesetzlicher Feiertag. Fällt er auf einen Samstag oder Sonntag, gibt es keinen Ersatztag.",
      },
      {
        q: "Zählt dieser Countdown bis Mitternacht?",
        a: "Ja. Er endet am 1. Januar um 0:00 Uhr mitteleuropäischer Zeit. Maßgeblich ist die Zeit in Deutschland, unabhängig davon, wo du die Seite öffnest.",
      },
      {
        q: "Wo beginnt das neue Jahr zuerst?",
        a: "Auf den Line Islands im Pazifikstaat Kiribati, die der Zeitzone UTC+14 folgen. Dort ist Mitternacht, wenn es in Deutschland 11 Uhr am Vormittag des 31. Dezember ist. Zuletzt wechselt das Jahr auf den unbewohnten Inseln Baker und Howland, 26 Stunden später.",
      },
      {
        q: "Warum beginnt das Jahr am 1. Januar?",
        a: "Die Römer legten den Amtsantritt ihrer Konsuln ab 153 vor Christus auf den 1. Januar. Der julianische und später der gregorianische Kalender haben diesen Jahresanfang übernommen.",
      },
    ],
    faqDynamisch: (now) => {
      const heute = tagVon(now);
      const n = heute.m === 1 && heute.d === 1 ? heute : { y: heute.y + 1, m: 1, d: 1 };
      return [
        {
          q: `Auf welchen Wochentag fällt Neujahr ${n.y}?`,
          a: `Der 1. Januar ${n.y} ist ein ${wochentagName(n)}.`,
        },
      ];
    },
    related: ["/silvester", "/jahresende", "/heilige-drei-koenige", "/weihnachten", "/kalenderwoche", "/valentinstag", "/ferien/weihnachtsferien"],
  },
  {
    slug: "nikolaus",
    pfad: "/nikolaus",
    title: "Nikolaus",
    nominativ: "Der Nikolaustag",
    question: "Wie lange noch bis Nikolaus?",
    category: "feiertage",
    art: "tag",
    ...fest(12, 6),
    bis: "bis Nikolaus",
    heute: "Heute ist Nikolaus.",
    motif: "stiefel",
    gesetzlich: false,
    intro: `Nikolaus ist am 6. Dezember. Der Tag erinnert an Nikolaus von Myra, der im 4. Jahrhundert Bischof in der heutigen Türkei war. Über sein Leben ist wenig gesichert, über seine Großzügigkeit gibt es dafür umso mehr Legenden. Aus ihnen wurde der Brauch, Kindern heimlich etwas zuzustecken.

Wichtig für die Planung: Die Stiefel müssen am Abend des 5. Dezember vor der Tür stehen, und zwar geputzt. Gefüllt werden sie in der Nacht. Wer erst am 6. morgens daran denkt, hat ein Problem und sollte wissen, wo die nächste Tankstelle ist.

Ein gesetzlicher Feiertag ist der Nikolaustag in Deutschland nicht, Schule und Arbeit laufen normal. Danach geht es in der Adventszeit weiter mit dem [2. Advent](/2-advent) oder gleich mit dem [Countdown bis Weihnachten](/weihnachten).`,
    facts: [
      "Nikolaus von Myra war im 4. Jahrhundert Bischof von Myra, dem heutigen Demre in der Türkei.",
      "Der 6. Dezember gilt als sein Todestag. Das Jahr ist nicht gesichert.",
      "In den Niederlanden bringt Sinterklaas die Geschenke schon am Abend des 5. Dezember.",
      "Der Nikolaustag ist in Deutschland kein gesetzlicher Feiertag.",
    ],
    faq: [
      {
        q: "Wann stellt man die Stiefel raus?",
        a: "Am Abend des 5. Dezember. Der Nikolaus kommt in der Nacht zum 6. Dezember, gefunden werden die gefüllten Stiefel am Morgen.",
      },
      {
        q: "Ist Nikolaus ein Feiertag?",
        a: "Nein. Der 6. Dezember ist in Deutschland ein normaler Werk- und Schultag.",
      },
      {
        q: "Was ist der Unterschied zwischen Nikolaus und Weihnachtsmann?",
        a: "Der Nikolaus geht auf den Bischof Nikolaus von Myra zurück und kommt am 6. Dezember, traditionell mit Mitra und Bischofsstab. Der Weihnachtsmann ist eine jüngere Figur, die sich im 19. Jahrhundert aus dem Nikolaus entwickelt hat und an Heiligabend kommt.",
      },
      {
        q: "Wer ist Knecht Ruprecht?",
        a: "Der Begleiter des Nikolaus im Brauchtum. Er trägt die Rute und ist für die weniger braven Kinder zuständig. Je nach Region heißt die Figur anders, im Alpenraum etwa Krampus.",
      },
    ],
    faqDynamisch: (now) => {
      const heute = tagVon(now);
      let n = { y: heute.y, m: 12, d: 6 };
      if (tageDiff(heute, n) < 0) n = { y: heute.y + 1, m: 12, d: 6 };
      return [
        {
          q: `Auf welchen Wochentag fällt Nikolaus ${n.y}?`,
          a: `Der 6. Dezember ${n.y} ist ein ${wochentagName(n)}. Die Stiefel gehören also am ${wochentagName(plusTage(n, -1))}abend vor die Tür.`,
        },
      ];
    },
    related: ["/1-advent", "/2-advent", "/weihnachten", "/heiligabend", "/3-advent", "/sankt-martin", "/silvester"],
  },
  ...([1, 2, 3, 4] as const).map((n): Countdown => {
    const texte = ADVENT[n];
    return {
      slug: `${n}-advent`,
      pfad: `/${n}-advent`,
      title: `${n}. Advent`,
      nominativ: `Der ${n}. Advent`,
      question: `Wie lange noch bis zum ${n}. Advent?`,
      category: "feiertage",
      art: "tag",
      ...jaehrlich((jahr) => advent(jahr, n)),
      bis: `bis zum ${n}. Advent`,
      heute: `Heute ist der ${n}. Advent.`,
      motif: `kerzen-${n}`,
      gesetzlich: false,
      intro: texte.intro,
      facts: texte.facts,
      faq: texte.faq,
      faqDynamisch: (now) => {
        const heute = tagVon(now);
        let a = advent(heute.y, n);
        if (tageDiff(heute, a) < 0) a = advent(heute.y + 1, n);
        return [
          {
            q: `Wann ist der ${n}. Advent ${a.y}?`,
            a: `Der ${n}. Advent ${a.y} ist am ${datumMitWochentag(a)}. Im Jahr darauf fällt er auf den ${datumLang(advent(a.y + 1, n))}.`,
          },
        ];
      },
      related: [
        ...([1, 2, 3, 4] as const).filter((m) => m !== n).map((m) => `/${m}-advent`),
        "/nikolaus",
        "/heiligabend",
        "/weihnachten",
      ],
    };
  }),
];
