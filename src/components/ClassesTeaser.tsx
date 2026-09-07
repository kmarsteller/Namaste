"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const tiers = [
  {
    name: "Grow",
    subtitle: "Begin with ease",
    description:
      "Chair & adaptive, Yin, Gentle Flow, and Movement + Meditation. Welcoming all bodies, all abilities.",
    classes: ["Chair / Adaptive", "Yin Yoga", "Gentle Flow", "Movement + Meditation"],
    href: "/class-descriptions#grow",
    accent: "text-sage-300",
    bar: "bg-sage-500/60",
    linkClass: "text-sage-400 hover:text-sage-200 border-sage-700/50 hover:border-sage-400",
  },
  {
    name: "Slow",
    subtitle: "Find your rhythm",
    description:
      "Slow Flow, Yinyasa Flow, and Slow Stretch. Breath-led, steady-paced practices for building depth.",
    classes: ["Slow Flow", "Yinyasa Flow", "Slow Stretch"],
    href: "/class-descriptions#slow",
    accent: "text-gold-300",
    bar: "bg-gold-500/60",
    linkClass: "text-gold-400 hover:text-gold-200 border-gold-700/50 hover:border-gold-400",
  },
  {
    name: "Flow",
    subtitle: "Move with fire",
    description:
      "All Level Vinyasa, Challenge Flow, and Yoga/Barre Fusion. Dynamic sequences for those ready to go deeper.",
    classes: ["All Level Flow", "All Level Vinyasa", "Challenge Flow", "Yoga / Barre Fusion"],
    href: "/class-descriptions#flow",
    accent: "text-blue-300",
    bar: "bg-blue-500/60",
    linkClass: "text-blue-400 hover:text-blue-200 border-blue-700/50 hover:border-blue-400",
  },
];

function useInView(threshold = 0.2) {
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

// ── Vine (Grow) ───────────────────────────────────────────────────────────────
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
      <svg viewBox="0 0 370 56" width="370" height="56" fill="none"
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ zIndex: 0, left: "78px" }} aria-hidden>
        <path d="M8 40 C35 34, 55 22, 85 30 C115 38, 138 20, 168 26 C182 28, 196 22, 220 18 C245 14, 268 30, 295 24 C315 20, 338 16, 365 22"
          stroke="#a8d870" strokeWidth="1.4" strokeLinecap="round"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-stem 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M45,30 L45,23" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e1 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M45,23 C41,20 41,14 45,12 C49,14 49,20 45,23 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e1 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M85,30 L90,37" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e2 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M90,37 C86,40 86,46 90,49 C94,46 94,40 90,37 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e2 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M127,29 L127,22" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e3 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M127,22 C123,19 123,13 127,11 C131,13 131,19 127,22 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e3 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M168,26 L163,33" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e4 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M163,33 C158,36 158,42 163,45 C167,42 167,36 163,33 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e4 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M220,18 L220,11" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e5 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M220,11 C216,8 216,2 220,0 C224,2 224,8 220,11 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e5 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M295,24 L299,17" stroke="#a8d870" strokeWidth="0.9" strokeLinecap="round"
          style={{ opacity: 0, animation: visible ? "vine-e6 14s ease-in-out 0.3s infinite" : "none" }} />
        <path d="M299,17 C295,13 296,8 300,6 C304,8 303,14 299,17 Z"
          stroke="#a8d870" strokeWidth="1" fill="#a8d87020"
          pathLength={1} strokeDasharray={1}
          style={{ opacity: 0, animation: visible ? "vine-e6 14s ease-in-out 0.3s infinite" : "none" }} />
        <circle cx="365" cy="22" r="2.5" stroke="#a8d870" strokeWidth="1" fill="#a8d87028"
          style={{ opacity: 0, animation: visible ? "vine-bud 14s ease-in-out 0.3s infinite" : "none" }} />
      </svg>
    </>
  );
}

