import { getLocale, getTranslations } from "next-intl/server";
import { recruiting, type Bullet } from "@/data/recruiting";
import { routing } from "@/i18n/routing";

export default async function Recruiting() {
  const tc = await getTranslations("Contact");
  const locale = (await getLocale()) as (typeof routing.locales)[number];
  const content = recruiting[locale] ?? recruiting[routing.defaultLocale];

  const email = tc("email");
  const subject = encodeURIComponent("ITD Lab — Master's application");

  return (
    <section
      id="recruiting"
      className="mx-auto max-w-6xl px-6 py-16 md:py-20"
    >
      <header>
        <span className="inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand">
          {content.intake}
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
          {content.title}
        </h2>
        <p className="mt-3 text-foreground/70 max-w-3xl">{content.subtitle}</p>
        <p className="mt-5 max-w-3xl text-foreground/80 leading-relaxed">
          {content.intro}
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Block heading={content.details.heading} items={content.details.items} />
        <Block
          heading={content.benefits.heading}
          items={content.benefits.items}
        />
        <Block
          heading={content.requirements.heading}
          items={content.requirements.items}
        />
        <Block
          heading={content.preferred.heading}
          items={content.preferred.items}
        />
      </div>

      <div className="mt-10 rounded-2xl border border-brand/30 bg-brand/5 p-6 md:p-8">
        <h3 className="text-lg font-semibold text-brand">
          {content.apply.heading}
        </h3>
        <p className="mt-2 text-foreground/80">{content.apply.body}</p>
        <a
          href={`mailto:${email}?subject=${subject}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          {content.apply.cta}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
        <p className="mt-3 text-xs text-muted">{email}</p>
      </div>
    </section>
  );
}

function Block({ heading, items }: { heading: string; items: Bullet[] }) {
  return (
    <article className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-7">
      <h3 className="text-base font-semibold uppercase tracking-[0.18em] text-brand">
        {heading}
      </h3>
      <ul className="mt-5 space-y-3">
        {items.map((it, i) => (
          <BulletItem key={i} item={it} />
        ))}
      </ul>
    </article>
  );
}

function BulletItem({ item }: { item: Bullet }) {
  if (typeof item === "string") {
    return (
      <li className="flex gap-3">
        <span
          aria-hidden
          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
        />
        <p className="text-foreground/85 leading-relaxed">{item}</p>
      </li>
    );
  }
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
      />
      <div>
        <p className="text-foreground/85 leading-relaxed">{item.text}</p>
        <ul className="mt-2 space-y-1.5 pl-2 border-l border-border/60">
          {item.sub.map((s, i) => (
            <li
              key={i}
              className="pl-3 text-sm text-foreground/75 leading-relaxed"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
