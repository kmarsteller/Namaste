"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BENEFITS = [
  "Calms the mind, reduces stress and anxiety",
  "Revitalizes the body and mind",
  "Slows heart rate and lowers blood pressure",
  "Increases circulation",
  "Strengthens and tones muscles",
  "Helps to detoxify the system",
  "Improves function of internal organs",
  "Balances the muscular system",
  "Increases metabolism and energy",
  "Can help reduce depression, stress, and insomnia",
];

const GUIDELINES = [
  { icon: "👣", text: "Wear clean bare feet and comfortable, fitted clothing" },
  { icon: "🧘", text: "Bring your own mat and props — or borrow them free at the studio" },
  { icon: "🌸", text: "Please avoid strong fragrances out of respect for fellow students" },
  { icon: "🍃", text: "Practice on an empty stomach when possible" },
  { icon: "⏰", text: "Arrive 10–15 minutes early for your first class" },
  { icon: "📵", text: "Turn off or silence your cell phone before class" },
  { icon: "🤫", text: "Keep hallway noise minimal — classes may be in session" },
  { icon: "🚪", text: "Use the front or back building entrances" },
];

const GOOD_STARTING_CLASSES = [
  "Gentle Flow",
  "Slow Stretch",
  "Slow Flow",
  "Yin Yoga",
  "Adaptive / Chair Yoga",
  "Friday Night Light",
  "Movement + Meditation",
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function NewStudentsContent() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div className="w-[700px] h-[300px] rounded-full bg-sage-900/20 blur-[150px]" />
        </div>
        <div
          className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* First class free badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-sage-600/40 bg-sage-900/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-sage-300">
              First In-Studio Class Free
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-6">
            New Students
          </h1>
          <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-xl">
            We understand that walking into a yoga studio for the first time takes
            courage. We&apos;re here to make it easy — and to make sure you feel
            welcome from the moment you arrive.
          </p>
        </div>
      </section>

      {/* ── Benefits of yoga ── */}
      <section className="bg-stone-950 px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-10 h-px bg-sage-500/40" />
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-400/70">
                Why Yoga
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-stone-100 mb-4">
              The Benefits of Yoga
            </h2>
            <p className="font-body text-sm text-stone-400 leading-relaxed max-w-2xl mb-10">
              Yoga encompasses many styles — some vigorous and fast-paced, others
              gentle and slow. All of them have real benefits. Evaluating your
              individual needs and personality type will help point you in the
              right direction.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-0">
            {BENEFITS.map((b, i) => (
              <FadeIn key={b} delay={i * 50}>
                <div className="flex items-start gap-3 py-3 border-b border-stone-800/50">
                  <span className="w-1 h-1 rounded-full bg-sage-400 flex-shrink-0 mt-2" />
                  <p className="font-body text-sm text-stone-300 leading-relaxed">{b}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Getting started ── */}
      <section className="bg-stone-950 px-6 md:px-12 py-16 border-t border-stone-800/40">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-10 h-px bg-gold-500/40" />
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400/70">
                Getting Started
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-stone-100 mb-4">
              Where do I begin?
            </h2>
            <p className="font-body text-sm text-stone-400 leading-relaxed max-w-2xl mb-8">
              Yoga can be the most rewarding experience of your life. If you&apos;re
              brand new, we recommend starting with any of these classes — they&apos;re
              designed to welcome you exactly where you are:
            </p>
          </FadeIn>

          <div className="flex flex-wrap gap-3 mb-8">
            {GOOD_STARTING_CLASSES.map((cls, i) => (
              <FadeIn key={cls} delay={i * 60}>
                <span className="inline-flex items-center px-4 py-2 rounded-sm border border-stone-700/60 bg-stone-900/40 font-body text-xs text-stone-300 tracking-wide">
                  {cls}
                </span>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <Link
              href="/class-descriptions"
              className="inline-flex items-center gap-2 font-body text-xs tracking-[0.18em] uppercase text-stone-500 hover:text-stone-200 transition-colors"
            >
              Read all class descriptions →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Studio guidelines ── */}
      <section className="bg-stone-950 px-6 md:px-12 py-16 border-t border-stone-800/40">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-10 h-px bg-stone-500/40" />
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-stone-500">
                What to Know
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-stone-100 mb-10">
              Studio Guidelines
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {GUIDELINES.map((g, i) => (
              <FadeIn key={g.text} delay={i * 60}>
                <div className="flex items-start gap-4 p-5 rounded-sm border border-stone-800/50 bg-stone-900/20">
                  <span className="text-lg flex-shrink-0 mt-0.5">{g.icon}</span>
                  <p className="font-body text-sm text-stone-300 leading-relaxed">{g.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-stone-950 px-6 py-20 text-center border-t border-stone-800/40">
        <div className="max-w-lg mx-auto">
          <p className="font-body text-stone-500 text-xs tracking-[0.15em] uppercase mb-3">
            Ready to take the first step?
          </p>
          <p className="font-display text-3xl font-light text-stone-200 mb-3">
            Your first class is on us.
          </p>
          <p className="font-body text-sm text-stone-500 leading-relaxed mb-8">
            No commitment, no pressure — just show up and breathe.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/classes"
              className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase bg-sage-500 hover:bg-sage-400 text-stone-950 font-body font-medium transition-all duration-300 rounded-sm"
            >
              View the Schedule
            </Link>
            <a
              href="tel:3309080700"
              className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase border border-stone-600/50 text-stone-300 hover:border-stone-400 hover:text-stone-100 transition-all duration-300 rounded-sm font-body"
            >
              Call 330-908-0700
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
