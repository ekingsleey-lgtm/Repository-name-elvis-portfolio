"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Explicit theme choice, persisted. With no stored choice the page follows the
 * OS preference via the media query in globals.css and this renders the
 * current resolved state.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      document.documentElement.dataset.theme = stored;
      setTheme(stored);
      return;
    }
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="flex size-8 items-center justify-center rounded-full border border-rule text-ink-muted transition-colors hover:border-rule-strong hover:text-ink"
    >
      {/* Half-filled circle — reads correctly before hydration resolves. */}
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1a7 7 0 0 1 0 14Z" fill="currentColor" />
      </svg>
    </button>
  );
}
