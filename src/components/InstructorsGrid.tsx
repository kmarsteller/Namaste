"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { instructors } from "@/data/instructors";
import ScheduleLightbox from "@/components/ScheduleLightbox";

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  return isTouch;
}

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Blob shapes — each card gets its own organic silhouette ──────────────────
const BLOBS = [
  "62% 38% 46% 54% / 60% 44% 56% 40%",
  "44% 56% 36% 64% / 48% 60% 40% 52%",
  "54% 46% 62% 38% / 40% 56% 44% 60%",
  "38% 62% 54% 46% / 56% 40% 60% 44%",
  "50% 50% 40% 60% / 44% 54% 46% 56%",
  "66% 34% 44% 56% / 52% 48% 58% 42%",
  "36% 64% 58% 42% / 60% 50% 40% 54%",
];

// ── Tilt card ────────────────────────────────────────────────────────────────
function InstructorCard({
  instructor,
  index,
  spotlit,
  dimmed,
  isTouch,
  onEnter,
  onLeave,
  onTap,
  onScheduleClick,
}: {
  instructor: typeof instructors[0];
  index: number;
  spotlit: boolean;
  dimmed: boolean;
  isTouch: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onTap: () => void;
  onScheduleClick: () => void;
}) {
  const { ref: inViewRef, visible } = useInView();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [panelVisible, setPanelVisible] = useState(false);
  const panelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Merge refs
  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    },
    [inViewRef]
  );

  // Sync panel visibility with spotlit (handles both mouse and touch)
  useEffect(() => {
    if (spotlit) {
      panelTimer.current = setTimeout(() => setPanelVisible(true), isTouch ? 0 : 80);
    } else {
      setPanelVisible(false);
      if (panelTimer.current) clearTimeout(panelTimer.current);
    }
  }, [spotlit, isTouch]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -14, y: x * 14 });
  };

  const handleMouseEnter = () => { if (!isTouch) onEnter(); };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setTilt({ x: 0, y: 0 });
    onLeave();
  };

  const handleClick = () => { if (isTouch) onTap(); };

  useEffect(() => () => {
    if (panelTimer.current) clearTimeout(panelTimer.current);
  }, []);

  const transform = spotlit
    ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.04)`
    : dimmed
    ? "perspective(800px) scale(0.97)"
    : "perspective(800px) scale(1)";

  return (
    <div
      ref={setRefs}
      className={`relative transition-[opacity,transform] will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDuration: visible && !spotlit && !dimmed ? "700ms" : "200ms",
        transitionDelay: visible && !spotlit && !dimmed ? `${(index % 5) * 70}ms` : "0ms",
        transform,
        opacity: dimmed ? 0.25 : 1,
        zIndex: spotlit ? 10 : 1,
      }}
      data-instructor-card
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* ── Photo frame ── */}
      <div
        className="relative overflow-hidden bg-stone-900 aspect-[3/4]"
        style={{
          clipPath: "inset(0 round 50% 50% 6px 6px / 22% 22% 6px 6px)",
          boxShadow: spotlit
            ? "0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(143,175,151,0.15)"
            : "0 4px 12px rgba(0,0,0,0.3)",
          transition: "box-shadow 200ms ease",
        }}
      >
        <Image
          src={instructor.photo}
          alt={instructor.name}
          fill
          className={`object-cover object-top transition-all duration-500 ${
            spotlit ? "scale-105 grayscale-0" : "grayscale-[30%]"
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Permanent subtle gradient at bottom for name legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

        {/* ── Slide-up info panel ── */}
        <div
          className="absolute inset-x-0 bottom-0 bg-stone-950/92 backdrop-blur-sm px-4 pt-4 pb-5 flex flex-col gap-3"
          style={{
            transform: panelVisible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 340ms cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        >
          {/* Certs */}
          <ul className="space-y-1.5">
            {instructor.certs.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[10px] text-stone-300 tracking-wide">
                <span className="w-1 h-1 rounded-full bg-sage-400 flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>

          {/* Schedule link — lightbox if arketaId present, else fallback to /classes */}
          {instructor.arketaId ? (
            <button
              onClick={(e) => { e.stopPropagation(); onScheduleClick(); }}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-sage-600/60 text-sage-300 hover:bg-sage-700/30 hover:border-sage-400 transition-all duration-200 rounded-sm text-[10px] tracking-[0.18em] uppercase w-full"
            >
              View {instructor.name.split(" ")[0]}&apos;s Schedule →
            </button>
          ) : (
            <Link
              href="/classes"
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-sage-600/60 text-sage-300 hover:bg-sage-700/30 hover:border-sage-400 transition-all duration-200 rounded-sm text-[10px] tracking-[0.18em] uppercase"
            >
              View {instructor.name.split(" ")[0]}&apos;s Schedule →
            </Link>
          )}
        </div>

        {/* Owner badge */}
        {instructor.owner && (
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-gold-500/90 rounded-sm z-10">
            <span className="font-body text-[9px] tracking-[0.2em] uppercase text-stone-950 font-medium">
              Owner
            </span>
          </div>
        )}

        {/* Tilt shine — subtle highlight that moves with tilt */}
        {spotlit && (
          <div
            className="absolute inset-0 pointer-events-none rounded-sm"
            style={{
              background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 + tilt.x * -3}%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
            }}
          />
        )}
      </div>

      {/* ── Name below card ── */}
      <div
        className="mt-3 px-0.5 transition-all duration-200"
        style={{ transform: spotlit ? "translateY(-2px)" : "translateY(0)" }}
      >
        <p className="font-display text-base font-light text-stone-200 leading-tight">
          {instructor.name}
        </p>
        <p className="font-body text-[10px] tracking-[0.12em] text-stone-600 mt-0.5">
          {instructor.certs[0]}
          {instructor.certs.length > 1 && (
            <span className="text-stone-700"> +{instructor.certs.length - 1}</span>
          )}
        </p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function InstructorsGrid() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [lightboxInstructor, setLightboxInstructor] = useState<typeof instructors[0] | null>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Tap outside any card on touch dismisses the active card
  useEffect(() => {
    if (!isTouch) return;
    const handler = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-instructor-card]")) setHoveredName(null);
    };
    document.addEventListener("touchstart", handler);
    return () => document.removeEventListener("touchstart", handler);
  }, [isTouch]);

  return (
    <>
      {/* Page hero */}
      <section className="relative pt-40 pb-16 px-6 md:px-12 bg-stone-950 overflow-hidden">
        <Image src="/hero-instructors.png" alt="" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40" />
        <div
          className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-gold-500/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400/70">
              The Faculty
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-5">
            Meet Your Instructors
          </h1>
          <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-xl">
            {instructors.length} certified teachers. Hundreds of combined training hours.
            One shared belief — that yoga belongs to everyone.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 md:px-12 bg-stone-950">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {instructors.map((instructor, i) => (
            <InstructorCard
              key={instructor.name}
              instructor={instructor}
              index={i}
              spotlit={hoveredName === instructor.name}
              dimmed={hoveredName !== null && hoveredName !== instructor.name}
              isTouch={isTouch}
              onEnter={() => setHoveredName(instructor.name)}
              onLeave={() => setHoveredName(null)}
              onTap={() => setHoveredName(
                hoveredName === instructor.name ? null : instructor.name
              )}
              onScheduleClick={() => setLightboxInstructor(instructor)}
            />
          ))}
        </div>
      </section>

      {/* ── Schedule lightbox ── */}
      {lightboxInstructor?.arketaId && (
        <ScheduleLightbox
          instructorName={lightboxInstructor.name}
          arketaId={lightboxInstructor.arketaId}
          onClose={() => setLightboxInstructor(null)}
        />
      )}
    </>
  );
}
