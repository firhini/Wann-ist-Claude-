"use client";

import { useEffect, useState } from "react";

/**
 * Die aktuelle Zeit, sekündlich. Beim ersten Rendern liefert der Hook die Serverzeit,
 * damit HTML und Hydration übereinstimmen. Danach tickt er auf die volle Sekunde.
 */
export function useJetzt(serverNow: number): number {
  const [jetzt, setJetzt] = useState(serverNow);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const t = Date.now();
      setJetzt(t);
      timer = setTimeout(tick, 1000 - (t % 1000) + 4);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);
  return jetzt;
}
