"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Memory, MemoryCategory } from "@/lib/content";
import Heart from "./Heart";

type Filter = "All" | MemoryCategory;

export default function PhotoGallery({
  items,
  categories,
}: {
  items: Memory[];
  categories: MemoryCategory[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<Memory | null>(null);

  const list = useMemo(
    () => (filter === "All" ? items : items.filter((m) => m.category === filter)),
    [filter, items]
  );
  const safeIndex = list.length ? ((index % list.length) + list.length) % list.length : 0;
  const go = (d: number) => setIndex((i) => i + d);

  return (
    <div>
      {/* แท็บกรอง */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {(["All", ...categories] as Filter[]).map((c) => (
          <button
            key={c}
            onClick={() => {
              setFilter(c);
              setIndex(0);
            }}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === c ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-center text-white/50">ยังไม่มีรูปในหมวดนี้ ♡</p>
      ) : (
        <div className="relative mx-auto flex h-[460px] max-w-3xl items-center justify-center sm:h-[520px]">
          {list.map((m, i) => {
            let offset = i - safeIndex;
            if (offset > list.length / 2) offset -= list.length;
            if (offset < -list.length / 2) offset += list.length;
            const abs = Math.abs(offset);
            if (abs > 2) return null;
            const center = offset === 0;
            return (
              <motion.figure
                key={m.src + i}
                onClick={() => (center ? setZoom(m) : setIndex(index + offset))}
                animate={{
                  x: `${offset * 55}%`,
                  scale: center ? 1 : 0.78 - abs * 0.06,
                  rotate: offset * 6,
                  opacity: center ? 1 : 0.45,
                  zIndex: 10 - abs,
                }}
                transition={{ type: "spring", stiffness: 160, damping: 22 }}
                className="polaroid absolute w-64 cursor-pointer sm:w-80"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={m.src} alt={m.text} fill className="object-cover" sizes="320px" />
                </div>
                {center && (
                  <figcaption className="px-1 pt-3 text-night-800">
                    <p className="text-xs font-medium">{m.date}</p>
                    <p className="mt-1 text-sm leading-snug">{m.text}</p>
                    <div className="mt-2 flex justify-between text-rose-400">
                      <Heart size={12} />
                      <Heart size={12} />
                    </div>
                  </figcaption>
                )}
              </motion.figure>
            );
          })}

          {list.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="รูปก่อนหน้า"
                className="glass absolute left-0 z-20 h-10 w-10 text-gold-300"
              >
                ‹
              </button>
              <button
                onClick={() => go(1)}
                aria-label="รูปถัดไป"
                className="glass absolute right-0 z-20 h-10 w-10 text-gold-300"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
      <p className="mt-2 text-center text-xs italic text-white/50">Click to view</p>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/90 p-4 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="polaroid max-w-3xl"
            >
              <Image
                src={zoom.src}
                alt={zoom.text}
                width={1200}
                height={800}
                className="h-auto max-h-[75vh] w-auto object-contain"
              />
              <p className="px-1 pt-3 text-night-800">
                <span className="text-xs font-medium">{zoom.date}</span> — {zoom.text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
