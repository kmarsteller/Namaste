"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    name: "Grow",
    tagline: "Accessible, gentle, and grounding",
    accent: "text-sage-400",
    bar: "bg-sage-500/40",
    classes: [
      {
        name: "Chair / Adaptive Yoga",
        description:
          "Designed for those who wish to enjoy a full practice of yoga but have difficulty getting up and down from the floor. Students remain seated throughout, completing a comprehensive yoga session — ideal for those with joint replacements, mobility limitations, or anyone who needs additional support.",
      },
      {
        name: "Yin Yoga",
        description:
          "This gentle practice invites us to explore each pose more deeply, opening our bodies and minds to receive the benefits of breath and movement. Extended pose holds create a meditative, calming experience that works into the connective tissue and quiets the nervous system.",
      },
      {
        name: "Gentle Flow",
        description:
          "Experience the mind-body-breath connection while stretching the body in a way that builds strength, reduces stress, and promotes self-awareness. Recommended for beginners and anyone craving a softer, more intentional practice.",
      },
      {
        name: "Movement + Meditation",
        description:
          "A grounding practice using gentle yoga and guided meditation. Suited for newcomers and those beginning a meditation practice — a beautiful class for anyone looking to quiet mental clutter and come home to the present moment.",
      },
    ],
  },
  {
    name: "Slow",
    tagline: "Steady, breath-led, for all levels",
    accent: "text-gold-400",
    bar: "bg-gold-500/40",
    classes: [
      {
        name: "Slow Flow",
        description:
          "Students are guided through their yoga practice at a slow and steady pace, connecting breath and movement. A welcoming class appropriate for both new and seasoned practitioners who value intention over speed.",
      },
      {
        name: "Yinyasa Flow",
        description:
          "A thoughtful blend of slow flow with extended yin-style holds, giving you the best of both worlds. Accommodates various skill levels and offers a deeply satisfying practice from beginning to end.",
      },
      {
        name: "Slow Stretch",
        description:
          "Appropriate for all levels. This class uses breath and foundational yoga poses aimed at releasing tension and stress in the body while creating flexibility, strength, and mobility. Perfect for unwinding after a long day or week.",
      },
    ],
  },
  {
    name: "Flow",
    tagline: "Dynamic, creative, energizing",
    accent: "text-terra-400",
    bar: "bg-terra-500/40",
    classes: [
      {
        name: "All Level Flow",
        description:
          "A guided practice at a fluid pace with a focus on alignment. Features diverse postures with modifications offered throughout — inversions are included with alternatives always available. Some prior experience is recommended.",
      },
      {
        name: "All Level Vinyasa Flow",
        description:
          "A dynamic vinyasa practice that will keep you moving! Creative sequences, possible inversions with options, breathwork, and a closing savasana. Come ready to explore and have fun on your mat.",
      },
      {
        name: "Challenge Flow",
        description:
          "Combining asana and breath to encourage students to deepen their practice. Designed for experienced practitioners who are comfortable with arm balances and inversions — though alternatives are always provided. Push your edges in a safe, supportive space.",
      },
      {
        name: "Yoga / Barre Fusion",
        description:
          "Elements of yoga combined with barre, pilates, strength, and mobility training — and more! Suitable for all levels. The studio provides all necessary equipment. A fun, full-body class unlike anything else on the schedule.",
      },
    ],
  },
];

