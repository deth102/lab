// =================================================================
//  ITD LAB LOGO — "ITD Signal-Gear"
// =================================================================
//  Two technical components only:
//    1. ONE 3D spur gear (15 teeth) — extruded body + a drilled bore
//       with visible wall thickness, seen slightly from the side via
//       the .iso-stage foreshorten. It SPINS about its centre and
//       SCALES IN on the splash.
//    2. ONE vibration waveform (damped sine) ruled horizontally across
//       it — the time-domain fault signal measured off the gear. It
//       stays FLAT and STATIC (a measurement doesn't rotate with the
//       shaft). One amber peak = the diagnosed fault.
//
//  Colors: currentColor everywhere (inherits text-...), single amber
//  accent via var(--highlight). Depth via opacity tiers only.
// =================================================================

// 15-tooth spur gear top face (rP=46, rO=58, top-origin). Drives the
// underside / body / top tiers of ExtrudedGear.
const GEAR_TOP_PATH =
  "M 0.00,-46.00 L 5.10,-57.78 L 18.84,-54.85 L 18.71,-42.02 L 28.15,-50.71 L 39.53,-42.45 L 34.18,-30.78 L 46.35,-34.87 L 53.37,-22.70 L 43.75,-14.21 L 56.52,-13.01 L 57.99,0.97 L 45.75,4.81 L 56.93,11.11 L 52.58,24.48 L 39.84,23.00 L 47.49,33.30 L 38.08,43.75 L 27.04,37.21 L 29.84,49.74 L 17.00,55.45 L 9.56,44.99 L 7.03,57.57 L -7.03,57.57 L -9.56,44.99 L -17.00,55.45 L -29.84,49.74 L -27.04,37.21 L -38.08,43.75 L -47.49,33.30 L -39.84,23.00 L -52.58,24.48 L -56.93,11.11 L -45.75,4.81 L -57.99,0.97 L -56.52,-13.01 L -43.75,-14.21 L -53.37,-22.70 L -46.35,-34.87 L -34.18,-30.78 L -39.53,-42.45 L -28.15,-50.71 L -18.71,-42.02 L -18.84,-54.85 L -5.10,-57.78 L -0.00,-46.00 Z";

// Damped sinusoid: y = -30·e^(-0.011·(x+92))·sin(0.135·(x+92)), x ∈ [-92,92].
const WAVE_POINTS =
  "-92,0 -88,-14.76 -84,-24.23 -80,-26.26 -76,-20.92 -72,-10.29 -68,2.26 -64,13.14 -60,19.49 -56,19.97 -52,14.93 -48,6.22 -44,-3.46 -40,-11.38 -36,-15.51 -32,-15.04 -28,-10.49 -24,-3.44 -20,3.95 -16,9.64 -12,12.21 -8,11.21 -4,7.22 0,1.59 4,-4 8,-8.03 12,-9.51 16,-8.26 20,-4.85 24,-0.4 28,3.79 32,6.58 36,7.34 40,6.02 44,3.16 48,-0.32 52,-3.43 56,-5.33 60,-5.61 64,-4.33 68,-1.97 72,0.73 76,3 80,4.26 84,4.24 88,3.06 92,1.14";

// Simplified 3-lobe trace for the 32px navbar.
const WAVE_SMALL = "-58,0 -40,-20 -22,14 -4,-9 14,6 40,-3 58,0";

const BORE_R = 14;
const DEPTH = 12; // extrusion offset (pre-foreshorten units)

type Props = {
  size?: number;
  spin?: boolean;
  spinDur?: number;
  favicon?: boolean;
  className?: string;
  ariaLabel?: string;
};

