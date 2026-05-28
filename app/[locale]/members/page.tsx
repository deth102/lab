import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Members from "@/components/Members";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Reveal>
      <Members />
    </Reveal>
  );
}
