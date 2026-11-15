/** Fallblatt-Kacheln ohne Bewegung, für Tafelzeilen. Kommt ohne JavaScript aus. */
export function FlapStatisch({ text, breit }: { text: string; breit?: boolean }) {
  if (breit) {
    return (
      <span className="flap">
        <span className="flap-kachel flap-kachel-breit flap-heute">
          <span className="flap-h">{text}</span>
        </span>
      </span>
    );
  }
  return (
    <span className="flap">
      {text.split("").map((zeichen, i) => (
        <span key={i} className="flap-kachel">
          <span className="flap-h">{zeichen}</span>
        </span>
      ))}
    </span>
  );
}
