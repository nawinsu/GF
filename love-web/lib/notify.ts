// แจ้งเตือนเมื่อมีข้อความใหม่จากหน้า Message (ไม่บังคับ)
// - อีเมล: ตั้ง RESEND_API_KEY + NOTIFY_EMAIL ใน .env.local / Vercel
// - Discord: ตั้ง DISCORD_WEBHOOK_URL
//
// ความปลอดภัยระหว่างทาง:
// - เว็บ → Resend ส่งผ่าน HTTPS (TLS) ที่ล็อกไว้เป็น https:// เท่านั้น
// - Resend → Gmail ส่งผ่าน SMTP แบบ TLS
// - ส่งเป็นข้อความธรรมดา (text) ไม่ใช่ HTML กันโค้ดแปลกปลอมในอีเมล
// - กุญแจ API อยู่ฝั่งเซิร์ฟเวอร์เท่านั้น เบราว์เซอร์ของคนดูไม่เห็น

const RESEND_URL = "https://api.resend.com/emails";
const TIMEOUT_MS = 8000;

// NOTIFY_HIDE_MESSAGE=true → แจ้งแค่ว่ามีข้อความใหม่ ไม่ใส่เนื้อหา
// เนื้อหาจะไม่ผ่าน Resend / Gmail / Discord เลย ต้องไปอ่านที่หน้า /admin เท่านั้น
const hideMessage = () => process.env.NOTIFY_HIDE_MESSAGE === "true";
const notifyText = (message: string) =>
  hideMessage() ? "มีข้อความใหม่ เข้าไปอ่านได้ที่หน้า /admin ♡" : message;

async function sendEmail(message: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;

  const sentAt = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // ถ้ายังไม่ได้ยืนยันโดเมนของตัวเองกับ Resend ต้องใช้ onboarding@resend.dev
      // และส่งได้เฉพาะอีเมลที่ใช้สมัคร Resend เท่านั้น
      from: process.env.NOTIFY_FROM || "Love Web <onboarding@resend.dev>",
      to: [to],
      subject: "💌 มีข้อความใหม่จากเว็บ",
      text: `ข้อความใหม่จากเธอ (${sentAt})\n\n${notifyText(message)}`,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
}

async function sendDiscord(message: string) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `💌 ข้อความใหม่จากเธอ:\n${notifyText(message)}` }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

export async function notifyNewMessage(message: string) {
  const results = await Promise.allSettled([sendEmail(message), sendDiscord(message)]);
  for (const r of results) {
    if (r.status === "rejected") {
      // แจ้งเตือนไม่สำเร็จไม่เป็นไร ข้อความถูกเก็บไว้แล้ว (ดูได้ที่หน้า /admin)
      // log แค่สาเหตุ ไม่ log เนื้อหาข้อความ
      console.error("notify failed:", r.reason instanceof Error ? r.reason.message : r.reason);
    }
  }
}
