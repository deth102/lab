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

      {publications.length === 0 ? (
        <p className="mt-10 text-foreground/60 italic">{t("empty")}</p>
      ) : (
        <div className="mt-10 space-y-12">
          {years.map((year) => (
            <div key={year}>
              <div className="flex items-baseline gap-4">
                <h3 className="text-2xl font-bold text-brand">{year}</h3>
                <span className="flex-1 border-t border-border/60" />
              </div>
              <ul className="mt-5 space-y-3">
                {byYear[year].map((p, i) => (
                  <li
                    key={i}
                    className="group rounded-xl border border-border/60 bg-card/30 p-5 transition-colors hover:border-brand/50 hover:bg-card/60"
                  >
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-start gap-2 text-base md:text-lg font-medium leading-snug text-foreground group-hover:text-brand transition-colors"
                    >
                      <span>{p.title}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-1.5 h-3.5 w-3.5 shrink-0 opacity-60 group-hover:opacity-100"
                      >
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </a>
                    {(p.authors || p.venue) && (
                      <p className="mt-2 text-sm text-muted">
                        {p.authors}
                        {p.authors && p.venue ? " · " : ""}
                        {p.venue && <span className="italic">{p.venue}</span>}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
