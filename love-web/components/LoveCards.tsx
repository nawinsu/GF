"use client";

import { motion } from "framer-motion";
import type { LoveIcon } from "@/lib/content";

const icons: Record<LoveIcon, React.ReactNode> = {
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5c1.8 2 5.2 2 7 0M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  voice: (
    <>
      <path d="M12 20s-7-4.3-8.8-8.5C1.9 8.4 3.7 5 7 5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.3 0 5.1 3.4 3.8 6.5C19 15.7 12 20 12 20z" />
      <path d="M9 12h1l1-2 2 4 1-2h1" />
    </>
  ),
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  heart: (
    <path d="M12 20s-7-4.3-8.8-8.5C1.9 8.4 3.7 5 7 5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.3 0 5.1 3.4 3.8 6.5C19 15.7 12 20 12 20z" />
  ),
  sparkle: (
    <path d="M12 3c.8 4.5 2.5 6.2 7 7-4.5.8-6.2 2.5-7 7-.8-4.5-2.5-6.2-7-7 4.5-.8 6.2-2.5 7-7zM19 16c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5z" />
  ),
  infinity: <path d="M7 9c-3 0-4 1.6-4 3s1 3 4 3c3.5 0 6.5-6 10-6 3 0 4 1.6 4 3s-1 3-4 3c-3.5 0-6.5-6-10-6z" />,
};

export default function LoveCards({ items }: { items: { icon: LoveIcon; title: string; sub: string }[] }) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
      {items.map((t, i) => (
        <motion.div
          key={t.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * i }}
          whileHover={{ y: -6, boxShadow: "0 0 30px rgba(247,198,107,.25)" }}
          className="glass flex flex-col items-center px-4 py-8 text-center"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold-300"
          >
            {icons[t.icon]}
          </svg>
          <p className="mt-4 text-gold-300">{t.title}</p>
          <p className="mt-1 text-sm text-white/65">{t.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
