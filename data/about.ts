// =================================================================
//  GIỚI THIỆU LAB (About section)
// =================================================================
//  Viết bằng TIẾNG VIỆT — bản tiếng Anh tự động dịch khi hiển thị.
//  Nguồn: slide "ITD-HUST Introduction".
//
//  Gồm 3 phần:
//    1. model      — mô hình hoạt động của lab (từ nghiên cứu → sản phẩm)
//    2. strengths  — điểm mạnh nổi bật
//    3. researchGroups — 3 nhóm nghiên cứu chính, mỗi nhóm có hướng
//                        nghiên cứu và danh sách sinh viên (từ năm 2 trở đi)
//
//  Tên sinh viên khớp với data/members.ts (để lấy đúng ảnh). Mỗi thành
//  viên có thêm `strength` — 2–3 dòng điểm mạnh / hướng nghiên cứu.
//  Tên hiển thị ở /en tự đổi sang dạng "Manh-Cuong Nguyen" (xem About.tsx).
// =================================================================

// --- 1. Mô hình hoạt động ---
export const aboutIntro =
  "ITD Lab (Chẩn đoán Kỹ thuật Thông minh) theo đuổi mô hình khép kín: từ nghiên cứu nền tảng trong phòng thí nghiệm đến sản phẩm công nghiệp thực tế. Lab phát triển hệ thống giám sát sức khỏe máy móc dựa trên AI — kết hợp xử lý tín hiệu, học máy/học sâu và tri thức cơ khí — để chẩn đoán hỏng hóc, dự báo tuổi thọ còn lại (RUL) và tối ưu bảo trì cho thiết bị quay công nghiệp.";

export type ModelStep = {
  title: string;
  desc: string;
};

// Vòng đời "Từ nghiên cứu đến sản phẩm" (slide: From Laboratory Innovation
// to Industrial Products).
export const labModel: ModelStep[] = [
  {
    title: "Nghiên cứu nền tảng",
    desc: "Phát triển thuật toán xử lý tín hiệu rung và mô hình AI (autoencoder, CNN, domain adaptation) cho chẩn đoán hỏng hóc máy quay.",
  },
  {
    title: "Kiểm chứng trên dữ liệu thực",
    desc: "Đánh giá trên các bộ dữ liệu chuẩn (CWRU, SEU) và dữ liệu thu thập tại hiện trường nhà máy, đảm bảo độ tin cậy trước khi triển khai.",
  },
  {
    title: "Hệ thống giám sát thông minh",
    desc: "Tích hợp thành hệ thống giám sát sức khỏe máy móc: phát hiện bất thường, chẩn đoán nguyên nhân, dự báo RUL và đề xuất bảo trì.",
  },
  {
    title: "Chuyển giao công nghiệp",
    desc: "Đào tạo, tư vấn và triển khai giải pháp tại doanh nghiệp; hướng tới sản phẩm thương mại phù hợp điều kiện công nghiệp Việt Nam.",
  },
];

// --- 2. Điểm mạnh ---
export const labStrengths: { title: string; desc: string }[] = [
  {
    title: "Kết hợp AI và chuyên môn cơ khí",
    desc: "Hợp nhất trí tuệ nhân tạo, xử lý tín hiệu và kiến thức động lực học máy quay — thế mạnh hiếm có so với giải pháp thuần dữ liệu.",
  },
  {
    title: "Mô hình lai vật lý — dữ liệu",
    desc: "Sử dụng digital twin nền tảng vật lý kết hợp học máy, giúp chẩn đoán chính xác ngay cả khi dữ liệu lỗi hiếm.",
  },
  {
    title: "AI giải thích được (XAI)",
    desc: "Áp dụng Grad-CAM, Score-CAM, SHAP để giải thích quyết định của mô hình, tạo niềm tin cho kỹ sư hiện trường.",
  },
  {
    title: "Mạng lưới hợp tác quốc tế",
    desc: "Hợp tác với MCUT (Đài Loan), Griffith (Úc), UTTOP (Pháp), AGH (Ba Lan) và doanh nghiệp như VICEM, Samsung.",
  },
  {
    title: "Công bố khoa học chất lượng cao",
    desc: "Nhiều bài báo SCIE/Scopus Q1–Q2 về chẩn đoán rung động, học sâu và giám sát tình trạng máy quay.",
  },
  {
    title: "Đào tạo gắn với thực tiễn",
    desc: "Chuyển giao tri thức qua các khóa đào tạo doanh nghiệp và đội ngũ sinh viên nghiên cứu từ năm 2 đến tiến sĩ.",
  },
];

// --- 3. Ba nhóm nghiên cứu ---
export type GroupMember = {
  name: string; // tên tiếng Việt — khớp data/members.ts (để lấy ảnh)
  strengths: string[]; // các gạch đầu dòng điểm mạnh / hướng nghiên cứu (tiếng Việt)
};

export type Supervisor = {
  name: string; // tên tiếng Việt (kèm học vị)
  photo: string; // ảnh trong public/
};

export type ResearchGroup = {
  key: "ai" | "bio" | "modeling";
  name: string; // tên nhóm (tiếng Anh, giữ nguyên — đây là tên chuyên môn)
  tagline: string;
  focus: string; // hướng nghiên cứu chung của nhóm
  supervisor?: Supervisor;
  members: GroupMember[]; // sinh viên năm 2 trở đi
};

