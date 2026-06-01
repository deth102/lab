import { gallery, type Photo } from "@/data/gallery";

/** Derive a URL slug for a photo. Override via `Photo.slug` if needed. */
export function slugOf(p: Photo): string {
  if (p.slug) return p.slug;
  const file = p.src.split("/").pop() ?? "";
  return file.replace(/\.[^.]+$/, "").toLowerCase();
}

/** Photos that have a long-form body — these become clickable. */
export function articlePhotos(): (Photo & { slug: string })[] {
  return gallery
    .filter((p) => !!p.body)
    .map((p) => ({ ...p, slug: slugOf(p) }));
}

/** Look up a photo by slug. Returns null if not found or has no body. */
export function findArticle(slug: string): (Photo & { slug: string }) | null {
  const hit = gallery.find((p) => slugOf(p) === slug);
  if (!hit || !hit.body) return null;
  return { ...hit, slug: slugOf(hit) };
}

export type Block =
  | { kind: "text"; text: string }
  | { kind: "image"; src: string; alt: string };

/**
 * Parse a body string into blocks. Paragraphs are split on blank lines.
 * Any block that is exactly a markdown image  ![alt](src)  becomes an
 * image block; everything else is a text paragraph.
 */
export function parseBody(body: string): Block[] {
  return body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map<Block>((raw) => {
      const m = raw.match(/^!\[(.*?)\]\((.+?)\)$/s);
      if (m) {
        return { kind: "image", alt: m[1].trim(), src: m[2].trim() };
      }
      return { kind: "text", text: raw };
    });
}
