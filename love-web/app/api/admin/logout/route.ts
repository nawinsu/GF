import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, isSameOrigin, sessionCookieOptions } from "@/lib/security";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return res;
}