export const researchGroups: ResearchGroup[] = [
  {
    key: "ai",
    name: "AI Diagnostics & Prognostics",
    tagline: "Chẩn đoán & dự báo hỏng hóc bằng Trí tuệ nhân tạo",
    focus:
      "Phát triển mô hình học sâu và học máy cho chẩn đoán hỏng hóc, phát hiện bất thường và dự báo tuổi thọ còn lại của thiết bị quay: mạng tích chập (CNN), autoencoder, domain adaptation, AI giải thích được và phương pháp dựa trên dữ liệu cho giám sát hộp số, ổ lăn, động cơ.",
    supervisor: { name: "TS. Trương Quốc Chiến", photo: "/members/chien.jpg" },
    members: [
      {
        name: "Đỗ Danh Thanh Bình",
        strengths: [
          "Chẩn đoán hỏng hóc dựa trên học sâu cho thiết bị quay.",
          "Mạnh về xây dựng và huấn luyện mô hình.",
          "Xử lý dữ liệu rung động thực tế.",
        ],
      },
      {
        name: "Phạm Thái Hưng",
        strengths: [
          "Phân tích tín hiệu rung và chẩn đoán hệ rotor–ổ đỡ.",
          "Vững nền tảng xử lý tín hiệu.",
          "Kết hợp đặc trưng miền thời gian–tần số với mô hình AI.",
        ],
      },
      {
        name: "Nguyễn Mạnh Cường",
        strengths: [
          "Phương pháp dựa trên dữ liệu cho chẩn đoán hỏng hóc.",
          "Thành thạo pipeline học máy và trích xuất đặc trưng.",
          "Đánh giá mô hình, tránh rò rỉ dữ liệu.",
        ],
      },
      {
        name: "Ths. Lê Phúc Tân",
        strengths: [
          "Nghiên cứu sinh về chẩn đoán dựa trên AI.",
          "Mạnh về học sâu.",
          "Xây dựng pipeline chẩn đoán hỏng hóc máy quay.",
        ],
      },
      {
        name: "Hoàng Nhân Phúc",
        strengths: [
          "Giám sát chế tạo cộng (AM).",
          "Chẩn đoán trong điều kiện không dừng.",
          "Khung dữ liệu cho giám sát sức khỏe hộp số.",
        ],
      },
      {
        name: "Nguyễn Công Minh",
        strengths: [
          "Phương pháp đồng tích hợp (cointegration) cho tín hiệu không dừng.",
          "Tư duy thống kê tốt.",
          "Áp dụng vào phát hiện bất thường.",
        ],
      },
      {
        name: "Nguyễn Đình Bách",
        strengths: [
          "Xử lý và phân tích dữ liệu rung động phục vụ chẩn đoán.",
          "Cẩn thận trong chuẩn hóa dữ liệu.",
          "Đánh giá mô hình.",
        ],
      },
      {
        name: "Bùi Minh Thắng",
        strengths: [
          "Ứng dụng AI vào chẩn đoán tín hiệu.",
          "Ham học hỏi, nhanh nhạy với công cụ học máy.",
          "Thực hành mô hình.",
        ],
      },
    ],
  },
  {
    key: "bio",
    name: "Bio-Sensor",
    tagline: "Cảm biến sinh học & đo lường thông minh",
    focus:
      "Nghiên cứu cảm biến sinh học và kỹ thuật đo lường tiên tiến phục vụ thu thập tín hiệu chất lượng cao cho giám sát tình trạng và chẩn đoán.",
    supervisor: { name: "TS. Trần Thị Mai", photo: "/members/thimai.jpg" },
    members: [
      {
        name: "Nguyễn Quang Huy",
        strengths: [
          "Phát triển và tích hợp cảm biến cho đo lường tín hiệu.",
          "Mạnh về thiết kế hệ thu thập dữ liệu.",
          "Xử lý tín hiệu cảm biến.",
        ],
      },
      {
        name: "Lê Công Hiếu",
        strengths: [
          "Thực nghiệm cảm biến và hiệu chuẩn phép đo.",
          "Tỉ mỉ trong bố trí thí nghiệm.",
          "Đảm bảo chất lượng dữ liệu thu thập.",
        ],
      },
    ],
  },
  {
    key: "modeling",
    name: "Modeling & Simulation",
    tagline: "Mô hình hóa & mô phỏng hệ cơ điện tử",
    focus:
      "Mô hình hóa và mô phỏng động lực học hệ truyền động quay: động lực học bánh răng, hệ rotor–ổ đỡ, hệ cơ điện tử và robot; xây dựng digital twin nền tảng vật lý làm cơ sở cho chẩn đoán lai vật lý — dữ liệu.",
    supervisor: {
      name: "TS. Nguyễn Thái Minh Tuấn",
      photo: "/members/minhtuan.png",
    },
    members: [
      {
        name: "Lê Mạnh Tuấn",
        strengths: [
          "Mô hình hóa và mô phỏng hệ rotor–ổ đỡ.",
          "Vững về cơ học và mô phỏng động lực học.",
          "Nền tảng cho digital twin.",
        ],
      },
      {
        name: "Phạm Tuấn Đông",
        strengths: [
          "Mô hình hóa và mô phỏng động lực học bánh răng.",
          "Mạnh về phân tích đáp ứng động.",
          "Phân tích đặc trưng dao động của bộ truyền.",
        ],
      },
      {
        name: "Hoàng Văn Anh",
        strengths: [
          "Mô hình hóa và mô phỏng hệ rotor–ổ đỡ.",
          "Kết hợp mô phỏng với dữ liệu thực.",
          "Hiệu chỉnh mô hình.",
        ],
      },
    ],
  },
];
