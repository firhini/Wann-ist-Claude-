import type { Countdown } from "@/lib/countdown";
import { ALLTAG } from "./alltag";
import { FRUEHJAHR } from "./fruehjahr";
import { HERBST } from "./herbst";
import { JAHRESZEITEN } from "./jahreszeiten";
import { WINTER } from "./winter";

/** Alle Countdowns, die direkt unter der Wurzel liegen (/weihnachten, /wochenende …). */
export const STAMM: Countdown[] = [...WINTER, ...FRUEHJAHR, ...HERBST, ...JAHRESZEITEN, ...ALLTAG];

const nachSlug = new Map(STAMM.map((c) => [c.slug, c]));

export function stamm(slug: string): Countdown | undefined {
  return nachSlug.get(slug);
}
