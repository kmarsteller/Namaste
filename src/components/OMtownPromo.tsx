"use client";

import { useEffect, useRef, useState } from "react";

export default function OMtownPromo() {
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
    <section className="relative py-24 px-6 md:px-12 bg-stone-950">
      <div className="max-w-3xl mx-auto text-center">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-sage-400 mb-4">
            Welcome
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-stone-100 mb-8">
            Your OMtown Yoga Studio
          </h2>
          <p className="font-body font-light text-stone-400 text-base leading-relaxed">
            Receive 25% off of your first class pass with code{" "}
            <span className="text-stone-200 font-medium tracking-wide">25OFFYOGA</span>.
            These are good on all of our 45+ classes on the schedule. We offer a warm,
            welcoming environment from the moment you step through our doors.
          </p>
        </div>
      </div>
    </section>
  );
}
