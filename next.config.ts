import type { NextConfig } from "next";

/**
 * Adresse der Seite. Reihenfolge: eigene Angabe (NEXT_PUBLIC_SITE_URL), sonst die Hauptadresse,
 * die Netlify beim Build in URL bereitstellt, sonst die geplante Domain. Der Wert wird fest
 * eingebaut, damit Server und Browser dieselbe Adresse kennen.
 */
const SEITEN_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "https://nochtage.de").replace(/\/$/, "");

const config: NextConfig = {
  poweredByHeader: false,
  env: { NEXT_PUBLIC_SITE_URL: SEITEN_URL },
  reactStrictMode: true,
  // Die OG-Schriften werden zur Laufzeit per fs gelesen und müssen ins Deployment.
  outputFileTracingIncludes: {
    "/og": ["./assets/og/**"],
  },
  async headers() {
    return [
      // Geteilte Countdowns und Widgets gehören nicht in den Index.
      { source: "/c", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/embed/:pfad*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
    ];
  },
};

export default config;
