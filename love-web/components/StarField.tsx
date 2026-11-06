"use client";

import { useEffect, useState } from "react";

type Star = { x: number; y: number; s: number; d: number };

// พื้นหลังดาวระยิบระยับ + ดาวตก (สุ่มฝั่ง client เพื่อไม่ให้ hydration ไม่ตรง)
export default function StarField({ count = 90 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 0.5,
        d: Math.random() * 4,
      }))
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.s,
            height: st.s,
            animationDelay: `${st.d}s`,
            boxShadow: st.s > 2 ? "0 0 6px #ffd98a" : undefined,
          }}
        />
      ))}
      <span
        className="absolute right-[8%] top-[12%] h-px w-28 animate-shoot bg-gradient-to-r from-white to-transparent"
        style={{ animationDelay: "1s", animationDuration: "7s" }}
      />
    </div>
  );
}
