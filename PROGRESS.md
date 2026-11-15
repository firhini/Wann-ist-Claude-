# PROGRESS.md

Kurzer Bericht nach jeder Phase: neue URLs, Entscheidungen, Prüfungen, Screenshots.

## Phase 1: Fundament (15.11.2026)

**Neue URLs (14 indexierbar)**
`/`, `/feiertage`, `/kalenderwoche`, `/weihnachten`, `/heiligabend`, `/silvester`, `/neujahr`, `/nikolaus`,
`/1-advent`, `/2-advent`, `/3-advent`, `/4-advent`, `/impressum`, `/datenschutz`.
Dazu `/embed/<slug>` (noindex), `/og` (Vorschaubild), `/sitemap.xml` mit `/sitemaps/seiten.xml` und
`/sitemaps/feiertage.xml`, `/robots.txt`, `/api/tageswechsel`.

**Gebaut**
- `DESIGN.md` mit allen Tokens, umgesetzt in `app/globals.css` (Tailwind-Standards gelöscht)
- Datumslogik in `lib/` (Europe/Berlin, Gauß'sche Osterformel, Advent, ISO-Kalenderwochen), 51 Tests
- Countdown-Vorlage (`components/CountdownSeite.tsx`): Hero mit Zahl, Abriss, Fallblatt-Uhr, Fahrplanspalte,
  Text mit Randnotizen, Jahrestabelle, FAQ, Abfahrtstafel
- Startseite als Abfahrtstafel, Hub Feiertage, Kalenderwoche mit Jahrestabelle
- Schema (`WebPage`, `FAQPage`, `BreadcrumbList`, Startseite `WebSite` + `Organization`), dynamische Titles
- Prüfskripte: `anti-slop` (läuft vor jedem Build), `contrast`, `smoke`, `screenshots`, `lighthouse.sh`

**Qualitätsschleife**
- Runde 1: Die Zahl war zu klein (Mobil ein Drittel der Breite), Tafelspalte „Feiertag“ sagte nichts,
  Startseite links leer. Behoben: Größe nach Stellenzahl, Notiz „gesetzlicher Feiertag / kein Feiertag“, Schnelleinstiege.
- Runde 2: CSS-Ebenen überschrieben die neue Größe (behoben), Dunkelmodus geprüft, Kalenderblatt Startseite
  auf Mobil gekürzt. OG-Bild: Zahl überlappte die Frage (behoben).
- Lighthouse Mobile: `/weihnachten` 99/100/100/100, `/` 99/100/100/100, `/kalenderwoche` 100/100/100/100,
  `/feiertage` 100/100/100/100. CLS überall 0, LCP 0,8 s.
- Kontrast: alle 20 Kombinationen AA. Anti-Slop: keine Treffer.
- Smoke-Test: 14 Seiten ohne Fehler. Zwei Links im Fließtext zeigen auf Seiten späterer Phasen
  (`/ferien/weihnachtsferien`, `/jahresende`), die mit Phase 2 und 3 entstehen.

**Screenshots:** `screenshots/phase-1/`

## Phase 2: Ferien-Cluster (15.11.2026)

**Neue URLs (137 indexierbar, insgesamt 151)**
- `/ferien` (Hub mit Matrix 16 Länder × 6 Ferienarten)
- `/ferien/<ferienart>` (6): `herbstferien`, `weihnachtsferien`, `winterferien`, `osterferien`, `pfingstferien`, `sommerferien`
- `/ferien/<ferienart>/<bundesland>` (87, nur wo die KMK Termine führt)
- `/ferien/<bundesland>` (16): alle Ferien eines Landes mit Countdown zu den nächsten
- `/schule` und `/schule/<bundesland>/schulanfang` (1 + 16)
- neue Sitemaps `/sitemaps/ferien.xml` und `/sitemaps/schule.xml`

**Gebaut**
- `data/ferien.json` aus den KMK-PDFs (276 Einträge, gegen eine zweite Quelle geprüft), Aufbereitung in `data/ferien.ts`
- `data/feiertage-laender.ts`: gesetzliche Feiertage aller 16 Länder
- Stempel als Motiv der Ferienseiten, Hub-Kopf mit Fahrplanspalte, Matrix-Tabelle mit fester erster Spalte

**Qualitätsschleife**
- Runde 1: 25 Titel über 70 Zeichen (gekürzt), Quelle zeigte immer das letzte Schuljahr (jetzt je Termin),
  Tafelspalte „Ferien“ ohne Aussage (jetzt Dauer und Ende).
- Runde 2: Übersichten mischten Schuljahre, weil das Saarland 2027 und 2028 keine Pfingstferien hat
  (jetzt ein Durchgang je Schuljahr, fehlende Länder werden genannt).
- Lighthouse Mobile: `/ferien/sommerferien/bayern` 99/100/100/100, `/ferien` 99/100/100/100,
  `/ferien/sommerferien` 100/100/100/100, `/ferien/bayern` 99/100/100/100. CLS überall 0.
- Smoke-Test über alle 143 Seiten der Sitemaps: keine Fehler außer Links auf Seiten der Phase 3
  (`/feiertage/<bundesland>`, `/jahresende`).

**Screenshots:** `screenshots/phase-2/`

## Phase 3: Feiertage komplett, Jahreszeiten, Alltag (15.11.2026)

**Neue URLs (54 indexierbar)**
- 25 Feste: `/weiberfastnacht`, `/rosenmontag`, `/aschermittwoch`, `/valentinstag`, `/frauentag`, `/karfreitag`,
  `/ostern`, `/ostermontag`, `/tag-der-arbeit`, `/muttertag`, `/christi-himmelfahrt`, `/vatertag`, `/pfingsten`,
  `/pfingstmontag`, `/fronleichnam`, `/heilige-drei-koenige`, `/mariae-himmelfahrt`, `/weltkindertag`,
  `/tag-der-deutschen-einheit`, `/halloween`, `/reformationstag`, `/allerheiligen`, `/sankt-martin`, `/karneval`,
  `/buss-und-bettag`
- `/feiertage/<bundesland>` (16)
- `/jahreszeiten` mit `/fruehlingsanfang`, `/sommeranfang`, `/herbstanfang`, `/winteranfang`, `/zeitumstellung`
- `/alltag` mit `/wochenende`, `/freitag`, `/feierabend`, `/monatsende`, `/jahresende`, `/payday`

**Qualitätsschleife**
- Runde 1: Tafel zeigte bei Länderseiten „kein Feiertag“ (jetzt der Name des nächsten Feiertags),
  Zahltag-Satz im Dezember holprig (neu formuliert), eine Quellen-URL der PTB gab es nicht (ersetzt).
- Runde 2: Feiertags-Hub hatte rechts eine leere Fläche (jetzt Fahrplanspalte mit den nächsten bundesweiten
  Feiertagen und Tabelle nach Bundesland). Der Alltags-Hub trug dieselbe H1 wie `/wochenende` (geändert).
- Lighthouse Mobile: `/feiertage/bayern` 100/100/100/100, `/ostern` 100/100/100/100,
  `/zeitumstellung` 99/100/100/100, `/feierabend` 99/100/100/100. CLS 0.

**Screenshots:** `screenshots/phase-3/`

## Phase 4: Datumsseiten und KW-Jahre (15.11.2026)

**Neue URLs (372 indexierbar)**
- `/tage-bis` (Hub mit allen 366 Tagen) und `/tage-bis/<tag>-<monat>` (366), z. B. `/tage-bis/1-april`
- `/kalenderwoche/2026` bis `/kalenderwoche/2030` (5)

**Qualitätsschleife**
- Runde 1: Tagesraster im Hub brach nach 27 Tagen um (jetzt 31 Spalten am Desktop, 7 auf dem Handy wie ein
  Wochenkalender). Datumsseiten hatten keine Tafel (jetzt die nächsten sieben Termine).
- Runde 2: Stichproben 29. Februar (zählt bis 2028, Texte stimmen), 24. Dezember, 1. April.
- Lighthouse Mobile: `/tage-bis/1-april` 100/100/100/100, `/tage-bis` 100/100/100/100,
  `/kalenderwoche/2027` 100/100/100/100. CLS 0.
- Smoke-Test über alle 569 Seiten der Sitemaps: ein offener Link (`/eigener-countdown`, entsteht in Phase 5).

**Stand:** 569 indexierbare Seiten. Build: 765 Routen in rund 11 Sekunden.

**Screenshots:** `screenshots/phase-4/`

## Phase 5: Events, eigener Countdown, Widget (15.11.2026)

**Neue URLs (39 indexierbar, insgesamt 608)**
- `/events` und `/events/<slug>` (37 Events mit bestätigtem Datum)
- `/eigener-countdown` (Generator, indexierbar)
- `/c?…` (geteilter Countdown, noindex) und `/embed/<pfad>` (235 Widgets, noindex)
- neue Sitemap `/sitemaps/events.xml`

**Qualitätsschleife**
- Runde 1: Events fehlten auf der Startseiten-Tafel (ein Eintrag im Register hatte nicht gegriffen), der
  Antwortsatz „GTA 6 fällt 2026 auf einen Donnerstag“ klang falsch (jetzt „Termin: …“), die Tafelspalte zeigte
  nur „Event“ (jetzt die Rubrik).
- Runde 2: Abriss-Animation neu (siehe DECISIONS), Zahl in den Beispielen ohne Tausenderpunkt (behoben),
  Widget bei 360 × 220 geprüft.
- Lighthouse Mobile: `/events` 100/100/100/100, `/events/handball-wm-2027` 100/100/100/100,
  `/eigener-countdown` 100/100/100/100, `/` 100/100/100/100. `/c` hat SEO 66, weil `noindex` gewollt ist. CLS 0.
- Smoke-Test über alle 608 Seiten der Sitemaps: keine Fehler, keine kaputten internen Links.

**Screenshots:** `screenshots/phase-5/`
