import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude /studio (Sanity Studio) so next-intl doesn't add a locale
  // prefix to it. Also excludes api, Next internals, and static files.
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
