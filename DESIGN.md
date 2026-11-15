# DESIGN.md – Zeitblatt

Verbindliche Gestaltungsgrundlage. Jede Seite wird nur aus diesen Tokens und Bausteinen gebaut.
Die Tokens stehen maschinenlesbar in `app/globals.css` (`@theme`). Tailwinds Standardfarben,
-radien, -schatten und -schriftgrößen sind dort gelöscht. Wer `bg-gray-100` schreibt, bekommt
schlicht keine Klasse, und `scripts/anti-slop-check.ts` bricht den Build ab.

## 1. Konzept: Gedrucktes Zeitobjekt

Drei Vorbilder, eine Seite:

| Vorbild | Was wir übernehmen | Was wir nicht übernehmen |
|---|---|---|
| Abreißkalender | Ein Blatt pro Tag, riesige Tageszahl, Perforation als Trennlinie, einmaliges Abreißen beim Laden | Fotos, Papiertexturen, Schatten, Eselsohren |
| Fallblattanzeige | Klappende Ziffernkacheln, Abfahrtstafel mit Zeilen, „nächste Abfahrten“ | 3D-Gehäuse, Glanz, Lochblech |
| Schweizer Plakat | 12-Spalten-Raster, Haarlinien, extreme Größenkontraste, Asymmetrie, Versalien in schmaler Grotesk | Dekoration ohne Funktion |

Die Seite ist ein Fahrplan für Tage. Sie zeigt eine Zahl, sagt, wofür sie steht, und hält sonst still.

## 2. Farben

| Token | Rolle | Papier (hell) | Tinte (dunkel) |
|---|---|---|---|
| `paper` | Haupthintergrund | `#F3ECE0` | `#17151A` |
| `paper-deep` | Flächen, Tabellenzeilen im Wechsel | `#E8DFCF` | `#24212A` |
| `ink` | Text, Linien, Ziffern | `#17151A` | `#F3ECE0` |
| `ink-soft` | Sekundärtext | `#55505A` | `#B9B1A6` |
| `orchid` | Der eine Farb-Pop (große Elemente, Flächen, Linien) | `#D8439F` | `#D8439F` |
| `orchid-deep` | Orchid für kleine Schrift | `#A11F72` | `#F08CCB` |

Regeln:

- **Orchid ist selten, aber nie versteckt.** Jede Seite hat genau einen großen Akzent und höchstens zwei kleine.
  - Der große Akzent ist das eine farbige Wort neben der großen Zahl: die Einheit („TAGE“, „KW“, „STUNDEN“)
    auf Countdown-Seiten, der Monat auf dem Kalenderblatt der Startseite.
  - Kleine Akzente: die laufende Sekunde, die nächste Abfahrt auf der Tafel (Kacheln der ersten Zeile), die
    Heute-Marke auf der Jahresleiste am Seitenkopf, der Stempel der Ferienseiten, der Fortschrittsbalken, der
    nächste Termin in Übersichtstabellen, „heute“ und „läuft“.
  - Dazu ohne Fläche: Link-Unterstreichung beim Hover, `::selection`, Fokusrahmen, Konfetti am Ziel.
  - Verboten bleibt Orchid als Hintergrund ganzer Abschnitte, als Rahmen um Textblöcke und in Fließtext.
- `orchid` nur für große Schrift (≥ 24 px fett) und Grafik. Kleine Schrift in Akzentfarbe nimmt immer `orchid-deep`.
- **Tintenmodus** (`prefers-color-scheme: dark`): `paper` und `ink` tauschen die Plätze. Keine neuen Farben,
  kein Glühen. Die Abfahrtstafel, im Hellen ein Tintenblock auf Papier, wird im Dunkeln ein Papierblock auf Tinte.
  Das ist gewollt. `orchid` bleibt in beiden Modi gleich, nur `orchid-deep` (kleine Schrift) wird im Dunkeln heller.
- `orchid` ist gegenüber dem Startwert `#D6409F` um eine Nuance aufgehellt (`#D8439F`). Erst damit erreicht
  Tinte auf Orchid (Heute-Marker, Textmarkierung) 4,5:1, und Orchid auf Papier bleibt über 3:1.
- Transparenzen nur für Linien auf invertierten Flächen (`paper/25`).
- Kontraste sind mit `npm run contrast` geprüft (WCAG 2.1 AA), Ergebnis siehe Abschnitt 10.

## 3. Typografie

| Rolle | Schrift | Einsatz |
|---|---|---|
| `font-display` | Big Shoulders Display (variabel, 700–900) | Ziffern, Überschriften, Tafelzeilen. Immer Versalien, außer bei Ziffern. |
| `font-text` | Atkinson Hyperlegible Next (variabel) | Fließtext, Antwortsatz, FAQ, Navigation |
| `font-mono` | Martian Mono (variabel) | Daten, Datumsangaben, Tabellenköpfe, Brotkrumen |

Selbst gehostet über `next/font/local` aus `app/fonts` (nur der Latin-Schnitt, zusammen rund 93 KB).
Kein Request an fremde Server. Lizenz aller drei Schriften: SIL Open Font License 1.1.

