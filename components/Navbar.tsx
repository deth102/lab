import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const t = await getTranslations("Nav");

  const links = [
    { href: "/", label: t("home") },
    { href: "/research", label: t("research") },
    { href: "/publications", label: t("publications") },
    { href: "/members", label: t("members") },
    { href: "/recruiting", label: t("openings") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 backdrop-blur-md bg-background/70">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground"
        >
          <Image
            src="/lab-logo-mark.svg"
            alt={t("brand")}
            width={32}
            height={32}
            priority
            className="h-8 w-8"
          />
          <span className="text-base">{t("brand")}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-foreground/75 hover:text-brand transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <LocaleSwitcher />
          <ThemeToggle />
        </nav>
        <div className="flex md:hidden items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <MobileMenu links={links} ariaLabel={t("menu")} />
        </div>
      </div>
    </header>
  );
}
