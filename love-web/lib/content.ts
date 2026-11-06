// ============================================================
//  ไฟล์นี้คือที่เดียวที่ต้องแก้ข้อความ / วันที่ / รูป / เพลง
//  แก้ตรงนี้แล้วทุกหน้าในเว็บจะเปลี่ยนตามเอง
// ============================================================

export const site = {
  title: "ฮันเเน่แปลกใจล่ะสิ้ที่เขาทำให้ มุฮ่าๆ",
  description: "คิดว่าจะสองปีเเล้วยังไม่มีไรให้เธอเลย เลยทำเว็ปนี้มาให้..",
  herName: "เธอ",
  ourSince: "2024-11-24", // วันที่เป็นแฟนกัน (ใช้นับวันที่หน้าแรก)
};

// ---------- 1. Landing ----------
export const landing = {
  headline: ["ฮันเเน่แปลกใจล่ะสิ้ที่เขาทำให้ มุฮ่าๆ"],
  sub: ["คิดว่าจะสองปีเเล้วยังไม่มีไรให้เธอเลย เลยทำเว็ปนี้มาให้.."],
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
    date: " 17-19 พฤศจิกายน 2024",
    title: "วันแรกที่เราได้ลองคุยกัน",
    text: "จำได้ว่าช่วงนั้นเขาติดเกมมากชนิดที่ว่าไม่มีความคิดว่าอยากมีแฟนเลย",
    photo: "/photos/ft.jpg",
    caption: "คิดว่ามันไม่ระบุตัวตนเลยถามเธอไปว่าใคร",
  },
  {
    date: "24 กุมภาพันธ์ 2024",
    title: "วันนั้นเราส่งเพลงจีบกัน สุดท้ายจบลงที่เราตกลงเป็นแฟนกันเฉย",
    text: "ก่อนที่จะบอกว่าเปิดตัวเลยมั้ย เคยคิดยุนะว่าถ้าสมมุตว่าเราคบกันแปปเดียวมันจะเสียเวลามั้ย เเต่สุดท้ายก็ตัดสินใจว่าตั้งใจเป็นแฟนที่ดีของใครซักคนให้ได้ก็พอ",
    photo: "/photos/kob.jpg",
    caption: "24 กุมภาพันธ์ 2024 รักแฟน",
  },
  {
    date: "ทุกวันในโรงเรียน",
    title: "เราแทบจะนั่งกินข้าวด้วนกันตลอดเลยนะ",
    text: "หลังคบกันจำได้ว่าเขาทิ้งเพื่อนทิ้งฝูงไปนั่งกินข้าวกับแฟนอย่างเดียวเลย555",
    photo: "/photos/eat.jpg",
    caption: "ละพากันกินเเต่ก๋วยเตี๋ยว55",
  },

];

// ---------- 3. Memories ----------
export type MemoryCategory = "Trip" | "shop" | "Daily" | "Special";

export type Memory = {
  src: string;
  date: string;
  text: string;
  category: MemoryCategory;
};

export const memoryCategories: MemoryCategory[] = ["Trip", "shop", "Daily", "Special"];

export const memories: Memory[] = [
  {
    src: "/photos/trip.jpg",
    date: "15 เมษายน 2025",
    text: "หลังจากไปเเห่นางสงกรานต์ก็พาเธอมาเที่ยวด้วยกันครั้งเเรก วันนั้นสนุกมากกก",
    category: "Special",
  },
  {
    src: "/photos/trip.jpg",
    date: "15 เมษายน 2025",
    text: "หลังจากไปเเห่นางสงกรานต์ก็พาเธอมาเที่ยวด้วยกันครั้งเเรก วันนั้นสนุกมากกก",
    category: "Trip",
  },
  {
    src: "/photos/food.jpg",
    date: "เเทบทุกวันที่อยู่ด้วยกัน",
    text: "มีไรให้เราทำกินตลอดทั้งย่างกุ้ง สุกี้ เเทบจะเป็นพ่อครัวประจำบ้านแฟนละ55",
    category: "Daily",
  },
  {
    src: "/photos/shop.jpg",
    date: "เกือบทุกวันที่เราอยู่ด้วยกัน",
    text: "เป็นช่วงนี้ใช้ตังเยอะมากกก เพราะทิั้งกินหมูทะ ซื้อของให้แมว55 เเต่ก็สนุกมาก",
    category: "shop",
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
  title: "BIRDS OF A FEATHER",
  artist: "Billie Eilish",
  // วางไฟล์เพลงที่ public/music/our-song.mp3 (ไม่มีไฟล์ก็ยังเปิดหน้าได้)
  src: "/music/Billie Eilish - BIRDS OF A FEATHER (Official Music Video).mp3",
  cover: "/photos/song.jpg",
  note: "เป็นเพลงที่รู้สึกว่าไม่รู้จะอธิบายยังไงเเค่ฟังเเล้วมันนึกถึงเธอ",
};

// ---------- 6. Message ----------
export const letter = {
  heading: "เราคบกันมาจะสองปีเเล้วรู้สึกว่ามีอะไรอยากจะบอกมั้ย",
  prompt: "อย่าลืมเช็คข้อความให้ถูกต้องนะ",
  placeholder: "อยากบอกอะไรกับเราก็เขียนตรงนี้ได้เลยข้อความจะส่งมาหาเขาเอง",
  button: "ส่งข้อความ",
  successTitle: "ข้อความถูกส่งแล้ว!",
  successSub: "ขอบคุณนะแฟน",
  maxLength: 500,
};

// ---------- 7. Final ----------
export const finale = {
  pre: "หน้าสุดท้ายเเล้ว",
  main: "ก่อนจะออกเว็ปนี้ไป",
  button: "ขอถามคำถามแฟนซักคำถามได้มั้ย??",
  question: "ตลอดเวลาที่คบกันมาเขาเป็นเแฟนที่ดีของเธอมั้ย",
  yes: "ต่อไป",

  afterYes: "ขอบคุณนะที่อยู่ต้วยกันจนถึงตอนนี้",
  footer: ["ขอบคุณที่เข้ามาในชีวิตกันนะ", "และขอให้เรามีความสุขแบบนี้ไปด้วยกันนานๆ--"],
  signature: "ถึง ชมภูนุช คิดคำนวล"
};

// ลำดับหน้าตาม Flow ของเว็บ (ใช้กับปุ่ม "ต่อไป" และเมนู)
export const flow = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Before we became a couple" },
  { href: "/memories", label: "Memories" },
  { href: "/song", label: "Music" },
  { href: "/letter", label: "Message" },
  { href: "/final", label: "Final" },
];
