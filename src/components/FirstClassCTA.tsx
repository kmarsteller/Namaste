"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

export default function FirstClassCTA() {
  const { ref, visible } = useInView();

  return (
    <section
      ref={ref}
      className="relative py-40 px-6 md:px-12 overflow-hidden bg-stone-950"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-sage-900/30 blur-[120px]" />
      </div>

      <div
        className={`relative z-10 max-w-2xl mx-auto text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="block w-12 h-px bg-gold-500/40" />
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400/70">
            New students
          </span>
          <span className="block w-12 h-px bg-gold-500/40" />
        </div>

        <h2 className="font-display text-5xl md:text-7xl font-light text-stone-50 mb-6 leading-tight">
          Your first class
          <br />
          <span className="italic text-sage-300">is on us.</span>
        </h2>

        <p className="font-body font-light text-stone-400 text-sm tracking-wide leading-relaxed mb-12 max-w-sm mx-auto">
          Walk in curious. Leave transformed. No experience necessary —
          just show up five minutes early and let the rest unfold.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/schedule"
            className="px-10 py-4 text-xs tracking-[0.22em] uppercase bg-sage-500 hover:bg-sage-400 text-stone-950 font-medium transition-all duration-300 rounded-sm"
          >
            Book Your First Class
          </Link>
          <Link
            href="/about#new-students"
            className="px-10 py-4 text-xs tracking-[0.22em] uppercase text-stone-500 hover:text-stone-300 transition-colors"
          >
            What to expect &rarr;
          </Link>
        </div>

        <p className="mt-8 font-body text-xs text-stone-600 tracking-wide">
          9821 Olde 8 Rd. Suite H20 &nbsp;·&nbsp; Northfield, OH 44067 &nbsp;·&nbsp; 330-908-0700
        </p>
      </div>
    </section>
  );
}
