import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { gallery } from "@/data/gallery";

export default async function Gallery() {
  const t = await getTranslations("Gallery");

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-foreground/70 max-w-2xl">{t("subtitle")}</p>
      </header>

      {gallery.length === 0 ? (
        <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <li
              key={i}
              className="aspect-[4/3] rounded-xl border-2 border-dashed border-border/60 bg-card/20 flex items-center justify-center text-xs text-muted text-center px-4"
            >
              {t("placeholder")}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((p, i) => (
            <li
              key={i}
              className="group rounded-xl border border-border/60 bg-card/40 overflow-hidden transition-colors hover:border-brand/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {(p.name || p.caption) && (
                <div className="px-3.5 py-3">
                  {p.name && (
                    <p className="text-sm font-medium leading-snug text-foreground">
                      {p.name}
                    </p>
                  )}
                  {p.caption && (
                    <p className="mt-0.5 text-xs text-muted leading-snug">
                      {p.caption}
                    </p>
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
