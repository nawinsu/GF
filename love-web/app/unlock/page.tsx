"use client";

// หน้าใส่รหัสก่อนเข้าเว็บ (ใช้เมื่อตั้ง SITE_PASSCODE)
import { useState } from "react";

// กันคนแอบใส่ลิงก์เว็บอื่นใน ?next= เพื่อพาไปหน้าหลอก (open redirect)
function safeNext() {
  const n = new URLSearchParams(window.location.search).get("next") ?? "/";
  return n.startsWith("/") && !n.startsWith("//") && !n.startsWith("/\\") ? n : "/";
}

export default function UnlockPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: code }),
      });
      if (res.ok) {
        window.location.replace(safeNext());
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "ลองใหม่อีกครั้งนะ");
    } catch {
      setError("เชื่อมต่อไม่ได้ ลองใหม่อีกครั้งนะ");
    }
    setBusy(false);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-sm p-8 text-center">
        <p className="text-4xl">💌</p>
        <h1 className="mt-3 text-xl text-gold-300">เว็บนี้ทำไว้ให้คนพิเศษ</h1>
        <p className="mt-2 text-sm text-white/70">ใส่รหัสก่อนนะ ♡</p>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
          autoComplete="current-password"
          aria-label="รหัส"
          className="mt-6 w-full rounded-xl border border-white/10 bg-night-950/60 p-3 text-center outline-none transition placeholder:text-white/35 focus:border-gold-400/60"
          placeholder="รหัส"
        />
        <button type="submit" disabled={!code || busy} className="btn-outline mt-5 disabled:opacity-40">
          {busy ? "กำลังตรวจ..." : "เข้าเว็บ"}
        </button>
        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
      </form>
    </div>
  );
}
