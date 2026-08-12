"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroFlowchart({ className = "", onComplete }: { className?: string; onComplete?: () => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const svg = svgRef.current;
    if (!wrapper || !svg) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      gsap.set(wrapper, { opacity: 1 });
      onComplete?.();
      return;
    }

    const ctx = buildTimeline(wrapper, svg, onComplete);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    // Wrapper div is the entrance animation target; keeps svg free of scope conflict
    <div ref={wrapperRef} style={{ opacity: 0 }}>
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2534 1400"
      className={"w-full h-auto " + className}
      aria-hidden="true"
    >
      <defs>
        {/* dark-mode overrides — both OS preference and explicit data-theme toggle */}
        <style>{`
          @media (prefers-color-scheme: dark) {
            #fc-bg          { fill: #15181C; }
            #fc-bg-texture  { display: none; }
            #fc-deco-tl     { opacity: 0.35; }
            #fc-deco-br     { opacity: 0.35; }
            #fc-connectors  { stroke: #B7B2A9; }
            #fc-ah path     { stroke: #B7B2A9; }
          }
          :root[data-theme="light"] #fc-bg         { fill: url(#fc-paper); }
          :root[data-theme="light"] #fc-bg-texture { display: block; opacity: 0.9; }
          :root[data-theme="light"] #fc-deco-tl    { opacity: 0.5; }
          :root[data-theme="light"] #fc-deco-br    { opacity: 0.25; }
          :root[data-theme="light"] #fc-connectors { stroke: #8b887f; }
          :root[data-theme="light"] #fc-ah path    { stroke: #8b887f; }
          :root[data-theme="dark"] #fc-bg         { fill: #15181C; }
          :root[data-theme="dark"] #fc-bg-texture { display: none; }
          :root[data-theme="dark"] #fc-deco-tl    { opacity: 0.35; }
          :root[data-theme="dark"] #fc-deco-br    { opacity: 0.35; }
          :root[data-theme="dark"] #fc-connectors { stroke: #B7B2A9; }
          :root[data-theme="dark"] #fc-ah path    { stroke: #B7B2A9; }

          /* Typography — pull into the design system's type scale.
             CSS wins over SVG presentation attributes, so these override the
             per-element fontFamily attrs without touching the markup. */
          #flow-start text,
          #research text,
          #prototype text,
          #validate text,
          #flow-end text {
            font-family: var(--font-newsreader), Georgia, serif;
            font-variation-settings: "opsz" 32;
            letter-spacing: -0.018em;
          }
          #decision-1 text,
          #decision-2 text {
            font-family: var(--font-newsreader), Georgia, serif;
            font-variation-settings: "opsz" 48;
          }
          #fc-designer-label {
            font-family: var(--font-plex-mono), 'Courier New', monospace;
            fill: var(--accent);
          }
          #fc-label-no1 text,
          #fc-label-yes1 text,
          #fc-label-no2 text,
          #fc-label-yes2 text {
            font-family: var(--font-plex-mono), 'Courier New', monospace;
            fill: var(--ink-muted);
          }
        `}</style>
        {/* gradients & filters */}
        <linearGradient id="fc-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7f3ec" />
          <stop offset="100%" stopColor="#f1ece3" />
        </linearGradient>
        <filter id="fc-paperTexture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.035" />
          </feComponentTransfer>
        </filter>

        <linearGradient id="fc-blueOrb" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#5779b6" />
          <stop offset="45%" stopColor="#28579d" />
          <stop offset="100%" stopColor="#0c3e84" />
        </linearGradient>
        <radialGradient id="fc-orbHighlight" cx="35%" cy="22%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="fc-orbShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="13" stdDeviation="10" floodColor="#3f4d60" floodOpacity="0.28" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.8" />
        </filter>

        <linearGradient id="fc-glassFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fbfd" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#dce7f0" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="fc-glassStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#d5e2ee" stopOpacity="0.65" />
        </linearGradient>
        <filter id="fc-glassShadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="#516274" floodOpacity="0.20" />
        </filter>

        <linearGradient id="fc-mintGlass" x1="0.12" y1="0.05" x2="0.88" y2="0.95">
          <stop offset="0%" stopColor="#e7f4eb" stopOpacity="0.96" />
          <stop offset="55%" stopColor="#b9d8c6" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#8bb6a2" stopOpacity="0.84" />
        </linearGradient>
        <linearGradient id="fc-mintEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="65%" stopColor="#dff1e7" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#5f9079" stopOpacity="0.55" />
        </linearGradient>
        <filter id="fc-diamondShadow" x="-35%" y="-35%" width="170%" height="180%">
          <feDropShadow dx="0" dy="11" stdDeviation="9" floodColor="#456253" floodOpacity="0.19" />
        </filter>

        <filter id="fc-labelShadow" x="-30%" y="-50%" width="160%" height="200%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#5f5b54" floodOpacity="0.16" />
        </filter>

        {/* arrowhead marker — open chevron style */}
        <marker id="fc-ah" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10" fill="none" stroke="#8b887f" strokeWidth="1.7" />
        </marker>
      </defs>

      {/* ── background ── */}
      <rect id="fc-bg"         width="2534" height="1400" fill="url(#fc-paper)" />
      <rect id="fc-bg-texture" width="2534" height="1400" filter="url(#fc-paperTexture)" opacity="0.9" />

      {/* decorative corner lines */}
      <g id="fc-deco-tl" opacity="0.5" stroke="#9dc8bf" strokeWidth="3">
        <path d="M10 74 L90 -6" />
        <path d="M26 82 L106 2" />
        <path d="M42 90 L122 10" />
        <path d="M58 98 L138 18" />
        <path d="M74 106 L154 26" />
      </g>
      <g id="fc-deco-br" opacity="0.25" stroke="#9dc8bf" strokeWidth="3">
        <path d="M2310 1400 L2534 1172" />
        <path d="M2343 1400 L2534 1205" />
        <path d="M2376 1400 L2534 1238" />
        <path d="M2409 1400 L2534 1271" />
      </g>

      <text id="fc-designer-label" x="230" y="162" fontSize="21" letterSpacing="5">
        SENIOR PRODUCT DESIGNER
      </text>

      {/* ── scaled content: 1.5× from original centre (844.5, 465.5) → new centre (1267, 700) ── */}
      <g id="fc-content" transform="translate(1267 700) scale(1.5) translate(-844.5 -465.5)">

      {/* ── connectors ── */}
      {/*
        Happy path (IDs fc-c1 … fc-c6):
          c1  Start → Research
          c2  Research → Decision-1
          c3  Decision-1 YES → Prototype  (long arc right-down-left)
          c4  Prototype → Decision-2
          c5  Decision-2 YES → Validate
          c6  Validate → End

        Feedback loops (IDs fc-c7, fc-c8) — drawn after happy path:
          c7  Decision-2 NO → Prototype
          c8  Decision-1 NO → Research
      */}
      <g id="fc-connectors" stroke="#8b887f" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* happy path */}
        <path id="fc-c1" d="M435,255 H708"                                                            markerEnd="url(#fc-ah)" />
        <path id="fc-c2" d="M972,255 H1152"                                                           markerEnd="url(#fc-ah)" />
        <path id="fc-c3" d="M1325,255 H1460 Q1490,255 1490,285 V510 H1058"                            markerEnd="url(#fc-ah)" />
        <path id="fc-c4" d="M790,510 H590"                                                             markerEnd="url(#fc-ah)" />
        <path id="fc-c5" d="M505,587 V694"                                                             markerEnd="url(#fc-ah)" />
        <path id="fc-c6" d="M620,758 H1163"                                                            markerEnd="url(#fc-ah)" />
        {/* feedback loops */}
        <path id="fc-c7" d="M505,436 V392 Q505,376 523,376 H901 Q919,376 919,392 V452"               markerEnd="url(#fc-ah)" />
        <path id="fc-c8" d="M1242,194 V119 Q1242,117 1240,117 H869 Q850,117 850,137 V185"            markerEnd="url(#fc-ah)" />
      </g>

      {/* ── nodes ── */}
      {/* Start */}
      <g id="flow-start" transform="translate(265 171)" filter="url(#fc-orbShadow)" style={{ transformOrigin: "80px 80px" }}>
        <circle cx="80" cy="80" r="69" fill="url(#fc-blueOrb)" stroke="#dbe7fb" strokeWidth="3" />
        <circle cx="80" cy="80" r="63" fill="url(#fc-orbHighlight)" opacity="0.8" />
        <circle cx="80" cy="80" r="58" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.4" />
        <text x="80" y="89" textAnchor="middle" fontFamily="Georgia, serif" fontSize="31" fill="#fff">Start</text>
      </g>

      {/* Research */}
      <g id="research" transform="translate(720 198)" filter="url(#fc-glassShadow)" style={{ transformOrigin: "127px 57px" }}>
        <rect width="255" height="114" rx="17" fill="url(#fc-glassFill)" stroke="url(#fc-glassStroke)" strokeWidth="3" />
        <rect x="7" y="7" width="241" height="100" rx="13" fill="none" stroke="#fff" strokeOpacity="0.35" />
        {/* magnifying glass */}
        <g opacity="0.45" fill="none" stroke="#17304e" strokeLinecap="round">
          <circle cx="46" cy="53" r="13" strokeWidth="2.5" />
          <line x1="55" y1="63" x2="65" y2="73" strokeWidth="3" />
        </g>
        <text x="152" y="68" textAnchor="middle" fontFamily="Georgia, serif" fontSize="31" fill="#17304e">Research</text>
      </g>

      {/* Decision-1 */}
      <g id="decision-1" transform="translate(1170 180)" filter="url(#fc-diamondShadow)" style={{ transformOrigin: "59px 59px" }}>
        <rect width="118" height="118" transform="rotate(45 59 59)" fill="url(#fc-mintGlass)" stroke="url(#fc-mintEdge)" strokeWidth="4" />
        <text x="59" y="75" textAnchor="middle" fontFamily="Georgia, serif" fontSize="54" fill="#4c7b66">?</text>
      </g>

      {/* Prototype */}
      <g id="prototype" transform="translate(790 454)" filter="url(#fc-glassShadow)" style={{ transformOrigin: "133px 57px" }}>
        <rect width="267" height="114" rx="17" fill="url(#fc-glassFill)" stroke="url(#fc-glassStroke)" strokeWidth="3" />
        <rect x="7" y="7" width="253" height="100" rx="13" fill="none" stroke="#fff" strokeOpacity="0.35" />
        {/* wireframe/browser frame — header bar + two content blocks */}
        <g opacity="0.45" fill="none" stroke="#17304e" strokeLinecap="round" strokeLinejoin="round">
          <rect x="30" y="37" width="34" height="42" rx="3" strokeWidth="2.2" />
          <line x1="30" y1="47" x2="64" y2="47" strokeWidth="2.2" />
          <rect x="33" y="52" width="10" height="8" rx="1" strokeWidth="1.8" />
          <rect x="47" y="52" width="13" height="8" rx="1" strokeWidth="1.8" />
          <line x1="33" y1="65" x2="61" y2="65" strokeWidth="1.8" />
        </g>
        <text x="162" y="68" textAnchor="middle" fontFamily="Georgia, serif" fontSize="31" fill="#17304e">Prototype</text>
      </g>

      {/* Decision-2 */}
      <g id="decision-2" transform="translate(445 438)" filter="url(#fc-diamondShadow)" style={{ transformOrigin: "59px 59px" }}>
        <rect width="118" height="118" transform="rotate(45 59 59)" fill="url(#fc-mintGlass)" stroke="url(#fc-mintEdge)" strokeWidth="4" />
        <text x="59" y="75" textAnchor="middle" fontFamily="Georgia, serif" fontSize="54" fill="#4c7b66">?</text>
      </g>

      {/* Validate */}
      <g id="validate" transform="translate(369 707)" filter="url(#fc-glassShadow)" style={{ transformOrigin: "127px 57px" }}>
        <rect width="255" height="114" rx="17" fill="url(#fc-glassFill)" stroke="url(#fc-glassStroke)" strokeWidth="3" />
        <rect x="7" y="7" width="241" height="100" rx="13" fill="none" stroke="#fff" strokeOpacity="0.35" />
        {/* check in circle */}
        <g opacity="0.45" fill="none" stroke="#17304e" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="46" cy="57" r="16" strokeWidth="2.4" />
          <polyline points="38,57 44,64 56,48" strokeWidth="2.6" />
        </g>
        <text x="152" y="68" textAnchor="middle" fontFamily="Georgia, serif" fontSize="31" fill="#17304e">Validate</text>
      </g>

      {/* End */}
      <g id="flow-end" transform="translate(1170 682)" filter="url(#fc-orbShadow)" style={{ transformOrigin: "80px 80px" }}>
        <circle id="fc-end-ring" cx="80" cy="80" r="69" fill="url(#fc-blueOrb)" stroke="#dbe7fb" strokeWidth="3" />
        <circle cx="80" cy="80" r="63" fill="url(#fc-orbHighlight)" opacity="0.8" />
        <circle cx="80" cy="80" r="58" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.4" />
        <text x="80" y="89" textAnchor="middle" fontFamily="Georgia, serif" fontSize="31" fill="#fff">End</text>
      </g>

      {/* ── YES / NO labels ── */}
      <g id="fc-label-no1" transform="translate(1034 93)" filter="url(#fc-labelShadow)">
        <rect width="74" height="42" rx="8" fill="#f3efe8" stroke="#d8d1c7" />
        <text x="37" y="28" textAnchor="middle" fontFamily="Arial" fontSize="21" fill="#6d6962">NO</text>
      </g>
      <g id="fc-label-yes1" transform="translate(1376 229)" filter="url(#fc-labelShadow)">
        <rect width="82" height="42" rx="8" fill="#f3efe8" stroke="#d8d1c7" />
        <text x="41" y="28" textAnchor="middle" fontFamily="Arial" fontSize="21" fill="#6d6962">YES</text>
      </g>
      <g id="fc-label-no2" transform="translate(610 354)" filter="url(#fc-labelShadow)">
        <rect width="74" height="42" rx="8" fill="#f3efe8" stroke="#d8d1c7" />
        <text x="37" y="28" textAnchor="middle" fontFamily="Arial" fontSize="21" fill="#6d6962">NO</text>
      </g>
      <g id="fc-label-yes2" transform="translate(472 604)" filter="url(#fc-labelShadow)">
        <rect width="82" height="42" rx="8" fill="#f3efe8" stroke="#d8d1c7" />
        <text x="41" y="28" textAnchor="middle" fontFamily="Arial" fontSize="21" fill="#6d6962">YES</text>
      </g>

      </g>{/* end fc-content */}
    </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animation engine — GSAP timeline
