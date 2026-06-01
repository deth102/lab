import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { articlePhotos, findArticle } from "@/lib/gallery";
import { translate } from "@/lib/translate";

const SOURCE_LOCALE = "vi";

export function generateStaticParams() {
  return articlePhotos().map((p) => ({ slug: p.slug }));
}

export default async function GalleryArticle({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = findArticle(slug);
  if (!article) notFound();

  const t = await getTranslations("Gallery");
  const cur = await getLocale();
  const tr = async (s?: string) =>
    s && cur !== SOURCE_LOCALE ? await translate(s, SOURCE_LOCALE, cur) : s;

  const title = (await tr(article.name)) ?? article.alt;
  const caption = await tr(article.caption);
  const body = (await tr(article.body)) ?? "";
  const altText = (await tr(article.alt)) ?? article.alt;

  const paragraphs = body.split(/\n\s*\n/).filter(Boolean);

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-brand transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {t("back")}
      </Link>

      <header className="mt-6">
        {caption && (
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-brand">
            {caption}
          </p>
        )}
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          {title}
        </h1>
      </header>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border/60">
        <Image
          src={article.src}
          alt={altText}
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {paragraphs.length > 0 && (
        <div className="prose mt-10 max-w-none space-y-5 text-base md:text-lg leading-relaxed text-foreground/85">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      {article.extraImages && article.extraImages.length > 0 && (
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {article.extraImages.map((src, i) => (
            <li
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60"
            >
              <Image
                src={src}
                alt={altText}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
