import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Partnership from "@/components/Partnership";

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Reveal staggerSelector="article">
      <Partnership />
    </Reveal>
  );
}
