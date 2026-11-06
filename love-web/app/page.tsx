"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { landing, site } from "@/lib/content";
import Heart from "@/components/Heart";

function daysTogether() {
  const start = new Date(site.ourSince).getTime();
  return Math.max(0, Math.floor((Date.now() - start) / 86_400_000));
}

export default function LandingPage() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      {/* รูปพื้นหลัง */}
      <div className="absolute inset-0">
        <Image src={landing.image} alt="" fill priority className="object-cover object-[70%_30%] opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/75 to-night-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-night-950/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="heading-script text-5xl leading-[1.1] sm:text-7xl"
        >
          {landing.headline[0]}
          <br />
          {landing.headline[1]}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 space-y-1 text-white/85"
        >
          {landing.sub.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <Link href="/story" className="btn-gold">
            {landing.cta} →
          </Link>
          <span suppressHydrationWarning className="flex items-center gap-2 text-sm text-white/70">
            <Heart size={14} className="text-blush" beat />
            อยู่ด้วยกันมาแล้ว {daysTogether()} วัน
          </span>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/50"
      >
        <span className="flex h-8 w-5 justify-center rounded-full border border-white/40 pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-white/60" />
        </span>
        Scroll Down
      </motion.div>
    </section>
  );
}
