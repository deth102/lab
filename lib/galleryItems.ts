import { getLocale } from "next-intl/server";
import { getPhotos } from "@/lib/gallery";
import { translate } from "@/lib/translate";

const SOURCE_LOCALE = "vi";

export type GalleryItem = {
  src: string;
  alt: string;
  name?: string;
  caption?: string;
  hasBody: boolean;
  slug: string;
};

/** Fetch gallery photos and translate their text for the current
 *  locale. Shared by the home-page marquee and the /gallery grid. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const locale = await getLocale();
  const photos = await getPhotos();

  return Promise.all(
    photos.map(async (p) => {
      const tr = async (s?: string) =>
        s && locale !== SOURCE_LOCALE
          ? await translate(s, SOURCE_LOCALE, locale)
          : s;
      return {
        src: p.src,
        alt: (await tr(p.alt)) ?? p.alt,
        name: await tr(p.name),
        caption: await tr(p.caption),
        hasBody: !!p.body,
        slug: p.slug,
      };
    })
  );
}
