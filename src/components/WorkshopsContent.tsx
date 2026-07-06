"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function WorkshopsContent({ notice }: { notice: string }) {
  const [heroVisible, setHeroVisible] = useState(false);
  const [embedVisible, setEmbedVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroVisible(true), 100);
    const t2 = setTimeout(() => setEmbedVisible(true), 400);
    const s = document.createElement("script");
    s.src = "https://app.arketa.co/scripts/embed.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { clearTimeout(t1); clearTimeout(t2); document.body.removeChild(s); };
  }, []);

  return (
    <>
      {/* ── Page hero ── */}
      <section className="relative pt-40 pb-16 px-6 md:px-12 bg-stone-950 overflow-hidden">
        {/* Hero photo */}
        <Image src="/hero-gwen2.jpg" alt="" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40" />

        <div
          className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-gold-500/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400/70">
              Special Events
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-5">
            Workshops &amp; Events
          </h1>

          <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-xl">
            Go deeper. Slow down. Connect. Our workshops and special events are
            designed to expand your practice beyond the weekly class — immersive
            experiences led by our expert faculty and visiting teachers.
          </p>
        </div>
      </section>

      {/* ── Admin notice block (only shown when non-empty) ── */}
      {notice.trim() && (
        <section className="bg-stone-950 px-6 md:px-12 pb-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-sm border border-gold-500/30 bg-gold-500/5 px-6 py-5 flex gap-4">
              {/* Gold accent bar */}
              <div className="w-0.5 flex-shrink-0 rounded-full bg-gold-500/50 self-stretch" />
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold-400/70 mb-2">
                  Upcoming
                </p>
                <p className="font-body text-sm text-stone-300 leading-relaxed whitespace-pre-wrap">
                  {notice}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Decorative divider ── */}
      <div className="bg-stone-950 px-6 md:px-12 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        </div>
      </div>

      {/* ── Arketa embed ── */}
      <section
        className={`bg-stone-950 px-4 md:px-8 pb-16 transition-all duration-1000 ${
          embedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <iframe
              id="sutraWidgetIframe"
              src="https://app.arketa.co/iframe/namasteyogaohio/schedule?type=event"
              width="100%"
              style={{ minHeight: "680px", border: "none", display: "block", filter: "invert(1) hue-rotate(180deg)" }}
              allowFullScreen
              title="Workshops & Events Schedule"
            />
        </div>
      </section>


      {/* ── Bottom CTA ── */}
      <section className="bg-stone-950 px-6 py-16 text-center">
        <p className="font-body text-stone-500 text-xs tracking-[0.15em] uppercase mb-2">
          Questions about an event?
        </p>
        <p className="font-display text-2xl font-light text-stone-300 mb-6">
          We&apos;d love to hear from you.
        </p>
        <a
          href="mailto:namasteyogaohio@gmail.com"
          className="inline-flex items-center gap-2 px-8 py-3.5 border border-stone-600/50 text-stone-300 hover:border-gold-500/60 hover:text-gold-300 transition-all duration-300 rounded-sm text-xs tracking-[0.2em] uppercase"
        >
          Get in Touch
        </a>
      </section>
    </>
  );
}
