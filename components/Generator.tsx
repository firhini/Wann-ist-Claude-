"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { EIGENE_MOTIVE, eigenerPfad } from "@/lib/eigener";
import { site } from "@/site.config";
import { Motiv } from "./Motiv";

/** Formular für den eigenen Countdown. Erzeugt nur einen Link, gespeichert wird nichts. */
export function Generator({ heuteIso }: { heuteIso: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [datum, setDatum] = useState("");
  const [zeit, setZeit] = useState("");
  const [motiv, setMotiv] = useState<string>("blatt-1");
  const [jaehrlich, setJaehrlich] = useState(false);
  const [meldung, setMeldung] = useState("");

  const fertig = name.trim().length > 0 && /^\d{4}-\d{2}-\d{2}$/.test(datum);
  const pfad = fertig ? eigenerPfad({ name: name.trim(), datum, zeit, motiv, jaehrlich }) : "";
  const link = fertig ? `${site.url}${pfad}` : "";

  async function kopieren() {
    try {
      await navigator.clipboard.writeText(link);
      setMeldung("Link kopiert.");
    } catch {
      setMeldung("Kopieren ging nicht. Bitte von Hand markieren.");
    }
    setTimeout(() => setMeldung(""), 2600);
  }

  return (
    <form
      className="grid gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (fertig) router.push(pfad);
      }}
    >
      <div>
        <label htmlFor="gen-name" className="mono text-fein text-ink-soft">
          Worauf wartest du?
        </label>
        <input
          id="gen-name"
          name="n"
          type="text"
          required
          maxLength={60}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Urlaub in Lissabon"
          autoComplete="off"
          className="feld mt-1"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="gen-datum" className="mono text-fein text-ink-soft">
            Datum
          </label>
          <input
            id="gen-datum"
            name="d"
            type="date"
            required
            min="1900-01-01"
            max="2200-12-31"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            className="feld mt-1"
          />
        </div>
        <div>
          <label htmlFor="gen-zeit" className="mono text-fein text-ink-soft">
            Uhrzeit (wenn es eine gibt)
          </label>
          <input
            id="gen-zeit"
            name="t"
            type="time"
            value={zeit}
            onChange={(e) => setZeit(e.target.value)}
            className="feld mt-1"
          />
        </div>
      </div>

      <fieldset>
        <legend className="mono text-fein text-ink-soft">Motiv</legend>
        <div className="mt-2 grid grid-cols-4 gap-px border border-ink bg-ink sm:grid-cols-6">
          {EIGENE_MOTIVE.map((m) => (
            <label key={m.key} className="motivwahl">
              <input
                type="radio"
                name="m"
                value={m.key}
                checked={motiv === m.key}
                onChange={() => setMotiv(m.key)}
                className="sr-only"
              />
              <Motiv name={m.key} className="h-9 w-9" />
              <span className="mono text-fein">{m.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex min-h-11 items-center gap-3">
        <input
          type="checkbox"
          name="j"
          value="1"
          checked={jaehrlich}
          onChange={(e) => setJaehrlich(e.target.checked)}
          className="haken"
        />
        <span>Jedes Jahr wiederholen (Geburtstag, Jahrestag)</span>
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="knopf knopf-voll" disabled={!fertig}>
          Countdown öffnen
        </button>
        <button type="button" className="knopf" disabled={!fertig} onClick={kopieren}>
          Link kopieren
        </button>
        <p className="mono text-fein text-ink-soft" role="status">
          {meldung}
        </p>
      </div>

      <p className="mono text-fein break-all text-ink-soft" aria-live="polite">
        {fertig ? link : `Der Link erscheint hier, sobald Name und Datum ausgefüllt sind. Heute ist der ${heuteIso.split("-").reverse().join(".")}.`}
      </p>
    </form>
  );
}
