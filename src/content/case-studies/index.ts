import type { CaseStudy } from "../types";
import { dext } from "./dext";
import { travelex } from "./travelex";
import { kfc } from "./kfc";
import { guardian } from "./guardian";

/** Display order on the work index. */
export const caseStudies: CaseStudy[] = [dext, kfc, travelex, guardian];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** Wraps around, so every study has a next one to go to. */
export function getAdjacent(slug: string) {
  const i = caseStudies.findIndex((study) => study.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];
  return { prev, next };
}
