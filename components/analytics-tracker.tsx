"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { trackEvent } from "@/lib/analytics";

interface AnalyticsTrackerProps {
  gaId?: string;
  clarityId?: string;
}

/**
 * Loads optional free analytics providers (GA4 + Microsoft Clarity) via env vars
 * and attaches a delegated click listener to capture primary CTA conversions.
 */
export default function AnalyticsTracker({
  gaId,
  clarityId,
}: AnalyticsTrackerProps) {
  const pathname = usePathname();
  const normalizedGaId = gaId?.trim();
  const normalizedClarityId = clarityId?.trim();

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const isPrimaryCta =
        href === "/contact" ||
        anchor.classList.contains("btn") ||
        anchor.classList.contains("pill") ||
        anchor.classList.contains("btnl") ||
        anchor.classList.contains("c-button");

      if (!isPrimaryCta && !href.startsWith("/technologies/")) return;

      const label = (anchor.textContent || "").trim().slice(0, 80);
      trackEvent("cta_click", {
        label: label || href,
        destination: href,
        source_page: pathname || "/",
      });
    };

    document.addEventListener("click", onDocumentClick, { passive: true });
    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, [pathname]);

  return (
    <>
      {normalizedGaId ? <GoogleAnalytics gaId={normalizedGaId} /> : null}
      {normalizedClarityId ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${normalizedClarityId.replace(/[^a-zA-Z0-9_-]/g, "")}");`}
        </Script>
      ) : null}
    </>
  );
}

