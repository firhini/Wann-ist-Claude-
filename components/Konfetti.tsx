"use client";

import { useEffect, useState } from "react";

/** Ein kurzer Konfetti-Moment in Orchid. Einmal pro Seite und Besuch, danach weg. */
export function Konfetti() {
  const [an, setAn] = useState(false);

  useEffect(() => {
    const key = `nt-konfetti:${location.pathname}${location.search}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Ohne sessionStorage gibt es das Konfetti eben jedes Mal.
    }
    setAn(true);
    const t = setTimeout(() => setAn(false), 2400);
    return () => clearTimeout(t);
  }, []);

  if (!an) return null;

  // Feste Verteilung statt Zufall: ruhig, wiederholbar, kein Flackern beim Rendern.
  const teile = Array.from({ length: 36 }, (_, i) => {
    const links = (i * 37 + 11) % 100;
    const verzug = (i * 53) % 500;
    const drift = ((i * 29) % 30) - 15;
    const drehung = 360 + ((i * 97) % 540);
    return (
      <i
        key={i}
        style={
          {
            left: `${links}%`,
            animationDelay: `${verzug}ms`,
            "--dx": `${drift}vw`,
            "--rot": `${drehung}deg`,
          } as React.CSSProperties
        }
      />
    );
  });

  return (
    <div className="konfetti" aria-hidden="true">
      {teile}
    </div>
  );
}
