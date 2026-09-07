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
          "This class is designed for those who wish to enjoy a full practice of yoga, but have difficulty getting up and down from the floor. Students will enjoy a complete yoga practice while remaining seated. Perfect for those with knee or hip replacements, those with limited mobility due to injury, or seniors needing more support.",
      },
      {
        name: "Yin Yoga",
        description:
          "This gentle practice invites us to explore each pose more deeply, opening our bodies and minds to receive the benefits of the breath and movement. Because we are relaxing in postures for longer periods of time, this practice is very meditative and calming.",
      },
      {
        name: "Gentle Flow",
        description:
          "Experience the mind-body-breath connection while stretching the body in a way that builds strength, reduces stress, and promotes self-awareness. A perfect fit for beginners.",
      },
      {
        name: "Movement + Meditation",
        description:
          "This class offers a grounding practice using gentle yoga and a guided meditation. Perfect for new yogis and those wanting to begin a meditation practice and intercept a busy mind.",
      },
      {
        name: "Yoga Nidra / Restorative Yoga",
        description:
          "This class is soft and unhurried, promoting deep relaxation and healing through a series of gentle yoga poses before settling into a guided Yoga Nidra style of meditation.",
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
          "Students are guided through their yoga practice at a slow and steady pace, connecting breath and movement. A great practice for new and experienced practitioners looking to flow, stretch and unwind.",
      },
      {
        name: "Yinyasa Flow",
        description:
          "A slow flow paired with some longer yin-style holds and you have a class to suit everyBODY. The perfect way to push the reset button in the middle or end of the workday.",
      },
      {
        name: "Slow Stretch",
        description:
          "It is important to stretch our bodies regularly, either as a stand-alone practice or as a compliment to a regular fitness routine. It is appropriate for all levels. The class uses breath and basic yoga poses aimed at releasing tension and stress in the body while creating flexibility, strength, and mobility.",
      },
      {
        name: "Gentle Strength",
        description:
          "Gentle Strength uses basic, familiar postures incorporating light weight dumbbells and ankle weights to increase strength and balance in all major muscle groups and the core.",
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
          "A guided practice at a fluid pace, with a focus on alignment. The class includes a wide variety of postures with modifications offered to accommodate all practitioners. Inversions may be included, with options offered. Some yoga experience is recommended.",
      },
      {
        name: "All Level Vinyasa Flow",
        description:
          "This all level, dynamic vinyasa practice will keep you moving! Students can expect creative sequences, as well as breathwork, and of course, savasana to close the practice.",
      },
      {
        name: "Challenge Flow",
        description:
          "This class combines asana and breath to encourage students to deepen their practice. Students should be comfortable and familiar with shapes of poses and open to arm balances and inversions. Options will always be given. This class is for experienced yogis.",
      },
      {
        name: "Yoga / Barre Fusion",
        description:
          "This class offers elements of yoga combined with barre, pilates, strength and mobility training and more! This is for all level of student. All equipment for the class is provided at the studio.",
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

// ── Slow: cartoon turtle with animated legs ───────────────────────────────────
function TurtleDecor({ visible }: { visible: boolean }) {
  const c = "#7aab6e";
  const cl = "#a8c8a0";
  const cd = "#4d7a44";
  const sk = "#c8a86e";
  return (
    <>
      <style>{`
        @keyframes t-walk {
          0%    { transform: translateX(-90px); opacity: 0; }
          5%    { opacity: 1; }
          78%   { transform: translateX(310px); opacity: 1; }
          82%   { transform: translateX(340px); opacity: 0; }
          82.01%, 100% { transform: translateX(-90px); opacity: 0; }
        }
        @keyframes t-bob {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-1.5px); }
        }
        @keyframes t-fl { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(14deg)} }
        @keyframes t-fr { 0%,100%{transform:rotate(14deg)}  50%{transform:rotate(-18deg)} }
        @keyframes t-bl { 0%,100%{transform:rotate(14deg)}  50%{transform:rotate(-14deg)} }
        @keyframes t-br { 0%,100%{transform:rotate(-14deg)} 50%{transform:rotate(14deg)} }
      `}</style>
      <div className="absolute pointer-events-none select-none"
        style={{ zIndex: 0, left: "160px", top: "2px" }} aria-hidden>
        <div style={{ animation: visible ? "t-walk 24s linear 0.8s infinite" : "none", opacity: 0 }}>
          <svg viewBox="0 0 80 52" width="80" height="52" fill="none"
            style={{ animation: visible ? "t-bob 2.5s ease-in-out infinite" : "none" }}>
            <g style={{ transformOrigin: "18px 32px", animation: visible ? "t-br 1.8s ease-in-out infinite" : "none" }}>
              <path d="M18 32 C14 36, 10 40, 8 45" stroke={sk} strokeWidth="3.5" strokeLinecap="round"/>
              <ellipse cx="7" cy="46.5" rx="4" ry="2.2" fill={sk} transform="rotate(-20,7,46.5)"/>
            </g>
            <g style={{ transformOrigin: "30px 33px", animation: visible ? "t-bl 1.8s ease-in-out infinite" : "none" }}>
              <path d="M30 33 C28 38, 26 42, 24 47" stroke={sk} strokeWidth="3.5" strokeLinecap="round"/>
              <ellipse cx="23" cy="48.5" rx="4" ry="2.2" fill={sk} transform="rotate(-10,23,48.5)"/>
            </g>
            <g style={{ transformOrigin: "50px 33px", animation: visible ? "t-fr 1.8s ease-in-out infinite" : "none" }}>
              <path d="M50 33 C52 38, 54 42, 56 47" stroke={sk} strokeWidth="3.5" strokeLinecap="round"/>
              <ellipse cx="57" cy="48.5" rx="4" ry="2.2" fill={sk} transform="rotate(10,57,48.5)"/>
            </g>
            <g style={{ transformOrigin: "62px 32px", animation: visible ? "t-fl 1.8s ease-in-out infinite" : "none" }}>
              <path d="M62 32 C66 36, 70 40, 72 45" stroke={sk} strokeWidth="3.5" strokeLinecap="round"/>
              <ellipse cx="73" cy="46.5" rx="4" ry="2.2" fill={sk} transform="rotate(20,73,46.5)"/>
            </g>
            <ellipse cx="38" cy="30" rx="24" ry="16" fill={sk}/>
            <ellipse cx="38" cy="27" rx="21" ry="14" fill={c} stroke={cd} strokeWidth="1.2"/>
            <ellipse cx="40" cy="23" rx="11" ry="6" fill={cl} opacity="0.5"/>
            <path d="M38 14 L38 40" stroke={cd} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M26 16 C29 20, 29 34, 26 38" stroke={cd} strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
            <path d="M50 16 C47 20, 47 34, 50 38" stroke={cd} strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
            <path d="M20 26 L56 26" stroke={cd} strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
            <path d="M18 22 C24 20, 32 19, 38 19" stroke={cd} strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
            <path d="M18 30 C24 32, 32 33, 38 33" stroke={cd} strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
            <path d="M58 22 C52 20, 44 19, 38 19" stroke={cd} strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
            <path d="M58 30 C52 32, 44 33, 38 33" stroke={cd} strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
            <path d="M62 26 C66 24, 70 22, 72 20" stroke={sk} strokeWidth="5" strokeLinecap="round"/>
            <ellipse cx="74" cy="18" rx="6.5" ry="5.5" fill={sk} stroke={cd} strokeWidth="0.8"/>
            <circle cx="76" cy="16" r="1.5" fill={cd}/>
            <circle cx="76.5" cy="15.5" r="0.5" fill="white" opacity="0.7"/>
            <circle cx="77.5" cy="18.5" r="0.6" fill={cd} opacity="0.6"/>
            <path d="M77 20 C75.5 21.5, 73 21.5, 71.5 20" stroke={cd} strokeWidth="0.7" strokeLinecap="round" fill="none"/>
            <path d="M15 30 C10 30, 6 28, 4 26" stroke={sk} strokeWidth="3" strokeLinecap="round"/>
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
