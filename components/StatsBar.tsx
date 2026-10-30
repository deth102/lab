
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

const STAT_CONFIG: Record<
  string,
  {
    order: number;
    href?: string;
    external?: boolean;
  }
> = {
  Members: {
    order: 1,
    href: "/members",
  },

  Publications: {
    order: 2,
    href: "https://www.researchgate.net/profile/Trong-Du-Nguyen",
    external: true,
  },

  "Research areas": {
    order: 3,
    href: "/research",
  },

  "Years active": {
    order: 4,
  },
};

export default function StatsBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);

  // Sắp xếp thứ tự các thẻ
  const sortedStats = [...stats].sort((a, b) => {
    const orderA = STAT_CONFIG[a.label]?.order ?? 999;
    const orderB = STAT_CONFIG[b.label]?.order ?? 999;

    return orderA - orderB;
  });

  // GSAP animation
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Không bật chế độ giảm chuyển động
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Chỉ animate các chỉ số khác Publications
        const targets =
          ref.current!.querySelectorAll<HTMLElement>("[data-target]");

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

        // Animation xuất hiện cho các thẻ
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

      // Bật chế độ giảm chuyển động
      mm.add("(prefers-reduced-motion: reduce)", () => {
        ref.current!
          .querySelectorAll<HTMLElement>("[data-target]")
          .forEach((el) => {
            el.innerText = String(el.dataset.target);
          });

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
        {sortedStats.map((s) => {
          const config = STAT_CONFIG[s.label];
          const href = config?.href;
          const isPublication = s.label === "Publications";

          const cardClass =
            "stat-card glow-hover block rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm px-5 py-6 md:px-6 md:py-7 text-center transition-all duration-300";

          // Nội dung thẻ
          const content = (
            <>
              <div className="flex items-baseline justify-center gap-0.5">
                <span
                  {...(!isPublication && {
                    "data-target": s.value,
                  })}
                  className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-brand to-accent bg-clip-text text-transparent"
                >
                  {isPublication ? "56" : "0"}
                </span>

                {!isPublication && s.suffix && (
                  <span className="text-2xl md:text-3xl font-bold text-brand">
                    {s.suffix}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs md:text-sm uppercase tracking-wider text-muted">
                {s.label}
              </p>
            </>
          );

          // Publications: mở tab mới
          if (href && config.external) {
            return (
              <a
                key={s.label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} cursor-pointer hover:border-brand/50`}
              >
                {content}
              </a>
            );
          }

          // Members và Research areas: chuyển trang nội bộ
          if (href) {
            return (
              <Link
                key={s.label}
                href={href}
                className={`${cardClass} cursor-pointer hover:border-brand/50`}
              >
                {content}
              </Link>
            );
          }

          // Years active: không có link
          return (
            <div key={s.label} className={cardClass}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
