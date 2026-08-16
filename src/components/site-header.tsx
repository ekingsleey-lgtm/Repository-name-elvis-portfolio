import Link from "next/link";
import { Container } from "./primitives";
import { ThemeToggle } from "./theme-toggle";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/content/site";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="display text-lg tracking-tight transition-colors duration-300 hover:text-accent"
          >
            {site.name}
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <TrackedLink
              href="/about#contact"
              event="contact_clicked"
              className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:inline link-underline"
            >
              Contact
            </TrackedLink>
            <TrackedLink
              href={site.cv}
              download=""
              event="cv_downloaded"
              className="text-sm text-ink-soft transition-colors hover:text-ink link-underline"
            >
              <span className="sm:hidden">CV</span>
              <span className="hidden sm:inline">Download CV</span>
            </TrackedLink>
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  );
}
