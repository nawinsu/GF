// ที่เก็บข้อความจากหน้า Letter
// - ถ้าตั้ง MONGODB_URI ใน .env.local → เก็บใน MongoDB
// - ถ้าไม่ตั้ง → เก็บเป็นไฟล์ data/messages.json (เหมาะกับรันในเครื่อง)
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { MongoClient } from "mongodb";

export type Message = { id: string; message: string; createdAt: string; read?: boolean };

const FILE = path.join(process.cwd(), "data", "messages.json");

let clientPromise: Promise<MongoClient> | null = null;
async function collection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!clientPromise) clientPromise = new MongoClient(uri).connect();
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "love-web").collection<Message>("messages");
}

async function readFile(): Promise<Message[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

export async function addMessage(message: string): Promise<Message> {
  const doc: Message = { id: randomUUID(), message, createdAt: new Date().toISOString(), read: false };
  const col = await collection();
  if (col) {
    await col.insertOne({ ...doc });
  } else {
    if (process.env.VERCEL) {
      throw new Error("บน Vercel ต้องตั้ง MONGODB_URI (Vercel เขียนไฟล์ไม่ได้)");
    }
    const all = await readFile();
    all.push(doc);
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
  }
  return doc;
}

export async function listMessages(): Promise<Message[]> {
  const col = await collection();
  const all = col
    ? await col.find({}, { projection: { _id: 0 } }).toArray()
    : await readFile();
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function markRead(id: string) {
  const col = await collection();
  if (col) {
    await col.updateOne({ id }, { $set: { read: true } });
    return;
  }
  const all = await readFile();
  const m = all.find((x) => x.id === id);
  if (m) {
    m.read = true;
    await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
  }
}
