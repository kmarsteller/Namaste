"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ── Testimonial data ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Bethany Vitt",
    quote:
      "Jolynn planted the seed of yoga into my life — a small seed that has now blossomed into the most beautiful tree. Every single practice is better than the last. I cannot express my gratitude to all of Namaste.",
  },
  {
    name: "The Rizzo Family",
    quote:
      "We have been practicing yoga for over 15 years. It feels like a way to say thank you to your body. Namaste is a family — a tranquil and supportive place for mind and body. Whether we are on our most consistent or need to step away for a while, Namaste is there to welcome us back in a warm and caring way.",
  },
  {
    name: "Carole Saire",
    quote:
      "As you get older it's so important to keep moving and growing to keep both your mind and your body flexible and strong. Yoga helps me achieve that goal. I really look forward to my classes at Namaste and thanks to all of the instructors for being so welcoming and supportive.",
  },
  {
    name: "Nathan Jucha",
    quote:
      "I started yoga in 2014 for the physical activity aspect, and now I practice for myself. I'm comfortable at Namaste and it's a great community.",
  },
  {
    name: "Kim Kainec",
    quote:
      "Yoga allows me a dedicated time to reflect on the good and bad that life has to offer. Yoga helps me to be more patient where I am lacking. It helps me find a glimpse of peace in the chaos of life.",
  },
  {
    name: "Nikki Kovach",
    quote:
      "Kim and I have tried endless classes for physical fitness over the years and we stuck with Namaste because it helped us expand that benefit beyond just physical health. I like to think my entire family appreciates the days that I practice yoga.",
  },
  {
    name: "Julie Crawford",
    quote:
      "I look forward to coming to class to move my body, clear my mind, and share good laughs! Namaste is a welcoming environment that allows me to relax and have fun with friends.",
  },
  {
    name: "Susan Vetrovsky",
    quote:
      "Doing yoga with a friend helps you to relax, enjoy the flow, and not be judged. I love the slow flow class because my instructor encourages me to be me and do my best — even if I'm aiming left instead of right!",
  },
  {
    name: "Liz & Sam Daniels",
    quote:
      "We choose to practice at Namaste because of the supportive community, teachers, and classes. With yoga we are able to practice together, laugh, clear our minds, and leave the mat better than we found it.",
  },
];

const INTERVAL = 6000;

// ── Large open-quote SVG ──────────────────────────────────────────────────────
function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 30"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M0 30V18C0 7.5 6 1.5 18 0l2 4C13 5.5 10 9 10 14h8v16H0zm22 0V18C22 7.5 28 1.5 40 0l2 4C35 5.5 32 9 32 14h8v16H22z" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CommunityCarousel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for section fade-in
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (animating) return;
      setAnimating(true);
      setVisible(false);
      setTimeout(() => {
        setIndex(next);
        setVisible(true);
        setAnimating(false);
      }, 350);
    },
    [animating]
  );

  const advance = useCallback(() => {
    goTo((index + 1) % TESTIMONIALS.length);
  }, [goTo, index]);

  const retreat = useCallback(() => {
    goTo((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, [goTo, index]);

  // Auto-advance
  useEffect(() => {
    if (!sectionVisible) return;
    timerRef.current = setTimeout(advance, INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sectionVisible, advance]);

  const current = TESTIMONIALS[index];

  return (
    <section
      ref={sectionRef}
      className={`bg-stone-900/40 py-24 px-6 md:px-12 transition-all duration-1000 ${
        sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-4xl mx-auto">

        {/* ── Section label ── */}
        <div className="flex items-center gap-4 mb-14">
          <span className="block w-10 h-px bg-sage-500/40" />
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-400/70">
            Community
          </span>
        </div>

        {/* ── Quote area ── */}
        <div className="relative min-h-[220px] sm:min-h-[180px]">
          {/* Decorative open-quote */}
          <QuoteMark className="absolute -top-2 -left-1 w-8 h-6 text-sage-700/40 pointer-events-none select-none" />

          <div
            className="transition-all duration-350"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transitionDuration: "350ms",
              transitionProperty: "opacity, transform",
            }}
          >
            <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-stone-100 leading-snug pl-6 md:pl-8 mb-8">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3 pl-6 md:pl-8">
              <span className="block w-6 h-px bg-sage-500/60" />
              <cite className="font-body not-italic text-xs tracking-[0.2em] uppercase text-sage-400/80">
                {current.name}
              </cite>
            </div>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center justify-between mt-14">

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 h-1.5 bg-sage-400"
                    : "w-1.5 h-1.5 bg-stone-700 hover:bg-stone-500"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={retreat}
              aria-label="Previous testimonial"
              className="w-9 h-9 flex items-center justify-center border border-stone-700/60 text-stone-500 hover:border-stone-500 hover:text-stone-200 transition-all duration-200 rounded-sm"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={advance}
              aria-label="Next testimonial"
              className="w-9 h-9 flex items-center justify-center border border-stone-700/60 text-stone-500 hover:border-stone-500 hover:text-stone-200 transition-all duration-200 rounded-sm"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
