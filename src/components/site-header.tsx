import Link from "next/link";
import { Container } from "./primitives";
import { ThemeToggle } from "./theme-toggle";
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
            <Link
              href="/about#contact"
              className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:inline link-underline"
            >
              Contact
            </Link>
            <a
              href={site.cv}
              download
              className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:inline link-underline"
            >
              Download CV
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  );
}
