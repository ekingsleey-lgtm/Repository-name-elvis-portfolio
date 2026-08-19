import type { Metadata } from "next";
import Link from "next/link";
import { Container, Label, Em, Rule, Tag } from "@/components/primitives";
import { AssetImage } from "@/components/asset-image";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site, about } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero ------------------------------------------------------- */}
      <Container>
        <div className="grid items-end gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12 lg:py-28">
          <div>
            <Label>{about.eyebrow}</Label>
            <h1 className="display mt-6 text-[clamp(2.5rem,7vw,5rem)]">
              {about.headline[0]}
              <br />
              {about.headline[1]}
              <br />
              <Em>{about.headline[2]}</Em>
            </h1>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
              {about.intro}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <TrackedLink
                href={`mailto:${site.email}`}
                event="email_clicked"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors duration-300 hover:bg-accent"
              >
                Get in touch
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </TrackedLink>
              <Link
                href="/work"
                className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
              >
                View my work
              </Link>
            </div>
          </div>

          <div className="overflow-hidden border border-rule bg-paper-raised">
            <AssetImage
              src="/about/teaching-2.jpg"
              alt="Elvis teaching a UX/UI session to students in a classroom"
            />
          </div>
        </div>
      </Container>

      {/* Who I am --------------------------------------------------- */}
      <Container className="mt-8">
        <Rule className="mb-14" />
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Label>{about.whoIAm.label}</Label>
            <h2 className="display mt-4 max-w-[18ch] text-balance text-3xl sm:text-4xl">
              {about.whoIAm.heading}
            </h2>
          </div>
          <div className="prose-case">
            {about.whoIAm.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>

      {/* AI-native -------------------------------------------------- */}
      <Container className="mt-14 lg:mt-28">
        <div id="ai-workflow" className="grid scroll-mt-24 gap-x-16 gap-y-8 border border-rule bg-paper-raised p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-balance text-3xl">
              I&rsquo;m an <Em>AI-native</Em> designer
            </h2>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-ink-soft">
              {about.aiNative.body}
            </p>
          </div>
          <div>
            <Label muted>How this portfolio was built</Label>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {about.aiNative.workflow.flatMap((step, i) =>
                i === 0
                  ? [<Tag key={step}>{step}</Tag>]
                  : [
                      <span key={`arrow-${i}`} className="text-sm text-ink-muted select-none" aria-hidden="true">→</span>,
                      <Tag key={step}>{step}</Tag>,
                    ]
              )}
            </div>
          <Rule className="mt-4 mb-3" />
            <Label muted>See it in practice</Label>
            <ul className="mt-3 space-y-1">
              {[
                { href: "/work/dext?from=about-ai#interactive-experience",     company: "Dext",     desc: "MTD dashboard simulation" },
                { href: "/work/kfc?from=about-ai#interactive-experience",      company: "KFC",      desc: "rewards behaviour interaction" },
                { href: "/work/travelex?from=about-ai#interactive-experience", company: "Travelex", desc: "connected journeys interaction" },
                { href: "/work/guardian?from=about-ai#interactive-experience", company: "Guardian", desc: "navigation decision interaction" },
              ].map(({ href, company, desc }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group link-underline text-sm text-ink"
                  >
                    <span className="font-medium">{company}</span>
                    <span className="text-ink-muted transition-colors group-hover:text-ink-soft"> — {desc}</span>
                    <span
                      className="ml-1 inline-block text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink-soft"
                      aria-hidden="true"
                    >→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Mentoring -------------------------------------------------- */}
      <Container className="mt-14 lg:mt-32">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-2">
          <div>
            <Label>{about.mentoring.label}</Label>
            <h2 className="display mt-4 max-w-[18ch] text-balance text-3xl sm:text-4xl">
              {about.mentoring.heading}
            </h2>
          </div>
          <div className="prose-case">
            <p>{about.mentoring.body}</p>
          </div>
        </div>

        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-12">
          {about.mentoring.entries.map((entry) => (
            <li key={entry.title}>
              <div className="overflow-hidden border border-rule bg-paper-raised">
                <AssetImage src={entry.image} alt={entry.title} />
              </div>
              <div className="mt-4">
                <Label>{entry.location}</Label>
                <h3 className="display mt-2.5 text-xl">{entry.title}</h3>
                <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-ink-muted">
                  {entry.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {/* Skills ----------------------------------------------------- */}
      <Container className="mt-14 lg:mt-32">
        <Rule className="mb-14" />
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-2">
          <div>
            <Label>{about.skills.label}</Label>
            <h2 className="display mt-4 max-w-[16ch] text-balance text-3xl sm:text-4xl">
              {about.skills.heading}
            </h2>
          </div>
          <div className="space-y-8">
            <div>
              <Label muted>Design skills</Label>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.skills.design.map((skill) => (
                  <li key={skill}>
                    <Tag>{skill}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label muted>Tools</Label>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.skills.tools.map((tool) => (
                  <li key={tool}>
                    <Tag>{tool}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Contact ---------------------------------------------------- */}
      <Container className="mt-14 lg:mt-32">
        <div
          id="contact"
          className="grid scroll-mt-24 gap-x-16 gap-y-10 border border-rule bg-paper-raised p-8 sm:p-12 lg:grid-cols-2"
        >
          <div>
            <h2 className="display text-balance text-3xl sm:text-4xl">
              Let&rsquo;s work <Em>together</Em>
            </h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-ink-soft">
              {about.contact.body}
            </p>
            <TrackedLink
              href={`mailto:${site.email}`}
              event="email_clicked"
              className="group mt-8 inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors duration-300 hover:bg-accent"
            >
              Send me an email
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </TrackedLink>
          </div>

          <dl className="self-center border-t border-rule">
            <div className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
              <dt>
                <Label muted>Email</Label>
              </dt>
              <dd>
                <TrackedLink
                  href={`mailto:${site.email}`}
                  event="email_clicked"
                  className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {site.email}
                </TrackedLink>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
              <dt>
                <Label muted>LinkedIn</Label>
              </dt>
              <dd>
                <TrackedLink
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  event="linkedin_clicked"
                  className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {site.name}
                </TrackedLink>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
              <dt>
                <Label muted>Portfolio</Label>
              </dt>
              <dd className="text-sm text-ink-soft">{site.domain}</dd>
            </div>
          </dl>
        </div>
      </Container>
    </>
  );
}
