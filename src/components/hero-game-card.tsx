"use client";

import { useState, useCallback } from "react";
import { HeroFlowchart } from "./hero-flowchart";
import { SnakeGame } from "./snake-game";

export function HeroGameCard() {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setButtonVisible(true);
  }, []);

  const handleFlip = useCallback(() => {
    setFlipped(true);
  }, []);

  const handleFlipBack = useCallback(() => {
    setFlipped(false);
    setIsDead(false);
  }, []);

  return (
    <div>
      {/* ── Flip card ── */}
      <div style={{ perspective: "1400px" }}>
        <div
          className={[isDead ? "snake-flip-dead" : "", flipped ? "snake-flip-active" : ""].filter(Boolean).join(" ")}
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), min-height 0.4s ease",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front: flowchart */}
          <div
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            className="overflow-hidden border border-rule fc-canvas-wrap"
          >
            <HeroFlowchart onComplete={handleAnimationComplete} />
          </div>

          {/* Back: snake game — overflow-hidden removed; canvas layer handles its own clip */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="border fc-canvas-wrap"
            data-theme="dark"
          >
            <SnakeGame active={flipped} onDead={() => setIsDead(true)} />
            <button
              onClick={handleFlipBack}
              aria-label="Back to diagram"
              style={{
                position: "absolute",
                top: 10, right: 10,
                fontFamily: "var(--font-plex-mono),'IBM Plex Mono',monospace",
                fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                background: "transparent", border: "none",
                cursor: "pointer", padding: "4px 8px",
              }}
            >
              ← exit
            </button>
          </div>
        </div>
      </div>

      {/* ── Play button — below the box, fades in after animation ── */}
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "center",
          opacity: buttonVisible && !flipped ? 1 : 0,
          transform: buttonVisible && !flipped ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          pointerEvents: buttonVisible && !flipped ? "auto" : "none",
        }}
      >
        <PlaySnakesButton onClick={handleFlip} />
      </div>
    </div>
  );
}

function PlaySnakesButton({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-plex-mono),'IBM Plex Mono',monospace",
        fontSize: "10px",
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: hov ? "var(--accent)" : "var(--ink-muted)",
        background: "var(--paper-raised)",
        border: `1px solid ${hov ? "var(--accent)" : "var(--rule)"}`,
        padding: "8px 20px",
        cursor: "pointer",
        transition: "color 0.2s, border-color 0.2s",
      }}
    >
      <DiamondIcon hov={hov} />
      Play Snakes
    </button>
  );
}

function DiamondIcon({ hov }: { hov: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect
        x="1.5" y="1.5" width="9" height="9"
        transform="rotate(45 6 6)"
        fill="none"
        stroke={hov ? "var(--accent)" : "var(--ink-faint)"}
        strokeWidth="1.2"
      />
    </svg>
  );
}
