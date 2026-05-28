import { getTranslations } from "next-intl/server";
import { publicationsBibtex } from "@/data/publications";
import { parseBibtex, type ParsedPublication } from "@/lib/bibtex";

export default async function Publications() {
  const t = await getTranslations("Publications");

  const items = parseBibtex(publicationsBibtex);

  // Group by year. Items without a year fall into "Other".
  const groups = new Map<string, ParsedPublication[]>();
  for (const p of items) {
    const k = p.year ? String(p.year) : "—";
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(p);
  }
  const years = [...groups.keys()].sort((a, b) => {
    if (a === "—") return 1;
    if (b === "—") return -1;
    return Number(b) - Number(a);
  });

  return (
    <section id="publications" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-foreground/70 max-w-2xl">{t("subtitle")}</p>
      </header>

      {items.length === 0 ? (
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
                {groups.get(year)!.map((p, i) => (
                  <li
                    key={`${year}-${i}`}
                    className="group rounded-xl border border-border/60 bg-card/30 p-5 transition-colors hover:border-brand/50 hover:bg-card/60"
                  >
                    <TitleOrLink p={p} />
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

function TitleOrLink({ p }: { p: ParsedPublication }) {
  const text = p.title || p.key || "(untitled)";
  if (!p.url) {
    return (
      <span className="text-base md:text-lg font-medium leading-snug text-foreground">
        {text}
      </span>
    );
  }
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-start gap-2 text-base md:text-lg font-medium leading-snug text-foreground hover:text-brand transition-colors"
    >
      <span>{text}</span>
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
  );
}
