// ============================================================
//  ไฟล์นี้คือที่เดียวที่ต้องแก้ข้อความ / วันที่ / รูป / เพลง
//  แก้ตรงนี้แล้วทุกหน้าในเว็บจะเปลี่ยนตามเอง
// ============================================================

export const site = {
  title: "I made this for you 💜",
  description: "เว็บเล็กๆ ที่ทำให้เธอคนเดียว",
  herName: "เธอ",
  ourSince: "2025-03-15", // วันที่เป็นแฟนกัน (ใช้นับวันที่หน้าแรก)
};

// ---------- 1. Landing ----------
export const landing = {
  headline: ["I made", "this for you."],
  sub: ["บางอย่างที่อยากให้เธอเห็น...", "และอยากให้เธอรู้ว่าเธอสำคัญแค่ไหน"],
  cta: "เริ่มดูเลย",
  image: "/photos/couple.jpg",
};

// ---------- 2. Our Story ----------
export type StoryItem = {
  date: string;
  title: string;
  text: string;
  photo: string;
  caption: string;
  focus?: string; // ตำแหน่ง crop ของรูป (CSS object-position) เช่น "50% 30%"
};

export const story: StoryItem[] = [
  {
    date: "14 กุมภาพันธ์ 2025",
    title: "วันแรกที่ได้เจอกัน",
    text: "วันธรรมดาๆ ที่กลายเป็นวันที่ไม่ธรรมดาที่สุด",
    photo: "/photos/him.jpg",
    caption: "first time",
  },
  {
    date: "20 กุมภาพันธ์ 2025",
    title: "เริ่มคุยกัน",
    text: "ไม่รู้เลยว่าแค่ข้อความเล็กๆ จะกลายเป็นเรื่องใหญ่",
    photo: "/photos/her.jpg",
    caption: "hello you",
  },
  {
    date: "15 มีนาคม 2025",
    title: "เป็นแฟนกัน",
    text: "วันที่ได้ยินคำว่า 'ตกลง' แล้วยิ้มทั้งคืน",
    photo: "/photos/couple.jpg",
    caption: "together",
  },
  // ---------- ช่วงรายเดือน (นับจาก 15 มี.ค. 2025) ----------
  {
    date: "15 เมษายน 2025",
    title: "ครบ 1 เดือน",
    text: "เดือนแรกผ่านไปไวมาก แต่ทุกวันมีเธออยู่ด้วยเสมอ",
    photo: "/photos/month-1.jpg",
    caption: "1 month",
    focus: "50% 75%",
  },
  {
    date: "15 พฤษภาคม 2025",
    title: "ครบ 2 เดือน",
    text: "ไปเที่ยวถ้ำนาคาด้วยกัน นั่งถ่ายรูปคู่ใต้ป้ายใหญ่ๆ",
    photo: "/photos/month-2.jpg",
    caption: "naka cave",
  },
  {
    date: "15 มิถุนายน 2025",
    title: "ครบ 3 เดือน",
    text: "ส่งเพลง Birds of a Feather ให้กัน แล้วเธอก็ส่งสติกเกอร์กระต่ายกลับมา",
    photo: "/photos/month-3.jpg",
    caption: "our song",
    focus: "50% 30%",
  },
  {
    date: "15 กรกฎาคม 2025",
    title: "ครบ 4 เดือน",
    text: "มื้อกลางวันที่โรงอาหาร ธรรมดาๆ แต่เป็นช่วงเวลาที่ชอบ",
    photo: "/photos/month-4.jpg",
    caption: "lunch time",
    focus: "50% 45%",
  },
  {
    date: "15 สิงหาคม 2025",
    title: "ครบ 5 เดือน",
    text: "เดินเลือกของกับเธอ ยืนรอนานแค่ไหนก็ไม่เบื่อ",
    photo: "/photos/month-5.jpg",
    caption: "5 months",
    focus: "50% 30%",
  },
];

// ---------- 3. Memories ----------
export type MemoryCategory = "Trip" | "Food" | "Daily" | "Special";

export type Memory = {
  src: string;
  date: string;
  text: string;
  category: MemoryCategory;
};

