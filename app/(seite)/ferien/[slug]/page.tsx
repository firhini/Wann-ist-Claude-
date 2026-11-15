import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountdownSeite, termineVon } from "@/components/CountdownSeite";
import { FaqListe } from "@/components/FaqListe";
import { HubKopf } from "@/components/HubKopf";
import { JsonLd } from "@/components/JsonLd";
import { Stempel } from "@/components/Stempel";
import { Uebersicht, type UebersichtZeile } from "@/components/Uebersicht";
import { BUNDESLAENDER, landNachSlug } from "@/data/bundeslaender";
import {
  FERIENARTEN,
  type Ferienart,
  type FerienartInfo,
  type Ferienzeit,
  KMK_UEBERSICHT,
  aktuelle,
  artText,
  ferienImLand,
  ferienLandCountdown,
  ferienPfad,
  ferienart,
  ferienzeiten,
  laenderMit,
  naechsterDurchgang,
} from "@/data/ferien";
import { type Faq, einheiten, stand } from "@/lib/countdown";
import { datumLang, datumMitWochentag, datumOhneJahr, plural, zeitraumKurz } from "@/lib/format";
import { type Krume, metadaten, schemaFaq, schemaKrumen, schemaWebPage } from "@/lib/seo";
import { beschreibung, nochTage, seitenTitel } from "@/lib/texte";
import { tageDiff, tagNr, tagVon } from "@/lib/zeit";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return [...FERIENARTEN.map((a) => ({ slug: a.slug })), ...BUNDESLAENDER.map((b) => ({ slug: b.slug }))];
}

type Props = { params: Promise<{ slug: string }> };

// ---------------------------------------------------------------------------
// Variante A: eine Ferienart in allen Ländern
// ---------------------------------------------------------------------------

function artDaten(art: FerienartInfo, now: Date) {
  const heute = tagVon(now);
  const zeilen = naechsterDurchgang(art.slug, now).map((e) => ({ b: e.land, z: e.zeit }));
  const erste = zeilen[0];
  const letzte = zeilen[zeilen.length - 1];
  const fruehTag = erste ? tagNr(erste.z.von) : 0;
  const fruehLaender = zeilen.filter((e) => tagNr(e.z.von) === fruehTag).map((e) => e.b.name);
  const laengste = [...zeilen].sort((x, y) => tageDiff(y.z.von, y.z.bis) - tageDiff(x.z.von, x.z.bis))[0];
  const ohne = BUNDESLAENDER.filter((b) => !zeilen.some((e) => e.b.code === b.code)).map((b) => b.name);
  const nie = BUNDESLAENDER.filter((b) => !laenderMit(art.slug).some((x) => x.code === b.code)).map((b) => b.name);
  // Folgejahr: jeweils der Termin nach dem aktuellen.
  const folge = zeilen
    .map((e) => ({ b: e.b, z: ferienzeiten(art.slug, e.b.code).find((x) => tagNr(x.von) > tagNr(e.z.bis)) }))
    .filter((e): e is { b: (typeof BUNDESLAENDER)[number]; z: Ferienzeit } => Boolean(e.z))
    .sort((x, y) => tagNr(x.z.von) - tagNr(y.z.von));
  return { heute, zeilen, erste, letzte, fruehLaender, laengste, ohne, nie, folge };
}

function aufzaehlung(namen: string[]): string {
  if (namen.length <= 1) return namen.join("");
  return `${namen.slice(0, -1).join(", ")} und ${namen[namen.length - 1]}`;
}

function artAntwort(art: FerienartInfo, now: Date) {
  const d = artDaten(art, now);
  if (!d.erste) return { ...d, satz: "", zusatz: "" };
  const n = tageDiff(d.heute, d.erste.z.von);
  const satz =
    n > 0
      ? `Die nächsten ${art.name} beginnen am ${datumMitWochentag(d.erste.z.von)}, in ${aufzaehlung(d.fruehLaender)}. Das ist in ${n} ${plural(n, "Tag", "Tagen")}.`
      : `In ${aufzaehlung(d.fruehLaender)} sind gerade ${art.name}, noch bis ${datumLang(d.erste.z.bis)}.`;
  const zusatz =
    d.letzte && d.letzte !== d.erste
      ? `Als Letztes startet ${d.letzte.b.name} am ${datumLang(d.letzte.z.von)}.`
      : "";
  return { ...d, satz, zusatz };
}

