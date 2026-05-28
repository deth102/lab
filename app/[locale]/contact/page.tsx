import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Join from "@/components/Join";
import Contact from "@/components/Contact";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Reveal>
        <Join />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </>
  );
}
