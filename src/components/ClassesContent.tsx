"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const FAMILY_INFO: Record<string, { label: string; color: string; classes: string[] }> = {
  grow: {
    label: "Grow",
    color: "sage",
    classes: ["Chair / Adaptive Yoga", "Yin Yoga", "Gentle Flow", "Movement and Meditation", "Gentle Strength"],
  },
  slow: {
    label: "Slow",
    color: "gold",
    classes: ["Slow Flow", "Yinyasa Flow", "Slow Stretch", "Qigong, Yin Yoga & Sound Bath"],
  },
  flow: {
    label: "Flow",
    color: "terra",
    classes: ["All Level Flow", "All Level Vinyasa Flow", "Challenge Flow", "Barre/Yoga Fusion", "Warm Vinyasa Flow"],
  },
};

function FamilyBanner({ family }: { family: string }) {
  const info = FAMILY_INFO[family];
  if (!info) return null;

  const colorMap: Record<string, string> = {
    sage: "border-sage-600/40 bg-sage-900/15 text-sage-400",
    gold: "border-gold-600/40 bg-gold-900/15 text-gold-400",
    terra: "border-terra-600/40 bg-terra-900/15 text-terra-400",
  };
  const pillMap: Record<string, string> = {
    sage: "bg-sage-900/40 text-sage-300 border border-sage-700/40",
    gold: "bg-gold-900/40 text-gold-300 border border-gold-700/40",
    terra: "bg-terra-900/40 text-terra-300 border border-terra-700/40",
  };

  return (
    <section className="bg-stone-950 px-6 md:px-12 pb-2">
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-sm border px-6 py-5 ${colorMap[info.color]}`}>
          <p className="font-body text-[10px] tracking-[0.3em] uppercase mb-2 opacity-70">
            Find {info.label} classes
          </p>
          <p className="font-body text-sm text-stone-300 mb-4">
            Use the <strong className="text-stone-100">All Class Types</strong> dropdown below to filter the schedule.
            {info.label === "Grow" && " Look for:"}
            {info.label === "Slow" && " Look for:"}
            {info.label === "Flow" && " Look for:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {info.classes.map((c) => (
              <span key={c} className={`font-body text-[11px] px-3 py-1 rounded-full ${pillMap[info.color]}`}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ClassesContent({ notice }: { notice: string }) {
  const [heroVisible, setHeroVisible] = useState(false);
  const [embedVisible, setEmbedVisible] = useState(false);
  const searchParams = useSearchParams();
  const family = searchParams.get("family")?.toLowerCase() ?? null;

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
        <Image src="/hero-lighted-class.jpg" alt="" fill className="object-cover object-bottom" priority />
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
            Schedule a class by clicking the &ldquo;Sign Up&rdquo; button below. If this is your
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

        </div>
      </section>

      {/* ── Family filter banner (when arriving from Grow/Slow/Flow links) ── */}
      {family && <FamilyBanner family={family} />}

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
        className={`bg-stone-950 pb-16 transition-all duration-1000 ${
          embedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <iframe
          id="sutraWidgetIframe"
          src="https://app.arketa.co/iframe/namasteyogaohio/schedule"
          width="100%"
          style={{
            minHeight: "720px",
            border: "none",
            display: "block",
            filter: "invert(1) hue-rotate(180deg)",
          }}
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
