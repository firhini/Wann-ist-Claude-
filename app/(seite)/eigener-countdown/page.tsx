import type { Metadata } from "next";
import Link from "next/link";
import { Brotkrumen } from "@/components/Brotkrumen";
import { FaqListe } from "@/components/FaqListe";
import { Generator } from "@/components/Generator";
import { JsonLd } from "@/components/JsonLd";
import type { Faq } from "@/lib/countdown";
import { eigenerPfad } from "@/lib/eigener";
import { datumLang, tausender } from "@/lib/format";
import { type Krume, metadaten, schemaFaq, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { iso, plusTage, tageDiff, tagVon, wochentagAmOderNach } from "@/lib/zeit";

export const revalidate = 3600;

const PFAD = "/eigener-countdown";
const KRUMEN: Krume[] = [
  { name: "Start", pfad: "/" },
  { name: "Eigener Countdown", pfad: PFAD },
];
const BESCHREIBUNG =
  "Countdown für jedes Datum erstellen: Name, Datum und Uhrzeit eingeben, Link kopieren, teilen. Ohne Anmeldung, ohne Speicherung, mit Vorschaubild für WhatsApp.";

export const metadata: Metadata = metadaten({
  titel: "Eigenen Countdown erstellen: kostenlos, ohne Anmeldung",
  beschreibung: BESCHREIBUNG,
  pfad: PFAD,
  og: { t: "Eigenen Countdown erstellen" },
});

const FAQ: Faq[] = [
  {
    q: "Muss ich mich anmelden?",
    a: "Nein. Es gibt kein Konto und kein Passwort. Du füllst das Formular aus und bekommst einen Link.",
  },
  {
    q: "Wo wird mein Countdown gespeichert?",
    a: "Nirgends. Name, Datum und Uhrzeit stehen ausschließlich im Link selbst. Wer den Link hat, sieht den Countdown. Wer ihn nicht hat, kann ihn auch nicht finden. Schreib trotzdem nichts hinein, was nicht jeder lesen dürfte, an den der Link weitergeleitet wird.",
  },
  {
    q: "Kann ich den Countdown nachträglich ändern?",
    a: "Ja, indem du einfach einen neuen anlegst. Der alte Link bleibt gültig und zeigt weiter das alte Datum. Löschen musst du nichts, weil nichts gespeichert ist.",
  },
  {
    q: "Wie sieht der Link in WhatsApp aus?",
    a: "Messenger zeigen ein Vorschaubild mit dem Namen und der aktuellen Zahl der Tage. Das Bild wird beim Verschicken erzeugt. Manche Apps merken sich die Vorschau, die Zahl im Chat kann deshalb älter sein als die auf der Seite.",
  },
  {
    q: "In welcher Zeitzone wird gezählt?",
    a: "In deutscher Zeit, egal wo du oder die Empfänger gerade seid. Ein Countdown bis 14 Uhr endet um 14 Uhr in Berlin.",
  },
];

export default function EigenerCountdown() {
  const now = new Date();
  const heute = tagVon(now);
  const freitag = wochentagAmOderNach(plusTage(heute, 1), 5);
  const beispiele = [
    { name: "Sommerurlaub", datum: iso({ y: heute.m > 6 ? heute.y + 1 : heute.y, m: 7, d: 24 }), motiv: "horizont" },
    { name: "Feierabend am Freitag", datum: iso(freitag), zeit: "16:00", motiv: "uhr" },
    { name: "Omas 80. Geburtstag", datum: iso({ y: heute.y + 1, m: 3, d: 14 }), motiv: "blume" },
    { name: "Hochzeit", datum: iso({ y: heute.y + 1, m: 6, d: 12 }), zeit: "14:00", motiv: "herz" },
    { name: "Abiball", datum: iso({ y: heute.y + 1, m: 6, d: 26 }), zeit: "18:00", motiv: "stern" },
    { name: "Rente", datum: iso({ y: heute.y + 5, m: 1, d: 1 }), motiv: "sonne" },
  ];
  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({ titel: "Eigenen Countdown erstellen", beschreibung: BESCHREIBUNG, pfad: PFAD }),
          schemaKrumen(KRUMEN),
          schemaFaq(FAQ),
        ]}
      />
      <div className="blatt pt-4 pb-3">
        <Brotkrumen krumen={KRUMEN} />
      </div>
      <section className="blatt">
        <div className="grid border-t border-ink lg:grid-cols-12 lg:gap-x-6">
          <div className="pt-7 pb-8 lg:col-span-5 lg:pt-10 lg:pb-12 lg:pr-6">
            <h1 className="text-plakat">Eigenen Countdown erstellen</h1>
            <p className="text-lead mt-6 max-w-text">
              <strong className="font-semibold">Name, Datum, fertig.</strong> Du bekommst einen Link, den du speichern
              oder verschicken kannst. Keine Anmeldung, und gespeichert wird bei uns nichts.
            </p>
            <p className="mt-4 max-w-text">
              Alles, was der Countdown braucht, steht im Link selbst. Deshalb funktioniert er auch in fünf Jahren
              noch, solange es diese Seite gibt.
            </p>
          </div>
          <div className="pb-10 lg:col-span-7 lg:border-l lg:border-ink lg:pt-10 lg:pb-12 lg:pl-6">
            <Generator heuteIso={iso(heute)} />
          </div>
        </div>
      </section>

      <section className="blatt mt-abschnitt">
        <h2 className="text-kopf mb-5">Zum Ausprobieren</h2>
        <ul className="border-t border-ink">
          {beispiele.map((b) => {
            const d = { y: Number(b.datum.slice(0, 4)), m: Number(b.datum.slice(5, 7)), d: Number(b.datum.slice(8, 10)) };
            const n = tageDiff(heute, d);
            return (
              <li key={b.name} className="grid items-baseline gap-x-6 gap-y-1 border-b border-ink py-4 sm:grid-cols-12">
                <Link href={eigenerPfad(b)} rel="nofollow" className="display text-zeile link-still sm:col-span-6">
                  {b.name}
                </Link>
                <p className="mono text-daten sm:col-span-4">
                  {datumLang(d)}
                  {b.zeit ? `, ${b.zeit} Uhr` : ""}
                </p>
                <p className="mono text-fein text-ink-soft sm:col-span-2 sm:text-right">
                  in {tausender(n)} {n === 1 ? "Tag" : "Tagen"}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">Wie das funktioniert</h2>
          <div className="prosa max-w-text max-lg:mt-5 lg:col-span-7 lg:col-start-6">
            <p>
              Die meisten Countdown-Seiten wollen erst ein Konto, dann eine E-Mail-Adresse und zeigen am Ende
              Werbung über der Zahl. Hier steht alles in der Adresse des Countdowns: der Name, das Datum, die
              Uhrzeit und das Motiv. Die Seite liest diese Angaben aus dem Link und rechnet.
            </p>
            <p>
              Gezählt werden Kalendertage in deutscher Zeit, so wie überall auf dieser Seite. Mit Uhrzeit zählt der
              Countdown am letzten Tag die Stunden, dann die Minuten herunter. Ist der Termin erreicht, steht dort
              „Heute“. Mit dem Haken bei „Jedes Jahr wiederholen“ springt er danach aufs nächste Jahr, praktisch für
              Geburtstage und Jahrestage.
            </p>
            <p>
              Für feste Anlässe brauchst du keinen eigenen Countdown. Die gibt es schon fertig: alle{" "}
              <Link href="/feiertage">Feiertage</Link>, die <Link href="/ferien">Schulferien in jedem Bundesland</Link>,
              das <Link href="/wochenende">Wochenende</Link> und{" "}
              <Link href="/tage-bis">jeden einzelnen Tag des Jahres</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">Häufige Fragen</h2>
          <div className="lg:col-span-8">
            <FaqListe faq={FAQ} />
          </div>
        </div>
      </section>
    </>
  );
}