// ---------------------------------------------------------------------------

function buildTimeline(wrapper: HTMLDivElement, svg: SVGSVGElement, onComplete?: () => void): gsap.Context {
  return gsap.context(() => {
    // ── 1. Measure connector paths and initialise stroke-dash ──────────────
    const connectorIds = ["#fc-c1","#fc-c2","#fc-c3","#fc-c4","#fc-c5","#fc-c6","#fc-c7","#fc-c8"];

    const pathLen: Record<string, number> = {};
    connectorIds.forEach((id) => {
      const el = svg.querySelector<SVGPathElement>(id);
      if (!el) return;
      const len = el.getTotalLength();
      pathLen[id] = len;
      // Feedback loops use SVG attr opacity so they never get a CSS compositing layer.
      // CSS opacity < 1 creates a stacking context that lets Chrome paint them above
      // DOM-later NO pill labels; SVG attr opacity follows strict document paint order.
      const isFeedback = id === "#fc-c7" || id === "#fc-c8";
      if (isFeedback) {
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, attr: { opacity: 0 } });
      } else {
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      }
    });

    // ── 1b. Lift wrappers — each node gets a plain <g> parent that owns GSAP's
    //    CSS transforms (y, scale, opacity). The inner <g> keeps its SVG translate
    //    attribute, so there is no CSS/SVG transform conflict on y or scale.
    const liftNodeIds = ["#flow-start","#research","#decision-1","#prototype","#decision-2","#validate","#flow-end"];
    const liftOf: Record<string, SVGGElement> = {};
    liftNodeIds.forEach((id) => {
      const node = svg.querySelector<SVGGElement>(id);
      if (!node) return;
      const wrap = document.createElementNS("http://www.w3.org/2000/svg", "g") as SVGGElement;
      wrap.style.transformBox    = "fill-box";
      wrap.style.transformOrigin = "50% 50%";
      node.parentNode!.insertBefore(wrap, node);
      wrap.appendChild(node);
      liftOf[id] = wrap;
    });

    // ── 2. Set initial states ──────────────────────────────────────────────
    // Wrappers (not inner nodes) own opacity so scale/y animate cleanly
    gsap.set(Object.values(liftOf), { opacity: 0 });

    gsap.set([
      "#fc-label-no1", "#fc-label-yes1",
      "#fc-label-no2", "#fc-label-yes2",
    ], { opacity: 0 });

    // ── 3. Build timeline ──────────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, timeScale: 1.5, onComplete });

    // Helper: duration for a given path at a given speed (units/s)
    const dur = (id: string, speed: number) =>
      (pathLen[id] ?? 300) / speed;

    // Helper: read an SVG label's translate(x y) so motion offsets are coordinate-safe
    const labelPos = (id: string): [number, number] => {
      const m = (svg.querySelector(id)?.getAttribute("transform") ?? "")
        .match(/translate\(\s*([\d.]+)\s+([\d.]+)/);
      return m ? [+m[1], +m[2]] : [0, 0];
    };

    // Helper: draw a connector stroke — set opacity:1 at draw start so markerEnd appears with stroke
    const draw = (id: string, speed: number, at: number) => {
      tl.set(id, { opacity: 1 }, at);
      tl.to(id, { strokeDashoffset: 0, duration: dur(id, speed), ease: "power2.inOut" }, at);
    };

    // Helper: node entrance — animates the lift wrapper so y, scale, and opacity
    // all use CSS transforms without conflicting with the inner SVG translate.
    // Rectangles drop -10px; diamonds drop -14px to underscore their weightlessness.
    // For decision diamonds, rotation is split into a second parallel tween so it
    // can use elastic.out independently — a spring cue exclusive to decision nodes.
    const appear = (id: string, at: number, opts?: { rotation?: number }) => {
      const wrap = liftOf[id];
      if (!wrap) return;
      const yOff = opts?.rotation ? -21 : -15;
      tl.fromTo(
        wrap,
        { opacity: 0, scale: 0.82, y: yOff },
        { opacity: 1, scale: 1,    y: 0, duration: 0.38, ease: "back.out(1.8)" },
        at,
      );
      if (opts?.rotation) {
        tl.fromTo(
          wrap,
          { rotation: opts.rotation },
          { rotation: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" },
          at,
        );
      }
    };

    // Helper: single-beat pulse — also on the wrapper for consistent transform origin
    const pulse = (id: string, at: number) => {
      const wrap = liftOf[id];
      if (!wrap) return;
      return tl.to(wrap, { scale: 1.07, yoyo: true, repeat: 1, duration: 0.19, ease: "power2.inOut" }, at);
    };

    // ── Phase 1 : entrance — animate the wrapper div (svg is the context scope,
    //   animating the scope element directly causes GSAP to silently skip it)
    tl.fromTo(
      wrapper,
      { opacity: 0, scale: 0.97, filter: "blur(8px)" },
      { opacity: 1, scale: 1,    filter: "blur(0px)", duration: 0.62, ease: "power1.out" },
      0,
    );

    // ── Phase 2 : Start node pulses in ────────────────────────────────────
    appear("#flow-start", 0.30);
    pulse("#flow-start",  0.72);

    // ── Phase 3 : Happy-path draw sequence ────────────────────────────────
    // Each segment: draw connector → node appears → brief pulse → next

    // segment 1 — Start → Research
    const d1 = dur("#fc-c1", 540);
    draw("#fc-c1", 540, 0.92);
    appear("#research",    0.92 + d1 + 0.04);
    pulse("#research",     0.92 + d1 + 0.44);

    // segment 2 — Research → Decision-1
    const t2  = 0.92 + d1 + 0.58;
    const d2  = dur("#fc-c2", 540);
    draw("#fc-c2", 540, t2);
    appear("#decision-1", t2 + d2 + 0.04, { rotation: -14 });

    // segment 3 — Decision-1 (YES) → Prototype  [long arc — slower speed]
    const t3  = t2 + d2 + 0.48;
    const d3  = dur("#fc-c3", 820);
    draw("#fc-c3", 820, t3);
    // YES label slides in from the right — arriving from the direction the stroke travels
    const [y1x, y1y] = labelPos("#fc-label-yes1");
    tl.fromTo(
      "#fc-label-yes1",
      { opacity: 0, attr: { transform: `translate(${y1x + 8} ${y1y})` } },
      { opacity: 1, attr: { transform: `translate(${y1x} ${y1y})` }, duration: 0.30, ease: "power1.out" },
      t3 + d3 * 0.4,
    );
    appear("#prototype",   t3 + d3 + 0.04);
    pulse("#prototype",    t3 + d3 + 0.44);

    // segment 4 — Prototype → Decision-2
    const t4  = t3 + d3 + 0.58;
    const d4  = dur("#fc-c4", 540);
    draw("#fc-c4", 540, t4);
    appear("#decision-2", t4 + d4 + 0.04, { rotation: -14 });

    // segment 5 — Decision-2 (YES) → Validate
    const t5  = t4 + d4 + 0.48;
    const d5  = dur("#fc-c5", 430);
    draw("#fc-c5", 430, t5);
    // YES label slides in from below — stroke travels downward
    const [y2x, y2y] = labelPos("#fc-label-yes2");
    tl.fromTo(
      "#fc-label-yes2",
      { opacity: 0, attr: { transform: `translate(${y2x} ${y2y + 6})` } },
      { opacity: 1, attr: { transform: `translate(${y2x} ${y2y})` }, duration: 0.28, ease: "power1.out" },
      t5 + d5 * 0.35,
    );
    appear("#validate",    t5 + d5 + 0.04);
    pulse("#validate",     t5 + d5 + 0.44);

    // segment 6 — Validate → End  [medium arc — slightly slower]
    const t6  = t5 + d5 + 0.58;
    const d6  = dur("#fc-c6", 640);
    draw("#fc-c6", 640, t6);

    // ── Phase 4 : End node appears + glow ────────────────────────────────
    const tEnd = t6 + d6 + 0.04;
    appear("#flow-end", tEnd);

    // Glow: outer ring stroke brightens and widens, then eases back
    tl.to(
      "#fc-end-ring",
      {
        attr: { stroke: "#7ab3ff", strokeWidth: 14 },
        duration: 0.34,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      },
      tEnd + 0.32,
    );

    // ── Phase 5 : Feedback loops fade in after happy path settles ─────────
    const tFb = tEnd + 0.72;
    // Feedback loops: reveal + draw using SVG attr opacity throughout — no CSS opacity
    // is ever applied, so no CSS compositing layer is created, and Chrome correctly
    // paints these below the DOM-later NO pill labels.
    tl.set(["#fc-c7", "#fc-c8"], { attr: { opacity: 1 } }, tFb);
    tl.to(
      ["#fc-c7", "#fc-c8"],
      { strokeDashoffset: 0, attr: { opacity: 0.55 }, duration: 0.70, ease: "power2.inOut" },
      tFb,
    );
    // NO labels slide in from above — feedback loops arrive from above
    const [n1x, n1y] = labelPos("#fc-label-no1");
    const [n2x, n2y] = labelPos("#fc-label-no2");
    tl.fromTo(
      "#fc-label-no1",
      { opacity: 0, attr: { transform: `translate(${n1x} ${n1y - 6})` } },
      { opacity: 1, attr: { transform: `translate(${n1x} ${n1y})` }, duration: 0.40, ease: "power1.out" },
      tFb + 0.25,
    );
    tl.fromTo(
      "#fc-label-no2",
      { opacity: 0, attr: { transform: `translate(${n2x} ${n2y - 6})` } },
      { opacity: 1, attr: { transform: `translate(${n2x} ${n2y})` }, duration: 0.40, ease: "power1.out" },
      tFb + 0.25,
    );

  }, svg);
}
