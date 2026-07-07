"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BlogEditor, { type PostDraft } from "@/components/BlogEditor";

export default function NewPostPage() {
  const router = useRouter();

  async function handleSave(draft: PostDraft) {
    const res = await fetch("/api/blog/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? "Save failed");
    }
    router.push("/admin/blog");
  }

  return (
    <div className="min-h-screen bg-stone-950">
      <header className="border-b border-stone-800/60 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/blog" className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-300 transition-colors">
              ← Posts
            </Link>
            <span className="text-stone-700 text-sm">·</span>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-400">New Post</span>
          </div>
          <Image src="/logo-greige.png" alt="" width={80} height={28} className="h-6 w-auto opacity-40" />
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-light text-stone-200 mb-8">New Post</h1>
        <BlogEditor onSave={handleSave} saveLabel="Publish / Save" />
      </div>
    </div>
  );
}
