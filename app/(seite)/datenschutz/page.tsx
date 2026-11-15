import type { Metadata } from "next";
import { Brotkrumen } from "@/components/Brotkrumen";
import { JsonLd } from "@/components/JsonLd";
import { metadaten, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { site } from "@/site.config";

export const metadata: Metadata = metadaten({
  titel: "Datenschutz",
  beschreibung: `Datenschutzerklärung von ${site.name}: keine Cookies, keine Werbung, keine Profile.`,
  pfad: "/datenschutz",
});

export default function Datenschutz() {
  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({ titel: "Datenschutz", beschreibung: "Datenschutz von " + site.name, pfad: "/datenschutz" }),
          schemaKrumen([
            { name: "Start", pfad: "/" },
            { name: "Datenschutz", pfad: "/datenschutz" },
          ]),
        ]}
      />
      <div className="blatt pt-4 pb-3">
        <Brotkrumen
          krumen={[
            { name: "Start", pfad: "/" },
            { name: "Datenschutz", pfad: "/datenschutz" },
          ]}
        />
      </div>
      <article className="blatt">
        <div className="border-t border-ink pt-8">
          <h1 className="text-plakat">Datenschutz</h1>
          <div className="prosa mt-8 max-w-text">
            <p>
              Kurzfassung: Diese Seite setzt keine Cookies, zeigt keine Werbung und bildet keine Profile. Du kannst sie
              benutzen, ohne irgendetwas anzugeben.
            </p>
            <h2>Verantwortlich</h2>
            <p>
              {site.owner.name}
              <br />
              {site.owner.address}
              <br />
              E-Mail: {site.owner.email}
            </p>
            <h2>Hosting und Server-Protokolle</h2>
            <p>
              Die Seite liegt bei Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA. Beim Aufruf verarbeitet
              Netlify technisch notwendige Daten: IP-Adresse, Zeitpunkt, aufgerufene Adresse, Browser und
              Betriebssystem. Das ist nötig, um die Seite auszuliefern und Angriffe abzuwehren. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO. Mit Netlify besteht ein Vertrag zur Auftragsverarbeitung. Für Übermittlungen
              in die USA gelten die Standardvertragsklauseln der EU und das EU-US Data Privacy Framework.
            </p>
            <h2>Reichweitenmessung</h2>
            <p>
              Es gibt keine. Diese Seite bindet kein Analysewerkzeug ein, setzt keine Zählpixel und lädt keine
              Skripte von Dritten.
            </p>
            <h2>Speicher im Browser</h2>
            <p>
              Die Seite merkt sich im Sitzungsspeicher deines Browsers (sessionStorage), dass die kurze Animation beim
              Laden schon gelaufen ist. Dieser Eintrag enthält keine persönlichen Daten, verlässt deinen Browser nicht
              und verschwindet, sobald du den Tab schließt.
            </p>
            <h2>Eigener Countdown</h2>
            <p>
              Wenn du einen eigenen Countdown anlegst, stehen Name und Datum ausschließlich in der Adresse des Links.
              Wir speichern sie nicht in einer Datenbank. Wer den Link hat, kann den Countdown sehen. Schreib also
              nichts hinein, was nicht jeder lesen darf.
            </p>
            <h2>Schriften</h2>
            <p>
              Alle Schriften werden von unserem eigenen Server geladen. Es gibt keine Verbindung zu Google Fonts oder
              anderen Schriftdiensten.
            </p>
            <h2>Werbung</h2>
            <p>
              Derzeit gibt es keine Werbung und keine Affiliate-Links. Sollte sich das ändern, erscheint vorher eine
              Einwilligungsabfrage, und diese Erklärung wird angepasst.
            </p>
            <h2>Deine Rechte</h2>
            <p>
              Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). Dafür genügt eine E-Mail an die oben genannte
              Adresse. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
