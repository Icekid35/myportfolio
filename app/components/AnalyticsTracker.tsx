"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const tracked = useRef(new Set<string>());

  useEffect(() => {
    // Skip admin pages
    if (pathname.startsWith("/admin")) return;
    if (tracked.current.has(pathname)) return;
    tracked.current.add(pathname);

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
