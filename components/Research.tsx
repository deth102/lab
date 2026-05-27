import { getLocale, getTranslations } from "next-intl/server";
import { researchAreas } from "@/data/research";
import { routing } from "@/i18n/routing";

export default async function Research() {
  const t = await getTranslations("Research");
  const locale = (await getLocale()) as (typeof routing.locales)[number];
  const list = researchAreas[locale] ?? researchAreas[routing.defaultLocale];

  return (
    <section id="research" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-foreground/70 max-w-2xl">{t("subtitle")}</p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((area, i) => (
          <article
            key={area.title}
            className="group rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:bg-card/70"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand text-xs font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                {area.title}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75">
              {area.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {area.keywords.map((k) => (
                <li
                  key={k}
                  className="inline-block rounded-full border border-border/60 px-2 py-0.5 text-[11px] text-muted"
                >
                  {k}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
