import type { EventDaten } from "./events-typ";

/**
 * Events mit offiziell bestätigtem Datum, chronologisch.
 * Jede Angabe stammt aus data/research/events.json (abgerufen am 15.11.2026). Was dort als
 * unbestätigt, vorläufig oder nur aus zweiter Hand vermerkt ist, steht hier nicht oder ist so benannt.
 */
export const EVENT_DATEN: EventDaten[] = [
  {
    slug: "gta-6-release",
    title: "GTA 6",
    tafel: "GTA 6: Release",
    question: "Wann erscheint GTA 6?",
    nominativ: "GTA 6",
    bis: "bis zum Release von GTA 6",
    heute: "Heute erscheint GTA 6.",
    vorbei: "GTA 6 ist seit dem 19. November 2026 erhältlich.",
    rubrik: "games",
    motif: "gamepad",
    start: "2026-11-19",
    ort: "weltweit",
    source: { label: "Rockstar Games: offizielle Seite zu Grand Theft Auto VI", url: "https://www.rockstargames.com/VI" },
    intro: `Grand Theft Auto VI erscheint am Donnerstag, 19. November 2026. So steht es auf der offiziellen Seite von Rockstar Games, und eine weitere Verschiebung ist dort nicht vermerkt. Nach zwei verschobenen Terminen ist das die Nachricht, auf die viele gewartet haben.

Als Plattformen nennt Rockstar die PlayStation 5 und die Xbox Series X und S. Eine genaue Uhrzeit der Freischaltung steht auf der Seite nicht. Der Zähler läuft deshalb bis zum Beginn des 19. November in deutscher Zeit.

Wer sich für den Tag freinehmen will, sollte das Datum mit dem Chef klären und nicht mit dem Kalender: Ein Feiertag ist es nirgends. Was sonst an großen Terminen ansteht, zeigt die [Übersicht aller Events](/events).`,
    facts: [
      "Rockstar Games nennt als Erscheinungstermin den 19. November 2026.",
      "Angekündigte Plattformen sind PlayStation 5 und Xbox Series X und S.",
      "Der 19. November 2026 ist ein Donnerstag.",
    ],
    faq: [
      {
        q: "Um wie viel Uhr wird GTA 6 freigeschaltet?",
        a: "Auf der offiziellen Seite steht dazu keine Uhrzeit. Dieser Countdown zählt bis zum 19. November 2026 um 0 Uhr deutscher Zeit.",
      },
      {
        q: "Kommt GTA 6 auch für den PC?",
        a: "Auf der offiziellen Seite stehen nur PlayStation 5 und Xbox Series X und S. Zu einer PC-Version macht Rockstar dort keine Angabe.",
      },
      {
        q: "Wurde GTA 6 noch einmal verschoben?",
        a: "Stand 15. November 2026 nennt Rockstar weiterhin den 19. November 2026. Verbindlich ist die verlinkte Seite des Herstellers.",
      },
    ],
    related: ["/events/black-friday-2026", "/events/avengers-doomsday-kinostart", "/events/gamescom-2027", "/weihnachten", "/wochenende"],
  },
  {
    slug: "black-friday-2026",
    title: "Black Friday 2026",
    tafel: "Black Friday",
    question: "Wann ist Black Friday 2026?",
    nominativ: "Der Black Friday",
    bis: "bis zum Black Friday",
    heute: "Heute ist Black Friday.",
    vorbei: "Der Black Friday 2026 ist vorbei. Der nächste ist am 26. November 2027.",
    rubrik: "feste",
    motif: "preisschild",
    start: "2026-11-27",
    ort: "Handel, vor allem online",
    source: {
      label: "U.S. Office of Personnel Management: Federal Holidays",
      url: "https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/",
    },
    intro: `Black Friday 2026 ist am Freitag, 27. November. Einen Veranstalter gibt es nicht, das Datum ergibt sich aus dem amerikanischen Kalender: Thanksgiving ist immer am vierten Donnerstag im November, und der Freitag danach ist der Black Friday.

In den USA ist das der Brückentag, an dem das Weihnachtsgeschäft beginnt. In Deutschland ist es ein normaler Arbeitstag mit auffällig vielen Rabattschildern. Viele Händler dehnen die Aktion längst auf die ganze Woche aus, und am Montag danach folgt der Cyber Monday.

Ein Rabatt ist nur dann einer, wenn der Preis vorher wirklich höher war. Vergleichen lohnt sich an diesem Tag mehr als an jedem anderen. Bis zum Fest selbst ist dann noch Zeit: der [Countdown bis Weihnachten](/weihnachten).`,
    facts: [
      "Thanksgiving fällt 2026 auf Donnerstag, den 26. November. Der Black Friday ist der Tag danach.",
      "Der Black Friday liegt immer zwischen dem 23. und dem 29. November.",
      "2027 ist Black Friday am 26. November.",
    ],
    faq: [
      {
        q: "Wie wird das Datum des Black Friday berechnet?",
        a: "Es ist der Freitag nach Thanksgiving, dem vierten Donnerstag im November. 2026 ist das der 27. November.",
      },
      {
        q: "Wann ist Cyber Monday 2026?",
        a: "Am Montag nach dem Black Friday, also am 30. November 2026.",
      },
      {
        q: "Ist Black Friday ein Feiertag?",
        a: "Nein. In Deutschland ist es ein normaler Werktag. Auch in den USA ist der Tag kein bundesweiter Feiertag, viele haben aber frei, weil Thanksgiving am Donnerstag davor einer ist.",
      },
    ],
    related: ["/weihnachten", "/1-advent", "/nikolaus", "/events/gta-6-release", "/events/avengers-doomsday-kinostart", "/payday"],
  },
  {
    slug: "avengers-doomsday-kinostart",
    title: "Avengers: Doomsday",
    tafel: "Avengers: Doomsday",
    question: "Wann kommt Avengers: Doomsday ins Kino?",
    nominativ: "Avengers: Doomsday",
    bis: "bis zum Kinostart von Avengers: Doomsday",
    heute: "Heute startet Avengers: Doomsday im Kino.",
    vorbei: "Avengers: Doomsday läuft seit dem 16. Dezember 2026 in den deutschen Kinos.",
    rubrik: "popkultur",
    motif: "klappe",
    start: "2026-12-16",
    ort: "Kinos in Deutschland",
    source: { label: "Disney Deutschland: Avengers: Doomsday", url: "https://www.disney.de/filme/avengers-doomsday" },
    intro: `Avengers: Doomsday startet in Deutschland am Mittwoch, 16. Dezember 2026. Das Datum nennt Disney Deutschland auf der Filmseite, dazu den Hinweis, dass der Film zunächst nur im Kino läuft.

Ein Kinostart am Mittwoch ist kein Versehen. Große Filme laufen in Deutschland oft ein oder zwei Tage vor dem Wochenende an. Wer am ersten Abend einen guten Platz will, bucht ihn besser, sobald der Vorverkauf des eigenen Kinos öffnet. Wann das ist, legt jedes Kino selbst fest.

Der Start liegt eine gute Woche vor Heiligabend. Wer den Film als Familienprogramm für die freien Tage einplant: Die Termine der [Weihnachtsferien in allen Bundesländern](/ferien/weihnachtsferien) stehen in der Ferienübersicht.`,
    facts: [
      "Disney Deutschland nennt als Kinostart den 16. Dezember 2026, einen Mittwoch.",
      "Laut Disney läuft der Film zunächst ausschließlich im Kino.",
      "Der Starttermin liegt acht Tage vor Heiligabend.",
    ],
    faq: [
      {
        q: "Wann startet Avengers: Doomsday in Deutschland?",
        a: "Am Mittwoch, 16. Dezember 2026. So steht es auf der Filmseite von Disney Deutschland.",
      },
      {
        q: "Ab wann gibt es Karten?",
        a: "Das legt jedes Kino selbst fest. Ein einheitlicher Termin für den Vorverkauf steht auf der Seite von Disney nicht.",
      },
      {
        q: "Wann kommt der Film zu Disney+?",
        a: "Das steht noch nicht fest. Disney nennt bisher nur den Kinostart.",
      },
    ],
    related: ["/heiligabend", "/weihnachten", "/events/gta-6-release", "/events/black-friday-2026", "/ferien/weihnachtsferien", "/4-advent"],
  },
  {
    slug: "vierschanzentournee-2026-27",
    title: "Vierschanzentournee 2026/27",
    tafel: "Vierschanzentournee",
    question: "Wann beginnt die Vierschanzentournee 2026/27?",
    nominativ: "Die Vierschanzentournee 2026/27",
    bis: "bis zur Vierschanzentournee",
    heute: "Heute beginnt die Vierschanzentournee.",
    laeuft: "Die Vierschanzentournee läuft.",
    vorbei: "Die Vierschanzentournee 2026/27 ist vorbei.",
    rubrik: "sport",
    motif: "flocke",
    start: "2026-12-28",
    ende: "2027-01-06",
    ort: "Oberstdorf, Garmisch-Partenkirchen, Innsbruck, Bischofshofen",
    source: {
      label: "Vierschanzentournee: Programm 2026/27",
      url: "https://www.vierschanzentournee.com/news/tickets-for-the-anniversary-and-premiere-four-hills-tour",
    },
    intro: `Die Vierschanzentournee 2026/27 beginnt am Montag, 28. Dezember 2026, in Oberstdorf mit der Qualifikation und endet am 6. Januar 2027 in Bischofshofen. Das Auftaktspringen der Männer ist am 29. Dezember. Der Veranstalter nennt das Programm noch vorläufig.

Die Reihenfolge ist die gewohnte: Oberstdorf, dann das Neujahrsspringen in Garmisch-Partenkirchen am 1. Januar, Innsbruck am 3. Januar und das Finale am Dreikönigstag. Neu ist, dass die Frauen ihre eigene Tournee an denselben Orten springen, jeweils am Tag der Qualifikation.

Für viele gehört das Neujahrsspringen so fest zum 1. Januar wie die Kopfschmerzen. Wie lange es bis dahin noch ist, zeigt der [Countdown bis Neujahr](/neujahr).`,
    facts: [
      "Oberstdorf: Qualifikation am 28. Dezember 2026, Auftaktspringen der Männer am 29. Dezember.",
      "Garmisch-Partenkirchen: Neujahrsspringen am 1. Januar 2027. Innsbruck folgt am 3. Januar, das Finale in Bischofshofen am 6. Januar.",
      "Der Veranstalter kündigt eine Jubiläumsausgabe und die erste Tournee der Frauen an.",
      "Das Programm ist laut Veranstalter vorläufig.",
    ],
    faq: [
      {
        q: "Wann ist das Neujahrsspringen 2027?",
        a: "Am Freitag, 1. Januar 2027, in Garmisch-Partenkirchen. Die Qualifikation ist am Tag davor.",
      },
      {
        q: "Wo findet die Vierschanzentournee statt?",
        a: "An vier Schanzen in dieser Reihenfolge: Oberstdorf und Garmisch-Partenkirchen in Deutschland, Innsbruck und Bischofshofen in Österreich.",
      },
      {
        q: "Um wie viel Uhr beginnen die Springen?",
        a: "Der Veranstalter nennt für den ersten Durchgang der Männer vorläufig jeweils 16:30 Uhr. Endgültig bestätigt sind die Zeiten noch nicht.",
      },
    ],
    related: ["/neujahr", "/silvester", "/heilige-drei-koenige", "/events/handball-wm-2027", "/events/alpine-ski-wm-2027", "/winteranfang"],
  },
  {
    slug: "handball-wm-2027",
    title: "Handball-WM 2027",
    tafel: "Handball-WM",
    question: "Wann beginnt die Handball-WM 2027?",
    nominativ: "Die Handball-WM 2027",
    bis: "bis zur Handball-WM 2027",
    heute: "Heute beginnt die Handball-WM.",
    laeuft: "Die Handball-WM läuft.",
    vorbei: "Die Handball-WM 2027 ist vorbei.",
    rubrik: "sport",
    motif: "ball",
    start: "2027-01-13",
    startzeit: "17:30",
    ende: "2027-01-31",
    ort: "Deutschland: München, Stuttgart, Kiel, Magdeburg, Hannover, Köln",
    source: {
      label: "IHF: Spielplan der Männer-WM 2027 bestätigt",
      url: "https://www.ihf.info/media-center/news/match-schedule-confirmed-2027-ihf-mens-world-championship",
    },
    intro: `Die Handball-Weltmeisterschaft der Männer beginnt am Mittwoch, 13. Januar 2027, in München. Das erste Spiel wird um 17:30 Uhr angeworfen, danach folgt die Eröffnungsfeier. Deutschland steigt am selben Abend um 20:30 Uhr gegen Tunesien ein.

Gespielt wird in sechs deutschen Städten. Die deutsche Mannschaft bestreitet ihre Vorrunde in München: nach Tunesien am 15. Januar gegen Uruguay und am 17. Januar gegen Serbien, jeweils um 20:30 Uhr. Die Hauptrunde läuft ab dem 20. Januar in Hannover und Köln, das Finale ist am Sonntag, 31. Januar, in Köln.

Eine Heim-WM im Januar hat einen praktischen Vorteil: Draußen verpasst man nichts. Was danach an großen Terminen kommt, steht in der [Übersicht aller Events](/events).`,
    facts: [
      "Die WM läuft vom 13. bis 31. Januar 2027 in Deutschland, mit 32 Mannschaften.",
      "Eröffnungsspiel am 13. Januar um 17:30 Uhr in München, Deutschland gegen Tunesien um 20:30 Uhr.",
      "Spielorte sind München, Stuttgart, Kiel, Magdeburg, Hannover und Köln.",
      "Halbfinals am 29. Januar, Finale am 31. Januar 2027 in Köln.",
    ],
    faq: [
      {
        q: "Wann spielt Deutschland bei der Handball-WM 2027?",
        a: "In der Vorrunde am 13. Januar gegen Tunesien, am 15. Januar gegen Uruguay und am 17. Januar gegen Serbien. Alle drei Spiele beginnen um 20:30 Uhr in München.",
      },
      {
        q: "Wo ist das Finale der Handball-WM 2027?",
        a: "In Köln, am Sonntag, 31. Januar 2027. Die Anwurfzeit hat der Weltverband noch nicht veröffentlicht.",
      },
      {
        q: "Wie viele Mannschaften nehmen teil?",
        a: "32 Mannschaften.",
      },
    ],
    related: ["/events/vierschanzentournee-2026-27", "/events/super-bowl-lxi", "/events/alpine-ski-wm-2027", "/events/biathlon-wm-2027", "/events/dfb-pokalfinale-2027", "/neujahr"],
  },
  {
    slug: "alpine-ski-wm-2027",
    title: "Alpine Ski-WM 2027",
    tafel: "Alpine Ski-WM",
    question: "Wann ist die Alpine Ski-WM 2027?",
    nominativ: "Die Alpine Ski-WM 2027",
    bis: "bis zur Alpinen Ski-WM 2027",
    heute: "Heute beginnt die Alpine Ski-WM.",
    laeuft: "Die Alpine Ski-WM läuft.",
    vorbei: "Die Alpine Ski-WM 2027 ist vorbei.",
    rubrik: "sport",
    motif: "flocke",
    start: "2027-02-01",
    ende: "2027-02-14",
    ort: "Crans-Montana, Schweiz",
    source: {
      label: "FIS: Alpine Ski-WM 2027 in Crans-Montana bestätigt",
      url: "https://fis-ski.com/alpine-skiing/news/2024-25/fis-alpine-world-ski-championships-2027-in-crans-montana-confirmed",
    },
    intro: `Die Alpinen Ski-Weltmeisterschaften 2027 finden vom 1. bis 14. Februar in Crans-Montana statt, im Schweizer Kanton Wallis. Den Termin hat der Weltverband FIS bestätigt.

Welches Rennen an welchem Tag gefahren wird, haben wir nicht aus einer offiziellen Quelle prüfen können. Der Zähler läuft deshalb bis zum ersten Tag der WM und nicht bis zu einem bestimmten Start. Sobald das Programm steht, findet es sich beim Veranstalter.

Der Februar 2027 ist für Wintersportfans ohnehin gut gefüllt. Kurz nach dem Auftakt in Crans-Montana beginnt die [Biathlon-WM in Otepää](/events/biathlon-wm-2027), Ende des Monats folgt die [Nordische Ski-WM in Falun](/events/nordische-ski-wm-2027).`,
    facts: [
      "Die FIS nennt als Termin den 1. bis 14. Februar 2027.",
      "Austragungsort ist Crans-Montana in der Schweiz.",
      "Die WM dauert zwei Wochen und endet an einem Sonntag.",
    ],
    faq: [
      { q: "Wo findet die Alpine Ski-WM 2027 statt?", a: "In Crans-Montana in der Schweiz." },
      {
        q: "Wann ist welches Rennen?",
        a: "Ein tagesgenaues Rennprogramm haben wir nicht geprüft. Bestätigt ist der Zeitraum vom 1. bis 14. Februar 2027.",
      },
      {
        q: "Wie lange dauert die Ski-WM?",
        a: "14 Tage, von Montag, 1. Februar, bis Sonntag, 14. Februar 2027.",
      },
    ],
    related: ["/events/biathlon-wm-2027", "/events/nordische-ski-wm-2027", "/events/vierschanzentournee-2026-27", "/events/handball-wm-2027", "/events/super-bowl-lxi", "/ferien/winterferien"],
  },
  {
    slug: "biathlon-wm-2027",
    title: "Biathlon-WM 2027",
    tafel: "Biathlon-WM",
    question: "Wann ist die Biathlon-WM 2027?",
    nominativ: "Die Biathlon-WM 2027",
    bis: "bis zur Biathlon-WM 2027",
    heute: "Heute beginnt die Biathlon-WM.",
    laeuft: "Die Biathlon-WM läuft.",
    vorbei: "Die Biathlon-WM 2027 ist vorbei.",
    rubrik: "sport",
    motif: "flocke",
    start: "2027-02-09",
    ende: "2027-02-21",
    ort: "Otepää, Estland",
    source: { label: "Biathlon Otepää: Zeitplan des Veranstalters", url: "https://www.biathlonotepaa.com/en/ajakava" },
    intro: `Die Biathlon-Weltmeisterschaften 2027 laufen vom 9. bis 21. Februar in Otepää in Estland. Am Dienstag, 9. Februar, ist die Eröffnungsfeier, das erste Rennen folgt am Mittwoch: die Mixed-Staffel.

Den Abschluss machen am Sonntag, 21. Februar, die Massenstarts der Männer und der Frauen. Uhrzeiten nennt der Veranstalter zwar, aber ohne Zeitzone. Weil Estland eine Stunde vor Deutschland liegt, lassen wir sie lieber weg, als eine falsche zu zeigen.

Die WM überschneidet sich mit dem Ende der [Alpinen Ski-WM in Crans-Montana](/events/alpine-ski-wm-2027). Wer beides sehen will, braucht an manchen Tagen zwei Bildschirme oder einen sehr verständnisvollen Haushalt.`,
    facts: [
      "Der Veranstalter nennt den 9. bis 21. Februar 2027.",
      "Eröffnungsfeier am 9. Februar, erstes Rennen am 10. Februar mit der Mixed-Staffel.",
      "Letzter Wettkampftag ist der 21. Februar mit den Massenstarts.",
    ],
    faq: [
      { q: "Wo findet die Biathlon-WM 2027 statt?", a: "In Otepää im Süden Estlands." },
      {
        q: "Welches ist das erste Rennen?",
        a: "Die Mixed-Staffel am Mittwoch, 10. Februar 2027. Am Tag davor ist die Eröffnungsfeier.",
      },
      {
        q: "Um wie viel Uhr beginnen die Rennen?",
        a: "Der Zeitplan des Veranstalters nennt Uhrzeiten ohne Zeitzone. In deutscher Zeit bestätigte Startzeiten liegen noch nicht vor.",
      },
    ],
    related: ["/events/alpine-ski-wm-2027", "/events/nordische-ski-wm-2027", "/events/super-bowl-lxi", "/events/handball-wm-2027", "/valentinstag", "/rosenmontag"],
  },
  {
    slug: "super-bowl-lxi",
    title: "Super Bowl LXI",
    tafel: "Super Bowl LXI",
    question: "Wann ist der Super Bowl 2027?",
    nominativ: "Der Super Bowl LXI",
    bis: "bis zum Super Bowl LXI",
    heute: "Heute ist Super Bowl.",
    vorbei: "Der Super Bowl LXI ist gespielt.",
    rubrik: "sport",
    motif: "ball",
    start: "2027-02-14",
    ort: "SoFi Stadium, Inglewood bei Los Angeles",
    source: {
      label: "NFL: Super Bowl LXI im SoFi Stadium",
      url: "https://www.nfl.com/news/jay-z-to-headline-super-bowl-lxi-at-sofi-stadium-in-inglewood",
    },
    intro: `Der Super Bowl LXI wird am Sonntag, 14. Februar 2027, im SoFi Stadium in Inglewood bei Los Angeles gespielt. Das Datum ist das amerikanische. In Deutschland beginnt das Spiel voraussichtlich erst in der Nacht zum Montag, 15. Februar.

Eine Anstoßzeit hat die NFL noch nicht bestätigt. Der Zähler läuft deshalb bis zum Beginn des 14. Februar in deutscher Zeit, also etwas zu früh. Die Halbzeitshow bestreitet laut NFL Jay-Z.

Der 14. Februar ist außerdem [Valentinstag](/valentinstag). Wer beides unter einen Hut bringen muss, hat den Vorteil der Zeitverschiebung: Das Abendessen ist vorbei, lange bevor der erste Ball fliegt. Der Montag danach wird trotzdem hart.`,
    facts: [
      "Die NFL nennt Sonntag, den 14. Februar 2027, als Spieltag.",
      "Austragungsort ist das SoFi Stadium in Inglewood, Kalifornien.",
      "In der Halbzeit tritt laut NFL Jay-Z auf.",
      "Die Anstoßzeit ist noch nicht bestätigt.",
    ],
    faq: [
      {
        q: "Um wie viel Uhr beginnt der Super Bowl in Deutschland?",
        a: "Das steht noch nicht fest. Die NFL hat die Anstoßzeit nicht bestätigt. Wegen der Zeitverschiebung liegt der Beginn in Deutschland voraussichtlich in der Nacht zum 15. Februar.",
      },
      { q: "Wer tritt in der Halbzeitshow auf?", a: "Laut NFL bestreitet Jay-Z die Halbzeitshow." },
      { q: "Wo findet der Super Bowl LXI statt?", a: "Im SoFi Stadium in Inglewood im Großraum Los Angeles." },
    ],
    related: ["/valentinstag", "/events/handball-wm-2027", "/events/biathlon-wm-2027", "/events/champions-league-finale-2027", "/events/olympia-2028-eroeffnung", "/rosenmontag"],
  },
  {
    slug: "nordische-ski-wm-2027",
    title: "Nordische Ski-WM 2027",
    tafel: "Nordische Ski-WM",
    question: "Wann ist die Nordische Ski-WM 2027?",
    nominativ: "Die Nordische Ski-WM 2027",
    bis: "bis zur Nordischen Ski-WM 2027",
    heute: "Heute beginnt die Nordische Ski-WM.",
    laeuft: "Die Nordische Ski-WM läuft.",
    vorbei: "Die Nordische Ski-WM 2027 ist vorbei.",
    rubrik: "sport",
    motif: "flocke",
    start: "2027-02-24",
    ende: "2027-03-07",
    ort: "Falun, Schweden",
    source: { label: "Falun 2027: offizielle Website", url: "https://www.falun2027.com/en/" },
    intro: `Die Nordischen Ski-Weltmeisterschaften 2027 finden vom 24. Februar bis 7. März in Falun in Schweden statt. Den Zeitraum nennt der Veranstalter auf seiner Website, Schauplatz ist die Anlage Lugnet.

Zur nordischen WM gehören Skilanglauf, Skispringen und die Nordische Kombination. Ein Programm mit einzelnen Wettkampftagen haben wir nicht geprüft. Der Zähler läuft bis zum ersten Tag der WM.

Mit Falun endet ein dichter Wintersport-Februar, der mit der [Alpinen Ski-WM](/events/alpine-ski-wm-2027) beginnt und mit der [Biathlon-WM](/events/biathlon-wm-2027) weitergeht. Danach ist kalendarisch bald Schluss mit Winter: Der [Frühlingsanfang](/fruehlingsanfang) folgt zwei Wochen nach dem letzten Wettkampf.`,
    facts: [
      "Der Veranstalter nennt den 24. Februar bis 7. März 2027.",
      "Austragungsort ist die Anlage Lugnet in Falun, Schweden.",
      "Die WM beginnt an einem Mittwoch und endet an einem Sonntag.",
    ],
    faq: [
      { q: "Wo findet die Nordische Ski-WM 2027 statt?", a: "In Falun in Schweden, auf der Anlage Lugnet." },
      {
        q: "Welche Sportarten gehören zur Nordischen Ski-WM?",
        a: "Skilanglauf, Skispringen und die Nordische Kombination.",
      },
      {
        q: "Wann ist welcher Wettkampf?",
        a: "Ein tagesgenaues Programm haben wir nicht geprüft. Bestätigt ist der Zeitraum vom 24. Februar bis 7. März 2027.",
      },
    ],
    related: ["/events/biathlon-wm-2027", "/events/alpine-ski-wm-2027", "/events/formel-1-saisonstart-2027", "/events/vierschanzentournee-2026-27", "/fruehlingsanfang", "/frauentag"],
  },
  {
    slug: "formel-1-saisonstart-2027",
    title: "Formel-1-Saisonstart 2027",
    tafel: "Formel 1: Saisonstart",
    question: "Wann startet die Formel 1 2027?",
    nominativ: "Die Formel-1-Saison 2027",
    bis: "bis zum Saisonstart der Formel 1",
    heute: "Heute beginnt das erste Rennwochenende der Formel-1-Saison.",
    laeuft: "Das erste Rennwochenende der Formel-1-Saison läuft.",
    vorbei: "Die Formel-1-Saison 2027 hat begonnen.",
    rubrik: "sport",
    motif: "uhr",
    start: "2027-03-12",
    ende: "2027-03-14",
    ort: "Bahrain International Circuit, Sakhir",
    source: { label: "Formula 1: Rennkalender 2027", url: "https://www.formula1.com/en/racing/2027" },
    intro: `Die Formel-1-Saison 2027 beginnt mit dem Großen Preis von Bahrain am Wochenende vom 12. bis 14. März. Freitag ist der erste Trainingstag, das Rennen wird am Sonntag, 14. März, gefahren. So steht es im offiziellen Kalender.

Die Startzeit des Rennens ist noch nicht veröffentlicht. Der Zähler läuft deshalb bis zum Freitag des Rennwochenendes. Direkt im Anschluss folgt das Rennen in Saudi-Arabien, beide zusammen bilden den Auftakt.

Der Kalender umfasst 24 Rennen und endet erst vom 10. bis 12. Dezember in Abu Dhabi. Das sind neun Monate Sonntagsplanung. Welche Wochenenden sonst noch belegt sind, zeigt die [Übersicht aller Events](/events).`,
    facts: [
      "Erstes Rennen ist der Große Preis von Bahrain am Wochenende vom 12. bis 14. März 2027.",
      "Der Kalender 2027 umfasst 24 Rennen.",
      "Das Saisonfinale ist vom 10. bis 12. Dezember 2027 in Abu Dhabi.",
      "Die Wintertests finden Ende Februar in Bahrain statt.",
    ],
    faq: [
      {
        q: "Wann ist das erste Formel-1-Rennen 2027?",
        a: "Am Sonntag, 14. März 2027, in Bahrain. Das Rennwochenende beginnt am Freitag, 12. März.",
      },
      {
        q: "Um wie viel Uhr startet das Rennen in Bahrain?",
        a: "Die Startzeit ist noch nicht veröffentlicht.",
      },
      {
        q: "Wie viele Rennen hat die Saison 2027?",
        a: "24. Das letzte ist am 12. Dezember 2027 in Abu Dhabi.",
      },
    ],
    related: ["/events/nordische-ski-wm-2027", "/events/dfb-pokalfinale-2027", "/events/champions-league-finale-2027", "/events/tour-de-france-2027", "/fruehlingsanfang", "/zeitumstellung"],
  },
  {
    slug: "landtagswahl-schleswig-holstein-2027",
    title: "Landtagswahl Schleswig-Holstein 2027",
    tafel: "Wahl Schleswig-Holstein",
    question: "Wann ist die Landtagswahl in Schleswig-Holstein 2027?",
    nominativ: "Die Landtagswahl in Schleswig-Holstein",
    bis: "bis zur Landtagswahl in Schleswig-Holstein",
    heute: "Heute wählt Schleswig-Holstein einen neuen Landtag.",
    vorbei: "Die Landtagswahl 2027 in Schleswig-Holstein ist vorbei.",
    rubrik: "wahlen",
    motif: "urne",
    start: "2027-04-18",
    ort: "Schleswig-Holstein",
    source: { label: "Die Bundeswahlleiterin: Wahltermine", url: "https://www.bundeswahlleiterin.de/service/wahltermine.html" },
    intro: `Schleswig-Holstein wählt am Sonntag, 18. April 2027, einen neuen Landtag. Den Termin führt die Bundeswahlleiterin in ihrer Übersicht der Wahltermine, und dort stehen genaue Daten erst nach der offiziellen Bekanntgabe.

Am selben Tag wählt auch das Saarland. Eine Woche später folgt Nordrhein-Westfalen, Ende Mai Bremen. Das Frühjahr 2027 ist damit eines mit vier Landtagswahlen in sechs Wochen.

Wer am Wahltag nicht da ist, wählt per Brief. Die Unterlagen kommen mit der Wahlbenachrichtigung oder auf Antrag bei der Gemeinde. Die anderen Termine: [Landtagswahl im Saarland](/events/landtagswahl-saarland-2027) und [Landtagswahl in Nordrhein-Westfalen](/events/landtagswahl-nrw-2027).`,
    facts: [
      "Die Bundeswahlleiterin nennt als Wahltag den 18. April 2027, einen Sonntag.",
      "Am selben Tag wählt das Saarland seinen Landtag.",
      "Die Übersicht der Bundeswahlleiterin enthält genaue Termine erst nach ihrer offiziellen Bekanntgabe.",
    ],
    faq: [
      { q: "Wann ist die Landtagswahl in Schleswig-Holstein?", a: "Am Sonntag, 18. April 2027." },
      {
        q: "Wie lange haben die Wahllokale geöffnet?",
        a: "Die verlinkte Quelle nennt keine Uhrzeiten. Bei Wahlen in Deutschland sind die Wahllokale üblicherweise von 8 bis 18 Uhr geöffnet. Die genaue Zeit steht auf der Wahlbenachrichtigung.",
      },
      {
        q: "Welche Wahlen sind 2027 noch?",
        a: "Am 18. April auch im Saarland, am 25. April in Nordrhein-Westfalen, am 30. Mai in Bremen und am 26. September in Niedersachsen.",
      },
    ],
    related: ["/events/landtagswahl-saarland-2027", "/events/landtagswahl-nrw-2027", "/events/buergerschaftswahl-bremen-2027", "/events/landtagswahl-niedersachsen-2027", "/feiertage/schleswig-holstein", "/ferien/schleswig-holstein"],
  },
  {
    slug: "landtagswahl-saarland-2027",
    title: "Landtagswahl Saarland 2027",
    tafel: "Wahl Saarland",
    question: "Wann ist die Landtagswahl im Saarland 2027?",
    nominativ: "Die Landtagswahl im Saarland",
    bis: "bis zur Landtagswahl im Saarland",
    heute: "Heute wählt das Saarland einen neuen Landtag.",
    vorbei: "Die Landtagswahl 2027 im Saarland ist vorbei.",
    rubrik: "wahlen",
    motif: "urne",
    start: "2027-04-18",
    ort: "Saarland",
    source: { label: "Die Bundeswahlleiterin: Wahltermine", url: "https://www.bundeswahlleiterin.de/service/wahltermine.html" },
    intro: `Das Saarland wählt am Sonntag, 18. April 2027, einen neuen Landtag. Der Termin steht in der Übersicht der Bundeswahlleiterin, die Wahltage erst nach der offiziellen Bekanntgabe aufnimmt.

Der 18. April ist ein doppelter Wahlsonntag: Auch Schleswig-Holstein stimmt an diesem Tag ab. Eine Woche später folgt die Wahl in Nordrhein-Westfalen, Ende Mai die in Bremen. Im Herbst wählt dann noch Niedersachsen.

Briefwahl ist wie immer möglich, die Unterlagen gibt es mit der Wahlbenachrichtigung oder bei der Gemeinde. Alle Wahlen des Jahres stehen in der [Übersicht aller Events](/events).`,
    facts: [
      "Die Bundeswahlleiterin nennt als Wahltag den 18. April 2027, einen Sonntag.",
      "Am selben Tag wählt Schleswig-Holstein seinen Landtag.",
      "Eine Woche später, am 25. April 2027, wählt Nordrhein-Westfalen.",
    ],
    faq: [
      { q: "Wann ist die Landtagswahl im Saarland?", a: "Am Sonntag, 18. April 2027." },
      {
        q: "Wie lange haben die Wahllokale geöffnet?",
        a: "Die verlinkte Quelle nennt keine Uhrzeiten. Üblich sind bei Wahlen in Deutschland 8 bis 18 Uhr. Die genaue Zeit steht auf der Wahlbenachrichtigung.",
      },
      {
        q: "Ist der Wahltag ein Feiertag?",
        a: "Nein, aber Wahlen finden in Deutschland immer an einem Sonntag oder gesetzlichen Feiertag statt. Der 18. April 2027 ist ein Sonntag.",
      },
    ],
    related: ["/events/landtagswahl-schleswig-holstein-2027", "/events/landtagswahl-nrw-2027", "/events/buergerschaftswahl-bremen-2027", "/events/landtagswahl-niedersachsen-2027", "/feiertage/saarland", "/ferien/saarland"],
  },
  {
    slug: "landtagswahl-nrw-2027",
    title: "Landtagswahl NRW 2027",
    tafel: "Wahl Nordrhein-Westfalen",
    question: "Wann ist die Landtagswahl in NRW 2027?",
    nominativ: "Die Landtagswahl in Nordrhein-Westfalen",
    bis: "bis zur Landtagswahl in Nordrhein-Westfalen",
    heute: "Heute wählt Nordrhein-Westfalen einen neuen Landtag.",
    vorbei: "Die Landtagswahl 2027 in Nordrhein-Westfalen ist vorbei.",
    rubrik: "wahlen",
    motif: "urne",
    start: "2027-04-25",
    ort: "Nordrhein-Westfalen",
    source: {
      label: "Land NRW: Kabinett setzt Landtagswahl 2027 auf den 25. April fest",
      url: "https://www.land.nrw/pressemitteilung/kabinett-setzt-landtagswahl-2027-auf-den-25-april-fest",
    },
    intro: `Nordrhein-Westfalen wählt am Sonntag, 25. April 2027, einen neuen Landtag. Das Kabinett hat den Termin festgesetzt und am 24. Februar 2026 in einer Pressemitteilung bekannt gegeben.

Es ist die Wahl im bevölkerungsreichsten Bundesland und damit die mit den meisten Wahlberechtigten des Jahres. Entsprechend genau wird sie auch außerhalb des Landes beobachtet. Eine Woche vorher wählen Schleswig-Holstein und das Saarland.

Der Wahltag liegt am Wochenende vor dem 1. Mai. Wer an dem Sonntag nicht da ist, beantragt rechtzeitig Briefwahl. Die Nachbartermine: [Landtagswahl in Schleswig-Holstein](/events/landtagswahl-schleswig-holstein-2027) und [Bürgerschaftswahl in Bremen](/events/buergerschaftswahl-bremen-2027).`,
    facts: [
      "Die Landesregierung nennt den 25. April 2027 als Wahltag. Die Pressemitteilung dazu stammt vom 24. Februar 2026.",
      "Der 25. April 2027 ist ein Sonntag.",
      "Die Bundeswahlleiterin führt denselben Termin.",
    ],
    faq: [
      { q: "Wann ist die Landtagswahl in NRW?", a: "Am Sonntag, 25. April 2027." },
      {
        q: "Wer hat den Wahltermin festgelegt?",
        a: "Das Landeskabinett. Die Landesregierung hat den Termin am 24. Februar 2026 bekannt gegeben.",
      },
      {
        q: "Wie lange haben die Wahllokale geöffnet?",
        a: "Die Pressemitteilung nennt keine Uhrzeiten. Üblich sind bei Wahlen in Deutschland 8 bis 18 Uhr. Die genaue Zeit steht auf der Wahlbenachrichtigung.",
      },
    ],
    related: ["/events/landtagswahl-schleswig-holstein-2027", "/events/landtagswahl-saarland-2027", "/events/buergerschaftswahl-bremen-2027", "/events/landtagswahl-niedersachsen-2027", "/feiertage/nordrhein-westfalen", "/tag-der-arbeit"],
  },
  {
    slug: "esc-2027-finale",
    title: "ESC-Finale 2027",
    tafel: "ESC 2027: Finale",
    question: "Wann ist der ESC 2027?",
    nominativ: "Das Finale des Eurovision Song Contest 2027",
    bis: "bis zum ESC-Finale 2027",
    heute: "Heute ist das Finale des Eurovision Song Contest.",
    vorbei: "Der Eurovision Song Contest 2027 ist vorbei.",
    rubrik: "popkultur",
    motif: "mikro",
    start: "2027-05-15",
    ort: "Arena Burgas, Bulgarien",
    source: {
      label: "EBU: Burgas richtet den Eurovision Song Contest 2027 aus",
      url: "https://www.ebu.ch/news/2026/08/burgas-to-host-eurovision-song-contest-2027",
    },
    intro: `Das Finale des 71. Eurovision Song Contest ist am Samstag, 15. Mai 2027, in der Arena Burgas in Bulgarien. Die beiden Halbfinals finden am Dienstag, 11. Mai, und am Donnerstag, 13. Mai, statt. Das hat die Europäische Rundfunkunion im August 2026 bekannt gegeben.

Bulgarien ist Gastgeber, weil DARA den Wettbewerb 2026 in Wien mit dem Lied „Bangaranga“ gewonnen hat. Eine Uhrzeit nennt die Mitteilung nicht. Der Zähler läuft deshalb bis zum Beginn des Finaltags.

Das Finale fällt auf den Samstag vor [Pfingsten](/pfingsten). Wer am Sonntag ausschlafen muss, hat also Glück: Der Montag danach ist in ganz Deutschland frei.`,
    facts: [
      "Finale am Samstag, 15. Mai 2027, in der Arena Burgas.",
      "Halbfinals am 11. und 13. Mai 2027.",
      "Es ist der 71. Eurovision Song Contest.",
      "Bulgarien richtet aus, weil DARA 2026 in Wien mit „Bangaranga“ gewonnen hat.",
    ],
    faq: [
      {
        q: "Wo findet der ESC 2027 statt?",
        a: "In Burgas in Bulgarien, in der Arena Burgas.",
      },
      {
        q: "Wann sind die Halbfinals?",
        a: "Am Dienstag, 11. Mai, und am Donnerstag, 13. Mai 2027.",
      },
      {
        q: "Um wie viel Uhr beginnt das Finale?",
        a: "Die Mitteilung der Rundfunkunion nennt keine Uhrzeit. Eine bestätigte Anfangszeit liegt uns noch nicht vor.",
      },
    ],
    related: ["/pfingsten", "/events/dfb-pokalfinale-2027", "/events/rock-am-ring-2027", "/events/champions-league-finale-2027", "/muttertag", "/christi-himmelfahrt"],
  },
  {
    slug: "dfb-pokalfinale-2027",
    title: "DFB-Pokalfinale 2027",
    tafel: "DFB-Pokalfinale 2027",
    question: "Wann ist das DFB-Pokalfinale 2027?",
    nominativ: "Das DFB-Pokalfinale 2027",
    bis: "bis zum DFB-Pokalfinale 2027",
    heute: "Heute ist DFB-Pokalfinale.",
    vorbei: "Das DFB-Pokalfinale 2027 ist gespielt.",
    rubrik: "sport",
    motif: "pokal",
    start: "2027-05-29",
    startzeit: "20:00",
    ort: "Berlin",
    source: { label: "DFB: Rahmentermine DFB-Pokal 2026/27", url: "https://www.dfb.de/maenner/wettbewerbe/dfb-pokal/rahmentermine" },
    intro: `Das DFB-Pokalfinale 2027 wird am Samstag, 29. Mai, in Berlin gespielt. Der DFB nennt als Beginn 20 Uhr. Darauf zählt diese Seite, auf die Minute.

Bis dahin ist der Weg noch weit. Das Achtelfinale ist am 1. und 2. Dezember 2026, das Viertelfinale verteilt sich auf den 2. und 3. sowie den 9. und 10. Februar 2027, die Halbfinals folgen am 20. und 21. April. Wer im Finale steht, entscheidet sich also erst fünf Wochen vorher.

Für Fans mit Karte ist das Wochenende ein Kurzurlaub in Berlin. Eine Woche später folgt schon das nächste Endspiel: das [Champions-League-Finale in Madrid](/events/champions-league-finale-2027).`,
    facts: [
      "Der DFB nennt als Termin den 29. Mai 2027, Beginn ab 20 Uhr.",
      "Achtelfinale am 1. und 2. Dezember 2026, Viertelfinale im Februar 2027.",
      "Die Halbfinals sind am 20. und 21. April 2027.",
      "Das Finale 2028 ist für den 20. Mai 2028 angesetzt.",
    ],
    faq: [
      {
        q: "Um wie viel Uhr beginnt das Pokalfinale 2027?",
        a: "Laut DFB ab 20 Uhr am Samstag, 29. Mai 2027.",
      },
      { q: "Wo wird das Finale gespielt?", a: "In Berlin." },
      {
        q: "Wann sind die Halbfinals?",
        a: "Am 20. und 21. April 2027.",
      },
    ],
    related: ["/events/champions-league-finale-2027", "/events/dfb-pokalfinale-2028", "/events/bundesliga-start-2027-28", "/events/esc-2027-finale", "/events/fifa-frauen-wm-2027", "/feiertage/berlin"],
  },
  {
    slug: "buergerschaftswahl-bremen-2027",
    title: "Bürgerschaftswahl Bremen 2027",
    tafel: "Wahl Bremen",
    question: "Wann ist die Bürgerschaftswahl in Bremen 2027?",
    nominativ: "Die Bürgerschaftswahl in Bremen",
    bis: "bis zur Bürgerschaftswahl in Bremen",
    heute: "Heute wählt Bremen eine neue Bürgerschaft.",
    vorbei: "Die Bürgerschaftswahl 2027 in Bremen ist vorbei.",
    rubrik: "wahlen",
    motif: "urne",
    start: "2027-05-30",
    ort: "Bremen und Bremerhaven",
    source: { label: "Die Bundeswahlleiterin: Wahltermine", url: "https://www.bundeswahlleiterin.de/service/wahltermine.html" },
    intro: `Bremen wählt am Sonntag, 30. Mai 2027, eine neue Bürgerschaft. So heißt im kleinsten Bundesland das Landesparlament. Den Termin führt die Bundeswahlleiterin in ihrer Übersicht.

Gewählt wird in den beiden Städten des Landes, in Bremen und in Bremerhaven. Die Wahl ist die vierte Landtagswahl des Frühjahrs 2027, nach Schleswig-Holstein, dem Saarland und Nordrhein-Westfalen.

Der Wahlsonntag liegt am Ende einer Woche mit Feiertag: Am Donnerstag davor ist in mehreren Ländern Fronleichnam, in Bremen allerdings nicht. Wer dort wohnt, hat in dieser Woche nur einen Termin, und der ist im Wahllokal. Alle Feiertage des Landes: [Feiertage in Bremen](/feiertage/bremen).`,
    facts: [
      "Die Bundeswahlleiterin nennt als Wahltag den 30. Mai 2027, einen Sonntag.",
      "Gewählt wird in Bremen und Bremerhaven.",
      "Es ist die vierte Landtagswahl des Frühjahrs 2027.",
    ],
    faq: [
      { q: "Wann ist die Bürgerschaftswahl in Bremen?", a: "Am Sonntag, 30. Mai 2027." },
      {
        q: "Was ist die Bürgerschaft?",
        a: "Das Landesparlament des Bundeslands Bremen. In den Flächenländern heißt es Landtag, in Berlin Abgeordnetenhaus.",
      },
      {
        q: "Wie lange haben die Wahllokale geöffnet?",
        a: "Die verlinkte Quelle nennt keine Uhrzeiten. Üblich sind bei Wahlen in Deutschland 8 bis 18 Uhr. Die genaue Zeit steht auf der Wahlbenachrichtigung.",
      },
    ],
    related: ["/events/landtagswahl-nrw-2027", "/events/landtagswahl-schleswig-holstein-2027", "/events/landtagswahl-saarland-2027", "/events/landtagswahl-niedersachsen-2027", "/feiertage/bremen", "/ferien/bremen"],
  },
  {
    slug: "rock-am-ring-2027",
    title: "Rock am Ring 2027",
    tafel: "Rock am Ring",
    question: "Wann ist Rock am Ring 2027?",
    nominativ: "Rock am Ring 2027",
    bis: "bis Rock am Ring 2027",
    heute: "Heute beginnt Rock am Ring.",
    laeuft: "Rock am Ring läuft.",
    vorbei: "Rock am Ring 2027 ist vorbei.",
    rubrik: "feste",
    motif: "mikro",
    start: "2027-06-04",
    ende: "2027-06-06",
    ort: "Nürburgring, Rheinland-Pfalz",
    source: { label: "Rock am Ring: offizielle Informationen", url: "https://www.rock-am-ring.com/en/info" },
    intro: `Rock am Ring 2027 findet vom 4. bis 6. Juni am Nürburgring in der Eifel statt. Den Termin nennt der Veranstalter auf seiner Informationsseite. Es ist das erste Juniwochenende, von Freitag bis Sonntag.

Welche Bands spielen und ab wann die Campingplätze öffnen, haben wir nicht beim Veranstalter nachgelesen und lassen es deshalb weg. Beides steht auf der offiziellen Seite, sobald es feststeht.

Das Wetter am Ring ist eine eigene Disziplin. Erfahrene Besucher packen für alle vier Jahreszeiten, und zwar für denselben Nachmittag. Das Festival liegt gut zwei Wochen vor dem kalendarischen [Sommeranfang](/sommeranfang). Wer es lauter mag und länger warten kann: [Wacken Open Air](/events/wacken-open-air-2027) folgt Ende Juli.`,
    facts: [
      "Der Veranstalter nennt den 4. bis 6. Juni 2027.",
      "Das Festival findet am Nürburgring in Rheinland-Pfalz statt.",
      "Es dauert drei Tage, von Freitag bis Sonntag.",
    ],
    faq: [
      { q: "Wo findet Rock am Ring statt?", a: "Am Nürburgring in der Eifel, in Rheinland-Pfalz." },
      {
        q: "Wer spielt bei Rock am Ring 2027?",
        a: "Das Programm haben wir nicht beim Veranstalter geprüft. Bestätigte Bands stehen auf der offiziellen Seite des Festivals.",
      },
      { q: "An welchen Tagen ist Rock am Ring 2027?", a: "Von Freitag, 4. Juni, bis Sonntag, 6. Juni 2027." },
    ],
    related: ["/events/wacken-open-air-2027", "/events/champions-league-finale-2027", "/events/esc-2027-finale", "/events/kieler-woche-2027", "/sommeranfang", "/fronleichnam"],
  },
  {
    slug: "champions-league-finale-2027",
    title: "Champions-League-Finale 2027",
    tafel: "Champions-League-Finale",
    question: "Wann ist das Champions-League-Finale 2027?",
    nominativ: "Das Champions-League-Finale 2027",
    bis: "bis zum Champions-League-Finale 2027",
    heute: "Heute ist Champions-League-Finale.",
    vorbei: "Das Champions-League-Finale 2027 ist gespielt.",
    rubrik: "sport",
    motif: "pokal",
    start: "2027-06-05",
    ort: "Estadio Metropolitano, Madrid",
    source: {
      label: "UEFA: Finale der Champions League 2027 im Estadio Metropolitano",
      url: "https://www.uefa.com/uefachampionsleague/news/029d-1eb2d5faf53c-d67c9fed04fa-1000--2027-uefa-champions-league-final-estadio-metropolitano",
    },
    intro: `Das Finale der Champions League 2026/27 ist für Samstag, 5. Juni 2027, angesetzt. Gespielt wird im Estadio Metropolitano in Madrid, dem Stadion von Atlético. So steht es bei der UEFA.

Eine Anstoßzeit nennt die UEFA auf der Seite nicht. Der Zähler läuft deshalb bis zum Beginn des Finaltags in deutscher Zeit. Wer im Endspiel steht, weiß man ohnehin erst nach den Halbfinals im Frühjahr.

Das Finale ist das zweite große Endspiel innerhalb einer Woche. Am Samstag davor wird in Berlin das [DFB-Pokalfinale](/events/dfb-pokalfinale-2027) ausgetragen. Danach ist Sommerpause, bis im August die [Bundesliga wieder beginnt](/events/bundesliga-start-2027-28).`,
    facts: [
      "Die UEFA nennt als Termin Samstag, den 5. Juni 2027.",
      "Spielort ist das Estadio Metropolitano in Madrid, das Stadion von Atlético de Madrid.",
      "Die Anstoßzeit steht auf der Seite der UEFA nicht.",
    ],
    faq: [
      { q: "Wo ist das Champions-League-Finale 2027?", a: "Im Estadio Metropolitano in Madrid." },
      {
        q: "Um wie viel Uhr ist Anstoß?",
        a: "Die UEFA nennt auf der verlinkten Seite keine Anstoßzeit. Eine bestätigte Zeit liegt uns noch nicht vor.",
      },
      { q: "An welchem Wochentag ist das Finale?", a: "An einem Samstag, dem 5. Juni 2027." },
    ],
    related: ["/events/dfb-pokalfinale-2027", "/events/bundesliga-start-2027-28", "/events/fifa-frauen-wm-2027", "/events/uefa-euro-2028", "/events/rock-am-ring-2027", "/events/super-bowl-lxi"],
  },
  {
    slug: "kieler-woche-2027",
    title: "Kieler Woche 2027",
    tafel: "Kieler Woche",
    question: "Wann ist die Kieler Woche 2027?",
    nominativ: "Die Kieler Woche 2027",
    bis: "bis zur Kieler Woche 2027",
    heute: "Heute beginnt die Kieler Woche.",
    laeuft: "Die Kieler Woche läuft.",
    vorbei: "Die Kieler Woche 2027 ist vorbei.",
    rubrik: "feste",
    motif: "segel",
    start: "2027-06-19",
    ende: "2027-06-27",
    ort: "Kiel",
    source: { label: "Kieler Woche: offizielle Website", url: "https://www.kieler-woche.de/" },
    intro: `Die Kieler Woche 2027 dauert vom 19. bis 27. Juni. Den Zeitraum nennt die offizielle Website. Dass eine Woche hier neun Tage hat, gehört zur Tradition: Sie beginnt an einem Samstag und endet am Sonntag der Folgewoche.

Die Kieler Woche ist Segelregatta und Volksfest zugleich. Auf dem Wasser wird um Platzierungen gefahren, an Land um den besten Platz an der Kiellinie. Ein Programm mit einzelnen Terminen haben wir nicht geprüft, es steht beim Veranstalter.

In die Woche fällt der [Sommeranfang](/sommeranfang) mit dem längsten Tag des Jahres. Im Norden ist es dann bis spät in den Abend hell, was dem Fest nicht schadet. Ob währenddessen Ferien sind, zeigt die Seite [Schulferien in Schleswig-Holstein](/ferien/schleswig-holstein).`,
    facts: [
      "Die offizielle Website nennt den 19. bis 27. Juni 2027.",
      "Die Kieler Woche beginnt an einem Samstag und endet am Sonntag der folgenden Woche.",
      "In den Zeitraum fällt der astronomische Sommeranfang.",
    ],
    faq: [
      { q: "Wie lange dauert die Kieler Woche 2027?", a: "Neun Tage, von Samstag, 19. Juni, bis Sonntag, 27. Juni 2027." },
      { q: "Wo findet die Kieler Woche statt?", a: "In Kiel, der Landeshauptstadt von Schleswig-Holstein." },
      {
        q: "Wann sind die einzelnen Veranstaltungen?",
        a: "Das Programm haben wir nicht geprüft. Es steht auf der offiziellen Website der Kieler Woche.",
      },
    ],
    related: ["/sommeranfang", "/events/rock-am-ring-2027", "/events/wacken-open-air-2027", "/events/fifa-frauen-wm-2027", "/ferien/schleswig-holstein", "/feiertage/schleswig-holstein"],
  },
  {
    slug: "fifa-frauen-wm-2027",
    title: "Frauen-WM 2027",
    tafel: "Frauen-WM 2027",
    question: "Wann beginnt die Frauen-WM 2027?",
    nominativ: "Die Fußball-WM der Frauen 2027",
    bis: "bis zur Frauen-WM 2027",
    heute: "Heute beginnt die Fußball-WM der Frauen.",
    laeuft: "Die Fußball-WM der Frauen läuft.",
    vorbei: "Die Fußball-WM der Frauen 2027 ist vorbei.",
    rubrik: "sport",
    motif: "ball",
    start: "2027-06-24",
    ende: "2027-07-25",
    ort: "Brasilien, Eröffnung und Finale in Rio de Janeiro",
    source: {
      label: "FIFA: Termine der Frauen-WM 2027 in Brasilien bestätigt",
      url: "https://inside.fifa.com/media-releases/fifa-womens-world-cup-brazil-2027-dates-confirmed",
    },
    intro: `Die Fußball-Weltmeisterschaft der Frauen 2027 wird vom 24. Juni bis 25. Juli in Brasilien gespielt. Gastgeber Brasilien eröffnet das Turnier am Donnerstag, 24. Juni, im Maracanã in Rio de Janeiro. Dort findet auch das Finale statt.

Anstoßzeiten hat die FIFA noch nicht veröffentlicht. Brasilien liegt im Sommer fünf Stunden hinter Deutschland. Ein Abendspiel in Rio beginnt hier also mitten in der Nacht, und das Datum ist dann schon das des Folgetags.

Das Turnier hat 32 Mannschaften und acht Spielorte. Für die Sommerferien ist das eine gute Nachricht: In vielen Ländern fällt die zweite Turnierhälfte in die schulfreie Zeit, siehe [Sommerferien in allen Bundesländern](/ferien/sommerferien).`,
    facts: [
      "Die FIFA nennt den 24. Juni bis 25. Juli 2027.",
      "Eröffnungsspiel und Finale finden im Maracanã in Rio de Janeiro statt.",
      "32 Mannschaften spielen in acht Städten: Rio de Janeiro, São Paulo, Brasília, Porto Alegre, Recife, Salvador, Belo Horizonte und Fortaleza.",
      "Anstoßzeiten sind noch nicht veröffentlicht.",
    ],
    faq: [
      { q: "Wo findet die Frauen-WM 2027 statt?", a: "In Brasilien, in acht Städten. Eröffnungsspiel und Finale sind in Rio de Janeiro." },
      { q: "Wann ist das Finale?", a: "Am Sonntag, 25. Juli 2027, im Maracanã in Rio de Janeiro." },
      {
        q: "Um wie viel Uhr sind die Spiele in Deutschland zu sehen?",
        a: "Die Anstoßzeiten stehen noch nicht fest. Wegen fünf Stunden Zeitunterschied liegen Abendspiele in Brasilien nach deutscher Zeit in der Nacht.",
      },
    ],
    related: ["/events/champions-league-finale-2027", "/events/uefa-euro-2028", "/events/wimbledon-2027", "/events/tour-de-france-2027", "/events/bundesliga-start-2027-28", "/ferien/sommerferien"],
  },
  {
    slug: "wimbledon-2027",
    title: "Wimbledon 2027",
    tafel: "Wimbledon",
    question: "Wann ist Wimbledon 2027?",
    nominativ: "Wimbledon 2027",
    bis: "bis Wimbledon 2027",
    heute: "Heute beginnt Wimbledon.",
    laeuft: "Wimbledon läuft.",
    vorbei: "Wimbledon 2027 ist vorbei.",
    rubrik: "sport",
    motif: "ball",
    start: "2027-06-28",
    ende: "2027-07-11",
    ort: "All England Lawn Tennis Club, London",
    source: { label: "Wimbledon: Termine künftiger Turniere", url: "https://www.wimbledon.com/en_GB/atoz/dates.html" },
    intro: `Wimbledon 2027 wird vom 28. Juni bis 11. Juli gespielt. Die Termine veröffentlicht der All England Lawn Tennis Club Jahre im Voraus, und dort stehen auch schon die beiden folgenden Ausgaben.

Das Turnier beginnt an einem Montag und endet nach zwei Wochen an einem Sonntag. Wer wann spielt, entscheidet sich wie immer erst mit der Auslosung kurz vor Beginn und dann Tag für Tag mit dem Spielplan.

In denselben Tagen starten gleich zwei weitere Großereignisse: die [Fußball-WM der Frauen](/events/fifa-frauen-wm-2027) läuft schon, und am 2. Juli beginnt die [Tour de France](/events/tour-de-france-2027). Für Sport am Nachmittag ist im Juli 2027 gesorgt.`,
    facts: [
      "Der Veranstalter nennt den 28. Juni bis 11. Juli 2027.",
      "2028 läuft das Turnier vom 3. bis 16. Juli, 2029 vom 2. bis 15. Juli.",
      "Gespielt wird im All England Lawn Tennis Club in London.",
    ],
    faq: [
      { q: "Wann beginnt Wimbledon 2027?", a: "Am Montag, 28. Juni 2027. Das Turnier endet am Sonntag, 11. Juli." },
      { q: "Wann ist Wimbledon 2028?", a: "Vom 3. bis 16. Juli 2028." },
      { q: "Wo wird Wimbledon gespielt?", a: "Im All England Lawn Tennis Club im Londoner Stadtteil Wimbledon." },
    ],
    related: ["/events/tour-de-france-2027", "/events/fifa-frauen-wm-2027", "/events/kieler-woche-2027", "/events/olympia-2028-eroeffnung", "/sommeranfang", "/ferien/sommerferien"],
  },
  {
    slug: "tour-de-france-2027",
    title: "Tour de France 2027",
    tafel: "Tour de France",
    question: "Wann startet die Tour de France 2027?",
    nominativ: "Die Tour de France 2027",
    bis: "bis zum Start der Tour de France 2027",
    heute: "Heute startet die Tour de France.",
    laeuft: "Die Tour de France läuft.",
    vorbei: "Die Tour de France 2027 ist vorbei.",
    rubrik: "sport",
    motif: "rad",
    start: "2027-07-02",
    ende: "2027-07-25",
    ort: "Start in Edinburgh, Ziel in Paris",
    source: { label: "Tour de France: offizielle Website", url: "https://www.letour.fr/en/" },
    intro: `Die Tour de France 2027 beginnt am Freitag, 2. Juli, in Edinburgh und endet am Sonntag, 25. Juli, auf den Champs-Élysées in Paris. So steht es auf der offiziellen Website der Tour.

Der Auftakt findet in Großbritannien statt und dauert drei Tage. Die erste Etappe führt von Edinburgh nach Carlisle. Eine bestätigte Startzeit dafür liegt uns nicht vor, der Zähler läuft bis zum Beginn des ersten Tages.

Nach 21 Etappen ist in Paris Schluss. Fünf Tage später, am 30. Juli, startet in Leeds die Tour de France der Frauen. Wer die Etappen am Nachmittag verfolgen will, hat in vielen Bundesländern Rückenwind vom Kalender: Es sind [Sommerferien](/ferien/sommerferien).`,
    facts: [
      "Die Tour 2027 dauert vom 2. bis 25. Juli.",
      "Der Start findet vom 2. bis 4. Juli in Großbritannien statt. Die erste Etappe führt von Edinburgh nach Carlisle.",
      "Die 21. Etappe endet am 25. Juli auf den Champs-Élysées in Paris.",
      "Die Tour de France der Frauen startet am 30. Juli 2027 in Leeds.",
    ],
    faq: [
      { q: "Wo startet die Tour de France 2027?", a: "In Edinburgh in Schottland. Die erste Etappe führt nach Carlisle." },
      { q: "Wann endet die Tour de France 2027?", a: "Am Sonntag, 25. Juli 2027, in Paris." },
      {
        q: "Wann startet die Tour de France der Frauen?",
        a: "Am 30. Juli 2027 in Leeds, fünf Tage nach dem Ende der Tour der Männer.",
      },
    ],
    related: ["/events/wimbledon-2027", "/events/fifa-frauen-wm-2027", "/events/wacken-open-air-2027", "/events/sonnenfinsternis-2027", "/events/olympia-2028-eroeffnung", "/ferien/sommerferien"],
  },
  {
    slug: "wacken-open-air-2027",
    title: "Wacken Open Air 2027",
    tafel: "Wacken Open Air",
    question: "Wann ist Wacken 2027?",
    nominativ: "Das Wacken Open Air 2027",
    bis: "bis zum Wacken Open Air 2027",
    heute: "Heute beginnt das Wacken Open Air.",
    laeuft: "Das Wacken Open Air läuft.",
    vorbei: "Das Wacken Open Air 2027 ist vorbei.",
    rubrik: "feste",
    motif: "mikro",
    start: "2027-07-28",
    ende: "2027-07-31",
    ort: "Wacken, Schleswig-Holstein",
    source: {
      label: "Wacken Open Air: offizielle FAQ zum Termin 2027",
      url: "https://faq.wacken.com/en-us/43-w-o-a-2026/536-when-will-w-o-a-2026-take-place",
    },
    intro: `Das Wacken Open Air 2027 findet vom 28. bis 31. Juli statt, in Wacken in Schleswig-Holstein. Den Termin nennt der Veranstalter in seiner offiziellen FAQ. Es sind vier Tage, von Mittwoch bis Samstag.

Für ein Dorf mit rund zweitausend Einwohnern ist das der Ausnahmezustand des Jahres, und zwar ein erstaunlich geordneter. Programm, Anreise und Campingzeiten haben wir nicht geprüft. Sie stehen beim Veranstalter.

Zwei Tage nach dem letzten Akkord gibt es am Himmel etwas zu sehen: die [Sonnenfinsternis am 2. August 2027](/events/sonnenfinsternis-2027), in Deutschland teilweise. Wer das Festival am Sonntag hinter sich hat, kann am Montagvormittag also gleich wieder nach oben schauen.`,
    facts: [
      "Der Veranstalter nennt den 28. bis 31. Juli 2027.",
      "Das Festival findet in Wacken in Schleswig-Holstein statt.",
      "Es dauert vier Tage, von Mittwoch bis Samstag.",
    ],
    faq: [
      { q: "Wo liegt Wacken?", a: "In Schleswig-Holstein, im Kreis Steinburg nordwestlich von Hamburg." },
      { q: "An welchen Tagen ist Wacken 2027?", a: "Von Mittwoch, 28. Juli, bis Samstag, 31. Juli 2027." },
      {
        q: "Wer spielt in Wacken 2027?",
        a: "Das Programm haben wir nicht geprüft. Bestätigte Bands stehen auf der Seite des Veranstalters.",
      },
    ],
    related: ["/events/rock-am-ring-2027", "/events/sonnenfinsternis-2027", "/events/tour-de-france-2027", "/events/gamescom-2027", "/events/kieler-woche-2027", "/ferien/schleswig-holstein"],
  },
  {
    slug: "sonnenfinsternis-2027",
    title: "Sonnenfinsternis 2027",
    tafel: "Sonnenfinsternis",
    question: "Wann ist die Sonnenfinsternis 2027?",
    nominativ: "Die Sonnenfinsternis",
    bis: "bis zur Sonnenfinsternis am 2. August 2027",
    heute: "Heute ist Sonnenfinsternis.",
    vorbei: "Die Sonnenfinsternis vom 2. August 2027 ist vorbei.",
    rubrik: "astronomie",
    motif: "finsternis",
    start: "2027-08-02",
    ort: "total in Südspanien und Nordafrika, in Deutschland partiell",
    source: {
      label: "NASA: Sonnenfinsternisse 2021 bis 2030",
      url: "https://eclipse.gsfc.nasa.gov/SEdecade/SEdecade2021.html",
    },
    intro: `Am Montag, 2. August 2027, verfinstert sich die Sonne. Total ist die Finsternis nur in einem schmalen Streifen, der unter anderem über Südspanien, Marokko und Ägypten verläuft. Dort dauert die Totalität laut NASA bis zu 6 Minuten und 23 Sekunden, ungewöhnlich lang.

Deutschland liegt außerhalb dieses Streifens. Hier schiebt sich der Mond nur vor einen Teil der Sonne, am Vormittag. Nach eigener Berechnung aus den Daten der NASA beginnt das je nach Ort ungefähr zwischen 10:05 und 10:20 Uhr und erreicht gegen 11:10 Uhr den Höhepunkt. Bedeckt wird etwa ein Drittel bis die Hälfte der Sonnenscheibe, im Süden mehr als im Norden.

Auch bei einer teilweisen Finsternis gilt: nie ohne geprüfte Finsternisbrille in die Sonne schauen. Die nächste Gelegenheit kommt am [1. Juni 2030](/events/sonnenfinsternis-2030).`,
    facts: [
      "Die NASA führt für den 2. August 2027 eine totale Sonnenfinsternis mit bis zu 6 Minuten 23 Sekunden Totalität.",
      "Die Zone der Totalität verläuft unter anderem über Südspanien, Marokko, Algerien, Libyen und Ägypten.",
      "In Deutschland ist die Finsternis nur partiell zu sehen, an einem Montagvormittag.",
      "Nach eigener Berechnung aus den NASA-Daten werden in Deutschland ungefähr 28 Prozent (Rügen) bis 54 Prozent (Bodensee) der Sonnenscheibe bedeckt.",
    ],
    faq: [
      {
        q: "Ist die Sonnenfinsternis 2027 in Deutschland zu sehen?",
        a: "Ja, aber nur teilweise. Je nach Ort wird ungefähr ein Drittel bis gut die Hälfte der Sonnenscheibe bedeckt. Total ist die Finsternis nur weiter südlich, etwa in Südspanien.",
      },
      {
        q: "Um wie viel Uhr ist die Finsternis in Deutschland?",
        a: "Ungefähr zwischen 10 und 12:15 Uhr, mit dem Höhepunkt gegen 11:10 Uhr. In Berlin beginnt sie nach unserer Berechnung etwa um 10:17 Uhr. Die genauen Zeiten hängen vom Ort ab.",
      },
      {
        q: "Brauche ich eine Schutzbrille?",
        a: "Ja, unbedingt, auch bei einer teilweisen Finsternis. Sonnenbrillen reichen nicht. Geeignet sind nur zertifizierte Finsternisbrillen oder spezielle Sonnenfilter.",
      },
    ],
    related: ["/events/sonnenfinsternis-2030", "/events/perseiden-2027", "/events/mondfinsternis-2028-12-31", "/events/mondfinsternis-2029-12-20", "/events/wacken-open-air-2027", "/sommeranfang"],
  },
  {
    slug: "perseiden-2027",
    title: "Perseiden 2027",
    tafel: "Perseiden: Maximum",
    question: "Wann sind die Perseiden 2027?",
    nominativ: "Das Maximum der Perseiden",
    bis: "bis zum Maximum der Perseiden 2027",
    heute: "Heute erreichen die Perseiden ihr Maximum.",
    vorbei: "Das Maximum der Perseiden 2027 ist vorbei.",
    rubrik: "astronomie",
    motif: "sternschnuppe",
    start: "2027-08-13",
    startzeit: "10:00",
    ort: "Nordhalbkugel, in Deutschland sichtbar",
    source: {
      label: "International Meteor Organization: Meteorstrom-Kalender 2027",
      url: "https://www.imo.net/files/meteor-shower/cal2027.pdf",
    },
    intro: `Die Perseiden erreichen 2027 ihr Maximum am Freitag, 13. August, zwischen 10 und 12 Uhr deutscher Zeit. Das ist die Angabe der International Meteor Organization. Der Zähler läuft bis zum Beginn dieses Zeitfensters.

Der Haken ist offensichtlich: Um diese Zeit ist es in Deutschland taghell. Für Beobachter zählen deshalb die Nächte davor und danach, vom 12. auf den 13. und vom 13. auf den 14. August. Aktiv ist der Strom ohnehin viel länger, vom 17. Juli bis zum 24. August.

Dazu kommt 2027 der Mond. Er steht laut Kalender zwischen erstem Viertel und Vollmond und hellt den Himmel auf. Das dunkle Zeitfenster ist kurz. Elf Tage vorher gibt es tagsüber etwas zu sehen: die [Sonnenfinsternis am 2. August](/events/sonnenfinsternis-2027).`,
    facts: [
      "Maximum am 13. August 2027 zwischen 10 und 12 Uhr deutscher Zeit, laut International Meteor Organization.",
      "Die Perseiden sind vom 17. Juli bis 24. August 2027 aktiv.",
      "Unter idealen Bedingungen nennt die Organisation eine Rate von mehr als 110 Meteoren pro Stunde.",
      "Der Mond steht um das Maximum zwischen erstem Viertel und Vollmond und stört die Beobachtung.",
    ],
    faq: [
      {
        q: "In welcher Nacht sieht man die meisten Sternschnuppen?",
        a: "Weil das Maximum 2027 auf den Vormittag fällt, bieten sich die Nächte vom 12. auf den 13. und vom 13. auf den 14. August an.",
      },
      {
        q: "Wie lange sind die Perseiden zu sehen?",
        a: "Der Strom ist vom 17. Juli bis 24. August aktiv. Deutlich mehr Sternschnuppen als sonst gibt es in den Nächten um den 13. August.",
      },
      {
        q: "Stört der Mond 2027?",
        a: "Ja. Er steht zwischen erstem Viertel und Vollmond. Das Zeitfenster mit dunklem Himmel ist dadurch kurz.",
      },
    ],
    related: ["/events/sonnenfinsternis-2027", "/events/mondfinsternis-2028-12-31", "/events/mondfinsternis-2029-12-20", "/events/gamescom-2027", "/mariae-himmelfahrt", "/ferien/sommerferien"],
  },
  {
    slug: "bundesliga-start-2027-28",
    title: "Bundesliga-Start 2027/28",
    tafel: "Bundesliga-Start",
    question: "Wann startet die Bundesliga 2027/28?",
    nominativ: "Die Bundesliga-Saison 2027/28",
    bis: "bis zum Bundesliga-Start 2027/28",
    heute: "Heute beginnt die Bundesliga-Saison.",
    vorbei: "Die Bundesliga-Saison 2027/28 hat begonnen.",
    rubrik: "sport",
    motif: "ball",
    start: "2027-08-20",
    ort: "Deutschland",
    source: {
      label: "DFL: Rahmenterminkalender der Saison 2027/28",
      url: "https://www.bundesliga.com/de/bundesliga/news/rahmenterminkalender-saison-2027-28-auftakt-39772",
    },
    intro: `Die Bundesliga-Saison 2027/28 beginnt am Freitag, 20. August 2027, mit dem Eröffnungsspiel. Der erste Spieltag läuft bis Sonntag, 22. August. So steht es im Rahmenterminkalender der DFL.

Wer das Eröffnungsspiel bestreitet und um wie viel Uhr, steht erst mit dem Spielplan fest. Die 2. Bundesliga ist früher dran und startet schon am 30. Juli. Der Supercup wird am 14. August gespielt, die erste Runde im DFB-Pokal vom 13. bis 16. August.

Die Winterpause beginnt nach dem 15. Spieltag kurz vor Weihnachten und endet am 7. Januar 2028. Der letzte Spieltag ist am 13. Mai 2028, eine Woche vor dem [DFB-Pokalfinale 2028](/events/dfb-pokalfinale-2028).`,
    facts: [
      "Eröffnungsspiel am Freitag, 20. August 2027. Der erste Spieltag dauert bis zum 22. August.",
      "Die 2. Bundesliga startet am 30. Juli 2027, der Supercup ist am 14. August.",
      "Winterpause nach dem 15. Spieltag (17. bis 19. Dezember 2027), weiter geht es am 7. Januar 2028.",
      "Letzter Spieltag ist Samstag, der 13. Mai 2028.",
    ],
    faq: [
      {
        q: "Wer spielt das Eröffnungsspiel?",
        a: "Das steht erst mit dem Spielplan fest. Bestätigt ist bisher nur der Termin, der 20. August 2027.",
      },
      { q: "Wann startet die 2. Bundesliga 2027/28?", a: "Am 30. Juli 2027." },
      { q: "Wann ist der letzte Spieltag?", a: "Am Samstag, 13. Mai 2028." },
    ],
    related: ["/events/dfb-pokalfinale-2028", "/events/champions-league-finale-2027", "/events/uefa-euro-2028", "/events/gamescom-2027", "/events/dfb-pokalfinale-2027", "/wochenende"],
  },
  {
    slug: "gamescom-2027",
    title: "gamescom 2027",
    tafel: "gamescom",
    question: "Wann ist die gamescom 2027?",
    nominativ: "Die gamescom 2027",
    bis: "bis zur gamescom 2027",
    heute: "Heute beginnt die gamescom.",
    laeuft: "Die gamescom läuft.",
    vorbei: "Die gamescom 2027 ist vorbei.",
    rubrik: "games",
    motif: "gamepad",
    start: "2027-08-23",
    ende: "2027-08-29",
    ort: "Koelnmesse, Köln",
    source: { label: "gamescom: offizielle Website", url: "https://www.gamescom.global/en" },
    intro: `Die gamescom 2027 findet vom 23. bis 29. August in Köln statt. Für das Publikum öffnet die Messe allerdings erst am Donnerstag, 26. August. Beide Angaben stehen auf der offiziellen Website.

Die Tage davor gehören Fachbesuchern und Veranstaltungen rund um die Messe. Wer als Besucher plant, rechnet also mit vier Tagen von Donnerstag bis Sonntag. Der Zähler oben läuft bis zum offiziellen Beginn am Montag. Bis zum ersten Publikumstag sind es drei Tage mehr.

Die Veranstalter bezeichnen die gamescom als weltgrößtes Event für Computer- und Videospiele. In Nordrhein-Westfalen sind zu diesem Zeitpunkt noch Ferien, die Hallen werden also nicht leerer: [Sommerferien in Nordrhein-Westfalen](/ferien/sommerferien/nordrhein-westfalen).`,
    facts: [
      "Die gamescom 2027 läuft vom 23. bis 29. August.",
      "Für das Publikum ist sie vom 26. bis 29. August 2027 geöffnet.",
      "Veranstaltungsort ist die Koelnmesse in Köln.",
    ],
    faq: [
      {
        q: "Ab wann darf das Publikum auf die gamescom 2027?",
        a: "Ab Donnerstag, 26. August 2027. Die Messe selbst beginnt offiziell schon am Montag, 23. August.",
      },
      { q: "Wo findet die gamescom statt?", a: "In der Koelnmesse in Köln." },
      { q: "Wie lange dauert die gamescom für Besucher?", a: "Vier Tage, von Donnerstag, 26. August, bis Sonntag, 29. August 2027." },
    ],
    related: ["/events/gta-6-release", "/events/bundesliga-start-2027-28", "/events/perseiden-2027", "/events/oktoberfest-2027", "/ferien/sommerferien/nordrhein-westfalen", "/feiertage/nordrhein-westfalen"],
  },
  {
    slug: "oktoberfest-2027",
    title: "Oktoberfest 2027",
    tafel: "Oktoberfest",
    question: "Wann beginnt das Oktoberfest 2027?",
    nominativ: "Das Oktoberfest 2027",
    bis: "bis zum Oktoberfest 2027",
    heute: "Heute beginnt das Oktoberfest. O’zapft is.",
    laeuft: "Das Oktoberfest läuft.",
    vorbei: "Das Oktoberfest 2027 ist vorbei.",
    rubrik: "feste",
    motif: "krug",
    start: "2027-09-18",
    startzeit: "12:00",
    ende: "2027-10-03",
    ort: "Theresienwiese, München",
    source: { label: "oktoberfest.de: offizielle Website der Landeshauptstadt München", url: "https://www.oktoberfest.de/" },
    intro: `Das Oktoberfest 2027 beginnt am Samstag, 18. September, und endet am Sonntag, 3. Oktober. Ausgeschenkt wird am ersten Tag ab 12 Uhr, nach dem Anstich. Darauf zählt diese Seite, auf die Minute.

Es ist das 192. Oktoberfest. Dass es größtenteils im September stattfindet, hat mit dem Wetter zu tun: Das Fest wurde vorverlegt, weil die Abende dann milder sind. Geblieben ist das Ende am ersten Sonntag im Oktober. 2027 ist das zugleich der Tag der Deutschen Einheit.

Der letzte Festtag ist damit ein Feiertag, der allerdings auf einen Sonntag fällt. Mehr dazu beim [Tag der Deutschen Einheit](/tag-der-deutschen-einheit). Ob die Kinder währenddessen frei haben, zeigen die [Schulferien in Bayern](/ferien/bayern).`,
    facts: [
      "Das Oktoberfest 2027 dauert vom 18. September bis 3. Oktober.",
      "Der Ausschank beginnt am Eröffnungstag nach dem Anstich um 12 Uhr.",
      "Es ist das 192. Oktoberfest.",
      "Der letzte Tag fällt auf den Tag der Deutschen Einheit, einen Sonntag.",
    ],
    faq: [
      { q: "Um wie viel Uhr ist der Anstich?", a: "Am Samstag, 18. September 2027, um 12 Uhr. Erst danach wird ausgeschenkt." },
      { q: "Wie lange dauert das Oktoberfest 2027?", a: "16 Tage, vom 18. September bis zum 3. Oktober 2027." },
      { q: "Wo findet das Oktoberfest statt?", a: "Auf der Theresienwiese in München." },
    ],
    related: ["/tag-der-deutschen-einheit", "/herbstanfang", "/events/frankfurter-buchmesse-2027", "/events/landtagswahl-niedersachsen-2027", "/ferien/bayern", "/feiertage/bayern"],
  },
  {
    slug: "landtagswahl-niedersachsen-2027",
    title: "Landtagswahl Niedersachsen 2027",
    tafel: "Wahl Niedersachsen",
    question: "Wann ist die Landtagswahl in Niedersachsen 2027?",
    nominativ: "Die Landtagswahl in Niedersachsen",
    bis: "bis zur Landtagswahl in Niedersachsen",
    heute: "Heute wählt Niedersachsen einen neuen Landtag.",
    vorbei: "Die Landtagswahl 2027 in Niedersachsen ist vorbei.",
    rubrik: "wahlen",
    motif: "urne",
    start: "2027-09-26",
    startzeit: "08:00",
    ort: "Niedersachsen",
    source: {
      label: "Niedersächsische Staatskanzlei: Landtag wird am 26. September 2027 neu gewählt",
      url: "https://www.stk.niedersachsen.de/startseite/presseinformationen/der-niedersachsische-landtag-wird-am-26-september-2027-neu-gewahlt-253008.html",
    },
    intro: `Niedersachsen wählt am Sonntag, 26. September 2027, einen neuen Landtag. Die Wahllokale sind von 8 bis 18 Uhr geöffnet. Beides hat die Staatskanzlei am 11. August 2026 mitgeteilt.

Der Zähler läuft bis zur Öffnung der Wahllokale um 8 Uhr. Wer bis 18 Uhr nicht im Wahllokal war, hat seine Stimme verschenkt. Danach beginnt die Auszählung, und die ersten Prognosen kommen wie immer wenige Sekunden nach der Schließung.

Es ist die letzte Landtagswahl des Jahres 2027, nach vier Wahlen im Frühjahr. Die Herbstferien beginnen in Niedersachsen erst Wochen später, verreist sein kann man trotzdem: Dafür gibt es die Briefwahl. Die Termine stehen unter [Schulferien in Niedersachsen](/ferien/niedersachsen).`,
    facts: [
      "Wahltag ist Sonntag, der 26. September 2027.",
      "Die Wahllokale sind von 8 bis 18 Uhr geöffnet.",
      "Die Staatskanzlei hat den Termin am 11. August 2026 bekannt gegeben.",
    ],
    faq: [
      { q: "Wann ist die Landtagswahl in Niedersachsen?", a: "Am Sonntag, 26. September 2027, von 8 bis 18 Uhr." },
      { q: "Bis wann kann man wählen?", a: "Bis 18 Uhr. Dann schließen die Wahllokale." },
      {
        q: "Welche Wahlen waren 2027 davor?",
        a: "Im Frühjahr wählen Schleswig-Holstein und das Saarland (18. April), Nordrhein-Westfalen (25. April) und Bremen (30. Mai).",
      },
    ],
    related: ["/events/buergerschaftswahl-bremen-2027", "/events/landtagswahl-nrw-2027", "/events/landtagswahl-schleswig-holstein-2027", "/events/oktoberfest-2027", "/feiertage/niedersachsen", "/ferien/niedersachsen"],
  },
  {
    slug: "frankfurter-buchmesse-2027",
    title: "Frankfurter Buchmesse 2027",
    tafel: "Frankfurter Buchmesse",
    question: "Wann ist die Frankfurter Buchmesse 2027?",
    nominativ: "Die Frankfurter Buchmesse 2027",
    bis: "bis zur Frankfurter Buchmesse 2027",
    heute: "Heute beginnt die Frankfurter Buchmesse.",
    laeuft: "Die Frankfurter Buchmesse läuft.",
    vorbei: "Die Frankfurter Buchmesse 2027 ist vorbei.",
    rubrik: "feste",
    motif: "buch",
    start: "2027-10-06",
    ende: "2027-10-10",
    ort: "Messe Frankfurt",
    source: { label: "Frankfurter Buchmesse: offizielle Website", url: "https://www.buchmesse.de/" },
    intro: `Die Frankfurter Buchmesse 2027 findet vom 6. bis 10. Oktober statt. Den Termin nennt die Messe auf ihrer Website bei den künftigen Terminen. Ehrengast ist Chile.

Die Messe beginnt an einem Mittwoch und endet an einem Sonntag. An welchen Tagen sie für das allgemeine Publikum geöffnet ist, haben wir nicht geprüft. Das steht rechtzeitig beim Veranstalter. Der Zähler läuft bis zum ersten Messetag.

Für Leser ist der Termin vor allem ein Hinweis darauf, dass der Stapel neben dem Bett bald wieder wächst. Die Messe beginnt drei Tage nach dem [Tag der Deutschen Einheit](/tag-der-deutschen-einheit). In Hessen sind dann schon Ferien, siehe [Herbstferien in Hessen](/ferien/herbstferien/hessen).`,
    facts: [
      "Die Buchmesse nennt den 6. bis 10. Oktober 2027.",
      "Ehrengast 2027 ist Chile.",
      "Die Messe dauert fünf Tage, von Mittwoch bis Sonntag.",
    ],
    faq: [
      { q: "Wer ist Ehrengast der Buchmesse 2027?", a: "Chile." },
      { q: "Wo findet die Buchmesse statt?", a: "Auf dem Gelände der Messe Frankfurt in Frankfurt am Main." },
      {
        q: "An welchen Tagen darf das Publikum auf die Messe?",
        a: "Das haben wir nicht geprüft. Die Publikumstage stehen auf der Website der Buchmesse.",
      },
    ],
    related: ["/tag-der-deutschen-einheit", "/events/oktoberfest-2027", "/events/landtagswahl-niedersachsen-2027", "/ferien/herbstferien/hessen", "/herbstanfang", "/halloween"],
  },
  {
    slug: "dfb-pokalfinale-2028",
    title: "DFB-Pokalfinale 2028",
    tafel: "DFB-Pokalfinale 2028",
    question: "Wann ist das DFB-Pokalfinale 2028?",
    nominativ: "Das DFB-Pokalfinale 2028",
    bis: "bis zum DFB-Pokalfinale 2028",
    heute: "Heute ist DFB-Pokalfinale.",
    vorbei: "Das DFB-Pokalfinale 2028 ist gespielt.",
    rubrik: "sport",
    motif: "pokal",
    start: "2028-05-20",
    ort: "Olympiastadion Berlin",
    source: {
      label: "DFL: Rahmenterminkalender der Saison 2027/28",
      url: "https://www.bundesliga.com/de/bundesliga/news/rahmenterminkalender-saison-2027-28-auftakt-39772",
    },
    intro: `Das DFB-Pokalfinale 2028 wird am Samstag, 20. Mai 2028, im Berliner Olympiastadion ausgetragen. Der Termin steht im Rahmenterminkalender für die Saison 2027/28, den die DFL veröffentlicht hat.

Eine Anstoßzeit nennt der Kalender nicht. Der Zähler läuft deshalb bis zum Beginn des Finaltags. Auch sonst ist noch alles offen: Die erste Runde dieses Wettbewerbs wird erst im August 2027 gespielt.

Das Finale liegt eine Woche nach dem letzten Bundesliga-Spieltag und knapp drei Wochen vor dem Beginn der [Europameisterschaft 2028](/events/uefa-euro-2028). Wer vorher noch ein Endspiel sehen will, muss nicht so lange warten: Das [DFB-Pokalfinale 2027](/events/dfb-pokalfinale-2027) ist ein Jahr früher.`,
    facts: [
      "Das Finale ist für Samstag, den 20. Mai 2028, angesetzt.",
      "Gespielt wird im Berliner Olympiastadion.",
      "Der letzte Bundesliga-Spieltag der Saison ist eine Woche vorher, am 13. Mai 2028.",
    ],
    faq: [
      { q: "Wo wird das Pokalfinale 2028 gespielt?", a: "Im Olympiastadion in Berlin." },
      { q: "Um wie viel Uhr ist Anstoß?", a: "Der Rahmenterminkalender nennt keine Uhrzeit. Sie steht noch nicht fest." },
      { q: "Wann ist das Finale 2027?", a: "Am Samstag, 29. Mai 2027, ab 20 Uhr in Berlin." },
    ],
    related: ["/events/dfb-pokalfinale-2027", "/events/uefa-euro-2028", "/events/bundesliga-start-2027-28", "/events/olympia-2028-eroeffnung", "/events/champions-league-finale-2027", "/feiertage/berlin"],
  },
  {
    slug: "uefa-euro-2028",
    title: "EM 2028",
    tafel: "Fußball-EM 2028",
    question: "Wann beginnt die EM 2028?",
    nominativ: "Die Fußball-Europameisterschaft 2028",
    bis: "bis zur EM 2028",
    heute: "Heute beginnt die Fußball-EM.",
    laeuft: "Die Fußball-EM läuft.",
    vorbei: "Die Fußball-EM 2028 ist vorbei.",
    rubrik: "sport",
    motif: "ball",
    start: "2028-06-09",
    ende: "2028-07-09",
    ort: "Großbritannien und Irland, Eröffnung in Cardiff",
    source: {
      label: "UEFA: Spielplan der EURO 2028 bestätigt",
      url: "https://de.uefa.com/euro2028/news/029f-1f2f36424d97-2486810a0d57-1000--euro-2028-tournament-schedule-confirmed-when-and-where-a/",
    },
    intro: `Die Fußball-Europameisterschaft 2028 beginnt am Freitag, 9. Juni 2028, mit dem Eröffnungsspiel in Cardiff und endet am Sonntag, 9. Juli, mit dem Finale im Londoner Wembley-Stadion. Gastgeber sind Großbritannien und Irland. Den Spielplan hat die UEFA bestätigt.

Für das Finale steht die Anstoßzeit schon fest: 18 Uhr deutscher Zeit. Die des Eröffnungsspiels wird erst nach der Auslosung festgelegt. Gespielt wird im Turnier um 15, 18 und 21 Uhr deutscher Zeit, das ist alltagstauglicher als bei mancher WM.

24 Mannschaften bestreiten 51 Spiele in neun Stadien. Fünf Tage nach dem Finale beginnen schon die [Olympischen Spiele in Los Angeles](/events/olympia-2028-eroeffnung). Der Sommer 2028 ist damit verplant.`,
    facts: [
      "Eröffnungsspiel am 9. Juni 2028 im National Stadium of Wales in Cardiff.",
      "Finale am 9. Juli 2028 in Wembley, Anstoß um 18 Uhr deutscher Zeit. Dort finden auch die Halbfinals am 4. und 5. Juli statt.",
      "24 Mannschaften, 51 Spiele, neun Stadien in acht Städten.",
      "Die Spiele beginnen um 15, 18 oder 21 Uhr deutscher Zeit.",
    ],
    faq: [
      { q: "Wo findet die EM 2028 statt?", a: "In Großbritannien und Irland. Das Eröffnungsspiel ist in Cardiff, das Finale in London." },
      { q: "Wann ist das EM-Finale 2028?", a: "Am Sonntag, 9. Juli 2028, um 18 Uhr deutscher Zeit im Wembley-Stadion." },
      {
        q: "Um wie viel Uhr ist das Eröffnungsspiel?",
        a: "Das steht noch nicht fest. Die UEFA legt die Zeit erst nach der Auslosung der Endrunde fest.",
      },
    ],
    related: ["/events/olympia-2028-eroeffnung", "/events/dfb-pokalfinale-2028", "/events/fifa-frauen-wm-2027", "/events/champions-league-finale-2027", "/events/bundesliga-start-2027-28", "/ferien/sommerferien"],
  },
  {
    slug: "olympia-2028-eroeffnung",
    title: "Olympia 2028",
    tafel: "Olympia 2028 Los Angeles",
    question: "Wann beginnen die Olympischen Spiele 2028?",
    nominativ: "Die Olympischen Sommerspiele 2028",
    mehrzahl: true,
    bis: "bis zu den Olympischen Spielen 2028",
    heute: "Heute beginnen die Olympischen Spiele in Los Angeles.",
    laeuft: "Die Olympischen Spiele laufen.",
    vorbei: "Die Olympischen Sommerspiele 2028 sind vorbei.",
    rubrik: "sport",
    motif: "fackel",
    start: "2028-07-15",
    startzeit: "02:00",
    ende: "2028-07-31",
    ort: "Los Angeles, USA",
    source: {
      label: "LA28: Wettkampfplan der Olympischen Spiele",
      url: "https://la28.org/en/newsroom/la28-reveals-comprehensive-olympic-competition-schedule.html",
    },
    intro: `Die Olympischen Sommerspiele 2028 in Los Angeles beginnen mit der Eröffnungsfeier am 14. Juli um 17 Uhr Ortszeit. In Deutschland ist es dann schon Samstag, 15. Juli 2028, 2 Uhr nachts. Auf diesen Moment zählt die Seite.

Neun Stunden Zeitunterschied prägen die ganzen Spiele. Was in Kalifornien am Nachmittag stattfindet, läuft hier in der Nacht. Die Schlussfeier am 30. Juli um 18 Uhr Ortszeit beginnt nach deutscher Zeit am 31. Juli um 3 Uhr.

Gekämpft wird an 49 Sportstätten im Großraum Los Angeles und in Oklahoma City. Einzelne Wettbewerbe beginnen schon vor der Eröffnungsfeier. Kurz davor endet die [Fußball-EM 2028](/events/uefa-euro-2028), nur fünf Tage liegen dazwischen.`,
    facts: [
      "Eröffnungsfeier am 14. Juli 2028 um 17 Uhr Ortszeit, das ist der 15. Juli, 2 Uhr deutscher Zeit.",
      "Schlussfeier am 30. Juli 2028 um 18 Uhr Ortszeit, nach deutscher Zeit am 31. Juli um 3 Uhr.",
      "Die Wettkämpfe finden an 49 Sportstätten im Raum Los Angeles und in Oklahoma City statt.",
      "Baseball beginnt bereits vor der Eröffnungsfeier.",
    ],
    faq: [
      {
        q: "Um wie viel Uhr ist die Eröffnungsfeier in Deutschland zu sehen?",
        a: "In der Nacht zum Samstag, 15. Juli 2028, um 2 Uhr deutscher Zeit. In Los Angeles ist es dann 17 Uhr am 14. Juli.",
      },
      { q: "Wie lange dauern die Spiele?", a: "Nach Ortszeit vom 14. bis 30. Juli 2028, nach deutscher Zeit vom 15. bis 31. Juli." },
      {
        q: "Warum sind viele Wettkämpfe nachts?",
        a: "Los Angeles liegt im Sommer neun Stunden hinter Deutschland. Ein Finale um 19 Uhr Ortszeit beginnt hier um 4 Uhr morgens.",
      },
    ],
    related: ["/events/uefa-euro-2028", "/events/dfb-pokalfinale-2028", "/events/super-bowl-lxi", "/events/fifa-frauen-wm-2027", "/events/wimbledon-2027", "/ferien/sommerferien"],
  },
  {
    slug: "mondfinsternis-2028-12-31",
    title: "Mondfinsternis Silvester 2028",
    tafel: "Mondfinsternis 31.12.2028",
    question: "Wann ist die Mondfinsternis an Silvester 2028?",
    nominativ: "Die totale Mondfinsternis",
    bis: "bis zur Mondfinsternis an Silvester 2028",
    heute: "Heute Abend ist totale Mondfinsternis.",
    vorbei: "Die Mondfinsternis vom 31. Dezember 2028 ist vorbei.",
    rubrik: "astronomie",
    motif: "mond",
    start: "2028-12-31",
    startzeit: "16:08",
    ort: "in ganz Deutschland zu sehen",
    source: {
      label: "NASA: Totale Mondfinsternis am 31. Dezember 2028",
      url: "https://eclipse.gsfc.nasa.gov/LEplot/LEplot2001/LE2028Dec31T.pdf",
    },
    intro: `An Silvester 2028 gibt es das erste Feuerwerk schon am frühen Abend, und es ist lautlos: eine totale Mondfinsternis. Um 16:08 Uhr deutscher Zeit tritt der Mond in den Kernschatten der Erde, von 17:16 bis 18:28 Uhr ist er vollständig verfinstert.

In Deutschland geht der Mond ungefähr zu Beginn der Finsternis auf. Die Totalität selbst ist nach den Angaben der NASA im ganzen Land zu sehen, tief am Osthimmel und mit der typischen rötlichen Färbung. Um 19:36 Uhr ist alles vorbei.

Zeitlich passt das gut. Die Finsternis endet, lange bevor der Sekt kalt gestellt werden muss. Was danach kommt, zählt der [Countdown bis Neujahr](/neujahr).`,
    facts: [
      "Beginn der partiellen Phase um 16:08 Uhr deutscher Zeit, Ende um 19:36 Uhr.",
      "Die Totalität dauert von 17:16 bis 18:28 Uhr, also 1 Stunde und 11 Minuten. Das Maximum ist um 17:52 Uhr.",
      "Mitteleuropa liegt laut NASA in der Zone, in der der Mond während der Finsternis aufgeht.",
      "Anders als bei einer Sonnenfinsternis braucht man keinen Augenschutz.",
    ],
    faq: [
      {
        q: "Ist die Mondfinsternis an Silvester 2028 in Deutschland zu sehen?",
        a: "Ja. Der Mond geht um den Beginn der Finsternis auf, die totale Phase ist in ganz Deutschland sichtbar, freie Sicht nach Osten vorausgesetzt.",
      },
      {
        q: "Wann ist der Mond ganz verfinstert?",
        a: "Von 17:16 bis 18:28 Uhr deutscher Zeit, mit dem Maximum um 17:52 Uhr.",
      },
      {
        q: "Warum wird der Mond rot?",
        a: "Die Erdatmosphäre lenkt einen Teil des Sonnenlichts in den Erdschatten. Blaues Licht wird dabei herausgestreut, rotes kommt durch und färbt den Mond.",
      },
    ],
    related: ["/silvester", "/neujahr", "/events/mondfinsternis-2029-06-26", "/events/mondfinsternis-2029-12-20", "/events/sonnenfinsternis-2027", "/events/sonnenfinsternis-2030"],
  },
  {
    slug: "mondfinsternis-2029-06-26",
    title: "Mondfinsternis Juni 2029",
    tafel: "Mondfinsternis Juni 2029",
    question: "Wann ist die Mondfinsternis im Juni 2029?",
    nominativ: "Die totale Mondfinsternis",
    bis: "bis zur Mondfinsternis am 26. Juni 2029",
    heute: "Heute früh ist totale Mondfinsternis.",
    vorbei: "Die Mondfinsternis vom 26. Juni 2029 ist vorbei.",
    rubrik: "astronomie",
    motif: "mond",
    start: "2029-06-26",
    startzeit: "03:32",
    ort: "in Deutschland bei Monduntergang",
    source: {
      label: "NASA: Totale Mondfinsternis am 26. Juni 2029",
      url: "https://eclipse.gsfc.nasa.gov/LEplot/LEplot2001/LE2029Jun26T.pdf",
    },
    intro: `In den frühen Morgenstunden des 26. Juni 2029 verfinstert sich der Mond total. Um 3:32 Uhr deutscher Sommerzeit beginnt die partielle Phase, um 4:31 Uhr die Totalität. Sie dauert 1 Stunde und 42 Minuten und gehört damit zu den langen.

Der Haken für Deutschland: Der Mond geht währenddessen unter, und gleichzeitig wird es hell. Zu sehen ist deshalb vor allem der Anfang. Je weiter südwestlich man steht, desto länger bleibt der Mond über dem Horizont.

Wer dafür nicht um halb vier aufstehen will, bekommt ein halbes Jahr später eine bequemere Gelegenheit: die [Mondfinsternis am 20. Dezember 2029](/events/mondfinsternis-2029-12-20), am späten Abend und in voller Länge sichtbar.`,
    facts: [
      "Beginn der partiellen Phase um 3:32 Uhr, Beginn der Totalität um 4:31 Uhr deutscher Sommerzeit.",
      "Die Totalität dauert 1 Stunde und 42 Minuten, das Maximum ist um 5:22 Uhr.",
      "Europa liegt laut NASA in der Zone, in der der Mond während der Finsternis untergeht.",
      "In Deutschland sind deshalb vor allem die partielle Phase und der Beginn der Totalität zu sehen.",
    ],
    faq: [
      {
        q: "Ist die Mondfinsternis im Juni 2029 in Deutschland zu sehen?",
        a: "Nur zum Teil. Der Mond geht während der Totalität unter, außerdem beginnt die Morgendämmerung. Am besten ist die Sicht im Südwesten mit freiem Blick zum Horizont.",
      },
      { q: "Wann beginnt die Finsternis?", a: "Die partielle Phase um 3:32 Uhr, die totale um 4:31 Uhr deutscher Sommerzeit." },
      { q: "Brauche ich einen Augenschutz?", a: "Nein. Eine Mondfinsternis kann man gefahrlos mit bloßem Auge oder einem Fernglas beobachten." },
    ],
    related: ["/events/mondfinsternis-2029-12-20", "/events/mondfinsternis-2028-12-31", "/events/sonnenfinsternis-2030", "/events/sonnenfinsternis-2027", "/events/perseiden-2027", "/sommeranfang"],
  },
  {
    slug: "mondfinsternis-2029-12-20",
    title: "Mondfinsternis Dezember 2029",
    tafel: "Mondfinsternis Dez. 2029",
    question: "Wann ist die Mondfinsternis im Dezember 2029?",
    nominativ: "Die totale Mondfinsternis",
    bis: "bis zur Mondfinsternis am 20. Dezember 2029",
    heute: "Heute Nacht ist totale Mondfinsternis.",
    vorbei: "Die Mondfinsternis vom 20. Dezember 2029 ist vorbei.",
    rubrik: "astronomie",
    motif: "mond",
    start: "2029-12-20",
    startzeit: "21:55",
    ort: "in ganz Deutschland vollständig zu sehen",
    source: {
      label: "NASA: Totale Mondfinsternis am 20. Dezember 2029",
      url: "https://eclipse.gsfc.nasa.gov/LEplot/LEplot2001/LE2029Dec20T.pdf",
    },
    intro: `Am Abend des 20. Dezember 2029 ist in Deutschland eine totale Mondfinsternis von Anfang bis Ende zu sehen. Um 21:55 Uhr tritt der Mond in den Kernschatten der Erde. Total verfinstert ist er von 23:15 Uhr bis 0:09 Uhr, das Maximum ist um 23:42 Uhr.

Das Besondere ist die Bequemlichkeit. Der Mond steht hoch am Winterhimmel, es ist längst dunkel, und niemand muss den Wecker stellen. Ganz Europa liegt nach den Karten der NASA in der Zone, in der die Finsternis vollständig sichtbar ist.

Von den drei totalen Mondfinsternissen zwischen 2028 und 2029 ist es die einzige, die hierzulande in voller Länge zu sehen ist. Vier Tage später ist [Heiligabend](/heiligabend). Ein Blick nach oben kostet nichts und passt in jede Adventsplanung.`,
    facts: [
      "Beginn der partiellen Phase um 21:55 Uhr deutscher Zeit, Ende am 21. Dezember um 1:29 Uhr.",
      "Die Totalität dauert 54 Minuten, von 23:15 bis 0:09 Uhr.",
      "Ganz Europa liegt laut NASA in der Zone, in der die gesamte Finsternis sichtbar ist.",
    ],
    faq: [
      {
        q: "Ist die Mondfinsternis im Dezember 2029 in Deutschland zu sehen?",
        a: "Ja, in voller Länge und im ganzen Land, sofern der Himmel klar ist.",
      },
      { q: "Wann ist der Höhepunkt?", a: "Um 23:42 Uhr deutscher Zeit am 20. Dezember 2029." },
      { q: "Wie lange dauert die totale Phase?", a: "54 Minuten, von 23:15 Uhr bis 0:09 Uhr." },
    ],
    related: ["/events/mondfinsternis-2029-06-26", "/events/mondfinsternis-2028-12-31", "/events/sonnenfinsternis-2030", "/heiligabend", "/winteranfang", "/4-advent"],
  },
  {
    slug: "sonnenfinsternis-2030",
    title: "Sonnenfinsternis 2030",
    tafel: "Sonnenfinsternis 2030",
    question: "Wann ist die Sonnenfinsternis 2030?",
    nominativ: "Die Sonnenfinsternis",
    bis: "bis zur Sonnenfinsternis am 1. Juni 2030",
    heute: "Heute früh ist Sonnenfinsternis.",
    vorbei: "Die Sonnenfinsternis vom 1. Juni 2030 ist vorbei.",
    rubrik: "astronomie",
    motif: "finsternis",
    start: "2030-06-01",
    ort: "ringförmig von Nordafrika bis Japan, in Deutschland partiell",
    source: {
      label: "NASA: Sonnenfinsternisse 2021 bis 2030",
      url: "https://eclipse.gsfc.nasa.gov/SEdecade/SEdecade2021.html",
    },
    intro: `Am Samstag, 1. Juni 2030, gibt es eine ringförmige Sonnenfinsternis. Ringförmig heißt: Der Mond steht zu weit von der Erde entfernt, um die Sonne ganz zu bedecken. Um ihn herum bleibt ein leuchtender Ring. Zu sehen ist das laut NASA in einem Streifen von Algerien und Tunesien über Griechenland und die Türkei bis nach Japan.

In Deutschland ist die Finsternis partiell, und zwar früh am Morgen. Nach eigener Berechnung aus den Daten der NASA beginnt sie je nach Ort ungefähr zwischen 6:15 und 6:25 Uhr und erreicht gegen 7:20 Uhr ihren Höhepunkt. Bedeckt wird etwa die Hälfte bis knapp zwei Drittel der Sonnenscheibe.

Das ist mehr als bei der [Sonnenfinsternis am 2. August 2027](/events/sonnenfinsternis-2027). Die Schutzbrille von damals lässt sich wiederverwenden, sofern sie unbeschädigt ist.`,
    facts: [
      "Die NASA führt für den 1. Juni 2030 eine ringförmige Sonnenfinsternis, die Ringphase dauert bis zu 5 Minuten 21 Sekunden.",
      "Die Zone der Ringförmigkeit verläuft unter anderem über Algerien, Tunesien, Griechenland, die Türkei, Russland und Japan.",
      "In Deutschland ist die Finsternis partiell, am frühen Samstagmorgen.",
      "Nach eigener Berechnung aus den NASA-Daten werden ungefähr 50 Prozent (Flensburg) bis 62 Prozent (München) der Sonnenscheibe bedeckt.",
    ],
    faq: [
      {
        q: "Ist die Sonnenfinsternis 2030 in Deutschland zu sehen?",
        a: "Ja, als partielle Finsternis. Ungefähr die Hälfte bis knapp zwei Drittel der Sonnenscheibe werden bedeckt, im Süden mehr als im Norden.",
      },
      {
        q: "Um wie viel Uhr ist die Finsternis in Deutschland?",
        a: "Ungefähr von 6:15 bis 8:30 Uhr deutscher Sommerzeit, mit dem Höhepunkt gegen 7:20 Uhr. Die genauen Zeiten hängen vom Ort ab.",
      },
      {
        q: "Was ist eine ringförmige Sonnenfinsternis?",
        a: "Der Mond steht dabei so weit von der Erde entfernt, dass er die Sonne nicht ganz verdeckt. Um den dunklen Mond bleibt ein heller Ring aus Sonnenlicht.",
      },
    ],
    related: ["/events/sonnenfinsternis-2027", "/events/mondfinsternis-2029-12-20", "/events/mondfinsternis-2029-06-26", "/events/mondfinsternis-2028-12-31", "/events/perseiden-2027", "/sommeranfang"],
  },
];
