"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
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

const pillars = [
  {
    glyph: "॥",
    title: "Non-competitive",
    body: "Your practice belongs to you alone. We move at your pace, honor your body, and leave comparison at the door.",
  },
  {
    glyph: "☽",
    title: "All are welcome",
    body: "From your very first sun salutation to decades of practice — every level, every age, every body finds a home here.",
  },
  {
    glyph: "◯",
    title: "Community",
    body: "More than a studio — a gathering of people who believe that showing up for yourself is a radical act.",
  },
];

export default function StudioEthos() {
  const { ref, visible } = useInView();

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 md:px-12 bg-stone-900/50 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_#8faf97_0%,_transparent_70%)]" />

      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-display text-5xl md:text-6xl font-light text-stone-100 mb-6">
            The Studio
          </h2>
          <p className="font-body font-light text-stone-400 text-base max-w-lg mx-auto leading-relaxed">
            Namaste Yoga has called Northfield, Ohio home for years. We are not a gym.
            We are a sanctuary — and the door is always open.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`text-center transition-all duration-1000 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <span className="block font-display text-4xl text-sage-500 mb-5 leading-none">
                {p.glyph}
              </span>
              <h3 className="font-display text-2xl font-light text-stone-200 mb-3 tracking-wide">
                {p.title}
              </h3>
              <p className="font-body text-sm text-stone-500 leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
