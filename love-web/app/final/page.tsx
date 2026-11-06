"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { finale } from "@/lib/content";
import Heart, { HeartBurst } from "@/components/Heart";

export default function FinalPage() {
  const [step, setStep] = useState<"idle" | "ask" | "yes">("idle");

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="absolute inset-x-0 bottom-0 h-[55%]">
        <Image src="/photos/together.jpg" alt="" fill className="object-cover object-top opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-night-950/40 to-night-950" />
      </div>

      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="font-script text-xl italic text-gold-300/90 sm:text-2xl"
        >
          {finale.pre}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="mt-3 font-script text-4xl font-medium tracking-tight text-white drop-shadow-[0_0_20px_rgba(247,198,107,.4)] sm:text-6xl"
        >
          {finale.main}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="mt-5 flex justify-center text-gold-300"
        >
          <Heart size={22} beat />
        </motion.div>

        <div className="mt-10 min-h-40">
          <AnimatePresence mode="wait">
            {step === "idle" && (
              <motion.button
                key="btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 3 }}
                onClick={() => setStep("ask")}
                className="btn-outline"
              >
                {finale.button}
              </motion.button>
            )}

            {step === "ask" && (
              <motion.div key="ask" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="text-xl text-white/90">{finale.question}</p>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button onClick={() => setStep("yes")} className="btn-gold">
                    {finale.yes}
                  </button>
                </div>
              </motion.div>
            )}

            {step === "yes" && (
              <motion.div key="yes" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="heading-script text-3xl sm:text-4xl">{finale.afterYes}</p>
                <Link href="/" className="mt-6 inline-block text-sm text-white/50 underline">
                  ดูอีกครั้งตั้งแต่ต้น
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center justify-between gap-2 px-6 text-sm sm:flex-row sm:items-end">
        <div className="font-script text-lg text-gold-300/80 sm:text-left">
          {finale.footer.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <p className="font-script text-lg italic text-gold-300/80">{finale.signature}</p>
      </div>

      {step === "yes" && <HeartBurst />}
    </section>
  );
}
