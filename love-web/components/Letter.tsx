"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { letter } from "@/lib/content";

export default function Letter() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [trap, setTrap] = useState(""); // honeypot กันบอท (คนจริงมองไม่เห็นช่องนี้)

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), website: trap }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error);
      }
      setStatus("sent");
      setText("");
    } catch (err) {
      setErrorText(err instanceof Error && err.message ? err.message : "ส่งไม่สำเร็จ ลองอีกครั้งนะ");
      setStatus("error");
    }
  };

  return (
    <div className="glass mx-auto grid max-w-4xl overflow-hidden md:grid-cols-[1.4fr_1fr]">
      <form onSubmit={send} className="p-6 sm:p-10">
        <h2 className="heading-script text-3xl italic sm:text-4xl">{letter.heading}</h2>
        <p className="mt-3 text-white/80">{letter.prompt}</p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, letter.maxLength))}
          placeholder={letter.placeholder}
          rows={6}
          className="mt-6 w-full resize-none rounded-xl border border-white/10 bg-night-950/60 p-4 text-sm outline-none transition placeholder:text-white/35 focus:border-gold-400/60"
        />
        <input
          type="text"
          name="website"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <p className="mt-1 text-right text-xs text-white/45">
          {text.length}/{letter.maxLength}
        </p>

        <div className="mt-4 flex justify-center">
          <button type="submit" disabled={!text.trim() || status === "sending"} className="btn-outline disabled:opacity-40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
            {status === "sending" ? "กำลังส่ง..." : letter.button}
          </button>
        </div>
        {status === "error" && (
          <p className="mt-3 text-center text-sm text-rose-300">{errorText}</p>
        )}
      </form>

      <div className="relative flex min-h-60 items-center justify-center bg-gradient-to-b from-night-700/60 to-night-900 p-8">
        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="mx-auto text-gold-300"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </motion.svg>
              <p className="mt-4 text-lg text-gold-300">{letter.successTitle}</p>
              <p className="mt-1 text-sm text-white/70">{letter.successSub}</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-xs text-white/50 underline">
                เขียนอีกฉบับ
              </button>
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white/40">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-auto">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <p className="mt-3 text-sm">ข้อความจะส่งตรงถึงเรา ♡</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
