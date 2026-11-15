import { ogPfad } from "@/lib/og";

/**
 * Alte Bildadressen mit Parametern (/og?s=…) leiten auf die neuen Pfade um.
 * Die Antwort darf nicht zwischengespeichert werden, sonst bekäme wieder jede Anfrage dasselbe Ziel.
 */
export function GET(request: Request) {
  const url = new URL(request.url);
  const p = url.searchParams;
  const ziel = ogPfad({
    s: p.get("s") ?? undefined,
    t: p.get("t") ?? undefined,
    d: p.get("d") ?? undefined,
    z: p.get("z") ?? undefined,
    e: p.get("e") ?? undefined,
  });
  return new Response(null, {
    status: 307,
    headers: {
      Location: ziel,
      "Cache-Control": "no-store",
      "Netlify-CDN-Cache-Control": "no-store",
    },
  });
}
