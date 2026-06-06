import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // SEO: don't auto-redirect by Accept-Language. Googlebot crawls from the
  // US and would always be bounced to /en, starving /vi of crawl budget and
  // producing per-request redirects. Let each URL serve its own locale so
  // both /en and /vi index cleanly.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
