import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountdownSeite, termineVon } from "@/components/CountdownSeite";
import { BUNDESLAENDER, landNachSlug } from "@/data/bundeslaender";
import { schulanfaenge, schulanfangCountdown } from "@/data/ferien";
import { einheiten, stand } from "@/lib/countdown";
import { metadaten } from "@/lib/seo";
import { beschreibung, seitenTitel } from "@/lib/texte";
import { tagNr, tagVon } from "@/lib/zeit";

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
  const c = schulanfangCountdown(b.code);
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
  const c = schulanfangCountdown(b.code);
  const now = new Date();
  const heute = tagNr(tagVon(now));
  return (
    <CountdownSeite
      c={c}
      now={now}
      embedPfad={`/embed${c.pfad}`}
      textTitel={`Erster Schultag ${b.inName}`}
      krumen={[
        { name: "Start", pfad: "/" },
        { name: "Schule", pfad: "/schule" },
        { name: `Schulanfang ${b.name}`, pfad: c.pfad },
      ]}
      jahre={{
        titel: `Schulanfang ${b.inName} in den nächsten Jahren`,
        zeilen: schulanfaenge(b.code)
          .filter((t) => tagNr(t.tag) >= heute)
          .map((t) => ({ jahr: t.jahr, start: t.tag, notiz: t.ferien.vorlaeufig ? "vorläufig" : undefined })),
      }}
    />
  );
}
