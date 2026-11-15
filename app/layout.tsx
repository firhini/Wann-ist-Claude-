import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/site.config";
import "./globals.css";

const bigShoulders = localFont({
  src: "./fonts/BigShouldersDisplay-latin.woff2",
  variable: "--font-big-shoulders",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
});

const atkinson = localFont({
  src: "./fonts/AtkinsonHyperlegibleNext-latin.woff2",
  variable: "--font-atkinson",
  weight: "200 800",
  display: "swap",
  adjustFontFallback: "Arial",
});

const martian = localFont({
  src: "./fonts/MartianMono-latin.woff2",
  variable: "--font-martian",
  weight: "100 800",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.claim}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false, date: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3ece0" },
    { media: "(prefers-color-scheme: dark)", color: "#17151a" },
  ],
};

/**
 * Das Kalenderblatt reißt nur einmal pro Besuch ab. Das Skript läuft vor dem ersten Bild,
 * setzt das Attribut und nimmt es wieder weg, sobald die Animation vorbei ist.
 */
const ABRISS = `try{if(!sessionStorage.getItem("zb-abriss")){sessionStorage.setItem("zb-abriss","1");var d=document.documentElement;d.setAttribute("data-abriss","");setTimeout(function(){d.removeAttribute("data-abriss")},1500)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${bigShoulders.variable} ${atkinson.variable} ${martian.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ABRISS }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
