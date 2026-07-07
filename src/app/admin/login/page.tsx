"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const from = searchParams.get("from") ?? "/admin";
        router.push(from);
      } else {
        setError("Incorrect password.");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-stone-800/70 rounded-sm bg-stone-900/40 p-8">
      <h1 className="font-display text-2xl font-light text-stone-200 mb-1">Admin</h1>
      <p className="font-body text-xs text-stone-600 tracking-wide mb-8">
        Enter the admin password to continue.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 block mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            className="w-full bg-stone-950/70 border border-stone-700/60 focus:border-stone-500 focus:outline-none rounded-sm px-4 py-3 font-body text-sm text-stone-200 transition-colors duration-200"
          />
        </div>

        {error && (
          <p className="font-body text-xs text-red-400 tracking-wide">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-3 bg-sage-500 hover:bg-sage-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-body font-medium text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-200"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Image
            src="/logo-greige.png"
            alt="Namaste Yoga Studio"
            width={160}
            height={56}
            className="h-10 w-auto opacity-60"
          />
        </div>
        <Suspense fallback={<div className="h-64" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
