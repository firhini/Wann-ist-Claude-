# DECISIONS.md

Jede größere Entscheidung mit kurzer Begründung. Neueste Phase unten.

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