Skala (Tailwind-Klassen `text-…`):

| Token | Größe | Zeilenhöhe | Einsatz |
|---|---|---|---|
| `zahl` | `clamp(7rem, 34vw, 22rem)` | 0.8 | Die Hauptzahl. Laufweite −0.02em, `tabular-nums`. Gilt für drei Stellen, siehe unten. |
| `plakat` | `clamp(2.75rem, 8vw, 6rem)` | 0.92 | H1 auf Hubs und Startseite, „Heute“-Zustand |
| `frage` | `clamp(1.625rem, 3.2vw, 2.75rem)` | 1.02 | H1 auf Countdown-Seiten (die Suchfrage) |
| `kopf` | `clamp(1.5rem, 2.4vw, 2.125rem)` | 1.05 | H2 |
| `zeile` | `clamp(1.25rem, 2vw, 1.75rem)` | 1.1 | Tafelzeilen, H3, Einheiten-Werte |
| `lead` | `clamp(1.1875rem, 1.5vw, 1.375rem)` | 1.45 | Antwortsatz |
| `body` | `1.0625rem` | 1.62 | Fließtext |
| `klein` | `0.9375rem` | 1.5 | Nebentexte, Footer-Links |
| `daten` | `0.8125rem` | 1.45 | Mono-Daten in Tabellen |
| `fein` | `0.75rem` | 1.4 | Mono-Beschriftungen (nie kleiner) |

Die Hauptzahl richtet sich nach der Stellenzahl (`.zahl-reihe[data-stellen]`), damit sie das Blatt füllt:

| Stellen | Größe | Beispiel |
|---|---|---|
| 1–2 | `clamp(11rem, 56vw, 28rem)` | 40 Tage bis Weihnachten |
| 3 | `clamp(8.5rem, 42vw, 22rem)` | 137 Tage |
| 4–5 | `clamp(6rem, 30vw, 18rem)` | 1.136 Tage |

Die Einheit daneben („Tage“) misst immer 0.2 der Zahl. `zahl-klein` (Startseite) misst 0.62 des Tokens.
Weitere feste Größen: `marke` 1.75rem (Wortmarke), Uhr `clamp(2.25rem, 5.4vw, 3.75rem)`.

Regeln:

- Überschriften in `font-display` sind Versalien mit Laufweite 0.01em. Kein kursives Akzentwort, keine Verlaufsschrift.
- Mono-Beschriftungen sind normale Groß-/Kleinschreibung, nicht gesperrt. Sie beschriften Daten (Tabellenkopf,
  Fahrplanzeile). Sie stehen nie als „Eyebrow“ über einer Überschrift.
- Zeilenlänge im Fließtext höchstens 66 Zeichen (`max-w-text` = 38rem).
- Zahlen in Tabellen: `tabular-nums`, rechtsbündig.

## 4. Raster und Abstände

- Seitenbreite höchstens `90rem` (1440 px), Außenabstand `seite` = `clamp(1rem, 4vw, 3.5rem)`.
- Ab 1024 px: 12 Spalten, Spaltenabstand 1.5rem. Der Hero teilt sich 8 + 4: links die Zahl, rechts die
  Fahrplanspalte, dazwischen eine Haarlinie. Textabschnitte sitzen auf den Spalten 1–7, Randnotizen auf 9–12.
- Unter 1024 px: eine Spalte. Reihenfolge im Hero: Frage, Zahl, Abriss-Streifen, Uhr, Datum.
  Die Antwort ist bei 360 × 640 ohne Scrollen sichtbar.
- Grundeinheit 4 px (Tailwind-Spacing). Abschnittsabstand `abschnitt` = `clamp(3.5rem, 8vw, 6.5rem)`.
- Nicht jeder Abschnitt hat denselben Aufbau. Vorgesehene Rhythmen: Fahrplanzeilen (dl), Tabelle über volle
  Breite, ruhiger Textblock mit Randnotiz, invertierte Tafel. Zentrierte Überschrift plus Untertitel plus Raster gibt es nicht.

## 5. Linien, Ecken, Flächen

- **Haarlinie:** 1 px `ink`. Sie trägt die Struktur: zwischen Hero-Spalten, zwischen Tabellenzeilen, um Buttons.
- **Balken:** 6 px `ink` am Seitenkopf (die Jahresleiste mit der Heute-Marke) und über dem Footer.
- **Perforation:** 2 px gepunktet `ink` (`.perforation`). Nur dort, wo ein Blatt endet: unter der Zahl, um den Fahrschein.
- **Ecken:** eckig. Ausnahmen: Ziffernkacheln `radius-flap` = 2 px, Fahrschein und Stempel `radius-blatt` = 4 px.
- **Schatten, Verläufe, Unschärfe:** keine. Die Tokens existieren nicht.
- **Kartenraster:** keine. Listen von Countdowns sind immer Tafelzeilen.

## 6. Bausteine

