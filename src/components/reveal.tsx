"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A restrained scroll-reveal: fades and lifts its children into place once,
 * when they first enter the viewport. Used sparingly — only where motion
 * reinforces hierarchy (the case hero, a sequence anchor). Honours
 * prefers-reduced-motion by rendering fully visible with no transition.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "figure" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion or no observer support: reveal on the next frame (async,
    // never synchronously in the effect body). The global reduced-motion CSS
    // collapses the transition, so this simply guarantees visibility.
    if (reduce || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-shown={shown}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
