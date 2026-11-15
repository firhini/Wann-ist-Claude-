# DECISIONS.md

Jede größere Entscheidung mit kurzer Begründung. Neueste Phase unten.

> Die Seite heißt seit dem 15.11.2026 **Nochtage** (`nochtage.de`). In den Abschnitten zu Phase 1 bis 6 steht
> noch der Arbeitsname Zeitblatt, so wie er zum Zeitpunkt der Entscheidung galt. Siehe letzter Abschnitt.

## Phase 1: Fundament

**Markenname: Zeitblatt.** Kurz, deutsch, verbindet Zeit mit dem Kalenderblatt, um das sich das Design dreht.
Eine DNS-Abfrage am 15.11.2026 lieferte für `zeitblatt.de` keinen Eintrag (NXDOMAIN), `fallblatt.de`, `bisdahin.de`
und `blattfall.de` sind dagegen vergeben. Das ist ein Indiz, keine Garantie: vor dem Start bei der DENIC prüfen.
Der Name steht nur in `site.config.ts` (`name`, `domain`).

**Die große Zahl zählt Kalendertage, nicht volle 24-Stunden-Blöcke.** Am 15. November sind es bis zum
25. Dezember 40 Tage, so wie jeder im Kalender zählt („noch 40-mal schlafen“) und wie Google die Frage beantwortet.
Eine Zerlegung in „39 Tage 14 Std 22 Min“ würde dieselbe Spanne mit einer kleineren Tageszahl zeigen und für die
Suchfrage „wie viele Tage bis …“ eine Zahl liefern, die um eins danebenliegt. Die Uhr darunter zeigt deshalb
Stunden, Minuten und Sekunden bis Mitternacht, mit dem Satz „bis das nächste Blatt fällt. Dann sind es noch 39.“
Das sind dieselben Ziffern wie in der Zerlegung, nur ehrlich beschriftet, und es passt zum Abreißkalender.
Hat ein Termin eine Uhrzeit (Anpfiff, eigener Countdown), zählt die Seite am letzten Tag Stunden, dann Minuten.

**Weihnachten = 25. Dezember, zwei Tage lang.** Der 1. Weihnachtstag ist der gesetzliche Feiertag, und es gibt
eine eigene Seite für Heiligabend. Zwei Seiten mit demselben Ziel wären Duplikate. Die Weihnachtsseite zeigt in
der Fahrplanspalte zusätzlich „Heiligabend in X Tagen“. Am 25. und 26. steht „Heute ist Weihnachten“.

**Schriften wie vorgeschlagen:** Big Shoulders Display, Atkinson Hyperlegible Next, Martian Mono. Das Trio
trägt das Konzept (Signage, Lesbarkeit, Fahrplan), ein Tausch hätte nichts verbessert. Die Dateien stammen aus
den Fontsource-Paketen und liegen als WOFF2 im Repo (`app/fonts`), eingebunden mit `next/font/local`. So braucht
weder der Build noch der Browser eine Verbindung zu Google. Für Martian Mono gibt es eine metrisch angepasste
Ersatzschrift (`size-adjust: 116.67%`), sonst verschob das Nachladen einen Button (CLS 0,002 → 0).

**Orchid minimal angepasst: `#D6409F` → `#D8439F`.** Mit dem Startwert erreichte Tinte auf Orchid
(Heute-Marker, Textmarkierung) nur 4,40:1. Der neue Wert schafft 4,51:1, Orchid auf Papier bleibt bei 3,42:1.
Geprüft mit `npm run contrast`. Orchid ist in beiden Farbmodi gleich.

**Die Hauptzahl skaliert mit der Stellenzahl.** `clamp(7rem, 34vw, 22rem)` bleibt der Token und gilt für
drei Stellen (auf Mobil leicht angehoben). Zwei Ziffern in einer schmalen Schrift füllten damit auf dem Handy nur
ein Drittel der Breite und auf dem Desktop 40 % der Höhe, entgegen „die Zahl füllt die Breite“ und „läuft fast
über die volle Höhe“. Ein- und zweistellige Zahlen bekommen deshalb `clamp(11rem, 56vw, 28rem)`,
vierstellige `clamp(6rem, 30vw, 18rem)`.

