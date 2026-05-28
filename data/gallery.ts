export type Photo = {
  src: string;       // path under public/, e.g. "/gallery/team.jpg"
  alt: string;       // accessibility text (for screen readers)
  name?: string;     // who/what is in the photo — shown as the main label
  caption?: string;  // optional secondary line (role, year, event…)
};

// =================================================================
//  HOW TO ADD A PHOTO
// =================================================================
//  1. Drop the image into  public/gallery/  (e.g. cuong.jpg)
//  2. Add an entry below with:
//      - src: "/gallery/<filename>"   (case-sensitive on Vercel!)
//      - alt: short description (for screen readers)
//      - name: who is in the photo (shown under the card)
//      - caption: optional extra line (role, event, year…)
//
//  Tips:
//   - Square-ish photos look best (the grid uses a 4:3 aspect ratio).
//   - Keep file size under ~500 KB. Use .jpg/.webp.
//   - Order: top-left first, reading order (left → right, top → bottom).
// =================================================================

export const gallery: Photo[] = [
  {
    src: "/gallery/cuong.JPG",
    alt: "Nguyễn Mạnh Cường",
    name: "Nguyễn Mạnh Cường",
    caption: "Master's researcher · NCU, Taiwan",
  },
  {
    src: "/gallery/hung.jpg",
    alt: "Phạm Thái Hưng",
    name: "Phạm Thái Hưng",
    caption: "Master's researcher · HUST",
  },
];
