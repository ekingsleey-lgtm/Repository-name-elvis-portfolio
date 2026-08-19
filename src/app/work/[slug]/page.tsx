import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Label, Rule, Tag } from "@/components/primitives";
import { StudyMeta } from "@/components/work-index";
import { CaseBlock } from "@/components/case-blocks";
import { AssetImage } from "@/components/asset-image";
import { Reveal } from "@/components/reveal";
import { caseStudies, getCaseStudy, getAdjacent } from "@/content/case-studies";
import { KfcHeroComposition } from "@/components/kfc-hero";
import { DextChallenge } from "@/components/dext-challenge";
import { KfcExperience } from "@/components/kfc-experience";
import { TravelexExperience } from "@/components/travelex-experience";
import { GuardianExperience } from "@/components/guardian-experience";
import { ChapterNav } from "@/components/chapter-nav";
import { ReturnLink } from "@/components/return-link";
import { ShareControls } from "@/components/share-controls";
import { ProgressBar } from "@/components/progress-bar";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ReadingTimeStatus } from "@/components/reading-time-status";
import { NextProject } from "@/components/next-project";
import { estimateReadingTime, chapterReadTimes } from "@/lib/reading-time";
import type { Block } from "@/content/types";
import { site } from "@/content/site";

function blockLabel(b: Block): string | undefined {
  return "label" in b ? (b as { label?: string }).label : undefined;
}

