import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getGalleryItems } from "@/lib/galleryItems";
import GalleryMarquee from "./GalleryMarquee";

// HOME PAGE gallery: a compact auto-scrolling marquee. The heading
// links to the full /gallery page. Full grid lives in GalleryGrid.
export default async function Gallery() {
  const t = await getTranslations("Gallery");
  const items = await getGalleryItems();

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-3 text-foreground/70 max-w-2xl">{t("subtitle")}</p>
        </div>
        <Link
          href="/gallery"
          className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-brand hover:border-brand/60 transition-colors"
        >
          {t("viewAll")}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </header>

      <div className="mt-10">
        {items.length === 0 ? (
          <p className="text-sm text-muted italic">{t("placeholder")}</p>
        ) : (
          <GalleryMarquee items={items} readMore={t("readMore")} />
        )}
      </div>

      {/* mobile "view all" (button hidden on small screens above) */}
      <div className="mt-6 sm:hidden">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline underline-offset-4"
        >
          {t("viewAll")}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
