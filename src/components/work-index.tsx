import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Label, Tag } from "./primitives";
import type { CaseStudy } from "@/content/types";

export function WorkIndex({ studies, cols = 2 }: { studies: CaseStudy[]; cols?: 2 | 3 }) {
  const gridClass = cols === 3
    ? "grid gap-x-8 gap-y-12 sm:grid-cols-3"
    : "grid gap-x-8 gap-y-12 sm:grid-cols-2";
  const sizes = cols === 3
    ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
    : "(min-width: 1024px) 50vw, 100vw";
  return (
    <ul className={gridClass}>
      {studies.map((study) => (
        <li key={study.slug}>
          <Link href={`/work/${study.slug}`} className="group block">
            {(study.thumbnail ?? study.cover) ? (
              <div className="relative aspect-[3/2] overflow-hidden border border-rule bg-paper-raised">
                <Image
                  src={(study.thumbnail ?? study.cover)!.src}
                  alt={(study.thumbnail ?? study.cover)!.alt}
                  fill
                  sizes={sizes}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            ) : null}

            <div className="mt-5">
              <div className="flex items-center gap-3">
                <span className="label tnum">{study.index}</span>
                <span className="h-px flex-1 bg-rule" aria-hidden="true" />
              </div>

              <h3 className="display mt-3 text-balance text-xl transition-colors group-hover:text-accent sm:text-2xl">
                {study.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <span className="mt-5 inline-flex items-center gap-2 text-sm text-ink-soft">
                Read case study
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

type MetaRow = { key: string; term: string; content: React.ReactNode };

export function StudyMeta({
  study,
  readTimeContent,
}: {
  study: CaseStudy;
  /** Pass a <ReadingTimeStatus> client node here so StudyMeta stays server-rendered. */
  readTimeContent?: React.ReactNode;
}) {
  const rows: MetaRow[] = [
    { key: "role", term: "Role", content: study.role },
    ...(study.period
      ? [{ key: "period", term: "Period", content: study.period }]
      : []),
    ...(readTimeContent
      ? [{ key: "readtime", term: "", content: readTimeContent }]
      : []),
  ];

  const cols = rows.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <dl
      className={`grid gap-px overflow-hidden border border-rule bg-rule ${cols}`}
    >
      {rows.map((row) => (
        <div key={row.key} className="bg-paper-raised px-5 py-4">
          {row.term ? (
            <dt>
              <Label muted>{row.term}</Label>
            </dt>
          ) : null}
          <dd className={`text-sm leading-relaxed text-ink-soft${row.term ? " mt-2" : ""}`}>
            {row.content}
          </dd>
        </div>
      ))}
    </dl>
  );
}
