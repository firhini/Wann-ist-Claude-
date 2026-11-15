import type { ReactNode } from "react";

/**
 * Strichmotive. Ein Strich, eine Stärke, keine Füllung, keine Farbe (siehe DESIGN.md, Abschnitt 7).
 * Raster 48 × 48. Die Strichstärke skaliert nicht mit.
 */
export type MotifKey =
  | "stern"
  | "tanne"
  | "feuerwerk"
  | "blatt-1"
  | "blatt-30"
  | "blatt-31"
  | "stiefel"
  | "kerzen-1"
  | "kerzen-2"
  | "kerzen-3"
  | "kerzen-4"
  | "ei"
  | "kreuz"
  | "flamme"
  | "wolke"
  | "bollerwagen"
  | "monstranz"
  | "narrenkappe"
  | "krawatte"
  | "herz"
  | "blume"
  | "kuerbis"
  | "laterne"
  | "fahne"
  | "these"
  | "grablicht"
  | "krone"
  | "maibaum"
  | "glocke"
  | "strauss"
  | "venus"
  | "drachen"
  | "sonne"
  | "laub"
  | "flocke"
  | "uhr"
  | "horizont"
  | "muenze"
  | "ball"
  | "gamepad"
  | "finsternis"
  | "mond"
  | "krug"
  | "pokal"
  | "fackel"
  | "rad"
  | "klappe"
  | "urne"
  | "sternschnuppe"
  | "schultuete"
  | "aschenkreuz"
  | "preisschild"
  | "stempel";

function strahlen(n: number, r1: number, r2: number, cx = 24, cy = 24, versatz = 0, r2b = r2): string {
  let d = "";
  for (let i = 0; i < n; i++) {
    const w = versatz + (i / n) * Math.PI * 2;
    const aussen = i % 2 === 0 ? r2 : r2b;
    d += `M${(cx + Math.cos(w) * r1).toFixed(2)} ${(cy + Math.sin(w) * r1).toFixed(2)}L${(cx + Math.cos(w) * aussen).toFixed(2)} ${(cy + Math.sin(w) * aussen).toFixed(2)}`;
  }
  return d;
}

function zackenstern(zacken: number, aussen: number, innen: number, cx = 24, cy = 24): string {
  const p: string[] = [];
  for (let i = 0; i < zacken * 2; i++) {
    const r = i % 2 === 0 ? aussen : innen;
    const w = -Math.PI / 2 + (i / (zacken * 2)) * Math.PI * 2;
    p.push(`${(cx + Math.cos(w) * r).toFixed(2)},${(cy + Math.sin(w) * r).toFixed(2)}`);
  }
  return p.join(" ");
}

function kerzen(an: number): ReactNode {
  const xs = [7, 18, 29, 40];
  return (
    <>
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x - 3} y={22} width={6} height={20} />
          <path d={`M${x} 22V18`} />
          {i < an && <path d={`M${x} 6c4 5 3.5 9 0 11c-3.500-2-4-6 0-11Z`} />}
        </g>
      ))}
      <path d="M2 42H46" />
    </>
  );
}

function blatt(zahl: string): ReactNode {
  return (
    <>
      <rect x={9} y={7} width={30} height={36} />
      <path d="M9 16H39M17 4V10M31 4V10" />
      <text
        x={24}
        y={37}
        textAnchor="middle"
        fontSize={19}
        fontWeight={800}
        fill="currentColor"
        stroke="none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {zahl}
      </text>
    </>
  );
}

