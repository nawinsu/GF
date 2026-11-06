"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Heart from "./Heart";

type Props = { title: string; artist: string; src: string; cover: string };

const fmt = (s: number) =>
  Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";

const BARS = Array.from({ length: 56 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)));

export default function MusicPlayer({ title, artist, src, cover }: Props) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [missing, setMissing] = useState(false);
  const [liked, setLiked] = useState(true);

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => setPlaying(false);
    const onErr = () => setMissing(true);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
    };
  }, []);

  const toggle = async () => {
    const a = audio.current;
    if (!a || missing) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setMissing(true);
      }
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio.current) audio.current.currentTime = Number(e.target.value);
  };
  const skip = (d: number) => {
    if (audio.current) audio.current.currentTime = Math.max(0, audio.current.currentTime + d);
  };
  const progress = duration ? time / duration : 0;

  return (
    <div className="mx-auto max-w-xl">
      <audio ref={audio} src={src} preload="metadata" />

      <div className="relative">
        {/* แผ่นเสียง */}
        <div
          className={`absolute -right-6 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[repeating-radial-gradient(circle,#140c26_0_2px,#21153d_3px_4px)] shadow-card sm:block ${
            playing ? "animate-spin-slow" : ""
          }`}
        >
          <span className="absolute inset-[38%] rounded-full bg-gold-500/80" />
        </div>

        <div className="glass relative p-5 sm:mr-24">
          <div className="flex gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
              <Image src={cover} alt={title} fill className="object-cover" sizes="96px" />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-lg">{title}</p>
              <p className="text-sm text-white/60">{artist}</p>
            </div>
            <button onClick={() => setLiked((l) => !l)} aria-label="ถูกใจ" className="self-end text-blush">
              <Heart size={20} filled={liked} />
            </button>
          </div>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={seek}
            aria-label="ตำแหน่งเพลง"
            className="mt-5 w-full accent-gold-400"
            style={{
              background: `linear-gradient(to right, #f7c66b ${progress * 100}%, rgba(255,255,255,.15) ${progress * 100}%)`,
            }}
          />
          <div className="mt-1 flex justify-between text-xs text-white/50">
            <span>{fmt(time)}</span>
            <span>{fmt(duration)}</span>
          </div>

          <div className="mt-3 flex items-center justify-center gap-8">
            <button onClick={() => skip(-10)} aria-label="ย้อน 10 วินาที" className="text-white/80 hover:text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zM9.5 12L18 6v12z" /></svg>
            </button>
            <button
              onClick={toggle}
              aria-label={playing ? "หยุด" : "เล่น"}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/90 text-night-950 shadow-glow transition hover:scale-105"
            >
              {playing ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <button onClick={() => skip(10)} aria-label="ข้าม 10 วินาที" className="text-white/80 hover:text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" /></svg>
            </button>
          </div>
          {missing && (
            <p className="mt-3 text-center text-xs text-white/50">
              ยังไม่มีไฟล์เพลง — วางไฟล์ไว้ที่ <code>public/music/our-song.mp3</code>
            </p>
          )}
        </div>
      </div>

      {/* waveform */}
      <div className="mt-10 flex h-12 items-center justify-center gap-[3px]">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-gold-300/70"
            animate={playing ? { scaleY: [h, h * 0.4 + 0.2, h] } : { scaleY: h * 0.5 }}
            transition={playing ? { duration: 0.6 + (i % 5) * 0.12, repeat: Infinity } : { duration: 0.4 }}
            style={{ height: "100%", originY: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}
