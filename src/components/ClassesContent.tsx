"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ClassesContent({ notice }: { notice: string }) {
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
              All Levels Welcome
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-8">
            Classes &amp; Schedule
          </h1>

          {/* Intro copy */}
          <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-2xl mb-8">
            Schedule a class by clicking the &ldquo;Book&rdquo; button below. If this is your
            first class at the studio, you will have the option to book free of charge.
            We have classes and pricing options to suit ages 4–104. If you are new to yoga,
            target anything labeled <span className="text-stone-300">Slow</span> or{" "}
            <span className="text-stone-300">Gentle</span>, or classes like{" "}
            <span className="text-stone-300">Movement &amp; Meditation</span> and{" "}
            <span className="text-stone-300">Friday Night Light</span>! If you have an
            existing practice and feel confident in your knowledge of the poses, you have
            the pick of the schedule. We know you will find what you are looking for at
            Namaste Yoga — offering yoga for everybody.
          </p>

          {/* Special events bullet */}
          <div className="flex gap-3 max-w-2xl">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
            <p className="font-body text-sm text-stone-400 leading-relaxed">
              <span className="text-stone-200 font-medium">Special Class Events:</span>{" "}
              Watch for Friday night <span className="text-sage-300">FREE</span> community
              classes with our yoga teachers in training! March&nbsp;20 (Todd and Lindsay
              with Melissa Crouse), April&nbsp;17 (Rebecca and Rachel with Wendy) and
              May&nbsp;22 (Tracy and Crystal with Cyndy).
            </p>
          </div>
        </div>
      </section>

      {/* ── Admin notice block (only shown when non-empty) ── */}
      {notice.trim() && (
        <section className="bg-stone-950 px-6 md:px-12 pb-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-sm border border-sage-600/30 bg-sage-900/10 px-6 py-5 flex gap-4">
              <div className="w-0.5 flex-shrink-0 rounded-full bg-sage-500/50 self-stretch" />
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-sage-400/70 mb-2">
                  Notice
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
      <div className="bg-stone-950 px-6 md:px-12 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        </div>
      </div>

      {/* ── Arketa embed ── */}
      <section
        className={`relative bg-stone-950 pb-16 transition-all duration-1000 ${
          embedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Gradient overlays blend the white iframe into the dark page */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-stone-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-stone-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-stone-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-stone-950 to-transparent z-10 pointer-events-none" />

        <iframe
          id="sutraWidgetIframe"
          src="https://app.arketa.co/iframe/namasteyogaohio/schedule"
          width="100%"
          style={{ minHeight: "720px", border: "none", display: "block" }}
          allow="payment;fullscreen"
          allowFullScreen
          title="Class Schedule"
        />
      </section>


      {/* ── First class CTA ── */}
      <section className="bg-stone-950 px-6 py-16 text-center border-t border-stone-800/40">
        <p className="font-body text-stone-500 text-xs tracking-[0.15em] uppercase mb-2">
          New to Namaste?
        </p>
        <p className="font-display text-2xl font-light text-stone-300 mb-6">
          Your first in-studio class is free.
        </p>
        <a
          href="mailto:namasteyogaohio@gmail.com"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-sage-500 hover:bg-sage-400 text-stone-950 font-body font-medium text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300"
        >
          Get in Touch
        </a>
      </section>
    </>
  );
}