**URLs:** Countdowns liegen direkt unter der Wurzel (`/weihnachten`, `/wochenende`), wie in der Seitenliste des
Auftrags eingerückt. Kurz, ohne Jahreszahl, die Kategorie steht in den Brotkrumen.

**ISR plus Tageswechsel.** Alle Seiten sind statisch mit `revalidate = 3600`. ISR liefert dem ersten Besucher
nach Ablauf aber noch die alte Fassung. Auf selten besuchten Seiten könnte Google so eine Tageszahl von vorgestern
sehen. Deshalb verwirft ein Vercel-Cron kurz nach Mitternacht deutscher Zeit alle Seiten
(`/api/tageswechsel`, zwei Einträge für Sommer- und Winterzeit in `vercel.json`). Optional per `CRON_SECRET` geschützt.

**Der Client rechnet selbst.** Der Zähler bekommt Start und Ende des nächsten und des übernächsten Termins
und die Serverzeit. Er rendert zuerst exakt den Serverstand (keine Hydration-Fehler) und rechnet dann mit der
echten Uhrzeit weiter, in Europe/Berlin über `@date-fns/tz`. Liegt eine Seite über Mitternacht offen, springt sie von selbst.

**OG-Bilder über eine Route (`/og`) statt `opengraph-image.tsx` pro Segment.** Eine Stelle für alle
Seitentypen und für eigene Countdowns, kein Bild-Rendering für hunderte Seiten im Build. Das CDN hält jedes Bild
eine Stunde. Die Schriften dafür liegen als WOFF in `assets/og` (Satori liest kein WOFF2).

**Sitemap-Index von Hand.** Next erzeugt mit `generateSitemaps` keine Indexdatei. `/sitemap.xml` ist deshalb
ein Route Handler, der auf `/sitemaps/<kategorie>.xml` verweist. Beides entsteht aus `/data`.

**`/c` und `/embed` sind nicht per robots.txt gesperrt, sondern tragen `noindex`.** Eine gesperrte Seite kann
Google nicht lesen, also auch das `noindex` nicht.

**Datenmodell erweitert.** Zum Typ aus dem Auftrag kommen hinzu: `pfad`, `bis` und `heute` (Satzbausteine,
weil „bis zum 1. Advent“ und „bis Weihnachten“ grammatisch verschieden sind), `art` (Tag oder Zeitraum),
`datumImJahr` (für die Jahrestabelle), `gesetzlich`, `uhrzeit`, `zeilen`, `faqDynamisch`. `intro` darf einfache
Links `[Text](/pfad)` enthalten, damit Fließtext intern verlinken kann.

**Jahreszeiten:** Tagundnachtgleichen und Sonnenwenden 2026 bis 2036 kommen vom U.S. Naval Observatory
(`scripts/fetch-jahreszeiten.mjs` → `data/jahreszeiten.json`), nicht aus einer selbst gebauten Näherung.

**Reichweitenmessung:** `@vercel/analytics`, cookiefrei. Die Komponente wird nur auf Vercel gerendert, lokal gäbe es sonst einen 404 in der Konsole.

**Playwright** ist als Dev-Abhängigkeit auf 1.63.0 festgelegt, passend zum vorinstallierten Chromium. Statt
`@playwright/test` gibt es zwei schlanke Skripte: `scripts/screenshots.mjs` und `scripts/smoke.mjs`.

## Phase 2: Ferien

**Quelle der Ferientermine: nur die Kultusministerkonferenz.** `data/ferien.json` wurde aus den KMK-PDFs für
2026/27, 2027/28 und 2028/29 sowie der langfristigen Sommerferienregelung (für 2030) gelesen: 276 Einträge,
310 Zeiträume. Jeder Zeitraum wurde maschinell gegen die OpenHolidays API geprüft: 310 von 310 identisch.
Die API ist nur Prüfinstrument, zitiert wird die KMK. Details und offene Punkte in `data/ferien-pruefbericht.md`.
Für 2029/30 gibt es noch keinen KMK-Kalender, deshalb stehen dort nur die Sommerferien, als „vorläufig“ markiert.

