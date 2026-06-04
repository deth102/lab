import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  articlePhotos,
  findArticle,
  parseBody,
  type Block,
} from "@/lib/gallery";
import { translate } from "@/lib/translate";

const SOURCE_LOCALE = "vi";

export async function generateStaticParams() {
  const photos = await articlePhotos();
  return photos.map((p) => ({ slug: p.slug }));
}

export default async function GalleryArticle({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await findArticle(slug);
  if (!article) notFound();

  const t = await getTranslations("Gallery");
  const cur = await getLocale();
  const needTranslate = cur !== SOURCE_LOCALE;
  const tr = async (s?: string) =>
    s && needTranslate ? await translate(s, SOURCE_LOCALE, cur) : s;

  const title = (await tr(article.name)) ?? article.alt;
  const caption = await tr(article.caption);
  const altText = (await tr(article.alt)) ?? article.alt;

  // Parse body BEFORE translating so image src URLs are never sent to
  // the translator (which would mangle the path). The alt/caption is
  // still translated normally.
  const blocks: Block[] = await Promise.all(
    parseBody(article.body ?? "").map(async (b): Promise<Block> => {
      if (b.kind === "image") {
        return { kind: "image", src: b.src, alt: (await tr(b.alt)) ?? b.alt };
      }
      return { kind: "text", text: (await tr(b.text)) ?? b.text };
    })
  );

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

      {blocks.length > 0 && (
        <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-foreground/85">
          {blocks.map((b, i) =>
            b.kind === "image" ? (
              <figure key={i} className="not-prose">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border/60">
                  <Image
                    src={b.src}
                    alt={b.alt || altText}
                    fill
                    sizes="(min-width: 1024px) 896px, 100vw"
                    className="object-cover"
                  />
                </div>
                {b.alt && (
                  <figcaption className="mt-2 text-center text-sm text-muted">
                    {b.alt}
                  </figcaption>
                )}
              </figure>
            ) : (
              <p key={i}>{b.text}</p>
            )
          )}
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
