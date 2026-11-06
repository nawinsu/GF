"use client";

import { motion } from "framer-motion";

type HeartProps = {
  size?: number;
  className?: string;
  filled?: boolean;
  beat?: boolean;
};

// หัวใจ SVG ใช้ซ้ำได้ทั้งเว็บ (beat = เต้นตุบๆ)
export default function Heart({ size = 20, className = "", filled = true, beat = false }: HeartProps) {
  const path =
    "M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z";
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={beat ? { scale: [1, 1.18, 1, 1.12, 1] } : undefined}
      transition={beat ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : undefined}
      aria-hidden
    >
      <path
        d={path}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.6}
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

// หัวใจลอยขึ้นเป็นพลุ ใช้ตอนกด "ได้สิ" หน้าสุดท้าย
export function HeartBurst({ count = 24 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const x = (i / count) * 100 + (Math.random() * 6 - 3);
        const size = 14 + Math.random() * 26;
        return (
          <motion.span
            key={i}
            className={i % 3 === 0 ? "absolute text-gold-300" : "absolute text-blush"}
            style={{ left: `${x}%`, bottom: -40 }}
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{ y: "-110vh", opacity: [0, 1, 1, 0], rotate: Math.random() * 60 - 30 }}
            transition={{ duration: 3 + Math.random() * 2.5, delay: Math.random() * 1.2, ease: "easeOut" }}
          >
            <Heart size={size} />
          </motion.span>
        );
      })}
    </div>
  );
}
