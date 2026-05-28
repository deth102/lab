import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Recruiting from "@/components/Recruiting";

export default async function RecruitingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Reveal>
      <Recruiting />
    </Reveal>
  );
}
