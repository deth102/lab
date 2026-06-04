import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { GalleryItem } from "@/lib/galleryItems";

// One event card. Used by both the home-page marquee and the /gallery
// grid. `readMore` text is passed in so this stays a plain (non-async)
// component usable inside the client marquee.
export default function GalleryCard({
  item,
  readMore,
  className = "",
}: {
  item: GalleryItem;
  readMore: string;
  className?: string;
}) {
  const inner = (
    <>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 85vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {(item.name || item.caption) && (
        <>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
            {item.name && (
              <p className="text-base md:text-lg font-semibold leading-snug line-clamp-3">
                {item.name}
              </p>
            )}
            <div className="mt-1.5 flex items-center gap-2 text-xs md:text-sm text-white/75">
              {item.caption && <span>{item.caption}</span>}
              {item.hasBody && (
                <span className="inline-flex items-center gap-1 ml-auto rounded-full bg-white/15 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium">
                  {readMore}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );

  const base =
    "group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-card/40 " +
    className;

  if (item.hasBody) {
    return (
      <Link
        href={`/gallery/${item.slug}`}
        className={base}
        aria-label={item.name ?? item.alt}
      >
        {inner}
      </Link>
    );
  }
  return <div className={base}>{inner}</div>;
}
