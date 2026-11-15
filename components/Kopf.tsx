import Link from "next/link";
import { HAUPTNAVI } from "@/data/navigation";
import { site } from "@/site.config";
import { HeuteZeile } from "./HeuteZeile";

/** Seitenkopf: Balken, Wortmarke, Navigation als Textlinks, Datum in Mono. */
export function Kopf({ serverNow }: { serverNow: number }) {
  return (
    <header className="balken">
      <div className="blatt flex flex-wrap items-center justify-between gap-x-8 gap-y-1 pt-3 pb-2 lg:pt-4 lg:pb-3">
        <Link href="/" className="display text-marke" aria-label={`${site.name}, zur Startseite`}>
          {site.name}
        </Link>
        <nav aria-label="Hauptnavigation" className="max-lg:order-3 max-lg:w-full">
          <ul className="flex flex-wrap gap-x-5 text-klein lg:gap-x-6">
            {HAUPTNAVI.map((l) => (
              <li key={l.pfad}>
                <Link href={l.pfad} className="link-still inline-flex min-h-9 items-center font-medium lg:min-h-11">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <HeuteZeile serverNow={serverNow} />
      </div>
    </header>
  );
}
