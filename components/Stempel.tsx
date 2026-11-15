/** Stempel für Ferienseiten: Länderkürzel und eine Zeile darunter. Das Motiv der Ferien. */
export function Stempel({ code, zeile }: { code: string; zeile: string }) {
  return (
    <div className="stempel" aria-hidden="true">
      <span className="stempel-code">{code}</span>
      <span className="stempel-zeile">{zeile}</span>
    </div>
  );
}
