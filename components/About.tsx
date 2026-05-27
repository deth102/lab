import { getTranslations } from "next-intl/server";

export default async function About() {
  const t = await getTranslations("About");

  const stats = [
    { label: t("stats.founded"), value: t("stats.foundedValue") },
    { label: t("stats.focus"), value: t("stats.focusValue") },
    { label: t("stats.host"), value: t("stats.hostValue") },
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr] md:gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground/80 max-w-2xl">
            {t("body")}
          </p>
        </div>
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60">
          {stats.map((s) => (
            <div key={s.label} className="bg-background px-5 py-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                {s.label}
              </dt>
              <dd className="mt-1 text-base font-medium text-foreground">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
