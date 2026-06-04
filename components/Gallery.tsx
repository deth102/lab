import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { getPhotos } from "@/lib/gallery";
import { translate } from "@/lib/translate";
import { Link } from "@/i18n/navigation";

const SOURCE_LOCALE = "vi";

export default async function Gallery() {
  const t = await getTranslations("Gallery");
  const locale = await getLocale();
  const photos = await getPhotos();

  const items = await Promise.all(
    photos.map(async (p) => {
      const tr = async (s?: string) =>
        s && locale !== SOURCE_LOCALE
          ? await translate(s, SOURCE_LOCALE, locale)
          : s;
      return {
        src: p.src,
        alt: (await tr(p.alt)) ?? p.alt,
        name: await tr(p.name),
        caption: await tr(p.caption),
        hasBody: !!p.body,
        slug: p.slug,
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
          {items.map((p, i) => {
            const card = (
              <>
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
                      <div className="mt-1.5 flex items-center gap-2 text-xs md:text-sm text-white/75">
                        {p.caption && <span>{p.caption}</span>}
                        {p.hasBody && (
                          <span className="inline-flex items-center gap-1 ml-auto rounded-full bg-white/15 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium">
                            {t("readMore")}
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3"
                            >
                              <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            );

            return (
              <li
                key={i}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-card/40"
              >
                {p.hasBody ? (
                  <Link
                    href={`/gallery/${p.slug}`}
                    className="absolute inset-0"
                    aria-label={p.name ?? p.alt}
                  >
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
