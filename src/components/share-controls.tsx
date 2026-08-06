"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { site } from "@/content/site";

type Props = {
  /** Case study title — used in share payloads. */
  title: string;
  /** URL path, e.g. "/work/dext". Full URL is constructed from site.url + path. */
  path: string;
};

/**
 * Minimal, editorial share control.
 *
 * On devices that support the Web Share API the button invokes it directly.
 * On desktop the button toggles a small inline menu: Copy link, LinkedIn, Email.
 * A brief "Copied" confirmation replaces the Copy option for 2 s after use.
 */
export function ShareControls({ title, path }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click / focus-out
  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const getShareUrl = useCallback(() => {
    // Prefer the live URL so the hash is included if the user is on a chapter
    if (typeof window !== "undefined") return window.location.href;
    return `${site.url}${path}`;
  }, [path]);

  const handleClick = useCallback(async () => {
    const shareUrl = getShareUrl();

    // Web Share API — preferred on capable mobile browsers
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch {
        // User cancelled or API unavailable — fall through to menu
      }
    }

    setOpen((o) => !o);
  }, [getShareUrl, title]);

  const handleCopy = useCallback(async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement("textarea");
      el.value = shareUrl;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setOpen(false);
    setTimeout(() => setCopied(false), 2000);
  }, [getShareUrl]);

  const linkedInUrl = useCallback(() => {
    const shareUrl = getShareUrl();
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  }, [getShareUrl]);

  const emailUrl = useCallback(() => {
    const shareUrl = getShareUrl();
    return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`;
  }, [getShareUrl, title]);

  return (
    <div className="relative inline-flex">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-label={`Share: ${title}`}
        className={[
          "label label-muted flex items-center gap-1.5 transition-colors duration-150 hover:text-ink-soft",
          copied ? "text-ink-soft" : "",
        ].join(" ")}
      >
        {copied ? "Copied ✓" : "Share ↗"}
      </button>

      {/* Dropdown — shown when Web Share API is unavailable */}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Share options"
          className="absolute top-full left-0 mt-2 z-20 border border-rule bg-paper shadow-sm min-w-[10rem]"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className="flex w-full items-center px-4 py-3 text-sm text-ink-soft transition-colors hover:text-ink hover:bg-paper-raised text-left"
          >
            Copy link
          </button>
          <a
            role="menuitem"
            href={linkedInUrl()}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center px-4 py-3 text-sm text-ink-soft transition-colors hover:text-ink hover:bg-paper-raised"
          >
            LinkedIn ↗
          </a>
          <a
            role="menuitem"
            href={emailUrl()}
            onClick={() => setOpen(false)}
            className="flex items-center px-4 py-3 text-sm text-ink-soft transition-colors hover:text-ink hover:bg-paper-raised"
          >
            Email →
          </a>
        </div>
      )}
    </div>
  );
}
