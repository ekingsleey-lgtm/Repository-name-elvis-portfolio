import Link from "next/link";
import { Container, Label } from "./primitives";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule">
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
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              Email
            </a>
            <Link
              href="/work"
              className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              Work
            </Link>
            <a
              href={site.cv}
              download
              className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              Download CV
            </a>
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
