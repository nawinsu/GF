import { NextRequest, NextResponse } from "next/server";
import { GATE_COOKIE, GATE_DAYS, checkPasscode, createGateToken, gatePasscode } from "@/lib/gate";
import { clientIp, isSameOrigin, rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!gatePasscode()) return NextResponse.json({ ok: true }); // ไม่ได้เปิดใช้รหัส

  // ลองรหัสได้ 10 ครั้ง / 15 นาที / IP
  const rl = rateLimit(`unlock:${clientIp(req)}`, 10, 15 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `ลองผิดหลายครั้งเกินไป รออีก ${Math.ceil(rl.retryAfter / 60)} นาที` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const body = await req.json().catch(() => null);
  const passcode = typeof body?.passcode === "string" ? body.passcode.slice(0, 200) : "";

  // หน่วงเวลาเล็กน้อยทุกครั้ง ให้เดารหัสช้าลง
  await new Promise((r) => setTimeout(r, 400));

  if (!(await checkPasscode(passcode))) {
    return NextResponse.json({ error: "รหัสไม่ถูกต้อง ลองใหม่นะ" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(GATE_COOKIE, await createGateToken(), {
    httpOnly: true, // JavaScript ในหน้าเว็บอ่าน cookie นี้ไม่ได้
    secure: process.env.NODE_ENV === "production", // ส่งผ่าน HTTPS เท่านั้น
    sameSite: "lax", // lax เพื่อให้กดลิงก์จาก LINE/Messenger แล้วยังจำรหัสได้
    path: "/",
    maxAge: GATE_DAYS * 86_400,
  });
  return res;
}
