import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import {
  partnerships,
  partnershipIntro,
  type Partnership,
} from "@/data/partnership";
import { translate } from "@/lib/translate";

const SOURCE_LOCALE = "vi";

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
      name: p.name,
      logo: p.logo,
      tagline: (await tr(p.tagline)) ?? p.tagline,
      period: await tr(p.period),
      summary: (await tr(p.summary)) ?? p.summary,
      highlights: p.highlights
        ? await Promise.all(p.highlights.map(async (h) => (await tr(h)) ?? h))
        : undefined,
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
              className="glow-hover rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                {p.logo ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-background">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      fill
                      sizes="56px"
                      className="object-contain p-1.5"
                    />
                  </div>
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand text-lg font-bold">
                    {initials(p.name)}
                  </span>
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

              <p className="mt-5 text-sm md:text-base leading-relaxed text-foreground/80">
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
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function initials(name: string): string {
  const parts = name.replace(/\(.*?\)/g, "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
