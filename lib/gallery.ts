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
 * Parse a body string into blocks. Paragraphs are split on blank
 * lines; WITHIN each paragraph, any line that is a markdown image
 *   ![alt](src)
 * becomes its own image block. Non-image lines are merged back into
 * a single text block. This lets several images sit on consecutive
 * lines without needing a blank line between them.
 */
const IMG_RE = /^!\[(.*?)\]\((.+?)\)$/;

export function parseBody(body: string): Block[] {
  const out: Block[] = [];
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  for (const para of paragraphs) {
    let textBuf: string[] = [];
    const flush = () => {
      const text = textBuf.join(" ").trim();
      if (text) out.push({ kind: "text", text });
      textBuf = [];
    };

    for (const line of para.split(/\n/)) {
      const trimmed = line.trim();
      const m = trimmed.match(IMG_RE);
      if (m) {
        flush();
        out.push({ kind: "image", alt: m[1].trim(), src: m[2].trim() });
      } else if (trimmed) {
        textBuf.push(trimmed);
      }
    }
    flush();
  }

  return out;
}
