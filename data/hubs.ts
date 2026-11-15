import type { Kategorie } from "@/lib/countdown";

/** Die Hub-Seite jeder Kategorie, für Brotkrumen und Verlinkung. */
export const HUBS: Partial<Record<Kategorie, { name: string; pfad: string }>> = {
  feiertage: { name: "Feiertage", pfad: "/feiertage" },
  ferien: { name: "Ferien", pfad: "/ferien" },
  schule: { name: "Schule", pfad: "/schule" },
};
