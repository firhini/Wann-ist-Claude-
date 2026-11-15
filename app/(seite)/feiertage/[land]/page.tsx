import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountdownSeite, termineVon } from "@/components/CountdownSeite";
import { Stempel } from "@/components/Stempel";
import { Uebersicht, type UebersichtZeile } from "@/components/Uebersicht";
import { BUNDESLAENDER, landNachSlug } from "@/data/bundeslaender";
import { brueckentage, feiertageLandCountdown } from "@/data/feiertage-land-seiten";
import { feiertageImLand } from "@/data/feiertage-laender";
import { einheiten, stand } from "@/lib/countdown";
import { datumOhneJahr, wochentagName } from "@/lib/format";
import { metadaten } from "@/lib/seo";
import { beschreibung, seitenTitel } from "@/lib/texte";
import { tageDiff, tagNr, tagVon } from "@/lib/zeit";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return BUNDESLAENDER.map((b) => ({ land: b.slug }));
}

type Props = { params: Promise<{ land: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { land } = await params;
  const b = landNachSlug(land);
  if (!b) return {};
  const c = feiertageLandCountdown(b.code);
  const now = new Date();
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
  const { land } = await params;
  const b = landNachSlug(land);
  if (!b) notFound();
  const c = feiertageLandCountdown(b.code);
  const now = new Date();
  const heute = tagVon(now);

  const tabelle = (jahr: number) => {
    const bruecken = brueckentage(b.code, jahr);
    const zeilen: UebersichtZeile[] = feiertageImLand(b.code, jahr, true)
      .filter((f) => tagNr(f.tag) >= tagNr(heute))
      .map((f) => {
        const n = tageDiff(heute, f.tag);
        const br = bruecken.find((x) => x.feiertag.key === f.key);
        return {
          pfad: f.pfad,
          titel: f.name,
          datum: f.tag,
          tage: Math.max(0, n),
          phase: n > 0 ? ("vor" as const) : ("heute" as const),
          extra: f.teilweise
            ? `nicht landesweit: ${f.teilweise}`
            : br
              ? `Brückentag: ${wochentagName(br.tag)}, ${datumOhneJahr(br.tag)}`
              : [0, 6].includes(new Date(Date.UTC(f.tag.y, f.tag.m - 1, f.tag.d)).getUTCDay())
                ? "fällt aufs Wochenende"
                : "",
        };
      });
    return zeilen;
  };

  const jahre = [heute.y, heute.y + 1].map((jahr) => ({ jahr, zeilen: tabelle(jahr) })).filter((j) => j.zeilen.length);

  return (
    <CountdownSeite
      c={c}
      now={now}
      embedPfad={`/embed${c.pfad}`}
      motiv={<Stempel code={b.code} zeile="Feiertage" />}
      textTitel={`Gesetzliche Feiertage ${b.inName}`}
      krumen={[
        { name: "Start", pfad: "/" },
        { name: "Feiertage", pfad: "/feiertage" },
        { name: b.name, pfad: c.pfad },
      ]}
      jahre={{ titel: "", zeilen: [] }}
      zusatz={
        <>
          {jahre.map(({ jahr, zeilen }) => (
            <section key={jahr} className="blatt mt-abschnitt">
              <h2 className="text-kopf mb-5">
                Feiertage {jahr} {b.inName}
              </h2>
              <Uebersicht
                titel={`Gesetzliche Feiertage ${jahr} ${b.inName}`}
                zeilen={zeilen}
                spalteName="Feiertag"
                spalteExtra="Hinweis"
              />
            </section>
          ))}
          <div className="blatt">
            <p className="mono text-fein mt-3 max-w-text text-ink-soft">
              Grundlage: das Feiertagsgesetz des Landes {b.name}. Bewegliche Feiertage sind nach dem Osterdatum
              berechnet.{" "}
              <Link href="/feiertage" className="link">
                Alle Feste und Feiertage im Überblick
              </Link>
            </p>
          </div>
        </>
      }
    />
  );
}
