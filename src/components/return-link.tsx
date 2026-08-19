"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ORIGINS = {
  "home-ai": {
    label: "← Back to Built with AI",
    href: "/#built-with-ai",
  },
  "about-ai": {
    label: "← Back to AI workflow",
    href: "/about#ai-workflow",
  },
} as const;

export function ReturnLink() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") as keyof typeof ORIGINS | null;
  const origin = from && from in ORIGINS ? ORIGINS[from] : null;

  if (!origin) return null;

  return (
    <Link
      href={origin.href}
      className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
    >
      {origin.label}
    </Link>
  );
}
