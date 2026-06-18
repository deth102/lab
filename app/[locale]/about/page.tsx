import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import About from "@/components/About";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Reveal staggerSelector="article">
      <About />
    </Reveal>
  );
}
