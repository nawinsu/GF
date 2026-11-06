import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  adminPasswordProblem,
  checkPassword,
  clientIp,
  createSession,
  isSameOrigin,
  rateLimit,
  sessionCookieOptions,
} from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const problem = adminPasswordProblem();
  if (problem) return NextResponse.json({ error: problem }, { status: 503 });

  // ลองรหัสได้ 5 ครั้ง / 15 นาที / IP
  const rl = rateLimit(`login:${clientIp(req)}`, 5, 15 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `ลองผิดหลายครั้งเกินไป รออีก ${Math.ceil(rl.retryAfter / 60)} นาที` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const body = await req.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  // หน่วงเวลาเล็กน้อยทุกครั้ง ให้เดารหัสช้าลง
  await new Promise((r) => setTimeout(r, 400));

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "รหัสไม่ถูกต้อง" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSession(), sessionCookieOptions);
  return res;
}
