// =================================================================
//  GEARS BACKGROUND  (Cách A — pure SVG + CSS, 0 KB JS)
// =================================================================
//  Faint mechanical gears slowly rotating behind the page content.
//  Fits the lab's theme (rotating machinery / vibration diagnostics).
//  Pure CSS rotation — no JS, GPU-cheap. Respects reduced-motion via
//  the .gear-spin rule in globals.css.
// =================================================================

/** Build an SVG path for one gear: `teeth` trapezoidal teeth around a
 *  circle of pitch radius `r`, with a hub hole. Returned as a <path d>. */
function gearPath(teeth: number, r: number, toothH: number): string {
  const cx = 0;
  const cy = 0;
  const rOuter = r + toothH;
  const rInner = r;
  const step = (Math.PI * 2) / teeth;
  // each tooth occupies `step`; split into tip + valley arcs
  const tipFrac = 0.42; // fraction of the tooth that is the raised tip
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * tipFrac;
    const a2 = a0 + step * 0.5;
    const a3 = a0 + step * (0.5 + tipFrac);
    const a4 = a0 + step;
    const p = (ang: number, rad: number) =>
      `${(cx + Math.cos(ang) * rad).toFixed(2)},${(cy + Math.sin(ang) * rad).toFixed(2)}`;
    if (i === 0) d += `M ${p(a0, rInner)} `;
    d += `L ${p(a0, rOuter)} `; // up the leading flank
    d += `L ${p(a1, rOuter)} `; // across the tip
    d += `L ${p(a2, rInner)} `; // down to the valley
    d += `L ${p(a3, rInner)} `; // along the valley
    d += `L ${p(a4, rInner)} `;
  }
  d += "Z";
  return d;
}

function Gear({
  teeth,
  r,
  toothH,
  hub,
  spokes = 5,
}: {
  teeth: number;
  r: number;
  toothH: number;
  hub: number;
  spokes?: number;
}) {
  const size = (r + toothH) * 2;
  const spokeEls = Array.from({ length: spokes }, (_, i) => {
    const ang = (i / spokes) * Math.PI * 2;
    const x2 = Math.cos(ang) * (r - 4);
    const y2 = Math.sin(ang) * (r - 4);
    return (
      <line
        key={i}
        x1={Math.cos(ang) * (hub + 4)}
        y1={Math.sin(ang) * (hub + 4)}
        x2={x2}
        y2={y2}
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
      />
    );
  });
  return (
    <svg
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      width="100%"
      height="100%"
      fill="none"
    >
      <path
        d={gearPath(teeth, r, toothH)}
        fill="currentColor"
        fillOpacity={0.16}
        stroke="currentColor"
        strokeWidth={3}
        strokeOpacity={0.5}
        strokeLinejoin="round"
      />
      <circle r={hub} fill="none" stroke="currentColor" strokeWidth={5} />
      <g opacity={0.7}>{spokeEls}</g>
    </svg>
  );
}

export default function GearsBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none text-brand/30 dark:text-brand/25"
    >
      {/* big gear, top-right */}
      <div
        className="gear-spin absolute -right-24 -top-24 h-[360px] w-[360px] md:h-[460px] md:w-[460px]"
        style={{ animationDuration: "60s" }}
      >
        <Gear teeth={18} r={150} toothH={26} hub={40} spokes={6} />
      </div>

      {/* medium gear, meshing below-left of the big one */}
      <div
        className="gear-spin-reverse absolute right-[180px] top-[150px] h-[220px] w-[220px] md:right-[230px] md:top-[200px] md:h-[280px] md:w-[280px]"
        style={{ animationDuration: "42s" }}
      >
        <Gear teeth={12} r={92} toothH={22} hub={26} spokes={5} />
      </div>

      {/* small gear, bottom-left */}
      <div
        className="gear-spin absolute -left-16 bottom-[-40px] h-[200px] w-[200px] md:h-[260px] md:w-[260px]"
        style={{ animationDuration: "30s" }}
      >
        <Gear teeth={10} r={80} toothH={22} hub={22} spokes={4} />
      </div>
    </div>
  );
}
