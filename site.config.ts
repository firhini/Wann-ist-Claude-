/**
 * Zentrale Konfiguration. Der Markenname steht nur hier.
 * Wer die Marke ändern will, ändert `name` und `domain`.
 */
export const site = {
  name: "Zeitblatt",
  domain: "zeitblatt.de",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeitblatt.de",
  claim: "Wie lange noch bis …?",
  description:
    "Zeitblatt zählt die Tage bis Weihnachten, Silvester, zu den Ferien in deinem Bundesland und zu jedem anderen Datum. Ohne Eingabe, mit laufender Uhr.",
  locale: "de-DE",
  timeZone: "Europe/Berlin",
  /** Persönliche Angaben für Impressum und Datenschutz. Bitte ersetzen. */
  owner: {
    name: "[[NAME]]",
    address: "[[ADRESSE]]",
    email: "[[EMAIL]]",
  },
  /** Werbung und Affiliate sind vorbereitet, aber aus. */
  ads: { enabled: false },
  affiliate: { enabled: false },
} as const;

export type Site = typeof site;
