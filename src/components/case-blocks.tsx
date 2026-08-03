import type { Block, Figure as FigureType } from "@/content/types";
import { Container, Label } from "./primitives";
import { AssetImage } from "./asset-image";
import { Reveal } from "./reveal";

/**
 * Section chrome shared by every block: a monospace label in the left margin
 * on wide screens, content on the main measure.
 */
function Section({
  label,
  heading,
  children,
}: {
  label?: string;
  heading?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="grid gap-x-12 gap-y-5 lg:grid-cols-[10rem_minmax(0,1fr)]">
      <div className="lg:pt-2">{label ? <Label>{label}</Label> : null}</div>
      <div>
        {heading ? (
          <h2 className="display mb-5 text-balance text-2xl sm:text-[1.75rem]">{heading}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-3">
      <Label muted>{children}</Label>
    </figcaption>
  );
}

/** A framed figure on the measure/grid — hairline border, retained caption. */
function Figure({
  figure,
  sizes,
  priority = false,
}: {
  figure: FigureType;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className="overflow-hidden border border-rule bg-paper-raised">
        <AssetImage
          src={figure.src}
          alt={figure.alt}
          dims={figure.dims}
          sizes={sizes}
          priority={priority || figure.priority}
        />
      </div>
      {figure.caption ? <Caption>{figure.caption}</Caption> : null}
    </figure>
  );
}

/**
 * One screen in a vertical journey. The `anchor` step is the climax: larger,
 * framed with more presence, and lifted into view. Supporting steps are shown
 * at full height — no height cap, no fade — so the complete mobile screen is
 * always visible.
 */
function SequenceStep({
  step,
}: {
  step: { label: string; figure: FigureType; anchor?: boolean };
}) {
  const anchor = step.anchor;
  const cls = `mx-auto w-full ${anchor ? "max-w-sm" : "max-w-[22rem]"}`;
  const inner = (
    <>
      <div
        className={`overflow-hidden bg-paper-raised ${
          anchor
            ? "border border-rule-strong shadow-[0_20px_60px_-26px_rgba(0,0,0,0.45)]"
            : "border border-rule"
        }`}
      >
        <AssetImage
          src={step.figure.src}
          alt={step.figure.alt}
          dims={step.figure.dims}
          sizes={anchor ? "24rem" : "22rem"}
        />
      </div>
      <figcaption className="mt-3 text-center">
        <Label muted={!anchor}>{step.label}</Label>
      </figcaption>
    </>
  );
  return anchor ? (
    <Reveal as="figure" className={cls}>
      {inner}
    </Reveal>
  ) : (
    <figure className={cls}>{inner}</figure>
  );
}

function Prose({ body }: { body: string[] }) {
  return (
    <div className="prose-case">
      {body.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

/**
 * One row of a before/after journey: a labelled sequence of steps joined by
 * arrows. `muted` de-emphasises the "before"; `highlightFrom` accents the new
 * behaviour in the "after"; `loops` appends a filled marker showing it repeats.
 */
function FlowRow({
  label,
  steps,
  muted = false,
  highlightFrom,
  loops = false,
  nowrap = false,
}: {
  label: string;
  steps: string[];
  muted?: boolean;
  highlightFrom?: number;
  loops?: boolean;
  nowrap?: boolean;
}) {
  const isNew = (i: number) => highlightFrom != null && i >= highlightFrom;
  return (
    <div>
      <Label muted={muted}>{label}</Label>
      <ol className={`mt-3.5 flex ${nowrap ? "flex-nowrap" : "flex-wrap"} items-center gap-x-2 gap-y-2.5`}>
        {steps.map((step, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span
              className={`inline-flex whitespace-nowrap border px-5 py-3 text-base ${
                muted
                  ? "border-rule text-ink-muted"
                  : isNew(i)
                    ? "border-accent text-accent"
                    : "border-rule-strong text-ink"
              }`}
            >
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={`text-lg ${muted || !isNew(i + 1) ? "text-ink-faint" : "text-accent"}`}
              >
                →
              </span>
            ) : null}
          </li>
        ))}
        {loops ? (
          <li className="flex items-center gap-2.5">
            <span aria-hidden="true" className="text-lg text-accent">
              →
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-accent px-5 py-3 text-base text-paper">
              and again
              <span aria-hidden="true">↻</span>
            </span>
          </li>
        ) : null}
      </ol>
    </div>
  );
}

export function CaseBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <Container>
          <Section label={block.label} heading={block.heading}>
            <Prose body={block.body} />
          </Section>
        </Container>
      );

    case "list":
      return (
        <Container>
          <Section label={block.label} heading={block.heading}>
            {block.body ? <Prose body={block.body} /> : null}
            <ul
              className={`${block.body ? "mt-6" : ""} max-w-[64ch] space-y-0 border-t border-rule`}
            >
              {block.items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 border-b border-rule py-3.5 text-ink-soft"
                >
                  <span className="label label-muted tnum mt-1 shrink-0">
                    {block.style === "numbered"
                      ? String(i + 1).padStart(2, "0")
                      : "—"}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        </Container>
      );

    case "figures": {
      const single = block.figures.length === 1 ? block.figures[0] : null;
      const intro = Boolean(block.label || block.heading || block.body);
      const Intro = intro ? (
        <Container>
          <Section label={block.label} heading={block.heading}>
            {block.body ? <Prose body={block.body} /> : null}
          </Section>
        </Container>
      ) : null;

      // True full-viewport bleed — an editorial, hero-scale artefact. The image
      // breaks every gutter; its caption returns to the reading measure.
      if (single && single.width === "full") {
        return (
          <>
            {Intro}
            <figure className={intro ? "mt-8" : ""}>
              <div className="full-bleed">
                <AssetImage
                  src={single.src}
                  alt={single.alt}
                  dims={single.dims}
                  sizes="100vw"
                  priority={single.priority}
                />
              </div>
              {single.caption ? (
                <Container className="mt-4">
                  <Caption>{single.caption}</Caption>
                </Container>
              ) : null}
            </figure>
          </>
        );
      }

      // Asymmetric right-bleed — the image runs off the right edge while its
      // left stays on the measure. Deliberate imbalance, not a centred frame.
      if (single && single.width === "bleed-right") {
        return (
          <>
            {Intro}
            <Container className={intro ? "mt-8" : ""}>
              <figure>
                <div className="bleed-right overflow-hidden border-y border-rule bg-paper-raised sm:border sm:border-r-0">
                  <AssetImage
                    src={single.src}
                    alt={single.alt}
                    dims={single.dims}
                    sizes="(min-width: 1024px) 82vw, 100vw"
                  />
                </div>
                {single.caption ? <Caption>{single.caption}</Caption> : null}
              </figure>
            </Container>
          </>
        );
      }

      const bleed = block.figures.some((f) => f.width === "bleed");
      const pair = block.figures.length > 1;
      return (
        <>
          {Intro}
          <Container
            size={bleed ? "wide" : "default"}
            className={intro ? "mt-8" : ""}
          >
            <div
              className={`grid gap-6 ${pair ? "sm:grid-cols-2" : ""} ${
                single && single.width === "column" ? "mx-auto max-w-md" : ""
              }`}
            >
              {block.figures.map((figure, i) => (
                <Figure
                  key={i}
                  figure={figure}
                  sizes={pair ? "(min-width: 640px) 40rem, 100vw" : undefined}
                />
              ))}
            </div>
          </Container>
        </>
      );
    }

    case "imagePair": {
      const quiet = block.scale === "quiet";
      const bleed = block.bleed;
      const intro = Boolean(block.label || block.heading || block.body);
      const pairInner = (
        <div className={quiet && !bleed ? "mx-auto max-w-4xl" : ""}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-12 sm:gap-y-0">
            <figure
              className={`sm:row-start-1 sm:self-end ${
                quiet
                  ? "sm:col-span-7 sm:col-start-1"
                  : "sm:col-span-8 sm:col-start-1"
              }`}
            >
              <div className={`overflow-hidden bg-paper-raised${block.noBorder ? "" : " border border-rule"}`}>
                <AssetImage
                  src={block.primary.src}
                  alt={block.primary.alt}
                  dims={block.primary.dims}
                  sizes={
                    bleed
                      ? "(min-width: 640px) 66vw, 100vw"
                      : quiet
                        ? "(min-width: 640px) 32rem, 100vw"
                        : "(min-width: 640px) 44rem, 100vw"
                  }
                />
              </div>
              {block.primary.caption ? (
                <Caption>{block.primary.caption}</Caption>
              ) : null}
            </figure>
            <figure
              className={`relative z-10 mt-0 sm:row-start-1 sm:self-start ${
                quiet
                  ? "sm:col-span-6 sm:col-start-7"
                  : "sm:col-span-5 sm:col-start-8"
              }`}
            >
              <div className={`overflow-hidden bg-paper-raised${block.noBorder ? "" : " border border-rule"} shadow-[0_16px_50px_-18px_rgba(0,0,0,0.35)]`}>
                <AssetImage
                  src={block.secondary.src}
                  alt={block.secondary.alt}
                  dims={block.secondary.dims}
                  sizes={
                    bleed
                      ? "(min-width: 640px) 42vw, 100vw"
                      : quiet
                        ? "(min-width: 640px) 26rem, 100vw"
                        : "(min-width: 640px) 28rem, 100vw"
                  }
                />
              </div>
              {block.secondary.caption ? (
                <Caption>{block.secondary.caption}</Caption>
              ) : null}
            </figure>
          </div>
        </div>
      );
      return (
        <>
          {intro ? (
            <Container>
              <Section label={block.label} heading={block.heading}>
                {block.body ? <Prose body={block.body} /> : null}
              </Section>
            </Container>
          ) : null}
          {bleed ? (
            <div className={`full-bleed px-6 sm:px-10 lg:px-16 ${intro ? "mt-10" : ""}`}>
              {pairInner}
            </div>
          ) : (
            <Container className={intro ? "mt-10" : ""}>
              {pairInner}
            </Container>
          )}
        </>
      );
    }

    case "imageSequence":
      return (
        <Container>
          <Section label={block.label} heading={block.heading}>
            {block.body ? <Prose body={block.body} /> : null}
            <ol className={block.body || block.heading ? "mt-10" : ""}>
              {block.steps.map((step, i) => (
                <li key={i} className="text-center">
                  <SequenceStep step={step} />
                  {i < block.steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="my-8 inline-block text-5xl leading-none text-accent"
                    >
                      ↓
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </Section>
        </Container>
      );

    case "callout":
      return (
        <Container>
          <Section label={block.label}>
            <div className="border-l-2 border-accent bg-accent-soft/40 py-5 pl-6 pr-6">
              <div className="prose-case [&>p]:text-ink">
                {block.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Section>
        </Container>
      );

    case "statement":
      return (
        <Container>
          <Section label={block.label}>
            <p className="display max-w-[26ch] text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]">
              {block.body}
            </p>
          </Section>
        </Container>
      );

    case "flow":
      return (
        <Container>
          <Section label={block.label} heading={block.heading}>
            <div className="mt-1 space-y-9">
              <FlowRow
                label={block.before.label}
                steps={block.before.steps}
                muted
              />
              <FlowRow
                label={block.after.label}
                steps={block.after.steps}
                highlightFrom={block.after.highlightFrom}
                loops={block.after.loops}
                nowrap
              />
            </div>
          </Section>
        </Container>
      );

    case "reframe":
      return (
        <Container>
          <Section label={block.label}>
            <div className="max-w-[52ch]">
              <div className="border-t border-rule pt-6">
                <Label muted>{block.from.label}</Label>
                <p className="display mt-3 text-xl leading-snug text-ink-muted sm:text-2xl">
                  “{block.from.body}”
                </p>
              </div>
              <div className="flex items-center gap-4 py-6" aria-hidden="true">
                <span className="text-2xl leading-none text-accent">↓</span>
                <span className="h-px flex-1 bg-rule" />
              </div>
              <div className="border-l-2 border-accent pl-5 sm:pl-6">
                <Label>{block.to.label}</Label>
                <p className="display mt-3 text-2xl leading-snug text-ink sm:text-[1.875rem]">
                  “{block.to.body}”
                </p>
              </div>
            </div>
          </Section>
        </Container>
      );

    case "quote":
      return (
        <Container size="narrow">
          <blockquote className="border-t border-b border-rule py-10 text-center">
            <p className="display text-balance text-2xl sm:text-3xl">“{block.body}”</p>
            {block.attribution ? (
              <footer className="mt-5">
                <Label muted>{block.attribution}</Label>
              </footer>
            ) : null}
          </blockquote>
        </Container>
      );

    case "metrics":
      return (
        <Container>
          <Section label={block.label} heading={block.heading}>
            {block.body ? <Prose body={block.body} /> : null}
            <dl
              className={`${block.body ? "mt-8" : ""} grid gap-px overflow-hidden border border-rule bg-rule ${
                block.metrics.length % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2"
              }`}
            >
              {block.metrics.map((metric, i) => (
                <div key={i} className="bg-paper-raised px-6 py-7">
                  <dt className="display tnum flex items-baseline gap-1.5 text-4xl text-accent">
                    {metric.direction ? (
                      <span aria-hidden="true" className="text-2xl">
                        {metric.direction === "up" ? "↑" : "↓"}
                      </span>
                    ) : null}
                    {metric.value}
                  </dt>
                  <dd className="mt-2 text-sm text-ink-muted">{metric.caption}</dd>
                </div>
              ))}
            </dl>
          </Section>
        </Container>
      );

    case "comparison":
      return (
        <Container>
          <Section label={block.label} heading={block.heading}>
            {block.body ? <Prose body={block.body} /> : null}
            <div className={`${block.body ? "mt-8" : ""} overflow-x-auto`}>
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr>
                    {block.columns.map((col, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="label label-muted border-b border-rule pb-3 pr-8 align-bottom font-normal"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-rule align-top">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={
                            ci === 0
                              ? "display py-5 pr-8 text-lg text-ink sm:text-xl"
                              : "py-5 pr-8 leading-relaxed text-ink-soft"
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </Container>
      );

    case "cards":
      return (
        <Container>
          <Section label={block.label} heading={block.heading}>
            {block.numbered && block.body ? <Prose body={block.body} /> : null}
            {block.numbered ? (
              <ol className={`${block.body ? "mt-8" : ""} border-t border-rule`}>
                {block.cards.map((card, i) => (
                  <li
                    key={i}
                    className="grid gap-x-6 gap-y-2 border-b border-rule py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)]"
                  >
                    <span
                      aria-hidden="true"
                      className="display tnum text-3xl leading-none text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="display text-xl sm:text-[1.375rem]">{card.title}</h3>
                      {card.body ? (
                        <p className="mt-2.5 max-w-[60ch] leading-relaxed text-ink-soft">
                          {card.body}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <>
                <div className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2">
                  {block.cards.map((card, i) => (
                    <div key={i} className="bg-paper-raised px-6 py-7">
                      <h3 className="text-[0.9375rem] font-medium text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.body}</p>
                    </div>
                  ))}
                </div>
                {block.body ? (
                  <div className="mt-8">
                    <Prose body={block.body} />
                  </div>
                ) : null}
              </>
            )}
          </Section>
        </Container>
      );
  }
}
