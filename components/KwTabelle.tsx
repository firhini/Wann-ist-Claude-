import { datumOhneJahr, datumLang, monatName } from "@/lib/format";
import { kalenderwoche, montagDerKw, wochenImJahr } from "@/lib/kw";
import { bundesweiterFeiertagAm } from "@/data/feiertage-laender";
import { type Tag, plusTage, tagNr } from "@/lib/zeit";

/** Alle Kalenderwochen eines Jahres mit Montag und Sonntag. Die laufende Woche ist markiert. */
export function KwTabelle({ jahr, heute, mitFeiertagen = false }: { jahr: number; heute: Tag; mitFeiertagen?: boolean }) {
  const aktuell = kalenderwoche(heute);
  const wochen = Array.from({ length: wochenImJahr(jahr) }, (_, i) => {
    const mo = montagDerKw(jahr, i + 1);
    return { kw: i + 1, mo, so: plusTage(mo, 6) };
  });
  return (
    <div className="overflow-x-auto">
      <table className="tabelle">
        <caption className="sr-only">Kalenderwochen {jahr} mit Beginn und Ende</caption>
        <thead>
          <tr>
            <th scope="col">KW</th>
            <th scope="col">Montag</th>
            <th scope="col">Sonntag</th>
            <th scope="col" className="max-sm:hidden">
              {mitFeiertagen ? "Bundesweite Feiertage" : "Monat"}
            </th>
            <th scope="col" className="rechts">
              Stand
            </th>
          </tr>
        </thead>
        <tbody>
          {wochen.map((w) => {
            const laeuft = aktuell.jahr === jahr && aktuell.kw === w.kw;
            const vorbei = tagNr(w.so) < tagNr(heute);
            const inTagen = tagNr(w.mo) - tagNr(heute);
            // Der Donnerstag bestimmt, zu welchem Monat die Woche überwiegend gehört.
            const do_ = plusTage(w.mo, 3);
            return (
              <tr key={w.kw} id={`kw-${w.kw}`} data-heute={laeuft ? "" : undefined}>
                <th scope="row" className="display text-zeile text-ink">
                  {String(w.kw).padStart(2, "0")}
                </th>
                <td className="mono text-daten whitespace-nowrap">
                  {w.mo.y === jahr ? datumOhneJahr(w.mo) : datumLang(w.mo)}
                </td>
                <td className="mono text-daten whitespace-nowrap">
                  {w.so.y === jahr ? datumOhneJahr(w.so) : datumLang(w.so)}
                </td>
                <td className="max-sm:hidden">
                  {mitFeiertagen
                    ? Array.from({ length: 7 }, (_, i) => bundesweiterFeiertagAm(plusTage(w.mo, i)))
                        .filter((x): x is string => x !== null)
                        .join(", ")
                    : monatName(do_.m)}
                </td>
                <td className="mono text-daten rechts whitespace-nowrap">
                  {laeuft ? (
                    <span className="font-medium text-orchid-deep">läuft</span>
                  ) : vorbei ? (
                    <span className="text-ink-soft">vorbei</span>
                  ) : (
                    `in ${inTagen} ${inTagen === 1 ? "Tag" : "Tagen"}`
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
