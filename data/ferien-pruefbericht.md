# Prüfbericht Schulferien-Datensatz (`data/ferien.json`)

Abgerufen und geprüft am 15.11.2026. Einzige Datenquelle sind die PDFs der Kultusministerkonferenz (KMK). Die OpenHolidays API und die Länderseiten dienten nur zur Gegenprüfung.

## 1. Quellen

| Schuljahr | PDF (kmk.org/fileadmin/Dateien/pdf/Ferienkalender/) | Stand laut PDF | SHA-256 (Anfang) |
|---|---|---|---|
| 2026/27 | `FER2026_27.pdf` | 09.10.2025 | `516faa0d…` |
| 2027/28 | `FER2027_28.pdf` | 09.10.2025 | `51b76c6a…` |
| 2028/29 | `FER2028_29.pdf` | 09.10.2025 | `3b3fe3b6…` |
| Sommer 2029 und 2030 | `Sommerferienregelung_2025-2030_2022-09-21.pdf` | Beschluss vom 09.12.2021 | `57130f64…` |

Ein Kalender `FER2029_30.pdf` existiert bei der KMK noch nicht (HTTP 404, auch nicht auf der Übersichtsseite verlinkt).

Vorgehen: Die Tabellen wurden positionsbasiert aus `pdftohtml -xml` gelesen (Spalte über die x-Position des Spaltenkopfs, Zeile über die y-Position des Ländernamens, Kursivschrift über den Font). Zusätzlich wurden alle drei Kalender als Bild gerendert und gegengelesen, und ein unabhängiger Gegencheck gegen `pdftotext -layout` verglich alle Datumsangaben der Tabellen mit dem JSON (176 + 172 + 189 Datumstoken identisch, dazu 16 Zeilen für Sommer 2030).

## 2. Umfang

| Schuljahr | Einträge | Zeiträume | Zellen mit „--" (kein Eintrag) |
|---|---|---|---|
| 2026/27 | 87 | 95 | 9 |
| 2027/28 | 85 | 92 | 11 |
| 2028/29 | 88 | 107 | 8 |
| 2029/30 (nur Sommerferien 2030) | 16 | 16 | – |
| **Summe** | **276** | **310** | |

Je Art: Herbst 48, Weihnachten 48, Winter 30, Ostern 48, Pfingsten 38, Sommer 64.

Jedes Land hat in 2026/27, 2027/28 und 2028/29 Sommer-, Herbst-, Weihnachts- und Osterferien. Für 2029/30 gibt es nur die Sommerferien 2030, weil die KMK für dieses Schuljahr noch keinen Ferienkalender veröffentlicht hat.

