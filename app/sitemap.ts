import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE = "https://itdhust.com";

// Static routes. If you add a new page (e.g. /awards), list it here.
const PATHS = [
  "",
  "/research",
  "/publications",
  "/members",
  "/recruiting",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    PATHS.map((path) => {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      const url = `${SITE}${prefix}${path}`;

      return {
        url,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => {
              const altPrefix =
                alt === routing.defaultLocale ? "" : `/${alt}`;
              return [alt, `${SITE}${altPrefix}${path}`];
            })
          ),
        },
      };
    })
  );
}
