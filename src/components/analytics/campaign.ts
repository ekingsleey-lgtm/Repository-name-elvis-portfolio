const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];
export type Campaign = Partial<Record<UtmKey, string>>;

// Module-level store: persists across client-side (Next.js) navigations because
// JS modules are not re-evaluated on route changes — only on a full browser
// refresh (hard reload) or tab close, which resets _campaign to {}.
// Never written to cookies or localStorage.
let _campaign: Campaign = {};

/** Call once per navigation. Only writes when UTM params are present, so
 *  internal navigations without UTMs preserve the original landing campaign. */
export function setCampaignFromParams(params: { get(key: string): string | null }): void {
  const found: Campaign = {};
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) found[key] = val;
  }
  if (Object.keys(found).length > 0) {
    _campaign = found;
  }
}

/** Returns the active campaign UTM properties, or an empty object if none set. */
export function getCampaign(): Campaign {
  return _campaign;
}
