export default function BackgroundBlobs() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <div className="animate-blob absolute -top-32 -left-32 h-[640px] w-[640px] rounded-full bg-brand/8 blur-3xl" />
      <div className="animate-blob-slow absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-accent/8 blur-3xl" />
      <div className="animate-blob absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-highlight/6 blur-3xl" />
    </div>
  );
}
