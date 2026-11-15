import type { ReactNode } from "react";
import { verwandte } from "@/data/alle";
import { BUNDESLAENDER } from "@/data/bundeslaender";
import { type Countdown, type Faq, einheiten, naechsteJahre, stand } from "@/lib/countdown";
import { datumLang, uhrzeit, wochentagName, zeitraumKurz } from "@/lib/format";
import { kalenderwoche } from "@/lib/kw";
import { type Krume, schemaFaq, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { antwort, beschreibung, seitenTitel, uhrVon } from "@/lib/texte";
import { mitternacht, plusTage, tagNr, tagVon } from "@/lib/zeit";
import { AdSlot, AffiliateSlot } from "./AdSlot";
import { Brotkrumen } from "./Brotkrumen";
import { EinheitenListe } from "./EinheitenListe";
import { FaqListe } from "./FaqListe";
import { Jahre, type JahrZeile } from "./Jahre";
import { JsonLd } from "./JsonLd";
import { Motiv } from "./Motiv";
import { Tafel, type TafelZeile } from "./Tafel";
import { Teilen } from "./Teilen";
import { Prosa } from "./Text";
import { type Termin, Zaehler } from "./Zaehler";

/** Das Vorkommen nach dem laufenden/nächsten, damit der Zähler nach dem Termin weiterspringen kann. */
export function folgeTermin(c: Countdown, now: Date): Termin | null {
  const s = stand(c, now);
  try {
    const danach = mitternacht(plusTage(s.ende, 1));
    const start = c.getNextDate(danach);
    if (tagNr(tagVon(start)) <= tagNr(s.ende)) return null;
    const ende = c.getEndDate ? c.getEndDate(danach) : start;
    return { start: start.getTime(), ende: mitternacht(tagVon(ende)).getTime() };
  } catch {
    return null;
  }
}

export function termineVon(c: Countdown, now: Date): Termin[] {
  const s = stand(c, now);
  const erster: Termin = { start: s.startZeit.getTime(), ende: mitternacht(s.ende).getTime() };
  const folge = folgeTermin(c, now);
  return folge ? [erster, folge] : [erster];
}

function gesetzlichText(c: Countdown): string | null {
  if (c.gesetzlich === undefined) return null;
  if (c.gesetzlich === false) return "nein";
  if (c.gesetzlich === "bundesweit") return "ja, bundesweit";
  return `in ${c.gesetzlich.length} von 16 Ländern`;
}

function fragenZumFeiertag(c: Countdown): Faq[] {
  if (!Array.isArray(c.gesetzlich)) return [];
  const namen = c.gesetzlich.map((code) => BUNDESLAENDER.find((b) => b.code === code)?.name ?? code);
  return [
    {
      q: `In welchen Bundesländern ist ${c.title} ein Feiertag?`,
      a: `${c.nominativ ?? c.title} ist gesetzlicher Feiertag in ${namen.length === 1 ? namen[0] : `${namen.slice(0, -1).join(", ")} und ${namen[namen.length - 1]}`}. In den übrigen Bundesländern ist es ein normaler Werktag.`,
    },
  ];
}

type Props = {
  c: Countdown;
  now: Date;
  krumen: Krume[];
  /** Pfad des Widgets, z. B. "/embed/weihnachten". Ohne Angabe gibt es keinen Einbetten-Knopf. */
  embedPfad?: string;
  /** Eigene Zeilen für die Tabelle statt der berechneten Jahre. */
  jahre?: { titel: string; zeilen: JahrZeile[]; spalteEins?: string; hinweis?: ReactNode };
  /** Zusätzliche Abschnitte zwischen Text und FAQ. */
  zusatz?: ReactNode;
  /** Motiv ersetzen (Ferien: Stempel). */
  motiv?: ReactNode;
  /** Eigene Tafelzeilen statt der verwandten Countdowns. */
  tafel?: { titel: string; zeilen: TafelZeile[] };
  /** Überschrift des Textabschnitts. */
  textTitel?: string;
};

export function CountdownSeite({ c, now, krumen, embedPfad, jahre, zusatz, motiv, tafel, textTitel }: Props) {
  const s = stand(c, now);
  const termine = termineVon(c, now);
  const folgeStart = termine[1] ? tagVon(new Date(termine[1].start)) : null;
  const a = antwort(c, s, folgeStart);
  const e = einheiten(now, s.startZeit);
  const titel = seitenTitel(c, s);
  const faq = [...c.faq, ...(c.faqDynamisch?.(now) ?? []), ...fragenZumFeiertag(c)];
  const kw = kalenderwoche(s.start);
  const istZeitraum = c.art === "zeitraum" && s.tageGesamt > 1;
  const uhr = uhrVon(c, s);

  const zeilen: { label: string; wert: string }[] = [
    {
      label: istZeitraum ? "Zeitraum" : "Datum",
      wert: istZeitraum ? zeitraumKurz(s.start, s.ende) : datumLang(s.start),
    },
    { label: istZeitraum ? "Erster Tag" : "Wochentag", wert: wochentagName(s.start) },
    ...(uhr ? [{ label: "Uhrzeit", wert: uhrzeit(uhr.h, uhr.mi) }] : []),
    ...(istZeitraum ? [{ label: "Dauer", wert: `${s.tageGesamt} Tage` }] : []),
    { label: "Kalenderwoche", wert: `KW ${kw.kw}` },
    ...(gesetzlichText(c) ? [{ label: "Gesetzlicher Feiertag", wert: gesetzlichText(c) as string }] : []),
    ...(c.zeilen?.(now) ?? []),
  ];

  const eigene = jahre ?? c.tabelle?.(now);
  const jahreZeilen: JahrZeile[] =
    eigene?.zeilen ?? naechsteJahre(c, now, 6).map((j) => ({ jahr: j.jahr, start: j.start, ende: j.ende }));
  const jahreTitel = eigene?.titel ?? `${c.title} in den nächsten Jahren`;
  const tafelZeilen = tafel?.zeilen ?? verwandte(c, now, 7);

  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({ titel, beschreibung: beschreibung(c, s, e, folgeStart), pfad: c.pfad, geaendert: now }),
          schemaKrumen(krumen),
          ...(faq.length ? [schemaFaq(faq)] : []),
        ]}
      />

      <div className="blatt pt-4 pb-3">
        <Brotkrumen krumen={krumen} />
      </div>

      {/* ---------- Hero: links die Zahl, rechts der Fahrplan ---------- */}
      <section className="blatt">
        <div className="grid border-t border-ink lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col pt-6 pb-8 lg:col-span-8 lg:pt-8 lg:pb-12 lg:pr-6">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-frage max-w-[18ch]">{c.question}</h1>
              {motiv ? (
                <div className="shrink-0">{motiv}</div>
              ) : (
                <div className="w-14 shrink-0 text-ink sm:w-20 lg:w-28">
                  <Motiv name={c.motif} />
                </div>
              )}
            </div>
            <p className="text-lead order-3 mt-7 max-w-text">
              <strong className="font-semibold">{a.satz}</strong> {a.zusatz}
            </p>
            <div className="order-2 mt-5 lg:mt-8">
              <Zaehler
                serverNow={now.getTime()}
                termine={termine}
                art={c.art ?? "tag"}
                bis={c.bis}
                heuteText={c.heute}
                laeuftText={c.laeuft}
                hatUhrzeit={Boolean(c.uhrzeit) || Boolean(c.hatUhrzeit)}
                vorbeiText={c.vorbeiText}
              />
            </div>
            <div className="order-4 mt-7">
              <Teilen titel={c.question} text={a.satz} embedPfad={embedPfad} />
            </div>
          </div>

          <aside className="pb-8 lg:col-span-4 lg:border-l lg:border-ink lg:pt-8 lg:pb-12 lg:pl-6" aria-label="Termin und Einheiten">
            <dl className="fahrplan border-t border-ink lg:border-t-0">
              {zeilen.map((z) => (
                <div key={z.label}>
                  <dt>{z.label}</dt>
                  <dd>{z.wert}</dd>
                </div>
              ))}
            </dl>
            {s.phase === "vor" && <EinheitenListe serverNow={now.getTime()} termine={termine} />}
          </aside>
        </div>
      </section>

      {/* ---------- Text und Randnotizen ---------- */}
      <section className="blatt mt-abschnitt">
        <div className="grid gap-y-10 border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7">
            <h2 className="text-kopf mb-5">{textTitel ?? `${c.title} ${s.start.y}`}</h2>
            <Prosa text={c.intro} className="max-w-text" />
          </div>
          {c.facts.length > 0 && (
            <aside className="lg:col-span-4 lg:col-start-9" aria-label="Fakten">
              <h2 className="text-zeile mb-3">Kurz notiert</h2>
              <ul className="border-t border-ink text-klein">
                {c.facts.map((f) => (
                  <li key={f} className="border-b border-ink py-3">
                    {f}
                  </li>
                ))}
              </ul>
              {c.source && (
                <p className="mono text-fein mt-3 text-ink-soft">
                  Quelle:{" "}
                  <a href={c.source.url} rel="noopener" className="link">
                    {c.source.label}
                  </a>
                </p>
              )}
            </aside>
          )}
        </div>
      </section>

      {/* ---------- Die nächsten Jahre ---------- */}
      {jahreZeilen.length > 1 && (
        <section className="blatt mt-abschnitt">
          <h2 className="text-kopf mb-5">{jahreTitel}</h2>
          <Jahre titel={jahreTitel} zeilen={jahreZeilen} heute={s.heute} spalteEins={eigene?.spalteEins} />
          {jahre?.hinweis ? <div className="mono text-fein mt-3 max-w-text text-ink-soft">{jahre.hinweis}</div> : null}
        </section>
      )}

      {zusatz}

      <AdSlot id={`${c.slug}-mitte`} />

      {/* ---------- FAQ ---------- */}
      {faq.length > 0 && (
        <section className="blatt mt-abschnitt">
          <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-6">
            <h2 className="text-kopf lg:col-span-4">
              Häufige Fragen
            </h2>
            <div className="lg:col-span-8">
              <FaqListe faq={faq} />
            </div>
          </div>
        </section>
      )}

      <AffiliateSlot kategorie={c.category} />

      {/* ---------- Nächste Abfahrten ---------- */}
      {tafelZeilen.length > 0 && (
        <div className="mt-abschnitt">
          <Tafel titel={tafel?.titel ?? "Nächste Abfahrten"} zeilen={tafelZeilen} />
        </div>
      )}
    </>
  );
}
