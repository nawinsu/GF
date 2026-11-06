// ระบบความปลอดภัยฝั่งเซิร์ฟเวอร์: session ของ admin, จำกัดจำนวนครั้ง, ตรวจที่มาของ request
import { createHash, createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const SESSION_COOKIE = "lw_admin";
export const SESSION_HOURS = 8;
const MIN_PASSWORD_LENGTH = 12;

// ---------- รหัสผ่าน admin ----------

export function adminPasswordProblem(): string | null {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return "ยังไม่ได้ตั้ง ADMIN_PASSWORD";
  if (pass === "change-me" || pass.length < MIN_PASSWORD_LENGTH) {
    return `ADMIN_PASSWORD ต้องยาวอย่างน้อย ${MIN_PASSWORD_LENGTH} ตัวอักษร และห้ามใช้ค่าตัวอย่าง`;
  }
  return null;
}

// เทียบแบบใช้เวลาคงที่ เพื่อไม่ให้เดารหัสจากเวลาตอบกลับได้
function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(input: string) {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass || adminPasswordProblem()) return false;
  return safeEqual(input, pass);
}

// ---------- session cookie (เซ็นด้วย HMAC ปลอมไม่ได้) ----------

function secret() {
  // ใช้ SESSION_SECRET ถ้ามี ไม่งั้นสร้างจากรหัส admin (เปลี่ยนรหัส = ทุก session หมดอายุทันที)
  return process.env.SESSION_SECRET || `lw:${process.env.ADMIN_PASSWORD ?? ""}`;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createSession() {
  const exp = Date.now() + SESSION_HOURS * 3_600_000;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

export function isValidSession(token: string | undefined) {
  if (!token || adminPasswordProblem()) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  return Number(payload) > Date.now();
}

export function isAdmin(req: NextRequest) {
  return isValidSession(req.cookies.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true, // JavaScript ในหน้าเว็บอ่าน cookie นี้ไม่ได้
  secure: process.env.NODE_ENV === "production", // ส่งผ่าน HTTPS เท่านั้น
  sameSite: "strict" as const, // เว็บอื่นส่ง request แทนเราไม่ได้
  path: "/",
  maxAge: SESSION_HOURS * 3600,
};

// ---------- ตรวจว่า request มาจากเว็บเราเอง (กัน CSRF) ----------

export function isSameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// ---------- จำกัดจำนวนครั้ง (กันสแปมและกันเดารหัส) ----------
// หมายเหตุ: นับในหน่วยความจำของเซิร์ฟเวอร์แต่ละตัว บน Vercel จะรีเซ็ตเมื่อเซิร์ฟเวอร์เริ่มใหม่
// ด่านหลักจริงๆ คือรหัสผ่านที่ยาวและเดายาก

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.reset < now) buckets.delete(k);
  }
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  b.count++;
  if (b.count > limit) return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) };
  return { ok: true, retryAfter: 0 };
}

export function clientIp(req: NextRequest) {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local"
  );
}

// ลบตัวอักษรควบคุมที่มองไม่เห็น (เก็บขึ้นบรรทัดใหม่กับ tab ไว้)
export function cleanText(s: string) {
  return s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮]/g, "").trim();
}
