"use client";

import { useEffect, useRef } from "react";

/**
 * 2 px horizontal reading-progress line fixed beneath the site header.
 * Tracks progress through the <article> element only — excludes the global
 * footer and any content above the article.
 */
export function ProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    // height 2 px; pointer-events-none so it never blocks clicks
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