// ── Turtle (Slow) ─────────────────────────────────────────────────────────────
function TurtleDecor({ visible }: { visible: boolean }) {
  const c = "#7aab6e"; // shell green
  const cl = "#a8c8a0"; // light green
  const cd = "#4d7a44"; // dark green
  const sk = "#c8a86e"; // skin/head tan
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
        style={{ zIndex: 0, left: "110px", top: "2px" }} aria-hidden>
        <div style={{ animation: visible ? "t-walk 24s linear 0.8s infinite" : "none", opacity: 0 }}>
          <svg viewBox="0 0 80 52" width="80" height="52" fill="none"
            style={{ animation: visible ? "t-bob 2.5s ease-in-out infinite" : "none" }}>

            {/* Back-left leg (now on right side, facing right) */}
            <g style={{ transformOrigin: "18px 32px", animation: visible ? "t-br 1.8s ease-in-out infinite" : "none" }}>
              <path d="M18 32 C14 36, 10 40, 8 45" stroke={sk} strokeWidth="3.5" strokeLinecap="round"/>
              <ellipse cx="7" cy="46.5" rx="4" ry="2.2" fill={sk} transform="rotate(-20,7,46.5)"/>
            </g>
            {/* Back-right leg */}
            <g style={{ transformOrigin: "30px 33px", animation: visible ? "t-bl 1.8s ease-in-out infinite" : "none" }}>
              <path d="M30 33 C28 38, 26 42, 24 47" stroke={sk} strokeWidth="3.5" strokeLinecap="round"/>
              <ellipse cx="23" cy="48.5" rx="4" ry="2.2" fill={sk} transform="rotate(-10,23,48.5)"/>
            </g>
            {/* Front-left leg */}
            <g style={{ transformOrigin: "50px 33px", animation: visible ? "t-fr 1.8s ease-in-out infinite" : "none" }}>
              <path d="M50 33 C52 38, 54 42, 56 47" stroke={sk} strokeWidth="3.5" strokeLinecap="round"/>
              <ellipse cx="57" cy="48.5" rx="4" ry="2.2" fill={sk} transform="rotate(10,57,48.5)"/>
            </g>
            {/* Front-right leg */}
            <g style={{ transformOrigin: "62px 32px", animation: visible ? "t-fl 1.8s ease-in-out infinite" : "none" }}>
              <path d="M62 32 C66 36, 70 40, 72 45" stroke={sk} strokeWidth="3.5" strokeLinecap="round"/>
              <ellipse cx="73" cy="46.5" rx="4" ry="2.2" fill={sk} transform="rotate(20,73,46.5)"/>
            </g>

            {/* Body */}
            <ellipse cx="38" cy="30" rx="24" ry="16" fill={sk}/>

            {/* Shell */}
            <ellipse cx="38" cy="27" rx="21" ry="14" fill={c} stroke={cd} strokeWidth="1.2"/>
            {/* Shell dome highlight */}
            <ellipse cx="40" cy="23" rx="11" ry="6" fill={cl} opacity="0.5"/>
            {/* Shell scutes */}
            <path d="M38 14 L38 40" stroke={cd} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M26 16 C29 20, 29 34, 26 38" stroke={cd} strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
            <path d="M50 16 C47 20, 47 34, 50 38" stroke={cd} strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
            <path d="M20 26 L56 26" stroke={cd} strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
            <path d="M18 22 C24 20, 32 19, 38 19" stroke={cd} strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
            <path d="M18 30 C24 32, 32 33, 38 33" stroke={cd} strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
            <path d="M58 22 C52 20, 44 19, 38 19" stroke={cd} strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
            <path d="M58 30 C52 32, 44 33, 38 33" stroke={cd} strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>

            {/* Neck */}
            <path d="M62 26 C66 24, 70 22, 72 20" stroke={sk} strokeWidth="5" strokeLinecap="round"/>
            {/* Head */}
            <ellipse cx="74" cy="18" rx="6.5" ry="5.5" fill={sk} stroke={cd} strokeWidth="0.8"/>
            {/* Eye */}
            <circle cx="76" cy="16" r="1.5" fill={cd}/>
            <circle cx="76.5" cy="15.5" r="0.5" fill="white" opacity="0.7"/>
            {/* Nostril */}
            <circle cx="77.5" cy="18.5" r="0.6" fill={cd} opacity="0.6"/>
            {/* Smile */}
            <path d="M77 20 C75.5 21.5, 73 21.5, 71.5 20" stroke={cd} strokeWidth="0.7" strokeLinecap="round" fill="none"/>

            {/* Tail */}
            <path d="M15 30 C10 30, 6 28, 4 26" stroke={sk} strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </>
  );
}

