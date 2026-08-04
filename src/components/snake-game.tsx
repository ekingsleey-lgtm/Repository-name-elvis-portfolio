"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const CELL = 26;
const SPEED_INIT = 145;
const SPEED_MIN = 62;

type Pt = { x: number; y: number };
type Dir = 0 | 1 | 2 | 3; // UP RIGHT DOWN LEFT
const STEP: Pt[] = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
const OPP = [2, 3, 0, 1] as const;

interface GS {
  snake: Pt[];
  dir: Dir;
  queued: Dir | null;
  food: Pt;
  score: number;
  speed: number;
  cols: number;
  rows: number;
}

// Portfolio colour tokens — read from CSS vars at draw time so the game
// responds to light/dark mode without any extra wiring.
interface Colors {
  paper: string;
  paperRaised: string;
  ink: string;
  inkSoft: string;
  inkMuted: string;
  inkFaint: string;
  rule: string;
  accent: string;
}

function readColors(): Colors {
  const s = getComputedStyle(document.documentElement);
  const v = (n: string) => s.getPropertyValue(n).trim();
  return {
    paper: v("--paper"),
    paperRaised: v("--paper-raised"),
    ink: v("--ink"),
    inkSoft: v("--ink-soft"),
    inkMuted: v("--ink-muted"),
    inkFaint: v("--ink-faint"),
    rule: v("--rule"),
    accent: v("--accent"),
  };
}

// ── Game state helpers ───────────────────────────────────────────────────────

function spawnFood(cols: number, rows: number, snake: Pt[]): Pt {
  let p: Pt;
  do {
    p = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

function initGS(cols: number, rows: number): GS {
  const mid = Math.floor(rows / 2);
  const snake: Pt[] = [{ x: 5, y: mid }, { x: 4, y: mid }, { x: 3, y: mid }];
  return { snake, dir: 1, queued: null, food: spawnFood(cols, rows, snake), score: 0, speed: SPEED_INIT, cols, rows };
}

// ── Drawing ──────────────────────────────────────────────────────────────────

function drawBg(ctx: CanvasRenderingContext2D, w: number, h: number, colors: Colors) {
  ctx.fillStyle = colors.paper;
  ctx.fillRect(0, 0, w, h);
  // Hairline grid in the rule colour — matches the editorial borders throughout
  ctx.strokeStyle = colors.rule;
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= w; x += CELL) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y <= h; y += CELL) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
}

function drawSegment(ctx: CanvasRenderingContext2D, p: Pt, isHead: boolean, colors: Colors) {
  const m = 2;
  const x = p.x * CELL + m;
  const y = p.y * CELL + m;
  const size = CELL - m * 2;

  // Head uses accent; body uses ink so it adapts cleanly in light and dark mode
  ctx.fillStyle = isHead ? colors.accent : colors.inkSoft;
  ctx.strokeStyle = colors.rule;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, size, size, isHead ? 7 : 5);
  ctx.fill();
  ctx.stroke();
}

