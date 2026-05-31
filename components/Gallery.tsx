import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { gallery } from "@/data/gallery";
import { translate } from "@/lib/translate";

const SOURCE_LOCALE = "vi";

export default async function Gallery() {
  const t = await getTranslations("Gallery");
  const locale = await getLocale();

  const items = await Promise.all(
    gallery.map(async (p) => {
      const tr = async (s?: string) =>
        s && locale !== SOURCE_LOCALE
          ? await translate(s, SOURCE_LOCALE, locale)
          : s;
      return {
        src: p.src,
        alt: (await tr(p.alt)) ?? p.alt,
        name: await tr(p.name),
        caption: await tr(p.caption),
      };
    })
  );

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
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
          {items.map((p, i) => (
            <li
              key={i}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-card/40"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {(p.name || p.caption) && (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                    {p.name && (
                      <p className="text-base md:text-lg font-semibold leading-snug line-clamp-3">
                        {p.name}
                      </p>
                    )}
                    {p.caption && (
                      <p className="mt-1.5 text-xs md:text-sm text-white/75">
                        {p.caption}
                      </p>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
