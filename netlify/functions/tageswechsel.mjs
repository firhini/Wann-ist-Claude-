/**
 * Tageswechsel: läuft kurz nach Mitternacht deutscher Zeit und lässt alle Seiten neu erzeugen,
 * damit die Tageszahl im HTML auch auf selten besuchten Seiten stimmt.
 *
 * Netlify rechnet in UTC. Mitternacht in Deutschland ist 23:00 UTC (Winterzeit) oder 22:00 UTC
 * (Sommerzeit), deshalb zwei Läufe. Geplante Funktionen laufen nur auf der veröffentlichten Seite,
 * nicht in Vorschauen.
 */
export default async () => {
  const basis = process.env.URL;
  if (!basis) {
    console.error("Tageswechsel: Die Variable URL fehlt.");
    return new Response("URL fehlt", { status: 500 });
  }
  const secret = process.env.CRON_SECRET;
  const antwort = await fetch(`${basis}/api/tageswechsel`, {
    headers: secret ? { authorization: `Bearer ${secret}` } : {},
  });
  console.log(`Tageswechsel: ${antwort.status}`);
  return new Response(null, { status: antwort.ok ? 200 : 502 });
};

export const config = {
  schedule: "1 22,23 * * *",
};
