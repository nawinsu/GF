"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { StoryItem } from "@/lib/content";
import Heart from "./Heart";

export default function Timeline({ items }: { items: StoryItem[] }) {
  return (
    <ol className="relative mx-auto max-w-4xl">
      {/* เส้นกลาง */}
      <span className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-gold-400 via-gold-400/50 to-gold-400/0 md:left-1/2" />

      {items.map((item, i) => {
        const flip = i % 2 === 1;
        return (
          <motion.li
            key={item.date}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mb-16 grid gap-6 pl-12 md:grid-cols-2 md:gap-14 md:pl-0"
          >
            <span className="absolute left-4 top-1 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-night-900 text-gold-300 shadow-glow md:left-1/2">
              <Heart size={18} />
            </span>

            <div className={`md:text-right ${flip ? "md:order-2 md:text-left" : ""}`}>
              <p className="text-xs text-gold-300/80">{item.date}</p>
              <h3 className="mt-1 text-xl text-gold-300">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
            </div>

            <div className={flip ? "md:order-1 md:flex md:justify-end" : ""}>
              <motion.figure
                whileHover={{ rotate: 0, scale: 1.04 }}
                className="polaroid w-56 sm:w-64"
                style={{ rotate: flip ? -4 : 4 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.photo}
                    alt={item.title}
                    fill
                    className="object-cover"
                    style={item.focus ? { objectPosition: item.focus } : undefined}
                    sizes="256px"
                  />
                </div>
                <figcaption className="mt-2 text-right font-script text-base italic text-night-700">
                  {item.caption}
                </figcaption>
              </motion.figure>
            </div>
          </motion.li>
        );
      })}

      <li className="relative flex justify-start pl-4 md:justify-center md:pl-0">
        <span className="-translate-x-1/2 text-gold-300 md:translate-x-0">
          <Heart size={22} beat />
        </span>
      </li>
    </ol>
  );
}
