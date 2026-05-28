// =================================================================
//  Open positions / Tuyển sinh — full call-for-applications content
//  Edit the EN / VI blocks below to keep both languages in sync.
// =================================================================

export type Bullet = string | { text: string; sub: string[] };

export type RecruitingContent = {
  title: string;
  subtitle: string;
  intro: string;
  intake: string;            // small label e.g. "Intake: Fall 2026"
  details: { heading: string; items: Bullet[] };
  benefits: { heading: string; items: Bullet[] };
  requirements: { heading: string; items: Bullet[] };
  preferred: { heading: string; items: Bullet[] };
  apply: { heading: string; body: string; cta: string };
};

export const recruiting: Record<"en" | "vi", RecruitingContent> = {
  vi: {
    title: "Tuyển sinh viên học Master",
    subtitle:
      "ITD Lab đang tìm kiếm sinh viên định hướng Master mảng Signal Processing & AI",
    intro:
      "ITD Lab (Intelligent Technical Diagnosis Lab), Đại học Bách khoa Hà Nội đang tìm kiếm sinh viên để tham gia lab vào kỳ năm học 2026.",
    intake: "Kỳ tuyển sinh · Năm học 2026",
    details: {
      heading: "Thông tin chi tiết",
      items: [
        "Phòng thí nghiệm: ITD Lab, C7-633M, Đại học Bách khoa Hà Nội (HUST)",
        "Lĩnh vực nghiên cứu: Signal Processing, Machine Learning, Deep Learning, Fault Diagnosis, Condition Monitoring, Time-series Analysis",
        {
          text: "Vị trí tuyển: Thành viên đội tuyển Olympic / sinh viên định hướng học Master",
          sub: [
            "Signal Processing & Digital Filtering (FFT, Wavelet, Stockwell Transform)",
            "AI for Industrial Applications & Fault Diagnosis",
            "Time-series Analysis & Intelligent Diagnostics",
            "Bearing & Rotating Machinery Condition Monitoring",
          ],
        },
      ],
    },
    benefits: {
      heading: "Chế độ",
      items: [
        "Hỗ trợ kinh phí theo dự án và năng lực (trao đổi cụ thể khi phỏng vấn)",
        {
          text: "Thưởng & hỗ trợ",
          sub: [
            "Cơ hội tham gia các đề tài nghiên cứu, dự án hợp tác với doanh nghiệp",
            "Hỗ trợ định hướng công bố khoa học (conference, journal SCIE/ESCI)",
            "Hỗ trợ học bổng RA theo kỳ (tùy dự án)",
            "Tham gia ôn luyện đội tuyển Olympic Nguyên lý máy",
          ],
        },
        "Môi trường nghiên cứu học thuật nghiêm túc, phù hợp định hướng học cao học/PhD",
      ],
    },
    requirements: {
      heading: "Điều kiện",
      items: [
        "Có GPA 2 kỳ gần nhất trên 3.0",
        "Có nền tảng kiến thức về Toán, Signal Processing, Machine Learning",
        "Biết MATLAB và/hoặc Python là một lợi thế lớn",
        "Sinh viên năm cuối hoặc đã tốt nghiệp đại học (có trong danh sách trúng tuyển thạc sĩ tại HUST)",
        "Có tinh thần tự học, chủ động và nghiêm túc trong nghiên cứu",
      ],
    },
    preferred: {
      heading: "Ưu tiên",
      items: [
        "Có kinh nghiệm học thuật, đồ án tốt nghiệp hoặc nghiên cứu liên quan đến AI/Signal Processing",
        "Quan tâm đến các bài toán thực tế như chẩn đoán lỗi, phân tích dữ liệu công nghiệp, bearing fault diagnosis",
        "Đã từng làm việc với FFT, Wavelet Transform, Butterworth filter, hoặc các dataset như CWRU",
      ],
    },
    apply: {
      heading: "Cách ứng tuyển",
      body: "Gửi email ngắn kèm CV và một đoạn chia sẻ định hướng nghiên cứu, lý do bạn quan tâm đến lab.",
      cta: "Gửi email ứng tuyển",
    },
  },
  en: {
    title: "Master's student admissions",
    subtitle:
      "ITD Lab is recruiting Master's-track students in Signal Processing & AI",
    intro:
      "ITD Lab (Intelligent Technical Diagnosis Lab), Hanoi University of Science and Technology is recruiting students to join the lab for the 2026 academic year.",
    intake: "Intake · Fall 2026",
    details: {
      heading: "Details",
      items: [
        "Lab: ITD Lab, room C7-633M, Hanoi University of Science and Technology (HUST)",
        "Research fields: Signal Processing, Machine Learning, Deep Learning, Fault Diagnosis, Condition Monitoring, Time-series Analysis",
        {
          text: "Positions: Olympic team members / Master's-track students",
          sub: [
            "Signal Processing & Digital Filtering (FFT, Wavelet, Stockwell Transform)",
            "AI for Industrial Applications & Fault Diagnosis",
            "Time-series Analysis & Intelligent Diagnostics",
            "Bearing & Rotating Machinery Condition Monitoring",
          ],
        },
      ],
    },
    benefits: {
      heading: "What we offer",
      items: [
        "Project-based stipend, calibrated to scope and ability (discussed in interview)",
        {
          text: "Bonuses & support",
          sub: [
            "Opportunities to join funded research projects and industry collaborations",
            "Guidance on publishing at conferences and SCIE/ESCI journals",
            "RA scholarships per term (subject to active projects)",
            "Coaching for the National Theory-of-Mechanisms Olympic team",
          ],
        },
        "Serious academic research environment suitable for an MSc/PhD trajectory",
      ],
    },
    requirements: {
      heading: "Requirements",
      items: [
        "GPA above 3.0 in the most recent two semesters",
        "Solid background in Mathematics, Signal Processing and Machine Learning",
        "MATLAB and/or Python skills are a strong plus",
        "Final-year undergraduate or fresh graduate (admitted to the HUST Master's program)",
        "Self-motivated, proactive and rigorous in research",
      ],
    },
    preferred: {
      heading: "Preferred",
      items: [
        "Academic experience, thesis work or prior research in AI / Signal Processing",
        "Interest in real-world problems such as fault diagnosis, industrial data analysis and bearing fault detection",
        "Hands-on experience with FFT, Wavelet Transform, Butterworth filters, or datasets such as CWRU",
      ],
    },
    apply: {
      heading: "How to apply",
      body: "Send a short email with your CV and a brief paragraph on your research interests and why you'd like to join the lab.",
      cta: "Send application email",
    },
  },
};
