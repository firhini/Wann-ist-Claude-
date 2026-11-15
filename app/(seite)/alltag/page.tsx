import type { Metadata } from "next";
import { KategorieHub } from "@/components/KategorieHub";
import { STAMM } from "@/data/countdowns";
import { stand } from "@/lib/countdown";
import { datumMitWochentag } from "@/lib/format";
import { kalenderwoche } from "@/lib/kw";
import { type Krume, metadaten } from "@/lib/seo";
import { tageDiff, tageImMonat, tagVon, wochentag } from "@/lib/zeit";

export const revalidate = 3600;

const PFAD = "/alltag";
const KRUMEN: Krume[] = [
  { name: "Start", pfad: "/" },
  { name: "Alltag", pfad: PFAD },
];

function satz(now: Date): string {
  const heute = tagVon(now);
  const wt = wochentag(heute);
  const bisSa = (6 - wt + 7) % 7;
  const wochenende =
    wt === 6 || wt === 0
      ? "Es ist Wochenende."
      : `Bis zum Wochenende sind es noch ${bisSa} ${bisSa === 1 ? "Tag" : "Tage"}.`;
  const monat = tageImMonat(heute.y, heute.m) - heute.d;
  const jahr = tageDiff(heute, { y: heute.y, m: 12, d: 31 });
  return `${wochenende} Der Monat hat noch ${monat} ${monat === 1 ? "Tag" : "Tage"}, das Jahr noch ${jahr}.`;
}

export function generateMetadata(): Metadata {
  const now = new Date();
  return metadaten({
    titel: "Alltag: Wie lange noch bis Wochenende, Feierabend, Zahltag?",
    beschreibung: `${satz(now)} Countdowns für Freitag, Feierabend, Monatsende, Zahltag und Jahresende.`,
    pfad: PFAD,
    og: { t: "Wann ist endlich Wochenende?" },
  });
}

const BESCHREIBUNG: Record<string, string> = {
  wochenende: "ab Samstag, 0 Uhr",
  freitag: "der letzte Arbeitstag der Woche",
  feierabend: "montags bis freitags, 17 Uhr",
  monatsende: "der letzte Kalendertag",
  jahresende: "der 31. Dezember",
  payday: "nach der Regel des öffentlichen Dienstes",
};

const TEXT = `Nicht jedes Ziel ist ein Feiertag. Die meisten Countdowns im Kopf sind kleiner: noch drei Tage bis Freitag, noch zwei Stunden bis Feierabend, noch eine Woche bis das Gehalt kommt. Dafür sind diese Seiten da.

Alle rechnen in deutscher Zeit und nach festen, nachlesbaren Regeln. Das Wochenende beginnt am Samstag um Mitternacht, der Feierabend um 17 Uhr, der Zahltag folgt der Regel aus dem Tarifvertrag des öffentlichen Dienstes. Wer andere Zeiten braucht, baut sich einen [eigenen Countdown](/eigener-countdown) mit eigener Uhrzeit.

Für größere Ziele gibt es die [Feiertage](/feiertage) und die [Schulferien](/ferien). Für alle, die in Wochen planen: [Welche KW haben wir?](/kalenderwoche)`;

export default function AlltagHub() {
  const now = new Date();
  const heute = tagVon(now);
  const alle = STAMM.filter((c) => c.category === "alltag");
  const zahltag = alle.find((c) => c.slug === "payday");
  return (
    <KategorieHub
      pfad={PFAD}
      krumen={KRUMEN}
      h1="Wann ist endlich Wochenende?"
      antwort={
        <p>
          <strong className="font-semibold">{satz(now)}</strong> Heute ist {datumMitWochentag(heute)}, KW{" "}
          {kalenderwoche(heute).kw}.
        </p>
      }
      countdowns={alle}
      now={now}
      tabellenTitel="Die kleinen Ziele"
      spalteName="Ziel"
      spalteExtra="Gezählt wird bis"
      extra={(c) => BESCHREIBUNG[c.slug] ?? ""}
      zeilenTitel="Stand heute"
      zeilen={[
        { label: "Tag im Monat", wert: `${heute.d} von ${tageImMonat(heute.y, heute.m)}` },
        { label: "Kalenderwoche", wert: `KW ${kalenderwoche(heute).kw}` },
        ...(zahltag ? [{ label: "Nächster Zahltag", wert: `in ${stand(zahltag, now).tage} Tagen` }] : []),
      ]}
      textTitel="Countdowns für zwischendurch"
      text={TEXT}
    />
  );
}
