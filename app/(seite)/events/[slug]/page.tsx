import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Brotkrumen } from "@/components/Brotkrumen";
import { CountdownSeite } from "@/components/CountdownSeite";
import { Tafel } from "@/components/Tafel";
import { naechste } from "@/data/alle";
import { EVENTS, event, eventDaten, kommendeEvents } from "@/data/events";
import { einheiten, istVorbei, stand } from "@/lib/countdown";
import { datumLang } from "@/lib/format";
import { metadaten } from "@/lib/seo";
import { beschreibung, seitenTitel } from "@/lib/texte";
import { tagVon } from "@/lib/zeit";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = event(slug);
  if (!c) return {};
  const now = new Date();
  if (istVorbei(c, now)) {
    return {
      title: `${c.title}: vorbei`,
      description: c.vorbeiText,
      robots: { index: false, follow: true },
      alternates: { canonical: c.pfad },
    };
  }
  const s = stand(c, now);
  return metadaten({
    titel: seitenTitel(c, s),
    beschreibung: beschreibung(c, s, einheiten(now, s.startZeit), null),
    pfad: c.pfad,
    og: { s: c.pfad },
  });
}

export default async function Seite({ params }: Props) {
  const { slug } = await params;
  const c = event(slug);
  const daten = eventDaten(slug);
  if (!c || !daten) notFound();
  const now = new Date();
  const krumen = [
    { name: "Start", pfad: "/" },
    { name: "Events", pfad: "/events" },
    { name: c.title, pfad: c.pfad },
  ];

  // Einmalige Termine sind irgendwann vorbei. Die Seite bleibt erreichbar, sagt das klar und verlässt den Index.
  if (istVorbei(c, now)) {
    const ende = tagVon(c.getEndDate ? c.getEndDate(now) : c.getNextDate(now));
    return (
      <>
        <div className="blatt pt-4 pb-3">
          <Brotkrumen krumen={krumen} />
        </div>
        <section className="blatt">
          <div className="border-t border-ink pt-10 pb-4">
            <h1 className="text-frage">{c.question}</h1>
            <p className="display text-plakat mt-6">Vorbei.</p>
            <p className="text-lead mt-6 max-w-text">
              <strong className="font-semibold">{c.vorbeiText}</strong> Letzter Tag war der {datumLang(ende)}.
            </p>
            <p className="mt-6">
              <Link href="/events" className="knopf knopf-voll">
                Was als Nächstes kommt
              </Link>
            </p>
          </div>
        </section>
        <div className="mt-abschnitt">
          <Tafel titel="Nächste Abfahrten" zeilen={naechste(kommendeEvents(now), now, 8)} jahrZeigen />
        </div>
      </>
    );
  }

  return <CountdownSeite c={c} now={now} embedPfad={`/embed${c.pfad}`} krumen={krumen} textTitel={daten.title} />;
}
