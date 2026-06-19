// =================================================================
//  HỢP TÁC DOANH NGHIỆP (Industry partnerships)
// =================================================================
//  Viết bằng TIẾNG VIỆT. Bản tiếng Anh tự động dịch khi hiển thị.
//
//  Thêm một hợp tác mới: copy một khối {} trong `partnerships` và sửa.
//    - name:     tên đối tác (giữ nguyên, không dịch)
//    - logo:     (tùy chọn) đường dẫn logo trong public/, vd "/partners/vicem.png"
//    - tagline:  một dòng mô tả ngắn
//    - period:   thời gian / mốc
//    - summary:  đoạn mô tả tổng quan
//    - highlights: các gạch đầu dòng nội dung chính (tùy chọn)
//    - slides:   (tùy chọn) tài liệu slide (PDF) để tải/xem trên web.
//                title viết TIẾNG ANH (không dịch); file đặt trong public/.
// =================================================================

export type PartnerSlide = {
  title: string; // tiêu đề tiếng Anh (KHÔNG dịch)
  file: string; // đường dẫn PDF trong public/, vd "/slides/vicem/day1.pdf"
};

export type Partnership = {
  name: string;
  logo?: string;
  coverImage?: string; // (tùy chọn) ảnh nền cho card, vd "/partners/vicem.jpg"
  tagline: string;
  period?: string;
  summary: string;
  highlights?: string[];
  slidesTitle?: string; // tiêu đề khối slide (vd "Tài liệu khóa học")
  slides?: PartnerSlide[];
  // Tài liệu không thuộc giáo trình 5 ngày (vd blueprint quạt công nghiệp).
  referenceSlides?: PartnerSlide[];
};

// Phần giới thiệu chung (đầu trang). Viết tiếng Việt.
export const partnershipIntro =
  "ITD Lab đồng hành cùng doanh nghiệp trong chuyển giao công nghệ chẩn đoán hỏng hóc, giám sát rung động và bảo trì dự báo dựa trên AI cho thiết bị quay công nghiệp. Chúng tôi cung cấp đào tạo chuyên sâu, tư vấn kỹ thuật và triển khai giải pháp thực tế tại nhà máy.";

export const partnerships: Partnership[] = [
  {
    name: "Viện Công nghệ Xi măng VICEM",
    // logo: "/partners/vicem.png",   // thêm logo nếu có
    coverImage: "/partners/vicem.jpg",
    tagline:
      "Đào tạo chuyên đề: Giám sát rung động thông minh & Bảo trì dự báo dựa trên AI cho thiết bị quay",
    period: "8–12/6/2026 · Hà Nội",
    summary:
      "ITD Lab phối hợp cùng Viện Công nghệ Xi măng VICEM tổ chức chương trình đào tạo chuyên sâu 5 ngày (mã VCN.VC.2026.13) cho 18 kỹ sư đến từ 7 đơn vị thành viên của VICEM. Chương trình đi theo lộ trình từ nền tảng đến ứng dụng: bắt đầu từ lý thuyết rung động và chiến lược bảo trì, qua chẩn đoán hư hỏng từng cụm thiết bị quay, đến các phương pháp Trí tuệ nhân tạo cho chẩn đoán và bảo trì dự báo. Định hướng thực hành cao (40% lý thuyết · 55% thực hành · 5% đánh giá) trên dữ liệu rung động thực tế và công cụ mã nguồn mở.",
    highlights: [
      "Ngày 1 — Nền tảng: vai trò của giám sát rung động, ba chiến lược bảo trì (phản ứng / phòng ngừa / dự đoán theo RUL); lý thuyết rung động máy quay (biên độ, tần số, pha) và chuẩn đánh giá ISO 20816; nhập môn PHM và Trí tuệ nhân tạo.",
      "Ngày 2 — Chẩn đoán bộ truyền bánh răng (tần số ăn khớp GMF, sai số truyền động, dải biên) và ổ đỡ con lăn (tần số lỗi BPFO/BPFI/BSF/FTF, phân tích phổ đường bao); tiếp nối PHM/AI: từ tín hiệu đến quyết định.",
      "Ngày 3 — Chẩn đoán máy nghiền kiểu đứng (VRM): cấu tạo, bản đồ hư hỏng theo cụm chi tiết, hệ thống đo (Autospectrum, Envelope, Time waveform) và AI đa nguồn tín hiệu kết hợp vật lý — dữ liệu.",
      "Ngày 4 — Trợ lý bảo trì thông minh dùng RAG (Retrieval-Augmented Generation); và Machine Learning chẩn đoán hư hỏng ổ lăn trên bộ dữ liệu CWRU: pipeline 7 bước, SVM và Random Forest, tránh rò rỉ dữ liệu.",
      "Ngày 5 — Mất cân bằng động trong hệ truyền động quay: các dạng mất cân bằng, nhận biết qua phân tích rung động (đỉnh 1X, lệch pha 90°) và thực hành cân bằng động tại hiện trường.",
    ],
    slidesTitle: "Tài liệu khóa học (slide)",
    slides: [
      {
        title: "Day 1 — Course Introduction & Vibration Monitoring",
        file: "/slides/vicem/day1-course-introduction.pdf",
      },
      {
        title: "Day 1–2 — AI Methods for Prognostics & Health Management",
        file: "/slides/vicem/day1-2-ai-methods-for-phm.pdf",
      },
      {
        title: "Day 2 — Common Faults in Gears & Bearings, ISO Standards",
        file: "/slides/vicem/day2-common-faults-gear-bearing-iso.pdf",
      },
      {
        title: "Day 3 — Vertical Roller Mill Fault Diagnosis",
        file: "/slides/vicem/day3-vertical-roller-mill-diagnosis.pdf",
      },
      {
        title: "Day 4 — RAG for Industrial Applications & PHM",
        file: "/slides/vicem/day4-rag-for-industrial-phm.pdf",
      },
      {
        title: "Day 4 — Machine Learning for Bearing Fault Diagnosis",
        file: "/slides/vicem/day4-machine-learning-bearing-fault.pdf",
      },
      {
        title: "Day 5 — Dynamic Balancing of Rotating Machinery",
        file: "/slides/vicem/day5-dynamic-balancing.pdf",
      },
    ],
    referenceSlides: [
      {
        title: "Cement ID Fan — Performance Blueprint",
        file: "/slides/vicem/reference/cement-id-fan-performance.pdf",
      },
      {
        title: "Industrial Fan — Optimization Blueprint",
        file: "/slides/vicem/reference/industrial-fan-optimization.pdf",
      },
    ],
  },
];
