# Zeitblatt

Deutschsprachiges Countdown-Portal: „Wie lange noch bis …?“ für Feiertage, Schulferien aller Bundesländer,
Jahreszeiten, Alltag, große Events und jeden Tag des Jahres. Next.js (App Router), TypeScript strict, Tailwind
mit eigenen Tokens, keine Datenbank.

- Gestaltung: [`DESIGN.md`](DESIGN.md)
- Entscheidungen mit Begründung: [`DECISIONS.md`](DECISIONS.md)
- Stand und Prüfungen je Phase: [`PROGRESS.md`](PROGRESS.md)

## Starten

```bash
npm install
npm run dev          # Entwicklung auf http://localhost:3000
npm run build        # Anti-Slop-Prüfung + Produktions-Build
npm start
```

## Prüfen

```bash
npm test             # Datumslogik (Vitest)
npm run anti-slop    # verbotene Gestaltungsmuster im Code, läuft auch vor jedem Build
npm run contrast     # WCAG-AA-Kontraste aller Token-Kombinationen

# Mit laufendem Produktionsserver auf Port 3100 (scripts/serve.sh startet ihn):
npm run smoke -- --alle                        # alle Seiten der Sitemaps, Grundregeln, interne Links
node scripts/screenshots.mjs <ordner> [pfade]  # Screenshots bei 375 und 1440 px
scripts/lighthouse.sh /weihnachten /ferien     # Lighthouse Mobile
```

## Veröffentlichen

Die Seite ist für Netlify eingerichtet. Die Anleitung Schritt für Schritt steht in [`NETLIFY.md`](NETLIFY.md).

## Was vor dem Start zu tun ist

1. **Postleitzahl und Ort** in `site.config.ts` ergänzen: Bei `owner.address` steht noch `[[PLZ ORT]]`.
   Name und E-Mail sind eingetragen. Die Angaben erscheinen in Impressum und Datenschutz.
2. **Domain prüfen.** Der Markenname steht nur in `site.config.ts` (`name`, `domain`). `zeitblatt.de` hatte am
   15.11.2026 keinen DNS-Eintrag, das ist aber keine Zusage der DENIC.
3. **Bei Netlify** optional `CRON_SECRET` setzen (siehe `NETLIFY.md`, Schritt 5). Die Adresse der Seite liest
   der Build selbst aus der Netlify-Variable `URL`.
4. **Datenschutztext** mit dem tatsächlichen Hosting-Vertrag abgleichen.

## Aufbau

```
app/                  Routen. (seite)/ hat Kopf und Fuß, embed/ ist das nackte Widget.
components/           Bausteine laut DESIGN.md, Abschnitt 6
data/                 Alle Inhalte als typisierte Daten
  countdowns/         Feste, Jahreszeiten, Alltag (direkt unter der Wurzel: /weihnachten …)
  ferien.json         Schulferien aus den KMK-Kalendern, Prüfbericht daneben
  ferien.ts           Aufbereitung, Texte und Countdowns für Ferien und Schulanfang
  feiertage-laender.ts  gesetzliche Feiertage je Bundesland
  events-inhalt.ts    Events mit bestätigtem Datum, Recherche in research/events.json
  tage.ts             366 Datumsseiten
lib/                  Datumslogik (Europe/Berlin), Texte, SEO
scripts/              Prüf- und Hilfsskripte
tests/                Vitest
```

## Inhalte pflegen

**Neuer Countdown:** einen Eintrag in `data/countdowns/*.ts` ergänzen (Typ `Countdown` in `lib/countdown.ts`).
Seite, Sitemap, Footer, Tafeln und Widget entstehen daraus automatisch.

**Neues Event:** Eintrag in `data/events-inhalt.ts` (Typ `EventDaten`). Nur mit offiziell bestätigtem Datum
und Quelle. Nach dem letzten Tag verschwindet das Event von selbst aus Listen und Sitemap.

**Ferien aktualisieren:** Sobald die KMK einen neuen Kalender veröffentlicht (derzeit fehlt 2029/30),
`data/ferien.json` ergänzen. Schema und Vorgehen stehen in `data/ferien-pruefbericht.md`.

**Jahreszeiten verlängern:** `node scripts/fetch-jahreszeiten.mjs` (Jahresbereich im Skript).

**Kalenderwochen-Jahre:** `KW_JAHRE` in `data/kalenderwoche.ts`.

## Werbung und Affiliate

Vorbereitet, aber aus: `site.ads.enabled` und `site.affiliate.enabled` in `site.config.ts`.
`<AdSlot>` rendert bei `false` nichts und reserviert bei `true` die volle Höhe (kein Layout-Shift).
Plätze liegen nie im Hero und nie zwischen Zahl und Antwort. Vor dem Einschalten braucht es eine
Einwilligungsabfrage und einen angepassten Datenschutztext.

## Tageswechsel

Alle Seiten sind statisch mit `revalidate = 3600`. Damit die Tageszahl im HTML auch auf selten besuchten Seiten
stimmt, ruft eine geplante Netlify-Funktion kurz nach Mitternacht deutscher Zeit `/api/tageswechsel` auf
(`netlify/functions/tageswechsel.mjs`).
