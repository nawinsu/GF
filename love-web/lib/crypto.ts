// เข้ารหัสข้อความก่อนเก็บลงฐานข้อมูล (AES-256-GCM)
// ถ้าฐานข้อมูลหลุด คนที่ได้ไปจะเห็นแค่ตัวอักษรมั่วๆ อ่านไม่ออกถ้าไม่มี MESSAGE_KEY
// GCM ยังกันการแอบแก้ข้อความด้วย: ถ้ามีคนแก้แม้แต่ตัวเดียว จะถอดรหัสไม่ผ่าน
//
// สร้างกุญแจ: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
// ⚠️ ถ้าทำกุญแจหาย ข้อความที่เข้ารหัสไว้จะเปิดอ่านไม่ได้อีกเลย
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const PREFIX = "enc:v1:";
const IV_BYTES = 12;
const TAG_BYTES = 16;

function key(): Buffer | null {
  const raw = process.env.MESSAGE_KEY;
  if (!raw) return null;
  const k = Buffer.from(raw, "base64");
  if (k.length !== 32) {
    throw new Error("MESSAGE_KEY ต้องเป็น base64 ของข้อมูลขนาด 32 bytes (ดูวิธีสร้างใน .env.example)");
  }
  return k;
}

export function hasMessageKey() {
  return key() !== null;
}

export function encryptText(plain: string): string {
  const k = key();
  if (!k) throw new Error("ยังไม่ได้ตั้ง MESSAGE_KEY");
  const iv = randomBytes(IV_BYTES); // สุ่มใหม่ทุกข้อความ ห้ามใช้ซ้ำ
  const cipher = createCipheriv("aes-256-gcm", k, iv);
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return PREFIX + Buffer.concat([iv, tag, data]).toString("base64url");
}

export function decryptText(stored: string): string {
  // ข้อความเก่าที่เก็บไว้ก่อนเปิดการเข้ารหัส → คืนค่าเดิม
  if (!stored.startsWith(PREFIX)) return stored;
  const k = key();
  if (!k) return "[ข้อความถูกเข้ารหัส — ต้องตั้ง MESSAGE_KEY เพื่ออ่าน]";
  try {
    const buf = Buffer.from(stored.slice(PREFIX.length), "base64url");
    const iv = buf.subarray(0, IV_BYTES);
    const tag = buf.subarray(IV_BYTES, IV_BYTES + TAG_BYTES);
    const data = buf.subarray(IV_BYTES + TAG_BYTES);
    const decipher = createDecipheriv("aes-256-gcm", k, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
  } catch {
    return "[ถอดรหัสไม่ได้ — กุญแจไม่ตรงหรือข้อความถูกแก้ไข]";
  }
}
