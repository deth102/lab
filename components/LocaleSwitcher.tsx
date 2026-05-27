"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const onChange = (next: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- next-intl handles dynamic params
        { pathname, params },
        { locale: next as (typeof routing.locales)[number] }
      );
    });
  };

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value)}
        disabled={isPending}
        className="appearance-none rounded-full border border-border/60 bg-transparent py-1.5 pl-3 pr-8 text-sm text-foreground/80 hover:text-brand hover:border-brand/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40 cursor-pointer"
        aria-label={t("label")}
      >
        {routing.locales.map((loc) => (
          <option
            key={loc}
            value={loc}
            className="bg-background text-foreground"
          >
            {t(loc)}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-2 h-4 w-4 text-foreground/60"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
