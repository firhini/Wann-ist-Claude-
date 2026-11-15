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
