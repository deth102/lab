"use client";

// =================================================================
//  REVEAL WORDMARK — in-Hero "full name → ITD Lab" collapse
// =================================================================
//  The big Hero title renders the full lab name at full size on ONE
//  line. It writes in, then every letter except the three initials
//  (I, T, D) fades away while those initials + the word "Lab" slide
//  LEFT and pack into "ITD Lab", anchored at the line's start.
//
//  Glyphs are frozen to absolute after one font-aware measure, so the
//  slide is a pure transform with no reflow. Each glyph carries its
//  own gradient (a parent bg-clip-text can't clip absolute children).
//  Once per tab session.
// =================================================================

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = ["Intelligent", "Technical", "Diagnostics"];
const TAIL = "Lab";
const SPACE_EM = 0.3; // explicit width for the inter-word space glyph

const SIZE = "text-5xl md:text-7xl";
const GRADIENT =
  "bg-gradient-to-r from-foreground via-brand to-accent bg-clip-text text-transparent";
const CHAR_GRADIENT =
  "inline-block bg-gradient-to-br from-foreground via-brand to-accent bg-clip-text text-transparent";

export default function RevealWordmark({
  className = "",
}: {
  className?: string;
}) {
  const [animate, setAnimate] = useState<boolean | null>(null);
  const boxRef = useRef<HTMLSpanElement>(null);

  // Play the reveal on every page load (not just the first of a session).
  useLayoutEffect(() => {
    setAnimate(true);
  }, []);

  useLayoutEffect(() => {
    if (!animate) return;
    const box = boxRef.current;
    if (!box) return;

    let cancelled = false;
    let ctx: gsap.Context | undefined;

    const run = () => {
      if (cancelled || !box) return;

      const keeps = Array.from(box.querySelectorAll<HTMLElement>("[data-keep]"));
      const drops = Array.from(box.querySelectorAll<HTMLElement>("[data-drop]"));
      const all = Array.from(box.querySelectorAll<HTMLElement>(".rw-char"));

      const boxRect = box.getBoundingClientRect();
      const pos = all.map((el) => {
        const r = el.getBoundingClientRect();
        return { el, left: r.left - boxRect.left, top: r.top - boxRect.top };
      });

      // Freeze every glyph to absolute at its measured spot.
      box.style.position = "relative";
      box.style.display = "inline-block";
      box.style.height = `${boxRect.height}px`;
      pos.forEach((p) => {
        p.el.style.position = "absolute";
        p.el.style.left = `${p.left}px`;
        p.el.style.top = `${p.top}px`;
        p.el.style.margin = "0";
        p.el.style.whiteSpace = "pre";
      });

      // Pack kept glyphs into "ITD Lab" starting at the line's LEFT edge.
      const keepLeft0 = pos
        .filter((p) => keeps.includes(p.el))
        .map((p) => p.left);
      const keepW = keeps.map((el) => el.getBoundingClientRect().width);
      const gapInitial = keepW[0] * 0.06;
      const gaps = keeps.map((el, i) => {
        if (i === 0) return 0;
        const isTail = el.dataset.tail === "1";
        const prevTail = keeps[i - 1].dataset.tail === "1";
        if (isTail && prevTail) return keepW[i] * 0.02;
        if (isTail && !prevTail) return keepW[i] * 0.45;
        return gapInitial;
      });

      let cursor = 0;
      keeps.forEach((el, i) => {
        cursor += gaps[i];
        el.dataset.dx = String(cursor - keepLeft0[i]);
        cursor += keepW[i];
      });

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.from(
            all,
            {
              opacity: 0,
              yPercent: 50,
              filter: "blur(5px)",
              duration: 0.5,
              stagger: { each: 0.02, from: "start" },
            },
            0
          );
          tl.to({}, { duration: 0.7 });
          tl.to(
            drops,
            {
              opacity: 0,
              scale: 0.5,
              filter: "blur(6px)",
              duration: 0.4,
              ease: "power2.in",
              stagger: { each: 0.01, from: "center" },
            },
            "collapse"
          );
          tl.to(
            keeps,
            {
              x: (_i, el) => Number((el as HTMLElement).dataset.dx),
              duration: 0.85,
              ease: "power3.inOut",
            },
            "collapse+=0.2"
          );
          return () => tl.kill();
        });

        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set(drops, { display: "none" });
          gsap.set(keeps, {
            x: (_i, el) => Number((el as HTMLElement).dataset.dx),
          });
        });
      }, boxRef);
    };

    const fontsReady =
      (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts
        ?.ready ?? Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1500))]).then(
      run
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [animate]);

  // Static fallback: the final "ITD Lab" at full size with the gradient.
  if (animate === null || animate === false) {
    return (
      <span className={`${className} block ${SIZE} ${GRADIENT}`}>ITD Lab</span>
    );
  }

  // Animating: full phrase at full size, one line. Spaces are explicit
  // fixed-width glyphs so inline-block letters don't run together.
  return (
    <span
      ref={boxRef}
      aria-label="ITD Lab"
      className={`${className} block ${SIZE} whitespace-nowrap`}
    >
      {WORDS.map((word, wi) => (
        <span key={wi} className="rw-word">
          {[...word].map((ch, ci) => (
            <span
              key={ci}
              data-keep={ci === 0 ? "" : undefined}
              data-drop={ci === 0 ? undefined : ""}
              className={`rw-char ${CHAR_GRADIENT}`}
            >
              {ch}
            </span>
          ))}
          <span
            data-drop=""
            className="rw-char inline-block"
            style={{ width: `${SPACE_EM}em` }}
          />
        </span>
      ))}
      <span className="rw-word">
        {[...TAIL].map((ch, ci) => (
          <span
            key={ci}
            data-keep=""
            data-tail="1"
            className={`rw-char ${CHAR_GRADIENT}`}
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
