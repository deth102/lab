import { getLocale, getTranslations } from "next-intl/server";
import { news } from "@/data/news";
import { translate } from "@/lib/translate";
import { routing } from "@/i18n/routing";

const SOURCE_LOCALE = "vi";

export default async function News() {
  const t = await getTranslations("News");
  const locale = (await getLocale()) as (typeof routing.locales)[number];

  const items = await Promise.all(
    news.map(async (n) => ({
      date: n.date,
      title:
        locale === SOURCE_LOCALE
          ? n.title
          : await translate(n.title, SOURCE_LOCALE, locale),
      body:
        locale === SOURCE_LOCALE
          ? n.body
          : await translate(n.body, SOURCE_LOCALE, locale),
    }))
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
            <h3 className="mt-1 text-lg font-semibold">{n.title}</h3>
            <p className="mt-2 text-foreground/80 leading-relaxed max-w-3xl">
              {n.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