// ── Grow: vine that draws itself in ──────────────────────────────────────────
function VineDecor({ visible }: { visible: boolean }) {
  const t = (delay: number): React.CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: visible ? 0 : 1,
    transition: `stroke-dashoffset 2.4s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  return (
    <svg
      viewBox="0 0 210 52"
      width="210"
      height="52"
      fill="none"
      className="absolute top-1/2 -translate-y-1/2 pointer-events-none select-none"
      style={{ zIndex: 0, left: "78px" }}
      aria-hidden
    >
      {/* Main stem */}
      <path
        d="M8 26 C35 20, 55 8, 85 16 C115 24, 138 6, 168 12 C182 14, 196 8, 210 4"
        stroke="#a8d870"
        strokeWidth="1.4"
        strokeLinecap="round"
        pathLength={1}
        style={t(0.1)}
      />
      {/* Leaf 1 */}
      <path
        d="M58 12 C53 2, 70 -2, 72 11 C65 15, 58 12 58 12Z"
        stroke="#a8d870"
        strokeWidth="1"
        fill="#a8d87018"
        pathLength={1}
        style={t(0.8)}
      />
      {/* Leaf 2 */}
      <path
        d="M130 8 C125 -2, 142 -5, 144 8 C137 13, 130 8 130 8Z"
        stroke="#a8d870"
        strokeWidth="1"
        fill="#a8d87018"
        pathLength={1}
        style={t(1.3)}
      />
      {/* Tendril 1 */}
      <path
        d="M78 17 C83 5, 94 4, 89 16"
        stroke="#a8d870"
        strokeWidth="0.9"
        strokeLinecap="round"
        pathLength={1}
        style={t(1.0)}
      />
      {/* Tendril 2 */}
      <path
        d="M155 10 C160 -1, 170 0, 164 11"
        stroke="#a8d870"
        strokeWidth="0.9"
        strokeLinecap="round"
        pathLength={1}
        style={t(1.6)}
      />
      {/* Small bud */}
      <circle
        cx="210"
        cy="4"
        r="2.5"
        stroke="#a8d870"
        strokeWidth="1"
        fill="#a8d87028"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease 2.4s",
        }}
      />
    </svg>
  );
}

// ── Slow: turtle walking out from behind the word ─────────────────────────────
function TurtleDecor({ visible }: { visible: boolean }) {
  return (
    <>
      <style>{`
        @keyframes turtle-emerge {
          0%   { transform: translateX(-70px); opacity: 0; }
          8%   { opacity: 1; }
          65%  { transform: translateX(55px);  opacity: 1; }
          80%  { transform: translateX(60px);  opacity: 0; }
          81%, 100% { transform: translateX(-70px); opacity: 0; }
        }
        @keyframes turtle-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-2px); }
        }
      `}</style>
      <div
        className="absolute pointer-events-none select-none"
        style={{ zIndex: 0, left: "160px", top: "4px" }}
        aria-hidden
      >
        <div
          style={{
            animation: visible ? "turtle-emerge 10s ease-in-out 0.6s infinite" : "none",
            opacity: 0,
          }}
        >
          <svg
            viewBox="0 0 56 40"
            width="56"
            height="40"
            fill="none"
            style={{ animation: visible ? "turtle-bob 1.1s ease-in-out infinite" : "none" }}
          >
            {/* Shell body */}
            <ellipse cx="26" cy="22" rx="17" ry="12" fill="#b8963e18" stroke="#b8963e" strokeWidth="1.3" />
            {/* Shell dome lines */}
            <path d="M14 22 C18 13, 26 10, 34 13" stroke="#b8963e" strokeWidth="0.8" strokeLinecap="round" fill="none" />
            <path d="M11 26 C15 31, 26 33, 37 30" stroke="#b8963e" strokeWidth="0.8" strokeLinecap="round" fill="none" />
            <path d="M26 10 L26 33" stroke="#b8963e" strokeWidth="0.7" strokeLinecap="round" />
            <path d="M17 12 L15 31" stroke="#b8963e" strokeWidth="0.6" strokeLinecap="round" />
            <path d="M35 12 L37 31" stroke="#b8963e" strokeWidth="0.6" strokeLinecap="round" />
            {/* Head */}
            <ellipse cx="44" cy="21" rx="6.5" ry="5.5" fill="#b8963e18" stroke="#b8963e" strokeWidth="1.2" />
            {/* Eye */}
            <circle cx="46.5" cy="19" r="1.3" fill="#b8963e" />
            {/* Front legs */}
            <path d="M32 31 L36 39" stroke="#b8963e" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M20 32 L16 39" stroke="#b8963e" strokeWidth="1.2" strokeLinecap="round" />
            {/* Back legs */}
            <path d="M38 29 L43 37" stroke="#b8963e" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M14 28 L9 36" stroke="#b8963e" strokeWidth="1.2" strokeLinecap="round" />
            {/* Tail */}
            <path d="M9 23 L3 25" stroke="#b8963e" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </>
  );
}

// ── Flow: wave that crests and crashes ───────────────────────────────────────
function WaveDecor({ visible }: { visible: boolean }) {
  return (
    <>
      <style>{`
        /* Background swell — rolls in slowly and continuously */
        @keyframes wave-swell {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* Foreground crest — builds, peaks, then crashes hard */
        @keyframes wave-crest {
          0%   { transform: translateX(0px)   scaleY(0.6); opacity: 0.5; }
          30%  { transform: translateX(-40px) scaleY(1.6); opacity: 0.85; }
          48%  { transform: translateX(-65px) scaleY(2.6); opacity: 1; }
          58%  { transform: translateX(-80px) scaleY(0.25); opacity: 0.25; }
          72%  { transform: translateX(-105px) scaleY(0.9); opacity: 0.55; }
          100% { transform: translateX(-145px) scaleY(0.6); opacity: 0.5; }
        }
        /* Foam burst right after crash */
        @keyframes wave-foam {
          0%, 46%  { opacity: 0;   transform: scaleX(0.1); }
          58%      { opacity: 0.6; transform: scaleX(1);   }
          78%      { opacity: 0;   transform: scaleX(1.4); }
          100%     { opacity: 0;   transform: scaleX(1.4); }
        }
      `}</style>

      <div
        className="absolute pointer-events-none select-none overflow-hidden"
        style={{ top: "4px", left: "72px", width: "320px", height: "40px", zIndex: 0 }}
        aria-hidden
      >
        {/* Background swell — steady rolling base */}
        <div
          style={{
            position: "absolute", bottom: 0, width: "200%",
            opacity: visible ? 0.4 : 0,
            transition: "opacity 1s ease 0.3s",
            animation: visible ? "wave-swell 4s linear infinite" : "none",
          }}
        >
          <svg viewBox="0 0 640 40" width="640" height="40" fill="none">
            <path
              d="M0 28 C27 14, 53 38, 80 28 C107 14, 133 38, 160 28 C187 14, 213 38, 240 28 C267 14, 293 38, 320 28 C347 14, 373 38, 400 28 C427 14, 453 38, 480 28 C507 14, 533 38, 560 28 C587 14, 613 38, 640 28"
              stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Foreground crest — builds and crashes */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0,
            width: "180px", height: "40px",
            transformOrigin: "left bottom",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
            animation: visible ? "wave-crest 4s ease-in-out 0.8s infinite" : "none",
          }}
        >
          <svg viewBox="0 0 180 40" width="180" height="40" fill="none">
            <path
              d="M0 38 C30 20, 70 8, 100 16 C125 22, 145 34, 180 38"
              stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"
              fill="#3b82f610"
            />
            {/* Crest curl at the top */}
            <path
              d="M85 18 C92 10, 104 12, 100 20"
              stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" fill="none"
            />
          </svg>
        </div>

        {/* Foam — brief horizontal burst right after crash */}
        <div
          style={{
            position: "absolute", bottom: "4px", left: "60px",
            width: "80px", height: "8px",
            transformOrigin: "left center",
            animation: visible ? "wave-foam 4s ease-out 0.8s infinite" : "none",
          }}
        >
          <svg viewBox="0 0 80 8" width="80" height="8" fill="none">
            <path
              d="M0 4 C15 1, 35 7, 55 3 C65 1, 72 5, 80 4"
              stroke="#bfdbfe" strokeWidth="1" strokeLinecap="round" opacity="0.7"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

// ── Section header with animation ─────────────────────────────────────────────
function SectionHeader({
  name,
  tagline,
  accent,
  bar,
}: {
  name: string;
  tagline: string;
  accent: string;
  bar: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-5 mb-10">
      <div className={`w-12 h-0.5 ${bar} flex-shrink-0 relative z-10`} />

      {/* Text + animation container */}
      <div className="relative overflow-visible">
        {/* Animation behind the text */}
        {name === "Grow" && <VineDecor visible={visible} />}
        {name === "Slow" && <TurtleDecor visible={visible} />}
        {name === "Flow" && <WaveDecor visible={visible} />}

        {/* Text in front */}
        <h2 className={`font-display text-4xl font-light ${accent} relative z-10`}>
          {name}
        </h2>
        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-600 mt-0.5 relative z-10">
          {tagline}
        </p>
      </div>
    </div>
  );
}

// ── Animated class card ────────────────────────────────────────────────────────
function ClassCard({
  name,
  description,
  index,
}: {
  name: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`border-t border-stone-800/60 py-7 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <h3 className="font-display text-xl font-light text-stone-100 mb-3">{name}</h3>
      <p className="font-body text-sm text-stone-400 leading-relaxed max-w-2xl">{description}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ClassDescriptionsContent() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Page hero ── */}
      <section className="relative pt-40 pb-16 px-6 md:px-12 bg-stone-950 overflow-hidden">
        <Image src="/hero-img5906.jpg" alt="" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40" />
        <div
          className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-sage-500/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-400/70">
              Find Your Practice
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-8">
            Class Descriptions
          </h1>
          <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-xl">
            Our classes are grouped into three families — Grow, Slow, and Flow.
            Whether you&apos;re stepping onto a mat for the very first time or
            deepening a long-standing practice, there&apos;s a class here for you.
          </p>
        </div>
      </section>

      {/* ── Sections ── */}
      {SECTIONS.map((section) => (
        <section key={section.name} className="bg-stone-950 px-6 md:px-12 py-14">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              name={section.name}
              tagline={section.tagline}
              accent={section.accent}
              bar={section.bar}
            />
            <div>
              {section.classes.map((cls, i) => (
                <ClassCard
                  key={cls.name}
                  name={cls.name}
                  description={cls.description}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="bg-stone-950 px-6 py-16 text-center border-t border-stone-800/40">
        <p className="font-body text-stone-500 text-xs tracking-[0.15em] uppercase mb-2">
          Ready to begin?
        </p>
        <p className="font-display text-2xl font-light text-stone-300 mb-6">
          Your first in-studio class is free.
        </p>
        <Link
          href="/classes"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-sage-500 hover:bg-sage-400 text-stone-950 font-body font-medium text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300"
        >
          View the Schedule
        </Link>
      </section>
    </>
  );
}
