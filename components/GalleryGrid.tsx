import { getTranslations } from "next-intl/server";
import { getGalleryItems } from "@/lib/galleryItems";
import GalleryCard from "./GalleryCard";

// FULL gallery grid for the /gallery page — shows every event.
export default async function GalleryGrid() {
  const t = await getTranslations("Gallery");
  const items = await getGalleryItems();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-3 text-foreground/70 max-w-2xl">{t("subtitle")}</p>
      </header>

      {items.length === 0 ? (
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 2 }).map((_, i) => (
            <li
              key={i}
              className="aspect-[4/3] rounded-2xl border-2 border-dashed border-border/60 bg-card/20 flex items-center justify-center text-sm text-muted text-center px-6"
            >
              {t("placeholder")}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {items.map((item, i) => (
            <li key={i}>
              <GalleryCard item={item} readMore={t("readMore")} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
