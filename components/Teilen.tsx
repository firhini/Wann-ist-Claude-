"use client";

import { useState } from "react";
import { site } from "@/site.config";

/** Buttons „Teilen“ (Web Share API, sonst Link kopieren) und „Einbetten“ (Snippet fürs Widget). */
export function Teilen({ titel, text, embedPfad }: { titel: string; text: string; embedPfad?: string }) {
  const [meldung, setMeldung] = useState("");
  const [offen, setOffen] = useState(false);

  const snippet = embedPfad
    ? `<iframe src="${site.url}${embedPfad}" title="${titel}" width="360" height="220" loading="lazy" style="border:0;max-width:100%"></iframe>\n<p><a href="${site.url}${embedPfad.replace("/embed", "")}">${titel}</a> von ${site.name}</p>`
    : "";

  async function kopieren(inhalt: string, ok: string) {
    try {
      await navigator.clipboard.writeText(inhalt);
      setMeldung(ok);
    } catch {
      setMeldung("Kopieren ging nicht. Bitte von Hand markieren.");
    }
    setTimeout(() => setMeldung(""), 2600);
  }

  async function teilen() {
    const url = location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: titel, text, url });
      } catch {
        // Abgebrochen. Kein Fehler.
      }
      return;
    }
    await kopieren(url, "Link kopiert.");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="knopf knopf-voll" onClick={teilen}>
          Teilen
        </button>
        {embedPfad && (
          <button
            type="button"
            className="knopf"
            aria-expanded={offen}
            aria-controls="einbetten"
            onClick={() => setOffen((v) => !v)}
          >
            Einbetten
          </button>
        )}
        <p className="mono text-fein text-ink-soft" role="status">
          {meldung}
        </p>
      </div>
      {embedPfad && offen && (
        <div id="einbetten" className="mt-4 max-w-text">
          <label htmlFor="einbetten-code" className="mono text-fein text-ink-soft">
            Diesen Code auf deiner Seite einfügen:
          </label>
          <textarea
            id="einbetten-code"
            readOnly
            rows={4}
            value={snippet}
            onFocus={(e) => e.currentTarget.select()}
            className="mono text-fein mt-1 block w-full border border-ink bg-paper-deep p-3"
          />
          <button type="button" className="knopf mt-2" onClick={() => kopieren(snippet, "Code kopiert.")}>
            Code kopieren
          </button>
        </div>
      )}
    </div>
  );
}
