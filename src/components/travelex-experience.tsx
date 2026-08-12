"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { Container, Label, Rule } from "./primitives";

// ── Types ─────────────────────────────────────────────────────────────────────

type LayerId = "customer" | "partner" | "operational";

// ── Data ──────────────────────────────────────────────────────────────────────

const LAYERS = [
  {
    id: "customer" as LayerId,
    index: "01",
    title: "Customer Journey",
    body: "How customers discover, purchase and receive travel money.",
    reveal:
      "Research exposed customer uncertainty around choosing the right product and building trust — driving destination-based spend guidance and clearer product type selection at the entry point.",
  },
  {
    id: "partner" as LayerId,
    index: "02",
    title: "Partner Journey",
    body: "How Sainsbury's and other white-label partners integrate into the experience.",
    reveal:
      "Sainsbury's validation identified reusable white-label capabilities — branding configuration, promotional flexibility, and account management integration — needed across multiple partners, validating the shared platform model.",
  },
  {
    id: "operational" as LayerId,
    index: "03",
    title: "Operational Journey",
    body: "Compliance, KYC, fulfilment and internal Travelex operations.",
    reveal:
      "Compliance, KYC, fulfilment routing and internal dependencies shaped every experience decision — mapped into the service blueprint from the start, not deferred.",
  },
] as const;

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

// ── Blueprint schematic ────────────────────────────────────────────────────────

