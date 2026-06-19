import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import {
  partnerships,
  partnershipIntro,
  type Partnership,
  type PartnerSlide,
} from "@/data/partnership";
import { translate } from "@/lib/translate";

const SOURCE_LOCALE = "vi";

// A titled list of downloadable PDF slides. Reused for the course materials
// and the "other reference materials" blocks.
function SlideList({ heading, slides }: { heading: string; slides: PartnerSlide[] }) {
  return (
    <div className="mt-7 border-t border-border/60 pt-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
        {heading}
      </h3>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {slides.map((s, j) => (
          <li key={j}>
            <a
              href={s.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group/slide flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-3.5 py-3 text-sm text-foreground/85 transition-colors hover:border-brand/60 hover:text-brand"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0 text-brand"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
              <span className="min-w-0 flex-1 leading-snug">{s.title}</span>
              <span className="text-xs font-medium uppercase tracking-wide text-muted group-hover/slide:text-brand">
                PDF
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function PartnershipSection() {
  const t = await getTranslations("Partnership");
  const locale = await getLocale();

  const tr = async (s?: string) =>
    s && locale !== SOURCE_LOCALE
      ? await translate(s, SOURCE_LOCALE, locale)
      : s;

  const intro = (await tr(partnershipIntro)) ?? partnershipIntro;

  const items = await Promise.all(
    partnerships.map(async (p): Promise<Partnership> => ({
      name: (await tr(p.name)) ?? p.name,
      logo: p.logo,
      coverImage: p.coverImage,
      tagline: (await tr(p.tagline)) ?? p.tagline,
      period: await tr(p.period),
      summary: (await tr(p.summary)) ?? p.summary,
      highlights: p.highlights
        ? await Promise.all(p.highlights.map(async (h) => (await tr(h)) ?? h))
        : undefined,
      // slide titles stay in English (not translated); only the section
      // heading is localised.
      slidesTitle: (await tr(p.slidesTitle)) ?? p.slidesTitle,
      slides: p.slides,
      referenceSlides: p.referenceSlides,
    }))
  );

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <header>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-foreground/80 max-w-3xl">
          {intro}
        </p>
      </header>

      {items.length === 0 ? (
        <p className="mt-10 text-foreground/60 italic">{t("empty")}</p>
      ) : (
        <div className="mt-12 space-y-8">
          {items.map((p, i) => (
            <article
              key={i}
              className="glow-hover overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm"
            >
              {p.coverImage ? (
                // Image banner header: photo background + dark gradient,
                // title/tagline overlaid in white.
                <div className="relative">
                  <div className="relative aspect-[16/7] md:aspect-[16/6] w-full">
                    <Image
                      src={p.coverImage}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 768px, 100vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                    <h2 className="text-xl md:text-3xl font-bold tracking-tight drop-shadow">
                      {p.name}
                    </h2>
                    <p className="mt-1.5 text-sm md:text-base text-white/90 drop-shadow max-w-2xl">
                      {p.tagline}
                    </p>
                    {p.period && (
                      <p className="mt-2 text-xs uppercase tracking-wider text-white/75">
                        {p.period}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                // No cover image: header with optional logo, else plain title.
                <div className="flex items-start gap-4 p-6 md:p-8 pb-0">
                  {p.logo && (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-background">
                      <Image
                        src={p.logo}
                        alt={p.name}
                        fill
                        sizes="56px"
                        className="object-contain p-1.5"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                      {p.name}
                    </h2>
                    <p className="mt-1 text-sm md:text-base text-brand">
                      {p.tagline}
                    </p>
                    {p.period && (
                      <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                        {p.period}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8">
                <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                  {p.summary}
                </p>

                {p.highlights && p.highlights.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {p.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm md:text-base text-foreground/75 leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {p.slides && p.slides.length > 0 && (
                  <SlideList
                    heading={p.slidesTitle ?? t("slides")}
                    slides={p.slides}
                  />
                )}

                {p.referenceSlides && p.referenceSlides.length > 0 && (
                  <SlideList
                    heading={t("referenceSlides")}
                    slides={p.referenceSlides}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
