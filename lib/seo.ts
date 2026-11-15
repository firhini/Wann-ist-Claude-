import type { Metadata } from "next";
import { site } from "@/site.config";
import type { Faq } from "./countdown";

export type Krume = { name: string; pfad: string };

export function absolut(pfad: string): string {
  return `${site.url}${pfad === "/" ? "" : pfad}`;
}

/** Entfernt die einfache Link-Auszeichnung [Text](/pfad) für reine Textausgaben. */
export function ohneLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function metadaten(opt: {
  titel: string;
  beschreibung: string;
  pfad: string;
  /** Parameter für das OG-Bild, z. B. { s: "/weihnachten" }. */
  og?: Record<string, string>;
  noindex?: boolean;
}): Metadata {
  const ogParams = new URLSearchParams(opt.og ?? { t: opt.titel });
  const bild = `/og?${ogParams.toString()}`;
  return {
    // Lange Titel bekommen keinen Markennamen angehängt, sonst schneidet Google sie ab.
    title: opt.titel.length > 50 ? { absolute: opt.titel } : opt.titel,
    description: opt.beschreibung,
    alternates: { canonical: opt.pfad },
    robots: opt.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      title: opt.titel,
      description: opt.beschreibung,
      url: opt.pfad,
      images: [{ url: bild, width: 1200, height: 630, alt: opt.titel }],
    },
    twitter: {
      card: "summary_large_image",
      title: opt.titel,
      description: opt.beschreibung,
      images: [bild],
    },
  };
}

export function schemaWebPage(opt: { titel: string; beschreibung: string; pfad: string; geaendert?: Date }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absolut(opt.pfad)}#webpage`,
    url: absolut(opt.pfad),
    name: opt.titel,
    description: opt.beschreibung,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${site.url}/#website` },
    ...(opt.geaendert ? { dateModified: opt.geaendert.toISOString() } : {}),
  };
}

export function schemaFaq(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: ohneLinks(f.a) },
    })),
  };
}

export function schemaKrumen(krumen: Krume[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: krumen.map((k, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: k.name,
      item: absolut(k.pfad),
    })),
  };
}

export function schemaWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "de-DE",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function schemaOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
  };
}
