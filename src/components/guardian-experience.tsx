"use client";

import { useState, useEffect, useCallback } from "react";
import { Container, Label, Rule } from "./primitives";

// ── Types ─────────────────────────────────────────────────────────────────────

type ItemId = "news" | "opinion" | "sport" | "live" | "discover" | "search" | "profile" | "crosswords";
type Dimension = "editorial" | "commercial" | "utility";
type DimensionStatus = "represented" | "partial" | "not";
type Phase = "selecting" | "confirmed";

// ── Data ──────────────────────────────────────────────────────────────────────

const ITEMS: { id: ItemId; label: string; dimension: Dimension | null }[] = [
  { id: "news",       label: "News",       dimension: "editorial" },
  { id: "opinion",    label: "Opinion",    dimension: "editorial" },
  { id: "sport",      label: "Sport",      dimension: "editorial" },
  { id: "live",       label: "Live",       dimension: "commercial" },
  { id: "discover",   label: "Discover",   dimension: "commercial" },
  { id: "search",     label: "Search",     dimension: "utility" },
  { id: "profile",    label: "Profile",    dimension: "utility" },
  { id: "crosswords", label: "Crosswords", dimension: null },
];

const DIMENSIONS: { id: Dimension; label: string }[] = [
  { id: "editorial",  label: "Editorial" },
  { id: "commercial", label: "Commercial" },
  { id: "utility",    label: "Utility" },
];

const MAX_SLOTS = 3;

// ── Reduced-motion hook ────────────────────────────────────────────────────────

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ── Trade-off logic ────────────────────────────────────────────────────────────

function getDimensionStatus(selection: ItemId[], dimension: Dimension): DimensionStatus {
  const dimensionItems = ITEMS.filter((i) => i.dimension === dimension);
  const count = selection.filter((id) => dimensionItems.some((i) => i.id === id)).length;
  if (count === 0) return "not";
  if (count >= dimensionItems.length) return "represented";
  return "partial";
}

function getInterpretation(selection: ItemId[]): string {
  const e = selection.filter((id) => ITEMS.find((i) => i.id === id)?.dimension === "editorial").length;
  const c = selection.filter((id) => ITEMS.find((i) => i.id === id)?.dimension === "commercial").length;
  const u = selection.filter((id) => ITEMS.find((i) => i.id === id)?.dimension === "utility").length;

  if (e >= 2 && c === 0 && u === 0)
    return "Editorial is well represented, but Premium visibility and utility have been pushed out.";
  if (c === 2 && e <= 1)
    return "Premium visibility is strong, but fewer editorial destinations are immediately available.";
  if (u === 2 && e === 0 && c === 0)
    return "Utility is prominent, but there is less room for editorial discovery or Premium entry points.";
  if (e >= 1 && c >= 1 && u >= 1)
    return "You have balanced the competing needs, but every choice still pushes something else out.";
  if (e >= 2 && c >= 1)
    return "Editorial and Premium are both visible, but there is no room for utility features.";
  if (e >= 1 && u >= 1 && c === 0)
    return "Editorial and utility are covered, but Premium entry points are absent.";
  if (c >= 1 && u >= 1 && e === 0)
    return "Premium and utility are represented, but editorial destinations are absent.";
  return "Every reasonable choice came with a trade-off.";
}

// ── Nav slot bar ───────────────────────────────────────────────────────────────

