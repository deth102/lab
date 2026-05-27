import { getTranslations } from "next-intl/server";
import { publications, type Publication } from "@/data/publications";

export default async function Publications() {
  const t = await getTranslations("Publications");

  const byYear = publications.reduce<Record<number, Publication[]>>(
    (acc, p) => {
      (acc[p.year] ||= []).push(p);
      return acc;
    },
    {}
  );
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section id="publications" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-foreground/70 max-w-2xl">{t("subtitle")}</p>
      </header>

      <div className="mt-10 space-y-12">
        {years.map((year) => (
          <div key={year}>
            <div className="flex items-baseline gap-4">
              <h3 className="text-2xl font-bold text-brand">{year}</h3>
              <span className="flex-1 border-t border-border/60" />
            </div>
            <ul className="mt-5 space-y-4">
              {byYear[year].map((p, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-border/60 bg-card/30 p-5 transition-colors hover:border-brand/40 hover:bg-card/60"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h4 className="text-base md:text-lg font-medium leading-snug max-w-3xl">
                      {p.title}
                    </h4>
                    <span className="inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-muted">
                      {t(`types.${p.type}`)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/70">{p.authors}</p>
                  <p className="mt-1 text-sm italic text-muted">{p.venue}</p>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline underline-offset-4"
                    >
                      {t("viewLink")}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