function ArtSeite({ art }: { art: FerienartInfo }) {
  const now = new Date();
  const a = artAntwort(art, now);
  const pfad = ferienPfad(art.slug);
  const krumen: Krume[] = [
    { name: "Start", pfad: "/" },
    { name: "Ferien", pfad: "/ferien" },
    { name: art.name, pfad },
  ];
  const zeile = (e: { b: (typeof BUNDESLAENDER)[number]; z: Ferienzeit }): UebersichtZeile => {
    const n = tageDiff(a.heute, e.z.von);
    const dauer = tageDiff(e.z.von, e.z.bis) + 1;
    return {
      pfad: ferienPfad(art.slug, e.b.code),
      titel: e.b.name,
      datum: e.z.von,
      ende: dauer > 1 ? e.z.bis : null,
      tage: Math.max(0, n),
      phase: n > 0 ? "vor" : "laeuft",
      extra: `${dauer} ${plural(dauer, "Tag", "Tage")}${e.z.zusatz.length ? `, dazu ${e.z.zusatz.map((t) => datumOhneJahr(t.von)).join(", ")}` : ""}${e.z.vorlaeufig ? " (vorläufig)" : ""}`,
    };
  };
  const jahr = a.erste ? (a.erste.z.von.y === a.erste.z.bis.y ? `${a.erste.z.von.y}` : `${a.erste.z.von.y}/${String(a.erste.z.bis.y).slice(2)}`) : "";
  const text = artText(art.slug);
  const faq: Faq[] = [
    ...(a.erste
      ? [
          {
            q: `In welchem Bundesland beginnen die ${art.name} ${jahr} zuerst?`,
            a: `In ${aufzaehlung(a.fruehLaender)}, am ${datumMitWochentag(a.erste.z.von)}.${a.letzte && a.letzte !== a.erste ? ` Am spätesten beginnt ${a.letzte.b.name} am ${datumLang(a.letzte.z.von)}.` : ""}`,
          },
        ]
      : []),
    ...(a.laengste
      ? [
          {
            q: `Welches Bundesland hat die längsten ${art.name}?`,
            a: `${jahr} ist es ${a.laengste.b.name} mit ${tageDiff(a.laengste.z.von, a.laengste.z.bis) + 1} Tagen (${zeitraumKurz(a.laengste.z.von, a.laengste.z.bis)}).`,
          },
        ]
      : []),
    ...(a.nie.length
      ? [
          {
            q: `Welche Bundesländer haben keine ${art.name}?`,
            a: `In den Ferienkalendern der Kultusministerkonferenz bis 2028/29 stehen für ${aufzaehlung(a.nie)} keine ${art.name}.`,
          },
        ]
      : []),
    ...text.faq,
  ];
  const titel = `${art.name} ${jahr}: alle Bundesländer im Überblick`;

  return (
    <>
      <JsonLd
        daten={[
          schemaWebPage({ titel, beschreibung: `${a.satz} ${a.zusatz}`.trim(), pfad, geaendert: now }),
          schemaKrumen(krumen),
          schemaFaq(faq),
        ]}
      />
      <HubKopf
        krumen={krumen}
        h1={`Wann sind ${art.name}?`}
        zeilenTitel={`${art.name} ${jahr}`}
        zeilen={[
          ...(a.erste ? [{ label: "Frühester Beginn", wert: datumLang(a.erste.z.von) }] : []),
          ...(a.letzte ? [{ label: "Spätester Beginn", wert: datumLang(a.letzte.z.von) }] : []),
          { label: "Länder mit diesen Ferien", wert: `${a.zeilen.length} von 16` },
          ...(a.laengste
            ? [{ label: "Längste Ferien", wert: `${a.laengste.b.name}, ${tageDiff(a.laengste.z.von, a.laengste.z.bis) + 1} Tage` }]
            : []),
        ]}
      >
        <p>
          <strong className="font-semibold">{a.satz}</strong> {a.zusatz}
        </p>
      </HubKopf>

      <section className="blatt mt-12">
        <h2 className="text-kopf mb-5">
          {art.name} {jahr} nach Bundesland
        </h2>
        <Uebersicht
          titel={`${art.name} ${jahr} in allen Bundesländern`}
          zeilen={a.zeilen.map(zeile)}
          spalteName="Bundesland"
          spalteExtra="Dauer"
        />
        {a.ohne.length > 0 && (
          <p className="mono text-fein mt-3 text-ink-soft">
            Keine {art.name} in diesem Schuljahr laut KMK-Kalender: {a.ohne.join(", ")}.
          </p>
        )}
      </section>

      {a.folge.length > 0 && (
        <section className="blatt mt-abschnitt">
          <h2 className="text-kopf mb-5">Und im Jahr darauf</h2>
          <Uebersicht
            titel={`${art.name} im folgenden Schuljahr`}
            zeilen={a.folge.map(zeile)}
            spalteName="Bundesland"
            spalteExtra="Dauer"
          />
        </section>
      )}

      <section className="blatt mt-abschnitt">
        <div className="grid border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">{art.name}: wie sie geregelt sind</h2>
          <div className="prosa max-w-text max-lg:mt-5 lg:col-span-7 lg:col-start-6">
            <p>{text.absatz}</p>
            <p>
              Die Termine auf dieser Seite stammen aus den Ferienkalendern der{" "}
              <a href={KMK_UEBERSICHT.url} rel="noopener">
                Kultusministerkonferenz
              </a>
              . Wo die KMK in derselben Spalte zusätzlich einzelne freie Tage führt, steht in der Tabelle der
              längste zusammenhängende Zeitraum, die Einzeltage stehen daneben. Bewegliche Ferientage legt jede
              Schule selbst fest, sie fehlen hier.
            </p>
            <p>
              Andere Ferien:{" "}
              {FERIENARTEN.filter((x) => x.slug !== art.slug).map((x, i, alle) => (
                <span key={x.slug}>
                  <Link href={ferienPfad(x.slug)}>{x.name}</Link>
                  {i < alle.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="blatt mt-abschnitt">
        <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="text-kopf lg:col-span-4">Häufige Fragen</h2>
          <div className="lg:col-span-8">
            <FaqListe faq={faq} />
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Variante B: alle Ferien eines Landes
// ---------------------------------------------------------------------------

function LandSeite({ slug }: { slug: string }) {
  const b = landNachSlug(slug);
  if (!b) notFound();
  const c = ferienLandCountdown(b.code);
  const now = new Date();
  const heute = tagVon(now);
  const alle = ferienImLand(b.code);
  const schuljahre = [...new Set(alle.map((f) => f.schuljahr))];

  return (
    <CountdownSeite
      c={c}
      now={now}
      embedPfad={`/embed${c.pfad}`}
      motiv={<Stempel code={b.code} zeile="Ferien" />}
      textTitel={`Schulferien ${b.inName}`}
      krumen={[
        { name: "Start", pfad: "/" },
        { name: "Ferien", pfad: "/ferien" },
        { name: b.name, pfad: c.pfad },
      ]}
      jahre={{ titel: "", zeilen: [] }}
      zusatz={
        <>
          {schuljahre.map((sj) => {
            const zeilen: UebersichtZeile[] = alle
              .filter((f) => f.schuljahr === sj && tagNr(f.bis) >= tagNr(heute))
              .map((f) => {
                const n = tageDiff(heute, f.von);
                const dauer = tageDiff(f.von, f.bis) + 1;
                const art = ferienart(f.art) as FerienartInfo;
                return {
                  pfad: ferienPfad(f.art as Ferienart, b.code),
                  titel: art.name,
                  datum: f.von,
                  ende: dauer > 1 ? f.bis : null,
                  tage: Math.max(0, n),
                  phase: n > 0 ? ("vor" as const) : ("laeuft" as const),
                  extra: `${dauer} ${plural(dauer, "Tag", "Tage")}${f.zusatz.length ? `, dazu ${f.zusatz.map((t) => datumOhneJahr(t.von)).join(", ")}` : ""}${f.vorlaeufig ? " (vorläufig)" : ""}`,
                };
              });
            if (zeilen.length === 0) return null;
            return (
              <section key={sj} className="blatt mt-abschnitt">
                <h2 className="text-kopf mb-5">
                  Ferien {b.inName} im Schuljahr {sj}
                </h2>
                <Uebersicht
                  titel={`Schulferien ${b.inName} im Schuljahr ${sj}`}
                  zeilen={zeilen}
                  spalteName="Ferien"
                  spalteExtra="Dauer"
                />
              </section>
            );
          })}
          <div className="blatt">
            <p className="mono text-fein mt-3 text-ink-soft">
              Quelle:{" "}
              <a href={KMK_UEBERSICHT.url} rel="noopener" className="link">
                {KMK_UEBERSICHT.label}
              </a>
              . Für 2029/30 liegt bisher nur der Sommerferien-Termin vor.
            </p>
          </div>
        </>
      }
    />
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const now = new Date();
  const art = ferienart(slug);
  if (art) {
    const a = artAntwort(art, now);
    const jahr = a.erste ? a.erste.z.von.y : tagVon(now).y;
    const n = a.erste ? tageDiff(a.heute, a.erste.z.von) : 0;
    return metadaten({
      titel: `${art.name} ${jahr}: Termine aller Bundesländer${n > 0 ? ` (${nochTage(n)})` : ""}`,
      beschreibung: `${a.satz} ${a.zusatz} Alle ${a.zeilen.length} Bundesländer mit Datum, Dauer und Countdown.`,
      pfad: ferienPfad(art.slug),
      og: n > 0 ? { t: `Wann sind ${art.name}?`, z: String(n), e: n === 1 ? "Tag" : "Tage" } : { t: `Wann sind ${art.name}?` },
    });
  }
  const b = landNachSlug(slug);
  if (!b) return {};
  const c = ferienLandCountdown(b.code);
  const s = stand(c, now);
  const folge = termineVon(c, now)[1];
  return metadaten({
    titel: seitenTitel(c, s),
    beschreibung: beschreibung(c, s, einheiten(now, s.startZeit), folge ? tagVon(new Date(folge.start)) : null),
    pfad: c.pfad,
    og: { s: c.pfad },
  });
}

export default async function Seite({ params }: Props) {
  const { slug } = await params;
  const art = ferienart(slug);
  if (art) return <ArtSeite art={art} />;
  if (landNachSlug(slug)) return <LandSeite slug={slug} />;
  notFound();
}
