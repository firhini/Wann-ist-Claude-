import Link from "next/link";
import { fussGruppen } from "@/data/navigation";
import { site } from "@/site.config";

/** Footer mit der vollständigen Sitemap als Textlinks. */
export function Fuss() {
  const gruppen = fussGruppen();
  return (
    <footer className="balken mt-abschnitt">
      <div className="blatt pt-8 pb-10">
        <nav aria-label="Alle Seiten" className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-12">
          {gruppen.map((g) => (
            <div key={g.titel} className={g.links.length > 14 ? "lg:col-span-4" : "lg:col-span-2"}>
              <h2 className="text-zeile mb-2">
                {g.pfad ? (
                  <Link href={g.pfad} className="link-still">
                    {g.titel}
                  </Link>
                ) : (
                  g.titel
                )}
              </h2>
              <ul className={`text-klein ${g.links.length > 14 ? "columns-2 gap-x-6" : ""}`}>
                {g.links.map((l) => (
                  <li key={l.pfad}>
                    <Link href={l.pfad} className="link-still inline-block py-1">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="mono text-fein mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-ink pt-4 text-ink-soft">
          <p>
            {site.name}. Alle Zeiten in deutscher Zeit (Europe/Berlin).
          </p>
          <ul className="flex gap-x-5">
            <li>
              <Link href="/impressum" className="link-still inline-block py-2">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="link-still inline-block py-2">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
