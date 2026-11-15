import type { Metadata } from "next";
import { KategorieHub } from "@/components/KategorieHub";
import { eventDaten, kommendeEvents } from "@/data/events";
import { RUBRIK_NAME } from "@/data/events-typ";
import { type Faq, stand } from "@/lib/countdown";
import { datumMitWochentag } from "@/lib/format";
import { type Krume, metadaten } from "@/lib/seo";
import { nochTage } from "@/lib/texte";

export const revalidate = 3600;

const PFAD = "/events";
const KRUMEN: Krume[] = [
  { name: "Start", pfad: "/" },
  { name: "Events", pfad: PFAD },
];

function daten(now: Date) {
  const alle = kommendeEvents(now)
    .map((c) => ({ c, s: stand(c, now) }))
    .sort((a, b) => a.s.tage - b.s.tage);
  return { alle, naechstes: alle.find((e) => e.s.phase === "vor") ?? alle[0], laufend: alle.filter((e) => e.s.phase !== "vor") };
}

function satz(now: Date): string {
  const { naechstes, laufend } = daten(now);
  if (!naechstes) return "Im Moment steht kein bestätigter Termin an.";
  const jetzt = laufend.length ? ` Gerade läuft: ${laufend.map((e) => e.c.title).join(", ")}.` : "";
  return `Als Nächstes: ${naechstes.c.title} am ${datumMitWochentag(naechstes.s.start)}, ${nochTage(naechstes.s.tage)}.${jetzt}`;
}

export function generateMetadata(): Metadata {
  const now = new Date();
  const { alle } = daten(now);
  return metadaten({
    titel: "Events: Countdowns für Sport, Games, Feste und Finsternisse",
    beschreibung: `${satz(now)} ${alle.length} große Termine mit offiziell bestätigtem Datum, jeweils mit Quelle.`,
    pfad: PFAD,
    og: { t: "Was kommt als Nächstes?" },
  });
}

const TEXT = `Auf dieser Seite stehen große Termine, auf die viele warten: Turniere, Spielereleases, Feste, Wahlen, Finsternisse. Aufgenommen wird ein Termin nur, wenn der Veranstalter, der Verband, die Behörde oder der Hersteller das Datum selbst veröffentlicht hat. Die Quelle steht auf jeder Seite.

Das heißt auch: Manches fehlt. Kinostarts, deren deutscher Termin nur in der Fachpresse steht, sind nicht dabei. Turniere ohne veröffentlichten Spielplan auch nicht. Lieber eine Seite weniger als ein Countdown, der auf ein Gerücht zählt.

Uhrzeiten sind in deutscher Zeit angegeben. Wo noch keine bestätigt ist, zählt die Seite bis zum Tagesbeginn und sagt das dazu. Ist ein Termin vorbei, verschwindet er aus dieser Liste. Für alles, was hier nicht steht, gibt es den [eigenen Countdown](/eigener-countdown).`;

const FAQ: Faq[] = [
  {
    q: "Warum fehlt ein bestimmtes Event?",
    a: "Entweder ist das Datum noch nicht offiziell bestätigt, oder wir haben es noch nicht geprüft. Gerüchte, Leaks und Termine aus zweiter Hand nehmen wir nicht auf.",
  },
  {
    q: "Was passiert, wenn ein Termin verschoben wird?",
    a: "Dann stimmt der Countdown nicht mehr, bis wir das Datum korrigiert haben. Verbindlich ist immer die Quelle, die auf der jeweiligen Seite verlinkt ist.",
  },
  {
    q: "In welcher Zeitzone sind die Uhrzeiten angegeben?",
    a: "In deutscher Zeit. Ein Ereignis, das in Los Angeles am Abend beginnt, steht hier mit dem deutschen Datum und der deutschen Uhrzeit, also oft am Folgetag.",
  },
];

export default function EventsHub() {
  const now = new Date();
  const { alle } = daten(now);
  return (
    <KategorieHub
      pfad={PFAD}
      krumen={KRUMEN}
      h1="Was kommt als Nächstes?"
      antwort={
        <p>
          <strong className="font-semibold">{satz(now)}</strong>
        </p>
      }
      countdowns={alle.map((e) => e.c)}
      now={now}
      tabellenTitel="Alle Termine mit bestätigtem Datum"
      spalteName="Event"
      spalteExtra="Rubrik und Ort"
      extra={(c) => {
        const d = eventDaten(c.slug);
        return d ? `${RUBRIK_NAME[d.rubrik]} · ${d.ort}` : "";
      }}
      zeilenTitel="Die nächsten fünf"
      zeilen={alle
        .filter((e) => e.s.phase === "vor")
        .slice(0, 5)
        .map((e) => ({ label: e.c.tafel ?? e.c.title, wert: `in ${e.s.tage} ${e.s.tage === 1 ? "Tag" : "Tagen"}` }))}
      textTitel="Nur bestätigte Termine"
      text={TEXT}
      faq={FAQ}
    />
  );
}
