"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery-db";

type EditState = { id: number; caption: string; taken_on: string };
type QueuedFile = { file: File; preview: string; caption: string };

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Upload form state
  const [uploadType, setUploadType] = useState<"photo" | "video">("photo");
  const [videoSource, setVideoSource] = useState<"file" | "link">("file");
  const [videoUrl, setVideoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [takenOn, setTakenOn] = useState("");
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const addMoreRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(Array.isArray(data.items) ? data.items : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  // Clean up object URLs when queue changes
  useEffect(() => {
    return () => { queue.forEach((q) => URL.revokeObjectURL(q.preview)); };
  }, [queue]);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const newFiles = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
    if (!newFiles.length) return;
    setQueue((prev) => [
      ...prev,
      ...newFiles.map((file) => ({ file, preview: URL.createObjectURL(file), caption: "" })),
    ]);
  }, []);

  function updateCaption(index: number, value: string) {
    setQueue((prev) => prev.map((q, i) => i === index ? { ...q, caption: value } : q));
  }

  function removeFromQueue(index: number) {
    setQueue((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (uploadType === "photo") addFiles(e.dataTransfer.files);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setUploadError(null);

    if (uploadType === "photo") {
      if (!queue.length) { setUploadError("Add at least one photo first."); return; }
      setUploading(true);
      const total = queue.length;
      setUploadProgress({ done: 0, total });
      for (let i = 0; i < total; i++) {
        const fd = new FormData();
        fd.append("type", "photo");
        const photoCaption = queue[i].caption.trim() || caption.trim();
        if (photoCaption) fd.append("caption", photoCaption);
        if (takenOn) fd.append("taken_on", takenOn);
        fd.append("file", queue[i].file);
        const res = await fetch("/api/gallery", { method: "POST", body: fd });
        if (!res.ok) {
          const data = await res.json();
          setUploadError(`Failed on photo ${i + 1}: ${data.error ?? "Upload failed"}`);
          break;
        }
        setUploadProgress({ done: i + 1, total });
      }
      queue.forEach((q) => URL.revokeObjectURL(q.preview));
      setQueue([]);
    } else {
      // Video
      const file = fileRef.current?.files?.[0];
      if (videoSource === "link" && !videoUrl.trim()) { setUploadError("Please enter a video URL."); return; }
      if (videoSource === "file" && !file) { setUploadError("Please select a video file."); return; }
      setUploading(true);
      const fd = new FormData();
      fd.append("type", "video");
      if (caption.trim()) fd.append("caption", caption.trim());
      if (takenOn) fd.append("taken_on", takenOn);
      if (videoSource === "link") fd.append("video_url", videoUrl.trim());
      else if (file) fd.append("file", file);
      const res = await fetch("/api/gallery", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json();
        setUploadError(data.error ?? "Upload failed");
      }
      setVideoUrl("");
      if (fileRef.current) fileRef.current.value = "";
    }

    setUploading(false);
    setUploadProgress(null);
    setCaption("");
    setTakenOn("");
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
                  onClick={() => { setUploadType(t); setQueue([]); }}
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

            {/* ── Photo: drop zone + queue ── */}
            {uploadType === "photo" && (
              <div className="space-y-3">
                {/* Hidden inputs */}
                <input
                  ref={addMoreRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }}
                />

                {/* Drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => addMoreRef.current?.click()}
                  className={`cursor-pointer rounded-sm border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 py-10 px-6 text-center ${
                    dragOver
                      ? "border-sage-500 bg-sage-900/15"
                      : "border-stone-700 hover:border-stone-500 bg-stone-900/20 hover:bg-stone-900/40"
                  }`}
                >
                  <svg className="w-8 h-8 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <div>
                    <p className="font-body text-sm text-stone-300">Drop photos here, or <span className="text-sage-400 underline underline-offset-2">browse</span></p>
                    <p className="font-body text-xs text-stone-600 mt-1">JPG, PNG, WebP — select as many as you like</p>
                  </div>
                </div>

                {/* Queued thumbnails */}
                {queue.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">
                        {queue.length} photo{queue.length !== 1 ? "s" : ""} queued
                      </p>
                      <button
                        type="button"
                        onClick={() => addMoreRef.current?.click()}
                        className="font-body text-[10px] tracking-[0.15em] uppercase text-sage-400 hover:text-sage-300 transition-colors"
                      >
                        + Add more
                      </button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {queue.map((q, i) => (
                        <div key={q.preview} className="group">
                          <div className="relative aspect-square rounded-sm overflow-hidden bg-stone-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={q.preview} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeFromQueue(i); }}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-stone-950/80 text-stone-300 hover:text-white text-xs leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Remove"
                            >
                              ×
                            </button>
                          </div>
                          <input
                            type="text"
                            value={q.caption}
                            onChange={(e) => updateCaption(i, e.target.value)}
                            placeholder="Caption…"
                            className="w-full mt-1.5 bg-stone-900 border border-stone-800 rounded-sm px-2 py-1 font-body text-xs text-stone-300 placeholder-stone-700 focus:outline-none focus:border-stone-600 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Video: source toggle + input ── */}
            {uploadType === "video" && (
              <div className="space-y-4">
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
                {videoSource === "file" && (
                  <input
                    ref={fileRef}
                    type="file"
                    accept="video/*"
                    className="font-body text-sm text-stone-300 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:bg-stone-800 file:text-stone-300 file:text-xs file:tracking-wider file:uppercase hover:file:bg-stone-700"
                  />
                )}
                {videoSource === "link" && (
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-stone-900 border border-stone-700 rounded-sm px-4 py-2.5 font-body text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-stone-500"
                  />
                )}
              </div>
            )}

            {/* Caption */}
            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                Default caption for all (optional, override per photo above)
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

            {/* Progress bar */}
            {uploadProgress && (
              <div className="space-y-1.5">
                <div className="h-1 w-full bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sage-500 transition-all duration-300"
                    style={{ width: `${(uploadProgress.done / uploadProgress.total) * 100}%` }}
                  />
                </div>
                <p className="font-body text-[10px] text-stone-500">
                  Uploading {uploadProgress.done} of {uploadProgress.total}…
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || (uploadType === "photo" && queue.length === 0)}
              className="px-8 py-3 bg-sage-500 hover:bg-sage-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-body font-medium text-xs tracking-[0.2em] uppercase rounded-sm transition-all"
            >
              {uploading ? "Uploading…" : uploadType === "photo" && queue.length > 0
                ? `Upload ${queue.length} Photo${queue.length !== 1 ? "s" : ""}`
                : "Add to Gallery"}
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
