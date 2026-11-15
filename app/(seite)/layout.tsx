import { Fuss } from "@/components/Fuss";
import { Kopf } from "@/components/Kopf";

export default function SeitenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#inhalt"
        className="knopf knopf-voll sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
      >
        Zum Inhalt
      </a>
      <Kopf serverNow={Date.now()} />
      <main id="inhalt">{children}</main>
      <Fuss />
    </>
  );
}
