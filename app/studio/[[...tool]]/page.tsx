// =================================================================
//  STUDIO ROUTE  →  itdhust.com/studio
// =================================================================
//  Phương án A: Studio nhúng trong web.
//
//  ⮕ ĐỂ CHUYỂN SANG PHƯƠNG ÁN B (Studio host riêng tại
//    *.sanity.studio): chỉ cần XÓA cả folder app/studio/ này, rồi
//    chạy `npx sanity deploy`. Data và schema giữ nguyên.
// =================================================================

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

// viewport must come from next-sanity so the Studio renders full-screen.
// (metadata title/robots is set in the studio layout instead.)
export { viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