function NavSlotBar({
  selection,
  confirmed,
}: {
  selection: ItemId[];
  confirmed: boolean;
}) {
  const slots = Array.from({ length: MAX_SLOTS }, (_, i) => {
    const id = selection[i] ?? null;
    return id ? ITEMS.find((it) => it.id === id) ?? null : null;
  });

  return (
    <div
      className="gdn-pri-nav-bar"
      data-confirmed={String(confirmed)}
      aria-label={`Navigation preview: ${selection.length} of ${MAX_SLOTS} items selected`}
      aria-live="polite"
    >
      {slots.map((item, i) => (
        <div
          key={i}
          className="gdn-pri-nav-slot"
          data-filled={String(!!item)}
          aria-label={item ? item.label : `Empty slot ${i + 1}`}
        >
          {item ? (
            <span>{item.label}</span>
          ) : (
            <span aria-hidden="true" className="gdn-pri-nav-slot-empty">
              —
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Item chip ──────────────────────────────────────────────────────────────────

function ItemChip({
  item,
  selected,
  disabled,
  onToggle,
}: {
  item: (typeof ITEMS)[number];
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      role="checkbox"
      aria-checked={selected}
      aria-label={`${item.label}${selected ? " — selected, click to remove" : ""}`}
      disabled={disabled}
      onClick={onToggle}
      className="gdn-pri-chip"
      data-selected={String(selected)}
    >
      {item.label}
    </button>
  );
}

// ── Dimension status row ───────────────────────────────────────────────────────

const STATUS_LABELS: Record<DimensionStatus, string> = {
  represented: "Represented",
  partial: "Partially represented",
  not: "Not represented",
};

const STATUS_COLORS: Record<DimensionStatus, string> = {
  represented: "var(--success)",
  partial: "var(--accent)",
  not: "var(--ink-faint)",
};

const STATUS_ICONS: Record<DimensionStatus, string> = {
  represented: "●",
  partial: "◐",
  not: "○",
};

function DimensionRow({
  dimension,
  status,
  visible,
  index,
  reduced,
}: {
  dimension: (typeof DIMENSIONS)[number];
  status: DimensionStatus;
  visible: boolean;
  index: number;
  reduced: boolean;
}) {
  const delay = `${index * 0.12}s`;
  return (
    <div
      role="listitem"
      aria-label={`${dimension.label}: ${STATUS_LABELS[status]}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.875rem 0",
        borderBottom: "1px solid var(--rule)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: reduced
          ? "none"
          : `opacity 0.4s ease ${delay}, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${delay}`,
      }}
    >
      <div style={{ flex: "0 0 7rem" }}>
        <span className="label" style={{ color: "var(--ink)" }}>
          {dimension.label}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          aria-hidden="true"
          style={{ color: STATUS_COLORS[status], fontSize: "0.875rem" }}
        >
          {STATUS_ICONS[status]}
        </span>
        <span style={{ fontSize: "0.875rem", color: STATUS_COLORS[status] }}>
          {STATUS_LABELS[status]}
        </span>
      </div>
    </div>
  );
}

// ── Completion cue (shared pattern across all interactive experiences) ─────────

function CompletionCue({ visible, reduced }: { visible: boolean; reduced: boolean }) {
  return (
    <div
      aria-live="polite"
      style={{
        marginTop: "1.75rem",
        paddingTop: "1.75rem",
        borderTop: "1px solid var(--rule)",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: reduced
          ? "none"
          : "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span
        className="label"
        style={{ color: "var(--success)", display: "block", marginBottom: "0.625rem" }}
      >
        ✓ Priorities set
      </span>
      <p
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.65,
          color: "var(--ink-soft)",
          maxWidth: "34ch",
          margin: "0 auto",
        }}
      >
        See how we resolved it.
      </p>
      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.375rem",
        }}
      >
        <span className="label label-muted" style={{ fontSize: "0.5625rem" }}>
          Continue reading
        </span>
        <span
          aria-hidden="true"
          style={{
            display: "block",
            fontSize: "1rem",
            color: "var(--ink-faint)",
            animation:
              visible && !reduced
                ? "exp-arrow-bounce 1.8s ease-in-out 0.8s infinite"
                : "none",
          }}
        >
          ↓
        </span>
      </div>
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────

export function GuardianExperience() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("selecting");
  const [selection, setSelection] = useState<ItemId[]>([]);
  const [analysisVisible, setAnalysisVisible] = useState(false);
  const [conclusionVisible, setConclusionVisible] = useState(false);
  const [completionVisible, setCompletionVisible] = useState(false);

  const isFull = selection.length >= MAX_SLOTS;
  const canConfirm = selection.length === MAX_SLOTS;

  const handleToggle = useCallback(
    (id: ItemId) => {
      if (phase !== "selecting") return;
      setSelection((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= MAX_SLOTS) return prev;
        return [...prev, id];
      });
    },
    [phase],
  );

  const handleConfirm = useCallback(() => {
    if (!canConfirm || phase !== "selecting") return;
    setPhase("confirmed");
  }, [canConfirm, phase]);

  // Stagger: dimension rows appear 200ms after confirm
  useEffect(() => {
    if (phase !== "confirmed") return;
    const t = setTimeout(() => setAnalysisVisible(true), reduced ? 0 : 200);
    return () => clearTimeout(t);
  }, [phase, reduced]);

  // Interpretation + conclusion appear after dimension rows settle
  useEffect(() => {
    if (!analysisVisible) return;
    const t = setTimeout(() => setConclusionVisible(true), reduced ? 0 : 600);
    return () => clearTimeout(t);
  }, [analysisVisible, reduced]);

  // Completion cue appears after conclusion settles
  useEffect(() => {
    if (!conclusionVisible) return;
    const t = setTimeout(() => setCompletionVisible(true), reduced ? 0 : 1400);
    return () => clearTimeout(t);
  }, [conclusionVisible, reduced]);

  const interpretation = phase === "confirmed" ? getInterpretation(selection) : null;

  return (
    <section id="interactive-experience" aria-labelledby="gdn-pri-heading" className="mt-20 scroll-mt-20 lg:mt-28">
      <div
        className="full-bleed"
        style={{
          backgroundColor: "var(--band-guardian)",
          paddingTop: "4.5rem",
          paddingBottom: "4.5rem",
        }}
      >
        {/* ── Section header ── */}
        <Container>
          <Rule className="mb-12 lg:mb-14" />
          <div className="mx-auto max-w-[52ch] text-center">
            <Label muted className="mb-3 block">
              Interactive Experience
            </Label>
            <h2
              id="gdn-pri-heading"
              className="display text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]"
            >
              You only have room for a few things.
              <br />
              <em className="italic text-accent">What gets priority?</em>
            </h2>
            <p className="mt-6 leading-relaxed text-ink-soft">
              The navigation had to serve editorial, commercial and user needs at the same
              time. You can&apos;t give everything equal prominence.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              {phase === "selecting"
                ? "Choose 3 items for the primary navigation."
                : "Every reasonable choice came with a trade-off."}
            </p>
          </div>
        </Container>

        {/* ── Interaction area ── */}
        <Container className="mt-10">
          <div className="mx-auto" style={{ maxWidth: "640px" }}>

            {/* Nav slot bar — always visible */}
            <NavSlotBar selection={selection} confirmed={phase === "confirmed"} />

            {/* Available item chips — shown during selection phase */}
            {phase === "selecting" && (
              <div
                className="gdn-pri-chips"
                role="group"
                aria-label="Available navigation items — choose 3"
              >
                {ITEMS.map((item) => (
                  <ItemChip
                    key={item.id}
                    item={item}
                    selected={selection.includes(item.id)}
                    disabled={isFull && !selection.includes(item.id)}
                    onToggle={() => handleToggle(item.id)}
                  />
                ))}
              </div>
            )}

            {/* Selection count hint */}
            {phase === "selecting" && (
              <p
                aria-live="polite"
                aria-atomic="true"
                style={{
                  textAlign: "center",
                  marginTop: "0.875rem",
                  fontSize: "0.625rem",
                  color: "var(--ink-faint)",
                  fontFamily: "var(--font-plex-mono, ui-monospace, monospace)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {selection.length === 0
                  ? "Select 3 items above"
                  : selection.length === MAX_SLOTS
                    ? "Ready to confirm — or change your selection"
                    : `${selection.length} of ${MAX_SLOTS} selected`}
              </p>
            )}

            {/* Confirm button */}
            {phase === "selecting" && (
              <div
                style={{ display: "flex", justifyContent: "center", marginTop: "1.75rem" }}
              >
                <button
                  className="gdn-pri-confirm-btn"
                  onClick={handleConfirm}
                  disabled={!canConfirm}
                  aria-disabled={!canConfirm}
                >
                  Set priorities
                  <span aria-hidden="true" style={{ fontSize: "1rem" }}>
                    →
                  </span>
                </button>
              </div>
            )}

            {/* Trade-off analysis — revealed after confirm */}
            {phase === "confirmed" && (
              <div style={{ marginTop: "2rem" }}>

                {/* Dimension status rows */}
                <div role="list" aria-label="Trade-off analysis" style={{ borderTop: "1px solid var(--rule)" }}>
                  {DIMENSIONS.map((dim, i) => (
                    <DimensionRow
                      key={dim.id}
                      dimension={dim}
                      status={getDimensionStatus(selection, dim.id)}
                      visible={analysisVisible}
                      index={i}
                      reduced={reduced}
                    />
                  ))}
                </div>

                {/* Interpretation sentence */}
                <div
                  aria-live="polite"
                  style={{
                    marginTop: "1.5rem",
                    overflow: "hidden",
                    maxHeight: conclusionVisible ? "100px" : "0",
                    opacity: conclusionVisible ? 1 : 0,
                    transform: conclusionVisible ? "translateY(0)" : "translateY(10px)",
                    transition: reduced
                      ? "none"
                      : "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1)",
                    borderLeft: "2px solid var(--accent)",
                    paddingLeft: "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "var(--ink)",
                      margin: 0,
                      maxWidth: "52ch",
                    }}
                  >
                    {interpretation}
                  </p>
                </div>

                {/* Fixed conclusion + bridge */}
                <div
                  style={{
                    marginTop: "2rem",
                    overflow: "hidden",
                    maxHeight: conclusionVisible ? "320px" : "0",
                    opacity: conclusionVisible ? 1 : 0,
                    transition: reduced
                      ? "none"
                      : "max-height 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s, opacity 0.5s ease 0.1s",
                  }}
                >
                  <p
                    className="display"
                    style={{
                      fontSize: "clamp(1.1rem, 2.2vw, 1.375rem)",
                      lineHeight: 1.45,
                      color: "var(--ink)",
                      margin: "0 0 1.25rem",
                    }}
                  >
                    That was the problem. Every reasonable choice came with a trade-off.
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                      color: "var(--ink-soft)",
                      margin: "0 0 1rem",
                      maxWidth: "56ch",
                    }}
                  >
                    Editorial wanted Guardian journalism front and centre. Commercial needed
                    Premium visibility. Users needed simplicity. Engineering had platform
                    constraints.
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                      color: "var(--ink-soft)",
                      margin: 0,
                      maxWidth: "56ch",
                    }}
                  >
                    So instead of choosing based on internal preference, I created a way for the
                    team to make the decision together.
                  </p>
                </div>
              </div>
            )}

            {/* Completion cue */}
            <CompletionCue visible={completionVisible} reduced={reduced} />
          </div>
        </Container>

        {/* ── Caption ── */}
        <Container className="mt-5">
          <p className="mx-auto max-w-[52ch] text-center text-sm text-ink-muted">
            The same tension — editorial, commercial and user needs competing for the same
            space — shaped every design decision in the navigation redesign.
          </p>
        </Container>
      </div>
    </section>
  );
}
