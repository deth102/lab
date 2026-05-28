import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Publications from "@/components/Publications";

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Reveal>
      <Publications />
    </Reveal>
  );
}