// The gear's solid body via the proven 3-tier extrusion (underside +
// body wall + crisp top face). currentColor + opacity tiers only.
function GearBody() {
  return (
    <>
      {/* underside (receding) */}
      <path
        d={GEAR_TOP_PATH}
        transform={`translate(0 ${DEPTH})`}
        fill="currentColor"
        fillOpacity={0.18}
        stroke="none"
      />
      {/* body wall (darker → reads as thickness) */}
      <path d={GEAR_TOP_PATH} fill="currentColor" fillOpacity={0.28} stroke="none" />
      {/* crisp top face */}
      <path
        d={GEAR_TOP_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        vectorEffect="non-scaling-stroke"
      />
      {/* extruded bore — the drilled axle hole with wall thickness */}
      <circle
        cx="0"
        cy={DEPTH}
        r={BORE_R}
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        opacity={0.5}
      />
      <line
        x1={-BORE_R}
        y1="0"
        x2={-BORE_R}
        y2={DEPTH}
        stroke="currentColor"
        strokeWidth={4}
        opacity={0.5}
      />
      <line
        x1={BORE_R}
        y1="0"
        x2={BORE_R}
        y2={DEPTH}
        stroke="currentColor"
        strokeWidth={4}
        opacity={0.5}
      />
      <circle
        cx="0"
        cy="0"
        r={BORE_R}
        fill="currentColor"
        fillOpacity={0.1}
        stroke="currentColor"
        strokeWidth={4}
      />
      <circle cx="0" cy="0" r="2.5" fill="currentColor" stroke="none" />
    </>
  );
}

export default function LabLogo({
  size = 32,
  spin = false,
  spinDur = 28,
  favicon = false,
  className = "",
  ariaLabel = "ITD Lab",
}: Props) {
  const showDetail = !favicon && size >= 64;

  // ---- 16px favicon: bold single-gear silhouette + amber dot ----
  if (favicon || size < 28) {
    return (
      <svg
        viewBox="-100 -100 200 200"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        role="img"
        aria-label={ariaLabel}
        className={className}
      >
        <circle cx="0" cy="0" r="88" vectorEffect="non-scaling-stroke" />
        <circle cx="0" cy="0" r="22" fill="currentColor" stroke="none" />
        <circle cx="0" cy="-60" r="9" fill="var(--highlight)" stroke="none" />
      </svg>
    );
  }

  const spinStyle = spin
    ? ({
        transformOrigin: "50% 50%",
        animationDuration: `${spinDur}s`,
      } as React.CSSProperties)
    : undefined;

  // ---- 32px navbar: flat (no iso), gear top-face + simplified trace ----
  if (!showDetail) {
    return (
      <svg
        viewBox="-100 -100 200 200"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        role="img"
        aria-label={ariaLabel}
        className={className}
      >
        <g
          className={spin ? "gear-spin" : undefined}
          style={
            spin
              ? ({
                  transformOrigin: "50% 50%",
                  animationDuration: `${spinDur * 1.4}s`,
                } as React.CSSProperties)
              : undefined
          }
        >
          <path
            d={GEAR_TOP_PATH}
            strokeWidth={4.5}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="0" cy="0" r={BORE_R} fill="currentColor" stroke="none" />
        </g>
        {/* static simplified trace */}
        <polyline
          points={WAVE_SMALL}
          fill="none"
          strokeWidth={4}
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="-40" cy="-20" r="6" fill="var(--highlight)" stroke="none" />
      </svg>
    );
  }

  // ---- hero / splash: full 3D gear + measured waveform ----
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      {/* spinning 3D gear inside the isometric plane */}
      <g className="iso-stage">
        <g className={spin ? "gear-spin" : undefined} style={spinStyle}>
          <GearBody />
        </g>
      </g>

      {/* STATIC measured waveform — flat, never foreshortened */}
      <g>
        {/* scope zero-axis baseline */}
        <line
          x1="-92"
          y1="0"
          x2="92"
          y2="0"
          strokeWidth={1}
          opacity={0.4}
        />
        {/* the vibration trace */}
        <polyline
          points={WAVE_POINTS}
          fill="none"
          stroke="currentColor"
          strokeWidth={3.5}
          vectorEffect="non-scaling-stroke"
        />
        {/* amber diagnosed-fault marker at the dominant early peak */}
        <line
          x1="-80"
          y1="-26.26"
          x2="-80"
          y2="0"
          stroke="var(--highlight)"
          strokeWidth={1.5}
          opacity={0.7}
        />
        <circle
          cx="-80"
          cy="-26.26"
          r="8"
          fill="none"
          stroke="var(--highlight)"
          strokeWidth={1.5}
        />
        <circle cx="-80" cy="-26.26" r="4.5" fill="var(--highlight)" stroke="none" />
      </g>
    </svg>
  );
}
