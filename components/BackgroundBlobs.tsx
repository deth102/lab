export default function BackgroundBlobs() {
  return (
    <>
      {/* Aurora conic gradient — slow rotating ambient color */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
      >
        <div
          className="absolute -inset-1/4 opacity-30 dark:opacity-25 blur-3xl will-change-transform"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, var(--brand), var(--accent), var(--highlight), var(--brand))",
            animation: "aurora-spin 40s linear infinite",
          }}
        />
      </div>

      {/* Drifting blobs */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <div className="animate-blob absolute -top-32 -left-32 h-[640px] w-[640px] rounded-full bg-brand/8 blur-3xl" />
        <div className="animate-blob-slow absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-accent/8 blur-3xl" />
        <div className="animate-blob absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-highlight/6 blur-3xl" />
      </div>

      {/* Film grain overlay */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  );
}
