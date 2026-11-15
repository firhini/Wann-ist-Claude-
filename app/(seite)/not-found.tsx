import Link from "next/link";

export default function NichtGefunden() {
  return (
    <section className="blatt">
      <div className="border-t border-ink pt-10 pb-6">
        <p className="zahl" aria-hidden="true">
          404
        </p>
        <h1 className="text-frage mt-6">Dieses Blatt gibt es nicht.</h1>
        <p className="text-lead mt-4 max-w-text">
          Vielleicht wurde es schon abgerissen, vielleicht hat es nie existiert. Die Startseite zeigt, was als
          Nächstes kommt.
        </p>
        <p className="mt-6">
          <Link href="/" className="knopf knopf-voll">
            Zur Startseite
          </Link>
        </p>
      </div>
    </section>
  );
}
