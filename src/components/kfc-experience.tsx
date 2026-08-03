"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Container, Label, Rule } from "./primitives";

/* ─── Design tokens — KFC Rewards app palette ───────────────── */
const T = {
  brand:      "#e4002b",
  brandDark:  "#a8102a",
  ink:        "#141414",
  white:      "#ffffff",
  surfaceAlt: "#f7f7f7",
  line:       "#e0e0e0",
  muted:      "#6e6e6e",
  locked:     "#bdbdbd",
} as const;

const DISPLAY = "var(--font-anton, 'Arial Narrow Bold', sans-serif)";
const SANS    = "var(--font-inter, ui-sans-serif, system-ui, sans-serif)";

/* ─── Outcome config ─────────────────────────────────────────── */
type Path = "redeem" | "save" | "share";

const STEPS: Record<Path, string[]> = {
  redeem: [
    "Customer claims reward",
    "Reward redeemed at checkout",
    "Journey ends",
  ],
  save: [
    "Reward saved to wallet",
    "Customer leaves app",
    "Reward remains available",
  ],
  share: [
    "Customer wins reward",
    "Shares reward",
    "Friend receives reward",
    "Friend downloads KFC Rewards",
    "Friend redeems reward",
    "Both customers return",
    "Future rewards continue",
  ],
};

/* Step index at which the network-effect cards appear */
const NETWORK_TRIGGER = 2;

const COPY: Record<Path, { body: string; insight: string }> = {
  redeem: {
    body: "Redeeming creates an immediate reward for the customer, but the experience finishes after a single transaction.",
    insight: "This is the behaviour most loyalty programmes optimise for.",
  },
  save: {
    body: "Saving the reward extends the opportunity but doesn't create additional engagement.",
    insight: "Delaying redemption preserves value but doesn't strengthen the wider loyalty ecosystem.",
  },
  share: {
    body: "Reward Sharing transformed one reward into customer acquisition, stronger engagement and repeat participation.",
    insight: "One reward created two active participants in the loyalty programme.",
  },
};

const LOOP_NODES = [
  "Customer",
  "Wins Reward",
  "Shares Reward",
  "Friend Joins",
  "Both Redeem",
  "Both Return",
  "Customer Wins Again",
];

/* ─── Reduced-motion hook ────────────────────────────────────── */
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

/* ─── SVG components ─────────────────────────────────────────── */

function BucketSVG({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" style={style} aria-hidden="true">
      <defs>
        <clipPath id="kfc-exp-bc">
          <path d="M13 20h38l-5 34a4 4 0 0 1-4 3.4H22a4 4 0 0 1-4-3.4z" />
        </clipPath>
      </defs>
      <path d="M13 20h38l-5 34a4 4 0 0 1-4 3.4H22a4 4 0 0 1-4-3.4z"
        fill={T.white} stroke={T.ink} strokeWidth="2.4" strokeLinejoin="round" />
      <g clipPath="url(#kfc-exp-bc)">
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={17 + i * 9} y={20} width={4.5} height={38} fill={T.brand} />
        ))}
      </g>
      <path d="M13 20h38l-5 34a4 4 0 0 1-4 3.4H22a4 4 0 0 1-4-3.4z"
        fill="none" stroke={T.ink} strokeWidth="2.4" strokeLinejoin="round" />
      <rect x="10" y="13" width="44" height="8" rx="1.5"
        fill={T.brand} stroke={T.ink} strokeWidth="2.4" />
    </svg>
  );
}

function BurgerSVG({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" style={style} aria-hidden="true">
      <path d="M14 27c0-9 8-14 18-14s18 5 18 14z"
        fill={T.brand} stroke={T.ink} strokeWidth="2.4" strokeLinejoin="round" />
      <g fill={T.white} stroke={T.ink} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M13 27h38v6H13z" />
        <path d="M14 40h36c0 7-8 11-18 11s-18-4-18-11z" />
      </g>
      <path d="M13 33h38v7H13z"
        fill={T.brand} stroke={T.ink} strokeWidth="2.4" strokeLinejoin="round" />
      <g fill={T.white}>
        <circle cx="25" cy="20" r="1.5" />
        <circle cx="33" cy="18" r="1.5" />
        <circle cx="40" cy="21" r="1.5" />
      </g>
    </svg>
  );
}

