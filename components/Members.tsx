import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { memberGroups } from "@/data/members";
import { toWesternName } from "@/lib/vietnameseName";

const SOURCE_LOCALE = "vi";

export default async function Members() {
  const t = await getTranslations("Members");
  const locale = await getLocale();
  const displayName = (n: string) =>
    locale === SOURCE_LOCALE ? n : toWesternName(n);

  return (
    <section id="members" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-foreground/70 max-w-2xl">{t("subtitle")}</p>
      </header>

      <div className="mt-10 space-y-14">
        {memberGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {t(`categories.${group.category}`)}
            </h3>
            {group.members.length === 0 ? (
              <p className="mt-4 text-sm text-muted italic">{t("empty")}</p>
            ) : (
              <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {group.members.map((m, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                  >
                    <div className="relative aspect-square overflow-hidden bg-brand/5">
                      {m.photo ? (
                        <Image
                          src={m.photo}
                          alt={m.name}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-brand/10 text-brand text-3xl md:text-4xl font-semibold">
                          {initials(displayName(m.name))}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-foreground leading-snug">
                        {displayName(m.name)}
                      </p>
                      {m.title && (
                        <p className="mt-1 text-[11px] uppercase tracking-wider text-brand">
                          {m.title}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                        {m.affiliation}
                      </p>
                      {m.contact && (
                        <a
                          href={contactHref(m.contact)}
                          target={
                            contactHref(m.contact).startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            contactHref(m.contact).startsWith("http")
                              ? "noreferrer noopener"
                              : undefined
                          }
                          className="mt-2 inline-block text-xs text-brand hover:underline underline-offset-4 break-all"
                        >
                          {m.contact}
                        </a>
                      )}
                    </div>
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

function contactHref(value: string): string {
  const v = value.trim();
  if (v.includes("@") && !v.includes("/")) return `mailto:${v}`;
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}
