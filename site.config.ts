/**
 * Zentrale Konfiguration. Der Markenname steht nur hier.
 * Wer die Marke ändern will, ändert `name` und `domain`.
 */
export const site = {
  name: "Nochtage",
  /** Der Teil des Namens, der in der Wortmarke in Orchid steht. Leer lassen für eine einfarbige Wortmarke. */
  akzent: "tage",
  domain: "nochtage.de",
  /** Wird beim Build gesetzt: eigene Angabe, sonst die Adresse der Netlify-Seite (siehe next.config.ts). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nochtage.de",
  claim: "Wie lange noch bis …?",
  description:
    "Nochtage zählt die Tage bis Weihnachten, Silvester, zu den Ferien in deinem Bundesland und zu jedem anderen Datum. Ohne Eingabe, mit laufender Uhr.",
  locale: "de-DE",
  timeZone: "Europe/Berlin",
  /**
   * Persönliche Angaben für Impressum und Datenschutz.
   * Postleitzahl und Ort fehlen noch: [[PLZ ORT]] ersetzen, bevor die Seite online geht.
   */
  owner: {
    name: "Farhan Ahmad",
    address: "Ulmenweg 43, [[PLZ ORT]]",
    email: "Farhan2008hb@gmail.com",
  },
  /** Werbung und Affiliate sind vorbereitet, aber aus. */
  ads: { enabled: false },
  affiliate: { enabled: false },
} as const;

export type Site = typeof site;
