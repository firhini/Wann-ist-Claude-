import type { Metadata } from "next";
import { KategorieHub } from "@/components/KategorieHub";
import { STAMM } from "@/data/countdowns";
import { type Faq, stand } from "@/lib/countdown";
import { datumMitWochentag, uhrzeit } from "@/lib/format";
import { type Krume, metadaten } from "@/lib/seo";
import { nochTage } from "@/lib/texte";
import { teile } from "@/lib/zeit";

export const revalidate = 3600;

const PFAD = "/jahreszeiten";
const KRUMEN: Krume[] = [
  { name: "Start", pfad: "/" },
  { name: "Jahreszeiten", pfad: PFAD },
];

function daten(now: Date) {
  const alle = STAMM.filter((c) => c.category === "jahreszeiten");
  const zeiten = alle.filter((c) => c.slug !== "zeitumstellung");
  const naechste = zeiten.map((c) => ({ c, s: stand(c, now) })).sort((a, b) => a.s.tage - b.s.tage)[0];
  return { alle, naechste };
}

function satz(now: Date): string {
  const { naechste } = daten(now);
  if (!naechste) return "";
  const t = teile(naechste.s.startZeit);
  return naechste.s.phase === "vor"
    ? `Die nächste Jahreszeit beginnt am ${datumMitWochentag(naechste.s.start)}, um ${uhrzeit(t.h, t.mi)}: Dann ist ${naechste.c.title}, ${nochTage(naechste.s.tage)}.`
    : `Heute ist ${naechste.c.title}.`;
}

export function generateMetadata(): Metadata {
  const now = new Date();
  return metadaten({
    titel: "Jahreszeiten: Wann beginnen Frühling, Sommer, Herbst und Winter?",
    beschreibung: `${satz(now)} Astronomischer und meteorologischer Beginn aller vier Jahreszeiten, dazu die Zeitumstellung.`,
    pfad: PFAD,
    og: { t: "Wann beginnt die nächste Jahreszeit?" },
  });
}

const TEXT = `Jede Jahreszeit hat zwei Anfänge. Der meteorologische liegt immer am Monatsersten: Frühling am 1. März, Sommer am 1. Juni, Herbst am 1. September, Winter am 1. Dezember. Wetterdienste rechnen so, weil sich ganze Monate besser vergleichen lassen.

Der astronomische Anfang richtet sich nach dem Stand der Sonne. Frühling und Herbst beginnen mit den Tagundnachtgleichen, Sommer und Winter mit den Sonnenwenden. Diese Zeitpunkte lassen sich auf die Minute berechnen und verschieben sich jedes Jahr um knapp sechs Stunden, bis ein Schaltjahr sie wieder zurücksetzt. Die Seiten hier zählen auf den astronomischen Zeitpunkt in deutscher Zeit.

Die Daten dazu stammen vom U.S. Naval Observatory. Die [Zeitumstellung](/zeitumstellung) gehört streng genommen nicht zu den Jahreszeiten, steht aber hier, weil sie zweimal im Jahr dieselbe Frage auslöst: Wann wird es abends wieder hell?`;

const FAQ: Faq[] = [
  {
    q: "Wann beginnen die vier Jahreszeiten?",
    a: "Meteorologisch am 1. März, 1. Juni, 1. September und 1. Dezember. Astronomisch um den 20. März, 21. Juni, 22. oder 23. September und 21. oder 22. Dezember. Die genauen Zeitpunkte stehen in der Tabelle.",
  },
  {
    q: "Warum gibt es Jahreszeiten?",
    a: "Weil die Erdachse um etwa 23,4 Grad geneigt ist. Im Lauf eines Jahres ist deshalb mal die Nordhalbkugel, mal die Südhalbkugel stärker zur Sonne geneigt. Der Abstand zur Sonne spielt dafür keine Rolle: Anfang Januar ist die Erde der Sonne sogar am nächsten.",
  },
  {
    q: "Sind die Jahreszeiten auf der Südhalbkugel umgekehrt?",
    a: "Ja. Wenn in Deutschland der Sommer beginnt, beginnt in Australien, Südafrika oder Argentinien der Winter. Die astronomischen Zeitpunkte sind dieselben, nur die Jahreszeit ist die entgegengesetzte.",
  },
];

export default function JahreszeitenHub() {
  const now = new Date();
  const { alle } = daten(now);
  return (
    <KategorieHub
      pfad={PFAD}
      krumen={KRUMEN}
      h1="Wann beginnt die nächste Jahreszeit?"
      antwort={
        <p>
          <strong className="font-semibold">{satz(now)}</strong>
        </p>
      }
      countdowns={alle}
      now={now}
      tabellenTitel="Jahreszeiten und Zeitumstellung"
      spalteName="Ereignis"
      spalteExtra="Uhrzeit"
      extra={(c) => {
        const t = teile(stand(c, now).startZeit);
        return c.slug === "zeitumstellung" ? "in der Nacht zum Sonntag" : `${uhrzeit(t.h, t.mi)} deutscher Zeit`;
      }}
      zeilenTitel="Meteorologischer Beginn"
      zeilen={[
        { label: "Frühling", wert: "1. März" },
        { label: "Sommer", wert: "1. Juni" },
        { label: "Herbst", wert: "1. September" },
        { label: "Winter", wert: "1. Dezember" },
      ]}
      textTitel="Zwei Anfänge für jede Jahreszeit"
      text={TEXT}
      faq={FAQ}
    />
  );
}
