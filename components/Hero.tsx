"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "@/i18n/navigation";

type Props = {
  eyebrow: string;
  name: string;
  fullName: string;
  tagline: string;
  bio: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export default function Hero({
  eyebrow,
  name,
  fullName,
  tagline,
  bio,
  ctaPrimary,
  ctaSecondary,
}: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.9 },
        });
        tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.5 })
          .from(".hero-name", { y: 28, opacity: 0 }, "-=0.2")
          .from(".hero-tagline", { y: 18, opacity: 0, duration: 0.6 }, "-=0.5")
          .from(".hero-bio", { y: 18, opacity: 0, duration: 0.6 }, "-=0.45")
          .from(
            ".hero-cta > *",
            { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 },
            "-=0.3"
          )
          .from(
            ".hero-orb",
            { scale: 0.6, opacity: 0, duration: 1.4, ease: "power2.out" },
            0
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".hero-eyebrow",
            ".hero-name",
            ".hero-tagline",
            ".hero-bio",
            ".hero-cta > *",
            ".hero-orb",
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-b border-border/60"
    >
      <div
        aria-hidden
        className="hero-orb pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden
        className="hero-orb pointer-events-none absolute top-40 -left-32 h-[380px] w-[380px] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="hero-eyebrow text-xs md:text-sm uppercase tracking-[0.25em] text-muted">
          {eyebrow}
        </p>
        <h1 className="hero-name mt-4 text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-foreground via-brand to-accent bg-clip-text text-transparent">
            {name}
          </span>
        </h1>
        <p className="hero-name mt-2 text-base md:text-lg text-foreground/70">
          {fullName}
        </p>
        <p className="hero-tagline mt-8 text-2xl md:text-3xl font-medium text-foreground/85 max-w-3xl">
          {tagline}
        </p>
        <p className="hero-bio mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted">
          {bio}
        </p>
        <div className="hero-cta mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            {ctaPrimary}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm font-medium text-foreground/80 hover:text-brand hover:border-brand/60 transition-colors"
          >
            {ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
