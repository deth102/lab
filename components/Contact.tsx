import { getTranslations } from "next-intl/server";

export default async function Contact() {
  const t = await getTranslations("Contact");

  const items = [
    { label: t("addressLabel"), value: t("address"), href: undefined },
    {
      label: t("emailLabel"),
      value: t("email"),
      href: `mailto:${t("email")}`,
    },
    {
      label: t("phoneLabel"),
      value: t("phone"),
      href: `tel:${t("phone").replace(/\s/g, "")}`,
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        {t("title")}
      </h2>
      <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-3">
        {items.map((c) => (
          <div key={c.label} className="bg-background px-6 py-5">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {c.label}
            </dt>
            <dd className="mt-2">
              {c.href ? (
                <a
                  href={c.href}
                  className="text-foreground hover:text-brand underline-offset-4 hover:underline break-all"
                >
                  {c.value}
                </a>
              ) : (
                <span className="text-foreground leading-relaxed">
                  {c.value}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
