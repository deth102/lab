"use client";

import { useEffect, useState } from "react";
import LabLogo from "./LabLogo";

// =================================================================
//  LOADING SPLASH
// =================================================================
//  Shown once per browser tab session (sessionStorage flag) on first
//  load. The gear logo spins fast; the wordmark types out the full
//  "Intelligent Technical Diagnostics", then collapses to "ITD Lab".
//  Auto-dismisses after the sequence. Respects prefers-reduced-motion
//  (shorter, no typing). Theme-aware via CSS vars already set by the
//  inline theme-init script in layout.
// =================================================================

const SESSION_KEY = "itd-splash-shown";
const DURATION_MS = 3200; // total before fade-out begins

export default function Splash() {
  // null = undecided (SSR/first paint), true = show, false = skip
  const [show, setShow] = useState<boolean | null>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Skip if already shown this tab session, or reduced-motion.
    const seen = sessionStorage.getItem(SESSION_KEY);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (seen) {
      setShow(false);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(true);

    const total = reduce ? 1200 : DURATION_MS;
    const t1 = setTimeout(() => setLeaving(true), total);
    const t2 = setTimeout(() => setShow(false), total + 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (show === false) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background transition-[opacity,visibility] duration-500 ${
        show === null ? "opacity-0" : "opacity-100"
      } ${leaving ? "opacity-0 invisible" : ""}`}
    >
      {/* Spinning gear logo with a soft glow */}
      <div className="splash-logo text-brand drop-shadow-[0_0_28px_color-mix(in_oklab,var(--brand)_40%,transparent)]">
        <LabLogo size={112} spin spinDur={8} />
      </div>

      {/* Wordmark: types the full name, then collapses to "ITD Lab" */}
      <div className="relative h-9 w-full text-center font-bold tracking-tight">
        <span className="splash-full absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-lg md:text-xl text-foreground">
          <span className="splash-type inline-block overflow-hidden whitespace-nowrap align-bottom">
            Intelligent Technical Diagnostics
          </span>
        </span>
        <span className="splash-short absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-2xl md:text-3xl text-brand">
          ITD&nbsp;Lab
        </span>
      </div>
    </div>
  );
}
