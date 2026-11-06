"use client";

import { useCallback, useEffect, useState } from "react";
import Heart from "@/components/Heart";

type Message = { id: string; message: string; createdAt: string; read?: boolean };

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" });

// หน้าหลังบ้าน (ลับ) — เข้าที่ /admin แล้วใส่รหัสจาก ADMIN_PASSWORD
// รหัสไม่ถูกเก็บในเบราว์เซอร์ ใช้ cookie แบบ httpOnly ที่ JavaScript อ่านไม่ได้แทน
export default function AdminPage() {
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/messages", { cache: "no-store" });
    if (!res.ok) {
      setAuthed(false);
      return;
    }
    const data = await res.json();
    setMessages(data.messages);
    setSelected((s) => s ?? data.messages[0] ?? null);
    setAuthed(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pass }),
    });
    setPass("");
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "เข้าสู่ระบบไม่สำเร็จ");
      return;
    }
    load();
  };

  const open = async (m: Message) => {
    setSelected(m);
    if (!m.read) {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: m.id }),
      });
      setMessages((all) => all.map((x) => (x.id === m.id ? { ...x, read: true } : x)));
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setMessages([]);
    setSelected(null);
  };

  if (authed === null) {
    return <section className="flex min-h-dvh items-center justify-center text-white/50">กำลังโหลด...</section>;
  }

  if (!authed) {
    return (
      <section className="flex min-h-dvh items-center justify-center px-4">
        <form onSubmit={login} className="glass w-full max-w-sm p-8 text-center">
          <h1 className="heading-script text-4xl">Admin</h1>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="รหัสผ่าน"
            autoComplete="current-password"
            className="mt-6 w-full rounded-lg border border-white/10 bg-night-950/60 px-4 py-2.5 outline-none focus:border-gold-400/60"
          />
          {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
          <button disabled={busy || !pass} className="btn-gold mt-5 w-full justify-center">
            {busy ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto grid min-h-dvh max-w-6xl gap-4 p-4 md:grid-cols-[200px_1fr_1fr] md:p-8">
      <aside className="glass flex gap-2 p-3 md:flex-col">
        <span className="flex items-center gap-2 rounded-lg bg-night-600/60 px-3 py-2 text-sm text-gold-300">
          ✉ Messages
        </span>
        <button onClick={load} className="rounded-lg px-3 py-2 text-left text-sm text-white/60 hover:bg-white/5">
          ↻ Refresh
        </button>
        <button onClick={logout} className="rounded-lg px-3 py-2 text-left text-sm text-white/60 hover:bg-white/5 md:mt-auto">
          ⏻ Logout
        </button>
      </aside>

      <div className="glass overflow-hidden">
        <h2 className="border-b border-white/10 p-4 text-gold-300">ข้อความจากเธอ 💌 ({messages.length})</h2>
        {messages.length === 0 && <p className="p-6 text-sm text-white/50">ยังไม่มีข้อความ</p>}
        <ul className="max-h-[70vh] overflow-y-auto">
          {messages.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => open(m)}
                className={`flex w-full gap-3 border-b border-white/5 p-4 text-left transition hover:bg-white/5 ${
                  selected?.id === m.id ? "bg-night-600/40" : ""
                }`}
              >
                <span className={m.read ? "text-white/30" : "text-blush"}>
                  <Heart size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between text-xs text-white/50">
                    <span>จาก: เธอ</span>
                    <span>{fmt(m.createdAt)}</span>
                  </span>
                  <span className="mt-1 block truncate text-sm">{m.message}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass p-6">
        {selected ? (
          <>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <span className="text-blush"><Heart size={20} /></span>
              <span>
                จาก: เธอ
                <br />
                {fmt(selected.createdAt)}
              </span>
            </div>
            <p className="mt-6 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
          </>
        ) : (
          <p className="text-sm text-white/50">เลือกข้อความทางซ้ายเพื่ออ่าน</p>
        )}
      </div>
    </section>
  );
}
