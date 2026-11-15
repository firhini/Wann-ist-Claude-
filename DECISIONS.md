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
in Rheinland-Pfalz), gibt es keine Seite. Aus 6 × 16 = 96 möglichen werden so 87 echte. Die Hubs sagen ausdrücklich,
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