Fehlende Einträge laut KMK („--"):

- Winterferien, alle drei Schuljahre: BW, BY, HE, NW, RP, SH.
- Pfingstferien 2026/27: HE, RP, SL.
- Pfingstferien 2027/28: BB, HE, NW, RP, SL.
- Pfingstferien 2028/29: HE, RP.

## 3. Abgleich mit der OpenHolidays API

Abgefragt wurden alle 16 Länder (`/SchoolHolidays`, `DE-xx`) in zwei Zeitfenstern (01.10.2026–30.09.2028 und 01.10.2028–31.12.2030, wegen der Grenze von 1095 Tagen je Anfrage). Verglichen wurde jeder Zeitraum auf exakt gleichen ersten und letzten Tag. Sondergruppen der API (SH-Inseln, berufliche Schulen in MV) blieben außen vor.

| | Zeiträume | exakt in der API |
|---|---|---|
| 2026/27 | 95 | 95 |
| 2027/28 | 92 | 92 |
| 2028/29 | 107 | 107 |
| Sommer 2030 | 16 | 16 |
| **Summe** | **310** | **310** |

**Abweichungen bei KMK-Einträgen: 0.** Alle 276 Einträge sind vollständig bestätigt.

### 3.1 Einträge, die nur die API kennt (12)

Die KMK-Tabelle führt diese Tage nicht, daher stehen sie nicht im JSON.

| Land | Tage | API-Bezeichnung | Auflösung |
|---|---|---|---|
| BY | 18.11.2026, 17.11.2027, 22.11.2028 | Buß- und Bettag | Kein Ferientag. Laut km.bayern.de entfällt der Unterricht nach dem Feiertagsgesetz. |
| BB | 07.05.2027, 26.05.2028, 30.10.2028, 30.04.2029, 11.05.2029 | Variabler Ferientag | Das sind die beweglichen Ferientage, die die KMK nur als Zahl nennt (BB: 1, 1, 3). Das Amtsblatt des MBJS (Nr. 41/2022) bestätigt alle fünf Tage als „variable Ferientage" (Ferientag, soweit die Schulkonferenz nichts anderes festlegt). |
| MV | 26.11.2026, 27.11.2026, 25.11.2027, 26.11.2027 | Zusätzlicher Ferientag | Nicht in der KMK-Tabelle. Der Bildungsserver MV nennt „drei zusätzlich feststehende Ferientage" je Schuljahr, die konkreten Tage konnte ich dort nicht belegen (siehe Abschnitt 6). |

### 3.2 Abweichung innerhalb der KMK-Quellen: Sommerferien 2028 und 2029

Die Sommerferien 2027 stimmen in Jahreskalender und langfristiger Sommerferienregelung für alle 16 Länder überein. Für 2028 und 2029 weichen je zwei Länder ab:

| Jahr | Land | Jahreskalender (im JSON) | Sommerferienregelung | Länderquelle |
|---|---|---|---|---|
| 2028 | HH | 03.07.–11.08. | 01.07.–11.08. | Ferienordnung Hamburg 2024/25–2029/30: Mo 03.07.–Fr 11.08.2028 |
| 2028 | SH | 24.06.–04.08. | 24.06.–05.08. | Ferienverordnung SH: 24.06.–04.08.2028 (nur über Suchtreffer belegt) |
| 2029 | HH | 02.07.–10.08. | 01.07.–10.08. | Ferienordnung Hamburg: Mo 02.07.–Fr 10.08.2029 |
| 2029 | SH | 23.06.–03.08. | 23.06.–08.08. | Ferienverordnung SH: 23.06.–03.08.2029 (nur über Suchtreffer belegt) |

Auflösung: Im JSON stehen die Werte der Jahreskalender (Stand 09.10.2025, also neuer als die Regelung von 2021/22). API und Länderquellen bestätigen sie. Der 01.07.2028 ist ein Samstag, der 01.07.2029 ein Sonntag; der 08.08.2029 wäre ein Mittwoch und ergäbe fast sieben Wochen, die Angabe in der Regelung ist vermutlich ein Tippfehler.

Für **Sommer 2030** gibt es nur die langfristige Regelung. Die API bestätigt alle 16 Zeiträume, zusätzlich bestätigen die Ferienordnung Hamburg (04.07.–14.08.2030) und das Amtsblatt Brandenburg (04.07.–17.08.2030) ihre Länder.

### 3.3 Zusätzliche Bestätigungen aus Länderquellen

- **Hamburg** (Ferienordnung der Schulbehörde, PDF auf hamburg.de): alle HH-Einträge 2026/27 bis 2028/29 identisch, einschließlich Halbjahrespause und Brückentag 30.10.2028.
- **Brandenburg** (Amtsblatt MBJS Nr. 41/2022, bravors.brandenburg.de): alle BB-Einträge 2026/27 bis 2028/29 identisch.
- **Bayern** (km.bayern.de, Stand 15.09.2026): alle BY-Einträge 2026/27 identisch. Der Herbsttermin heißt dort „unterrichtsfreie Tage um Allerheiligen".
- **Mecklenburg-Vorpommern** (bildung-mv.de/termine): Weihnachtsferien 2026/27 und Winterferien 2027 identisch.

## 4. Fußnoten der KMK

- **Erster und letzter Ferientag:** Alle Angaben nennen den ersten und den letzten Ferientag.
- **Bewegliche Ferientage:** Die Zahl in Klammern hinter dem Ländernamen gibt die beweglichen Ferientage an. Sie stehen nicht in der Tabelle und daher nicht im JSON.

  | Schuljahr | BW | BB | HE | NW | RP | SL | SN | ST | SH | TH |
  |---|---|---|---|---|---|---|---|---|---|---|
  | 2026/27 | 4 | 1 | 4 | 3 | 6 | 2 | 1 | 2 | 2 | 2 |
  | 2027/28 | 4 | 1 | 3 | 3 | 6 | 1 | 1 | 1 | 1 | 1 |
  | 2028/29 | 5 | 3 | 3 | 4 | 6 | – | 2 | 2 | 3 | 3 |

  BY, BE, HB, HH, MV und NI haben keine Angabe.
- **Kursiv gesetzte Tage:** „Schul- und unterrichtsfreie Tage sind kursiv gekennzeichnet." Betroffen sind 15 Einträge, jeweils mit `hinweis`: BY Herbst (alle drei Jahre, ganzer Zeitraum), BW 31.10.2026, 25.03.2027, 13.04.2028, BE 07.05.2027, 26.05.2028, 09.03.2029, 30.04.2029, 11.05.2029, SN 07.05.2027, 26.05.2028, 11.05.2029, MV 18.02.2028.
- **Inseln SH:** Auf Sylt, Föhr, Amrum, Helgoland und den Halligen gelten für Sommer- und Herbstferien Sonderregelungen. `hinweis` bei allen SH-Herbst- und Sommerferien. Laut API (und Suchtreffern zur Ferienverordnung SH) enden dort die Sommerferien eine Woche früher und beginnen die Herbstferien eine Woche früher; diese Inseltermine stehen nicht im JSON.
- **Nordseeinseln NI:** Fußnote nur in der Sommerferienregelung. `hinweis` bei allen NI-Sommerferien 2027 bis 2030.
- **Ende in der Wochenmitte:** Laut Sommerferienregelung dürfen Länder, deren Ferien in der Wochenmitte enden, bis zum folgenden Wochenende verlängern. `hinweis` bei den Sommerferien 2030 von HB, HH, NI (Ende Mittwoch) und NW (Ende Dienstag).
- **Zuständigkeit:** Nur die Sommerferien vereinbart die KMK langfristig, alle übrigen Termine legen die Länder fest und melden sie der KMK. Die Veröffentlichung erfolgt fortlaufend.

## 5. Zuordnung der Spalten

Die Arten folgen streng den KMK-Spalten. Das hat Folgen, die ein Countdown berücksichtigen muss:

- **Bayern, „osterferien":** Die Spalte „Ostern/Frühjahr" enthält zwei Zeiträume, zuerst die Frühjahrsferien im Februar/März (z. B. 08.02.–12.02.2027) und dann die eigentlichen Osterferien (22.03.–02.04.2027).
- **Hamburg, „osterferien":** Das sind die Frühjahrsferien im März (z. B. 01.03.–12.03.2027). „winterferien" ist dort der einzelne Tag der Halbjahrespause.
- **„pfingstferien":** Die Spalte heißt „Himmelfahrt/Pfingsten" und enthält bei vielen Ländern nur den Brückentag nach Himmelfahrt (z. B. SH, TH) oder Brückentag plus Pfingstdienstag (HB, NI).
- **Einzeltage in anderen Spalten:** Brückentage stehen dort, wo die KMK sie einsortiert, z. B. 02.10.2028 und 30.10.2028 unter Herbst, 30.04.2029 unter Ostern (HB, NI, MV, BE) oder unter Pfingsten (ST), 09.03.2029 unter Winter (BE) oder unter Ostern (MV).
- **Sommerferien 2029** tragen `schuljahr: "2028/29"` und stammen aus `FER2028_29.pdf`, Sommerferien 2030 tragen `"2029/30"` und stammen aus der Sommerferienregelung.

## 6. Nicht verifiziert

- **Schleswig-Holstein:** Die Seiten und PDFs auf schleswig-holstein.de waren nicht abrufbar (HTTP 503 bzw. Verbindungsabbruch). Die Bestätigung der Sommerferien 2028 und 2029 beruht nur auf Suchmaschinen-Zusammenfassungen der amtlichen Ferienverordnung, nicht auf dem gelesenen Originaltext.
- **MV, zusätzliche Ferientage** (26./27.11.2026, 25./26.11.2027): nur in der API, auf den Seiten des Landes nicht gefunden.
- **Übrige Länder:** Für BW, BE, HB, HE, NI, NW, RP, SL, SN, ST und TH wurden keine Ministeriumsseiten geprüft, weil KMK und API ohne Abweichung übereinstimmen.
- **Unabhängigkeit der API:** Unbekannt, ob die OpenHolidays API ihre Daten selbst aus den KMK-Kalendern bezieht. Die 100 % Übereinstimmung schließt Lesefehler von mir aus, nicht aber Fehler in der KMK-Tabelle.
- **Sommer 2030:** Vorläufig, da nur aus der langfristigen Regelung. Die Fälle HH und SH 2028/2029 zeigen, dass Länder davon um einzelne Tage abweichen.
- **Bewegliche Ferientage** und die Inseltermine sind im JSON nicht als Daten enthalten.
- **Stand der Kalender:** 09.10.2025. Spätere Änderungen der Länder sind nur insoweit erfasst, als die KMK ihre PDFs aktualisiert hat.

## 7. Selbstkontrolle

Ein Prüfskript lief ohne Fehler über: Schema und Schlüsselreihenfolge, gültige ISO-Daten, `von <= bis`, überlappungsfreie und chronologische Zeiträume je Land/Art/Schuljahr, Sommerferien 38 bis 47 Tage, plausible Monate je Art, Jahreswechsel bei Weihnachtsferien, Pflichtferien je Land und Schuljahr, Zellzahl (Einträge plus „--" = 96 je Kalender).

Stichprobe von 10 Einträgen direkt gegen den PDF-Text, alle identisch: SN Sommer 2027/28, BE Winter 2026/27, ST Herbst 2028/29, TH Weihnachten 2026/27, BY Pfingsten 2028/29, BW Pfingsten 2027/28, SL Herbst 2028/29, BE Weihnachten 2027/28, NI Pfingsten 2026/27, NW Sommer 2030.
