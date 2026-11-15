import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Die OG-Schriften werden zur Laufzeit per fs gelesen und müssen ins Deployment.
  outputFileTracingIncludes: {
    "/og": ["./assets/og/**"],
  },
};

export default config;
