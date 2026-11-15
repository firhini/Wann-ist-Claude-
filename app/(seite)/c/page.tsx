import type { Metadata } from "next";
import Link from "next/link";
import { Brotkrumen } from "@/components/Brotkrumen";
import { EinheitenListe } from "@/components/EinheitenListe";
import { Motiv } from "@/components/Motiv";
import { Tafel } from "@/components/Tafel";
import { Teilen } from "@/components/Teilen";
import { Zaehler } from "@/components/Zaehler";
import { naechste } from "@/data/alle";
import { startTafel } from "@/data/start";
import { eigeneTermine, eigenerAusParametern } from "@/lib/eigener";
import { datumLang, datumMitWochentag, uhrzeit, wochentagName } from "@/lib/format";
import { kalenderwoche } from "@/lib/kw";
import { nochTage } from "@/lib/texte";
import { iso, tageDiff, tagVon } from "@/lib/zeit";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const e = eigenerAusParametern(await searchParams);
  const basis = { robots: { index: false, follow: true }, alternates: { canonical: "/eigener-countdown" } };
  if (!e) return { ...basis, title: "Countdown nicht gefunden" };
  const now = new Date();
  const termin = eigeneTermine(e, now).find((t) => tageDiff(tagVon(now), t.tag) >= 0) ?? eigeneTermine(e, now)[0]!;
  const n = tageDiff(tagVon(now), termin.tag);
  const titel = n > 0 ? `${e.name}: ${nochTage(n)}` : n === 0 ? `${e.name}: heute` : `${e.name}: vorbei`;
  const text = `${e.name} ist am ${datumMitWochentag(termin.tag)}${e.zeit ? `, um ${uhrzeit(e.zeit.h, e.zeit.mi)}` : ""}.`;
  const bild = `/og?${new URLSearchParams({ t: e.name, d: iso(termin.tag) }).toString()}`;
  return {
    ...basis,
    title: titel,
    description: text,
    openGraph: { type: "website", locale: "de_DE", title: titel, description: text, images: [{ url: bild, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: titel, description: text, images: [bild] },
  };
}

/** Geteilter eigener Countdown. Liest alles aus der Adresse, speichert nichts, noindex. */
export default async function Geteilt({ searchParams }: Props) {
  const e = eigenerAusParametern(await searchParams);
  const now = new Date();
  const krumen = [
    { name: "Start", pfad: "/" },
    { name: "Eigener Countdown", pfad: "/eigener-countdown" },
    { name: e?.name ?? "Nicht gefunden", pfad: "/c" },
  ];

  if (!e) {
    return (
      <>
        <div className="blatt pt-4 pb-3">
          <Brotkrumen krumen={krumen} />
        </div>
        <section className="blatt">
          <div className="border-t border-ink pt-10">
            <h1 className="text-plakat">Dieser Link ist unvollständig.</h1>
            <p className="text-lead mt-6 max-w-text">
              Im Link fehlen Name oder Datum, oder das Datum gibt es nicht. Vermutlich ist beim Kopieren etwas
              abgeschnitten worden.
            </p>
            <p className="mt-6">
              <Link href="/eigener-countdown" className="knopf knopf-voll">
                Neuen Countdown erstellen
              </Link>
            </p>
          </div>
        </section>
      </>
    );
  }

  const heute = tagVon(now);
  const termine = eigeneTermine(e, now);
  const termin = termine.find((t) => tageDiff(heute, t.tag) >= 0) ?? termine[0]!;
  const n = tageDiff(heute, termin.tag);
  const frage = `Wie lange noch bis ${e.name}?`;
  const satz =
    n > 1
      ? `Bis ${e.name} sind es noch ${n} Tage.`
      : n === 1
        ? `Bis ${e.name} ist es noch 1 Tag.`
        : n === 0
          ? `Heute ist es so weit: ${e.name}.`
          : `${e.name} war am ${datumLang(termin.tag)}.`;

  return (
    <>
      <div className="blatt pt-4 pb-3">
        <Brotkrumen krumen={krumen} />
      </div>
      <section className="blatt">
        <div className="grid border-t border-ink lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col pt-6 pb-8 lg:col-span-8 lg:pt-8 lg:pb-12 lg:pr-6">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-frage max-w-[20ch] break-words">{frage}</h1>
              <div className="w-14 shrink-0 text-ink sm:w-20 lg:w-28">
                <Motiv name={e.motiv} />
              </div>
            </div>
            <p className="text-lead order-3 mt-7 max-w-text">
              <strong className="font-semibold">{satz}</strong>{" "}
              {n >= 0
                ? `Termin: ${datumMitWochentag(termin.tag)}${e.zeit ? `, um ${uhrzeit(e.zeit.h, e.zeit.mi)}` : ""}.`
                : ""}
            </p>
            <div className="order-2 mt-5 lg:mt-8">
              <Zaehler
                serverNow={now.getTime()}
                termine={termine.map((t) => ({ start: t.start, ende: t.ende }))}
                art="tag"
                bis={`bis ${e.name}`}
                heuteText="Heute."
                hatUhrzeit={Boolean(e.zeit)}
                vorbeiText={`${e.name} war am ${datumLang(termin.tag)}.`}
              />
            </div>
            <div className="order-4 mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Teilen titel={frage} text={satz} />
              <Link href="/eigener-countdown" className="mono text-daten link">
                Eigenen Countdown erstellen
              </Link>
            </div>
          </div>
          <aside className="pb-8 lg:col-span-4 lg:border-l lg:border-ink lg:pt-8 lg:pb-12 lg:pl-6" aria-label="Termin und Einheiten">
            <dl className="fahrplan border-t border-ink lg:border-t-0">
              <div>
                <dt>Datum</dt>
                <dd>{datumLang(termin.tag)}</dd>
              </div>
              <div>
                <dt>Wochentag</dt>
                <dd>{wochentagName(termin.tag)}</dd>
              </div>
              {e.zeit && (
                <div>
                  <dt>Uhrzeit</dt>
                  <dd>{uhrzeit(e.zeit.h, e.zeit.mi)}</dd>
                </div>
              )}
              <div>
                <dt>Kalenderwoche</dt>
                <dd>KW {kalenderwoche(termin.tag).kw}</dd>
              </div>
              {e.jaehrlich && (
                <div>
                  <dt>Wiederholung</dt>
                  <dd>jedes Jahr</dd>
                </div>
              )}
            </dl>
            {n > 0 && (
              <>
                <h2 className="mono text-fein mt-8 mb-1 font-medium normal-case tracking-normal text-ink-soft">
                  Dieselbe Strecke in anderen Einheiten
                </h2>
                <div className="border-t border-ink">
                  <EinheitenListe serverNow={now.getTime()} termine={termine.map((t) => ({ start: t.start, ende: t.ende }))} />
                </div>
              </>
            )}
          </aside>
        </div>
      </section>

      <div className="mt-abschnitt">
        <Tafel titel="Worauf andere warten" zeilen={naechste(startTafel(), now, 6)} />
      </div>
    </>
  );
}
