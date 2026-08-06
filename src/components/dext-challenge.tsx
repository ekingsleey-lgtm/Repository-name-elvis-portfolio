"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Container, Label, Rule } from "./primitives";

/* ─── Types ──────────────────────────────────────────────────── */

type BizType = "Ltd" | "LLP" | "Sole Trader";

type Issue =
  | "Missing income"
  | "Missing expenses"
  | "Identity not verified"
  | "Quarter incomplete"
  | "Awaiting client confirmation"
  | "Bank feed disconnected"
  | "Review required";

type Client = {
  id: string;
  name: string;
  type: BizType;
  quarterLabel: string;
  dueDate: string;
  income: "Complete" | "Missing";
  expenses: "Complete" | "Missing";
  identity: "Verified" | "Not verified";
  quarterComplete: boolean;
  notice?: string;
  isReady: boolean;
  blockingIssue?: Issue;
};

type UserChoice = "ready" | "attention";
type Phase = "loading" | "review" | "revealed";

/* ─── Business pool ──────────────────────────────────────────── */

const NAMES = [
  "Greenfield Landscaping",
  "Harper Dental Practice",
  "Willow Café",
  "BrightSpark Electrical",
  "Oak & Stone Builders",
  "Northbridge Consulting",
  "Rose & Finch Bakery",
  "Carter Engineering",
  "Ashwood Property Services",
  "Elm Street Opticians",
  "Whitmore Interiors",
  "Pennine Accountancy Group",
  "Foxglove Florists",
  "Ridgeway Plumbing & Heating",
  "Blackthorn Legal",
  "Summit Fitness",
  "Millbrook Architecture",
  "Clearview Window Solutions",
  "Hargreaves Photography",
  "Thornfield Vets",
  "Amber Recruitment",
  "Westgate Property Management",
  "Horizon Digital",
  "Fernwood Childcare",
  "Kingsford Financial Services",
];

const BIZ_TYPES: BizType[] = ["Ltd", "LLP", "Sole Trader"];

const QUARTERS = [
  { label: "Q1 · Apr – Jun 2025", due: "31 Jul 2025" },
  { label: "Q2 · Jul – Sep 2025", due: "31 Oct 2025" },
  { label: "Q3 · Oct – Dec 2025", due: "31 Jan 2026" },
  { label: "Q4 · Jan – Mar 2026", due: "30 Apr 2026" },
];

const FIELD_ISSUES: Issue[] = [
  "Missing income",
  "Missing expenses",
  "Identity not verified",
  "Quarter incomplete",
];

const META_ISSUES: Issue[] = [
  "Awaiting client confirmation",
  "Bank feed disconnected",
  "Review required",
];

/* ─── Seeded random ──────────────────────────────────────────── */

