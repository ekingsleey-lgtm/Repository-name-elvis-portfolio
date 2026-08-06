"use client";

import { useState, useEffect } from "react";

interface Props {
  readTime: number;
}

/**
 * Shows "N min read" initially, then switches to "N min remaining" after the
 * reader has scrolled past ~5% of the article. Runs its own rAF-throttled
 * scroll listener so the server-rendered StudyMeta can stay a server component.
 *
 * The initial useState value intentionally matches what the server renders, so
 * there is no hydration mismatch.
 */
export function ReadingTimeStatus({ readTime }: Props) {
  const [text, setText] = useState(`${readTime} min read`);

  useEffect(() => {
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

      if (progress < 0.05) {
        setText(`${readTime} min read`);
      } else {
        const rawRemaining = readTime * (1 - progress);
        if (rawRemaining < 1) {
          setText("Less than 1 min remaining");
        } else {
          setText(`${Math.round(rawRemaining)} min remaining`);
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [readTime]);

  // suppressHydrationWarning handles the edge case where the page loads with a
  // hash anchor that has already scrolled past the 5 % threshold before
  // hydration fires.
  return <span suppressHydrationWarning>{text}</span>;
}
