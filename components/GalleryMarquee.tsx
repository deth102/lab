"use client";

import { useEffect, useRef } from "react";
import GalleryCard from "./GalleryCard";
import type { GalleryItem } from "@/lib/galleryItems";

// Horizontal auto-scrolling, swipeable strip of event cards.
//
// Implementation: a real scroll container (so touch-swipe, trackpad and
// drag work natively) whose scrollLeft is nudged every frame by a small
// amount for the auto-scroll effect. The cards are duplicated once and
// when we pass the half-way point we jump back by one half — seamless
// loop. Auto-scroll pauses on hover, touch, and pointer-drag; resumes
// on release. Respects prefers-reduced-motion (no auto-scroll, still
// swipeable).
export default function GalleryMarquee({
  items,
  readMore,
}: {
  items: GalleryItem[];
  readMore: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drag = useRef<{ active: boolean; startX: number; startScroll: number }>(
    { active: false, startX: 0, startScroll: 0 }
  );

  // Repeat so a few events still fill a wide screen, then duplicate the
  // whole sequence for the seamless loop.
  const MIN_CARDS = 8;
  const repeats = Math.max(1, Math.ceil(MIN_CARDS / items.length));
  const sequence = Array.from({ length: repeats }, () => items).flat();
  const loop = [...sequence, ...sequence];

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const SPEED = 0.5; // px per frame (~30px/s at 60fps)

    // Own float accumulator. We must NOT read scrollLeft back as our
    // base: at DPR=1 the getter snaps to whole pixels, so writing N+0.5
    // reads back as N next frame and the 0.5 is lost forever (strip
    // appears frozen). Track position ourselves and resync on manual
    // scroll/drag so both paths agree.
    let pos = el.scrollLeft;

    const tick = () => {
      if (el && !paused.current && !drag.current.active) {
        const half = el.scrollWidth / 2;
        pos += SPEED;
        if (half > 0 && pos >= half) pos -= half; // wrap seamlessly
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);

    // Manual scroll/drag: wrap into [0, half) and resync the accumulator
    // so the next auto tick continues from the real position (no yank).
    const onScroll = () => {
      const half = el.scrollWidth / 2;
      if (half > 0) {
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        else if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      if (!drag.current.active) pos = el.scrollLeft;
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [loop.length]);

  // ---- pointer drag (mouse) ----
  const onPointerDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const endDrag = (e: React.PointerEvent) => {
    const el = scroller.current;
    drag.current.active = false;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };
  // Note: the float accumulator `pos` is resynced inside the effect's
  // onScroll handler (guarded by !drag.current.active), so auto-scroll
  // resumes smoothly from wherever the user released.

  if (items.length === 0) return null;

  return (
    <div className="relative">
      {/* edge fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-24 bg-gradient-to-l from-background to-transparent"
      />

      <div
        ref={scroller}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => (paused.current = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {loop.map((item, i) => (
          <div
            key={i}
            className="w-[80vw] sm:w-[60vw] md:w-[42vw] lg:w-[360px] shrink-0 pr-5 lg:pr-6 select-none"
            aria-hidden={i >= sequence.length ? true : undefined}
          >
            <GalleryCard item={item} readMore={readMore} draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