/* ─── Phone chrome ───────────────────────────────────────────── */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 390,
      margin: "0 auto",
      borderRadius: 44,
      border: "3px solid #1c1c1c",
      backgroundColor: "#0d0d0d",
      overflow: "hidden",
      boxShadow:
        "0 40px 80px -20px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.06)",
    }}>
      {/* Dynamic island */}
      <div style={{
        height: 44,
        backgroundColor: "#0d0d0d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: 120, height: 22, borderRadius: 14,
          backgroundColor: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.05)",
        }} />
      </div>
      {/* Screen */}
      <div style={{
        backgroundColor: T.white,
        display: "flex",
        flexDirection: "column",
        borderRadius: "0 0 40px 40px",
        minHeight: 560,
        overflow: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}

function AppBar({ title }: { title: string }) {
  return (
    <div style={{
      backgroundColor: T.brand,
      color: T.white,
      height: 52,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 16,
      paddingRight: 16,
    }}>
      <span style={{
        fontFamily: DISPLAY,
        fontSize: 15,
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}>
        {title}
      </span>
    </div>
  );
}

/* ─── Stage 1 — Intro ───────────────────────────────────────── */

function StageIntro({ onTap, reduced }: { onTap: () => void; reduced: boolean }) {
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      backgroundColor: T.white,
      gap: 0,
    }}>
      <span style={{
        fontFamily: DISPLAY,
        fontSize: 11,
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: T.muted,
        marginBottom: 36,
      }}>
        Rewards Arcade
      </span>

      <button
        onClick={onTap}
        aria-label="Tap to spin the bucket and reveal your reward"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          position: "relative",
          width: 148,
          height: 148,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        {!reduced && (
          <>
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `1.5px solid ${T.brand}`,
              animation: "kfc-exp-pulse 2.2s ease-out infinite",
            }} />
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `1.5px solid ${T.brand}`,
              animation: "kfc-exp-pulse 2.2s ease-out 0.75s infinite",
            }} />
          </>
        )}
        <BucketSVG style={{
          width: 88,
          height: 88,
          animation: reduced ? "none" : "kfc-exp-idle 3.5s ease-in-out infinite",
        }} />
      </button>

      <span style={{
        fontFamily: DISPLAY,
        fontSize: 13,
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: T.brand,
        marginTop: 32,
      }}>
        Tap to spin
      </span>
    </div>
  );
}

/* ─── Stage 2 — Spinning ────────────────────────────────────── */

function StageSpinning({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 950);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: T.white,
    }}>
      <BucketSVG style={{
        width: 88,
        height: 88,
        animation: "kfc-exp-spin 0.9s cubic-bezier(0.2, 0, 0.4, 1) forwards",
      }} />
    </div>
  );
}

/* ─── Stage 3 — Won + Decision ──────────────────────────────── */

