import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Research from "@/components/Research";

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Reveal>
      <Research />
    </Reveal>
  );
}
