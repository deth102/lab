export type ResearchArea = {
  title: string;
  description: string;
  keywords: string[];
};

// EDIT TO UPDATE THE LAB'S RESEARCH FOCUS AREAS.
export const researchAreas: Record<"en" | "vi", ResearchArea[]> = {
  en: [
    {
      title: "Vibration-Based Fault Diagnosis",
      description:
        "Detecting and classifying mechanical faults in rotating machinery (bearings, gearboxes, planetary roller screws) directly from raw vibration signals using both physics-driven features and deep learning.",
      keywords: ["Vibration analysis", "Spectral methods", "VMD", "Envelope analysis"],
    },
    {
      title: "Prognostics & Health Management (PHM)",
      description:
        "Estimating Remaining Useful Life (RUL) and degradation trends of industrial equipment to enable predictive maintenance and reduce unplanned downtime.",
      keywords: ["RUL prediction", "Degradation modeling", "Condition monitoring"],
    },
    {
      title: "AI for Diagnostics",
      description:
        "Applying CNN, Transformer and transfer-learning models to fault classification, with a focus on explainability and robustness across operating conditions.",
      keywords: ["1D-CNN", "Transformer", "Transfer Learning", "Explainable AI"],
    },
    {
      title: "Digital Twin & Simulation",
      description:
        "Building physics-grounded digital twins (FEA + multibody dynamics) of mechanical systems to generate labeled fault data where real-world failure samples are scarce.",
      keywords: ["ANSYS", "MSC Adams", "Multibody", "Sim-to-real"],
    },
    {
      title: "Edge Deployment",
      description:
        "Compressing and deploying diagnostic models onto edge hardware for standalone, real-time inference at the machine level.",
      keywords: ["Edge AI", "Model compression", "Real-time inference"],
    },
    {
      title: "Gearbox & PRS Diagnostics",
      description:
        "Dedicated study of fault mechanisms in gearboxes and planetary roller screws, combining analytical contact mechanics with data-driven detection.",
      keywords: ["Gearbox", "Planetary Roller Screw", "Hertzian contact"],
    },
  ],
  vi: [
    {
      title: "Chẩn đoán lỗi dựa trên tín hiệu rung",
      description:
        "Phát hiện và phân loại các dạng hỏng cơ khí trong máy quay (ổ lăn, hộp số, vít-me bi đũa) trực tiếp từ tín hiệu rung thô, kết hợp đặc trưng vật lý và deep learning.",
      keywords: ["Phân tích rung", "Phương pháp phổ", "VMD", "Envelope analysis"],
    },
    {
      title: "Prognostics & Health Management (PHM)",
      description:
        "Ước lượng tuổi thọ còn lại (RUL) và xu hướng suy giảm của thiết bị công nghiệp, phục vụ bảo trì dự đoán và giảm thời gian dừng máy ngoài kế hoạch.",
      keywords: ["Dự báo RUL", "Mô hình suy giảm", "Giám sát tình trạng"],
    },
    {
      title: "AI cho chẩn đoán",
      description:
        "Ứng dụng CNN, Transformer và transfer learning vào phân loại lỗi, chú trọng tính giải thích được và khả năng tổng quát hoá qua các điều kiện vận hành khác nhau.",
      keywords: ["1D-CNN", "Transformer", "Transfer Learning", "Explainable AI"],
    },
    {
      title: "Digital Twin & Mô phỏng",
      description:
        "Xây dựng các digital twin có nền tảng vật lý (FEA + multibody dynamics) cho hệ cơ khí, để sinh dữ liệu hỏng có nhãn ở những bài toán mà dữ liệu thực rất khan hiếm.",
      keywords: ["ANSYS", "MSC Adams", "Multibody", "Sim-to-real"],
    },
    {
      title: "Triển khai trên Edge",
      description:
        "Nén và triển khai mô hình chẩn đoán lên phần cứng edge, cho phép suy luận thời gian thực, độc lập ngay tại máy.",
      keywords: ["Edge AI", "Nén mô hình", "Suy luận thời gian thực"],
    },
    {
      title: "Chẩn đoán hộp số & PRS",
      description:
        "Nghiên cứu chuyên sâu về cơ chế hỏng của hộp số và vít-me bi đũa hành tinh, kết hợp cơ học tiếp xúc giải tích với phát hiện dựa trên dữ liệu.",
      keywords: ["Hộp số", "Planetary Roller Screw", "Tiếp xúc Hertz"],
    },
  ],
};
