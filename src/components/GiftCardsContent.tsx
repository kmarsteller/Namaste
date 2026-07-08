"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GiftCardsContent() {
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
        <Image src="/hero-retail.jpg" alt="" fill className="object-cover object-center" priority />
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
              Give the Gift of Yoga
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-8">
            Gift Cards
          </h1>

          <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-xl">
            A Namaste gift card is a beautiful way to share the practice with
            someone you love — whether they&apos;re brand new to yoga or a longtime
            student. Choose any amount and send it instantly.
          </p>
        </div>
      </section>

      {/* ── Decorative divider ── */}
      <div className="bg-stone-950 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        </div>
      </div>

      {/* ── Arketa gifting embed ── */}
      <section
        className={`bg-stone-950 px-4 md:px-8 py-16 transition-all duration-1000 ${
          embedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="rounded-sm overflow-hidden border border-stone-800/60 bg-stone-900/30 backdrop-blur-sm">
            <iframe
              id="sutraWidgetIframe"
              src="https://app.arketa.co/iframe/namasteyogaohio/gifting"
              width="100%"
              style={{ minHeight: "600px", border: "none", display: "block", filter: "invert(1) hue-rotate(180deg)" }}
              allow="payment"
              allowFullScreen
              title="Gift Cards"
            />
          </div>
        </div>
      </section>


      {/* ── Bottom note ── */}
      <section className="bg-stone-950 px-6 py-16 text-center border-t border-stone-800/40">
        <p className="font-body text-stone-500 text-xs tracking-[0.15em] uppercase mb-2">
          Questions?
        </p>
        <p className="font-display text-2xl font-light text-stone-300 mb-6">
          We&apos;re happy to help.
        </p>
        <a
          href="tel:3309080700"
          className="inline-flex items-center gap-2 px-8 py-3.5 border border-stone-600/50 text-stone-300 hover:border-gold-500/60 hover:text-gold-300 transition-all duration-300 rounded-sm text-xs tracking-[0.2em] uppercase font-body"
        >
          Call 330-908-0700
        </a>
      </section>
    </>
  );
}
