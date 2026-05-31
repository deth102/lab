"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Stat = { value: number; suffix?: string; label: string };

export default function StatsBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = ref.current!.querySelectorAll<HTMLElement>(
          "[data-target]"
        );
        targets.forEach((el) => {
          const target = Number(el.dataset.target || "0");
          gsap.fromTo(
            el,
            { innerText: 0 },
            {
              innerText: target,
              duration: 1.6,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        });

        gsap.from(ref.current!.querySelectorAll(".stat-card"), {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        ref.current!.querySelectorAll<HTMLElement>("[data-target]").forEach(
          (el) => {
            el.innerText = String(el.dataset.target);
          }
        );
        gsap.set(ref.current!.querySelectorAll(".stat-card"), {
          opacity: 1,
          y: 0,
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-card glow-hover rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm px-5 py-6 md:px-6 md:py-7 text-center"
          >
            <div className="flex items-baseline justify-center gap-0.5">
              <span
                data-target={s.value}
                className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-brand to-accent bg-clip-text text-transparent"
              >
                0
              </span>
              {s.suffix && (
                <span className="text-2xl md:text-3xl font-bold text-brand">
                  {s.suffix}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs md:text-sm uppercase tracking-wider text-muted">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
