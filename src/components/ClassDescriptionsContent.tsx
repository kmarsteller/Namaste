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
    accent: "text-blue-400",
    bar: "bg-blue-500/40",
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

// ── Grow: vine that keeps growing across the page ────────────────────────────
// Vine: M8,40 C35,34 55,22 85,30 C115,38 138,20 168,26 C182,28 196,22 220,18 C245,14 268,30 295,24 C315,20 338,16 365,22
// Leaves placed at segment endpoints and computed midpoints (t=0.5):
//   seg1 mid ≈ (45,30)  seg1 end = (85,30)
//   seg2 mid ≈ (127,29) seg2 end = (168,26)
//   seg3 end = (220,18)
//   seg4 mid ≈ (257,22) seg4 end = (295,24)
function VineDecor({ visible }: { visible: boolean }) {
  return (
    <>
      <style>{`
        @keyframes vine-stem {
          0%    { stroke-dashoffset: 1; opacity: 0; }
          4%    { opacity: 0.85; }
          57%   { stroke-dashoffset: 0; opacity: 0.85; }
          80%   { stroke-dashoffset: 0; opacity: 0.85; }
          92%   { stroke-dashoffset: 0; opacity: 0; }
          100%  { stroke-dashoffset: 1; opacity: 0; }
        }
        @keyframes vine-e1 { 0%,10%{opacity:0;stroke-dashoffset:1} 16%{opacity:0.75;stroke-dashoffset:0} 80%{opacity:0.75;stroke-dashoffset:0} 92%{opacity:0} 100%{opacity:0;stroke-dashoffset:1} }
        @keyframes vine-e2 { 0%,18%{opacity:0;stroke-dashoffset:1} 24%{opacity:0.75;stroke-dashoffset:0} 80%{opacity:0.75;stroke-dashoffset:0} 92%{opacity:0} 100%{opacity:0;stroke-dashoffset:1} }
        @keyframes vine-e3 { 0%,26%{opacity:0;stroke-dashoffset:1} 32%{opacity:0.75;stroke-dashoffset:0} 80%{opacity:0.75;stroke-dashoffset:0} 92%{opacity:0} 100%{opacity:0;stroke-dashoffset:1} }
        @keyframes vine-e4 { 0%,34%{opacity:0;stroke-dashoffset:1} 40%{opacity:0.75;stroke-dashoffset:0} 80%{opacity:0.75;stroke-dashoffset:0} 92%{opacity:0} 100%{opacity:0;stroke-dashoffset:1} }
        @keyframes vine-e5 { 0%,42%{opacity:0;stroke-dashoffset:1} 48%{opacity:0.75;stroke-dashoffset:0} 80%{opacity:0.75;stroke-dashoffset:0} 92%{opacity:0} 100%{opacity:0;stroke-dashoffset:1} }
        @keyframes vine-e6 { 0%,49%{opacity:0;stroke-dashoffset:1} 55%{opacity:0.75;stroke-dashoffset:0} 80%{opacity:0.75;stroke-dashoffset:0} 92%{opacity:0} 100%{opacity:0;stroke-dashoffset:1} }
        @keyframes vine-bud { 0%,57%{opacity:0} 63%,80%{opacity:0.9} 92%,100%{opacity:0} }
      `}</style>
      <svg
        viewBox="0 0 370 56"
        width="370"
        height="56"
        fill="none"
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ zIndex: 0, left: "78px" }}
        aria-hidden
      >
        {/* Main vine stem */}
        <path
          d="M8 40 C35 34, 55 22, 85 30 C115 38, 138 20, 168 26 C182 28, 196 22, 220 18 C245 14, 268 30, 295 24 C315 20, 338 16, 365 22"
          stroke="#a8d870" strokeWidth="1.4" strokeLinecap="round"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-stem 14s ease-in-out 0.3s infinite" : "none" }}
        />

        {/* Leaf 1 — seg1 mid ≈(45,30), growing upward */}
        <path d="M45,30 L45,23" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e1 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M45,23 C41,20 41,14 45,12 C49,14 49,20 45,23 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e1 14s ease-in-out 0.3s infinite" : "none" }} />

        {/* Leaf 2 — seg1 end (85,30), growing downward-right */}
        <path d="M85,30 L90,37" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e2 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M90,37 C86,40 86,46 90,49 C94,46 94,40 90,37 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e2 14s ease-in-out 0.3s infinite" : "none" }} />

        {/* Leaf 3 — seg2 mid ≈(127,29), growing upward */}
        <path d="M127,29 L127,22" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e3 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M127,22 C123,19 123,13 127,11 C131,13 131,19 127,22 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e3 14s ease-in-out 0.3s infinite" : "none" }} />

        {/* Leaf 4 — seg2 end (168,26), growing downward-left */}
        <path d="M168,26 L163,33" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e4 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M163,33 C158,36 158,42 163,45 C167,42 167,36 163,33 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e4 14s ease-in-out 0.3s infinite" : "none" }} />

        {/* Leaf 5 — seg3 end (220,18), growing upward */}
        <path d="M220,18 L220,11" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e5 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M220,11 C216,8 216,2 220,0 C224,2 224,8 220,11 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e5 14s ease-in-out 0.3s infinite" : "none" }} />

        {/* Leaf 6 — seg4 end (295,24), growing upward-right */}
        <path d="M295,24 L299,17" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e6 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M299,17 C295,13 296,8 300,6 C304,8 303,14 299,17 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e6 14s ease-in-out 0.3s infinite" : "none" }} />

        {/* Bud at vine tip */}
        <circle cx="365" cy="22" r="2.5" stroke="#a8d870" strokeWidth="1" fill="#a8d87028"
          style={{ opacity: 0, animation: visible ? "vine-bud 14s ease-in-out 0.3s infinite" : "none" }} />
      </svg>
    </>
  );
}

