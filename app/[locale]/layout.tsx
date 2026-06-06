import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import GearsBackground from "@/components/GearsBackground";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itdhust.com"),
  title: {
    default: "ITD Lab — Intelligent Technical Diagnostics | HUST",
    template: "%s | ITD Lab — HUST",
  },
  description:
    "ITD Lab (Intelligent Technical Diagnostics) at Hanoi University of Science and Technology (HUST). Vibration-based fault diagnosis, PHM and edge AI for industrial machinery.",
  keywords: [
    // --- Lab name variants (every way someone might type it) ---
    "ITD Lab",
    "ITDLab",
    "ITD",
    "ITD HUST",
    "ITDHUST",
    "itdhust",
    "ITD Lab HUST",
    "ITD Laboratory",
    "Lab ITD",
    "Intelligent Technical Diagnostics",
    "Intelligent Technical Diagnostics Lab",
    "Intelligent Technical Diagnostics Laboratory",
    "Intelligent Technical Diagnostics HUST",
    // --- Vietnamese lab names (có dấu) ---
    "Phòng thí nghiệm Chẩn đoán Kỹ thuật Thông minh",
    "Phòng nghiên cứu Chẩn đoán Kỹ thuật Thông minh",
    "Nhóm nghiên cứu Chẩn đoán Kỹ thuật Thông minh",
    "Lab Chẩn đoán Kỹ thuật Thông minh",
    "Chẩn đoán kỹ thuật thông minh",
    "Chẩn đoán kỹ thuật",
    "Lab chẩn đoán kỹ thuật",
    "ITD Bách Khoa",
    "ITD Đại học Bách Khoa Hà Nội",
    "Lab ITD Bách Khoa",
    "Phòng thí nghiệm ITD",
    // --- Vietnamese lab names (không dấu — người Việt hay gõ không dấu) ---
    "Phong thi nghiem Chan doan Ky thuat Thong minh",
    "Chan doan ky thuat thong minh",
    "Chan doan ky thuat",
    "Lab chan doan ky thuat",
    "ITD Bach Khoa",
    "ITD Dai hoc Bach Khoa Ha Noi",
    // --- University variants ---
    "HUST",
    "Hanoi University of Science and Technology",
    "Đại học Bách Khoa Hà Nội",
    "Trường Đại học Bách Khoa Hà Nội",
    "Bách Khoa Hà Nội",
    "Bách Khoa",
    "ĐHBK Hà Nội",
    "ĐHBKHN",
    "BKHN",
    "Dai hoc Bach Khoa Ha Noi",
    "Bach Khoa Ha Noi",
    "Bach Khoa",
    // --- English topic / field keywords ---
    "fault diagnosis",
    "vibration diagnosis",
    "vibration-based fault diagnosis",
    "PHM",
    "prognostics and health management",
    "predictive maintenance",
    "condition monitoring",
    "edge AI",
    "signal processing",
    "machine learning diagnostics",
    "deep learning",
    "rotating machinery",
    "bearing fault diagnosis",
    // --- Vietnamese topic / field keywords (có & không dấu) ---
    "chẩn đoán hỏng hóc",
    "chẩn đoán lỗi máy móc",
    "chẩn đoán rung động",
    "phân tích rung động",
    "giám sát tình trạng máy",
    "bảo trì dự đoán",
    "bảo trì dự báo",
    "xử lý tín hiệu",
    "học máy",
    "học sâu",
    "trí tuệ nhân tạo",
    "chẩn đoán ổ bi",
    "chẩn đoán động cơ",
    "chan doan hong hoc",
    "chan doan rung dong",
    "bao tri du doan",
    "giam sat tinh trang may",
    "xu ly tin hieu",
    "hoc may",
  ],
  alternates: {
    canonical: "/",
    languages: { en: "/", vi: "/vi" },
  },
  openGraph: {
    type: "website",
    siteName: "ITD Lab — HUST",
    title: "ITD Lab — Intelligent Technical Diagnostics | HUST",
    description:
      "Intelligent Technical Diagnostics Lab at Hanoi University of Science and Technology (HUST). Vibration-based fault diagnosis, PHM and edge AI.",
    url: "https://itdhust.com",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const themeInit = `(() => {
  try {
    const t = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && prefersDark)) document.documentElement.classList.add('dark');
  } catch (e) {}
})();`;

// JSON-LD — tells Google the lab's official name and EVERY alias it may be
// searched by (abbreviations, joined forms, Vietnamese names). This is what
// lets "ITD", "itdhust", "ITD HUST", "chẩn đoán kỹ thuật"… all resolve here.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: "ITD Lab — Intelligent Technical Diagnostics",
  alternateName: [
    "ITD Lab",
    "ITDLab",
    "ITD",
    "ITD HUST",
    "ITDHUST",
    "ITD Bách Khoa",
    "Intelligent Technical Diagnostics",
    "Intelligent Technical Diagnostics Laboratory",
    "Phòng thí nghiệm Chẩn đoán Kỹ thuật Thông minh",
    "Nhóm nghiên cứu Chẩn đoán Kỹ thuật Thông minh",
    "Chẩn đoán Kỹ thuật Thông minh",
    "Chan doan Ky thuat Thong minh",
  ],
  url: "https://itdhust.com",
  logo: "https://itdhust.com/logo.svg",
  description:
    "Intelligent Technical Diagnostics Lab at Hanoi University of Science and Technology (HUST): vibration-based fault diagnosis, PHM and edge AI for industrial machinery.",
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Hanoi University of Science and Technology",
    alternateName: ["HUST", "Đại học Bách Khoa Hà Nội", "Bách Khoa Hà Nội"],
    url: "https://hust.edu.vn",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hanoi",
    addressCountry: "VN",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <ScrollProgress />
          <BackgroundBlobs />
          <GearsBackground />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
