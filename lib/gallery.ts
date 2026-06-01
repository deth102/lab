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