export const memoryCategories: MemoryCategory[] = ["Trip", "Food", "Daily", "Special"];

export const memories: Memory[] = [
  {
    src: "/photos/couple.jpg",
    date: "14 ก.พ. 2025",
    text: "วันที่ธรรมดาๆ ที่ตอนนั้นยังไม่รู้เลยว่าจะกลายเป็นหนึ่งในความทรงจำที่สำคัญที่สุด",
    category: "Special",
  },
  {
    src: "/photos/together.jpg",
    date: "1 มี.ค. 2025",
    text: "พระอาทิตย์ตกวันนั้นสวย แต่คนข้างๆ สวยกว่า",
    category: "Trip",
  },
  {
    src: "/photos/her.jpg",
    date: "8 มี.ค. 2025",
    text: "รอยยิ้มนี้แหละที่ทำให้วันแย่ๆ กลายเป็นวันดี",
    category: "Daily",
  },
  {
    src: "/photos/him.jpg",
    date: "22 มี.ค. 2025",
    text: "หน้าตาตอนรอเธอเลือกร้านข้าว (นานมาก)",
    category: "Food",
  },
];

// ---------- 4. Things I Love About You ----------
export type LoveIcon = "smile" | "voice" | "star" | "heart" | "sparkle" | "infinity";

export const thingsILove: { icon: LoveIcon; title: string; sub: string }[] = [
  { icon: "smile", title: "รอยยิ้มของเธอ", sub: "ที่ทำให้โลกสว่างขึ้น" },
  { icon: "voice", title: "เสียงหัวเราะของเธอ", sub: "ที่ทำให้ฉันมีความสุข" },
  { icon: "star", title: "ความใส่ใจ", sub: "ที่เธอมีให้เสมอ" },
  { icon: "heart", title: "ความพยายาม", sub: "ในทุกๆ เรื่อง" },
  { icon: "sparkle", title: "เป็นตัวของตัวเอง", sub: "ในแบบที่น่ารักเสมอ" },
  { icon: "infinity", title: "เธอ...คือทุกอย่าง", sub: "ที่ฉันต้องการ" },
];

// ---------- 5. Our Song ----------
export const song = {
  title: "Better Together",
  artist: "Daniel Caesar",
  // วางไฟล์เพลงที่ public/music/our-song.mp3 (ไม่มีไฟล์ก็ยังเปิดหน้าได้)
  src: "/music/our-song.mp3",
  cover: "/photos/together.jpg",
  note: "ขอบคุณที่อยู่ในทุกช่วงของชีวิตนะ ♡",
};

// ---------- 6. Message ----------
export const letter = {
  heading: "Before you leave...",
  prompt: "มีอะไรบางอย่างที่อยากบอกกันไหม? ♡",
  placeholder: "อยากบอกอะไรกับเราก็เขียนตรงนี้ได้...",
  button: "ส่งข้อความถึงเรา",
  successTitle: "ข้อความถูกส่งแล้ว!",
  successSub: "จะเก็บข้อความนี้ไว้อย่างดีเลย ♡",
  maxLength: 500,
};

// ---------- 7. Final ----------
export const finale = {
  pre: "And if I had to choose again...",
  main: "I would still choose you.",
  button: "หนึ่งคำถาม...",
  question: "อยู่ด้วยกันไปนานๆ แบบนี้นะ?",
  yes: "ได้สิ ♡",
  no: "ไม่",
  afterYes: "รักเธอนะ ♡ Happy 1st Anniversary",
  footer: ["ขอบคุณที่เข้ามาในชีวิตกันนะ", "และขอให้เรามีความสุขแบบนี้ไปด้วยกันนานๆ"],
  signature: "Forever & Always ♡",
};

// ลำดับหน้าตาม Flow ของเว็บ (ใช้กับปุ่ม "ต่อไป" และเมนู)
export const flow = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Our Story" },
  { href: "/memories", label: "Memories" },
  { href: "/love", label: "For You" },
  { href: "/song", label: "Music" },
  { href: "/letter", label: "Message" },
  { href: "/final", label: "Final" },
];