function BlueprintSchematic({
  visible,
  activeLayer,
  reduced,
}: {
  visible: boolean;
  activeLayer: LayerId | null;
  reduced: boolean;
}) {
  const rows: { label: string; nodes: number; layerId: LayerId }[] = [
    { label: "Customer", nodes: 6, layerId: "customer" },
    { label: "Partner", nodes: 4, layerId: "partner" },
    { label: "Operations", nodes: 5, layerId: "operational" },
  ];

  const anyActive = activeLayer !== null;

  return (
    <div
      aria-hidden="true"
      style={{
        overflow: "hidden",
        maxHeight: visible ? "160px" : "0",
        opacity: visible ? 1 : 0,
        transition:
          "max-height 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s, opacity 0.55s ease 0.45s",
        borderTop: "1px solid var(--rule)",
        padding: visible ? "1rem 0 0.75rem" : "0",
      }}
    >
      {rows.map((row, ri) => {
        const isRowActive = row.layerId === activeLayer;
        const isRowDimmed = anyActive && !isRowActive;

        return (
          <div
            key={row.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: ri < rows.length - 1 ? "0.75rem" : 0,
              opacity: isRowDimmed ? 0.22 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: "5.5rem",
                fontFamily: "var(--font-plex-mono, ui-monospace, monospace)",
                fontSize: "0.5625rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isRowActive ? "var(--accent)" : "var(--ink-faint)",
                textAlign: "right",
                transition: "color 0.3s ease",
              }}
            >
              {row.label}
            </div>

            <div style={{ flex: 1, position: "relative", height: "18px" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: isRowActive ? "2px" : "1px",
                  background: isRowActive ? "var(--accent)" : "var(--rule)",
                  transform: "translateY(-50%)",
                  transition: "height 0.3s ease, background 0.3s ease",
                  animation:
                    isRowActive && !reduced
                      ? "tx-exp-lane-pulse 2.4s ease-in-out infinite"
                      : "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {Array.from({ length: row.nodes }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      width: isRowActive ? "8px" : ri === 0 ? "7px" : "5px",
                      height: isRowActive ? "8px" : ri === 0 ? "7px" : "5px",
                      borderRadius: "50%",
                      background: isRowActive ? "var(--accent)" : "var(--paper)",
                      border: `1px solid ${
                        isRowActive
                          ? "var(--accent)"
                          : ri === 0
                          ? "var(--rule-strong)"
                          : "var(--rule)"
                      }`,
                      flexShrink: 0,
                      transition:
                        "background 0.3s ease, border-color 0.3s ease, width 0.25s ease, height 0.25s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Journey card ──────────────────────────────────────────────────────────────

function JourneyCard({
  layer,
  connected,
  active,
  anyActive,
  onSelect,
}: {
  layer: (typeof LAYERS)[number];
  connected: boolean;
  active: boolean;
  anyActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className="tx-exp-card"
      data-connected={String(connected)}
      data-active={String(connected && active)}
      data-dimmed={String(connected && anyActive && !active)}
      role={connected ? "button" : undefined}
      tabIndex={connected ? 0 : undefined}
      aria-pressed={connected ? active : undefined}
      onClick={connected ? onSelect : undefined}
      onKeyDown={
        connected
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
    >
      <div
        className="label"
        style={{
          color: connected && active ? "var(--accent)" : "var(--ink-faint)",
          marginBottom: "0.75rem",
          transition: "color 0.3s ease",
          display: "block",
        }}
      >
        {layer.index}
      </div>

      <h3
        className="display"
        style={{
          fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
          color: "var(--ink)",
          marginBottom: "0.625rem",
        }}
      >
        {layer.title}
      </h3>

      <p
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.6,
          color: "var(--ink-soft)",
          margin: 0,
        }}
      >
        {layer.body}
      </p>

      <div
        style={{
          marginTop: "1.25rem",
          fontFamily: "var(--font-plex-mono, ui-monospace, monospace)",
          fontSize: "0.5625rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: connected && active ? "var(--accent)" : "var(--ink-faint)",
          opacity: connected ? 1 : 0,
          transition: "opacity 0.4s ease 0.3s, color 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
        }}
        aria-hidden="true"
      >
        {connected && active ? "Selected" : "Explore"}
        <span style={{ fontSize: "0.75rem" }}>
          {connected && active ? "↑" : "↗"}
        </span>
      </div>
    </div>
  );
}

// ── Layer reveal panel ────────────────────────────────────────────────────────

function RevealPanel({
  layer,
  visible,
}: {
  layer: (typeof LAYERS)[number] | null;
  visible: boolean;
}) {
  return (
    <div
      aria-live="polite"
      style={{
        overflow: "hidden",
        maxHeight: visible && layer ? "300px" : "0",
        opacity: visible && layer ? 1 : 0,
        transition:
          "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
        marginTop: visible && layer ? "1.5rem" : 0,
      }}
    >
      {layer && (
        <div
          style={{
            borderLeft: "2px solid var(--accent)",
            paddingLeft: "1.25rem",
          }}
        >
          <div
            className="label"
            style={{ marginBottom: "0.625rem", display: "block" }}
          >
            {layer.title}
          </div>
          <p
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "var(--ink-soft)",
              maxWidth: "60ch",
              margin: 0,
            }}
          >
            {layer.reveal}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Progress indicator ────────────────────────────────────────────────────────

function ProgressDots({
  total,
  explored,
}: {
  total: number;
  explored: Set<LayerId>;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginTop: "1.25rem",
      }}
      aria-label={`${explored.size} of ${total} layers explored`}
    >
      {LAYERS.map((l) => (
        <div
          key={l.id}
          aria-hidden="true"
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: explored.has(l.id)
              ? "var(--accent)"
              : "var(--rule-strong)",
            transition: "background 0.3s ease",
          }}
        />
      ))}
      <span
        style={{
          fontFamily: "var(--font-plex-mono, ui-monospace, monospace)",
          fontSize: "0.5625rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
          marginLeft: "0.25rem",
        }}
      >
        {explored.size} of {total} explored
      </span>
    </div>
  );
}

// ── Final message ─────────────────────────────────────────────────────────────

function FinalMessage({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: visible ? "240px" : "0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition:
          "max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        borderTop: "1px solid var(--rule)",
        marginTop: "2rem",
        paddingTop: "1.75rem",
      }}
    >
      <p
        className="display"
        style={{
          fontSize: "clamp(1.1rem, 2.2vw, 1.375rem)",
          lineHeight: 1.45,
          color: "var(--ink)",
          maxWidth: "46ch",
          margin: 0,
        }}
      >
        The interface was only one part of the solution. Understanding how every
        journey connected gave the organisation confidence that it was solving
        the right problem before building the platform.
      </p>
    </div>
  );
}

// ── Completion cue (shared pattern) ──────────────────────────────────────────

function ExperienceCompletionCue({
  visible,
  title,
  body,
}: {
  visible: boolean;
  title: string;
  body: string;
}) {
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
        transition:
          "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span
        className="label"
        style={{ color: "var(--success)", display: "block", marginBottom: "0.625rem" }}
      >
        ✓ {title}
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
        {body}
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
        <span
          className="label label-muted"
          style={{ fontSize: "0.5625rem" }}
        >
          Continue reading
        </span>
        <span
          aria-hidden="true"
          style={{
            display: "block",
            fontSize: "1rem",
            color: "var(--ink-faint)",
            animation: visible
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

export function TravelexExperience() {
  const reduced = useReducedMotion();
  const [connecting, setConnecting] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [connected, setConnected] = useState(false);
  const [activeLayer, setActiveLayer] = useState<LayerId | null>(null);
  const [exploredLayers, setExploredLayers] = useState<Set<LayerId>>(
    new Set(),
  );
  const [showFinal, setShowFinal] = useState(false);
  const [completionVisible, setCompletionVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleConnect = useCallback(() => {
    if (reduced) {
      setCollapsed(true);
      setConnected(true);
      return;
    }

    setConnecting(true);

    // 120ms pause — let the button label update settle before any movement
    setTimeout(() => {
      const cardEls = Array.from(
        gridRef.current?.querySelectorAll<HTMLElement>(".tx-exp-card") ?? [],
      );

      if (cardEls.length < 3) {
        // No cards found — skip animation
        setCollapsed(true);
        setConnected(true);
        setConnecting(false);
        return;
      }

      // ── FLIP: First ───────────────────────────────────────────────────────
      // Capture card positions in the 2+1 layout before switching
      const firstRects = cardEls.map((el) => el.getBoundingClientRect());

      // ── FLIP: Switch + Last ───────────────────────────────────────────────
      // flushSync forces React to commit the new 3-col grid to DOM synchronously.
      // This lets us read Last positions in the same tick — no rAF needed.
      flushSync(() => setCollapsed(true));

      const lastRects = cardEls.map((el) => el.getBoundingClientRect());

      // ── FLIP: Invert ──────────────────────────────────────────────────────
      // Compute transforms that visually snap each card back to its old position
      const inverts = firstRects.map((first, i) => {
        const last = lastRects[i];
        return {
          dx: Math.round(first.left - last.left),
          dy: Math.round(first.top - last.top),
        };
      });

      // Apply inverted transforms — no transition (instant visual hold)
      cardEls.forEach((el, i) => {
        const { dx, dy } = inverts[i];
        if (dx !== 0 || dy !== 0) {
          el.style.transform = `translate(${dx}px,${dy}px)`;
          el.style.transition = "none";
        }
      });

      // Force a style flush so the browser commits the inverted positions
      // before we switch the transitions on
      void cardEls[0].getBoundingClientRect();

      // ── FLIP: Play ────────────────────────────────────────────────────────
      // Card 2 (Operational, formerly the lower card) leads — 0ms delay.
      // Cards 0 and 1 follow 100ms later: "lower card rises first" read.
      const delays = ["100ms", "100ms", "0ms"];
      cardEls.forEach((el, i) => {
        const { dx, dy } = inverts[i];
        if (dx !== 0 || dy !== 0) {
          el.style.willChange = "transform";
          el.style.transition = [
            `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delays[i]}`,
            "border-color 0.3s ease",
            "opacity 0.3s ease",
            "box-shadow 0.3s ease",
          ].join(", ");
          el.style.transform = "";
        }
      });

      // After the longest card animation (100ms delay + 550ms duration = 650ms),
      // mark the state as connected and clear the inline styles.
      setTimeout(() => {
        setConnected(true);
        setConnecting(false);
        cardEls.forEach((el) => {
          el.style.transform = "";
          el.style.transition = "";
          el.style.willChange = "";
        });
      }, 720);
    }, 120);
  }, [reduced]);

  const handleSelectLayer = useCallback((id: LayerId) => {
    setActiveLayer(id);
    setExploredLayers((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    if (exploredLayers.size === LAYERS.length && !showFinal) {
      const t = setTimeout(() => setShowFinal(true), 700);
      return () => clearTimeout(t);
    }
  }, [exploredLayers.size, showFinal]);

  useEffect(() => {
    if (!showFinal) return;
    const t = setTimeout(
      () => setCompletionVisible(true),
      reduced ? 600 : 3200,
    );
    return () => clearTimeout(t);
  }, [showFinal, reduced]);

  const activeLayerData = LAYERS.find((l) => l.id === activeLayer) ?? null;

  return (
    <section id="interactive-experience" aria-labelledby="tx-exp-heading" className="mt-20 scroll-mt-20 lg:mt-28">
      {/* Full-width soft blue-grey band wrapping the entire experience */}
      <div
        className="full-bleed"
        style={{
          backgroundColor: "var(--band-travelex)",
          paddingTop: "4.5rem",
          paddingBottom: "4.5rem",
        }}
      >
        {/* ── Section header ── */}
        <Container>
          <Rule className="mb-12 lg:mb-14" />
          <div className="mx-auto max-w-[52ch] text-center">
            <Label muted className="mb-3 block">Interactive Experience</Label>
            <h2
              id="tx-exp-heading"
              className="display text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]"
            >
              You&apos;ve seen the blueprint.
              <br />
              <em className="italic text-accent">Now explore each layer.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-ink-soft">
              The service blueprint mapped three journeys side by side —
              customer, partner, and operational. Select each layer to see
              what the research revealed.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Takes around 45 seconds to explore all three.
            </p>
          </div>
        </Container>

        {/* ── Cards + blueprint ── */}
        <Container className="mt-10">
          <div
            ref={gridRef}
            className="tx-exp-grid"
            data-collapsed={String(collapsed)}
            role="group"
            aria-label="Three journey layers"
          >
            {LAYERS.map((layer) => (
              <JourneyCard
                key={layer.id}
                layer={layer}
                connected={connected}
                active={activeLayer === layer.id}
                anyActive={activeLayer !== null}
                onSelect={() => handleSelectLayer(layer.id)}
              />
            ))}
          </div>

          <BlueprintSchematic
            visible={connected}
            activeLayer={activeLayer}
            reduced={reduced}
          />

          {/* Connect CTA — hides when the layout collapses */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
              overflow: "hidden",
              maxHeight: collapsed ? "0" : "80px",
              opacity: collapsed ? 0 : 1,
              transition: "max-height 0.4s ease 0.2s, opacity 0.25s ease",
            }}
            aria-hidden={collapsed}
          >
            <button
              className="tx-exp-connect-btn"
              onClick={handleConnect}
              disabled={connecting || collapsed}
              aria-label="Connect the three journeys into the service blueprint"
            >
              {connecting ? "Connecting…" : "Connect the journeys"}
              {!connecting && (
                <span aria-hidden="true" style={{ fontSize: "1rem" }}>
                  →
                </span>
              )}
            </button>
          </div>

          {/* Layer interaction area — appears once connected */}
          {connected && (
            <div style={{ marginTop: "1rem" }}>
              {activeLayer === null && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginTop: "1.75rem",
                  }}
                  aria-live="polite"
                >
                  <span
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "var(--rule)",
                      display: "block",
                    }}
                    aria-hidden="true"
                  />
                  <p
                    style={{
                      fontFamily:
                        "var(--font-plex-mono, ui-monospace, monospace)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Select a layer to explore it
                  </p>
                  <span
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "var(--rule)",
                      display: "block",
                    }}
                    aria-hidden="true"
                  />
                </div>
              )}

              <RevealPanel
                layer={activeLayerData}
                visible={activeLayer !== null}
              />

              {exploredLayers.size > 0 && (
                <ProgressDots
                  total={LAYERS.length}
                  explored={exploredLayers}
                />
              )}
            </div>
          )}

          <FinalMessage visible={showFinal} />

          <ExperienceCompletionCue
            visible={completionVisible}
            title="Journeys connected"
            body="See how these decisions became the platform."
          />
        </Container>

        {/* ── Caption ── */}
        <Container className="mt-5">
          <p className="mx-auto max-w-[52ch] text-center text-sm text-ink-muted">
            Each card represents one layer of the B2B2C service blueprint — the
            document that gave the programme a shared model before a single
            screen was designed.
          </p>
        </Container>
      </div>
    </section>
  );
}