**Hauptzeitraum und Zusatztage.** Die KMK führt in einer Spalte oft mehrere Teile, etwa „07.05. + 18.05.–19.05.“.
Teile, zwischen denen nur Wochenenden und Feiertage liegen, werden zu einem Zeitraum zusammengefasst. Von den
übrigen ist der längste der Hauptzeitraum, auf den der Countdown zählt. Die anderen erscheinen als
„dazu frei“ in Text und Tabelle. So zählt „Pfingstferien Berlin“ nicht auf einen einzelnen Brückentag im Mai.

**Bayerns Frühjahrsferien stehen unter Winterferien.** Die KMK führt die Februarwoche in der Spalte
„Ostern/Frühjahr“. Sie liegt Wochen vor Ostern, und gesucht wird sie als Winter- oder Faschingsferien.
Deshalb gibt es `/ferien/winterferien/bayern`, mit Hinweis auf die Herkunft der Zuordnung.

**Nur Seiten mit Terminen.** Hat ein Land eine Ferienart laut KMK nicht (Winterferien in Hessen, Pfingstferien
in Rheinland-Pfalz), gibt es keine Seite. Aus 6 × 16 = 96 möglichen werden so 89 echte. Die Hubs sagen ausdrücklich,
welche Länder fehlen.

**Zusätzliche Seiten: `/ferien/<bundesland>` (16) und `/schule` (Hub).** „Schulferien Bayern“ ist eine eigene,
häufige Suche, die der Seitenbaum des Auftrags nicht abdeckte. Ferienart und Bundesland teilen sich das Segment
`/ferien/[slug]`, die Namen überschneiden sich nicht. Der Schul-Hub sorgt dafür, dass die 16 Schulanfang-Seiten
zwei Klicks von der Startseite entfernt sind.

**Schulanfang ist berechnet, nicht recherchiert:** der erste Tag nach den Sommerferien, der weder Wochenende noch
gesetzlicher Feiertag im Land ist. Grundlage ist der KMK-Sommertermin. Die Seiten sagen deutlich, dass die
Einschulung der Erstklässler ein eigener Termin der Schule ist.

**Einmalige Inhalte je Ferienseite** entstehen aus den Daten: Dauer, freie Tage am Stück mit Wochenenden und
Feiertagen, erster Schultag danach, Feiertage in den Ferien, Rang im Ländervergleich, Länder mit gleichem Start,
Folgejahr, fehlende Ferienarten des Landes. Dazu kommt ein redaktioneller Absatz je Ferienart.

**Lange Titel ohne Markennamen.** Ab 50 Zeichen wird „| Zeitblatt“ nicht angehängt. Ferientitel lassen bei
langen Ländernamen zusätzlich die Klammer „(noch X Tage)“ weg. Der Smoke-Test bricht bei mehr als 70 Zeichen ab.

**Feiertage je Land** (`data/feiertage-laender.ts`) sind aus den Feiertagsgesetzen der Länder zusammengestellt.
Regionale Sonderfälle (Fronleichnam in Teilen Sachsens und Thüringens, Mariä Himmelfahrt in Teilen Bayerns) sind
als „teilweise“ markiert und zählen nicht als landesweit frei. Berlins einmaliger Feiertag am 17. Juni 2028 ist
enthalten (Gesetz vom 10. Juli 2024, laut Recherche auf berlin.de bestätigt).

## Phase 3: Feiertage, Jahreszeiten, Alltag

**25 weitere Feste, zwei davon über den Auftrag hinaus.** Zur Liste kamen Ostermontag, Pfingstmontag, Tag der
Arbeit, Heilige Drei Könige, Buß- und Bettag, Mariä Himmelfahrt, Frauentag, Weltkindertag, Aschermittwoch und der
Karnevalsbeginn (11.11., 11:11 Uhr) hinzu. Ohne sie wären die Länderseiten lückenhaft: Jeder gesetzliche Feiertag
eines Landes soll eine eigene Seite haben, auf die die Tabelle verlinkt.