// ── Wave (Flow) ───────────────────────────────────────────────────────────────
function WaveDecor({ visible }: { visible: boolean }) {
  return (
    <>
      <style>{`
        @keyframes wave-swell {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div className="absolute pointer-events-none select-none overflow-hidden"
        style={{ top: "-4px", left: "60px", width: "340px", height: "40px", zIndex: 0 }}
        aria-hidden>
        <div style={{
          position: "absolute", bottom: 0, width: "200%",
          opacity: visible ? 0.45 : 0,
          transition: "opacity 1s ease 0.3s",
          animation: visible ? "wave-swell 4s linear infinite" : "none",
        }}>
          <svg viewBox="0 0 680 40" width="680" height="40" fill="none">
            <path d="M0 28 C28 14, 56 38, 84 28 C112 14, 140 38, 168 28 C196 14, 224 38, 252 28 C280 14, 308 38, 336 28 C364 14, 392 38, 420 28 C448 14, 476 38, 504 28 C532 14, 560 38, 588 28 C616 14, 652 38, 680 28"
              stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M0 34 C28 24, 56 40, 84 34 C112 24, 140 40, 168 34 C196 24, 224 40, 252 34 C280 24, 308 40, 336 34 C364 24, 392 40, 420 34 C448 24, 476 40, 504 34 C532 24, 560 40, 588 34 C616 24, 652 40, 680 34"
              stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
          </svg>
        </div>
      </div>
    </>
  );
}

// ── Individual card with its own inView trigger ───────────────────────────────
function TierCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const { ref, visible } = useInView(0.3);
  return (
    <div
      ref={ref}
      className={`group bg-stone-950 p-10 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-sage-500 mb-3">
        {tier.subtitle}
      </p>

      {/* Name with animation behind it */}
      <div className="relative overflow-visible mb-4">
        {tier.name === "Grow" && <VineDecor visible={visible} />}
        {tier.name === "Slow" && <TurtleDecor visible={visible} />}
        {tier.name === "Flow" && <WaveDecor visible={visible} />}
        <h3 className={`font-display text-4xl font-light relative z-10 ${tier.accent}`}>
          {tier.name}
        </h3>
      </div>

      <div className={`w-8 h-px ${tier.bar} mb-5 group-hover:w-16 transition-all duration-500`} />
      <p className="font-body text-sm text-stone-400 leading-relaxed mb-7">
        {tier.description}
      </p>
      <ul className="space-y-1.5 mb-8">
        {tier.classes.map((c) => (
          <li key={c} className="flex items-center gap-2.5 text-xs text-stone-500 tracking-wide">
            <span className="w-1 h-1 rounded-full bg-sage-600 flex-shrink-0" />
            {c}
          </li>
        ))}
      </ul>
      <Link
        href={tier.href}
        className={`font-body text-xs tracking-[0.18em] uppercase transition-colors border-b pb-0.5 ${tier.linkClass}`}
      >
        Explore &rarr;
      </Link>
    </div>
  );
}

export default function ClassesTeaser() {
  const { ref, visible } = useInView();

  return (
    <section className="relative py-32 px-6 md:px-12 bg-stone-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-stone-700 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-sage-400 mb-4">
            45+ weekly classes
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-stone-100">
            Find Your Practice
          </h2>
        </div>

        {/* Tier cards — each watches itself */}
        <div className="grid md:grid-cols-3 gap-px bg-stone-800/30">
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* View full schedule CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/classes"
            className="inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.2em] uppercase border border-stone-700 text-stone-400 hover:border-stone-400 hover:text-stone-100 transition-all duration-300 rounded-sm"
          >
            View Full Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}
