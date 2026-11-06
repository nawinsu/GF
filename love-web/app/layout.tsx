import type { Metadata, Viewport } from "next";
import { Charmonman, Playfair_Display, Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StarField from "@/components/StarField";
import { site } from "@/lib/content";

// ฟอนต์ถูกดาวน์โหลดมาเก็บในเว็บตอน build
// คนดูจึงไม่ต้องโหลดจาก Google (ไม่มีใครภายนอกรู้ว่าใครเปิดเว็บนี้)
const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-prompt",
  display: "swap",
});
// หัวข้อภาษาอังกฤษ: serif อ่านง่ายแต่ยังดูหรู
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const charm = Charmonman({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
  variable: "--font-charm",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  // เว็บส่วนตัว: ไม่ให้ Google / Bing เก็บเข้า search
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0716",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${prompt.variable} ${display.variable} ${charm.variable}`}>
      <body>
        <StarField />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
