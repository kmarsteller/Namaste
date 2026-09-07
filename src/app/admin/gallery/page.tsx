"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery-db";

type EditState = { id: number; caption: string; taken_on: string };

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Upload form state
  const [uploadType, setUploadType] = useState<"photo" | "video">("photo");
  const [videoSource, setVideoSource] = useState<"file" | "link">("file");
  const [videoUrl, setVideoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [takenOn, setTakenOn] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(Array.isArray(data.items) ? data.items : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setUploadError(null);
    const file = fileRef.current?.files?.[0];
    if (uploadType === "photo" && !file) { setUploadError("Please select a photo file."); return; }
    if (uploadType === "video" && videoSource === "link" && !videoUrl.trim()) { setUploadError("Please enter a video URL."); return; }
    if (uploadType === "video" && videoSource === "file" && !file) { setUploadError("Please select a video file."); return; }

    setUploading(true);
    const fd = new FormData();
    fd.append("type", uploadType);
    if (caption.trim()) fd.append("caption", caption.trim());
    if (takenOn) fd.append("taken_on", takenOn);
    if (uploadType === "video" && videoSource === "link") {
      fd.append("video_url", videoUrl.trim());
    } else if (file) {
      fd.append("file", file);
    }

    const res = await fetch("/api/gallery", { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) {
      const data = await res.json();
      setUploadError(data.error ?? "Upload failed");
      return;
    }
    // Reset form
    setCaption("");
    setTakenOn("");
    setVideoUrl("");
    if (fileRef.current) fileRef.current.value = "";
    await load();
  }

  async function handleSaveEdit() {
    if (!editState) return;
    await fetch("/api/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editState.id, caption: editState.caption, taken_on: editState.taken_on }),
    });
    setEditState(null);
    await load();
  }

  async function handleDelete(item: GalleryItem) {
    if (!confirm(`Remove this ${item.type} from the gallery? This cannot be undone.`)) return;
    setDeleting(item.id);
    await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    setDeleting(null);
    await load();
  }

  const photos = items.filter((i) => i.type === "photo");
  const videos = items.filter((i) => i.type === "video");

  return (
    <div className="min-h-screen bg-stone-950">
      <header className="border-b border-stone-800/60 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-300 transition-colors">
              ← Admin
            </Link>
            <span className="text-stone-700 text-sm">·</span>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-400">Gallery</span>
          </div>
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* ── Upload form ── */}
        <section className="border border-stone-800/60 rounded-sm p-6">
          <h2 className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-6">Add to Gallery</h2>
          <form onSubmit={handleUpload} className="space-y-5">

            {/* Type toggle */}
            <div className="flex gap-3">
              {(["photo", "video"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setUploadType(t)}
                  className={`px-5 py-2 font-body text-xs tracking-[0.15em] uppercase rounded-sm border transition-all ${
                    uploadType === t
                      ? "bg-sage-500 text-stone-950 border-sage-500"
                      : "bg-transparent text-stone-400 border-stone-700 hover:border-stone-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Video source sub-toggle */}
            {uploadType === "video" && (
              <div className="flex gap-3">
                {(["file", "link"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setVideoSource(s)}
                    className={`px-4 py-1.5 font-body text-[11px] tracking-[0.12em] uppercase rounded-sm border transition-all ${
                      videoSource === s
                        ? "bg-gold-500/20 text-gold-300 border-gold-600/50"
                        : "bg-transparent text-stone-500 border-stone-800 hover:border-stone-600"
                    }`}
                  >
                    {s === "file" ? "Upload file" : "YouTube / Vimeo link"}
                  </button>
                ))}
              </div>
            )}

            {/* File / URL input */}
            {(uploadType === "photo" || (uploadType === "video" && videoSource === "file")) && (
              <div>
                <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                  {uploadType === "photo" ? "Photo file (JPG, PNG, WebP)" : "Video file (MP4, MOV)"}
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept={uploadType === "photo" ? "image/*" : "video/*"}
                  className="font-body text-sm text-stone-300 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:bg-stone-800 file:text-stone-300 file:text-xs file:tracking-wider file:uppercase hover:file:bg-stone-700"
                />
              </div>
            )}
            {uploadType === "video" && videoSource === "link" && (
              <div>
                <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-stone-900 border border-stone-700 rounded-sm px-4 py-2.5 font-body text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-stone-500"
                />
              </div>
            )}

            {/* Caption */}
            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                Caption (optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add a caption..."
                className="w-full bg-stone-900 border border-stone-700 rounded-sm px-4 py-2.5 font-body text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-stone-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                Date (optional)
              </label>
              <input
                type="date"
                value={takenOn}
                onChange={(e) => setTakenOn(e.target.value)}
                className="bg-stone-900 border border-stone-700 rounded-sm px-4 py-2.5 font-body text-sm text-stone-200 focus:outline-none focus:border-stone-500"
              />
            </div>

            {uploadError && (
              <p className="font-body text-xs text-red-400">{uploadError}</p>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="px-8 py-3 bg-sage-500 hover:bg-sage-400 disabled:opacity-50 text-stone-950 font-body font-medium text-xs tracking-[0.2em] uppercase rounded-sm transition-all"
            >
              {uploading ? "Uploading…" : "Add to Gallery"}
            </button>
          </form>
        </section>

        {/* ── Gallery items ── */}
        {loading ? (
          <p className="font-body text-stone-600 text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="font-body text-stone-600 text-sm">No gallery items yet.</p>
        ) : (
          <>
            {photos.length > 0 && (
              <Section title="Photos" items={photos} editState={editState} setEditState={setEditState} onSaveEdit={handleSaveEdit} onDelete={handleDelete} deleting={deleting} />
            )}
            {videos.length > 0 && (
              <Section title="Videos" items={videos} editState={editState} setEditState={setEditState} onSaveEdit={handleSaveEdit} onDelete={handleDelete} deleting={deleting} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Section({
  title, items, editState, setEditState, onSaveEdit, onDelete, deleting,
}: {
  title: string;
  items: GalleryItem[];
  editState: EditState | null;
  setEditState: (s: EditState | null) => void;
  onSaveEdit: () => void;
  onDelete: (item: GalleryItem) => void;
  deleting: number | null;
}) {
  return (
    <section>
      <h2 className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            editState={editState}
            setEditState={setEditState}
            onSaveEdit={onSaveEdit}
            onDelete={onDelete}
            deleting={deleting}
          />
        ))}
      </div>
    </section>
  );
}

function ItemCard({
  item, editState, setEditState, onSaveEdit, onDelete, deleting,
}: {
  item: GalleryItem;
  editState: EditState | null;
  setEditState: (s: EditState | null) => void;
  onSaveEdit: () => void;
  onDelete: (item: GalleryItem) => void;
  deleting: number | null;
}) {
  const isEditing = editState?.id === item.id;

  return (
    <div className="border border-stone-800/60 rounded-sm overflow-hidden bg-stone-900/30">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-stone-900">
        {item.type === "photo" ? (
          <Image src={item.storage_url} alt={item.caption ?? ""} fill className="object-cover" sizes="300px" />
        ) : item.video_embed_url ? (
          <iframe
            src={item.video_embed_url}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            title={item.caption ?? "Video"}
          />
        ) : (
          <video src={item.storage_url} className="w-full h-full object-cover" muted />
        )}
      </div>

      {/* Meta / edit */}
      <div className="p-3 space-y-2">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editState!.caption}
              onChange={(e) => setEditState({ ...editState!, caption: e.target.value })}
              placeholder="Caption"
              className="w-full bg-stone-900 border border-stone-700 rounded-sm px-3 py-1.5 font-body text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-stone-500"
            />
            <input
              type="date"
              value={editState!.taken_on}
              onChange={(e) => setEditState({ ...editState!, taken_on: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded-sm px-3 py-1.5 font-body text-xs text-stone-200 focus:outline-none focus:border-stone-500"
            />
            <div className="flex gap-2">
              <button onClick={onSaveEdit} className="flex-1 py-1.5 bg-sage-500 hover:bg-sage-400 text-stone-950 font-body text-[10px] tracking-[0.15em] uppercase rounded-sm transition-all">Save</button>
              <button onClick={() => setEditState(null)} className="flex-1 py-1.5 border border-stone-700 text-stone-400 font-body text-[10px] tracking-[0.15em] uppercase rounded-sm hover:border-stone-500 transition-all">Cancel</button>
            </div>
          </>
        ) : (
          <>
            {item.caption && <p className="font-body text-xs text-stone-300 leading-snug">{item.caption}</p>}
            {item.taken_on && (
              <p className="font-body text-[10px] text-stone-600">
                {new Date(item.taken_on + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            )}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setEditState({ id: item.id, caption: item.caption ?? "", taken_on: item.taken_on ?? "" })}
                className="flex-1 py-1.5 border border-stone-700 text-stone-400 font-body text-[10px] tracking-[0.15em] uppercase rounded-sm hover:border-stone-500 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item)}
                disabled={deleting === item.id}
                className="flex-1 py-1.5 border border-red-900/50 text-red-500/70 font-body text-[10px] tracking-[0.15em] uppercase rounded-sm hover:border-red-700/60 hover:text-red-400 disabled:opacity-40 transition-all"
              >
                {deleting === item.id ? "…" : "Remove"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