**Texte mit Faktenprüfung.** Die Texte für 25 Feste entstanden in zwei parallelen Schreibdurchgängen nach der
Vorlage der Wintersaison. Vorgabe: nur gesichertes Wissen, keine Umfragen, unsichere Jahreszahlen per Suche prüfen
oder vorsichtig formulieren. Datumsbereiche beweglicher Feste wurden mit `lib/feiertage.ts` nachgerechnet.
Danach habe ich alle Fakten gegengelesen. Bewusst vage blieben: Ursprung der Weiberfastnacht (Beuel 1824, „der
Überlieferung nach“), Thesenanschlag („nicht sicher belegt“), Narrenzahl Elf („gesichert ist keine Erklärung“).

**Quelle für bundesweite Feiertage:** die BMI-Seite „Nationale Feiertage“. Sie existiert und listet die neun
bundeseinheitlichen Feiertage. Sie blockt allerdings automatische Abrufe ohne Cookie, Link-Checker melden dort
fälschlich Fehler.

**Vatertag und Christi Himmelfahrt haben getrennte Seiten,** obwohl das Datum dasselbe ist. Es sind zwei
verschiedene Suchen mit verschiedenen Fragen (Brauch und Bollerwagen hier, Kirchenfest und Feiertagsrecht dort).
Ebenso Halloween und Reformationstag.

**Jahreszeiten zählen auf die Minute.** Astronomischer Beginn laut U.S. Naval Observatory, umgerechnet in
deutsche Zeit. Der meteorologische Beginn steht daneben in der Fahrplanspalte.

**Zeitumstellung zählt bis 1:00 Uhr UTC,** dem Moment der Umstellung laut EU-Richtlinie. Angezeigt wird
„von 2 auf 3 Uhr“ bzw. „von 3 auf 2 Uhr“, weil eine einzelne Uhrzeit hier in die Irre führt.
Quelle ist die PTB (die zuerst notierte Unterseite gab es nicht, verlinkt ist jetzt die geprüfte Übersichtsseite).

**Alltag mit festen, nachlesbaren Regeln.** Wochenende ab Samstag 0 Uhr, Feierabend montags bis freitags
17 Uhr, Monatsende am letzten Kalendertag. Der Zahltag (`/payday`) folgt § 24 Abs. 1 TVöD: letzter Tag des
Monats, bei Samstag, Feiertag oder 31. Dezember der Werktag davor, bei Sonntag der zweite Werktag davor.
Einen gesetzlichen Zahltag für alle gibt es nicht. Die Seite sagt das im ersten Satz und nennt die Regel beim Namen.

**`/feiertage/<bundesland>` als Countdown zum nächsten Feiertag des Landes,** mit Tabellen für das laufende
und das nächste Jahr, Brückentagen (Feiertag am Dienstag oder Donnerstag) und den Feiertagen, die aufs
Wochenende fallen. Regionale Feiertage stehen in der Tabelle, zählen aber nicht für den Countdown.

## Phase 4: Datumsseiten und Kalenderwochen

**366 Datumsseiten mit Inhalten, die nur für dieses Datum gelten:** Tag im Jahr (auch für Schaltjahre),
Wochentage der nächsten sechs Jahre, Kalenderwoche, bewegliche Feste, die in den nächsten zwölf Jahren auf das
Datum fallen (berechnet), feste Feiertage mit Geltungsbereich, eine handverlesene Liste von 45 Gedenk- und
Aktionstagen, welche Bundesländer an dem Tag Schulferien haben (aus den KMK-Daten), Sternzeichen, Jahreszeit
und die acht zeitlich nächsten Feste mit Abstand in Tagen. Historische „Was geschah am“-Listen gibt es nicht:
366 Tage mal mehrere Ereignisse hätte ich nicht einzeln prüfen können.

**Datumsseiten haben kein Widget.** Sie stehen nicht im Register der Countdowns, sonst kämen 366 weitere
Embed-Seiten dazu. Das OG-Bild rechnet direkt aus dem Datum (`/og?t=…&d=…`).

**Kalenderwochen-Jahre 2026 bis 2030** unter `/kalenderwoche/<jahr>`, mit bundesweiten Feiertagen je Woche.
Die Liste steht in `data/kalenderwoche.ts` (`KW_JAHRE`) und lässt sich mit einer Zahl verlängern.

**Neue Kategorie `datum`** im Typ, weil Datumsseiten in keine der sechs Kategorien des Auftrags passen.

