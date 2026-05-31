import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import StatsBar from "@/components/StatsBar";
import Marquee from "@/components/Marquee";
import { memberGroups } from "@/data/members";
import { publicationsBibtex } from "@/data/publications";
import { parseBibtex } from "@/lib/bibtex";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hero");
  const ts = await getTranslations("Stats");

  const memberCount = memberGroups.reduce(
    (sum, g) => sum + g.members.length,
    0
  );
  const pubCount = parseBibtex(publicationsBibtex).length;
  const years = new Date().getFullYear() - 2023;

  const stats = [
    { value: memberCount, label: ts("members") },
    { value: pubCount, label: ts("publications") },
    { value: years, suffix: "+", label: ts("years") },
    { value: 6, label: ts("research") },
  ];

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
      <StatsBar stats={stats} />
      <Marquee />
      <Reveal>
        <News />
      </Reveal>
      <Reveal staggerSelector="li">
        <Gallery />
      </Reveal>
    </>
  );
}
