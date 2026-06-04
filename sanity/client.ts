import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId, sanityEnabled } from "./env";

// Read-only client. `useCdn: true` serves cached content fast and free.
// Content updates appear within ~60s thanks to the `revalidate` tag set
// on each fetch in lib/content.ts.
export const sanityClient = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = sanityEnabled
  ? imageUrlBuilder({ projectId, dataset })
  : null;

/** Build an image URL from a Sanity image reference. */
export function urlForImage(source: SanityImageSource): string {
  if (!builder) return "";
  return builder.image(source).auto("format").fit("max").url();
}
