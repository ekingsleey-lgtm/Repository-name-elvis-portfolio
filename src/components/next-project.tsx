import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { Container, Label, Rule } from "@/components/primitives";

/**
 * End-of-article completion treatment. Placed after the reflection section.
 * Shows a "Finished reading" marker and surfaces the next case study.
 */
export function NextProject({ next }: { next: CaseStudy }) {
  return (
    <Container className="mt-24 lg:mt-32">
      <Rule />
      <div className="mt-10 lg:mt-12">
        <Label muted>✓ Finished reading</Label>

        <div className="mt-8 border-t border-rule pt-8">
          <Label muted>Next project</Label>

          <Link
            href={`/work/${next.slug}`}
            className="group mt-4 block focus-visible:outline-none"
            aria-label={`Next project: ${next.title}`}
          >
            <h2 className="display max-w-[28ch] text-balance text-2xl leading-tight transition-colors duration-150 group-hover:text-accent group-focus-visible:text-accent sm:text-3xl">
              {next.title}
            </h2>

            {next.subtitle && (
              <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-ink-muted">
                {next.subtitle}
              </p>
            )}

            <span className="mt-5 inline-flex items-center gap-2 text-sm text-ink-soft transition-colors duration-150 group-hover:text-accent group-focus-visible:text-accent">
              View case study
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