const FORMEN: Record<MotifKey, () => ReactNode> = {
  stern: () => (
    <>
      <polygon points={zackenstern(8, 21, 8)} />
      <path d={strahlen(8, 3, 6, 24, 24, Math.PI / 8)} />
    </>
  ),
  tanne: () => (
    <>
      <path d="M24 9L15 21H19.500L11 32H17.500L8 43H40L30.500 32H37L28.500 21H33Z" />
      <path d="M24 43V47M24 3V7M22 5H26" />
    </>
  ),
  feuerwerk: () => (
    <>
      <path d={strahlen(16, 5, 19, 24, 20, 0, 13)} />
      <path d="M24 28C24 36 21 40 17 46" />
    </>
  ),
  "blatt-1": () => blatt("1"),
  "blatt-30": () => blatt("30"),
  "blatt-31": () => blatt("31"),
  stiefel: () => (
    <>
      <path d="M16 5H30V25L40 32C43 34.500 43 38 42 42H16Z" />
      <path d="M16 12H30M16 37H42" />
    </>
  ),
  "kerzen-1": () => kerzen(1),
  "kerzen-2": () => kerzen(2),
  "kerzen-3": () => kerzen(3),
  "kerzen-4": () => kerzen(4),
  ei: () => (
    <>
      <path d="M24 4C33 4 39 19 39 29A15 15 0 0 1 9 29C9 19 15 4 24 4Z" />
      <path d="M10 25L14.500 21L19 25L24 21L29 25L33.500 21L38 25M9.500 32H38.500" />
    </>
  ),
  kreuz: () => <path d="M24 4V44M12 16H36" />,
  flamme: () => (
    <path d="M25 4C31 13 37 19 37 30A13 13 0 0 1 11 30C11 24 14.500 20 17 15C19 19 20.500 20.500 23 21.500C22 14 22.500 9 25 4ZM24 42A6 6 0 0 0 30 36C30 32 27 30 25.500 27C24 31 18 31 18 36A6 6 0 0 0 24 42Z" />
  ),
  wolke: () => (
    <>
      <path d="M12 42H36A7.500 7.500 0 0 0 36 27A10 10 0 0 0 17 25A8.500 8.500 0 0 0 12 42Z" />
      <path d="M24 19V4M19 9L24 4L29 9" />
    </>
  ),
  bollerwagen: () => (
    <>
      <path d="M5 16H35V30H5ZM5 22H35M15 16V30M25 16V30" />
      <circle cx={12} cy={37} r={5} />
      <circle cx={28} cy={37} r={5} />
      <path d="M35 26L45 12" />
    </>
  ),
  monstranz: () => (
    <>
      <circle cx={24} cy={17} r={6} />
      <path d={strahlen(12, 9, 14, 24, 17)} />
      <path d="M24 31V42M15 44H33M19 36H29" />
    </>
  ),
  narrenkappe: () => (
    <>
      <path d="M7 38H41L35 14L28 27L24 9L20 27L13 14Z" />
      <circle cx={35} cy={11} r={2.500} />
      <circle cx={24} cy={6} r={2.500} />
      <circle cx={13} cy={11} r={2.500} />
      <path d="M7 43H41" />
    </>
  ),
  krawatte: () => (
    <>
      <path d="M19 4H29L27 12L32 34L24 45L16 34L21 12Z" />
      <path d="M21 12H27" />
      <path d="M6 24L42 30" strokeDasharray="3 3" />
    </>
  ),
  herz: () => (
    <path d="M24 42C10 31 5 23 5 16A9.500 9.500 0 0 1 24 13A9.500 9.500 0 0 1 43 16C43 23 38 31 24 42Z" />
  ),
  blume: () => (
    <>
      <circle cx={24} cy={16} r={4} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const w = (i / 6) * Math.PI * 2;
        return <circle key={i} cx={24 + Math.cos(w) * 8.500} cy={16 + Math.sin(w) * 8.500} r={4.500} />;
      })}
      <path d="M24 29V46M24 40C31 39 34 35 35 30C29 30 25 33 24 40Z" />
    </>
  ),
  kuerbis: () => (
    <>
      <path d="M24 13C9 10 5 21 5 28C5 38 13 43 24 43C35 43 43 38 43 28C43 21 39 10 24 13Z" />
      <path d="M24 13C17 19 17 37 24 43M24 13C31 19 31 37 24 43M24 13C24 8 26 5 31 4" />
    </>
  ),
  laterne: () => (
    <>
      <path d="M5 4L26 9M26 9V15" />
      <path d="M19 15H33L37 23V36L33 44H19L15 36V23Z" />
      <path d="M15 23H37M15 36H37M26 36V29" />
      <path d="M26 24C28 26 28 28 26 29C24 28 24 26 26 24Z" />
    </>
  ),
  fahne: () => (
    <>
      <path d="M9 3V45" />
      <path d="M9 6H41V27H9M9 13H41M9 20H41" />
    </>
  ),
  these: () => (
    <>
      <path d="M10 45V5H38V45M10 25H14M34 25H38" />
      <rect x={17} y={11} width={14} height={19} />
      <path d="M20 16H28M20 20H28M20 24H25" />
      <circle cx={24} cy={13} r={0.800} />
    </>
  ),
  grablicht: () => (
    <>
      <path d="M16 20H32V44H16ZM13 20H35M18 20L20 15H28L30 20" />
      <path d="M24 26C27 30 27 34 24 36C21 34 21 30 24 26Z" />
      <path d="M24 36V40" />
    </>
  ),
  krone: () => (
    <>
      <path d="M7 36V15L16 26L24 10L32 26L41 15V36Z" />
      <path d="M7 41H41" />
      <circle cx={7} cy={12} r={2} />
      <circle cx={24} cy={7} r={2} />
      <circle cx={41} cy={12} r={2} />
    </>
  ),
  maibaum: () => (
    <>
      <path d="M24 3V46M18 46H30" />
      <ellipse cx={24} cy={13} rx={12} ry={3.500} />
      <path d="M12 13V27M36 13V27M18 16V24M30 16V24" />
      <path d="M24 3L31 6L24 9" />
    </>
  ),
  glocke: () => (
    <>
      <path d="M24 8C16 8 14 17 14 26L9 35H39L34 26C34 17 32 8 24 8Z" />
      <path d="M24 3V8" />
      <circle cx={24} cy={40} r={3} />
    </>
  ),
  strauss: () => (
    <>
      <path d="M24 45V23M24 45L13 22M24 45L35 22M18 36H30" />
      <circle cx={24} cy={17} r={5} />
      <circle cx={11} cy={17} r={4.500} />
      <circle cx={37} cy={17} r={4.500} />
    </>
  ),
  venus: () => (
    <>
      <circle cx={24} cy={17} r={11} />
      <path d="M24 28V45M16 37H32" />
    </>
  ),
  drachen: () => (
    <>
      <path d="M24 3L37 17L24 34L11 17Z" />
      <path d="M24 3V34M11 17H37" />
      <path d="M24 34C29 37 19 40 24 43C27 44.500 25 46 24 47" />
    </>
  ),
  sonne: () => (
    <>
      <circle cx={24} cy={24} r={9} />
      <path d={strahlen(12, 13, 21, 24, 24, 0, 17)} />
    </>
  ),
  laub: () => (
    <>
      <path d="M24 4C37 11 39 27 24 39C9 27 11 11 24 4Z" />
      <path d="M24 10V46M24 20L30 15M24 26L17 21M24 31L31 26" />
    </>
  ),
  flocke: () => (
    <>
      <path d={strahlen(6, 0, 20, 24, 24, Math.PI / 6)} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const w = Math.PI / 6 + (i / 6) * Math.PI * 2;
        const bx = 24 + Math.cos(w) * 13;
        const by = 24 + Math.sin(w) * 13;
        const a = w + 0.900;
        const b = w - 0.900;
        return (
          <path
            key={i}
            d={`M${(bx + Math.cos(a) * 5).toFixed(2)} ${(by + Math.sin(a) * 5).toFixed(2)}L${bx.toFixed(2)} ${by.toFixed(2)}L${(bx + Math.cos(b) * 5).toFixed(2)} ${(by + Math.sin(b) * 5).toFixed(2)}`}
          />
        );
      })}
    </>
  ),
  uhr: () => (
    <>
      <circle cx={24} cy={24} r={20} />
      <path d="M24 11V24L33 29" />
      <path d={strahlen(12, 17, 20)} />
    </>
  ),
  horizont: () => (
    <>
      <path d="M3 30H45M12 30A12 12 0 0 1 36 30" />
      <path d="M24 12V6M11 17L7 13M37 17L41 13" />
      <path d="M6 38C9 35 12 35 15 38S21 41 24 38S30 35 33 38S39 41 42 38" />
    </>
  ),
  muenze: () => (
    <>
      <circle cx={24} cy={24} r={20} />
      <circle cx={24} cy={24} r={15} />
      <path d="M30 17.500A8 8 0 1 0 30 30.500M14 22H26M14 26H26" />
    </>
  ),
  ball: () => (
    <>
      <circle cx={24} cy={24} r={20} />
      <polygon points="24,15 32.500,21.200 29.300,31.200 18.700,31.200 15.500,21.200" />
      <path d="M24 15V4M32.500 21.200L43 18M29.300 31.200L36 40M18.700 31.200L12 40M15.500 21.200L5 18" />
    </>
  ),
  gamepad: () => (
    <>
      <path d="M13 14H35C41 14 45 22 45 30C45 36 41 37 38 33L34 28H14L10 33C7 37 3 36 3 30C3 22 7 14 13 14Z" />
      <path d="M14 18V24M11 21H17" />
      <circle cx={32} cy={19} r={1.600} />
      <circle cx={36} cy={23} r={1.600} />
    </>
  ),
  finsternis: () => (
    <>
      <circle cx={21} cy={25} r={15} />
      <path d="M17.200 10.500A15 15 0 1 1 30 37" />
      <path d="M40 6V10M44 12H40" />
    </>
  ),
  mond: () => <path d="M31 5A20 20 0 1 0 43 31A16 16 0 0 1 31 5Z" />,
  krug: () => (
    <>
      <path d="M10 14H32V44H10ZM32 20H37A5 5 0 0 1 42 25V31A5 5 0 0 1 37 36H32" />
      <path d="M10 14C10 9 15 8 17 11C19 6 26 6 27 11C30 8 34 10 32 14M17 21V37M25 21V37" />
    </>
  ),
  pokal: () => (
    <>
      <path d="M14 5H34V18A10 10 0 0 1 14 18ZM14 9H7C7 15 9 19 14.500 20M34 9H41C41 15 39 19 33.500 20" />
      <path d="M24 28V37M16 43H32M19 37H29V43H19Z" />
    </>
  ),
  fackel: () => (
    <>
      <path d="M17 22H31L27 46H21ZM15 18H33V22H15Z" />
      <path d="M24 3C29 8 31 11 29 18H19C17 13 20 11 22 9C22.500 11 23 12 24.500 12.500C24 9 23.500 6 24 3Z" />
    </>
  ),
  rad: () => (
    <>
      <circle cx={11} cy={31} r={9} />
      <circle cx={37} cy={31} r={9} />
      <path d="M11 31L19 15H31L37 31M19 15L26 31H11M31 15L26 31M16 11H22M30 11H35" />
    </>
  ),
  klappe: () => (
    <>
      <path d="M6 20H42V43H6ZM6 20L5 12L41 6L42 14L6 20" />
      <path d="M13 11L17 18M22 9.500L26 16.500M31 8L35 15M12 28H36M12 34H28" />
    </>
  ),
  urne: () => (
    <>
      <path d="M7 22H41V44H7ZM17 22H31" />
      <path d="M19 22V6H31V22M22 11H28M22 15H28" />
      <path d="M21 34L24 37L29 30" />
    </>
  ),
  sternschnuppe: () => (
    <>
      <polygon points={zackenstern(5, 9, 3.800, 34, 14)} />
      <path d="M26 20L5 41M22 14L9 27M34 26L21 39" />
    </>
  ),
  schultuete: () => (
    <>
      <path d="M12 12H36L24 46Z" />
      <path d="M12 12C14 5 18 8 20 4C22 9 26 9 28 4C30 8 34 5 36 12M16 23H32M19.500 33H28.500" />
    </>
  ),
  aschenkreuz: () => (
    <>
      <circle cx={24} cy={24} r={20} />
      <path d="M24 13V35M17 20H31" />
    </>
  ),
  preisschild: () => (
    <>
      <path d="M5 24L24 5H43V24L24 43Z" />
      <circle cx={35} cy={13} r={3} />
      <path d="M16 27L27 16M17 19.500h.010M26 27h.010" />
    </>
  ),
  stempel: () => (
    <>
      <path d="M4 12H44V20A4 4 0 0 0 44 28V36H4V28A4 4 0 0 0 4 20Z" />
      <path d="M32 12V36" strokeDasharray="2 3" />
      <path d="M10 20H26M10 28H21" />
    </>
  ),
};

export function Motiv({ name, className }: { name: MotifKey; className?: string }) {
  const form = FORMEN[name] ?? FORMEN["blatt-1"];
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      className={`motiv ${className ?? ""}`}
    >
      {form()}
    </svg>
  );
}