## Phase 5: Events, eigener Countdown, Widget

**Events: 37 Seiten, nur mit offiziell bestätigtem Datum.** Die Recherche (`data/research/events.json`,
abgerufen am 15.11.2026) prüfte 44 Kandidaten an der Seite des Veranstalters, Verbands, Herstellers oder der
Behörde. Fünf Termine habe ich danach selbst stichprobenartig an der Quelle nachgelesen (GTA 6, Wimbledon,
Landtagswahl NRW, Oktoberfest: bestätigt; die EBU-Seite zum ESC blockte den Abruf).

Aufgenommen (37): GTA 6 (19.11.2026), Black Friday 2026, Avengers: Doomsday (Kinostart Deutschland),
Vierschanzentournee 2026/27, Handball-WM 2027, Alpine Ski-WM, Biathlon-WM, Super Bowl LXI, Nordische Ski-WM,
Formel-1-Saisonstart, Landtagswahlen in Schleswig-Holstein, im Saarland, in NRW, Bremen und Niedersachsen,
ESC-Finale 2027, DFB-Pokalfinale 2027 und 2028, Rock am Ring, Champions-League-Finale, Kieler Woche,
Frauen-WM 2027, Wimbledon, Tour de France, Wacken, Sonnenfinsternis 2.8.2027, Perseiden, Bundesliga-Start
2027/28, gamescom, Oktoberfest, Frankfurter Buchmesse, EM 2028, Olympia 2028, drei Mondfinsternisse
(31.12.2028, 26.6.2029, 20.12.2029) und die Sonnenfinsternis am 1.6.2030.

Nicht aufgenommen, weil das Datum nicht an offizieller Stelle nachzulesen war (7): Star Wars: Starfighter
(nur US-Termin), Herr der Ringe: Jagd nach Gollum (nur Medienberichte), Avengers: Secret Wars (Quelle nicht
abrufbar), Avatar 4 (nur Fachpresse), Olympische Winterspiele 2030 (offizielle Seite nicht erreichbar),
Fußball-WM 2030 (kein Spielplan veröffentlicht), Bundestagswahl 2029 (noch kein Wahltag).

**Uhrzeiten nur, wenn sie bestätigt sind.** Bei Super Bowl, ESC, Champions-League-Finale und anderen zählt
die Seite bis zum Tagesbeginn und sagt das im Text. Olympia 2028 steht mit deutschem Datum (15. Juli, 2 Uhr),
nicht mit dem Ortsdatum.

**Finsternis-Zeiten für Deutschland sind als ungefähr gekennzeichnet.** Die NASA veröffentlicht für die
Sonnenfinsternisse keine Ortszeiten für deutsche Städte. Die Werte (Beginn, Maximum, Bedeckung) stammen aus
einer eigenen Berechnung der Recherche aus den NASA-Elementen und stehen deshalb mit „ungefähr“ und „je nach Ort“ im Text.

**Die Event-Texte habe ich selbst geschrieben,** nachdem ein paralleler Schreibdurchgang an einem
Nutzungslimit gescheitert war. Regel dabei: Fakten nur aus der Recherche, sonst steht dort „steht noch nicht fest“.

**Vergangene Events verschwinden von selbst.** Einmalige Termine haben `einmalig: true`. Nach dem letzten Tag
fallen sie aus Tafeln, Hub, Footer und Sitemap, die Seite selbst zeigt „Vorbei“ und trägt `noindex`.
GTA 6 ist der erste Fall, am 20. November 2026.

**Eigener Countdown ohne Speicherung.** Name, Datum, Uhrzeit, Motiv und „jedes Jahr“ stehen als Parameter in
der Adresse (`/c?n=…&d=…&t=…&m=…&j=1`). Der Generator (`/eigener-countdown`) ist indexierbar, die geteilte
Seite `/c` trägt `noindex` als Meta-Tag und als HTTP-Header. Das Vorschaubild rechnet `/og` aus denselben
Parametern. Namen sind auf 60 Zeichen begrenzt, das Datum wird geprüft.

