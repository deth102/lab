"use client";

// =================================================================
//  REVEAL TAGLINE — typewriter that types AFTER the big title settles
// =================================================================
//  Below the animated "ITD Lab" title, the full name types itself out
//  letter by letter — but only AFTER the title's collapse finishes, so
//  the two reveals read as a sequence. Once per tab session; otherwise
//  the full text is shown plainly.
// =================================================================

import { useEffect, useState } from "react";

const START_DELAY = 2600; // ms — let the title collapse finish first
const CHAR_MS = 38; // typing speed per character

export default function RevealTagline({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [shown, setShown] = useState(text); // SSR default: full text (no flash)
  const [animate, setAnimate] = useState(false);

  // Type out on every page load (reduced-motion shows it immediately).
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(text);
      return;
    }
    setAnimate(true);
    setShown("");
  }, [text]);

  useEffect(() => {
    if (!animate) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length && interval) {
          clearInterval(interval);
        }
      }, CHAR_MS);
    }, START_DELAY);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [animate, text]);

  // Reserve the line height while empty (invisible placeholder) so nothing
  // jumps/flickers during the wait; then plain typing — no blinking caret.
  return (
    <span className={className} aria-label={text}>
      {shown || " "}
    </span>
  );
}
