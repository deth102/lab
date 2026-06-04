"use client";

import GalleryCard from "./GalleryCard";
import type { GalleryItem } from "@/lib/galleryItems";

// Horizontal auto-scrolling strip of event cards for the home page.
//
// The CSS animation translates the track by -50%, so the track must be
// exactly two identical halves wide. To keep that math exact we:
//   - put NO gap on the flex container (gap would break the -50% loop);
//     spacing comes from each item's right padding instead.
//   - repeat the items enough times that even a few events fill a wide
//     screen, then duplicate that whole sequence once (the second half
//     is what -50% scrolls into).
//
// Hover pauses; prefers-reduced-motion disables it (see globals.css).
export default function GalleryMarquee({
  items,
  readMore,
}: {
  items: GalleryItem[];
  readMore: string;
}) {
  if (items.length === 0) return null;

  // Repeat the base list until we have a comfortable number of cards,
  // so a small set (e.g. 5 events) still fills a wide viewport without
  // gaps. Then the whole sequence is duplicated for the seamless loop.
  const MIN_CARDS = 8;
  const repeats = Math.max(1, Math.ceil(MIN_CARDS / items.length));
  const sequence = Array.from({ length: repeats }, () => items).flat();
  const loop = [...sequence, ...sequence];

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

      <ul className="animate-marquee-gallery flex w-max py-2">
        {loop.map((item, i) => (
          <li
            key={i}
            className="w-[80vw] sm:w-[60vw] md:w-[42vw] lg:w-[360px] shrink-0 pr-5 lg:pr-6"
            aria-hidden={i >= sequence.length ? true : undefined}
          >
            <GalleryCard item={item} readMore={readMore} />
          </li>
        ))}
      </ul>
    </div>
  );
}
