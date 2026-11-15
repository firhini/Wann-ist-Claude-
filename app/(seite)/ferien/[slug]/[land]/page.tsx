import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountdownSeite, termineVon } from "@/components/CountdownSeite";
import { Stempel } from "@/components/Stempel";
import { Uebersicht, type UebersichtZeile } from "@/components/Uebersicht";
import { landNachSlug } from "@/data/bundeslaender";
import {
  FERIENARTEN,
  aktuelle,
  ferienCountdown,
  ferienKombinationen,
  ferienPfad,
  ferienart,
  ferienzeiten,
  type Ferienart,
} from "@/data/ferien";
import { einheiten, stand } from "@/lib/countdown";
import { datumLang } from "@/lib/format";
import { metadaten } from "@/lib/seo";
import { beschreibung, seitenTitel } from "@/lib/texte";
import { tageDiff, tagVon } from "@/lib/zeit";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ferienKombinationen().map(({ art, land }) => ({ slug: art.slug, land: land.slug }));
}

type Props = { params: Promise<{ slug: string; land: string }> };

function finde(slug: string, landSlug: string) {
  const art = ferienart(slug);
  const b = landNachSlug(landSlug);
  if (!art || !b) return null;
  const c = ferienCountdown(art.slug, b.code);
  return c ? { art, b, c } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, land } = await params;
  const f = finde(slug, land);
  if (!f) return {};
  const now = new Date();
  const s = stand(f.c, now);
  const folge = termineVon(f.c, now)[1];
  return metadaten({
    titel: seitenTitel(f.c, s),
    beschreibung: beschreibung(f.c, s, einheiten(now, s.startZeit), folge ? tagVon(new Date(folge.start)) : null),
    pfad: f.c.pfad,
    og: { s: f.c.pfad },
  });
}

export default async function Seite({ params }: Props) {
  const { slug, land } = await params;
  const f = finde(slug, land);
  if (!f) notFound();
  const { art, b, c } = f;
  const now = new Date();
  const heute = tagVon(now);
  const zeiten = ferienzeiten(art.slug as Ferienart, b.code);

  // Die übrigen Ferien desselben Landes, jeweils der nächste Termin.
  const andere: UebersichtZeile[] = FERIENARTEN.filter((a) => a.slug !== art.slug)
    .map((a) => ({ a, z: aktuelle(ferienzeiten(a.slug, b.code), now) }))
    .filter((e) => e.z)
    .map(({ a, z }) => {
      const n = tageDiff(heute, z!.von);
      return {
        pfad: ferienPfad(a.slug, b.code),
        titel: a.name,
        datum: z!.von,
        ende: tageDiff(z!.von, z!.bis) > 0 ? z!.bis : null,
        tage: Math.max(0, n),
        phase: n > 0 ? ("vor" as const) : ("laeuft" as const),
      };
    })
    .sort((x, y) => x.tage - y.tage);

  return (
    <CountdownSeite
      c={c}
      now={now}
      embedPfad={`/embed${c.pfad}`}
      motiv={<Stempel code={b.code} zeile={art.kurz} />}
      textTitel={`${art.name} ${b.inName}: die Termine`}
      krumen={[
        { name: "Start", pfad: "/" },
        { name: "Ferien", pfad: "/ferien" },
        { name: art.name, pfad: ferienPfad(art.slug) },
        { name: b.name, pfad: c.pfad },
      ]}
      jahre={{
        titel: `${art.name} ${b.inName} in den nächsten Schuljahren`,
        spalteEins: "Schuljahr",
        zeilen: zeiten.map((z) => ({
          jahr: z.schuljahr,
          start: z.von,
          ende: z.bis,
          notiz: z.vorlaeufig ? "vorläufig" : z.zusatz.length ? `dazu ${z.zusatz.map((t) => datumLang(t.von)).join(", ")}` : undefined,
        })),
        hinweis: (
          <p>
            Quelle:{" "}
            <a href={zeiten[0]?.quelle.url} rel="noopener" className="link">
              Ferienkalender der Kultusministerkonferenz
            </a>
            . Ohne bewegliche Ferientage der einzelnen Schulen.
          </p>
        ),
      }}
      zusatz={
        andere.length > 0 ? (
          <section className="blatt mt-abschnitt">
            <h2 className="text-kopf mb-5">Die anderen Ferien {b.inName}</h2>
            <Uebersicht titel={`Weitere Ferien ${b.inName}`} zeilen={andere} spalteName="Ferien" />
            <p className="mt-4">
              <Link href={`/ferien/${b.slug}`} className="link">
                Alle Schulferien {b.inName} auf einen Blick
              </Link>
            </p>
          </section>
        ) : null
      }
      tafel={undefined}
    />
  );
}