function StageRevealed({
  onChoose,
  reduced,
}: {
  onChoose: (p: Path) => void;
  reduced: boolean;
}) {
  const [showDecision, setShowDecision] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setShowDecision(true), 1100);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: T.white,
      overflowY: "auto",
    }}>
      {/* Reward reveal */}
      <div style={{
        padding: "28px 20px 20px",
        animation: reduced ? "none" : "kfc-exp-rise 0.55s cubic-bezier(0.16,1,0.3,1) both",
      }}>
        <p style={{
          textAlign: "center",
          fontFamily: SANS,
          fontSize: 13,
          color: T.muted,
          marginBottom: 6,
        }}>
          🎉 Congratulations! You&apos;ve won
        </p>

        <div style={{
          backgroundColor: T.surfaceAlt,
          borderRadius: 12,
          padding: "16px",
          border: `1px solid ${T.line}`,
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 10,
            backgroundColor: T.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: `1px solid ${T.line}`,
          }}>
            <BurgerSVG style={{ width: 44, height: 44 }} />
          </div>
          <div>
            <p style={{
              fontFamily: DISPLAY,
              fontSize: 16,
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              color: T.ink,
              lineHeight: 1.15,
              margin: 0,
            }}>
              Free Mini Fillet Burger
            </p>
            <p style={{
              fontFamily: SANS,
              fontSize: 12,
              color: T.brand,
              fontWeight: 600,
              marginTop: 5,
              marginBottom: 0,
            }}>
              Ready to redeem · 180 days
            </p>
          </div>
        </div>
      </div>

      {/* Decision */}
      <div style={{
        padding: "0 20px 28px",
        opacity: showDecision ? 1 : 0,
        transform: showDecision ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <p style={{
          fontFamily: DISPLAY,
          fontSize: 13,
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: T.ink,
          textAlign: "center",
          marginBottom: 14,
          marginTop: 0,
        }}>
          What would you like to do?
        </p>

        <div
          role="group"
          aria-label="Choose what to do with your reward"
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          {([
            { id: "redeem" as Path, label: "Redeem Now" },
            { id: "share" as Path,  label: "Share with a Friend" },
            { id: "save" as Path,   label: "Save for Later" },
          ]).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onChoose(id)}
              className="kfc-exp-choice-btn"
              style={{
                width: "100%",
                height: 52,
                borderRadius: 9999,
                border: `2px solid ${T.line}`,
                backgroundColor: T.white,
                fontFamily: SANS,
                fontWeight: 600,
                fontSize: 15,
                color: T.ink,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Compact customer card (network-effect visual) ─────────── */

function CustomerCard({
  name,
  stamps,
  rewardLabel,
  visible,
  delay = 0,
}: {
  name: string;
  stamps: number;
  rewardLabel: string;
  visible: boolean;
  delay?: number;
}) {
  return (
    <div
      aria-label={`${name}'s loyalty account — ${rewardLabel}`}
      style={{
        flex: 1,
        backgroundColor: T.surfaceAlt,
        borderRadius: 8,
        padding: "9px 10px",
        border: `1px solid ${T.line}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
    >
      {/* Avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <div style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: T.line,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <circle cx="6.5" cy="4.5" r="2.3" fill={T.muted} />
            <path d="M1 12.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke={T.muted} strokeWidth="1.1" />
          </svg>
        </div>
        <span style={{
          fontFamily: DISPLAY,
          fontSize: 11,
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: T.ink,
        }}>
          {name}
        </span>
      </div>

      {/* Stamp rail */}
      <div style={{ display: "flex", gap: 2, marginBottom: 7 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{
            flex: 1,
            height: 5,
            borderRadius: 3,
            backgroundColor: i < stamps ? T.brand : T.line,
          }} />
        ))}
      </div>

      {/* Reward */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <BurgerSVG style={{ width: 15, height: 15, flexShrink: 0 }} />
        <span style={{
          fontFamily: SANS,
          fontSize: 10,
          color: T.muted,
          lineHeight: 1.3,
        }}>
          {rewardLabel}
        </span>
      </div>
    </div>
  );
}

/* ─── Flow step (timeline style) ─────────────────────────────── */

function FlowStep({
  label,
  active,
  isLast,
}: {
  label: string;
  active: boolean;
  isLast: boolean;
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      opacity: active ? 1 : 0,
      transform: active ? "translateX(0)" : "translateX(-8px)",
      transition: "opacity 0.35s ease, transform 0.35s ease",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 3 }}>
        <div style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: active ? T.brand : T.line,
          transition: "background-color 0.3s ease",
          flexShrink: 0,
        }} />
        {!isLast && (
          <div style={{
            width: 1,
            flex: 1,
            minHeight: 14,
            backgroundColor: active ? T.brand : T.line,
            marginTop: 3,
            transition: "background-color 0.3s ease 0.15s",
          }} />
        )}
      </div>
      <span style={{
        fontFamily: SANS,
        fontSize: 12,
        color: active ? T.ink : T.locked,
        lineHeight: 1.35,
        paddingBottom: isLast ? 0 : 12,
        transition: "color 0.3s ease",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Stage 4 — Outcome ─────────────────────────────────────── */

function StageOutcome({
  path,
  reduced,
  onSeeThinking,
}: {
  path: Path;
  reduced: boolean;
  onSeeThinking: () => void;
}) {
  const steps = STEPS[path];
  const [stepIndex, setStepIndex] = useState(reduced ? steps.length - 1 : -1);
  const [showInsight, setShowInsight] = useState(reduced);
  const [showCta, setShowCta] = useState(reduced);

  useEffect(() => {
    if (reduced) return;

    let current = 0;
    setStepIndex(0);

    const id = setInterval(() => {
      current += 1;
      setStepIndex(current);
      if (current >= steps.length - 1) {
        clearInterval(id);
        setTimeout(() => setShowInsight(true), 700);
        setTimeout(() => setShowCta(true), 1500);
      }
    }, 850);

    return () => clearInterval(id);
  }, [path, reduced, steps.length]);

  const showFriend = path === "share" && stepIndex >= NETWORK_TRIGGER;

  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: T.white,
      overflowY: "auto",
      padding: "20px 20px 28px",
    }}>

      {/* Network-effect cards (share path only) */}
      {path === "share" && (
        <div style={{ marginBottom: 16 }}>
          <p style={{
            fontFamily: DISPLAY,
            fontSize: 10,
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: T.muted,
            marginBottom: 8,
            marginTop: 0,
          }}>
            Active accounts
          </p>
          <div
            aria-label="Active loyalty accounts"
            style={{ display: "flex", gap: 8 }}
          >
            <CustomerCard
              name="You"
              stamps={5}
              rewardLabel={showFriend ? "Mini Fillet · Shared ✓" : "Mini Fillet · Won"}
              visible={true}
            />
            <CustomerCard
              name="Friend"
              stamps={1}
              rewardLabel="Mini Fillet · Received"
              visible={showFriend}
              delay={80}
            />
          </div>
        </div>
      )}

      {/* Flow timeline */}
      <div
        role="list"
        aria-label={`${path === "share" ? "Sharing" : path === "redeem" ? "Redeem" : "Save"} journey`}
        aria-live="polite"
        style={{ marginBottom: 16 }}
      >
        {steps.map((label, i) => (
          <div key={i} role="listitem">
            <FlowStep
              label={label}
              active={i <= stepIndex}
              isLast={i === steps.length - 1}
            />
          </div>
        ))}
      </div>

      {/* Insight */}
      <div style={{
        opacity: showInsight ? 1 : 0,
        transform: showInsight ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}>
        <div style={{
          backgroundColor: T.surfaceAlt,
          borderRadius: 8,
          padding: "12px 14px",
          border: `1px solid ${T.line}`,
          marginBottom: 10,
        }}>
          <p style={{
            fontFamily: SANS,
            fontSize: 12,
            color: T.muted,
            lineHeight: 1.55,
            margin: 0,
          }}>
            {COPY[path].body}
          </p>
        </div>

        <div style={{
          borderLeft: `2px solid ${T.brand}`,
          paddingLeft: 10,
          marginBottom: 18,
        }}>
          <p style={{
            fontFamily: DISPLAY,
            fontSize: 11,
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: T.muted,
            margin: "0 0 2px",
          }}>
            Product Insight
          </p>
          <p style={{
            fontFamily: SANS,
            fontSize: 12,
            color: T.ink,
            lineHeight: 1.5,
            margin: 0,
          }}>
            {COPY[path].insight}
          </p>
        </div>

        {/* CTA — reveals design thinking */}
        {showCta && (
          <button
            onClick={onSeeThinking}
            style={{
              width: "100%",
              height: 50,
              borderRadius: 9999,
              backgroundColor: T.brand,
              color: T.white,
              border: "none",
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              animation: "kfc-exp-fade-up 0.4s ease both",
            }}
          >
            See the design thinking
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Behaviour loop (Stage 5 — editorial section) ───────────── */

function BehaviourLoop({ visible, reduced }: { visible: boolean; reduced: boolean }) {
  const [nodeCount, setNodeCount] = useState(reduced ? LOOP_NODES.length : 0);
  const [showArrow, setShowArrow] = useState(reduced);

  useEffect(() => {
    if (!visible || reduced) return;

    let i = 0;
    const advance = () => {
      i++;
      setNodeCount(i);
      if (i < LOOP_NODES.length) {
        setTimeout(advance, 200);
      } else {
        setTimeout(() => setShowArrow(true), 500);
      }
    };
    const t = setTimeout(advance, 250);
    return () => clearTimeout(t);
  }, [visible, reduced]);

  /* Fixed node height + gap for SVG return-arrow sizing */
  const NODE_H = 36;
  const GAP    = 8;
  const totalH = LOOP_NODES.length * NODE_H + (LOOP_NODES.length - 1) * GAP;
  const arrowW = 36;

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {/* Nodes + down-arrows */}
      <div
        role="list"
        aria-label="Behaviour loop: Customer wins reward, shares, friend joins, both redeem, both return, cycle repeats"
        style={{ display: "flex", flexDirection: "column", gap: GAP }}
      >
        {LOOP_NODES.map((node, i) => (
          <div
            key={node}
            role="listitem"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0,
            }}
          >
            <div style={{
              height: NODE_H,
              display: "flex",
              alignItems: "center",
              opacity: i < nodeCount ? 1 : 0,
              transform: i < nodeCount ? "scale(1)" : "scale(0.9)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}>
              <div style={{
                fontFamily: SANS,
                fontWeight: i === 0 || i === LOOP_NODES.length - 1 ? 700 : 400,
                fontSize: 15,
                color: i === 0 || i === LOOP_NODES.length - 1
                  ? "var(--ink)"
                  : "var(--ink-soft)",
                letterSpacing: "-0.01em",
              }}>
                {node}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Return arrow SVG — curves from last node back to first */}
      <svg
        aria-hidden="true"
        width={arrowW}
        height={totalH}
        viewBox={`0 0 ${arrowW} ${totalH}`}
        style={{
          position: "absolute",
          right: -(arrowW + 4),
          top: 0,
          overflow: "visible",
          opacity: showArrow ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Curved path: from bottom-left → right → back to top-left */}
        <path
          d={`M 0 ${totalH - NODE_H / 2} C ${arrowW} ${totalH - NODE_H / 2}, ${arrowW} ${NODE_H / 2}, 0 ${NODE_H / 2}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="300"
          strokeDashoffset={showArrow ? 0 : 300}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1)" }}
        />
        {/* Arrowhead pointing down into first node */}
        <path
          d={`M -4 ${NODE_H / 2 + 6} L 0 ${NODE_H / 2} L 4 ${NODE_H / 2 + 6}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={showArrow ? 1 : 0}
          style={{ transition: "opacity 0.3s ease 1s" }}
        />
      </svg>
    </div>
  );
}

/* ─── Stage 5 — Reflection (editorial section) ───────────────── */

function ReflectionSection({ visible, reduced }: { visible: boolean; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(reduced);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setContentVisible(true);
      if (!reduced) {
        setTimeout(() => {
          ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    }, 50);
    return () => clearTimeout(t);
  }, [visible, reduced]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      style={{
        opacity: contentVisible ? 1 : 0,
        transform: contentVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <Container className="mt-20 lg:mt-28">
        <Rule className="mb-12" />

        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[10rem_minmax(0,1fr)]">
          <div className="lg:pt-2">
            <Label>Design thinking</Label>
          </div>

          <div>
            <h2 className="display max-w-[24ch] text-balance text-3xl sm:text-4xl">
              Why Reward Sharing mattered
            </h2>
            <div className="prose-case mt-6">
              <p>
                Reward Sharing wasn&apos;t designed simply to give customers free food.
                It transformed every reward into an opportunity for customer acquisition,
                stronger engagement and repeat visits.
              </p>
              <p>
                By introducing a social behaviour loop, one reward created value for
                both the customer and the business.
              </p>
            </div>

            {/* Behaviour loop */}
            <div className="mt-12">
              <Label muted className="mb-6 block">Behaviour loop</Label>
              <BehaviourLoop visible={contentVisible} reduced={reduced} />
            </div>

            {/* Final quote */}
            <div
              className="mt-16"
              style={{
                borderLeft: "2px solid var(--rule-strong)",
                paddingLeft: 20,
              }}
            >
              <p
                className="display text-balance text-xl sm:text-2xl"
                style={{ maxWidth: "26ch" }}
              >
                Great behavioural design changes what people do <em className="italic text-accent">after</em> they achieve their goal.
              </p>
            </div>

            <div className="prose-case mt-6">
              <p>
                Winning the reward wasn&apos;t the experience. The experience was
                encouraging customers to share it — creating a repeatable growth loop
                that strengthened engagement, acquisition and long-term loyalty.
              </p>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}

/* ─── Root export ────────────────────────────────────────────── */

type Stage = "intro" | "spinning" | "revealed" | "outcome" | "reflection";

export function KfcExperience() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>("intro");
  const [path, setPath] = useState<Path | null>(null);
  const [showReflection, setShowReflection] = useState(false);

  const appTitle =
    stage === "intro" || stage === "spinning" || stage === "revealed"
      ? "Rewards Arcade"
      : "Reward Sharing";

  const handleTap = useCallback(() => {
    if (reduced) {
      setStage("revealed");
    } else {
      setStage("spinning");
    }
  }, [reduced]);

  const handleSpinDone = useCallback(() => setStage("revealed"), []);

  const handleChoose = useCallback((p: Path) => {
    setPath(p);
    setStage("outcome");
  }, []);

  const handleSeeThinking = useCallback(() => {
    setShowReflection(true);
  }, []);

  return (
    <section aria-labelledby="kfc-exp-heading" className="mt-20 lg:mt-28">
      {/* Cinematic chapter transition */}
      <Container>
        <Rule className="mb-14 lg:mb-16" />
        <div className="mx-auto max-w-[52ch] text-center">
          <Label muted className="mb-6 block">Experience</Label>
          <h2
            id="kfc-exp-heading"
            className="display text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]"
          >
            You&apos;ve seen how it was designed.
            <br />
            <em className="italic text-accent">Now experience it.</em>
          </h2>
          <p className="mt-6 leading-relaxed text-ink-soft">
            Rather than simply reading about Reward Sharing, step inside the
            product and experience the behavioural journey that inspired the
            feature.
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            This takes around 20 seconds.
          </p>
        </div>
      </Container>

      {/* Phone section — dark background */}
      <div
        className="full-bleed mt-10"
        style={{
          backgroundColor: "#0e0e0e",
          padding: "52px 24px 56px",
        }}
      >
        <PhoneFrame>
          <AppBar title={appTitle} />

          {stage === "intro" && (
            <StageIntro onTap={handleTap} reduced={reduced} />
          )}
          {stage === "spinning" && (
            <StageSpinning onDone={handleSpinDone} />
          )}
          {stage === "revealed" && (
            <StageRevealed onChoose={handleChoose} reduced={reduced} />
          )}
          {stage === "outcome" && path && (
            <StageOutcome
              path={path}
              reduced={reduced}
              onSeeThinking={handleSeeThinking}
            />
          )}
        </PhoneFrame>
      </div>

      {/* Reflection — appears after user requests it */}
      <ReflectionSection visible={showReflection} reduced={reduced} />
    </section>
  );
}
