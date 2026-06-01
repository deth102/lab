import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { memberGroups } from "@/data/members";
import { toWesternName } from "@/lib/vietnameseName";
import TiltCard from "./TiltCard";

const SOURCE_LOCALE = "vi";

const TITLE_VI: Record<string, string> = {
  "Key Member": "Thành viên chính",
  "Senior Advisor": "Cố vấn cấp cao",
  "Head of Research Group": "Trưởng nhóm nghiên cứu",
  "Research Group Leader": "Trưởng nhóm nghiên cứu",
  "Lab Director": "Trưởng phòng lab",
  "Collaborator": "Cộng tác viên",
};

// "ITD01 Leader" → "Trưởng nhóm ITD01"  |  "ITD01 Member" → "Thành viên ITD01"
function localizeITDTitle(title: string): string {
  return title
    .replace(/^(ITD\d+)\s+Leader$/, "Trưởng nhóm $1")
    .replace(/^(ITD\d+)\s+Member$/, "Thành viên $1");
}

const AFFIL_REPLACE_VI: [string, string][] = [
  ["School of Mechanical Engineering", "Trường Cơ khí"],
];

function localizeTitle(title: string | undefined, locale: string) {
  if (!title || locale !== SOURCE_LOCALE) return title;
  if (TITLE_VI[title]) return TITLE_VI[title];
  // Handle ITD group codes like "ITD01 Leader", "ITD03 Member"
  if (/^ITD\d+\s+(Leader|Member)$/.test(title)) return localizeITDTitle(title);
  return title;
}

function localizeAffiliation(affil: string, locale: string) {
  if (locale !== SOURCE_LOCALE) return affil;
  let out = affil;
  for (const [en, vi] of AFFIL_REPLACE_VI) out = out.replace(en, vi);
  return out;
}

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
              <ul className={
                group.members.length === 1
                  ? "mt-6 flex justify-center"
                  : "mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              }>
                {group.members.map((m, i) => (
                  <li key={i} className={`[perspective:900px] ${group.members.length === 1 ? "w-56 md:w-72" : ""}`}>
                    <TiltCard className="relative glow-hover shine-hover rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-brand/50">
                      {/* Card-wide invisible link to Google Scholar (when set) */}
                      {m.scholar && (
                        <a
                          href={m.scholar}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`Google Scholar — ${m.name}`}
                          className="absolute inset-0 z-[1]"
                        />
                      )}

                      <div className="relative aspect-square overflow-hidden bg-brand/5 pointer-events-none">
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

                        {/* Scholar badge on the photo, top-right */}
                        {m.scholar && (
                          <span
                            aria-hidden
                            className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-sm border border-border/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand shadow"
                          >
                            <ScholarIcon />
                            Scholar
                          </span>
                        )}
                      </div>

                      <div className="p-4 pointer-events-none">
                        <p className="font-semibold text-foreground leading-snug">
                          {displayName(m.name)}
                        </p>
                        {m.title && (
                          <p className="mt-1 text-[11px] uppercase tracking-wider text-brand">
                            {localizeTitle(m.title, locale)}
                          </p>
                        )}
                        <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                          {localizeAffiliation(m.affiliation, locale)}
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
                            className="mt-2 pointer-events-auto relative z-[2] inline-block text-xs text-brand hover:underline underline-offset-4 break-all"
                          >
                            {m.contact}
                          </a>
                        )}
                      </div>
                    </TiltCard>
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

function ScholarIcon() {
  // Simplified mortarboard glyph
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3 w-3"
      aria-hidden
    >
      <path d="M12 3 1 9l11 6 9-4.91V17h2V9z" />
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17z" />
    </svg>
  );
}
