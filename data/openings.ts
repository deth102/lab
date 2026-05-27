export type Opening = {
  title: string;
  level: "Bachelor" | "Master" | "PhD" | "Research Assistant";
  topic: string;
  requirements: string[];
};

// EDIT TO UPDATE OPEN POSITIONS / THESIS TOPICS.
export const openings: Record<"en" | "vi", Opening[]> = {
  en: [
    {
      title: "Bearing fault detection on edge devices",
      level: "Bachelor",
      topic: "Build a low-power pipeline (preprocessing + classical ML) that runs on an MCU and detects early-stage bearing faults from raw accelerometer data.",
      requirements: [
        "Background in Mechatronics / Electrical / Computer Engineering",
        "Comfortable with Python, basic signal processing",
        "Bonus: C/C++ on microcontrollers",
      ],
    },
    {
      title: "Transfer learning across machines",
      level: "Master",
      topic: "Reduce the domain gap between simulated vibration data and real measurements using DANN, CORAL or MMD strategies.",
      requirements: [
        "Solid Python + PyTorch / TensorFlow",
        "Understanding of CNN/Transformer architectures",
        "Interest in domain adaptation literature",
      ],
    },
    {
      title: "Digital twin for rotating machinery",
      level: "Master",
      topic: "Build FEA + multibody digital twins (ANSYS, MSC Adams) to generate labeled fault data for downstream AI training.",
      requirements: [
        "ANSYS / MSC Adams experience",
        "Strong mechanics fundamentals",
        "Comfortable bridging simulation and ML pipelines",
      ],
    },
  ],
  vi: [
    {
      title: "Phát hiện lỗi ổ lăn trên thiết bị edge",
      level: "Bachelor",
      topic: "Xây dựng pipeline tiêu thụ năng lượng thấp (tiền xử lý + ML cổ điển) chạy trên MCU, phát hiện sớm lỗi ổ lăn từ tín hiệu gia tốc thô.",
      requirements: [
        "Nền tảng Cơ điện tử / Điện / Máy tính",
        "Thành thạo Python, xử lý tín hiệu cơ bản",
        "Ưu tiên: C/C++ trên vi điều khiển",
      ],
    },
    {
      title: "Transfer learning giữa các máy khác nhau",
      level: "Master",
      topic: "Giảm domain gap giữa dữ liệu rung mô phỏng và đo thực, dùng các chiến lược DANN, CORAL hoặc MMD.",
      requirements: [
        "Python + PyTorch / TensorFlow tốt",
        "Hiểu kiến trúc CNN / Transformer",
        "Có hứng thú với mảng domain adaptation",
      ],
    },
    {
      title: "Digital twin cho máy quay",
      level: "Master",
      topic: "Xây dựng digital twin FEA + multibody (ANSYS, MSC Adams) để sinh dữ liệu hỏng có nhãn phục vụ huấn luyện AI.",
      requirements: [
        "Kinh nghiệm ANSYS / MSC Adams",
        "Nền tảng cơ học vững",
        "Thoải mái kết nối mô phỏng với pipeline ML",
      ],
    },
  ],
};
