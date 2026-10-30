
"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const STAT_LINKS = [
  { href: "/members" },
  {
    href: "https://www.researchgate.net/profile/Trong-Du-Nguyen",
    external: true,
  },
  {},
  { href: "/research" },
];

export default function StatsBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stat-card");

      // Chỉ fade-in, không di chuyển card
      gsap.fromTo(
        cards,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Hiệu ứng đếm số
      const targets =
        ref.current!.querySelectorAll<HTMLElement>("[data-target]");

      targets.forEach((el) => {
        const target = Number(el.dataset.target || "0");
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          snap: { value: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(counter.value);
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div
        ref={ref}
        className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-4 md:gap-6"
      >
        {stats.map((s, index) => {
          const config = STAT_LINKS[index];

          const cardClass =
            "stat-card glow-hover flex h-full min-w-0 flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 px-3 py-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-brand/50 sm:px-5 md:px-6 md:py-7";

          const content = (
            <>
              {/* Number: cố định chiều rộng */}
              <div className="flex min-h-[56px] w-full items-center justify-center gap-1">
                <span
                  data-target={s.value}
                  style={{
                    width: `${Math.max(String(Math.abs(s.value)).length, 1)}ch`,
                    display: "inline-block",
                    textAlign: "center",
                    fontVariantNumeric: "tabular-nums",
                  }}
                  className="text-4xl font-bold leading-none tracking-tight bg-gradient-to-br from-brand to-accent bg-clip-text text-transparent md:text-5xl"
                >
                  0
                </span>

                {s.suffix && (
                  <span className="text-2xl font-bold leading-none text-brand md:text-3xl">
                    {s.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="mt-2 flex min-h-[40px] w-full items-center justify-center text-xs leading-relaxed tracking-wider text-muted uppercase md:text-sm">
                {s.label}
              </p>
            </>
          );

          // Publications: mở ResearchGate ở tab mới
          if (config?.external && config.href) {
            return (
              <a
                key={`${s.label}-${index}`}
                href={config.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {content}
              </a>
            );
          }

          // Members và Research areas: giữ locale hiện tại
          if (config?.href) {
            return (
              <Link
                key={`${s.label}-${index}`}
                href={config.href}
                className={cardClass}
              >
                {content}
              </Link>
            );
          }

          // Years Active: không có link
          return (
            <div key={`${s.label}-${index}`} className={cardClass}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
