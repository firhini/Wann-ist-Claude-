import { datumLang, tausender, wochentagName } from "@/lib/format";
import { type Tag, tageDiff } from "@/lib/zeit";

export type JahrZeile = { jahr: number | string; start: Tag; ende?: Tag | null; notiz?: string };

/** Tabelle „Die nächsten Jahre“: Datum, Wochentag, Abstand. */
export function Jahre({
  titel,
  zeilen,
  heute,
  spalteEins = "Jahr",
}: {
  titel: string;
  zeilen: JahrZeile[];
  heute: Tag;
  spalteEins?: string;
}) {
  const mitEnde = zeilen.some((z) => z.ende && tageDiff(z.start, z.ende) > 0);
  return (
    <div className="overflow-x-auto">
      <table className="tabelle">
        <caption className="sr-only">{titel}</caption>
        <thead>
          <tr>
            <th scope="col">{spalteEins}</th>
            <th scope="col">{mitEnde ? "Erster Tag" : "Datum"}</th>
            {mitEnde && <th scope="col">Letzter Tag</th>}
            <th scope="col" className="max-sm:hidden">
              {mitEnde ? "Dauer" : "Wochentag"}
            </th>
            <th scope="col" className="rechts">
              Abstand
            </th>
          </tr>
        </thead>
        <tbody>
          {zeilen.map((z) => {
            const n = tageDiff(heute, z.start);
            const dauer = z.ende ? tageDiff(z.start, z.ende) + 1 : 1;
            return (
              <tr key={`${z.jahr}-${z.start.y}-${z.start.m}-${z.start.d}`}>
                <th scope="row" className="display text-zeile text-ink">
                  {z.jahr}
                </th>
                <td className="mono text-daten">
                  <span className="sm:hidden">{wochentagName(z.start).slice(0, 2)}, </span>
                  {mitEnde ? <span className="max-sm:hidden">{wochentagName(z.start).slice(0, 2)}, </span> : null}
                  {datumLang(z.start)}
                </td>
                {mitEnde && (
                  <td className="mono text-daten">
                    {z.ende ? `${wochentagName(z.ende).slice(0, 2)}, ${datumLang(z.ende)}` : ""}
                  </td>
                )}
                <td className="max-sm:hidden">
                  {mitEnde ? `${dauer} ${dauer === 1 ? "Tag" : "Tage"}` : wochentagName(z.start)}
                  {z.notiz ? <span className="text-ink-soft"> · {z.notiz}</span> : null}
                </td>
                <td className="mono text-daten rechts whitespace-nowrap">
                  {n > 0 ? `in ${tausender(n)} ${n === 1 ? "Tag" : "Tagen"}` : n === 0 ? "heute" : "läuft"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
