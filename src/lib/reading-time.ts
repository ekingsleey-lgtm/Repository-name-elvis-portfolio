import type { CaseStudy, Block } from "@/content/types";

const WORDS_PER_MIN = 200;

function wc(text: string | undefined | null): number {
  if (!text) return 0;
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function blockLabel(block: Block): string | undefined {
  return "label" in block ? (block as { label?: string }).label : undefined;
}

function blockWords(block: Block): number {
  let words = 0;

  if ("label" in block && block.label) words += wc(block.label);
  if ("heading" in block && block.heading) words += wc(block.heading);

  switch (block.type) {
    case "prose":
      words += block.body.reduce((n, p) => n + wc(p), 0);
      break;

    case "list":
      words += (block.body ?? []).reduce((n, p) => n + wc(p), 0);
      words += block.items.reduce((n, item) => n + wc(item), 0);
      break;

    case "callout":
      words += block.body.reduce((n, p) => n + wc(p), 0);
      break;

    case "statement":
      words += wc(block.body);
      break;

    case "quote":
      words += wc(block.body);
      if (block.attribution) words += wc(block.attribution);
      break;

    case "figures":
      words += (block.body ?? []).reduce((n, p) => n + wc(p), 0);
      block.figures.forEach((f) => {
        if (f.caption) words += wc(f.caption);
        words += wc(f.alt);
      });
      break;

    case "imagePair":
      words += (block.body ?? []).reduce((n, p) => n + wc(p), 0);
      if (block.primary.caption) words += wc(block.primary.caption);
      if (block.secondary.caption) words += wc(block.secondary.caption);
      break;

    case "imageSequence":
      words += (block.body ?? []).reduce((n, p) => n + wc(p), 0);
      block.steps.forEach((s) => {
        words += wc(s.label);
        if (s.figure.caption) words += wc(s.figure.caption);
      });
      break;

    case "cards":
      words += (block.body ?? []).reduce((n, p) => n + wc(p), 0);
      words += block.cards.reduce((n, c) => n + wc(c.title) + wc(c.body), 0);
      break;

    case "comparison":
      words += (block.body ?? []).reduce((n, p) => n + wc(p), 0);
      words += block.columns.reduce((n, c) => n + wc(c), 0);
      words += block.rows.flat().reduce((n, c) => n + wc(c), 0);
      break;

    case "metrics":
      words += (block.body ?? []).reduce((n, p) => n + wc(p), 0);
      words += block.metrics.reduce((n, m) => n + wc(m.value) + wc(m.caption), 0);
      break;

    case "reframe":
      words += wc(block.from.label) + wc(block.from.body);
      words += wc(block.to.label) + wc(block.to.body);
      break;

    case "flow":
      words += block.before.steps.reduce((n, s) => n + wc(s), 0);
      words += block.after.steps.reduce((n, s) => n + wc(s), 0);
      break;
  }

  return words;
}

/** Estimate reading time in whole minutes at 200 wpm. */
export function estimateReadingTime(study: CaseStudy): number {
  let words = 0;

  if (study.pageHeading) words += wc(study.pageHeading);
  if (study.subtitle) words += wc(study.subtitle);
  if (study.title) words += wc(study.title);

  for (const block of study.blocks) {
    words += blockWords(block);
  }

  if (study.reflection) {
    words += wc(study.reflection.heading);
    words += study.reflection.body.reduce((n, p) => n + wc(p), 0);
  }

  return Math.max(1, Math.round(words / WORDS_PER_MIN));
}

/**
 * Per-chapter estimated reading times in minutes, keyed by chapter id.
 * Slices blocks between consecutive chapter anchors; handles the _reflection
 * sentinel chapter by measuring the reflection section directly.
 */
export function chapterReadTimes(study: CaseStudy): Map<string, number> {
  const chapters = study.chapters ?? [];
  const result = new Map<string, number>();

  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const nextCh = chapters[i + 1];

    if (ch.blockLabel === "_reflection") {
      if (study.reflection) {
        let words = wc(study.reflection.heading);
        words += study.reflection.body.reduce((n, p) => n + wc(p), 0);
        result.set(ch.id, Math.max(1, Math.round(words / WORDS_PER_MIN)));
      } else {
        result.set(ch.id, 1);
      }
      continue;
    }

    const startIdx = study.blocks.findIndex(
      (b) => blockLabel(b) === ch.blockLabel,
    );
    if (startIdx === -1) {
      result.set(ch.id, 1);
      continue;
    }

    let endIdx = study.blocks.length;
    if (nextCh && nextCh.blockLabel !== "_reflection") {
      const nextIdx = study.blocks.findIndex(
        (b) => blockLabel(b) === nextCh.blockLabel,
      );
      if (nextIdx !== -1) endIdx = nextIdx;
    }

    const words = study.blocks
      .slice(startIdx, endIdx)
      .reduce((n, b) => n + blockWords(b), 0);
    result.set(ch.id, Math.max(1, Math.round(words / WORDS_PER_MIN)));
  }

  return result;
}
