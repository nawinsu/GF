# 💜 love-web — I made this for you

เว็บครบรอบ 1 ปี ธีมท้องฟ้ายามค่ำ ม่วง-ทอง เล่าเรื่องราวของเราตั้งแต่วันแรกจนถึงวันนี้
ให้เธอส่งข้อความกลับมาหาเราได้ และมีหน้าหลังบ้าน (ลับ) ไว้อ่านข้อความ

> "ไม่ใช่แค่เว็บ... แต่คือเรื่องราวของเรา"

---

## ✨ Flow ของเว็บ

```
1. Landing ─► 2. Our Story ─► 3. Memories ─► 4. Things I Love ─► 5. Our Song ─► 6. Message ─► 7. Final
   /             /story          /memories      /love                /song           /letter        /final
```

| หน้า | Path | มีอะไร |
| --- | --- | --- |
| Landing | `/` | "I made this for you." + รูปคู่ + นับวันที่อยู่ด้วยกัน |
| Our Story | `/story` | ไทม์ไลน์หัวใจ + รูปโพลารอยด์ |
| Memories | `/memories` | แกลเลอรีแบบสไลด์ กรองหมวด Trip / Food / Daily / Special กดดูรูปใหญ่ได้ |
| Things I Love About You | `/love` | การ์ด 6 ข้อที่ชอบในตัวเธอ |
| Our Song | `/song` | เครื่องเล่นเพลง + แผ่นเสียงหมุน + waveform |
| Message | `/letter` | ช่องเขียนข้อความ (สูงสุด 500 ตัวอักษร) ส่งถึงเรา |
| Final | `/final` | "I would still choose you." + คำถามสุดท้าย + หัวใจลอย |
| Admin (ลับ) | `/admin` | อ่านข้อความที่เธอส่งมา (ใช้รหัสผ่าน) |

ทุกหน้ามีปุ่ม **ต่อไป →** ไปหน้าถัดไปตาม Flow

---

## 🛠 เทคโนโลยี

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — ธีมสี `night` (ม่วงเข้ม) / `gold` / `blush`
- **Framer Motion** — แอนิเมชันทั้งหมด
- **API Route ของ Next.js** แทน Express (เก็บข้อความ)
- **MongoDB** (ไม่บังคับ) — ถ้าไม่ตั้ง จะเก็บเป็นไฟล์ JSON
- **Discord Webhook** (ไม่บังคับ) — แจ้งเตือนเมื่อมีข้อความใหม่

---

## 🚀 เริ่มใช้งาน

