export type NewsItem = {
  date: string;
  title: string;
  body: string;
};

// EDIT TO UPDATE LAB NEWS.
// Date format: ISO (YYYY-MM-DD). Newest first.
export const news: Record<"en" | "vi", NewsItem[]> = {
  en: [
    {
      date: "2026-01-15",
      title: "New Master's project: Digital Twin + Transfer Learning for PRS",
      body: "A 24-month project on planetary roller screw fault diagnosis using physics-grounded digital twins and transfer learning has kicked off.",
    },
    {
      date: "2024-11-10",
      title: "Lab represented at the National Conference on Mechanics",
      body: "Members of the lab presented recent work on edge-deployed fault diagnosis at NCM 2024.",
    },
    {
      date: "2024-06-20",
      title: "Master's defenses completed",
      body: "Several lab members successfully defended their Master's theses on vibration-based diagnostics.",
    },
    {
      date: "2024-03-05",
      title: "Alumni placements in Australia and Taiwan",
      body: "Former lab members continued PhD studies abroad in advanced diagnostics and signal processing groups.",
    },
  ],
  vi: [
    {
      date: "2026-01-15",
      title: "Đề tài Thạc sĩ mới: Digital Twin + Transfer Learning cho PRS",
      body: "Đề tài 24 tháng về chẩn đoán hỏng vít-me bi đũa hành tinh, sử dụng digital twin nền tảng vật lý và transfer learning, đã chính thức khởi động.",
    },
    {
      date: "2024-11-10",
      title: "Lab tham gia Hội nghị Cơ học Toàn quốc",
      body: "Các thành viên Lab trình bày các kết quả gần đây về chẩn đoán lỗi triển khai trên thiết bị edge tại NCM 2024.",
    },
    {
      date: "2024-06-20",
      title: "Bảo vệ thành công luận văn Thạc sĩ",
      body: "Một số thành viên Lab đã bảo vệ thành công luận văn Thạc sĩ về chẩn đoán dựa trên tín hiệu rung.",
    },
    {
      date: "2024-03-05",
      title: "Cựu thành viên du học Úc và Đài Loan",
      body: "Các cựu thành viên Lab tiếp tục học PhD ở nước ngoài trong các nhóm nghiên cứu về chẩn đoán và xử lý tín hiệu.",
    },
  ],
};
