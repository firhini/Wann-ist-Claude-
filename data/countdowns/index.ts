import type { Countdown } from "@/lib/countdown";
import { WINTER } from "./winter";

/** Alle Countdowns, die direkt unter der Wurzel liegen (/weihnachten, /wochenende …). */
export const STAMM: Countdown[] = [...WINTER];

const nachSlug = new Map(STAMM.map((c) => [c.slug, c]));

export function stamm(slug: string): Countdown | undefined {
  return nachSlug.get(slug);
}
