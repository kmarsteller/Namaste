"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/blog-db";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function load() {
    const res = await fetch("/api/blog/posts?admin=1");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(post: Post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(post.id);
    await fetch(`/api/blog/posts/${post.id}`, { method: "DELETE" });
    await load();
    setDeleting(null);
  }

  return (
    <div className="min-h-screen bg-stone-950">
      <header className="border-b border-stone-800/60 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-300 transition-colors">
              ← Admin
            </Link>
            <span className="text-stone-700 text-sm">·</span>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-400">Mindful Musings</span>
          </div>
          <Link
            href="/admin/blog/new"
            className="px-5 py-2 bg-sage-500 hover:bg-sage-400 text-stone-950 font-body font-medium text-xs tracking-[0.18em] uppercase rounded-sm transition-all"
          >
            + New Post
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-light text-stone-200 mb-1">Mindful Musings</h1>
          <p className="font-body text-xs text-stone-600 tracking-wide">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>

        {loading && (
          <p className="font-body text-sm text-stone-600">Loading…</p>
        )}

        {!loading && posts.length === 0 && (
          <div className="rounded-sm border border-dashed border-stone-800/60 px-8 py-16 text-center">
            <p className="font-display text-xl font-light text-stone-600 mb-2">No posts yet</p>
            <p className="font-body text-xs text-stone-700 mb-6">Write your first Mindful Musings post.</p>
            <Link
              href="/admin/blog/new"
              className="inline-flex px-6 py-2.5 border border-sage-600/50 text-sage-400 hover:bg-sage-700/20 font-body text-xs tracking-[0.15em] uppercase rounded-sm transition-all"
            >
              Write a post
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 border border-stone-800/60 rounded-sm bg-stone-900/30 px-5 py-4 hover:border-stone-700/60 transition-colors"
            >
              {/* Thumbnail */}
              {post.hero_image_url ? (
                <div className="relative w-16 h-12 flex-shrink-0 rounded-sm overflow-hidden">
                  <Image src={post.hero_image_url} alt="" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-16 h-12 flex-shrink-0 rounded-sm bg-stone-800/60 flex items-center justify-center">
                  <span className="text-stone-700 text-lg">✍</span>
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-base font-light text-stone-200 truncate">{post.title}</p>
                <p className="font-body text-[10px] text-stone-600 mt-0.5 tracking-wide">
                  {post.author} · {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>

              {/* Status badge */}
              <span className={`flex-shrink-0 px-2 py-0.5 rounded-sm font-body text-[9px] tracking-[0.2em] uppercase ${
                post.published ? "bg-sage-500/15 text-sage-400" : "bg-stone-800 text-stone-500"
              }`}>
                {post.published ? "Live" : "Draft"}
              </span>

              {/* Actions */}
              <div className="flex-shrink-0 flex items-center gap-2">
                {post.published && (
                  <Link
                    href={`/mindful-musings/${post.slug}`}
                    target="_blank"
                    className="font-body text-[10px] text-stone-600 hover:text-stone-300 transition-colors tracking-wide"
                  >
                    View ↗
                  </Link>
                )}
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="px-3 py-1.5 border border-stone-700/60 hover:border-stone-500 text-stone-400 hover:text-stone-200 font-body text-[10px] tracking-wide rounded-sm transition-all"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post)}
                  disabled={deleting === post.id}
                  className="px-3 py-1.5 border border-stone-800 hover:border-red-800/60 text-stone-600 hover:text-red-400 font-body text-[10px] tracking-wide rounded-sm transition-all disabled:opacity-50"
                >
                  {deleting === post.id ? "…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
