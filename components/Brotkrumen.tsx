import Link from "next/link";
import type { Krume } from "@/lib/seo";

/** Brotkrumen in Mono. Die strukturierten Daten dazu setzt die Seite. */
export function Brotkrumen({ krumen }: { krumen: Krume[] }) {
  return (
    <nav aria-label="Brotkrumen" className="mono text-fein text-ink-soft">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {krumen.map((k, i) => {
          const letzte = i === krumen.length - 1;
          return (
            <li key={k.pfad} className="flex items-center gap-x-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {letzte ? (
                <span aria-current="page" className="text-ink">
                  {k.name}
                </span>
              ) : (
                <Link href={k.pfad} className="link-still py-2">
                  {k.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
