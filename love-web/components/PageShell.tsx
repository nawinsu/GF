"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { flow } from "@/lib/content";

type Props = {
  current: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

// โครงหน้ามาตรฐาน: หัวข้อตัวเขียน + เนื้อหา + ปุ่มย้อนกลับ/ต่อไปตาม Flow
export default function PageShell({ current, title, subtitle, children }: Props) {
  const idx = flow.findIndex((f) => f.href === current);
  const prev = idx > 0 ? flow[idx - 1] : null;
  const next = idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : null;

  return (
    <section className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 pb-12 pt-24 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center"
      >
        <h1 className="heading-script text-4xl sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 text-sm text-white/70">{subtitle}</p>}
      </motion.header>

      <div className="flex-1">{children}</div>

      <nav className="mt-14 flex items-center justify-between text-sm">
        {prev ? (
          <Link href={prev.href} className="text-white/60 transition hover:text-gold-300">
            ← {prev.label}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={next.href} className="btn-outline">
            ต่อไป: {next.label} →
          </Link>
        )}
      </nav>
    </section>
  );
}
