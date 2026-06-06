"use client";

// =================================================================
//  ITD LAB LOGO — "ITD Signal-Gear" (flat + signal cut-through)
// =================================================================
//  Two components:
//    1. ONE flat spur gear (15 teeth) that spins about its centre.
//    2. A vibration time-series that scrolls horizontally across the
//       gear. Where the signal passes, it CUTS A GROOVE out of the
//       gear (you see through to the background) — via an SVG mask
//       whose moving wave band is the cut. The bright signal trace is
//       drawn on top so the groove reads as "signal eating through".
//
//  The gear spins; the wave (and its groove) scrolls right→left in an
//  endless loop. Splash scale-in still applies via the wrapper.
//
//  Colors: currentColor (inherits text-...), amber var(--highlight).
// =================================================================

import { useId } from "react";

// =================================================================
//  TUNABLE GEOMETRY — values chosen in demo/logo.html.
//  Gear: rP=80, h=28, N=14, bore=24 (diameter 188). Signal: 11 cycles,
//  amp=18, beat=0.8, length=160 (≤ diameter), yoff=50. TWO straight
//  parallel grooves (gap = AMP) carve a band; ONE wave scrolls in it.
//  Colors are fixed (gear ≠ signal), so this mark does NOT inherit
//  currentColor — it always uses these brand colours.
// =================================================================
const BORE_R = 24;
const AMP = 18; // groove gap = signal amplitude
const WAVE_LEN = 160; // band length (≤ gear diameter 188)
const WAVE_YOFF = 50; // vertical position of the band
const GROOVE_W = 22; // width of each carved straight line
const GEAR_SW = 3.5; // gear stroke
const WAVE_SW = 2; // wave stroke
const GEAR_FILL = 0; // gear body fill opacity
const COL_GEAR = "#024f64";
const COL_WAVE = "#e2bbbb";
const COL_AMBER = "#f59e0b";

// 14-tooth flat spur gear (rP=80, rO=94, top-origin).
const GEAR_PATH =
  "M -14.69,-64.35 L -8.85,-93.58 L 8.85,-93.58 L 14.69,-64.35 L 14.69,-64.35 L 32.63,-88.15 L 48.57,-80.48 L 41.15,-51.60 L 41.15,-51.60 L 67.65,-65.26 L 78.68,-51.43 L 59.46,-28.64 L 59.46,-28.64 L 89.27,-29.45 L 93.20,-12.20 L 66.00,-0.00 L 66.00,-0.00 L 93.20,12.20 L 89.27,29.45 L 59.46,28.64 L 59.46,28.64 L 78.68,51.43 L 67.65,65.26 L 41.15,51.60 L 41.15,51.60 L 48.57,80.48 L 32.63,88.15 L 14.69,64.35 L 14.69,64.35 L 8.85,93.58 L -8.85,93.58 L -14.69,64.35 L -14.69,64.35 L -32.63,88.15 L -48.57,80.48 L -41.15,51.60 L -41.15,51.60 L -67.65,65.26 L -78.68,51.43 L -59.46,28.64 L -59.46,28.64 L -89.27,29.45 L -93.20,12.20 L -66.00,0.00 L -66.00,0.00 L -93.20,-12.20 L -89.27,-29.45 L -59.46,-28.64 L -59.46,-28.64 L -78.68,-51.43 L -67.65,-65.26 L -41.15,-51.60 L -41.15,-51.60 L -48.57,-80.48 L -32.63,-88.15 L -14.69,-64.35 Z";

