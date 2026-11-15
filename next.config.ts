import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
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
