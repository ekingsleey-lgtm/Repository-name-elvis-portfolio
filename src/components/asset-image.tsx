"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Renders a project asset, falling back to a labelled placeholder frame when
 * the file isn't in /public yet. Lets the site be built and reviewed before
 * every export has landed.
 */
export function AssetImage({
  src,
  alt,
  dims,
  sizes = "(min-width: 1024px) 60rem, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  /** True intrinsic size, so aspect ratio is reserved without distortion. */
  dims?: { w: number; h: number };
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center gap-3 bg-paper-sunk p-8 text-center">
        <span className="label label-muted">Asset pending</span>
        <span className="max-w-sm text-sm text-ink-muted">{alt}</span>
        <code className="font-mono text-[0.6875rem] text-ink-faint">{src}</code>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dims?.w ?? 2400}
      height={dims?.h ?? 1600}
      sizes={sizes}
      priority={priority}
      className="h-auto w-full"
      onError={() => setFailed(true)}
    />
  );
}
