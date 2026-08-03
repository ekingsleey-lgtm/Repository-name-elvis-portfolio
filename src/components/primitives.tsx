import type { ReactNode } from "react";

/** The page gutter. Every section sits on this measure. */
export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[92rem]" : "max-w-6xl";
  return (
    <div className={`mx-auto w-full ${max} px-6 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  );
}

/** Monospace eyebrow. The system's smallest, most repeated signal. */
export function Label({
  children,
  muted = false,
  className = "",
}: {
  children: ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <span className={`label ${muted ? "label-muted" : ""} ${className}`}>{children}</span>
  );
}

/** Hairline. Used in place of card borders wherever possible. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-rule ${className}`} />;
}

/**
 * Emphasis in the display serif's italic — the site's one rhetorical move,
 * inherited from the previous design's red italic.
 */
export function Em({ children }: { children: ReactNode }) {
  return <em className="italic text-accent">{children}</em>;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="label label-muted rounded-full border border-rule px-2.5 py-1.5">
      {children}
    </span>
  );
}
