import type { Metadata } from "next";
import { Brotkrumen } from "@/components/Brotkrumen";
import { JsonLd } from "@/components/JsonLd";
import { metadaten, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { site } from "@/site.config";

export const metadata: Metadata = metadaten({
  titel: "Impressum",
  beschreibung: `Impressum von ${site.name}: Anbieter, Anschrift und Kontakt.`,
  pfad: "/impressum",
});

export default function Impressum() {
  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({ titel: "Impressum", beschreibung: "Impressum von " + site.name, pfad: "/impressum" }),
          schemaKrumen([
            { name: "Start", pfad: "/" },
            { name: "Impressum", pfad: "/impressum" },
          ]),
        ]}
      />
      <div className="blatt pt-4 pb-3">
        <Brotkrumen
          krumen={[
            { name: "Start", pfad: "/" },
            { name: "Impressum", pfad: "/impressum" },
          ]}
        />
      </div>
      <article className="blatt">
        <div className="border-t border-ink pt-8">
          <h1 className="text-plakat">Impressum</h1>
          <div className="prosa mt-8 max-w-text">
            <h2>Angaben gemäß § 5 DDG</h2>
            <p>
              {site.owner.name}
              <br />
              {site.owner.address}
            </p>
            <h2>Kontakt</h2>
            <p>E-Mail: {site.owner.email}</p>
            <h2>Verantwortlich für den Inhalt</h2>
            <p>
              {site.owner.name}, Anschrift wie oben (§ 18 Abs. 2 MStV).
            </p>
            <h2>Haftung für Inhalte</h2>
            <p>
              Alle Termine auf dieser Seite sind sorgfältig berechnet oder aus offiziellen Quellen übernommen, die
              jeweils genannt sind. Trotzdem können sich Termine ändern, etwa wenn ein Land seine Ferien neu regelt
              oder ein Veranstalter verschiebt. Verbindlich ist immer die genannte Quelle. Für Entscheidungen, die du
              auf Grundlage dieser Seite triffst, übernehmen wir keine Haftung.
            </p>
            <h2>Haftung für Links</h2>
            <p>
              Diese Seite verlinkt auf fremde Websites, vor allem auf Quellen. Für deren Inhalte sind die jeweiligen
              Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
            </p>
            <h2>Schriften</h2>
            <p>
              Big Shoulders Display, Atkinson Hyperlegible Next und Martian Mono, jeweils unter der SIL Open Font
              License 1.1. Die Schriftdateien liegen auf unserem eigenen Server.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
