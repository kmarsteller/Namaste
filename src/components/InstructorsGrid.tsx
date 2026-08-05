"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { instructors, type Instructor } from "@/data/instructors";
import ScheduleLightbox from "@/components/ScheduleLightbox";

type ArketaInstructor = { id: string; name: string; photo: string; bio: string };

type MergedInstructor = Omit<Instructor, "arketaId"> & {
  photo: string;
  bio?: string;
  arketaId?: string;
};

function mergeWithArketa(arketa: ArketaInstructor[]): MergedInstructor[] {
  const byName = new Map(arketa.map((a) => [a.name.toLowerCase().trim(), a]));
  return instructors.map((inst) => {
    const ark = byName.get(inst.name.toLowerCase().trim());
    return {
      ...inst,
      photo: ark?.photo || inst.photo,
      bio: ark?.bio || undefined,
      arketaId: ark?.id || inst.arketaId,
    };
  });
}

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
  instructor: MergedInstructor;
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
      {/* ── Photo frame — no arch, seamless rectangle ── */}
      <div
        className="relative overflow-hidden bg-stone-900 aspect-[3/4]"
        style={{
          boxShadow: spotlit ? "0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(143,175,151,0.1)" : "none",
          transition: "box-shadow 300ms ease",
        }}
      >
        <Image
          src={instructor.photo}
          alt={instructor.name}
          fill
          className={`object-cover object-top transition-all duration-500 ${
            spotlit ? "scale-105 grayscale-0 brightness-100" : "grayscale-[70%] brightness-75"
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Dark muting overlay — lifts on hover */}
        <div
          className="absolute inset-0 bg-stone-950 transition-opacity duration-500"
          style={{ opacity: spotlit ? 0 : 0.35 }}
        />

        {/* Bottom gradient — always on for name legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

        {/* Name + owner badge — visible by default, hidden when panel is up */}
        <div
          className="absolute bottom-0 inset-x-0 px-3 pb-3 transition-opacity duration-200"
          style={{ opacity: panelVisible ? 0 : 1 }}
        >
          <p className="font-display text-sm font-light text-stone-200 leading-tight truncate">
            {instructor.name}
          </p>
          {instructor.owner && (
            <span className="font-body text-[9px] tracking-[0.2em] uppercase text-gold-400">
              Owner
            </span>
          )}
        </div>

        {/* ── Slide-up info panel ── */}
        <div
          className="absolute inset-x-0 bottom-0 bg-stone-950/96 backdrop-blur-sm px-3 pt-3 pb-4 flex flex-col gap-3"
          style={{
            transform: panelVisible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 340ms cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        >
          <p className="font-display text-sm font-light text-stone-100 leading-tight">
            {instructor.name}
          </p>

          {/* Certs — larger text, lighter color */}
          <ul className="space-y-1.5">
            {instructor.certs.map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs text-stone-200 leading-snug">
                <span className="w-1 h-1 rounded-full bg-sage-400 flex-shrink-0 mt-[5px]" />
                {c}
              </li>
            ))}
          </ul>

          {/* Schedule / bio link */}
          {instructor.arketaId ? (
            <button
              onClick={(e) => { e.stopPropagation(); onScheduleClick(); }}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-sage-600/60 text-sage-300 hover:bg-sage-700/30 hover:border-sage-400 transition-all duration-200 rounded-sm text-[10px] tracking-[0.18em] uppercase w-full"
            >
              {instructor.bio ? "Bio & Schedule" : "Schedule"} →
            </button>
          ) : (
            <Link
              href="/classes"
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-sage-600/60 text-sage-300 hover:bg-sage-700/30 hover:border-sage-400 transition-all duration-200 rounded-sm text-[10px] tracking-[0.18em] uppercase"
            >
              Schedule →
            </Link>
          )}
        </div>

        {/* Tilt shine */}
        {spotlit && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 + tilt.x * -3}%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function InstructorsGrid() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [lightboxInstructor, setLightboxInstructor] = useState<MergedInstructor | null>(null);
  const [merged, setMerged] = useState<MergedInstructor[]>(() => mergeWithArketa([]));
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const isTouch = useIsTouch();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    Promise.all([
      fetch("/api/instructors").then((r) => r.json()),
      fetch("/api/faculty").then((r) => r.json()),
    ])
      .then(([{ instructors: arketa }, { muted: mutedIds, deleted: deletedIds, added }]: [
        { instructors: ArketaInstructor[] },
        { muted: string[]; deleted: string[]; added: { arketa_id: string; name: string; certs: string; photo: string }[] }
      ]) => {
        setHidden(new Set([...(mutedIds ?? []), ...(deletedIds ?? [])]));
        const staticMerged = mergeWithArketa(arketa);
        const addedMerged: MergedInstructor[] = (added ?? []).map((a) => {
          const ark = arketa.find((ak) => ak.id === a.arketa_id);
          return {
            name: a.name,
            certs: a.certs ? a.certs.split(",").map((c) => c.trim()) : [],
            photo: ark?.photo || a.photo || "/instructors/placeholder.jpg",
            bio: ark?.bio || undefined,
            arketaId: a.arketa_id,
            owner: false,
          };
        });
        setMerged([...staticMerged, ...addedMerged]);
      })
      .catch(() => {/* keep local fallbacks */});
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
      <section className="relative pt-40 pb-6 px-6 md:px-12 bg-stone-950 overflow-hidden">
        <Image src="/hero-instructors.png" alt="" fill className="object-cover object-left-top" priority />
        <div className="absolute inset-0 bg-stone-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-stone-950/70" />
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
            {merged.filter((inst) => !hidden.has(inst.arketaId ?? inst.name)).length} certified teachers. Hundreds of combined training hours.
            One shared belief — that yoga belongs to everyone.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 md:px-12 bg-stone-950">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {merged.filter((inst) => !hidden.has(inst.arketaId ?? inst.name)).map((instructor, i) => (
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
          bio={lightboxInstructor.bio}
          certs={lightboxInstructor.certs}
          onClose={() => setLightboxInstructor(null)}
        />
      )}
    </>
  );
}
