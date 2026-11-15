# Nochtage auf Netlify veröffentlichen

Schritt für Schritt, vom leeren Netlify-Konto bis zur Seite unter eigener Domain.
Das Projekt ist dafür fertig eingerichtet (`netlify.toml`, geplanter Tageswechsel). Du musst nichts programmieren.

Geprüft am 15.11.2026: Ein Netlify-Build dieses Projekts läuft lokal fehlerfrei durch.
Die Namen der Menüpunkte bei Netlify können sich leicht ändern. Die Reihenfolge der Schritte bleibt dieselbe.

## Schritt 0: Postleitzahl und Ort nachtragen

Im Impressum steht bisher „Ulmenweg 43, [[PLZ ORT]]“. Ein Impressum braucht die vollständige Anschrift.

1. Auf GitHub das Repository `firhini/Wann-ist-Claude-` öffnen.
2. Die Datei `site.config.ts` anklicken, dann oben rechts auf den Stift („Edit this file“).
3. In der Zeile `address: "Ulmenweg 43, [[PLZ ORT]]",` den Platzhalter ersetzen, zum Beispiel
   `address: "Ulmenweg 43, 28195 Bremen",`.
4. Unten auf „Commit changes“ klicken.

Das kannst du auch später machen. Netlify baut die Seite nach jeder Änderung von selbst neu.

## Schritt 1: Netlify-Konto anlegen

1. <https://app.netlify.com/signup> öffnen.
2. „Sign up with GitHub“ wählen und mit deinem GitHub-Konto anmelden.
3. Die Fragen zum Einstieg kannst du überspringen. Der kostenlose Tarif reicht für den Start.

## Schritt 2: Das Projekt importieren

1. Im Netlify-Dashboard auf „Add new site“ (oder „Add new project“) klicken, dann „Import an existing project“.
2. „GitHub“ wählen. Beim ersten Mal fragt GitHub, auf welche Repositories Netlify zugreifen darf:
   „Only select repositories“ wählen und `Wann-ist-Claude-` auswählen, dann „Install“.
3. In der Liste das Repository `Wann-ist-Claude-` anklicken.
4. Netlify zeigt die Build-Einstellungen. Sie kommen aus der Datei `netlify.toml` und sollten so aussehen:
   - Branch to deploy: `claude/countdown-portal-v2-1hiqr7` (der einzige Branch im Repository)
   - Build command: `npm run build`
   - Publish directory: `.next`

   Nichts davon ändern. Umgebungsvariablen brauchst du an dieser Stelle keine.
5. Auf „Deploy“ klicken.

Der erste Build dauert zwei bis vier Minuten. Unter „Deploys“ siehst du den Fortschritt.
Steht dort „Published“, ist die Seite online.

## Schritt 3: Prüfen, ob alles läuft

Netlify gibt der Seite eine Adresse wie `https://irgendein-name-123.netlify.app`. Öffne sie und klick diese Seiten durch:

| Adresse | Was du sehen solltest |
|---|---|
| `/` | Startseite mit der Tafel „Nächste Abfahrten“ |
| `/weihnachten` | große Zahl, darunter laufen die Sekunden |
| `/ferien/sommerferien/bayern` | Ferienseite mit Stempel „BY“ |
| `/eigener-countdown` | Formular. Einen Countdown anlegen und öffnen |
| `/og?s=/weihnachten` | ein Bild mit der Zahl (das Vorschaubild für WhatsApp) |
| `/sitemap.xml` | eine Liste mit acht Teil-Sitemaps |
| `/impressum` | dein Name und deine Anschrift |

Wenn eine davon einen Fehler zeigt: unter „Deploys“ den letzten Eintrag öffnen und das Protokoll ansehen
oder mir die Fehlermeldung schicken.

## Schritt 4: Der Seite einen ordentlichen Namen geben

1. Im Projekt auf „Project configuration“ (früher „Site configuration“).
2. Unter „Project details“ auf „Change project name“.
3. Zum Beispiel `nochtage` eintragen. Die Seite heißt dann `https://nochtage.netlify.app`, falls der Name frei ist.
4. Danach einmal neu bauen lassen: „Deploys“ → „Trigger deploy“ → „Deploy project“.
   Die Seite schreibt ihre eigene Adresse in Sitemap und Vorschaubilder, und die liest sie beim Bauen.

## Schritt 5: Den nächtlichen Tageswechsel absichern (empfohlen)

Kurz nach Mitternacht lässt eine geplante Funktion alle Seiten neu erzeugen, damit überall die richtige
Tageszahl steht. Das funktioniert ohne dein Zutun. Mit einem Schlüssel verhinderst du, dass Fremde
dieses Neu-Erzeugen von außen auslösen können.

