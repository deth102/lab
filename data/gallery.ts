export type Photo = {
  src: string;       // path under public/, e.g. "/gallery/team.jpg"
  alt: string;       // accessibility text (for screen readers)
  name?: string;     // event title or short label
  caption?: string;  // optional secondary line (date, place…)
};

// =================================================================
//  GALLERY = LAB EVENTS / ACTIVITIES
// =================================================================
//  This section showcases lab events: conferences, defenses, lab
//  outings, group photos, experiments, equipment, etc.
//
//  Individual member portraits live in  data/members.ts (use the
//  `photo` field there), NOT here.
//
//  How to add an event photo:
//   1. Drop the image into  public/gallery/  (e.g. ncm-2024.jpg)
//   2. Add an entry below:
//      - src: "/gallery/<filename>"
//      - alt: short description (screen readers)
//      - name: event title (shown bold under card)
//      - caption: optional date / place
//
//  TEMPLATE:
//
//    {
//      src: "/gallery/ncm-2024.jpg",
//      alt: "Lab members presenting at NCM 2024",
//      name: "National Conference on Mechanics",
//      caption: "Hanoi · November 2024",
//    },
// =================================================================

export const gallery: Photo[] = [
     {
       src: "/gallery/liangvelab.jpg",
       alt: "...",
       name: "Chào đón Giáo sư Jing-Wei Liang từ Đại học MCUT Đài Loan đến thăm và làm việc cùng Lab và Giáo sư Yong-Hwa Park từ KAIST Hàn Quốc",
       caption: "Hanoi · November 2024",
     },
];
