"use client";

import { useState, useEffect, useCallback } from "react";

export type Chapter = {
  id: string;
  label: string;
  /** Estimated reading time in minutes for this chapter; shown on hover/focus. */
  estMins?: number;
};

const HEADER_H = 72; // header height (64px) + 8px breathing room

/**
 * Sticky chapter navigation for long case studies.
 *
 * Desktop (≥1400 px): a narrow fixed sidebar in the left viewport margin,
 * vertically centred. Shows current/total counter above the list; per-chapter
 * read-time estimate appears on hover and keyboard focus.
 *
 * Mobile (<1400 px): a compact fixed bottom bar showing "03 / 08 · Chapter ↑",
 * with a tap target that opens a slide-up chapter list.
 */
export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateActive = useCallback(() => {
    let current = 0;
    for (let i = 0; i < chapters.length; i++) {
      const el = document.getElementById(chapters[i].id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= HEADER_H + 32) current = i;
    }
    setActiveIdx(current);
  }, [chapters]);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  // Close mobile panel on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const handleMobileChapterClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  if (chapters.length === 0) return null;

  const activeLabel = chapters[activeIdx]?.label ?? "";
  const total = chapters.length;
  const current = activeIdx + 1;
  const currentStr = String(current).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <>
      {/* ── Desktop sidebar — visible at ≥1400 px ────────────────────── */}
      <nav
        className="hidden min-[1400px]:flex fixed top-1/2 left-4 z-30 -translate-y-1/2 w-24 flex-col"
        aria-label="Chapter navigation"
      >
        {/* Current / total counter */}
        <div className="mb-3 pl-3 border-l border-transparent">
          <span className="label label-muted tnum leading-none">
            <span>{currentStr}</span>
            <span className="mx-0.5 opacity-40">/</span>
            <span>{totalStr}</span>
          </span>
        </div>

        {/* Vertical track */}
        <div className="flex flex-col gap-2.5">
          {chapters.map((ch, i) => {
            const active = i === activeIdx;
            const estLabel =
              ch.estMins !== undefined
                ? ch.estMins < 1
                  ? "< 1 min"
                  : `≈ ${ch.estMins} min`
                : undefined;

            return (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                aria-current={active ? "true" : undefined}
                className={[
                  "group relative block py-0.5 pl-3 label leading-tight transition-colors duration-150",
                  active
                    ? "border-l-2 border-ink-muted text-ink-soft"
                    : "border-l border-rule text-ink-faint hover:text-ink-muted focus-visible:text-ink-muted",
                ].join(" ")}
              >
                {ch.label}

                {/* Per-chapter read-time — appears on hover or keyboard focus */}
                {estLabel && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-full mt-0.5 label label-muted whitespace-nowrap opacity-0 transition-opacity duration-100 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    {estLabel}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* ── Mobile bottom bar — hidden at ≥1400 px ──────────────────── */}
      <div className="min-[1400px]:hidden fixed bottom-0 left-0 right-0 z-30">
        {/* Translucent backdrop when list is open */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-paper/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Panel + bar container */}
        <div className="relative border-t border-rule bg-paper">
          {/* Slide-up chapter list */}
          <div
            className={[
              "overflow-y-auto overflow-x-hidden transition-[max-height] duration-200 ease-out",
              mobileOpen ? "max-h-96" : "max-h-0",
            ].join(" ")}
            aria-hidden={!mobileOpen}
          >
            <nav
              className="px-5 pt-5 pb-3 grid gap-0.5"
              aria-label="Jump to chapter"
            >
              {chapters.map((ch, i) => (
                <a
                  key={ch.id}
                  href={`#${ch.id}`}
                  aria-current={i === activeIdx ? "page" : undefined}
                  onClick={handleMobileChapterClick}
                  className={[
                    "flex items-center gap-3 py-2.5 rounded-sm transition-colors",
                    i === activeIdx ? "text-ink" : "text-ink-soft hover:text-ink",
                  ].join(" ")}
                >
                  <span className="label label-muted tnum w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-none">{ch.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Compact always-visible bar — "03 / 08 · Research ↑" */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={`Chapter ${current} of ${total}: ${activeLabel}. ${mobileOpen ? "Close" : "Open"} chapter list.`}
            className="flex w-full items-center justify-between px-5 py-3.5 text-left"
            style={{ paddingBottom: "max(0.875rem, env(safe-area-inset-bottom))" }}
          >
            <span className="label label-muted">
              <span className="tnum">{currentStr} / {totalStr}</span>
              {" · "}
              {activeLabel}
            </span>
            <span className="label label-muted" aria-hidden="true">
              {mobileOpen ? "↓" : "↑"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
