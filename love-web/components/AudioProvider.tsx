"use client";

// ตัวเล่นเพลงกลางของทั้งเว็บ
// อยู่ใน app/layout.tsx ซึ่งไม่ถูกโหลดใหม่ตอนเปลี่ยนหน้า
// เพลงเลยเล่นต่อได้แม้กดไปหน้าอื่นผ่านเมนูหรือปุ่ม "ต่อไป"
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { song } from "@/lib/content";

type AudioState = {
  playing: boolean;
  time: number;
  duration: number;
  missing: boolean;
  toggle: () => Promise<void>;
  seek: (t: number) => void;
  skip: (d: number) => void;
};

const AudioContext = createContext<AudioState | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio ต้องใช้ภายใน <AudioProvider>");
  return ctx;
}

export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onErr = () => setMissing(true);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onPause);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onPause);
      a.removeEventListener("error", onErr);
    };
  }, []);

  const toggle = async () => {
    const a = audio.current;
    if (!a || missing) return;
    if (!a.paused) {
      a.pause();
    } else {
      try {
        await a.play();
      } catch {
        setMissing(true);
      }
    }
  };

  const seek = (t: number) => {
    if (audio.current) audio.current.currentTime = t;
  };
  const skip = (d: number) => {
    if (audio.current) audio.current.currentTime = Math.max(0, audio.current.currentTime + d);
  };

  return (
    <AudioContext.Provider value={{ playing, time, duration, missing, toggle, seek, skip }}>
      <audio ref={audio} src={song.src} preload="metadata" loop/>
      {children}
    </AudioContext.Provider>
  );
}
