import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import About from "@/components/About";
import Research from "@/components/Research";
import Publications from "@/components/Publications";
import Members from "@/components/Members";
import Join from "@/components/Join";
import News from "@/components/News";
import Contact from "@/components/Contact";

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
        <About />
      </Reveal>
      <Reveal>
        <Research />
      </Reveal>
      <Reveal>
        <Publications />
      </Reveal>
      <Reveal>
        <Members />
      </Reveal>
      <Reveal>
        <Join />
      </Reveal>
      <Reveal>
        <News />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </>
  );
}
