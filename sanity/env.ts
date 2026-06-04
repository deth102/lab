// =================================================================
//  SANITY ENVIRONMENT
// =================================================================
//  projectId is PUBLIC (safe to commit). You get it after creating a
//  free project at https://sanity.io — see HUONG_DAN_CMS.md.
//
//  Set these in .env.local (local dev) and in Vercel → Settings →
//  Environment Variables (production):
//     NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
//     NEXT_PUBLIC_SANITY_DATASET=production
// =================================================================

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True when a real Sanity project is configured. When false, the site
 *  falls back to the static data files (data/news.ts, data/gallery.ts). */
export const sanityEnabled = projectId.length > 0;
