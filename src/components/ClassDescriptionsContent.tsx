"use client";

import { useEffect, useRef, useState } from "react";
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

// ── Animated card ─────────────────────────────────────────────────────────────
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
      <h3 className="font-display text-xl font-light text-stone-100 mb-3">
        {name}
      </h3>
      <p className="font-body text-sm text-stone-400 leading-relaxed max-w-2xl">
        {description}
      </p>
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
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div className="w-[700px] h-[260px] rounded-full bg-sage-900/15 blur-[140px]" />
        </div>
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
            {/* Section header */}
            <div className="flex items-center gap-5 mb-10">
              <div className={`w-12 h-0.5 ${section.bar}`} />
              <div>
                <h2 className={`font-display text-4xl font-light ${section.accent}`}>
                  {section.name}
                </h2>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-600 mt-0.5">
                  {section.tagline}
                </p>
              </div>
            </div>

            {/* Class cards */}
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
