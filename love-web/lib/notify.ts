// แจ้งเตือนเมื่อมีข้อความใหม่ (ไม่บังคับ)
// ตั้ง DISCORD_WEBHOOK_URL ใน .env.local เพื่อให้เด้งเข้า Discord ทันทีที่เธอส่งข้อความ
export async function notifyNewMessage(message: string) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `💌 ข้อความใหม่จากเธอ:\n${message}` }),
    });
  } catch {
    // แจ้งเตือนไม่สำเร็จไม่เป็นไร ข้อความถูกเก็บไว้แล้ว
  }
}
