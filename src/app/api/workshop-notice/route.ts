import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const KEY = "workshop-notice";
const FILE = path.join(process.cwd(), "data", "workshop-notice.json");

async function readNotice() {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
    return await redis.get<{ notice: string; updatedAt: string }>(KEY) ?? { notice: "", updatedAt: "" };
  }
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return { notice: "", updatedAt: "" };
  }
}

async function writeNotice(data: { notice: string; updatedAt: string }) {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
    await redis.set(KEY, data);
    return;
  }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json(await readNotice());
}

export async function POST(req: Request) {
  const { notice } = await req.json();
  const data = { notice: String(notice ?? ""), updatedAt: new Date().toISOString() };
  await writeNotice(data);
  return NextResponse.json({ ok: true, updatedAt: data.updatedAt });
}
