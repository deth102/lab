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
        <ul className="mt-10 mx-auto max-w-4xl space-y-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <li
              key={i}
              className="aspect-[16/9] rounded-2xl border-2 border-dashed border-border/60 bg-card/20 flex items-center justify-center text-sm text-muted text-center px-6"
            >
              {t("placeholder")}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-10 mx-auto max-w-4xl space-y-10">
          {items.map((p, i) => (
            <li
              key={i}
              className="group rounded-2xl border border-border/60 bg-card/40 overflow-hidden transition-colors hover:border-brand/50"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {(p.name || p.caption) && (
                <div className="px-5 py-4 md:px-6 md:py-5">
                  {p.name && (
                    <p className="text-base md:text-lg font-medium leading-snug text-foreground">
                      {p.name}
                    </p>
                  )}
                  {p.caption && (
                    <p className="mt-1 text-sm text-muted">{p.caption}</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
