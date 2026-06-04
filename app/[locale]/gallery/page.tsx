import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";

// Refresh against Sanity at most once per 60s.
export const revalidate = 60;

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Reveal staggerSelector="ul > li">
      <GalleryGrid />
    </Reveal>
  );
}
