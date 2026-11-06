import type { MetadataRoute } from "next";

// เว็บส่วนตัว: บอก search engine ทุกตัวว่าห้ามเก็บ
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
