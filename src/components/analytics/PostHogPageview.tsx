"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { setCampaignFromParams, getCampaign } from "./campaign";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!key) return;

    setCampaignFromParams(searchParams);
    const utm = getCampaign();

    const props: Record<string, unknown> = { $current_url: window.location.href };
    if (utm.utm_source) {
      Object.assign(props, utm, {
        landing_source: utm.utm_source,
        landing_campaign: utm.utm_campaign,
      });
    }

    posthog.capture("$pageview", props);
  }, [pathname, searchParams]);

  return null;
}

export function PostHogPageview() {
  return (
    <Suspense fallback={null}>
      <PageviewTracker />
    </Suspense>
  );
}
