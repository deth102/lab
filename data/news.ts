export type NewsItem = {
  date: string;   // ISO format: YYYY-MM-DD
  title: string;  // Write in Vietnamese — auto-translated to other locales.
  body: string;   // Same — Vietnamese source of truth.
};

// =================================================================
//  EDIT LAB NEWS HERE — VIETNAMESE ONLY
// =================================================================
//  Just write in Vietnamese. The News component translates each
//  item on the fly when the page is rendered in another locale
//  (currently English), and caches the result.
//
//  Order: newest first.
// =================================================================

export const news: NewsItem[] = [
  {
    date: "2026-05-28",
    title: "Thạc sĩ Trung trúng tuyển vào chương trình tiến sĩ ở KAIST Hàn Quốc",
    body: "",
  },
    {
    date: "2026-05-20",
    title: "Cử nhân Cường trúng tuyển vào chương trình thạc sĩ NCU Đài Loan",
    body: "Đề tài 24 tháng về chẩn đoán hỏng vít-me bi đũa hành tinh, sử dụng digital twin nền tảng vật lý và transfer learning, đã chính thức khởi động.",
  },
    {
    date: "2026-06-05",
    title: "Cử Nhân Đỗ Danh Thanh Bình trúng tuyển chương trình trao đổi với MCUT Đài Loan",
    body: "",
  },

  {
    date: "2026-08-20",
    title: "Phạm Thái Hưng bảo vệ thành công luận văn Thạc sĩ",
    body: "Một số thành viên Lab đã bảo vệ thành công luận văn Thạc sĩ về chẩn đoán dựa trên tín hiệu rung.",
  },
];
