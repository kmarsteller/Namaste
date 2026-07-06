"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface Props {
  instructorName: string;
  arketaId: string;
  onClose: () => void;
}

export default function ScheduleLightbox({ instructorName, arketaId, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstName = instructorName.split(" ")[0];

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
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-600 mb-0.5">
              Schedule
            </p>
            <p className="font-display text-xl font-light text-stone-100">
              {firstName}&apos;s Classes
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-200 hover:bg-stone-800/60 rounded-sm transition-all duration-150"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Iframe ── */}
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

        {/* ── Footer ── */}
        <div className="px-6 py-3 border-t border-stone-800/60 flex-shrink-0 flex items-center justify-between">
          <p className="font-body text-[10px] text-stone-700 tracking-wide">
            Tap a class to book
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
