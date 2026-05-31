"use client";

import { Link, usePathname } from "@/i18n/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "desktop" | "mobile";
  onClick?: () => void;
};

export default function NavLink({
  href,
  children,
  variant = "desktop",
  onClick,
}: Props) {
  const pathname = usePathname();
  const isActive = isPathActive(pathname, href);

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={
          isActive
            ? "px-3 py-3 text-base font-semibold text-brand bg-brand/10 rounded-lg transition-colors"
            : "px-2 py-3 text-base text-foreground/85 hover:text-brand transition-colors border-b border-border/40 last:border-b-0"
        }
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={
        isActive
          ? "relative font-medium text-brand transition-colors after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-brand"
          : "text-foreground/75 hover:text-brand transition-colors"
      }
    >
      {children}
    </Link>
  );
}

function isPathActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
