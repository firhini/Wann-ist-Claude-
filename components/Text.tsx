import Link from "next/link";
import type { ReactNode } from "react";

/** Wandelt die einfache Auszeichnung [Text](/pfad) in echte Links um. */
export function mitLinks(text: string): ReactNode[] {
  const teile: ReactNode[] = [];
  const muster = /\[([^\]]+)\]\(([^)]+)\)/g;
  let letzter = 0;
  let treffer: RegExpExecArray | null;
  while ((treffer = muster.exec(text))) {
    if (treffer.index > letzter) teile.push(text.slice(letzter, treffer.index));
    const ziel = treffer[2] as string;
    teile.push(
      ziel.startsWith("/") ? (
        <Link key={treffer.index} href={ziel}>
          {treffer[1]}
        </Link>
      ) : (
        <a key={treffer.index} href={ziel} rel="noopener">
          {treffer[1]}
        </a>
      ),
    );
    letzter = treffer.index + treffer[0].length;
  }
  if (letzter < text.length) teile.push(text.slice(letzter));
  return teile;
}

/** Fließtext aus Absätzen, die durch Leerzeilen getrennt sind. */
export function Prosa({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`prosa ${className ?? ""}`}>
      {text.split(/\n\s*\n/).map((absatz, i) => (
        <p key={i}>{mitLinks(absatz.trim())}</p>
      ))}
    </div>
  );
}
