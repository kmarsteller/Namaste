import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "classes-notice.json");

function read() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return { notice: "", updatedAt: "" };
  }
}

export async function GET() {
  return NextResponse.json(read());
}

export async function POST(req: Request) {
  const { notice } = await req.json();
  const data = { notice: String(notice ?? ""), updatedAt: new Date().toISOString() };
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  return NextResponse.json({ ok: true, updatedAt: data.updatedAt });
}
