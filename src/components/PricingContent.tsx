"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PricingContent() {
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
        <Image src="/hero-merch.jpg" alt="" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40" />

        <div
          className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-stone-500/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-stone-500">
              Memberships &amp; Packages
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-8">
            Pricing
          </h1>

          <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-2xl mb-6">
            We offer flexible options to fit your practice and your life — from
            single drop-ins to unlimited memberships. Your first in-studio class
            is always free, so come find your footing before you commit.
          </p>

          {/* First class free callout */}
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-sm border border-sage-600/30 bg-sage-900/10">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
            <p className="font-body text-xs text-stone-400 tracking-wide">
              First in-studio class is <span className="text-sage-300 font-medium">free</span> — no commitment required.
            </p>
          </div>
        </div>
      </section>

      {/* ── Info block ── */}
      <section className="bg-stone-950 px-6 md:px-12 pb-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-body text-sm text-stone-300 leading-relaxed">
            Class purchases can be made online here, or in-person prior to class.{" "}
            <span className="text-stone-400">(Please come early!)</span>
          </p>
          <p className="font-body text-sm text-stone-500 leading-relaxed">
            Please note that Namaste Yoga Studio has switched from{" "}
            <span className="text-stone-400">MindBody</span> to{" "}
            <span className="text-stone-300">Arketa</span> for online bookings and payments.
          </p>
        </div>
      </section>

      {/* ── Decorative divider ── */}
      <div className="bg-stone-950 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        </div>
      </div>

      {/* ── Arketa pricing embed ── */}
      {/* Arketa's pricing cards widget is designed wide (1500px). We let it  */}
      {/* fill the viewport at full width with generous side padding so cards */}
      {/* breathe on large screens, and collapse naturally on mobile.         */}
      <section
        className={`bg-stone-950 px-2 md:px-6 py-12 transition-all duration-1000 ${
          embedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="w-full max-w-[1500px] mx-auto">
          <iframe
            id="sutraWidgetIframe"
            src="https://app.arketa.co/iframe/namasteyogaohio/pricing/cards"
            width="100%"
            style={{ minHeight: "1500px", border: "none", display: "block", filter: "invert(1) hue-rotate(180deg)" }}
            allow="payment"
            allowFullScreen
            title="Pricing Options"
          />
        </div>
      </section>


      {/* ── Questions CTA ── */}
      <section className="bg-stone-950 px-6 py-16 text-center border-t border-stone-800/40">
        <p className="font-body text-stone-500 text-xs tracking-[0.15em] uppercase mb-2">
          Not sure which option is right for you?
        </p>
        <p className="font-display text-2xl font-light text-stone-300 mb-6">
          We&apos;re happy to help you choose.
        </p>
        <a
          href="tel:3309080700"
          className="inline-flex items-center gap-2 px-8 py-3.5 border border-stone-600/50 text-stone-300 hover:border-stone-400 hover:text-stone-100 transition-all duration-300 rounded-sm text-xs tracking-[0.2em] uppercase font-body"
        >
          Call 330-908-0700
        </a>
      </section>
    </>
  );
}