**Widget:** `/embed/<pfad>` für jeden Countdown außer den 366 Datumsseiten. Der Knopf „Einbetten“ auf jeder
Seite zeigt den fertigen iframe-Code samt Textlink zurück. Das Widget passt sich über `vw`-Einheiten an die
Breite des iframes an.

**Abriss-Animation überarbeitet.** In der ersten Fassung hatte das alte Blatt dieselbe Farbe wie die Seite
und sah aus wie eine drehende Zahl. Jetzt ist es eine Stufe dunkler (`paper-deep`), hat oben die Perforation
und fällt als sichtbares Blatt weg. Dauer weiter 560 ms, nur CSS.

## Phase 6: Feinschliff

**Zustände im Bild geprüft, nicht nur in Tests.** `scripts/zustaende.mjs` stellt die Uhr im Browser vor und
fotografiert „läuft“ (Ferien mit Fortschrittsbalken), „heute“ (mit Konfetti), den letzten Tag eines Termins mit
Uhrzeit (Stunden statt Tage) und „vorbei“. Dabei fiel auf: Der Einheiten-Block blieb stehen und rechnete zum
nächsten Jahr. Er verschwindet jetzt samt Überschrift, sobald der Termin begonnen hat.

**Tests für Daten, nicht nur für Logik.** `tests/daten.test.ts` prüft bei jedem Lauf: eindeutige Pfade, jede
Seite mit Text, Fakten und Fragen, alle Links im Fließtext zeigen auf vorhandene Seiten, kein Titel über
70 Zeichen, Feriendaten plausibel, Feiertagsanzahl je Land, Zahltag-Regel, Event-Startzeiten in deutscher Zeit.
Die Tests fanden drei Fehler, die im Browser nicht aufgefallen wären (eine Ferienseite mit nur zwei Fakten,
89 statt 87 Ferien-Kombinationen in der Doku, ein zu langer Tafelname).

**Mobile Navigation bleibt zweizeilig.** Fünf Textlinks passen bei 375 px nicht in eine Zeile. Ein
Menü-Knopf hätte die Links aus dem sichtbaren HTML genommen, ein seitlich scrollender Streifen hätte den
letzten Punkt versteckt. Die Links sind auf dem Handy etwas niedriger (36 px), die Antwort bleibt im ersten Bildschirm.

**Screenreader lesen die Tafel als Zahl.** Die Fallblatt-Kacheln sind `aria-hidden`, daneben steht
unsichtbar „noch 14 Tage“. `aria-live="polite"` trägt nur die Tageszahl. Die Ferien-Matrix ist als
scrollbarer Bereich per Tastatur erreichbar.

**Was bewusst offen bleibt**
- Die Platzhalter `[[NAME]]`, `[[ADRESSE]]`, `[[EMAIL]]` in `site.config.ts`.
- Ferien 2029/30 außer Sommer: sobald die KMK den Kalender veröffentlicht.
- Uhrzeiten mehrerer Events (Super Bowl, ESC, Champions-League-Finale): nachtragen, wenn bestätigt.
- Die Verfügbarkeit von `zeitblatt.de` ist nur per DNS geprüft.
- Schleswig-Holsteins Sommerferien 2028 und 2029: Jahreskalender und langfristige Regelung der KMK weichen
  voneinander ab, übernommen ist der neuere Jahreskalender. Die Seite des Landes war bei der Prüfung nicht
  erreichbar (siehe `data/ferien-pruefbericht.md`).

## Nach Rückmeldung: mehr Orchid

Wunsch nach der Durchsicht: Der Farbton war bisher fast nur an den Sekunden zu sehen und sollte etwas
präsenter sein, mit einem deutlichen Effekt, ohne die Seite bunt zu machen. Umgesetzt mit einer festen Regel
statt mit Streuung: **ein großer Akzent pro Seite, höchstens zwei kleine.**

- **Die Einheit neben der großen Zahl ist Orchid.** „TAGE“, „KW“, „STUNDEN“ sind jetzt das eine farbige Wort
  auf dem Blatt, im Stil eines Schweizer Plakats. Auf der Startseite ist es der Monat neben der Tageszahl.
  Das Vorschaubild und das Widget ziehen mit. Kontrast 3,42:1 auf Papier, zulässig für große Schrift.
