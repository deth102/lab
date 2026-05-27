import { getLocale, getTranslations } from "next-intl/server";
import { openings } from "@/data/openings";
import { routing } from "@/i18n/routing";

export default async function Join() {
  const t = await getTranslations("Join");
  const tc = await getTranslations("Contact");
  const locale = (await getLocale()) as (typeof routing.locales)[number];
  const list = openings[locale] ?? openings[routing.defaultLocale];

  return (
    <section id="join" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-foreground/70 max-w-2xl">{t("subtitle")}</p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((o) => (
          <article
            key={o.title}
            className="rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:bg-card/70 flex flex-col"
          >
            <span className="inline-block self-start rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-medium text-brand">
              {o.level}
            </span>
            <h3 className="mt-3 text-lg font-semibold leading-snug">
              {o.title}
            </h3>
            <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
              {o.topic}
            </p>
            <div className="mt-5 pt-5 border-t border-border/60">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                {t("requirementsLabel")}
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-foreground/75">
                {o.requirements.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-brand/30 bg-brand/5 p-6 md:p-8">
        <h3 className="text-lg font-semibold text-brand">{t("applyTitle")}</h3>
        <p className="mt-2 text-foreground/80">{t("applyBody")}</p>
        <a
          href={`mailto:${tc("email")}`}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          {tc("email")}
        </a>
      </div>
    </section>
  );
}
