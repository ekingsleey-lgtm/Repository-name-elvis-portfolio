"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function ProgressBar({ caseStudy }: { caseStudy: string }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    firedRef.current.clear();
    if (key) {
      posthog.capture("case_study_viewed", { case_study: caseStudy });
    }
  }, [caseStudy]);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let rafId: number;

    const update = () => {
      const article = document.querySelector<HTMLElement>("article");
      if (!article) return;

      const scrollY = window.scrollY;
      const articleTop = article.offsetTop;
      const total = article.scrollHeight - window.innerHeight;
      const progress =
        total > 0
          ? Math.min(1, Math.max(0, (scrollY - articleTop) / total))
          : 0;

      fill.style.transform = `scaleX(${progress})`;

      if (key) {
        const pct = Math.floor(progress * 100);
        for (const milestone of [25, 50, 75, 90] as const) {
          if (pct >= milestone && !firedRef.current.has(milestone)) {
            firedRef.current.add(milestone);
            posthog.capture("case_study_scroll", {
              case_study: caseStudy,
              scroll_depth: milestone,
            });
          }
        }
        if (pct >= 100 && !firedRef.current.has(100)) {
          firedRef.current.add(100);
          posthog.capture("case_study_completed", { case_study: caseStudy });
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [caseStudy]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-16 left-0 right-0 z-50 h-0.5"
    >
      <div
        ref={fillRef}
        className="h-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