function blockHeading(b: Block): string | undefined {
  return "heading" in b ? (b as { heading?: string }).heading : undefined;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const description = study.subtitle ?? site.metaDescription;
  return {
    title: study.title,
    description,
    openGraph: { title: study.title, description },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { prev, next } = getAdjacent(study.slug);
  const readTime = estimateReadingTime(study);

  // Build chapter list augmented with per-chapter read-time estimates
  const rawChapters = study.chapters ?? [];
  const estTimes = rawChapters.length > 0 ? chapterReadTimes(study) : new Map();
  const chapters = rawChapters.map((ch) => ({
    ...ch,
    estMins: estTimes.get(ch.id),
  }));

  // Map from block label → chapter id for anchor injection
  const chaptersMap = new Map(
    chapters
      .filter((ch) => ch.blockLabel !== "_reflection")
      .map((ch) => [ch.blockLabel, ch.id]),
  );
  const hasReflectionChapter = chapters.some(
    (ch) => ch.blockLabel === "_reflection",
  );

  function renderBlocks(blocks: Block[], offsetSpacing = "mt-20 lg:mt-28") {
    return (
      <div className={offsetSpacing}>
        {blocks.map((block, i) => {
          const label = blockLabel(block);
          const chapterId = label ? chaptersMap.get(label) : undefined;
          const startsBeat = label || blockHeading(block);
          const spacing =
            i === 0 ? "" : startsBeat ? "mt-20 lg:mt-24" : "mt-10 lg:mt-12";
          return (
            <div
              key={i}
              id={chapterId}
              className={`${spacing}${chapterId ? " scroll-mt-20" : ""}`}
            >
              <CaseBlock block={block} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <article>
      {/* Reading progress bar — fixed beneath header, tracks article scroll */}
      <ProgressBar caseStudy={study.slug} />

      {/* Chapter nav (fixed — renders outside the flow) */}
      {chapters.length > 0 && <ChapterNav chapters={chapters} />}

      {/* Hero ------------------------------------------------------- */}
      <Container className="py-10 lg:py-24">
        <div className="flex items-center gap-4">
          <Label className="tnum">{study.index}</Label>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <Label muted>{study.role}</Label>
        </div>

        <h1 className="display mt-8 max-w-[20ch] text-balance text-[clamp(2.25rem,5.5vw,4rem)]">
          {study.pageHeading ?? study.title}
        </h1>
        {study.subtitle ? (
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink-soft">
            {study.subtitle}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {study.period ? (
          <div className="mt-8 lg:mt-12">
            <StudyMeta
              study={study}
              readTimeContent={<ReadingTimeStatus readTime={readTime} />}
            />
          </div>
        ) : null}

        {/* Share — near the beginning */}
        <div className="mt-5">
          <ShareControls title={study.title} path={`/work/${study.slug}`} />
        </div>

        {study.heroMetrics ? (
          <dl className="mt-8 grid gap-x-8 gap-y-8 border-t border-rule pt-8 sm:grid-cols-3 lg:mt-12">
            {study.heroMetrics.map((metric) => (
              <div key={metric.caption}>
                <dt className="display tnum text-[clamp(2rem,4vw,3rem)] leading-none text-accent">
                  {metric.value}
                </dt>
                <dd className="mt-3 max-w-[24ch] text-sm leading-relaxed text-ink-muted">
                  {metric.caption}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>

      {study.heroComposition === "kfc-phones" ? (
        <figure>
          <div className="full-bleed">
            <KfcHeroComposition />
          </div>
          {study.cover?.caption ? (
            <Container className="mt-4">
              <figcaption>
                <Label muted>{study.cover.caption}</Label>
              </figcaption>
            </Container>
          ) : null}
        </figure>
      ) : study.cover ? (
        study.cover.width === "full" ? (
          <figure>
            <div className="full-bleed hero-media">
              <AssetImage
                src={study.cover.src}
                alt={study.cover.alt}
                dims={study.cover.dims}
                sizes="100vw"
                priority
              />
            </div>
            {study.cover.caption ? (
              <Container className="mt-4">
                <figcaption>
                  <Label muted>{study.cover.caption}</Label>
                </figcaption>
              </Container>
            ) : null}
          </figure>
        ) : (
          <Container size="wide">
            <div className="overflow-hidden border border-rule bg-paper-raised">
              <AssetImage
                src={study.cover.src}
                alt={study.cover.alt}
                dims={study.cover.dims}
                priority
              />
            </div>
          </Container>
        )
      ) : null}

      {/* Body ------------------------------------------------------- */}
      {(() => {
        // Split the block list so the interactive experience sits between
        // Delivery and Impact — the emotional climax of the narrative arc.
        const splitLabel = study.interactiveSplitBefore;
        const splitIdx = splitLabel
          ? study.blocks.findIndex((b) => blockLabel(b) === splitLabel)
          : -1;
        const hasExperience = splitIdx >= 0;

        const beforeBlocks = hasExperience
          ? study.blocks.slice(0, splitIdx)
          : study.blocks;
        const afterBlocks = hasExperience ? study.blocks.slice(splitIdx) : [];

        return (
          <>
            {/* Blocks before the interactive experience */}
            {renderBlocks(beforeBlocks)}

            {/* Interactive experience — narrative climax */}
            {study.slug === "kfc" ? <KfcExperience /> : null}
            {study.slug === "dext" ? <DextChallenge /> : null}
            {study.slug === "travelex" ? <TravelexExperience /> : null}
            {study.slug === "guardian" ? <GuardianExperience /> : null}

            {/* Bridge from experience to Impact */}
            {hasExperience && study.slug === "kfc" && (
              <Reveal>
                <Container className="mt-24 lg:mt-32">
                  <div className="mx-auto max-w-[52ch] text-center">
                    <h2 className="display text-balance text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]">
                      Now imagine this behaviour repeated across thousands of
                      customers.
                    </h2>
                    <p className="mt-5 leading-relaxed text-ink-soft">
                      The interaction you just experienced represents a single
                      customer journey. After launch, this behavioural loop
                      helped increase engagement, encourage new customer
                      acquisition and strengthen long-term loyalty.
                    </p>
                    <p className="mt-3 text-sm text-ink-muted">
                      Here&apos;s what happened when the feature reached real
                      customers.
                    </p>
                  </div>
                </Container>
              </Reveal>
            )}

            {hasExperience && study.slug === "travelex" && (
              <Reveal>
                <Container className="mt-24 lg:mt-32">
                  <div className="mx-auto max-w-[52ch] text-center">
                    <h2 className="display text-balance text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]">
                      With a shared model established, the programme could
                      finally begin.
                    </h2>
                    <p className="mt-5 leading-relaxed text-ink-soft">
                      The service blueprint didn&apos;t resolve the
                      disagreements — it located them. Once every team could
                      point to the same document, decisions that had been stuck
                      became unstuck.
                    </p>
                    <p className="mt-3 text-sm text-ink-muted">
                      Here&apos;s how the delivery was structured.
                    </p>
                  </div>
                </Container>
              </Reveal>
            )}


            {/* Contextual return link — only shown when arriving via ?from= param */}
            {hasExperience && (
              <Container className="mt-8">
                <Suspense fallback={null}>
                  <ReturnLink />
                </Suspense>
              </Container>
            )}

            {/* Blocks after the interactive experience (Impact, Reflection lead-in…) */}
            {afterBlocks.length > 0 && renderBlocks(afterBlocks, "mt-16 lg:mt-20")}
          </>
        );
      })()}

      {/* Reflection ------------------------------------------------- */}
      <section
        id={hasReflectionChapter ? "reflection" : undefined}
        className={hasReflectionChapter ? "scroll-mt-20" : undefined}
      >
        {study.reflection ? (
          <Container className="mt-24 lg:mt-32">
            <Rule className="mb-12" />
            <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[10rem_minmax(0,1fr)]">
              <div className="lg:pt-2">
                <Label>Reflection</Label>
              </div>
              <div>
                <h2 className="display max-w-[24ch] text-balance text-3xl sm:text-4xl">
                  {study.reflection.heading}
                </h2>
                <div className="prose-case mt-6">
                  {study.reflection.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        ) : null}
      </section>

      {/* Completion + next project ---------------------------------- */}
      {next && <NextProject next={next} />}

      {/* What's next ----------------------------------------------- */}
      <Container className="mt-16 lg:mt-20">
        <div className="flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <p className="text-sm text-ink-soft">Want to work together?</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* Share — near the end */}
            <ShareControls title={study.title} path={`/work/${study.slug}`} />
            <TrackedLink
              href={`mailto:${site.email}`}
              event="email_clicked"
              className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {site.email}
            </TrackedLink>
            <TrackedLink
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              event="linkedin_clicked"
              className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
            >
              LinkedIn
            </TrackedLink>
            <TrackedLink
              href={site.cv}
              download=""
              event="cv_downloaded"
              className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-sm text-paper transition-colors duration-300 hover:bg-accent"
            >
              Download CV
            </TrackedLink>
          </div>
        </div>
      </Container>

      {/* Previous -------------------------------------------------- */}
      <Container className="mt-16 lg:mt-20">
        {prev ? (
          <div className="overflow-hidden border border-rule">
            <Link
              href={`/work/${prev.slug}`}
              className="group block bg-paper-raised px-6 py-8 transition-colors hover:bg-paper-sunk"
            >
              <Label muted>← Previous</Label>
              <h2 className="display mt-3 text-xl transition-colors group-hover:text-accent">
                {prev.title}
              </h2>
            </Link>
          </div>
        ) : null}

        <div className={prev ? "mt-10 text-center" : "text-center"}>
          <Link
            href="/work"
            className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
          >
            Back to all work
          </Link>
        </div>
      </Container>

      {/* Bottom padding so the chapter bar doesn't obscure content */}
      {chapters.length > 0 && <div className="h-14 min-[1400px]:hidden" aria-hidden="true" />}
    </article>
  );
}
