import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import News from "@/components/News";
import Gallery from "@/components/Gallery";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hero");

  return (
    <>
      <Hero
        eyebrow={t("eyebrow")}
        name={t("name")}
        fullName={t("fullName")}
        tagline={t("tagline")}
        bio={t("bio")}
        ctaPrimary={t("ctaPrimary")}
        ctaSecondary={t("ctaSecondary")}
      />
      <Reveal>
        <News />
      </Reveal>
      <Reveal>
        <Gallery />
      </Reveal>
    </>
  );
}
