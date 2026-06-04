import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Research from "@/components/Research";
import Publications from "@/components/Publications";

// /research now hosts BOTH the research areas and the publications
// list (merged into one scrolling page; the standalone /publications
// route redirects here).
export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Reveal>
        <Research />
      </Reveal>
      <Reveal staggerSelector="ul > li">
        <Publications />
      </Reveal>
    </>
  );
}
