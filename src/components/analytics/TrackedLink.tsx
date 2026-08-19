"use client";

import type { AnchorHTMLAttributes } from "react";
import posthog from "posthog-js";
import { getCampaign } from "./campaign";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event: string;
  eventProperties?: Record<string, unknown>;
};

export function TrackedLink({ event, eventProperties, onClick, children, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        if (key) {
          posthog.capture(event, {
            source_page: window.location.pathname,
            ...getCampaign(),
            ...eventProperties,
          });
        }
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
