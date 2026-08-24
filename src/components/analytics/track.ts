import posthog from "posthog-js";
import { getCampaign } from "./campaign";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function track(event: string, props?: Record<string, unknown>) {
  const hasKey = !!key;
  const optedOut = typeof posthog.has_opted_out_capturing === "function"
    ? posthog.has_opted_out_capturing()
    : "unknown";
  console.log(`[track] event="${event}" hasKey=${hasKey} optedOut=${optedOut}`);
  if (!key) {
    console.log("[track] BAILING — key is falsy, event will not be captured");
    return;
  }
  console.log("[track] calling posthog.capture...");
  posthog.capture(event, { ...getCampaign(), ...props });
  console.log("[track] posthog.capture returned");
}
