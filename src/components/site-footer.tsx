import Link from "next/link";
import { Container, Label } from "./primitives";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-rule sm:mt-20 lg:mt-32">
      <Container>
        <div className="flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="display text-2xl transition-colors duration-300 hover:text-accent">
              {site.name}
            </Link>
            <p className="mt-2 text-sm text-ink-muted">
              {site.role} · {site.location}
            </p>
          </div>

          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-8 gap-y-3">
            <TrackedLink
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              event="linkedin_clicked"
              className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              LinkedIn
            </TrackedLink>
            <TrackedLink
              href={`mailto:${site.email}`}
              event="email_clicked"
              className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              Email
            </TrackedLink>
            <Link
              href="/work"
              className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              Work
            </Link>
            <TrackedLink
              href={site.cv}
              download=""
              event="cv_downloaded"
              className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              Download CV
            </TrackedLink>
          </nav>
        </div>

        <div className="flex items-center justify-between border-t border-rule py-6">
          <Label muted>© {new Date().getFullYear()} {site.name}</Label>
          <Label muted>{site.domain}</Label>
        </div>
      </Container>
    </footer>
  );
}
