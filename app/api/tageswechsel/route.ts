import { revalidatePath } from "next/cache";

/**
 * Tageswechsel: verwirft kurz nach Mitternacht (deutsche Zeit) alle zwischengespeicherten Seiten,
 * damit die Tageszahl im HTML auch auf selten besuchten Seiten stimmt.
 * Aufgerufen von der geplanten Netlify-Funktion in netlify/functions/tageswechsel.mjs.
 * Ist die Variable CRON_SECRET gesetzt, nimmt die Route nur Aufrufe mit diesem Schlüssel an.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Nicht erlaubt", { status: 401 });
  }
  revalidatePath("/", "layout");
  return Response.json({ ok: true, zeit: new Date().toISOString() });
}
