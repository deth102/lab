// =================================================================
//  CONTENT LOADER  (Sanity → with static fallback)
// =================================================================
//  These functions return news / gallery data for the site. If a
//  Sanity project is configured (NEXT_PUBLIC_SANITY_PROJECT_ID set),
//  they read from Sanity. Otherwise they fall back to the hand-edited
//  files data/news.ts and data/gallery.ts, so the site keeps working
//  before/without a CMS.
// =================================================================

import { sanityClient, urlForImage } from "./client";
import { news as staticNews, type NewsItem } from "@/data/news";
import { gallery as staticGallery, type Photo } from "@/data/gallery";

// ---- NEWS -------------------------------------------------------

export async function getNews(): Promise<NewsItem[]> {
  if (!sanityClient) return staticNews;

  try {
    const rows = await sanityClient.fetch<
      { date: string; title: string; body?: string }[]
    >(
      `*[_type == "newsPost"] | order(date desc){
        "date": date,
        title,
        body
      }`,
      {},
      { next: { revalidate: 60 } }
    );
    if (!rows || rows.length === 0) return staticNews;
    return rows.map((r) => ({
      date: r.date,
      title: r.title,
      body: r.body ?? "",
    }));
  } catch {
    return staticNews;
  }
}

// ---- GALLERY ----------------------------------------------------

// Portable Text block (subset we care about). Kept as a single open
// shape so TypeScript doesn't fight us when narrowing on _type.
type PTBlock = {
  _type: string;
  children?: { text?: string }[];
  asset?: unknown;
  caption?: string;
  [k: string]: unknown;
};

/**
 * Convert Sanity Portable Text (rich body) into the same plain-string
 * format the static gallery uses, so the existing parseBody() +
 * /gallery/[slug] detail page work unchanged:
 *   - text blocks  -> paragraphs separated by blank lines
 *   - image blocks -> "![caption](https://cdn.sanity.../img.jpg)"
 */
function portableTextToBody(blocks: PTBlock[] | undefined): string {
  if (!blocks || blocks.length === 0) return "";
  const parts: string[] = [];
  for (const b of blocks) {
    if (b._type === "block") {
      const text = (b.children ?? [])
        .map((c) => c.text ?? "")
        .join("")
        .trim();
      if (text) parts.push(text);
    } else if (b._type === "image" && "asset" in b && b.asset) {
      const url = urlForImage(b as never);
      const caption = (b as { caption?: string }).caption ?? "";
      if (url) parts.push(`![${caption}](${url})`);
    }
  }
  return parts.join("\n\n");
}

export async function getGallery(): Promise<Photo[]> {
  if (!sanityClient) return staticGallery;

  try {
    const rows = await sanityClient.fetch<
      {
        _id: string;
        name: string;
        caption?: string;
        coverImage?: unknown;
        body?: PTBlock[];
      }[]
    >(
      `*[_type == "galleryEvent"] | order(date desc){
        _id,
        name,
        caption,
        coverImage,
        body
      }`,
      {},
      { next: { revalidate: 60 } }
    );
    if (!rows || rows.length === 0) return staticGallery;

    return rows.map((r) => {
      const body = portableTextToBody(r.body);
      return {
        src: r.coverImage ? urlForImage(r.coverImage as never) : "",
        alt: r.name,
        name: r.name,
        caption: r.caption,
        slug: r._id, // stable unique slug from Sanity document id
        body: body || undefined,
      } satisfies Photo;
    });
  } catch {
    return staticGallery;
  }
}
