"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery-db";

type Tab = "photos" | "videos";

export default function GalleryContent({ items }: { items: GalleryItem[] }) {
  const [heroVisible, setHeroVisible] = useState(false);
  const [tab, setTab] = useState<Tab>("photos");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const photos = items.filter((i) => i.type === "photo");
  const videos = items.filter((i) => i.type === "video");

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const displayed = tab === "photos" ? photos : videos;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-16 px-6 md:px-12 bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 to-stone-950" />
        <div
          className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-sage-500/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-400/70">
              Studio Life
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-4">
            Gallery
          </h1>
          <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-xl">
            A glimpse into our studio, our classes, and the community we cherish.
          </p>
        </div>
      </section>

      {/* ── Tab bar ── */}
      <div className="bg-stone-950 sticky top-[72px] z-30 border-b border-stone-800/40">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          {(["photos", "videos"] as Tab[]).map((t) => {
            const count = t === "photos" ? photos.length : videos.length;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-4 font-body text-[11px] tracking-[0.25em] uppercase border-b-2 transition-all ${
                  tab === t
                    ? "border-sage-500 text-stone-200"
                    : "border-transparent text-stone-500 hover:text-stone-300"
                }`}
              >
                {t} <span className="ml-1 opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="bg-stone-950 px-6 md:px-12 py-12 min-h-[50vh]">
        <div className="max-w-6xl mx-auto">
          {displayed.length === 0 ? (
            <p className="font-body text-stone-600 text-sm py-16 text-center">
              No {tab} yet — check back soon.
            </p>
          ) : tab === "photos" ? (
            <MasonryGrid items={photos} onOpen={setLightbox} />
          ) : (
            <VideoGrid items={videos} />
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-stone-400 hover:text-stone-100 font-body text-2xl leading-none transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div
            className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[80vh]">
              <Image
                src={lightbox.storage_url}
                alt={lightbox.caption ?? ""}
                width={1400}
                height={900}
                className="object-contain max-h-[80vh] w-full rounded-sm"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </div>
            {(lightbox.caption || lightbox.taken_on) && (
              <div className="text-center">
                {lightbox.caption && (
                  <p className="font-body text-stone-300 text-sm">{lightbox.caption}</p>
                )}
                {lightbox.taken_on && (
                  <p className="font-body text-stone-600 text-xs mt-1">
                    {new Date(lightbox.taken_on + "T12:00:00").toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function MasonryGrid({ items, onOpen }: { items: GalleryItem[]; onOpen: (i: GalleryItem) => void }) {
  // Split into 3 columns for masonry effect
  const cols: GalleryItem[][] = [[], [], []];
  items.forEach((item, i) => cols[i % 3].push(item));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {cols.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-3">
          {col.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpen(item)}
              className="group relative overflow-hidden rounded-sm bg-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
            >
              <Image
                src={item.storage_url}
                alt={item.caption ?? ""}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay with caption */}
              {(item.caption || item.taken_on) && (
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  {item.caption && (
                    <p className="font-body text-xs text-stone-200 leading-snug">{item.caption}</p>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function VideoGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="rounded-sm overflow-hidden bg-stone-900/50 border border-stone-800/40">
          <div className="relative aspect-video bg-stone-900">
            {item.video_embed_url ? (
              <iframe
                src={item.video_embed_url}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={item.caption ?? "Video"}
              />
            ) : (
              <video
                src={item.storage_url}
                controls
                className="w-full h-full object-cover"
                preload="metadata"
              />
            )}
          </div>
          {(item.caption || item.taken_on) && (
            <div className="px-4 py-3">
              {item.caption && <p className="font-body text-sm text-stone-300 leading-snug">{item.caption}</p>}
              {item.taken_on && (
                <p className="font-body text-[10px] text-stone-600 mt-1">
                  {new Date(item.taken_on + "T12:00:00").toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