ต้องมี [Node.js](https://nodejs.org) เวอร์ชัน 18.18 ขึ้นไป (แนะนำ 20+)

```bash
# 1) ติดตั้ง
npm install

# 2) ตั้งค่า env
cp .env.example .env.local      # Windows: copy .env.example .env.local
# แล้วเปิด .env.local ใส่ ADMIN_PASSWORD (ยาวอย่างน้อย 12 ตัว)

# 3) รัน
npm run dev
```

เปิด <http://localhost:3000> 🎉

Build สำหรับใช้งานจริง:

```bash
npm run build
npm start
```

---

## 📁 โครงสร้างโปรเจกต์

```
love-web/
├── app/
│   ├── page.tsx              # 1. Landing
│   ├── story/page.tsx        # 2. Our Story
│   ├── memories/page.tsx     # 3. Memories
│   ├── love/page.tsx         # 4. Things I Love About You
│   ├── song/page.tsx         # 5. Our Song
│   ├── letter/page.tsx       # 6. Message
│   ├── final/page.tsx        # 7. Final
│   ├── admin/                # หน้าหลังบ้าน (ลับ)
│   ├── api/messages/route.ts # API รับ/อ่านข้อความ
│   ├── api/admin/            # login / logout (cookie)
│   ├── robots.ts             # บอก search engine ห้ามเก็บ
│   ├── layout.tsx            # ฟอนต์ + Navbar + พื้นหลังดาว
│   └── globals.css
│
├── components/
│   ├── Heart.tsx             # หัวใจ + HeartBurst
│   ├── Timeline.tsx          # ไทม์ไลน์หน้า Our Story
│   ├── PhotoGallery.tsx      # แกลเลอรีหน้า Memories
│   ├── Letter.tsx            # ฟอร์มส่งข้อความ
│   ├── LoveCards.tsx         # การ์ด Things I Love
│   ├── MusicPlayer.tsx       # เครื่องเล่นเพลง
│   ├── Navbar.tsx
│   ├── PageShell.tsx         # โครงหน้า + ปุ่มต่อไป
│   └── StarField.tsx         # ดาวระยิบระยับ + ดาวตก
│
├── lib/
│   ├── content.ts            # ⭐ ข้อความ วันที่ รูป เพลง ทั้งหมดอยู่ที่นี่
│   ├── db.ts                 # เก็บข้อความ (MongoDB หรือไฟล์ JSON)
│   ├── security.ts           # session, rate limit, ตรวจ origin
│   └── notify.ts             # แจ้งเตือน Discord
│
└── public/
    ├── photos/               # couple.jpg, together.jpg, him.jpg, her.jpg
    ├── music/                # ใส่ our-song.mp3 ที่นี่
    └── decorations/          # รูปตกแต่งเพิ่มเติม
```

---

## 💝 ปรับแต่งให้เป็นของเรา

**แก้ไฟล์เดียว: `lib/content.ts`** — ทุกหน้าเปลี่ยนตามเอง

| อยากแก้ | ตรงไหนใน `content.ts` |
| --- | --- |
| วันที่เป็นแฟนกัน (ใช้นับวัน) | `site.ourSince` |
| ข้อความหน้าแรก | `landing` |
| เหตุการณ์ในไทม์ไลน์ | `story` (เพิ่ม/ลบ object ได้เลย) |
| รูปความทรงจำ | `memories` (กำหนด `category` เป็น Trip / Food / Daily / Special) |
| สิ่งที่ชอบในตัวเธอ | `thingsILove` (ไอคอน: smile, voice, star, heart, sparkle, infinity) |
| เพลง | `song` |
| ข้อความหน้าสุดท้าย / คำถาม | `finale` |

### 📸 เพิ่มรูป
1. วางรูปใน `public/photos/` เช่น `public/photos/beach.jpg`
2. ใน `content.ts` อ้างถึงเป็น `"/photos/beach.jpg"`

> รูปตอนนี้มาจากโฟลเดอร์ `1y` — `together.jpg` ถูกตัดครึ่งเป็น `him.jpg` และ `her.jpg`

### 🎵 ใส่เพลง
วางไฟล์ที่ `public/music/our-song.mp3` (ถ้าใช้ชื่ออื่น แก้ `song.src`)
ถ้ายังไม่มีไฟล์ หน้าเพลงยังเปิดได้ แค่ขึ้นข้อความบอกให้ใส่ไฟล์

---

## 💌 ระบบข้อความ + หน้า Admin

1. เธอเขียนข้อความในหน้า `/letter` → ส่งไป `POST /api/messages`
2. เราเข้า `/admin` → ใส่รหัสตาม `ADMIN_PASSWORD` → อ่านข้อความ (กดแล้วขึ้นว่าอ่านแล้ว)

**ข้อความเก็บที่ไหน?**
- ในเครื่อง ถ้าไม่ตั้ง `MONGODB_URI` → `data/messages.json` (ถูก gitignore ไว้ ไม่หลุดขึ้น GitHub)
- บน Vercel → **ต้อง**ตั้ง `MONGODB_URI` (Vercel เขียนไฟล์ไม่ได้)

**อยากให้เด้งแจ้งเตือน?** สร้าง Webhook ในห้อง Discord (Edit Channel → Integrations → Webhooks) แล้วใส่ลิงก์ใน `DISCORD_WEBHOOK_URL`

---

## 🔒 ความปลอดภัย

| ป้องกันอะไร | ทำยังไง |
| --- | --- |
| ดักจับข้อมูลระหว่างทาง | Vercel ใช้ HTTPS อัตโนมัติ + header `Strict-Transport-Security` บังคับเบราว์เซอร์ใช้ HTTPS ตลอด |
| ขโมย session admin | cookie แบบ `httpOnly` + `Secure` + `SameSite=Strict` เซ็นด้วย HMAC หมดอายุใน 8 ชม. รหัสผ่านไม่ถูกเก็บในเบราว์เซอร์ |
| เดารหัส admin | รหัสต้องยาว ≥ 12 ตัว, เทียบแบบเวลาคงที่, ลองได้ 5 ครั้ง / 15 นาที |
| สแปมข้อความ / บอท | จำกัด 5 ข้อความ / 10 นาที, ช่อง honeypot, จำกัด 500 ตัวอักษร |
| เว็บอื่นยิง request แทนเรา (CSRF) | ตรวจ `Origin` ทุก request ที่เขียนข้อมูล |
| สคริปต์แปลกปลอม (XSS) | `Content-Security-Policy` โหลดได้จากเว็บตัวเองเท่านั้น + React escape ข้อความอัตโนมัติ |
| เอาเว็บไปฝังหลอก (clickjacking) | `X-Frame-Options: DENY` + `frame-ancestors 'none'` |
| ส่งข้อมูลให้บุคคลที่สาม | ฟอนต์ถูกฝังในเว็บตอน build (ไม่เรียก Google), `Referrer-Policy: no-referrer` |
| ถูกค้นเจอใน Google | `robots.txt` + `noindex` ทุกหน้า |
| ความลับหลุดขึ้น GitHub | `.env*.local`, `data/`, `*.pem`, `*.key` อยู่ใน `.gitignore` |
| ตำแหน่งในรูปถ่าย | รูปใน `public/photos/` ไม่มี EXIF / GPS — **ถ้าเพิ่มรูปจากมือถือ** ให้ลบ location ก่อน (Windows: คลิกขวา → Properties → Details → Remove Properties and Personal Information) |

> ⚠️ คนที่มีลิงก์จะเห็นหน้าเว็บ (ยกเว้น `/admin`) — อย่าใส่ข้อมูลที่ไม่อยากให้ใครเห็นใน `content.ts` หรือ `public/`
>
> ตรวจช่องโหว่ของแพ็กเกจเป็นระยะด้วย `npm audit`

---

## ☁️ อัปขึ้น GitHub แล้วออนไลน์ด้วย Vercel

### 1) ติดตั้ง Git (ครั้งแรกครั้งเดียว)

```bash
winget install Git.Git
```
ปิดแล้วเปิด Command Prompt ใหม่ จากนั้นตั้งชื่อผู้ใช้:
```bash
git config --global user.name "ชื่อของคุณ"
git config --global user.email "อีเมลที่ใช้สมัคร GitHub"
```

### 2) สร้าง repo บน GitHub

ไปที่ <https://github.com/new> → ตั้งชื่อ `love-web` → เลือก **Private** 🔒 → **ไม่ต้อง**ติ๊ก README / .gitignore → Create

### 3) อัปโค้ดขึ้นไป

```bash
cd love-web
git init
git add .
git status          # เช็กว่าไม่มี .env.local, node_modules, data/ ในรายการ
git commit -m "first commit 💜"
git branch -M main
git remote add origin https://github.com/<ชื่อ GitHub>/love-web.git
git push -u origin main
```
ครั้งแรกจะมีหน้าต่างให้ล็อกอิน GitHub

### 4) สร้างฐานข้อมูล MongoDB Atlas (ฟรี)

1. สมัครที่ <https://www.mongodb.com/cloud/atlas/register> → สร้าง cluster แบบ **M0 Free**
2. **Database Access** → สร้าง user พร้อมรหัสผ่านยาวๆ (กด Autogenerate)
3. **Network Access** → Add IP → `0.0.0.0/0` (Vercel ไม่มี IP ตายตัว ความปลอดภัยมาจากรหัสผ่าน user)
4. **Connect → Drivers** → คัดลอกลิงก์ `mongodb+srv://...` (เชื่อมต่อแบบเข้ารหัส TLS อยู่แล้ว)

### 5) Deploy บน Vercel

1. ไปที่ <https://vercel.com> → Sign up ด้วย GitHub
2. **Add New → Project** → เลือก repo `love-web` → Import
3. เปิด **Environment Variables** ใส่:
   - `ADMIN_PASSWORD` = รหัสยาว ≥ 12 ตัว
   - `MONGODB_URI` = ลิงก์จากข้อ 4
   - `SESSION_SECRET` = ข้อความสุ่มยาวๆ (ไม่บังคับ)
   - `DISCORD_WEBHOOK_URL` (ไม่บังคับ)
4. กด **Deploy** → ได้ลิงก์ `https://love-web-xxxx.vercel.app` ส่งให้เธอได้เลย 💜

### อัปเดตเว็บครั้งต่อไป

แก้ไฟล์แล้วรัน:
```bash
git add .
git commit -m "อัปเดตรูป"
git push
```
Vercel จะ deploy ใหม่ให้อัตโนมัติภายใน 1–2 นาที

---

<p align="center">Made with ♡ — Forever & Always</p>
