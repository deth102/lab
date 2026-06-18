import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import {
  aboutIntro,
  labModel,
  labStrengths,
  researchGroups,
} from "@/data/about";
import { memberGroups } from "@/data/members";
import { translate } from "@/lib/translate";

const SOURCE_LOCALE = "vi";

// Flat lookup of every member (name -> member) so each research group can
// show the student's photo without duplicating it in data/about.ts.
const memberByName = new Map(
  memberGroups.flatMap((g) => g.members.map((m) => [m.name, m]))
);

// Strip Vietnamese diacritics so personal names read in Latin script on the
// English site. Proper names must NOT be machine-translated (that turns
// "Hùng" into "hero"), so we transliterate instead of calling translate().
function deaccent(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Vietnamese academic-title prefixes -> English equivalent.
const TITLE_MAP: Record<string, string> = {
  "TS.": "PhD",
  "TS": "PhD",
  "ThS.": "M.Sc.",
  "ThS": "M.Sc.",
  "PGS.TS": "Assoc. Prof.",
  "GS.TS": "Prof.",
};

// Render a Vietnamese full name the way the user asked for on /en:
//   "Nguyễn Mạnh Cường"      -> "Manh-Cuong Nguyen"   (family name last,
//                                 given + middle joined by a hyphen)
//   "TS. Trương Quốc Chiến"  -> "PhD Quoc-Chien Truong"
// On /vi the original name is kept verbatim.
function displayName(raw: string, asEnglish: boolean): string {
  if (!asEnglish) return raw;

  // Pull an optional academic title off the front (case-insensitive, so
  // "Ths."/"ThS."/"TS." all match).
  let title = "";
  let rest = raw.trim();
  const firstWord = rest.split(/\s+/)[0];
  const titleKey = Object.keys(TITLE_MAP).find(
    (k) => k.toLowerCase() === firstWord.toLowerCase()
  );
  if (titleKey) {
    title = TITLE_MAP[titleKey];
    rest = rest.slice(firstWord.length).trim();
  }

  const parts = deaccent(rest).split(/\s+/).filter(Boolean);
  if (parts.length < 2) return (title ? title + " " : "") + deaccent(rest);

  const family = parts[0];
  const given = parts.slice(1).join("-"); // middle + given joined by hyphen
  return (title ? title + " " : "") + `${given} ${family}`;
}

export default async function About() {
  const t = await getTranslations("About");
  const locale = await getLocale();
  const need = locale !== SOURCE_LOCALE;
  const tr = async (s?: string) =>
    s && need ? await translate(s, SOURCE_LOCALE, locale) : s;

  const intro = (await tr(aboutIntro)) ?? aboutIntro;

  const model = await Promise.all(
    labModel.map(async (m) => ({
      title: (await tr(m.title)) ?? m.title,
      desc: (await tr(m.desc)) ?? m.desc,
    }))
  );

  const strengths = await Promise.all(
    labStrengths.map(async (s) => ({
      title: (await tr(s.title)) ?? s.title,
      desc: (await tr(s.desc)) ?? s.desc,
    }))
  );

  const groups = await Promise.all(
    researchGroups.map(async (g) => ({
      key: g.key,
      name: g.name, // English group name — kept as-is
      tagline: (await tr(g.tagline)) ?? g.tagline,
      focus: (await tr(g.focus)) ?? g.focus,
      // People names are transliterated/reordered, not translated, on /en.
      supervisor: g.supervisor
        ? {
            name: displayName(g.supervisor.name, need),
            photo: g.supervisor.photo,
          }
        : undefined,
      members: await Promise.all(
        g.members.map(async (m) => ({
          name: displayName(m.name, need),
          photo: memberByName.get(m.name)?.photo,
          strengths: await Promise.all(
            m.strengths.map(async (s) => (await tr(s)) ?? s)
          ),
        }))
      ),
    }))
  );

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-foreground/80">
          {intro}
        </p>
      </header>

      {/* --- Mô hình hoạt động --- */}
      <div className="mt-14">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t("modelTitle")}
        </h2>
        <ol className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {model.map((m, i) => (
            <li
              key={i}
              className="relative rounded-2xl border border-border/60 bg-card/40 p-6"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand text-sm font-bold">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                {m.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* --- Điểm mạnh --- */}
      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t("strengthsTitle")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:bg-card/70"
            >
              <h3 className="flex items-start gap-2.5 text-base font-semibold tracking-tight">
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* --- Ba nhóm nghiên cứu --- */}
      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t("groupsTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-foreground/70">
          {t("groupsSubtitle")}
        </p>

        <div className="mt-8 space-y-6">
          {groups.map((g) => (
            <article
              key={g.key}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/40"
            >
              <div className="border-b border-border/60 bg-brand/5 p-6 md:p-7">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-brand">
                  {g.name}
                </h3>
                <p className="mt-1 text-sm md:text-base font-medium text-foreground/85">
                  {g.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75 max-w-3xl">
                  {g.focus}
                </p>
              </div>

              <div className="p-6 md:p-8">
                {/* Supervisor — distinct framed card (ring + accent bg) */}
                {g.supervisor && (
                  <div className="mb-8 flex items-center gap-4 rounded-2xl border-2 border-brand/40 bg-brand/5 p-4 ring-2 ring-brand/10 sm:gap-5 sm:p-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-brand/30 sm:h-28 sm:w-28">
                      <Image
                        src={g.supervisor.photo}
                        alt={g.supervisor.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand">
                        {t("supervisor")}
                      </p>
                      <p className="mt-1 text-lg font-bold tracking-tight sm:text-xl">
                        {g.supervisor.name}
                      </p>
                    </div>
                  </div>
                )}

                {/* Members — larger photos + 2–3 line strength blurb */}
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.members.map((m) => (
                    <li
                      key={m.name}
                      className="flex gap-4 rounded-2xl border border-border/60 bg-background/40 p-4"
                    >
                      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-background">
                        {m.photo ? (
                          <Image
                            src={m.photo}
                            alt={m.name}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted">
                            {m.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-snug">
                          {m.name}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {m.strengths.map((s, k) => (
                            <li
                              key={k}
                              className="flex gap-1.5 text-xs leading-relaxed text-foreground/70"
                            >
                              <span
                                aria-hidden
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand"
                              />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