function lcg(seed: number): () => number {
  let s = (seed >>> 0) ^ 0xc0ffee;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Challenge generator ────────────────────────────────────── */

function generateChallenge(): Client[] {
  // Seed changes every minute so each visit within the same minute shows the same set.
  const rand = lcg(Math.floor(Date.now() / 60_000));

  const names = shuffle(NAMES, rand).slice(0, 6);

  // 3 blocking issues: 2 field-level + 1 meta (adds visual variety — some cards
  // look "fine" at field level but have a hidden status notice).
  const fieldPool = shuffle(FIELD_ISSUES, rand);
  const metaPool = shuffle(META_ISSUES, rand);
  const hasMetaIssue = rand() > 0.35;
  const issueList: Issue[] = hasMetaIssue
    ? [fieldPool[0], fieldPool[1], metaPool[0]]
    : [fieldPool[0], fieldPool[1], fieldPool[2]];
  const shuffledIssues = shuffle(issueList, rand);

  // Decide which 3 of the 6 positions are "ready".
  const positions = shuffle([0, 1, 2, 3, 4, 5], rand);
  const readySet = new Set(positions.slice(0, 3));

  let issueIdx = 0;

  return names.map((name, i) => {
    const type = BIZ_TYPES[Math.floor(rand() * BIZ_TYPES.length)];
    const q = QUARTERS[Math.floor(rand() * QUARTERS.length)];
    const isReady = readySet.has(i);
    const suffix = type === "Ltd" ? " Ltd" : type === "LLP" ? " LLP" : "";
    const fullName = name + suffix;

    if (isReady) {
      return {
        id: `c${i}`,
        name: fullName,
        type,
        quarterLabel: q.label,
        dueDate: q.due,
        income: "Complete",
        expenses: "Complete",
        identity: "Verified",
        quarterComplete: true,
        isReady: true,
      };
    }

    const issue = shuffledIssues[issueIdx++] ?? FIELD_ISSUES[0];
    const isMeta = META_ISSUES.includes(issue);

    return {
      id: `c${i}`,
      name: fullName,
      type,
      quarterLabel: q.label,
      dueDate: q.due,
      income: issue === "Missing income" ? "Missing" : "Complete",
      expenses: issue === "Missing expenses" ? "Missing" : "Complete",
      identity: issue === "Identity not verified" ? "Not verified" : "Verified",
      quarterComplete: issue !== "Quarter incomplete",
      notice: isMeta ? issue : undefined,
      isReady: false,
      blockingIssue: issue,
    };
  });
}

/* ─── StatusRow ──────────────────────────────────────────────── */

function StatusRow({ term, value, ok }: { term: string; value: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-rule last:border-0">
      <dt>
        <span className="label label-muted">{term}</span>
      </dt>
      <dd
        className="flex items-center gap-1.5 text-[0.8125rem] font-medium tabular-nums"
        style={{ color: ok ? "var(--ink-soft)" : "var(--accent)" }}
      >
        <span aria-hidden="true" style={{ opacity: ok ? 0.5 : 1, fontSize: "0.7rem" }}>
          {ok ? "✓" : "×"}
        </span>
        {value}
      </dd>
    </div>
  );
}

/* ─── ClientCard ─────────────────────────────────────────────── */

function ClientCard({
  client,
  choice,
  onChoose,
  revealed,
  index,
  visible,
}: {
  client: Client;
  choice?: UserChoice;
  onChoose: (c: UserChoice) => void;
  revealed: boolean;
  index: number;
  visible: boolean;
}) {
  const correct = revealed && choice === (client.isReady ? "ready" : "attention");
  const wrong = revealed && !correct;

  const cardBorder = revealed
    ? correct
      ? "var(--success)"
      : "var(--accent)"
    : "var(--rule)";

  const cardBg = revealed
    ? correct
      ? "color-mix(in srgb, var(--success) 5%, var(--paper-raised))"
      : "color-mix(in srgb, var(--accent) 5%, var(--paper-raised))"
    : "var(--paper-raised)";

  const btnBase =
    "chal-btn py-2.5 px-3 text-[0.75rem] border leading-tight transition-[background-color,border-color,color] duration-150 cursor-pointer";

  return (
    <article
      aria-label={`Client: ${client.name}`}
      data-revealed={revealed ? "true" : undefined}
      className="chal-card flex flex-col"
      style={{
        border: `1px solid ${cardBorder}`,
        backgroundColor: cardBg,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(1.25rem)",
        transition: `
          opacity 0.45s cubic-bezier(0.16,1,0.3,1) ${index * 90}ms,
          transform 0.45s cubic-bezier(0.16,1,0.3,1) ${index * 90}ms,
          border-color 0.35s ease,
          background-color 0.35s ease,
          box-shadow 0.22s ease
        `,
      }}
    >
      {/* Card header */}
      <div
        className="p-5 pb-4"
        style={{ borderBottom: "1px solid var(--rule)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="display leading-snug text-ink"
              style={{ fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)" }}
            >
              {client.name}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="label label-muted">{client.type}</span>
              <span className="text-ink-faint text-xs" aria-hidden="true">
                ·
              </span>
              <span className="label label-muted">{client.quarterLabel}</span>
            </div>
          </div>

          {/* Result badge — appears after reveal */}
          {revealed && (
            <div
              role="img"
              aria-label={correct ? "Correctly classified" : "Incorrectly classified"}
              className="mt-0.5 shrink-0 flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full text-paper text-[0.65rem] font-bold"
              style={{ backgroundColor: correct ? "var(--success)" : "var(--accent)" }}
            >
              {correct ? "✓" : "×"}
            </div>
          )}
        </div>

        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="label label-muted">Submission due</span>
          <span className="label label-muted font-semibold text-ink-soft">
            {client.dueDate}
          </span>
        </div>
      </div>

      {/* Status fields */}
      <div className="flex-1 px-5 pt-3 pb-0">
        <dl>
          <StatusRow term="Income" value={client.income} ok={client.income === "Complete"} />
          <StatusRow
            term="Expenses"
            value={client.expenses}
            ok={client.expenses === "Complete"}
          />
          <StatusRow
            term="Identity"
            value={client.identity}
            ok={client.identity === "Verified"}
          />
          <StatusRow
            term="Quarter"
            value={client.quarterComplete ? "Complete" : "Incomplete"}
            ok={client.quarterComplete}
          />
        </dl>

        {/* Meta-issue notice — looks like a real SaaS alert */}
        {client.notice && (
          <div
            className="mt-3 flex items-start gap-2 px-3 py-2.5 text-[0.75rem]"
            style={{
              backgroundColor: "color-mix(in srgb, var(--accent) 7%, var(--paper))",
              border: "1px solid color-mix(in srgb, var(--accent) 18%, transparent)",
            }}
            role="alert"
            aria-live="polite"
          >
            <span className="shrink-0 mt-px" style={{ color: "var(--accent)" }} aria-hidden="true">
              ⚠
            </span>
            <span className="leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {client.notice}
            </span>
          </div>
        )}

        {/* Revealed: reason for incorrect classification */}
        {wrong && client.blockingIssue && (
          <div
            className="mt-3 px-3 py-2.5 text-[0.75rem] leading-relaxed"
            style={{
              backgroundColor: "color-mix(in srgb, var(--accent) 9%, var(--paper))",
              border: "1px solid color-mix(in srgb, var(--accent) 22%, transparent)",
            }}
          >
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              Issue:{" "}
            </span>
            <span style={{ color: "var(--ink-soft)" }}>{client.blockingIssue}</span>
          </div>
        )}

        <div className="pb-4" />
      </div>

      {/* Classification actions — pre-reveal */}
      {!revealed && (
        <div
          className="grid grid-cols-2 gap-2 p-4"
          style={{ borderTop: "1px solid var(--rule)" }}
          role="group"
          aria-label={`Classify ${client.name}`}
        >
          <button
            type="button"
            onClick={() => onChoose("ready")}
            aria-pressed={choice === "ready"}
            className={btnBase}
            style={
              choice === "ready"
                ? {
                    backgroundColor: "var(--ink)",
                    borderColor: "var(--ink)",
                    color: "var(--paper)",
                  }
                : {
                    backgroundColor: "transparent",
                    borderColor: "var(--rule)",
                    color: "var(--ink-muted)",
                  }
            }
          >
            Ready to Submit
          </button>
          <button
            type="button"
            onClick={() => onChoose("attention")}
            aria-pressed={choice === "attention"}
            className={btnBase}
            style={
              choice === "attention"
                ? {
                    backgroundColor: "var(--accent)",
                    borderColor: "var(--accent)",
                    color: "var(--paper)",
                  }
                : {
                    backgroundColor: "transparent",
                    borderColor: "var(--rule)",
                    color: "var(--ink-muted)",
                  }
            }
          >
            Needs Attention
          </button>
        </div>
      )}

      {/* Result label — post-reveal */}
      {revealed && (
        <div
          className="px-5 py-3.5 text-[0.75rem] font-medium"
          style={{
            borderTop: "1px solid var(--rule)",
            color: correct ? "var(--success)" : "var(--accent)",
          }}
        >
          {correct
            ? client.isReady
              ? "Ready to Submit — correct"
              : "Needs Attention — correct"
            : client.isReady
              ? "This client was ready to submit"
              : "This client needed attention"}
        </div>
      )}
    </article>
  );
}

/* ─── Loading skeleton ───────────────────────────────────────── */

function CardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="flex flex-col border border-rule bg-paper-raised"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="p-5 pb-4 border-b border-rule space-y-2.5">
        <div className="h-[1.0625rem] w-3/4 rounded-sm bg-rule animate-pulse" />
        <div className="h-3 w-1/2 rounded-sm bg-rule animate-pulse" />
        <div className="h-3 w-1/3 rounded-sm bg-rule animate-pulse" />
      </div>
      <div className="flex-1 px-5 pt-3 pb-4 space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-2.5 border-b border-rule last:border-0">
            <div className="h-2.5 w-16 rounded-sm bg-rule animate-pulse" />
            <div className="h-2.5 w-20 rounded-sm bg-rule animate-pulse" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 p-4 border-t border-rule">
        <div className="h-10 rounded-sm bg-rule animate-pulse" />
        <div className="h-10 rounded-sm bg-rule animate-pulse" />
      </div>
    </div>
  );
}

/* ─── Forced light-mode tokens for the product window ────────── */

const LIGHT: Record<string, string> = {
  "--paper": "#f5f2ec",
  "--paper-raised": "#fbfaf8",
  "--paper-sunk": "#ece8df",
  "--ink": "#16181c",
  "--ink-soft": "#3c4046",
  "--ink-muted": "#6b6f77",
  "--ink-faint": "#9a9ea6",
  "--rule": "#ddd8ce",
  "--rule-strong": "#c8c2b5",
  "--accent": "#d8412a",
  "--accent-soft": "#f2ddd7",
  "--success": "#166534",
  "--success-soft": "#dcfce7",
};

/* ─── Main component ─────────────────────────────────────────── */

export function DextChallenge() {
  const [clients, setClients] = useState<Client[]>([]);
  const [choices, setChoices] = useState<Record<string, UserChoice>>({});
  const [phase, setPhase] = useState<Phase>("loading");
  const [cardVisible, setCardVisible] = useState<boolean[]>(Array(6).fill(false));
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [completionVisible, setCompletionVisible] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const timeTakenRef = useRef<number>(0);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const challenge = generateChallenge();
    setClients(challenge);
    setPhase("review");

    const timers = challenge.map((_, i) =>
      setTimeout(() => {
        setCardVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 180 + i * 95),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Scroll to the top of the product window when the overlay appears.
  useEffect(() => {
    if (phase === "revealed" && windowRef.current) {
      setTimeout(() => {
        windowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [phase]);

  const allClassified =
    clients.length > 0 && clients.every((c) => choices[c.id] != null);
  const classifiedCount = Object.keys(choices).length;
  const revealed = phase === "revealed";

  const handleChoose = useCallback(
    (id: string, choice: UserChoice) => {
      if (phase !== "review") return;
      if (!startTimeRef.current) startTimeRef.current = Date.now();
      setChoices((prev) => ({ ...prev, [id]: choice }));
    },
    [phase],
  );

  const handleCheckAnswers = useCallback(() => {
    if (!allClassified) return;
    timeTakenRef.current = startTimeRef.current
      ? Math.round((Date.now() - startTimeRef.current) / 1000)
      : 0;
    setPhase("revealed");
    setTimeout(() => setSummaryVisible(true), 700);
    setTimeout(() => setCompletionVisible(true), 3200);
  }, [allClassified]);

  const handleContinue = useCallback(() => {
    const section = document.querySelector('[aria-labelledby="dext-exp-heading"]');
    const next = section?.nextElementSibling as HTMLElement | null;
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const correctCount = clients.filter(
    (c) => choices[c.id] === (c.isReady ? "ready" : "attention"),
  ).length;

  const missedIssues = clients
    .filter((c) => !c.isReady && choices[c.id] !== "attention")
    .map((c) => c.blockingIssue)
    .filter(Boolean) as Issue[];

  const missedIssueLabel =
    missedIssues.length === 0
      ? "—"
      : missedIssues.length === 1
        ? missedIssues[0]
        : `${missedIssues[0]}, +${missedIssues.length - 1} more`;

  const monoStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono, ui-monospace, monospace)",
    fontSize: "0.6875rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  };

  return (
    <section aria-labelledby="dext-exp-heading" className="mt-20 lg:mt-28">
        {/* ── Section intro ── */}
        <Container>
          <Rule className="mb-12 lg:mb-14" />
          <div className="mx-auto max-w-[52ch] text-center">
            <Label muted className="mb-3 block">Interactive Experience</Label>
            <h2
              id="dext-exp-heading"
              className="display text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]"
            >
              You&apos;ve read the challenge.
              <br />
              <em className="italic text-accent">Now experience the pressure.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-ink-soft">
              Step into a simplified practice view and decide which clients are
              ready to submit and which need attention.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              This takes around 30 seconds.
            </p>
          </div>
        </Container>

        {/* ── Product window — forced Dext light-mode regardless of OS preference ── */}
        <div
          ref={windowRef}
          className="full-bleed"
          style={{
            ...(LIGHT as React.CSSProperties),
            backgroundColor: "var(--paper)",
            color: "var(--ink)",
            borderTop: "1px solid var(--rule-strong)",
            borderBottom: "1px solid var(--rule-strong)",
            position: "relative",
            marginTop: "2.5rem",
          }}
        >
        {/* Card layer — dims (but stays readable) when overlay is active */}
        <div
          style={{
            opacity: revealed ? 0.42 : 1,
            pointerEvents: revealed ? "none" : "auto",
            userSelect: revealed ? "none" : undefined,
            transition: "opacity 0.45s ease",
          }}
        >
          {/* Browser chrome header */}
          <div
            style={{
              backgroundColor: "var(--paper-sunk)",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <div
              style={{
                maxWidth: 1248,
                margin: "0 auto",
                padding: "0 24px",
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {(["#fc5f57", "#fdbc2c", "#2ac840"] as const).map((c) => (
                    <span
                      key={c}
                      aria-hidden="true"
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: c,
                        display: "block",
                      }}
                    />
                  ))}
                </div>
                <span style={{ ...monoStyle, color: "var(--ink-muted)" }}>
                  MTD Dashboard · Practice View
                </span>
              </div>
              {clients.length > 0 && (
                <span style={{ ...monoStyle, color: "var(--ink-faint)" }}>
                  {clients.length} clients
                </span>
              )}
            </div>
          </div>

          {/* Classification progress bar */}
          <div
            style={{ height: 2, backgroundColor: "var(--rule)" }}
            role="progressbar"
            aria-valuenow={classifiedCount}
            aria-valuemin={0}
            aria-valuemax={clients.length || 6}
            aria-label="Classification progress"
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "var(--accent)",
                width: `${clients.length > 0 ? (classifiedCount / clients.length) * 100 : 0}%`,
                transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>

          {/* Card grid */}
          <div style={{ maxWidth: 1248, margin: "0 auto", padding: "28px 24px" }}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {phase === "loading"
                ? [...Array(6)].map((_, i) => <CardSkeleton key={i} index={i} />)
                : clients.map((client, idx) => (
                    <ClientCard
                      key={client.id}
                      client={client}
                      choice={choices[client.id]}
                      onChoose={(c) => handleChoose(client.id, c)}
                      revealed={revealed}
                      index={idx}
                      visible={cardVisible[idx] ?? false}
                    />
                  ))}
            </div>
          </div>

          {/* Footer bar */}
          <div
            style={{
              backgroundColor: "var(--paper-sunk)",
              borderTop: "1px solid var(--rule)",
            }}
          >
            <div
              style={{
                maxWidth: 1248,
                margin: "0 auto",
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                minHeight: 52,
              }}
            >
              <span style={{ ...monoStyle, color: "var(--ink-faint)" }}>
                {clients.length > 0
                  ? `${classifiedCount} of ${clients.length} classified`
                  : "Loading…"}
              </span>
              {allClassified && phase === "review" && (
                <button
                  type="button"
                  onClick={handleCheckAnswers}
                  style={{
                    backgroundColor: "var(--ink)",
                    color: "var(--paper)",
                    border: "1px solid var(--ink)",
                    padding: "9px 28px",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                  }}
                >
                  Check Answers
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Overlay — Decision Summary panel */}
        {revealed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "60px 24px 48px",
            }}
          >
            {/* Subtle tint so panel reads as foreground */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(245, 242, 236, 0.5)",
              }}
            />

            {/* Summary panel */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                maxWidth: 560,
                backgroundColor: "var(--paper-raised)",
                border: "1px solid var(--rule-strong)",
                boxShadow: "0 24px 64px -20px rgba(0,0,0,0.18)",
                opacity: summaryVisible ? 1 : 0,
                transform: summaryVisible ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s 0.06s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Panel label */}
              <div
                style={{
                  padding: "18px 28px 16px",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <span style={{ ...monoStyle, color: "var(--accent)" }}>
                  Decision Summary
                </span>
              </div>

              {/* Metrics */}
              <dl
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1px",
                  backgroundColor: "var(--rule)",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <div style={{ backgroundColor: "var(--paper-raised)", padding: "20px 20px 22px" }}>
                  <dt
                    style={{
                      fontFamily: "var(--font-display, Georgia, serif)",
                      fontVariationSettings: '"opsz" 36',
                      letterSpacing: "-0.018em",
                      lineHeight: 1,
                      fontSize: "2.25rem",
                      fontVariantNumeric: "tabular-nums",
                      color: correctCount === clients.length ? "var(--success)" : "var(--accent)",
                    }}
                  >
                    {correctCount}/{clients.length}
                  </dt>
                  <dd style={{ marginTop: 8, fontSize: "0.75rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                    Correctly classified
                  </dd>
                </div>
                <div style={{ backgroundColor: "var(--paper-raised)", padding: "20px 20px 22px" }}>
                  <dt
                    style={{
                      fontFamily: "var(--font-display, Georgia, serif)",
                      fontVariationSettings: '"opsz" 36',
                      letterSpacing: "-0.018em",
                      lineHeight: 1,
                      fontSize: "2.25rem",
                      fontVariantNumeric: "tabular-nums",
                      color: "var(--ink)",
                    }}
                  >
                    {timeTakenRef.current}s
                  </dt>
                  <dd style={{ marginTop: 8, fontSize: "0.75rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                    Time taken
                  </dd>
                </div>
                <div style={{ backgroundColor: "var(--paper-raised)", padding: "20px 20px 22px" }}>
                  <dt
                    style={{
                      fontFamily: "var(--font-display, Georgia, serif)",
                      fontVariationSettings: '"opsz" 36',
                      letterSpacing: "-0.018em",
                      lineHeight: 1.35,
                      fontSize: "0.9375rem",
                      color: "var(--ink)",
                      maxWidth: "18ch",
                    }}
                  >
                    {missedIssueLabel}
                  </dt>
                  <dd style={{ marginTop: 8, fontSize: "0.75rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                    {missedIssues.length === 0 ? "No issues missed" : "Missed issue"}
                  </dd>
                </div>
              </dl>

              {/* Body */}
              <div style={{ padding: "24px 28px 28px" }}>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: "46ch" }}>
                  This challenge had six businesses.{" "}
                  <span style={{ color: "var(--ink)" }}>
                    Many accountants manage hundreds — or thousands — of quarterly submissions.
                  </span>
                </p>

                <div style={{ marginTop: 20, paddingLeft: 16, borderLeft: "2px solid var(--rule-strong)" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-display, Georgia, serif)",
                      fontVariationSettings: '"opsz" 36',
                      letterSpacing: "-0.018em",
                      fontSize: "1.0625rem",
                      lineHeight: 1.45,
                      color: "var(--ink)",
                      maxWidth: "30ch",
                    }}
                  >
                    Great product design helps users notice what matters first.
                  </p>
                </div>

                {/* ── Insight bridge ── */}
                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 20,
                    borderTop: "1px solid var(--rule)",
                    opacity: completionVisible ? 1 : 0,
                    transform: completionVisible ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s 0.06s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <span style={{ ...monoStyle, color: "var(--success)", display: "block", marginBottom: 10 }}>
                    ✓ Insight unlocked
                  </span>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: "40ch" }}>
                    You&apos;ve experienced the pressure of deciding where to focus first.
                  </p>
                  <p style={{ marginTop: 6, fontSize: "0.875rem", lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: "40ch" }}>
                    The rest of this case study shows how those decisions shaped the dashboard.
                  </p>
                  <button
                    type="button"
                    onClick={handleContinue}
                    style={{
                      marginTop: 18,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "0.8125rem",
                      letterSpacing: "0.03em",
                      fontWeight: 500,
                      color: "var(--ink)",
                    }}
                  >
                    Continue reading <span aria-hidden="true">↓</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
        </div>
    </section>
  );
}
