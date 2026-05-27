import { getTranslations } from "next-intl/server";
import { memberGroups } from "@/data/members";

export default async function Members() {
  const t = await getTranslations("Members");

  return (
    <section id="members" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-foreground/70 max-w-2xl">{t("subtitle")}</p>
      </header>

      <div className="mt-10 space-y-10">
        {memberGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {t(`categories.${group.category}`)}
            </h3>
            {group.members.length === 0 ? (
              <p className="mt-4 text-sm text-muted italic">{t("empty")}</p>
            ) : (
              <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.members.map((m) => (
                  <li
                    key={m.name}
                    className="rounded-xl border border-border/60 bg-card/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand font-semibold text-sm">
                        {initials(m.name)}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{m.name}</p>
                        <p className="text-xs text-muted">{m.role}</p>
                      </div>
                    </div>
                    {m.topic && (
                      <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
                        {m.topic}
                      </p>
                    )}
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="mt-3 inline-block text-xs text-brand hover:underline underline-offset-4"
                      >
                        {m.email}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function initials(name: string): string {
  const parts = name.replace(/\(.*?\)/g, "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
