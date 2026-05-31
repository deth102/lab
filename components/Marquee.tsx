type Item = { label: string; kind: "partner" | "topic" };

const ITEMS: Item[] = [
  { label: "HUST", kind: "partner" },
  { label: "Vibration Analysis", kind: "topic" },
  { label: "MCUT · Taiwan", kind: "partner" },
  { label: "Digital Twin", kind: "topic" },
  { label: "NCU · Taiwan", kind: "partner" },
  { label: "PHM", kind: "topic" },
  { label: "KAIST · Korea", kind: "partner" },
  { label: "Transfer Learning", kind: "topic" },
  { label: "Griffith · Australia", kind: "partner" },
  { label: "Edge AI", kind: "topic" },
  { label: "Signal Processing", kind: "topic" },
  { label: "Wavelet Transform", kind: "topic" },
  { label: "Fault Diagnosis", kind: "topic" },
];

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="Partners and research topics"
      className="relative border-y border-border/60 bg-background/40 backdrop-blur-sm overflow-hidden"
    >
      {/* Edge fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent"
      />

      <div className="animate-marquee flex items-center gap-10 py-4 md:py-5">
        {repeated.map((it, i) => (
          <span
            key={i}
            className={
              it.kind === "partner"
                ? "shrink-0 text-sm md:text-base font-semibold tracking-tight bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent"
                : "shrink-0 text-sm md:text-base text-foreground/70"
            }
          >
            {it.kind === "partner" ? it.label : "✦ " + it.label}
          </span>
        ))}
      </div>
    </section>
  );
}
