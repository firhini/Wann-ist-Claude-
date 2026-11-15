import type { Metadata } from "next";
import { Brotkrumen } from "@/components/Brotkrumen";
import { JsonLd } from "@/components/JsonLd";
import { Uebersicht, type UebersichtZeile } from "@/components/Uebersicht";
import { STAMM } from "@/data/countdowns";
import { stand } from "@/lib/countdown";
import { datumMitWochentag } from "@/lib/format";
import { type Krume, metadaten, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { nochTage } from "@/lib/texte";
import { tagVon } from "@/lib/zeit";

export const revalidate = 3600;

const PFAD = "/feiertage";
const KRUMEN: Krume[] = [
  { name: "Start", pfad: "/" },
  { name: "Feiertage", pfad: PFAD },
];

function daten(now: Date) {
  const liste = STAMM.filter((c) => c.category === "feiertage")
    .map((c) => ({ c, s: stand(c, now) }))
    .sort((a, b) => a.s.tage - b.s.tage);
  const naechster = liste[0];
  const gesetzlich = liste.find((e) => e.c.gesetzlich === "bundesweit" && e.s.phase === "vor");
  return { liste, naechster, gesetzlich };
}

export function generateMetadata(): Metadata {
  const now = new Date();
  const { gesetzlich } = daten(now);
  const jahr = tagVon(now).y;
  return metadaten({
    titel: `Feiertage ${jahr} und ${jahr + 1}: Wann ist der nächste Feiertag?`,
    beschreibung: gesetzlich
      ? `Der nächste bundesweite Feiertag ist ${gesetzlich.c.title} am ${datumMitWochentag(gesetzlich.s.start)}, ${nochTage(gesetzlich.s.tage)}. Alle Feste und Feiertage mit Datum, Wochentag und Countdown.`
      : "Alle Feste und Feiertage mit Datum, Wochentag und Countdown.",
    pfad: PFAD,
    og: { t: "Wann ist der nächste Feiertag?" },
  });
}

export default function FeiertageHub() {
  const now = new Date();
  const { liste, naechster, gesetzlich } = daten(now);
  const zeilen: UebersichtZeile[] = liste.map(({ c, s }) => ({
    pfad: c.pfad,
    titel: c.title,
    datum: s.start,
    tage: s.tage,
    phase: s.phase,
    extra:
      c.gesetzlich === "bundesweit"
        ? "gesetzlich, bundesweit"
        : Array.isArray(c.gesetzlich)
          ? `gesetzlich in ${c.gesetzlich.length} Ländern`
          : "kein gesetzlicher Feiertag",
  }));

  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({
            titel: "Feiertage: Wann ist der nächste Feiertag?",
            beschreibung: "Alle Feste und Feiertage mit Datum, Wochentag und Countdown.",
            pfad: PFAD,
            geaendert: now,
          }),
          schemaKrumen(KRUMEN),
        ]}
      />
      <div className="blatt pt-4 pb-3">
        <Brotkrumen krumen={KRUMEN} />
      </div>
      <section className="blatt">
        <div className="border-t border-ink pt-8 lg:pt-10">
          <h1 className="text-plakat max-w-[14ch]">Wann ist der nächste Feiertag?</h1>
          <p className="text-lead mt-6 max-w-text">
            {gesetzlich ? (
              <>
                <strong className="font-semibold">
                  Der nächste bundesweite Feiertag ist {gesetzlich.c.title}: {datumMitWochentag(gesetzlich.s.start)},{" "}
                  {nochTage(gesetzlich.s.tage)}.
                </strong>{" "}
              </>
            ) : null}
            {naechster && naechster !== gesetzlich
              ? `Vorher im Kalender: ${naechster.c.title}, ${
                  naechster.s.phase === "vor" ? nochTage(naechster.s.tage) : "heute"
                }.`
              : null}
          </p>
        </div>
      </section>

      <section className="blatt mt-12">
        <h2 className="text-kopf mb-5">Alle Feste und Feiertage, der Reihe nach</h2>
        <Uebersicht
          titel="Feste und Feiertage mit Datum und verbleibenden Tagen"
          zeilen={zeilen}
          spalteName="Fest"
          spalteExtra="Arbeitsfrei?"
        />
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">Fest, Feiertag, freier Tag: der Unterschied</h2>
          <div className="prosa max-w-text max-lg:mt-5 lg:col-span-7 lg:col-start-6">
            <p>
              Nicht jedes Fest ist ein Feiertag, und nicht jeder Feiertag gilt überall. Neun Feiertage sind in ganz
              Deutschland gesetzlich: Neujahr, Karfreitag, Ostermontag, der 1. Mai, Christi Himmelfahrt,
              Pfingstmontag, der Tag der Deutschen Einheit und die beiden Weihnachtstage. Alle weiteren regeln die
              Bundesländer selbst. Deshalb hat Bayern mehr freie Tage als Berlin.
            </p>
            <p>
              Heiligabend, Silvester, Nikolaus oder die Adventssonntage sind Feste, aber keine gesetzlichen
              Feiertage. Wer an diesen Tagen frei hat, verdankt das dem Kalender, dem Tarifvertrag oder dem Chef.
            </p>
            <p>
              Bewegliche Feste wie Ostern, Pfingsten oder der 1. Advent rechnet diese Seite selbst aus, nach
              denselben Regeln wie jeder gedruckte Kalender. Feste Termine wie Weihnachten ändern nur den Wochentag.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
