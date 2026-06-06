"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OmDraw from "@/components/OmDraw";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      /* autoplay blocked — video stays paused, poster shows */
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* ── Video layer ── */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src="/hero.mov"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setLoaded(true)}
      />

      {/* ── Gradient overlay — dark vignette, slight warm tint ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/30 to-stone-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40" />

      {/* ── Hand-drawn Om — sits above video/gradients, below text ── */}
      <OmDraw trigger={loaded} />

      {/* ── Content ── */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-[1200ms] delay-300 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logo-greige.png"
            alt="Namaste Yoga Studio"
            width={340}
            height={120}
            className="w-56 sm:w-72 md:w-80 lg:w-96 h-auto drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
            priority
          />
        </div>

        <p className="font-body font-light text-sm tracking-[0.12em] text-stone-400 max-w-sm mx-auto mb-12">
          A peaceful space for all bodies, all levels, all seasons of life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/classes"
            className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase bg-sage-500 hover:bg-sage-400 text-stone-950 font-medium transition-all duration-300 rounded-sm"
          >
            View Schedule
          </Link>
          <Link
            href="/classes"
            className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase border border-stone-500/50 text-stone-300 hover:border-stone-300 hover:text-stone-100 transition-all duration-300 rounded-sm"
          >
            Explore Classes
          </Link>
        </div>

        {/* First class free badge */}
        <p className="mt-8 font-body text-xs tracking-[0.12em] text-sage-400/80">
          First in-studio class free &nbsp;·&nbsp; 45+ weekly classes
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-400">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-stone-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
