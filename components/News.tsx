import { getLocale, getTranslations } from "next-intl/server";
import { getNews } from "@/sanity/content";
import { translate } from "@/lib/translate";
import { routing } from "@/i18n/routing";

const SOURCE_LOCALE = "vi";

function isUrl(value: string) {
  return /^https?:\/\/\S+$/i.test(value.trim());
}

export default async function News() {
  const t = await getTranslations("News");
  const locale = (await getLocale()) as (typeof routing.locales)[number];
  const news = await getNews();

  const items = await Promise.all(
    news.map(async (n) => {
      const body = n.body?.trim() ?? "";

      return {
        date: n.date,
        title:
          locale === SOURCE_LOCALE
            ? n.title
            : await translate(n.title, SOURCE_LOCALE, locale),
        body:
          locale === SOURCE_LOCALE || isUrl(body)
            ? body
            : await translate(body, SOURCE_LOCALE, locale),
        isLink: isUrl(body),
      };
    })
  );

  return (
    <section id="news" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        {t("title")}
      </h2>

      <ol className="mt-10 relative border-l-2 border-border/60 ml-3 space-y-8">
        {items.map((n, i) => (
          <li key={i} className="pl-8 relative">
            <span
              aria-hidden
              className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-brand border-4 border-background"
            />

            <time className="text-xs uppercase tracking-wider text-muted">
              {n.date}
            </time>

            <h3 className="mt-1 text-lg font-semibold">
              {n.title}
            </h3>

            {n.isLink ? (
              <a
                href={n.body}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block max-w-3xl text-primary underline underline-offset-4 hover:opacity-70 transition-opacity break-all"
              >
                {n.body}
              </a>
            ) : (
              <p className="mt-2 text-foreground/80 leading-relaxed max-w-3xl">
                {n.body}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}