| Baustein | Datei | Beschreibung |
|---|---|---|
| Kopf | `components/Kopf.tsx` | Jahresleiste, Wortmarke, Navigation als Textlinks, Datum und KW in Mono |
| Jahresleiste | `components/Jahresleiste.tsx` | Der 6-px-Balken am Seitenkopf ist das Jahr. Eine 10 px breite Marke in Orchid steht an der Stelle des heutigen Tages: am 1. Januar ganz links, an Silvester ganz rechts |
| Brotkrumen | `components/Brotkrumen.tsx` | Mono, `fein`, mit `BreadcrumbList` |
| Hero | `components/CountdownHero.tsx` | Frage, Zahl, Abriss, Uhr, Fahrplanspalte |
| Ziffernkachel | `components/Flap.tsx` | Fallblatt-Ziffern. Im Hero Tinte auf Papier invertiert, auf der Tafel Papier auf Tinte |
| Abfahrtstafel | `components/Tafel.tsx` | Zeilen: Datum, Ziel, Kategorie, „noch X Tage“ in Kacheln |
| Fahrplan | `components/Fahrplan.tsx` | Definitionsliste mit Haarlinien: Beschriftung links, Wert rechts |
| Jahrestabelle | `components/Jahre.tsx` | „Die nächsten Jahre“, Zebra in `paper-deep` |
| FAQ | `components/Faq.tsx` | `<details>`, Plus/Minus in Mono, keine Animation |
| Motiv | `components/Motiv.tsx` | Ein Strichmotiv pro Event, 1.5 px `ink`, keine Füllung |
| Stempel | `components/Stempel.tsx` | Ferien- und Länderseiten: Länderkürzel als Stempel in `orchid-deep`, 7° gedreht |
| Hub-Kopf | `components/HubKopf.tsx` | Kopf jeder Übersichtsseite: Frage und Antwort links, Fahrplanspalte rechts |
| Übersicht | `components/Uebersicht.tsx` | Tabelle auf Hubs: Name, Datum, Wochentag, Zusatz, verbleibende Tage |
| Matrix | `.matrix` | Ferien-Hub: 16 Länder × 6 Ferienarten, erste Spalte bleibt beim Scrollen stehen |
| Tagesraster | `.tagesraster` | Datums-Hub: 31 Spalten am Desktop, 7 auf dem Handy |
| Formular | `.feld`, `.motivwahl` | Eigener Countdown: eckige Felder mit Haarlinie, Motivauswahl als Raster mit 1-px-Fugen |
| Buttons | `.knopf` | Rechteck, 1 px `ink`, Mono. Primär: gefüllt `ink`. Hover: invertiert |
| Werbeplatz | `components/AdSlot.tsx` | Reservierte Höhe, standardmäßig leer und unsichtbar für Screenreader |

## 7. Motive

Jedes Event hat ein eigenes Strichmotiv in `ink`: Stern (Weihnachten), Kerzen in der passenden Anzahl (Advent),
Rakete (Silvester), Ei (Ostern), Laterne (Sankt Martin), Sonnenbahn (Jahreszeiten), Uhr (Zeitumstellung, Feierabend),
Stempel (Ferien). Regeln: ein Strich, eine Strichstärke (1.5 px bei 24 px Raster), keine Füllung, keine Farbe,
nie größer als 9rem, immer `aria-hidden`. Das Motiv sitzt oben rechts im Zahlenfeld und ist nie anklickbar.

## 8. Bewegung

| Was | Dauer | Kurve | Auslöser |
|---|---|---|---|
| Fallblatt-Klappe | 280 ms (2 × 140) | `ease-klapp` | Ziffer ändert sich |
| Kalenderblatt reißt ab | 560 ms | `ease-abriss` | einmal pro Besuch (sessionStorage), nur CSS |
| Konfetti | 1800 ms | linear | Zieltag erreicht |

Sonst bewegt sich nichts: kein Einblenden beim Scrollen, kein Hover-Hüpfen, kein Parallax.
Bei `prefers-reduced-motion: reduce` sind alle drei Animationen abgeschaltet, Ziffern wechseln hart.

## 9. Sprache

Kurz, direkt, deutsch. Die Seite duzt. Trockener Humor ist erlaubt, Werbedeutsch nicht
(„Entdecke“, „nahtlos“, „revolutionär“, „ultimativ“, „Tauche ein“). Keine Gedankenstrich-Ketten, keine Emojis.
Zahlen und Daten immer konkret: „Freitag, 25. Dezember 2026“, nicht „bald“.

## 10. Barrierefreiheit

- Kontrast AA für jede Text-/Hintergrund-Kombination, geprüft per Skript (`npm run contrast`).
- Fokus: 2 px `orchid-deep`, 2 px Abstand, nie entfernt.
- `aria-live="polite"` nur an der Tageszahl. Die Uhr ist `aria-hidden`, daneben steht eine lesbare Textfassung.
- Navigation und Footer sind echte Textlinks. Tabellen haben `<caption>` und `scope`.
- Berührungsflächen mindestens 44 × 44 px.
