"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type PostDraft = {
  title: string;
  author: string;
  excerpt: string;
  body: string;
  hero_image_url: string;
  published: boolean;
};

type Props = {
  initial?: Partial<PostDraft>;
  onSave: (draft: PostDraft) => Promise<void>;
  saveLabel?: string;
};

function ToolbarButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-2.5 py-1 font-body text-[10px] tracking-wide text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-sm transition-colors"
    >
      {label}
    </button>
  );
}

export default function BlogEditor({ initial, onSave, saveLabel = "Save" }: Props) {
  const [draft, setDraft] = useState<PostDraft>({
    title: initial?.title ?? "",
    author: initial?.author ?? "Namaste Yoga Studio",
    excerpt: initial?.excerpt ?? "",
    body: initial?.body ?? "",
    hero_image_url: initial?.hero_image_url ?? "",
    published: initial?.published ?? false,
  });
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [heroUploading, setHeroUploading] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const bodyImageInputRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof PostDraft>(key: K, val: PostDraft[K]) {
    setDraft((d) => ({ ...d, [key]: val }));
  }

  // Insert markdown syntax around selected text (or at cursor)
  function wrap(before: string, after: string) {
    const ta = bodyRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value } = ta;
    const selected = value.slice(s, e) || "text";
    const newVal = value.slice(0, s) + before + selected + after + value.slice(e);
    set("body", newVal);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(s + before.length, s + before.length + selected.length);
    }, 0);
  }

  function insertAtCursor(text: string) {
    const ta = bodyRef.current;
    if (!ta) return;
    const { selectionStart: s, value } = ta;
    const newVal = value.slice(0, s) + text + value.slice(s);
    set("body", newVal);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(s + text.length, s + text.length); }, 0);
  }

  async function uploadImage(file: File, onUrl: (url: string) => void) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/blog/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const { url } = await res.json();
    onUrl(url);
  }

  async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroUploading(true);
    try {
      await uploadImage(file, (url) => set("hero_image_url", url));
    } catch {
      setError("Hero image upload failed.");
    } finally {
      setHeroUploading(false);
      e.target.value = "";
    }
  }

  async function handleBodyImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadImage(file, (url) => insertAtCursor(`\n![image](${url})\n`));
    } catch {
      setError("Image upload failed.");
    } finally {
      e.target.value = "";
    }
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      await onSave(draft);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 block mb-2">Title</label>
        <input
          type="text"
          value={draft.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Post title…"
          className="w-full bg-stone-950/70 border border-stone-700/60 focus:border-stone-500 focus:outline-none rounded-sm px-4 py-3 font-display text-xl font-light text-stone-100 placeholder:text-stone-700 transition-colors"
        />
      </div>

      {/* Author + Published row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 block mb-2">Byline / Author</label>
          <input
            type="text"
            value={draft.author}
            onChange={(e) => set("author", e.target.value)}
            className="w-full bg-stone-950/70 border border-stone-700/60 focus:border-stone-500 focus:outline-none rounded-sm px-4 py-3 font-body text-sm text-stone-200 transition-colors"
          />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              onClick={() => set("published", !draft.published)}
              className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${draft.published ? "bg-sage-500" : "bg-stone-700"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${draft.published ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="font-body text-xs text-stone-500 tracking-wide">
              {draft.published ? "Published" : "Draft"}
            </span>
          </label>
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 block mb-2">
          Excerpt <span className="text-stone-700 normal-case tracking-normal">(shown on the listing page)</span>
        </label>
        <textarea
          value={draft.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="A short description…"
          rows={2}
          className="w-full bg-stone-950/70 border border-stone-700/60 focus:border-stone-500 focus:outline-none rounded-sm px-4 py-3 font-body text-sm text-stone-200 placeholder:text-stone-700 resize-none transition-colors"
        />
      </div>

      {/* Hero image */}
      <div>
        <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 block mb-2">Hero Image</label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => heroInputRef.current?.click()}
            disabled={heroUploading}
            className="px-4 py-2 border border-stone-700/60 hover:border-stone-500 text-stone-400 hover:text-stone-200 font-body text-xs tracking-wide rounded-sm transition-all disabled:opacity-50"
          >
            {heroUploading ? "Uploading…" : draft.hero_image_url ? "Replace image" : "Upload image"}
          </button>
          {draft.hero_image_url && (
            <button
              type="button"
              onClick={() => set("hero_image_url", "")}
              className="font-body text-xs text-stone-700 hover:text-red-400 transition-colors"
            >
              Remove
            </button>
          )}
          <input ref={heroInputRef} type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
        </div>
        {draft.hero_image_url && (
          <div className="mt-3 relative w-full aspect-[3/1] rounded-sm overflow-hidden border border-stone-800/60">
            <Image src={draft.hero_image_url} alt="Hero preview" fill className="object-cover" />
          </div>
        )}
      </div>

      {/* Body editor */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600">Body</label>
          <div className="flex gap-1 border border-stone-800/60 rounded-sm p-0.5">
            {(["write", "preview"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3 py-1 font-body text-[10px] tracking-wide uppercase rounded-sm transition-colors ${
                  tab === t ? "bg-stone-800 text-stone-200" : "text-stone-600 hover:text-stone-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === "write" && (
          <>
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 border border-stone-800/60 border-b-0 rounded-t-sm px-2 py-1.5 bg-stone-900/60 flex-wrap">
              <ToolbarButton label="B" onClick={() => wrap("**", "**")} />
              <ToolbarButton label="I" onClick={() => wrap("*", "*")} />
              <ToolbarButton label="H2" onClick={() => insertAtCursor("\n## ")} />
              <ToolbarButton label="H3" onClick={() => insertAtCursor("\n### ")} />
              <span className="w-px h-4 bg-stone-800 mx-1" />
              <ToolbarButton label="Link" onClick={() => wrap("[", "](url)")} />
              <ToolbarButton label="Quote" onClick={() => insertAtCursor("\n> ")} />
              <ToolbarButton label="—" onClick={() => insertAtCursor("\n\n---\n\n")} />
              <span className="w-px h-4 bg-stone-800 mx-1" />
              <button
                type="button"
                onClick={() => bodyImageInputRef.current?.click()}
                className="px-2.5 py-1 font-body text-[10px] tracking-wide text-sage-400 hover:text-sage-300 hover:bg-stone-800 rounded-sm transition-colors"
              >
                + Image
              </button>
              <input ref={bodyImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleBodyImageUpload} />
            </div>
            <textarea
              ref={bodyRef}
              value={draft.body}
              onChange={(e) => set("body", e.target.value)}
              placeholder="Write your post here… Markdown is supported."
              rows={20}
              className="w-full bg-stone-950/70 border border-stone-700/60 focus:border-stone-500 focus:outline-none rounded-b-sm px-4 py-4 font-body text-sm text-stone-200 placeholder:text-stone-700 leading-relaxed resize-y transition-colors font-mono"
            />
          </>
        )}

        {tab === "preview" && (
          <div className="min-h-[480px] border border-stone-700/60 rounded-sm px-6 py-6 bg-stone-950/50 prose-blog">
            {draft.body.trim() ? (
              <BlogPreview body={draft.body} />
            ) : (
              <p className="font-body text-sm text-stone-700 italic">Nothing to preview yet.</p>
            )}
          </div>
        )}
      </div>

      {error && <p className="font-body text-xs text-red-400">{error}</p>}

      <div className="flex items-center justify-between pt-2 border-t border-stone-800/40">
        <p className="font-body text-[10px] text-stone-700 tracking-wide">
          {draft.published ? "Will be visible on the site." : "Saved as draft — not visible yet."}
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !draft.title.trim()}
          className="px-8 py-3 bg-sage-500 hover:bg-sage-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-body font-medium text-xs tracking-[0.2em] uppercase rounded-sm transition-all"
        >
          {saving ? "Saving…" : saveLabel}
        </button>
      </div>
    </div>
  );
}

function BlogPreview({ body }: { body: string }) {
  return (
    <div className="blog-body text-stone-300 font-body text-sm leading-relaxed space-y-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}
