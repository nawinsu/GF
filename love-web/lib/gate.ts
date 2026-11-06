// รหัสก่อนเข้าเว็บ (ไม่บังคับ) — เปิดใช้เมื่อตั้ง SITE_PASSCODE
// ใช้ Web Crypto อย่างเดียว เพื่อให้ใช้ได้ทั้งใน middleware (Edge) และ API route
// cookie เซ็นด้วย HMAC: ปลอมไม่ได้ และเปลี่ยนรหัสเมื่อไหร่ cookie เก่าใช้ไม่ได้ทันที

export const GATE_COOKIE = "lw_site";
export const GATE_DAYS = 30;

const enc = new TextEncoder();

export function gatePasscode(): string | null {
  const p = process.env.SITE_PASSCODE;
  return p ? p : null;
}

function secret() {
  return `gate:${process.env.SESSION_SECRET ?? ""}:${process.env.SITE_PASSCODE ?? ""}`;
}

async function hmac(key: string, data: string) {
  const k = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", k, enc.encode(data));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

// เทียบแบบใช้เวลาคงที่ (กันเดาจากเวลาตอบกลับ)
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function checkPasscode(input: string) {
  const real = gatePasscode();
  if (!real) return false;
  const k = secret();
  // เทียบ HMAC ของทั้งสองค่า ความยาวจึงเท่ากันเสมอ ไม่บอกใบ้ความยาวรหัส
  return safeEqual(await hmac(k, input), await hmac(k, real));
}

export async function createGateToken() {
  const exp = String(Date.now() + GATE_DAYS * 86_400_000);
  return `${exp}.${await hmac(secret(), exp)}`;
}

export async function isValidGateToken(token: string | undefined) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (!safeEqual(sig, await hmac(secret(), exp))) return false;
  return Number(exp) > Date.now();
}
