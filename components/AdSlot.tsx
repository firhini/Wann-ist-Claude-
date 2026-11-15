import { site } from "@/site.config";

const HOEHEN = { banner: "min-h-[250px]", leiste: "min-h-[100px]" } as const;

/**
 * Werbeplatz. Vorbereitet, aber aus (site.ads.enabled = false).
 * Ist Werbung aus, rendert die Komponente nichts und belegt keinen Platz.
 * Ist sie an, reserviert sie die volle Höhe, damit beim Nachladen nichts springt (CLS = 0).
 * Regeln: nie im Hero, nie zwischen Zahl und Antwort.
 */
export function AdSlot({ id, format = "banner" }: { id: string; format?: keyof typeof HOEHEN }) {
  if (!site.ads.enabled) return null;
  return (
    <aside className="blatt my-12" aria-label="Anzeige">
      <p className="mono text-fein text-ink-soft mb-1">Anzeige</p>
      <div data-ad-slot={id} className={`${HOEHEN[format]} border border-ink`} />
    </aside>
  );
}

/** Affiliate-Platz pro Kategorie. Standardmäßig aus. */
export function AffiliateSlot({ kategorie }: { kategorie: string }) {
  if (!site.affiliate.enabled) return null;
  return (
    <aside className="blatt my-12" aria-label="Empfehlungen (Werbung)">
      <p className="mono text-fein text-ink-soft mb-1">Werbung</p>
      <div data-affiliate={kategorie} className="min-h-[160px] border border-ink" />
    </aside>
  );
}
