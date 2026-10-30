
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLocale,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  articlePhotos,
  findArticle,
  parseBody,
  type Block,
} from "@/lib/gallery";
import { translate } from "@/lib/translate";

const SOURCE_LOCALE = "vi";
const SITE_URL = "https://itdhust.com";

// Refresh against Sanity at most once per 60s.
export const revalidate = 60;

export async function generateStaticParams() {
  const photos = await articlePhotos();
  return photos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await findArticle(slug);

  if (!article) {
    return {
      title: "Gallery | ITD-HUST Lab",
    };
  }

  const title = article.name || article.alt || "Gallery";
  const description =
    article.caption ||
    article.alt ||
    "Explore research activities, events and collaborations at ITD-HUST Lab.";

  // Use an absolute URL for Open Graph images.
  const imageUrl = new URL(article.src, SITE_URL).toString();

  // Assumes Vietnamese URLs omit the /vi prefix.
  const pageUrl =
    locale === SOURCE_LOCALE
      ? `${SITE_URL}/gallery/${slug}`
      : `${SITE_URL}/${locale}/gallery/${slug}`;

  return {
    title: `${title} | ITD-HUST Lab`,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "ITD-HUST Lab",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.alt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
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
    s && needTranslate
      ? await translate(s, SOURCE_LOCALE, cur)
      : s;

  const title = (await tr(article.name)) ?? article.alt;
  const caption = await tr(article.caption);
  const altText = (await tr(article.alt)) ?? article.alt;

  // Parse body BEFORE translating so image src URLs are never sent
  // to the translator (which would mangle the path).
  const blocks: Block[] = await Promise.all(
    parseBody(article.body ?? "").map(
      async (b): Promise<Block> => {
        if (b.kind === "image") {
          return {
            kind: "image",
            src: b.src,
            alt: (await tr(b.alt)) ?? b.alt,
          };
        }

        return {
          kind: "text",
          text: (await tr(b.text)) ?? b.text,
        };
      }
    )
  );

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <Link
        href="/gallery"
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

      {article.extraImages &&
        article.extraImages.length > 0 && (
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