// ── Slow: turtle walking slowly with footprints ───────────────────────────────
function TurtleDecor({ visible }: { visible: boolean }) {
  const fps = [
    { x: 20,  anim: "fp1", flip: false },
    { x: 68,  anim: "fp2", flip: true  },
    { x: 116, anim: "fp3", flip: false },
    { x: 164, anim: "fp4", flip: true  },
    { x: 212, anim: "fp5", flip: false },
  ];
  return (
    <>
      <style>{`
        @keyframes turtle-walk {
          0%    { transform: translateX(-80px); opacity: 0; }
          6%    { opacity: 0.9; }
          82%   { transform: translateX(270px); opacity: 0.9; }
          88%   { opacity: 0; }
          89%, 100% { transform: translateX(-80px); opacity: 0; }
        }
        @keyframes turtle-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-2px); }
        }
        @keyframes fp1 { 0%,24%{opacity:0} 28%,82%{opacity:0.5} 88%,100%{opacity:0} }
        @keyframes fp2 { 0%,36%{opacity:0} 40%,82%{opacity:0.5} 88%,100%{opacity:0} }
        @keyframes fp3 { 0%,48%{opacity:0} 52%,82%{opacity:0.5} 88%,100%{opacity:0} }
        @keyframes fp4 { 0%,60%{opacity:0} 64%,82%{opacity:0.5} 88%,100%{opacity:0} }
        @keyframes fp5 { 0%,71%{opacity:0} 75%,82%{opacity:0.5} 88%,100%{opacity:0} }
      `}</style>
      <div
        className="absolute pointer-events-none select-none"
        style={{ zIndex: 0, left: "160px", top: "4px" }}
        aria-hidden
      >
        {fps.map(({ x, anim, flip }) => (
          <div key={x} style={{
            position: "absolute", left: x, top: "26px", opacity: 0,
            transform: flip ? "scaleX(-1)" : "none",
            animation: visible ? `${anim} 22s linear 0.6s infinite` : "none",
          }}>
            <svg viewBox="0 0 14 12" width="14" height="12" fill="none">
              <ellipse cx="3.5" cy="3.5" rx="2" ry="2.8" fill="#b8963e45" />
              <ellipse cx="10.5" cy="9"   rx="2" ry="2.8" fill="#b8963e35" />
            </svg>
          </div>
        ))}
        <div
          style={{
            animation: visible ? "turtle-walk 22s linear 0.6s infinite" : "none",
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
            <ellipse cx="26" cy="22" rx="17" ry="12" fill="#b8963e18" stroke="#b8963e" strokeWidth="1.3" />
            <path d="M14 22 C18 13, 26 10, 34 13" stroke="#b8963e" strokeWidth="0.8" strokeLinecap="round" fill="none" />
            <path d="M11 26 C15 31, 26 33, 37 30" stroke="#b8963e" strokeWidth="0.8" strokeLinecap="round" fill="none" />
            <path d="M26 10 L26 33" stroke="#b8963e" strokeWidth="0.7" strokeLinecap="round" />
            <path d="M17 12 L15 31" stroke="#b8963e" strokeWidth="0.6" strokeLinecap="round" />
            <path d="M35 12 L37 31" stroke="#b8963e" strokeWidth="0.6" strokeLinecap="round" />
            <ellipse cx="44" cy="21" rx="6.5" ry="5.5" fill="#b8963e18" stroke="#b8963e" strokeWidth="1.2" />
            <circle cx="46.5" cy="19" r="1.3" fill="#b8963e" />
            <path d="M32 31 L36 39" stroke="#b8963e" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M20 32 L16 39" stroke="#b8963e" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M38 29 L43 37" stroke="#b8963e" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M14 28 L9 36" stroke="#b8963e" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M9 23 L3 25" stroke="#b8963e" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </>
  );
}

// ── Flow: flowing water lines ─────────────────────────────────────────────────
function WaveDecor({ visible }: { visible: boolean }) {
  return (
    <>
      <style>{`
        @keyframes wave-swell {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="absolute pointer-events-none select-none overflow-hidden"
        style={{ top: "-4px", left: "60px", width: "340px", height: "40px", zIndex: 0 }}
        aria-hidden
      >
        <div style={{
          position: "absolute", bottom: 0, width: "200%",
          opacity: visible ? 0.45 : 0,
          transition: "opacity 1s ease 0.3s",
          animation: visible ? "wave-swell 4s linear infinite" : "none",
        }}>
          <svg viewBox="0 0 680 40" width="680" height="40" fill="none">
            <path
              d="M0 28 C28 14, 56 38, 84 28 C112 14, 140 38, 168 28 C196 14, 224 38, 252 28 C280 14, 308 38, 336 28 C364 14, 392 38, 420 28 C448 14, 476 38, 504 28 C532 14, 560 38, 588 28 C616 14, 652 38, 680 28"
              stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"
            />
            <path
              d="M0 34 C28 24, 56 40, 84 34 C112 24, 140 40, 168 34 C196 24, 224 40, 252 34 C280 24, 308 40, 336 34 C364 24, 392 40, 420 34 C448 24, 476 40, 504 34 C532 24, 560 40, 588 34 C616 24, 652 40, 680 34"
              stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" opacity="0.5"
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
        <Image src="/hero-classes.jpg" alt="" fill className="object-cover object-center" priority />
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
        <section key={section.name} id={section.name.toLowerCase()} className="bg-stone-950 px-6 md:px-12 py-14 scroll-mt-20">
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
            <div className="mt-8 pt-6 border-t border-stone-800/40">
              <Link
                href={`/classes?family=${section.name.toLowerCase()}`}
                className={`inline-flex items-center gap-2 font-body text-xs tracking-[0.18em] uppercase pb-0.5 border-b transition-colors ${
                  section.name === "Grow"
                    ? "text-sage-400 hover:text-sage-200 border-sage-700/50 hover:border-sage-400"
                    : section.name === "Slow"
                    ? "text-gold-400 hover:text-gold-200 border-gold-700/50 hover:border-gold-400"
                    : "text-blue-400 hover:text-blue-200 border-blue-700/50 hover:border-blue-400"
                }`}
              >
                {`Find ${section.name} Classes`} &rarr;
              </Link>
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
