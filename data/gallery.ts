export type Photo = {
  src: string;       // path under public/, e.g. "/gallery/team.jpg"
  alt: string;       // accessibility text (for screen readers)
  name?: string;     // event title or short label
  caption?: string;  // optional secondary line (date, place…)
  slug?: string;     // override URL slug; defaults to src filename
  body?: string;     // optional long-form body. If present, the card
                     // becomes clickable → /gallery/<slug> detail page.
  extraImages?: string[]; // optional extra photos shown on the detail page
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
//  How to add an event:
//   1. Drop the cover image into  public/gallery/  (e.g. ncm.jpg)
//   2. Add an entry below:
//      - src: "/gallery/<filename>"
//      - alt: short description (screen readers)
//      - name: event title (shown bold under card)
//      - caption: optional date / place
//      - body: optional long-form write-up.
//
//  ─── BODY FORMATTING ────────────────────────────────────────────
//   • Separate paragraphs with a blank line (`\n\n`).
//   • Embed an extra image inline using markdown syntax on its own
//     line. The text in [] becomes the caption shown under it:
//
//        body: "First paragraph here.\n\n" +
//              "![Caption text](/gallery/extra.jpg)\n\n" +
//              "More text after the image.",
//
//   • You can also concatenate strings with `+` (TypeScript) for
//     readability, OR use a backtick template literal — see the
//     liangvelab entry below for an example.
//   • Image paths inside ![]() ARE NOT translated; only the surrounding
//     prose is sent to the translator.
//
//   • extraImages[]: alternative way to drop extra photos — they all
//     appear in a grid at the bottom of the detail page (no captions).
// =================================================================

export const gallery: Photo[] = [
  {
    src: "/gallery/hoplab30.5.jpg",
    alt: "Họp Lab tháng 5/2026",
    name: "Họp Lab tháng 5/2026: Chia sẻ tiến độ nghiên cứu và thảo luận kế hoạch sắp tới",
    caption: "Hanoi · May 2026",
    body: "Buổi họp Lab định kỳ tháng 5/2026 quy tụ các nghiên cứu sinh, học viên cao học và sinh viên đại học của ITD Lab. Mỗi đề tài trình bày tiến độ trong 5–10 phút, sau đó nhận góp ý từ giảng viên hướng dẫn và các thành viên khác. Buổi họp cũng thống nhất kế hoạch cho quý tới: chuẩn bị hồ sơ submit cho hội nghị quốc tế, hoàn thiện bài báo journal, và phân công các nhóm sinh viên đại học vào các đề tài đang triển khai.",
  },

  {
    src: "/gallery/mou_signing.jpg",
    alt: "Lễ ký kết MoU giữa Trường Cơ khí HUST và MCUT",
    name: "Trường Cơ khí tổ chức Seminar khoa học của GS. Jing-Wei Liang và ký kết Biên bản ghi nhớ hợp tác với MCUT",
    caption: "Hanoi · April 2026",
    body: "Trường Cơ khí, Đại học Bách Khoa Hà Nội tổ chức Seminar khoa học do Giáo sư Jing-Wei Liang (Ming Chi University of Technology, Đài Loan) trình bày về các phương pháp chẩn đoán cơ khí trên nền tảng AI và digital twin. Cùng buổi seminar, lãnh đạo Trường Cơ khí và MCUT ký Biên bản ghi nhớ (MoU) hợp tác về đào tạo, trao đổi sinh viên cao học và các đề tài nghiên cứu chung. ITD Lab là đơn vị trực tiếp triển khai các hoạt động hợp tác nghiên cứu trong khuôn khổ MoU.",
  },
  {
    src: "/gallery/liangvelab.jpg",
    alt: "Giáo sư Jing-Wei Liang (MCUT) và Giáo sư Yong-Hwa Park (KAIST) thăm ITD Lab",
    name: "Chào đón Giáo sư Jing-Wei Liang từ Đại học MCUT Đài Loan đến thăm và làm việc cùng Lab và Giáo sư Yong-Hwa Park từ KAIST Hàn Quốc",
    caption: "Hanoi · April 2026",
    body: `ITD Lab có vinh dự đón tiếp Giáo sư Jing-Wei Liang (MCUT, Đài Loan) và Giáo sư Yong-Hwa Park (KAIST, Hàn Quốc) trong chuyến công tác chung tại Hà Nội.

![Trao đổi học thuật cùng GS. Jing-Wei Liang](/gallery/liangvelab2.jpg)
![Trao đổi học thuật cùng GS. Jing-Wei Liang](/gallery/liangvelab3.jpg)

Hai giáo sư cùng các thành viên của lab trao đổi về hướng hợp tác trong lĩnh vực chẩn đoán hỏng hóc dựa trên tín hiệu rung, digital twin cho cơ cấu truyền động chính xác, và transfer learning giữa dữ liệu mô phỏng và dữ liệu thực.

Cuộc làm việc cũng mở ra khả năng cho các chương trình trao đổi sinh viên giữa ITD Lab, MCUT và KAIST trong các năm tới.`,
  },
    {
    src: "/gallery/hoinghianhhung.jpg",
    alt: "Hội nghị sinh viên nghiên cứu khoa học toàn quốc 2023-2024",
    name: "Hội nghị sinh viên nghiên cứu khoa học toàn quốc lần thứ 41 (2023-2024) tại Đại học Bách Khoa Hà Nội",
    caption: "Hanoi · May 2024",
    body: `Các thành viên ITD Lab tham gia Hội nghị Sinh viên Nghiên cứu Khoa học Toàn quốc lần thứ 41 do Đại học Bách Khoa Hà Nội đăng cai tổ chức. Đề tài của lab được trình bày trong tiểu ban Cơ khí, tập trung vào chẩn đoán hỏng hóc dựa trên tín hiệu rung và các phương pháp xử lý tín hiệu thời gian-tần số. Đây là dịp để sinh viên trình bày kết quả, trao đổi với hội đồng giảng viên và mở rộng quan hệ với các lab cùng hướng nghiên cứu trên cả nước.
    ![Phạm Thái Hưng (Mr. Phó)](/gallery/hoinghianhhung2.jpg)`,
  },
];
