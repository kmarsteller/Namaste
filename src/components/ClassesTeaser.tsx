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
    href: "/classes#grow",
  },
  {
    name: "Slow",
    subtitle: "Find your rhythm",
    description:
      "Slow Flow, Yinyasa Flow, and Slow Stretch. Breath-led, steady-paced practices for building depth.",
    classes: ["Slow Flow", "Yinyasa Flow", "Slow Stretch"],
    href: "/classes#slow",
  },
  {
    name: "Flow",
    subtitle: "Move with fire",
    description:
      "All Level Vinyasa, Challenge Flow, and Yoga/Barre Fusion. Dynamic sequences for those ready to go deeper.",
    classes: ["All Level Flow", "All Level Vinyasa", "Challenge Flow", "Yoga / Barre Fusion"],
    href: "/classes#flow",
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

export default function ClassesTeaser() {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12 bg-stone-950">
      {/* Subtle texture line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-stone-700 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
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

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-px bg-stone-800/30">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`group bg-stone-950 p-10 transition-all duration-1000 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-sage-500 mb-3">
                {tier.subtitle}
              </p>
              <h3 className="font-display text-4xl font-light text-stone-100 mb-4">
                {tier.name}
              </h3>
              <div className="w-8 h-px bg-gold-500/50 mb-5 group-hover:w-16 transition-all duration-500" />
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
                className="font-body text-xs tracking-[0.18em] uppercase text-sage-400 hover:text-sage-200 transition-colors border-b border-sage-700/50 hover:border-sage-400 pb-0.5"
              >
                Explore &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* View full schedule CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/schedule"
            className="inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.2em] uppercase border border-stone-700 text-stone-400 hover:border-stone-400 hover:text-stone-100 transition-all duration-300 rounded-sm"
          >
            View Full Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}
