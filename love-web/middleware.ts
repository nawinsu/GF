// ด่านแรกของทุกหน้า: ถ้าตั้ง SITE_PASSCODE ไว้ ต้องใส่รหัสที่หน้า /unlock ก่อน
// ถ้าไม่ได้ตั้ง → ปล่อยผ่านทุกหน้าเหมือนเดิม
import { NextRequest, NextResponse } from "next/server";
import { GATE_COOKIE, gatePasscode, isValidGateToken } from "@/lib/gate";

export async function middleware(req: NextRequest) {
  if (!gatePasscode()) return NextResponse.next();

  const { pathname, search } = req.nextUrl;
  if (pathname === "/unlock" || pathname === "/api/unlock") return NextResponse.next();

  if (await isValidGateToken(req.cookies.get(GATE_COOKIE)?.value)) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "locked" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  // ไม่ตรวจไฟล์ระบบของ Next และไฟล์ใน public/ (รูป เพลง) เพราะตัวย่อรูปของ Next
  // ดึงไฟล์เหล่านี้ภายในเซิร์ฟเวอร์โดยไม่มี cookie ถ้าตรวจด้วย รูปจะไม่ขึ้น
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|photos/|music/|decorations/).*)"],
};
