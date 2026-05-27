import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted flex flex-wrap items-center justify-between gap-3">
        <span>
          © {year} · {t("rights")}
        </span>
        <span className="text-xs">Built with Next.js · GSAP · Tailwind</span>
      </div>
    </footer>
  );
}
