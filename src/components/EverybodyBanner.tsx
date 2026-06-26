"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EverybodyBanner() {
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
    <section
      ref={ref}
      className={`relative w-full overflow-hidden bg-stone-950 transition-all duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* ── Image ── */}
      <div className="relative h-[55vh] min-h-[320px] max-h-[520px]">
        <Image
          src="/everybody.png"
          alt="Yoga is for everybody"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Fade all four edges to stone-950 */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-transparent to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-transparent to-stone-950" />
        {/* Extra bottom fade so it bleeds cleanly into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-stone-950 to-transparent" />
      </div>
    </section>
  );
}