// Decision-point diamond — mint gradient unchanged per the brief
function drawDiamond(ctx: CanvasRenderingContext2D, p: Pt) {
  const cx = p.x * CELL + CELL / 2;
  const cy = p.y * CELL + CELL / 2;
  const half = (CELL - 5) / 2;
  const s = half * Math.SQRT2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI / 4);

  const g = ctx.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(231,244,235,0.96)");
  g.addColorStop(0.55, "rgba(185,216,198,0.88)");
  g.addColorStop(1, "rgba(139,182,162,0.84)");

  ctx.fillStyle = g;
  ctx.strokeStyle = "rgba(255,255,255,0.88)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.rect(-s / 2, -s / 2, s, s);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 0.75;
  ctx.beginPath();
  ctx.rect(-s / 2 + 2, -s / 2 + 2, s - 4, s - 4);
  ctx.stroke();

  ctx.restore();

  ctx.fillStyle = "#4c7b66";
  ctx.font = `bold ${Math.max(9, Math.round(CELL * 0.46))}px Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("?", cx, cy + 1);
}

function drawScore(ctx: CanvasRenderingContext2D, score: number, colors: Colors) {
  const label = `SCORE  ${String(score).padStart(3, "0")}`;
  ctx.save();
  ctx.fillStyle = colors.paperRaised;
  ctx.beginPath();
  ctx.roundRect(10, 10, 108, 26, 4);
  ctx.fill();
  // Hairline border matching the card borders on the portfolio
  ctx.strokeStyle = colors.rule;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = colors.inkMuted;
  ctx.font = "10px 'IBM Plex Mono', monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 18, 23);
  ctx.restore();
}

function render(canvas: HTMLCanvasElement, gs: GS) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const colors = readColors();
  drawBg(ctx, canvas.width, canvas.height, colors);
  gs.snake.forEach((p, i) => drawSegment(ctx, p, i === 0, colors));
  drawDiamond(ctx, gs.food);
  drawScore(ctx, gs.score, colors);
}

// ── Overlay UI — HTML elements use CSS vars directly ─────────────────────────

function GhostBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "var(--font-plex-mono),'IBM Plex Mono',monospace",
        fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase",
        color: hov ? "var(--accent)" : "var(--ink)",
        background: "var(--paper-raised)",
        border: `1px solid ${hov ? "var(--accent)" : "var(--rule-strong)"}`,
        padding: "10px 28px", cursor: "pointer",
        transition: "border-color 0.18s, color 0.18s",
      }}
    >
      {children}
    </button>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function SnakeGame({ active, onDead }: { active: boolean; onDead?: () => void }) {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const gsRef = useRef<GS | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [phase, setPhase] = useState<"start" | "playing" | "dead">("start");
  const [finalScore, setFinalScore] = useState(0);

  const syncCanvas = useCallback(() => {
    const cv = cvRef.current;
    if (!cv || !cv.parentElement) return { cols: 0, rows: 0 };
    const w = cv.parentElement.clientWidth;
    const h = cv.parentElement.clientHeight;
    if (cv.width !== w) cv.width = w;
    if (cv.height !== h) cv.height = h;
    return { cols: Math.floor(w / CELL), rows: Math.floor(h / CELL) };
  }, []);

  const startGame = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    const { cols, rows } = syncCanvas();
    if (!cols || !rows) return;
    gsRef.current = initGS(cols, rows);
    setFinalScore(0);
    setPhase("playing");
  }, [syncCanvas]);

  const tickRef = useRef<() => void>(() => {});
  tickRef.current = useCallback(() => {
    const cv = cvRef.current;
    const gs = gsRef.current;
    if (!cv || !gs) return;

    if (gs.queued !== null && gs.queued !== OPP[gs.dir]) {
      gs.dir = gs.queued;
      gs.queued = null;
    }

    const head = gs.snake[0];
    const d = STEP[gs.dir];
    const np: Pt = { x: head.x + d.x, y: head.y + d.y };

    if (
      np.x < 0 || np.x >= gs.cols || np.y < 0 || np.y >= gs.rows ||
      gs.snake.slice(0, -1).some((s) => s.x === np.x && s.y === np.y)
    ) {
      render(cv, gs);
      setFinalScore(gs.score);
      setPhase("dead");
      onDead?.();
      return;
    }

    const ate = np.x === gs.food.x && np.y === gs.food.y;
    gs.snake = [np, ...gs.snake];
    if (!ate) {
      gs.snake.pop();
    } else {
      gs.food = spawnFood(gs.cols, gs.rows, gs.snake);
      gs.score += 1;
      gs.speed = Math.max(SPEED_MIN, gs.speed - 5);
    }

    render(cv, gs);
    timerRef.current = setTimeout(() => tickRef.current(), gs.speed);
  }, []);

  useEffect(() => {
    if (phase === "playing" && active) {
      syncCanvas();
      const cv = cvRef.current;
      const gs = gsRef.current;
      if (cv && gs) {
        render(cv, gs);
        timerRef.current = setTimeout(() => tickRef.current(), gs.speed);
      }
    } else {
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    }
    return () => { if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; } };
  }, [phase, active, syncCanvas]);

  useEffect(() => {
    if (phase !== "start") return;
    const { cols, rows } = syncCanvas();
    const cv = cvRef.current;
    if (!cv || !cols || !rows) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const colors = readColors();
    drawBg(ctx, cv.width, cv.height, colors);
    // Scatter a few hint diamonds so visitors know what to eat
    const hints: Pt[] = [
      { x: Math.floor(cols * 0.25), y: Math.floor(rows * 0.35) },
      { x: Math.floor(cols * 0.6),  y: Math.floor(rows * 0.65) },
      { x: Math.floor(cols * 0.75), y: Math.floor(rows * 0.28) },
    ];
    hints.forEach((p) => { if (p.x < cols && p.y < rows) drawDiamond(ctx, p); });
  }, [phase, active, syncCanvas]);

  useEffect(() => {
    if (!active) return;
    const MAP: Record<string, Dir> = {
      ArrowUp: 0, KeyW: 0,
      ArrowRight: 1, KeyD: 1,
      ArrowDown: 2, KeyS: 2,
      ArrowLeft: 3, KeyA: 3,
    };
    const handler = (e: KeyboardEvent) => {
      const gs = gsRef.current;
      if (!gs) return;
      const dir = MAP[e.code];
      if (dir === undefined) return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
      if (dir !== OPP[gs.dir]) gs.queued = dir;
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active]);

  // Shared overlay style — paper background with strong opacity so the canvas
  // is visible but secondary to the prompt/result text
  const overlay: React.CSSProperties = {
    position: "absolute", inset: 0,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    gap: "1.25rem",
    background: "rgba(var(--paper-rgb, 245,242,236), 0.88)",
    backgroundColor: "color-mix(in srgb, var(--paper) 90%, transparent)",
  };

  const monoSmall: React.CSSProperties = {
    fontFamily: "var(--font-plex-mono),'IBM Plex Mono',monospace",
    fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase",
    color: "var(--ink-muted)", margin: 0,
  };

  const displayHead: React.CSSProperties = {
    fontFamily: "var(--font-newsreader),Georgia,serif",
    fontVariationSettings: '"opsz" 36',
    fontSize: "clamp(1.5rem,3vw,2.25rem)",
    letterSpacing: "-0.018em",
    color: "var(--ink)", margin: 0,
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "var(--paper)" }}>
      {/* Canvas layer — overflow clipped here so game visuals never spill */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <canvas ref={cvRef} style={{ display: "block", width: "100%", height: "100%" }} />

        {phase === "start" && (
          <div style={overlay}>
            <p style={monoSmall}>Eat the decision points to grow</p>
            <GhostBtn onClick={startGame}>Start game</GhostBtn>
            <p style={{ ...monoSmall, fontSize: "9px", color: "var(--ink-faint)" }}>Arrow keys or WASD</p>
          </div>
        )}
      </div>

      {/* Dead state — sibling of the canvas layer, not clipped, fills the grown container */}
      {phase === "dead" && (
        <div style={overlay}>
          <p style={displayHead}>Game over</p>
          <p style={monoSmall}>Score — {finalScore}</p>
          <p style={{ ...monoSmall, color: "var(--ink-muted)", maxWidth: "22ch", textAlign: "center", lineHeight: 1.8 }}>
            Read each case study to reveal a new experience
          </p>
          <a
            href="#case-studies"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "var(--font-plex-mono),'IBM Plex Mono',monospace",
              fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase",
              color: "var(--ink)",
              background: "var(--paper-raised)",
              border: "1px solid var(--rule-strong)",
              padding: "10px 28px", cursor: "pointer", textDecoration: "none",
              transition: "border-color 0.18s, color 0.18s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--rule-strong)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
            }}
          >
            Case Studies
          </a>
        </div>
      )}
    </div>
  );
}
