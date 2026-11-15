import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountdownSeite, termineVon } from "@/components/CountdownSeite";
import { STAMM, stamm } from "@/data/countdowns";
import { einheiten, stand } from "@/lib/countdown";
import { metadaten } from "@/lib/seo";
import { beschreibung, seitenTitel } from "@/lib/texte";
import { tagVon } from "@/lib/zeit";
import { HUBS } from "@/data/hubs";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return STAMM.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = stamm(slug);
  if (!c) return {};
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
  const { slug } = await params;
  const c = stamm(slug);
  if (!c) notFound();
  const hub = HUBS[c.category];
  return (
    <CountdownSeite
      c={c}
      now={new Date()}
      embedPfad={`/embed/${c.slug}`}
      krumen={[
        { name: "Start", pfad: "/" },
        ...(hub ? [{ name: hub.name, pfad: hub.pfad }] : []),
        { name: c.title, pfad: c.pfad },
      ]}
    />
  );
}
