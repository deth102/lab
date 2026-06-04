"use client";

import GalleryCard from "./GalleryCard";
import type { GalleryItem } from "@/lib/galleryItems";

// Horizontal auto-scrolling strip of event cards for the home page.
// Cards are duplicated once so the CSS marquee loops seamlessly.
// Hover pauses; respects prefers-reduced-motion via the .animate-marquee
// rule in globals.css (paused there too).
export default function GalleryMarquee({
  items,
  readMore,
}: {
  items: GalleryItem[];
  readMore: string;
}) {
  if (items.length === 0) return null;

  // Duplicate for a seamless -50% translate loop.
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      {/* edge fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-24 bg-gradient-to-l from-background to-transparent"
      />

      <ul className="animate-marquee-gallery flex w-max gap-5 lg:gap-6 py-2">
        {loop.map((item, i) => (
          <li
            key={i}
            className="w-[80vw] sm:w-[60vw] md:w-[42vw] lg:w-[360px] shrink-0"
            aria-hidden={i >= items.length ? true : undefined}
          >
            <GalleryCard item={item} readMore={readMore} />
          </li>
        ))}
      </ul>
    </div>
  );
}