1. „Project configuration“ → „Environment variables“ → „Add a variable“.
2. Key: `CRON_SECRET`
3. Value: irgendeine lange, zufällige Zeichenfolge, zum Beispiel 40 Zeichen aus einem Passwort-Generator.
4. Speichern, dann wieder „Deploys“ → „Trigger deploy“ → „Deploy project“.

Ob die Funktion läuft, siehst du unter „Logs“ → „Functions“ → `tageswechsel`. Dort steht nach der ersten
Nacht ein Eintrag „Tageswechsel: 200“.

## Schritt 6: Die eigene Domain verbinden

Die Seite funktioniert auch unter der `netlify.app`-Adresse. Für Google und für den Markennamen ist eine
eigene Domain aber besser.

1. Die Domain `nochtage.de` hast du registriert. Warte, bis dein Anbieter sie als aktiv anzeigt.
   Direkt nach der Bestellung kann das ein paar Minuten bis Stunden dauern.
2. Bei Netlify: „Domain management“ → „Add a domain“ → „Add a domain you already own“ → Domain eintragen.
3. Netlify zeigt dir jetzt genau, welche DNS-Einträge nötig sind. Es gibt zwei Wege:
   - **Einfacher:** „Use Netlify DNS“. Netlify nennt dir vier Nameserver. Die trägst du beim Domain-Anbieter
     als Nameserver ein.
   - **Oder:** Die DNS-Einträge beim Domain-Anbieter selbst setzen, mit den Werten, die Netlify anzeigt
     (ein Eintrag für `nochtage.de`, einer für `www.nochtage.de`).
4. Warten. Bis die Domain überall funktioniert, vergehen meist ein paar Minuten, manchmal einige Stunden.
5. Das Zertifikat für `https` stellt Netlify von selbst aus. Unter „Domain management“ → „HTTPS“ steht dann
   „Your site has HTTPS enabled“.
6. Bei „Domain management“ die Domain ohne `www` als „Primary domain“ festlegen.
7. Noch einmal neu bauen: „Deploys“ → „Trigger deploy“ → „Deploy project“. Erst danach stehen in Sitemap,
   Vorschaubildern und Einbett-Code die neue Adresse.

## Schritt 7: Die Seite bei Google anmelden

1. <https://search.google.com/search-console> öffnen und mit einem Google-Konto anmelden.
2. „Property hinzufügen“ → „Domain“ → `nochtage.de` eintragen.
3. Google zeigt einen TXT-Eintrag. Den trägst du dort ein, wo deine DNS-Einträge liegen
   (bei Netlify DNS: „Domain management“ → Domain anklicken → „Add new record“, Typ TXT).
4. In der Search Console auf „Bestätigen“.
5. Links auf „Sitemaps“, dann `https://nochtage.de/sitemap.xml` eintragen und senden.

Bis die ersten Seiten in der Suche auftauchen, dauert es Tage bis Wochen. Das ist normal.

## Danach

- **Änderungen:** Jede Änderung im Repository auf GitHub löst automatisch einen neuen Build aus. Du musst bei
  Netlify nichts hochladen.
- **Geht etwas schief:** Unter „Deploys“ kannst du mit „Publish deploy“ jederzeit einen älteren Stand
  wieder veröffentlichen.
- **Kosten:** Der kostenlose Tarif hat ein monatliches Kontingent. Unter „Usage“ siehst du, wie viel davon
  verbraucht ist. Wird die Seite groß, zeigt Netlify dort rechtzeitig an, dass ein größerer Tarif nötig wird.
- **Besucherzahlen:** Die Seite misst nichts. Wenn du Zahlen willst, kannst du bei Netlify „Analytics“
  dazubuchen. Das zählt auf dem Server, ohne Cookies und ohne Skript auf der Seite. Der Datenschutztext
  müsste dann um einen Absatz ergänzt werden.

## Was technisch dahintersteckt

| Datei | Zweck |
|---|---|
| `netlify.toml` | Build-Befehl, Node-Version, Next.js-Laufzeit von Netlify |
| `netlify/functions/tageswechsel.mjs` | geplante Funktion, läuft um 22:01 und 23:01 UTC (Mitternacht in Deutschland, Sommer- und Winterzeit) |
| `app/api/tageswechsel/route.ts` | verwirft alle zwischengespeicherten Seiten, prüft `CRON_SECRET` |
| `next.config.ts` | liest die Adresse der Seite aus der Netlify-Variable `URL` |

Eine Variable für die Adresse musst du nicht setzen. Wer sie trotzdem fest vorgeben will, legt
`NEXT_PUBLIC_SITE_URL` an (zum Beispiel `https://nochtage.de`). Sie hat dann Vorrang.
