"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  duration?: number;
  /** CSS selector inside this section whose matched elements stagger in. */
  staggerSelector?: string;
  staggerY?: number;
  staggerGap?: number;
  className?: string;
};

export default function Reveal({
  children,
  y = 28,
  delay = 0,
  duration = 0.8,
  staggerSelector,
  staggerY = 16,
  staggerGap = 0.06,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        });

        tl.fromTo(
          ref.current,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power3.out",
          }
        );

        if (staggerSelector) {
          const targets = ref.current!.querySelectorAll(staggerSelector);
          if (targets.length > 0) {
            tl.fromTo(
              targets,
              { y: staggerY, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
                stagger: staggerGap,
                ease: "power3.out",
              },
              "-=0.4"
            );
          }
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        if (staggerSelector) {
          gsap.set(ref.current!.querySelectorAll(staggerSelector), {
            opacity: 1,
            y: 0,
          });
        }
      });
    }, ref);

    return () => ctx.revert();
  }, [y, delay, duration, staggerSelector, staggerY, staggerGap]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
