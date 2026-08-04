import Link from "next/link";
import Image from "next/image";
import { Container, Label, Em } from "@/components/primitives";
import { HeroGameCard } from "@/components/hero-game-card";
import { Reveal } from "@/components/reveal";
import { caseStudies } from "@/content/case-studies";
import { site, stats, approachStatements } from "@/content/site";

export default function Home() {
  const [dext, kfc, travelex, guardian] = caseStudies;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Container>
        <div className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-28">
          <div>
            <Label>{site.role}</Label>
            <h1 className="display mt-6 text-[clamp(2.75rem,8vw,5.5rem)]">
              From <Em>insight</Em>
              <br />
              to impact.
            </h1>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
              {site.tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors duration-300 hover:bg-accent"
              >
                View my work
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                Get in touch
              </a>
            </div>

          </div>

          <div className="relative">
            <HeroGameCard />
          </div>
        </div>
      </Container>

      {/* ── Stats bridge — editorial, not corporate ───────────────────── */}
      <Container>
        <div className="border-t border-rule py-10 sm:py-14 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <Reveal>
              <p className="display max-w-[26ch] text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.18]">
                {site.statsEditorial}
              </p>
            </Reveal>
            <Reveal>
              <dl className="flex items-end gap-10 pb-1 lg:gap-14">
                {stats.map((s) => (
                  <div key={s.caption}>
                    <dt className="display tnum text-5xl lg:text-6xl">{s.value}</dt>
                    <dd className="mt-2 label label-muted">{s.captionShort}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* ── Selected work — four editorial entries, no header ─────────── */}
      <div id="case-studies" className="border-t border-rule">

        {/* 01 — Dext: image-led, enterprise scale */}
        <Reveal className="border-b border-rule">
          <Link href={`/work/${dext.slug}`} className="group block">
            <div className="grid lg:min-h-[500px] lg:grid-cols-[58fr_42fr]">

              {/* Image side */}
              <div className="relative aspect-video overflow-hidden bg-paper-sunk lg:aspect-auto">
                <Image
                  src="/work/dext/hmrc-hero.jpg"
                  alt={dext.cover!.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  priority
                />
              </div>

              {/* Type side */}
              <div className="relative flex flex-col justify-end overflow-hidden p-6 sm:p-8 lg:p-12 xl:p-16">
                <span
                  aria-hidden="true"
                  className="display pointer-events-none absolute -top-2 right-0 hidden select-none text-[10rem] leading-none text-ink opacity-[0.04] lg:block lg:text-[13rem]"
                >
                  {dext.index}
                </span>
                <div className="relative">
                  <Label>{dext.tags[0]}</Label>
                  <h2 className="display mt-4 text-[clamp(1.5rem,2.5vw,2.5rem)] leading-tight">
                    {dext.shortTitle}
                  </h2>
                  <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-ink-soft">
                    {dext.subtitle}
                  </p>
                  {dext.heroMetrics && (
                    <p className="display tnum mt-5 text-2xl text-accent">
                      {dext.heroMetrics[0].value}
                      <span className="ml-2 font-sans text-base font-normal text-ink-muted">
                        {dext.heroMetrics[0].caption}
                      </span>
                    </p>
                  )}
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink-soft">
                    Case study
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* 02 — KFC: type-led, behavioural story */}
        <Reveal className="border-b border-rule">
          <Link href={`/work/${kfc.slug}`} className="group block">
            <div className="grid lg:grid-cols-[42fr_58fr]">

              {/* Type side */}
              <div className="relative flex flex-col justify-center overflow-hidden p-6 sm:p-8 lg:min-h-[460px] lg:p-12 xl:p-16">
                <span
                  aria-hidden="true"
                  className="display pointer-events-none absolute left-6 top-6 hidden select-none text-[9rem] leading-none text-ink opacity-[0.04] lg:block lg:left-10 lg:top-8 lg:text-[12rem]"
                >
                  {kfc.index}
                </span>
                <div className="relative">
                  <Label>{kfc.tags[0]}</Label>
                  <blockquote className="display mt-4 max-w-[28ch] text-[clamp(1.35rem,1.9vw,1.65rem)] italic leading-[1.3]">
                    "Reward Sharing wasn't a feature. It was a new behaviour."
                  </blockquote>
                  <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
                    {kfc.title}
                  </p>
                  {kfc.heroMetrics && (
                    <p className="display tnum mt-4 text-2xl text-accent">
                      {kfc.heroMetrics[0].value}
                      <span className="ml-2 font-sans text-base font-normal text-ink-muted">
                        {kfc.heroMetrics[0].caption}
                      </span>
                    </p>
                  )}
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink-soft">
                    Case study
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >→</span>
                  </span>
                </div>
              </div>

              {/* Image side — appears first on mobile */}
              <div className="relative order-first aspect-video overflow-hidden bg-paper-sunk lg:aspect-auto lg:order-last">
                <Image
                  src="/work/kfc/kfc-hero.jpg"
                  alt={kfc.cover!.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </div>
            </div>
          </Link>
        </Reveal>

        {/* 03 — Travelex: image left, text right */}
        <Reveal className="border-b border-rule">
          <Link href={`/work/${travelex.slug}`} className="group block">
            <div className="grid lg:grid-cols-[58fr_42fr]">

              {/* Image side */}
              <div className="relative aspect-video overflow-hidden bg-paper-sunk lg:aspect-auto lg:min-h-[460px]">
                <Image
                  src="/work/travelex/hero.jpg"
                  alt="Travelex worldwide money branding"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </div>

              {/* Type side */}
              <div className="relative flex flex-col justify-center overflow-hidden bg-paper-sunk p-6 sm:p-8 lg:p-12 xl:p-16">
                <span
                  aria-hidden="true"
                  className="display pointer-events-none absolute bottom-0 right-0 hidden translate-x-4 translate-y-4 select-none text-[10rem] leading-[0.85] text-ink opacity-[0.04] lg:block"
                >
                  {travelex.index}
                </span>
                <div className="relative">
                  <Label>{travelex.tags.join(" · ")}</Label>
                  <h2 className="display mt-4 text-[clamp(1.5rem,2.5vw,2.5rem)] leading-tight">
                    {travelex.shortTitle}
                  </h2>
                  <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-ink-soft">
                    Digital transformation of a cross-border currency platform — restructuring delivery and rebuilding alignment across a complex B2B2C environment.
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink-soft">
                    Case study
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Earlier work divider */}
        <div className="flex items-center gap-6 px-8 py-6 lg:px-12">
          <Label muted>Earlier work</Label>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </div>

        {/* 04 — Guardian: asymmetric, editorial number as pillar + cover image */}
        <Reveal className="border-b border-rule">
          <Link href={`/work/${guardian.slug}`} className="group block">
            <div className="grid lg:grid-cols-[auto_1fr_42fr] lg:items-stretch">

              {/* Giant index — structural pillar on desktop */}
              <div className="hidden items-center justify-center border-r border-rule px-16 lg:flex xl:px-20">
                <span className="display tnum select-none text-[8rem] leading-none text-ink-faint xl:text-[10rem]">
                  {guardian.index}
                </span>
              </div>

              {/* Type side */}
              <div className="p-8 lg:p-12 xl:p-16">
                <div className="flex items-center gap-2 lg:hidden">
                  <Label muted>{guardian.index}</Label>
                  <span className="h-px w-6 bg-rule" aria-hidden="true" />
                </div>
                <Label className="mt-1 lg:mt-0">{guardian.tags.join(" · ")}</Label>
                <h2 className="display mt-4 text-[clamp(1.75rem,3.5vw,3rem)] leading-tight">
                  {guardian.shortTitle}
                </h2>
                <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-ink-soft">
                  {guardian.subtitle}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink-soft">
                  Case study
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >→</span>
                </span>
              </div>

              {/* Image side — hidden on mobile previously, now restored */}
              <div className="relative order-first aspect-video overflow-hidden bg-paper-sunk lg:aspect-auto lg:border-l lg:border-rule lg:order-last">
                <Image
                  src="/work/guardian/guardian-hero.jpg"
                  alt={guardian.cover!.alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </div>
            </div>
          </Link>
        </Reveal>
      </div>

      {/* All work link */}
      <Container className="py-4 sm:py-8">
        <div className="flex justify-end">
          <Link
            href="/work"
            className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
          >
            All four case studies →
          </Link>
        </div>
      </Container>

      {/* ── Approach — "How I think" ──────────────────────────────────── */}
      <Container className="mt-14 lg:mt-40">
        <Reveal>
          <div className="border-t border-rule pt-10 lg:pt-20">
            <Label>How I think</Label>
            <h2 className="display mt-6 max-w-[22ch] text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
              I thrive in the gap between <Em>ambiguity</Em> and clarity.
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 grid border-t border-rule sm:grid-cols-2 lg:mt-14">
          {approachStatements.map((statement, i) => (
            <Reveal
              key={statement}
              className={[
                "border-b border-rule py-6 sm:py-10",
                i % 2 === 0 ? "sm:border-r sm:pr-12" : "sm:pl-12",
              ].join(" ")}
            >
              <p className="display text-[1.2rem] leading-[1.45]">{statement}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 lg:mt-10">
            <Link
              href="/about"
              className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              About my process →
            </Link>
          </div>
        </Reveal>
      </Container>

      {/* ── Contact — sparse, confident ───────────────────────────────── */}
      <Container className="mt-14 lg:mt-40">
        <div className="border-t border-rule py-14 lg:py-44">
          <Reveal>
            <Label>Contact</Label>
            <p className="mt-6 max-w-[52ch] leading-relaxed text-ink-soft">
              <Em>Complex problems</Em>{" "}are my favourite kind. If you&rsquo;re
              working on something at the intersection of strategy, behaviour,
              and technical constraint — I&rsquo;d like to hear about it.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group link-underline display mt-8 inline-flex items-baseline gap-3 text-[clamp(1.5rem,4vw,3rem)] text-ink transition-colors duration-300 hover:text-accent"
            >
              {site.email}
              <span
                aria-hidden="true"
                className="text-xl transition-transform duration-300 group-hover:translate-x-1"
              >→</span>
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                LinkedIn
              </a>
              <a
                href={site.cv}
                download
                className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                Download CV
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
