import type { Metadata } from "next";
import Link from "next/link";
import { HeuteBlatt } from "@/components/HeuteBlatt";
import { JsonLd } from "@/components/JsonLd";
import { Tafel } from "@/components/Tafel";
import { naechste } from "@/data/alle";
import { startHubs, startSchnell, startTafel } from "@/data/start";
import { datumMitWochentag, datumOhneJahr, wochentagName } from "@/lib/format";
import { kalenderwoche, montagDerWoche } from "@/lib/kw";
import { metadaten, schemaOrganization, schemaWebPage, schemaWebSite } from "@/lib/seo";
import { plusTage, tagVon } from "@/lib/zeit";
import { site } from "@/site.config";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const now = new Date();
  const erste = naechste(startTafel(), now, 1)[0];
  const zusatz = erste && erste.phase === "vor" ? ` Als Nächstes: ${erste.titel} in ${erste.tage} ${erste.tage === 1 ? "Tag" : "Tagen"}.` : "";
  return {
    ...metadaten({
      titel: `${site.name}: Wie lange noch bis …? Countdowns für Feiertage und Ferien`,
      beschreibung: `${site.description}${zusatz}`,
      pfad: "/",
      og: { t: "Wie lange noch bis …?" },
    }),
    title: { absolute: `${site.name}: Wie lange noch bis …? Countdowns für Feiertage und Ferien` },
  };
}

export default function Start() {
  const now = new Date();
  const heute = tagVon(now);
  const zeilen = naechste(startTafel(), now, 10);
  const kw = kalenderwoche(heute);
  const montag = montagDerWoche(heute);
  const sonntag = plusTage(montag, 6);
  const hubs = startHubs(now);

  return (
    <>
      <JsonLd
        daten={[
          schemaWebSite(),
          schemaOrganization(),
          schemaWebPage({ titel: site.name, beschreibung: site.description, pfad: "/", geaendert: now }),
        ]}
      />

      <section className="blatt">
        <div className="grid border-t border-ink lg:grid-cols-12 lg:gap-x-6">
          <div className="pt-8 pb-8 lg:col-span-7 lg:pt-12 lg:pb-14 lg:pr-6">
            <h1 className="text-plakat">Wie lange noch bis …?</h1>
            <p className="text-lead mt-6 max-w-text">
              {site.name} zählt die Tage: bis Weihnachten, bis zu den Ferien, bis zum Wochenende. Die Zahl steht
              schon da. Du musst kein Datum eingeben und nichts ausrechnen.
            </p>
            {zeilen[0] && (
              <p className="mt-4 max-w-text">
                Heute ist {datumMitWochentag(heute)}. Als Nächstes kommt{" "}
                <Link href={zeilen[0].pfad} className="link font-semibold">
                  {zeilen[0].titel}
                </Link>
                {zeilen[0].phase === "vor"
                  ? `, in ${zeilen[0].tage} ${zeilen[0].tage === 1 ? "Tag" : "Tagen"}.`
                  : ", und zwar heute."}
              </p>
            )}
            <ul className="mono text-daten mt-8 flex flex-wrap gap-x-5 gap-y-1" aria-label="Oft gefragt">
              {startSchnell().map((l) => (
                <li key={l.pfad}>
                  <Link href={l.pfad} className="link inline-block py-2">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <aside className="pb-8 lg:col-span-5 lg:border-l lg:border-ink lg:pt-10 lg:pb-12 lg:pl-6" aria-label="Heute">
            <HeuteBlatt serverNow={now.getTime()} />
          </aside>
        </div>
      </section>

      <Tafel
        titel="Nächste Abfahrten"
        zeilen={zeilen}
        fuss={
          <>
            <Link href="/feiertage" className="link">
              Alle Feiertage mit Datum und Countdown
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href="/ferien" className="link">
              Schulferien in allen Bundesländern
            </Link>
          </>
        }
      />

      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <h2 className="text-kopf">Welche KW haben wir?</h2>
            <p className="mt-3 flex items-end gap-x-3">
              <span className="zahl zahl-klein">{kw.kw}</span>
              <span className="display text-kopf pb-1 text-orchid">
                KW
                <span className="block text-ink-soft">{kw.jahr}</span>
              </span>
            </p>
          </div>
          <div className="max-lg:mt-6 lg:col-span-6 lg:col-start-7">
            <p className="text-lead max-w-text">
              Wir haben Kalenderwoche {kw.kw}. Sie läuft von {wochentagName(montag)}, {datumOhneJahr(montag)}, bis{" "}
              {wochentagName(sonntag)}, {datumOhneJahr(sonntag)} {sonntag.y}.
            </p>
            <p className="mt-4 max-w-text">
              Gezählt wird nach ISO 8601: Die Woche beginnt am Montag, und die erste Kalenderwoche ist die mit dem
              ersten Donnerstag des Jahres.{" "}
              <Link href="/kalenderwoche" className="link">
                Alle Kalenderwochen {kw.jahr} im Überblick
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="blatt mt-abschnitt">
        <h2 className="text-kopf mb-5">Alle Strecken</h2>
        <ul className="border-t border-ink">
          {hubs.map((h) => (
            <li
              key={h.pfad}
              className="grid items-baseline gap-x-6 gap-y-1 border-b border-ink py-4 lg:grid-cols-12"
            >
              <Link href={h.pfad} className="display text-zeile link-still lg:col-span-3">
                {h.name}
              </Link>
              <p className="max-w-text lg:col-span-6">{h.text}</p>
              <p className="mono text-fein text-ink-soft lg:col-span-3 lg:text-right">{h.naechstes}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
