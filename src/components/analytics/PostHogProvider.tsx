"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import type { ReactNode } from "react";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

// Privacy-minimised anonymous analytics configuration.
// Initialises only when key is present (production build) and in browser context.
if (key && typeof window !== "undefined") {
  posthog.init(key, {
    api_host: host,
    capture_pageview: false,
    autocapture: false,
    capture_heatmaps: false,
    disable_session_recording: true,
    persistence: "memory",
    person_profiles: "never",
    disable_surveys: true,
  });

  // Internal-user opt-out: if __ph_internal is set in this browser's localStorage
  // (set manually via console on elvisdesigns.online), suppress all capture.
  // Normal visitors never have this key; their behaviour is unchanged.
  if (localStorage.getItem("__ph_internal") === "1") {
    posthog.opt_out_capturing();
  }
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  if (!key) return <>{children}</>;
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
