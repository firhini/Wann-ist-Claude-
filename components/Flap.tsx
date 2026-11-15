"use client";

import { useState } from "react";

/** Eine Fallblatt-Kachel. Klappt, wenn sich das Zeichen ändert. */
function Kachel({ wert, akzent }: { wert: string; akzent?: boolean }) {
  const [z, setZ] = useState({ jetzt: wert, davor: wert, n: 0 });
  if (wert !== z.jetzt) setZ({ jetzt: wert, davor: z.jetzt, n: z.n + 1 });
  const bewegt = z.n > 0;
  return (
    <span className={akzent ? "flap-kachel flap-akzent" : "flap-kachel"}>
      <span className="flap-h flap-oben">{z.jetzt}</span>
      <span className="flap-h flap-unten">{bewegt ? z.davor : z.jetzt}</span>
      {bewegt && (
        <>
          <span key={`a${z.n}`} className="flap-h flap-oben flap-ab">
            {z.davor}
          </span>
          <span key={`b${z.n}`} className="flap-h flap-unten flap-auf">
            {z.jetzt}
          </span>
        </>
      )}
    </span>
  );
}

/** Mehrere Kacheln nebeneinander, z. B. "08". */
export function Flap({ text, akzent }: { text: string; akzent?: boolean }) {
  return (
    <span className="flap">
      {text.split("").map((zeichen, i) => (
        <Kachel key={i} wert={zeichen} akzent={akzent} />
      ))}
    </span>
  );
}
