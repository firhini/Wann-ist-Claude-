import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { termineVon } from "@/components/CountdownSeite";
import { EmbedZaehler } from "@/components/EmbedZaehler";
import { alleCountdowns, nachPfad } from "@/data/alle";
import { stand } from "@/lib/countdown";
import { datumMitWochentag } from "@/lib/format";
import { site } from "@/site.config";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return alleCountdowns().map((c) => ({ slug: c.pfad.split("/").filter(Boolean) }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = nachPfad(`/${slug.join("/")}`);
  return {
    title: c ? `${c.question} (Widget)` : "Widget",
    robots: { index: false, follow: true },
    alternates: c ? { canonical: c.pfad } : undefined,
  };
}

/** Das einbettbare Widget: gleiches Design, eine Zahl, ein dezenter Link zurück. */
export default async function Embed({ params }: Props) {
  const { slug } = await params;
  const c = nachPfad(`/${slug.join("/")}`);
  if (!c) notFound();
  const now = new Date();
  const s = stand(c, now);
  return (
    <main className="embed balken flex min-h-dvh flex-col justify-between border-x border-b border-ink p-4">
      <h1 className="text-zeile">{c.question}</h1>
      <div className="my-2">
        <EmbedZaehler
          serverNow={now.getTime()}
          termine={termineVon(c, now)}
          heuteText={c.heute}
          laeuftText={c.laeuft}
        />
      </div>
      <p className="mono text-fein flex flex-wrap items-baseline justify-between gap-x-4 border-t border-ink pt-2">
        <span>{datumMitWochentag(s.start)}</span>
        <a href={`${site.url}${c.pfad}`} target="_blank" rel="noopener" className="link">
          {site.name}
        </a>
      </p>
    </main>
  );
}
