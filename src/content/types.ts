/**
 * Content model for case studies.
 *
 * A case study is an ordered list of blocks. Adding a new study means adding
 * a data file in `src/content/case-studies/` and registering it in `index.ts` —
 * no changes to the page template.
 */

export type Figure = {
  /** Path under /public, e.g. "/work/guardian/nav-concepts.png" */
  src: string;
  alt: string;
  caption?: string;
  /**
   * How wide the figure sits. `column` is the reading measure; `wide` breaks
   * to the wide container; `bleed` fills the wide container edge-to-edge;
   * `bleed-right` runs off the right viewport edge while its left stays on the
   * measure (deliberate asymmetry); `full` breaks the whole viewport.
   */
  width?: "column" | "wide" | "bleed" | "bleed-right" | "full";
  /**
   * Intrinsic pixel size, so next/image reserves the correct aspect ratio and
   * never distorts portrait screens or ultra-wide artefacts. Omit to fall back
   * to a neutral 3:2.
   */
  dims?: { w: number; h: number };
  /** LCP hint — set on the hero image so it isn't lazy-loaded. */
  priority?: boolean;
};

export type Block =
  | { type: "prose"; label?: string; heading?: string; body: string[] }
  | {
      type: "list";
      label?: string;
      heading?: string;
      /** Intro paragraphs shown above the list. */
      body?: string[];
      items: string[];
      /** "bullet" for unordered, "numbered" for a sequence. */
      style?: "bullet" | "numbered";
    }
  | { type: "figures"; label?: string; heading?: string; body?: string[]; figures: Figure[] }
  /**
   * An intentionally asymmetric diptych — two figures at different scales with
   * a vertical offset, never a 50/50 grid. Reads as one composition (e.g. an
   * annotated wireframe resolving into the shipped screen). `primary` is the
   * larger, lower anchor; `secondary` steps up and in beside it.
   */
  | {
      type: "imagePair";
      label?: string;
      heading?: string;
      body?: string[];
      primary: Figure;
      secondary: Figure;
      /** "quiet" renders the pair smaller — a restrained proof beat, not a hero. */
      scale?: "default" | "quiet";
      /** When true, the image pair breaks out to the full viewport width. */
      bleed?: boolean;
      /** When true, suppresses the hairline border frame around each image. */
      noBorder?: boolean;
    }
  /**
   * A vertical, image-driven journey: ordered steps joined by downward
   * connectors, with one step marked `anchor` and rendered larger — the visual
   * climax of the sequence. Built to be read top-to-bottom on any width.
   */
  | {
      type: "imageSequence";
      label?: string;
      heading?: string;
      body?: string[];
      steps: { label: string; figure: Figure; anchor?: boolean }[];
    }
  | { type: "callout"; label?: string; body: string[] }
  | { type: "quote"; body: string; attribution?: string }
  /**
   * A full-measure pull-statement in the display serif — used for a strategic
   * reframe or thesis. Distinct from `quote` (centred, quotation marks): a
   * `statement` reads as the page's own argument, left-aligned on the measure.
   */
  | { type: "statement"; label?: string; body: string }
  /**
   * A before/after behavioural journey. Two stacked sequences whose contrast
   * carries the story on its own: the "before" reads muted and simply stops;
   * the "after" highlights the new behaviour from `highlightFrom` onward and,
   * when `loops`, closes with a marker showing the sequence repeats — a line
   * becoming a habit loop. Built to be understood in seconds, without prose.
   */
  | {
      type: "flow";
      label?: string;
      heading?: string;
      before: { label: string; steps: string[] };
      after: { label: string; steps: string[]; highlightFrom?: number; loops?: boolean };
    }
  /**
   * A before/after problem reframe: the old question, de-emphasised, resolving
   * into the new one. Makes a project's turning point legible at a glance —
   * the contribution was reframing the problem, not just designing a screen.
   */
  | {
      type: "reframe";
      label?: string;
      from: { label: string; body: string };
      to: { label: string; body: string };
    }
  | {
      type: "metrics";
      label?: string;
      heading?: string;
      body?: string[];
      metrics: { value: string; caption: string; direction?: "up" | "down" }[];
    }
  /**
   * A matrix rendered as a hairline table — e.g. a stakeholder Team × Focus
   * grid or a competitor contrast. The first column is treated as the row
   * heading (serif); remaining columns are supporting text.
   */
  | {
      type: "comparison";
      label?: string;
      heading?: string;
      body?: string[];
      columns: string[];
      rows: string[][];
    }
  | {
      type: "cards";
      label?: string;
      heading?: string;
      body?: string[];
      cards: { title: string; body: string }[];
      /**
       * When true, cards stack as a numbered editorial sequence (index +
       * sub-heading + prose) instead of the default two-column grid. Used for
       * ordered sets like "the three constraints" where each item carries a
       * full explanation rather than a one-liner.
       */
      numbered?: boolean;
    }
  /**
   * An embedded Figma prototype. Renders an iframe for the interactive
   * prototype with a fallback link for when embedding is restricted.
   */
  | {
      type: "figmaEmbed";
      label?: string;
      heading?: string;
      /** Single paragraph of supporting copy shown above the embed. */
      body?: string;
      /** The Figma proto URL used as the iframe src (clean, with hide-ui=1). */
      embedUrl: string;
      /** Original Figma share URL — used for the fallback open-in-Figma link. */
      fallbackUrl: string;
      /** Short CTA shown beneath the embed, e.g. "TRY THE PROTOTYPE →". */
      cta?: string;
    };

/**
 * Every string here is Elvis's own copy, transcribed from the live site.
 * Nothing in this model is written for him — fields stay absent rather than
 * being filled with substitute wording.
 */
export type CaseStudy = {
  slug: string;
  /** Display index, e.g. "01". Drives the numbered work index. */
  index: string;
  /** Short name used in nav and prev/next, e.g. "Dext". */
  shortTitle: string;
  /** The title as it appears on the work index. */
  title: string;
  /** The study page's own H1, where it differs from the index title. */
  pageHeading?: string;
  /** The line under the H1 on the study page, in his words. */
  subtitle?: string;
  role: string;
  /** e.g. "2024 — 2025" */
  period?: string;
  tags: string[];
  /**
   * Headline outcomes surfaced in the hero masthead. Optional — a study without
   * them keeps the purely typographic hero. Every value is his own reported
   * figure; nothing here is invented.
   */
  heroMetrics?: { value: string; caption: string }[];
  /** Card/hero image. Optional — the template degrades to a typographic hero. */
  cover?: Figure;
  /** Work-index thumbnail only — never rendered on the case study page itself. Falls back to cover when absent. */
  thumbnail?: Pick<Figure, "src" | "alt" | "dims">;
  /**
   * When set, the page renders a purpose-built hero component instead of the
   * cover image. The string is a key matched in the page template.
   * Currently: "kfc-phones"
   */
  heroComposition?: string;
  blocks: Block[];
  /** Shown as the closing statement. */
  reflection?: { heading: string; body: string[] };
  /**
   * When set, the interactive experience is inserted before the block with
   * this label rather than after the reflection. Drives the narrative arc:
   * Delivery → Experience → Impact → Reflection.
   */
  interactiveSplitBefore?: string;
  /**
   * Named chapters for the sticky chapter nav and deep-link anchors.
   * `blockLabel` matches the `label` field on the first block of that chapter.
   * The special value "_reflection" anchors to the reflection section.
   * IDs must be stable, URL-safe slugs — changing them breaks shared links.
   */
  chapters?: { id: string; label: string; blockLabel: string }[];
};