// Long vibration band (6-cycle carrier × beat envelope, both period 100)
// for the scrolling carved groove. Spans [-200,400] → a -100 scroll loops
// seamlessly. The two grooves are this band shifted ±AMP/2 vertically.
const WAVE_BAND =
  "-200,50.00 -198,44.69 -196,47.36 -194,57.52 -192,57.21 -190,42.91 -188,37.82 -186,53.65 -184,65.73 -182,52.08 -180,33.55 -178,41.45 -176,63.85 -174,63.85 -172,41.45 -170,33.55 -168,52.08 -166,65.73 -164,53.65 -162,37.82 -160,42.91 -158,57.21 -156,57.52 -154,47.36 -152,44.69 -150,50.00 -148,55.31 -146,52.64 -144,42.48 -142,42.79 -140,57.09 -138,62.18 -136,46.35 -134,34.27 -132,47.92 -130,66.45 -128,58.55 -126,36.15 -124,36.15 -122,58.55 -120,66.45 -118,47.92 -116,34.27 -114,46.35 -112,62.18 -110,57.09 -108,42.79 -106,42.48 -104,52.64 -102,55.31 -100,50.00 -98,44.69 -96,47.36 -94,57.52 -92,57.21 -90,42.91 -88,37.82 -86,53.65 -84,65.73 -82,52.08 -80,33.55 -78,41.45 -76,63.85 -74,63.85 -72,41.45 -70,33.55 -68,52.08 -66,65.73 -64,53.65 -62,37.82 -60,42.91 -58,57.21 -56,57.52 -54,47.36 -52,44.69 -50,50.00 -48,55.31 -46,52.64 -44,42.48 -42,42.79 -40,57.09 -38,62.18 -36,46.35 -34,34.27 -32,47.92 -30,66.45 -28,58.55 -26,36.15 -24,36.15 -22,58.55 -20,66.45 -18,47.92 -16,34.27 -14,46.35 -12,62.18 -10,57.09 -8,42.79 -6,42.48 -4,52.64 -2,55.31 0,50.00 2,44.69 4,47.36 6,57.52 8,57.21 10,42.91 12,37.82 14,53.65 16,65.73 18,52.08 20,33.55 22,41.45 24,63.85 26,63.85 28,41.45 30,33.55 32,52.08 34,65.73 36,53.65 38,37.82 40,42.91 42,57.21 44,57.52 46,47.36 48,44.69 50,50.00 52,55.31 54,52.64 56,42.48 58,42.79 60,57.09 62,62.18 64,46.35 66,34.27 68,47.92 70,66.45 72,58.55 74,36.15 76,36.15 78,58.55 80,66.45 82,47.92 84,34.27 86,46.35 88,62.18 90,57.09 92,42.79 94,42.48 96,52.64 98,55.31 100,50.00 102,44.69 104,47.36 106,57.52 108,57.21 110,42.91 112,37.82 114,53.65 116,65.73 118,52.08 120,33.55 122,41.45 124,63.85 126,63.85 128,41.45 130,33.55 132,52.08 134,65.73 136,53.65 138,37.82 140,42.91 142,57.21 144,57.52 146,47.36 148,44.69 150,50.00 152,55.31 154,52.64 156,42.48 158,42.79 160,57.09 162,62.18 164,46.35 166,34.27 168,47.92 170,66.45 172,58.55 174,36.15 176,36.15 178,58.55 180,66.45 182,47.92 184,34.27 186,46.35 188,62.18 190,57.09 192,42.79 194,42.48 196,52.64 198,55.31 200,50.00 202,44.69 204,47.36 206,57.52 208,57.21 210,42.91 212,37.82 214,53.65 216,65.73 218,52.08 220,33.55 222,41.45 224,63.85 226,63.85 228,41.45 230,33.55 232,52.08 234,65.73 236,53.65 238,37.82 240,42.91 242,57.21 244,57.52 246,47.36 248,44.69 250,50.00 252,55.31 254,52.64 256,42.48 258,42.79 260,57.09 262,62.18 264,46.35 266,34.27 268,47.92 270,66.45 272,58.55 274,36.15 276,36.15 278,58.55 280,66.45 282,47.92 284,34.27 286,46.35 288,62.18 290,57.09 292,42.79 294,42.48 296,52.64 298,55.31 300,50.00 302,44.69 304,47.36 306,57.52 308,57.21 310,42.91 312,37.82 314,53.65 316,65.73 318,52.08 320,33.55 322,41.45 324,63.85 326,63.85 328,41.45 330,33.55 332,52.08 334,65.73 336,53.65 338,37.82 340,42.91 342,57.21 344,57.52 346,47.36 348,44.69 350,50.00 352,55.31 354,52.64 356,42.48 358,42.79 360,57.09 362,62.18 364,46.35 366,34.27 368,47.92 370,66.45 372,58.55 374,36.15 376,36.15 378,58.55 380,66.45 382,47.92 384,34.27 386,46.35 388,62.18 390,57.09 392,42.79 394,42.48 396,52.64 398,55.31 400,50.00";

// --- SMALL variant (navbar / favicon < 48px) ---
// The full mark is too busy at 32px, so small sizes use a simplified
// signal-gear: a bold 10-tooth ring with a short 3-cycle wave crossing
// the open bore. Reads clearly as "gear + signal" even tiny.
const GEAR_SMALL =
  "M -17.6,-54.2 L -11.4,-86.2 L 11.4,-86.2 L 17.6,-54.2 L 17.6,-54.2 L 41.4,-76.5 L 60.0,-63.0 L 46.1,-33.5 L 46.1,-33.5 L 78.5,-37.5 L 85.6,-15.8 L 57.0,-0.0 L 57.0,-0.0 L 85.6,15.8 L 78.5,37.5 L 46.1,33.5 L 46.1,33.5 L 60.0,63.0 L 41.4,76.5 L 17.6,54.2 L 17.6,54.2 L 11.4,86.2 L -11.4,86.2 L -17.6,54.2 L -17.6,54.2 L -41.4,76.5 L -60.0,63.0 L -46.1,33.5 L -46.1,33.5 L -78.5,37.5 L -85.6,15.8 L -57.0,0.0 L -57.0,0.0 L -85.6,-15.8 L -78.5,-37.5 L -46.1,-33.5 L -46.1,-33.5 L -60.0,-63.0 L -41.4,-76.5 L -17.6,-54.2 Z";
const WAVE_NAV =
  "-39,0.0 -35,-11.5 -31,-13.1 -27,-3.4 -23,9.3 -19,13.9 -15,6.5 -11,-6.5 -7,-13.9 -3,-9.3 1,3.4 5,13.1 9,11.5 13,0.0 17,-11.5 21,-13.1 25,-3.4 29,9.3 33,13.9 37,6.5";

