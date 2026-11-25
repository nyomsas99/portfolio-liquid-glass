import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ==========================================
// EDIT METADATA & JUDUL TAB BROWSER DI SINI
// ==========================================
const SITE_INFO = {
  name: "Nyoman Sastrawan", // <-- Sesuaikan dengan nama lengkap Anda
  role: "Electrical Engineer, Full-Stack Web & IoT Developer",
  description:
    "Portfolio resmi — Spesialis instalasi PLTS Off-Grid, otomasi mikrokontroler ESP32 & IoT, serta pengembangan aplikasi web modern.",
  image: "/profile.jpeg",
};

export const metadata: Metadata = {
  title: `${SITE_INFO.name} — ${SITE_INFO.role}`,
  description: SITE_INFO.description,
  keywords: [
    "Electrical Engineer",
    "PLTS Off-Grid",
    "ESP32 IoT",
    "Full-Stack Web Developer",
    "PHP MySQL",
    "Next.js Portfolio",
  ],
  openGraph: {
    title: `${SITE_INFO.name} — ${SITE_INFO.role}`,
    description: SITE_INFO.description,
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: SITE_INFO.image,
        width: 800,
        height: 800,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_INFO.name} — ${SITE_INFO.role}`,
    description: SITE_INFO.description,
    images: [SITE_INFO.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${jakarta.className} antialiased`}>{children}</body>
    </html>
  );
}