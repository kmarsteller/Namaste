import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const KEY = "classes-notice";
const FILE = path.join(process.cwd(), "data", "classes-notice.json");

async function readNotice() {
  if (process.env.KV_REST_API_URL) {
    const { kv } = await import("@vercel/kv");
    return await kv.get<{ notice: string; updatedAt: string }>(KEY) ?? { notice: "", updatedAt: "" };
  }
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return { notice: "", updatedAt: "" };
  }
}

async function writeNotice(data: { notice: string; updatedAt: string }) {
  if (process.env.KV_REST_API_URL) {
    const { kv } = await import("@vercel/kv");
    await kv.set(KEY, data);
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