// Static finite wave (length WAVE_LEN, centred, at y≈WAVE_YOFF) — the
// exact same trace as the hero logo, but not scrolling. Used at large
// sizes only.
const WAVE_STATIC =
  "-80,50.00 -78,46.40 -76,44.22 -74,46.36 -72,52.49 -70,58.42 -68,59.03 -66,52.60 -64,42.91 -62,37.09 -60,40.25 -58,51.14 -56,62.34 -54,65.44 -52,57.46 -50,43.53 -48,33.55 -46,34.99 -44,47.21 -42,61.66 -40,68.00 -38,61.66 -36,47.21 -34,34.99 -32,33.55 -30,43.53 -28,57.46 -26,65.44 -24,62.34 -22,51.14 -20,40.25 -18,37.09 -16,42.91 -14,52.60 -12,59.03 -10,58.42 -8,52.49 -6,46.36 -4,44.22 -2,46.40 0,50.00 2,53.60 4,55.78 6,53.64 8,47.51 10,41.58 12,40.97 14,47.40 16,57.09 18,62.91 20,59.75 22,48.86 24,37.66 26,34.56 28,42.54 30,56.47 32,66.45 34,65.01 36,52.79 38,38.34 40,32.00 42,38.34 44,52.79 46,65.01 48,66.45 50,56.47 52,42.54 54,34.56 56,37.66 58,48.86 60,59.75 62,62.91 64,57.09 66,47.40 68,40.97 70,41.58 72,47.51 74,53.64 76,55.78 78,53.60 80,50.00";

type Props = {
  size?: number;
  spin?: boolean; // animate: gear rotates + signal scrolls (hero only)
  spinDur?: number;
  /** @deprecated kept for API compat; the same mark renders at all sizes */
  favicon?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function LabLogo({
  size = 32,
  spin = false,
  spinDur = 22,
  className = "",
  ariaLabel = "ITD Lab",
}: Props) {
  const uid = useId().replace(/:/g, "");
  const maskId = `sigcut-${uid}`;
  const clipId = `${maskId}-clip`;

  // --- SMALL renders (navbar / favicon) get a simplified mark ---------
  // The full 14-tooth + twin-groove + dense-wave mark turns to mush below
  // ~48px. Small sizes instead use a bold 10-tooth ring with a short wave
  // crossing the open bore — unmistakably "gear + signal" even at 32px.
  if (size < 48) {
    return (
      <svg
        viewBox="-100 -100 200 200"
        width={size}
        height={size}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        role="img"
        aria-label={ariaLabel}
        className={className}
      >
        <path
          d={GEAR_SMALL}
          fill="none"
          stroke={COL_GEAR}
          strokeWidth={9}
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points={WAVE_NAV}
          fill="none"
          stroke={COL_WAVE}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  // --- LARGE render (hero): the full signal-gear mark -----------------
  // Straight twin grooves carve a band; one signal trace sits in it
  // (scrolls when spinning, static otherwise).
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="-100"
          y="-100"
          width="200"
          height="200"
        >
          <rect x="-100" y="-100" width="200" height="200" fill="white" />
          {[-AMP / 2, AMP / 2].map((dy, i) => (
            <line
              key={i}
              x1={-WAVE_LEN / 2}
              y1={WAVE_YOFF + dy}
              x2={WAVE_LEN / 2}
              y2={WAVE_YOFF + dy}
              stroke="black"
              strokeWidth={GROOVE_W}
              strokeLinecap="round"
            />
          ))}
        </mask>
        <clipPath id={clipId}>
          <rect
            x={-WAVE_LEN / 2}
            y={WAVE_YOFF - AMP / 2 - 4}
            width={WAVE_LEN}
            height={AMP + 8}
          />
        </clipPath>
      </defs>

      {/* GEAR — twin straight grooves punched out via the mask. */}
      <g mask={`url(#${maskId})`}>
        <g>
          {GEAR_FILL > 0 && (
            <path
              d={GEAR_PATH}
              fill={COL_GEAR}
              fillOpacity={GEAR_FILL}
              stroke="none"
            />
          )}
          <path
            d={GEAR_PATH}
            fill="none"
            stroke={COL_GEAR}
            strokeWidth={GEAR_SW}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="0"
            cy="0"
            r={BORE_R}
            fill={COL_GEAR}
            fillOpacity={GEAR_FILL}
            stroke={COL_GEAR}
            strokeWidth={4}
          />
          {spin && (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 0 0"
              to="360 0 0"
              dur={`${spinDur}s`}
              repeatCount="indefinite"
            />
          )}
        </g>
      </g>

      {/* ONE signal trace in the band. Scrolls when spinning (long band),
          static otherwise (finite trace, exactly between the grooves). */}
      <g clipPath={`url(#${clipId})`}>
        <polyline
          className={spin ? "wave-scroll" : undefined}
          points={spin ? WAVE_BAND : WAVE_STATIC}
          fill="none"
          stroke={COL_WAVE}
          strokeWidth={WAVE_SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}
