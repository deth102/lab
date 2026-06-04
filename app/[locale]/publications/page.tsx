import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

// Publications has been merged into /research. Keep this route as a
// redirect so old links / bookmarks still work.
export default async function PublicationsPage() {
  const locale = await getLocale();
  redirect({ href: "/research#publications", locale });
}
