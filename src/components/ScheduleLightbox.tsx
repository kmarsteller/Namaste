"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface Props {
  instructorName: string;
  arketaId: string;
  bio?: string;
  certs?: string[];
  onClose: () => void;
}

export default function ScheduleLightbox({ instructorName, arketaId, bio, certs, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstName = instructorName.split(" ")[0];
  const [tab, setTab] = useState<"schedule" | "bio">("schedule");

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Click outside modal to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const src = `https://app.arketa.co/iframe/namasteyogaohio/schedule?host=${arketaId}`;
  const hasBio = !!(bio?.trim());

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{
        backgroundColor: "rgba(12, 10, 9, 0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "fadeIn 200ms ease forwards",
      }}
    >
      <div
        className="relative w-full max-w-3xl bg-stone-950 border border-stone-800/70 rounded-sm shadow-2xl flex flex-col"
        style={{
          maxHeight: "90vh",
          animation: "scaleUp 220ms cubic-bezier(0.33, 1, 0.68, 1) forwards",
        }}
      >
        {/* ── Modal header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800/60 flex-shrink-0">
          <div className="flex items-end gap-6">
            <div>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-600 mb-0.5">
                View {firstName}&apos;s Bio &amp; Schedule
              </p>
              <p className="font-display text-xl font-light text-stone-100">
                {instructorName}
              </p>
            </div>

            {/* Tab switcher — only shown when bio is present */}
            {hasBio && (
              <div className="flex items-center gap-1 mb-0.5">
                <button
                  onClick={() => setTab("bio")}
                  className={`font-body text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-sm transition-all duration-150 ${
                    tab === "bio"
                      ? "bg-sage-800/50 text-sage-300 border border-sage-700/60"
                      : "text-stone-600 hover:text-stone-400"
                  }`}
                >
                  Bio
                </button>
                <button
                  onClick={() => setTab("schedule")}
                  className={`font-body text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-sm transition-all duration-150 ${
                    tab === "schedule"
                      ? "bg-sage-800/50 text-sage-300 border border-sage-700/60"
                      : "text-stone-600 hover:text-stone-400"
                  }`}
                >
                  Schedule
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-200 hover:bg-stone-800/60 rounded-sm transition-all duration-150"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Bio panel ── */}
        {hasBio && tab === "bio" && (
          <div className="flex-1 overflow-auto min-h-0 px-8 py-8">
            <p className="font-body text-sm text-stone-400 leading-relaxed whitespace-pre-line mb-8">
              {bio}
            </p>

            {certs && certs.length > 0 && (
              <div className="border-t border-stone-800/40 pt-6">
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-sage-500 mb-4">
                  Certifications
                </p>
                <ul className="space-y-2">
                  {certs.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 font-body text-xs text-stone-400">
                      <span className="w-1 h-1 rounded-full bg-sage-500 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-stone-800/40">
              <button
                onClick={() => setTab("schedule")}
                className="font-body text-[10px] tracking-[0.2em] uppercase text-sage-400 hover:text-sage-300 transition-colors"
              >
                View {firstName}&apos;s Schedule →
              </button>
            </div>
          </div>
        )}

        {/* ── Schedule iframe ── */}
        {tab === "schedule" && (
          <div className="flex-1 overflow-auto min-h-0">
            <iframe
              src={src}
              width="100%"
              style={{ minHeight: "560px", border: "none", display: "block", filter: "invert(1) hue-rotate(180deg)" }}
              allow="payment;fullscreen"
              allowFullScreen
              title={`${firstName}'s Class Schedule`}
            />
          </div>
        )}

        {/* ── Footer ── */}
        <div className="px-6 py-3 border-t border-stone-800/60 flex-shrink-0 flex items-center justify-between">
          <p className="font-body text-[10px] text-stone-700 tracking-wide">
            {tab === "schedule" ? "Tap a class to book" : `${firstName}'s bio`}
          </p>
          <button
            onClick={onClose}
            className="font-body text-[10px] tracking-[0.15em] uppercase text-stone-600 hover:text-stone-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
}