- **Die nächste Abfahrt auf der Tafel** hat Kacheln in Orchid. So fällt auf jeder Tafel sofort auf, was als
  Nächstes kommt.
- **Der Balken am Seitenkopf wird zur Jahresleiste.** Eine kleine Marke in Orchid steht dort, wo im Jahr
  heute ist. Sie wandert jeden Tag ein Stück nach rechts. Wenig Fläche, aber auf jeder Seite da, und sie
  bedeutet etwas.
- **In Übersichtstabellen** steht der nächste Termin in `orchid-deep`.

Nicht gemacht: Orchid in Überschriften, Flächen oder Buttons. Dort würde es zur Dekoration, und der Effekt
der wenigen Stellen wäre weg. `DESIGN.md`, Abschnitt 2, beschreibt die neue Regel.

## Umstellung auf Netlify

Auf Wunsch läuft die Seite auf Netlify statt auf Vercel.

- **Next.js-Laufzeit von Netlify** (`@netlify/plugin-nextjs`, in `netlify.toml` fest eingetragen). Statische
  Seiten, ISR, die Route für Vorschaubilder und das gezielte Neu-Erzeugen funktionieren damit unverändert.
  Ein lokaler Netlify-Build (`netlify build --offline`) lief fehlerfrei durch, die Schriften für `/og` liegen im Paket.
- **Tageswechsel als geplante Netlify-Funktion** statt Vercel Cron: `netlify/functions/tageswechsel.mjs` läuft
  um 22:01 und 23:01 UTC und ruft `/api/tageswechsel` auf. Geplante Funktionen laufen bei Netlify nur auf der
  veröffentlichten Seite, in UTC und höchstens 30 Sekunden.
- **Die Adresse der Seite kommt aus der Netlify-Variable `URL`.** `next.config.ts` baut sie beim Build fest
  ein (Vorrang hat `NEXT_PUBLIC_SITE_URL`). So stimmen Canonical, Sitemap und Einbett-Code schon unter der
  `netlify.app`-Adresse und nach dem Verbinden der Domain, ohne dass eine Variable gesetzt werden muss.
  Nach einem Domainwechsel braucht es einen neuen Build.
- **Keine Reichweitenmessung mehr.** `@vercel/analytics` ist entfernt, einen cookiefreien Ersatz ohne
  Zusatzkosten gibt es bei Netlify nicht. Der Datenschutztext sagt jetzt: Es wird nichts gemessen. Netlify
  Analytics (serverseitig, kostenpflichtig) lässt sich später ohne Codeänderung dazubuchen.
- **Impressum:** Name, Straße und E-Mail sind eingetragen. Postleitzahl und Ort fehlten in der Angabe und
  stehen als `[[PLZ ORT]]` in `site.config.ts`.

## Neuer Name: Nochtage

`zeitblatt.de` war vergeben. Meine Prüfung zu Beginn hatte nur gezeigt, dass die Domain auf keinen Server zeigt,
nicht, dass sie frei ist. Das war zu wenig. Die neuen Vorschläge sind direkt bei der DENIC abgefragt worden.
Gewählt wurde **Nochtage** mit `nochtage.de`.

- Der Name steht weiter nur in `site.config.ts` (`name`, `domain`). Neu ist `akzent`: der Teil des Namens, der
  in der Wortmarke in Orchid steht.
- **Die Wortmarke ist zweifarbig:** „NOCH“ in Tinte, „TAGE“ in Orchid. Sie wiederholt, was auf jeder
  Countdown-Seite groß zu sehen ist („40 TAGE“). Der Name sagt außerdem genau das, was die Seite antwortet.
- Icon mit „N“ statt „Z“, Paketname, Tests, README und Anleitung sind angepasst.
- Bei der letzten Abfrage (15.11.2026) führte die DENIC `nochtage.de` noch nicht als registriert. Direkt nach
  einer Bestellung ist das normal. Wenn die Domain beim Anbieter nach einigen Stunden nicht aktiv ist: Bestellung prüfen.

**Impressum vollständig (15.11.2026):** Postleitzahl und Ort sind nachgetragen, der Platzhalter `[[PLZ ORT]]` ist weg.
