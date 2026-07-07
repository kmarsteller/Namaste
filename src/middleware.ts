import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function deriveToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("namaste-admin-v1"));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export async function middleware(request: NextRequest) {
  // Let the login page through
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();

  const password = process.env.ADMIN_PASSWORD;
  // If no password is configured (local dev), allow access
  if (!password) return NextResponse.next();

  const expected = await deriveToken(password);
  const cookie = request.cookies.get("admin-session")?.value;

  if (cookie === expected) return NextResponse.next();

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
