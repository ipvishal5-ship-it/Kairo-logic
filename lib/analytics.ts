export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetOrName: string | Date,
      params?: Record<string, unknown>
    ) => void;
    clarity?: (command: "event" | "set", ...args: string[]) => void;
  }
}

/**
 * Safely dispatches an analytics event to GA4 and Microsoft Clarity when loaded.
 * Never throws when blocked by ad-blockers, running offline, or unconfigured.
 */
export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined") return;

  try {
    const cleanParams: Record<string, string | number | boolean> = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          cleanParams[key] = value;
        }
      }
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, cleanParams);
    }

    if (typeof window.clarity === "function") {
      window.clarity("event", eventName);
    }
  } catch {
    // Ignore third-party script blocking or restricted storage errors.
  }
}

