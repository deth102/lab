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
// =================================================================

export type Partnership = {
  name: string;
  logo?: string;
  coverImage?: string; // (tùy chọn) ảnh nền cho card, vd "/partners/vicem.jpg"
  tagline: string;
  period?: string;
  summary: string;
  highlights?: string[];
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
      "ITD Lab phối hợp cùng Viện Công nghệ Xi măng VICEM tổ chức chương trình đào tạo chuyên sâu 5 ngày cho đội ngũ kỹ sư của Viện. Chương trình tập trung vào giám sát tình trạng thiết bị quay trong nhà máy xi măng, chẩn đoán và dự báo hỏng hóc dựa trên phân tích tín hiệu rung và trí tuệ nhân tạo. Tỷ lệ thực hành chiếm 55%, sử dụng dữ liệu thực tế và các công cụ mã nguồn mở.",
    highlights: [
      "Lý thuyết rung động của máy quay và các chuẩn ISO liên quan trong nhà máy công nghiệp.",
      "Chẩn đoán hư hỏng động cơ điện, hộp số bánh răng và máy nghiền đứng trên cơ sở phân tích tín hiệu rung.",
      "Mô hình học máy (SVM, Random Forest) và học sâu (Deep Learning) cho phân loại lỗi, kèm trích xuất đặc trưng và đánh giá mô hình.",
      "Giải thích mô hình bằng SHAP (XAI) và xây dựng trợ lý bảo trì thông minh dùng RAG.",
      "Thực hành cân bằng động và đo rung cho hệ truyền động quay.",
    ],
  },
];
