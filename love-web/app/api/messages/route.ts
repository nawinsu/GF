import { NextRequest, NextResponse } from "next/server";
import { addMessage, listMessages, markRead } from "@/lib/db";
import { notifyNewMessage } from "@/lib/notify";
import { cleanText, clientIp, isAdmin, isSameOrigin, rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

const MAX = 500;
const json = (body: unknown, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers });

// เธอส่งข้อความ
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return json({ error: "forbidden" }, 403);

  // ส่งได้ไม่เกิน 5 ข้อความ / 10 นาที / IP
  const rl = rateLimit(`msg:${clientIp(req)}`, 5, 10 * 60_000);
  if (!rl.ok) {
    return json({ error: "ส่งถี่เกินไป รอสักครู่นะ" }, 429, { "Retry-After": String(rl.retryAfter) });
  }

  if (Number(req.headers.get("content-length") ?? 0) > 4096) return json({ error: "too large" }, 413);

  const body = await req.json().catch(() => null);

  // honeypot: ช่องที่คนมองไม่เห็น ถ้ามีค่า = บอท → ตอบว่าสำเร็จแต่ไม่เก็บ
  if (typeof body?.website === "string" && body.website !== "") return json({ ok: true });

  const message = typeof body?.message === "string" ? cleanText(body.message) : "";
  if (!message || message.length > MAX) return json({ error: "ข้อความไม่ถูกต้อง" }, 400);

  await addMessage(message);
  await notifyNewMessage(message);
  return json({ ok: true });
}

// หน้า admin ดึงข้อความทั้งหมด
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return json({ error: "unauthorized" }, 401);
  return json({ messages: await listMessages() });
}

// หน้า admin กดอ่านแล้ว
export async function PATCH(req: NextRequest) {
  if (!isSameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (!isAdmin(req)) return json({ error: "unauthorized" }, 401);
  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: "bad id" }, 400);
  await markRead(id);
  return json({ ok: true });
}
