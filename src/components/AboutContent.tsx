"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const timeline = [
  {
    range: "Years 1 – 7",
    location: "Richfield, Ohio",
    body: "Founded by Mary Pat Murphy in a spirit of pure intention — students paid what they could, dropping offerings into a basket at the door. Yoga as it was always meant to be.",
  },
  {
    range: "Years 8 – 13",
    location: "Aurora Road",
    body: "The studio grew roots on Aurora Road. Mary Pat guided the community for three years before passing the torch to Jolynn McFerren, who carried it forward for three more.",
  },
  {
    range: "Years 14 – 20",
    location: "Olde 8 Road",
    body: "Demand called for more space. The studio expanded to a larger home on Olde 8 Road, where it thrived for seven years and deepened its place in the community.",
  },
  {
    range: "June 2021",
    location: "9821 Olde 8 Rd. Suite H20",
    body: "After thoughtful renovations, Namaste moved into its current home in Northfield — brighter, larger, and ready for the next chapter.",
  },
];

const causes = [
  "ALS Research",
  "Leukemia & Lymphoma Society",
  "Emergency Assistance Centers",
  "Veteran Yoga Programs",
  "School Wellness Initiatives",
  "Local Families in Need",
];

function TimelineSection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-stone-900/40">
      <div className="max-w-4xl mx-auto">
        <div className={`mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-sage-500 mb-3">20+ years</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-stone-100">A History of Home</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-stone-800 hidden md:block" />

          <div className="space-y-14">
            {timeline.map((item, i) => (
              <div
                key={item.range}
                className={`md:pl-12 transition-all duration-1000 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                {/* Dot */}
                <div className="hidden md:block absolute left-[-4px] w-2 h-2 rounded-full bg-sage-500 mt-1.5"
                  style={{ top: `${i === 0 ? 0 : "auto"}` }}
                />
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-sage-500 mb-1">
                  {item.range} &nbsp;·&nbsp; {item.location}
                </p>
                <p className="font-body text-sm text-stone-400 leading-relaxed max-w-xl">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-stone-950">
      <div className="max-w-4xl mx-auto">
        <div className={`mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-sage-500 mb-3">Giving back</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-stone-100 mb-5">Beyond the Mat</h2>
          <p className="font-body text-sm text-stone-400 leading-relaxed max-w-xl">
            Namaste Yoga has always believed that a healthy community extends far beyond the studio walls.
            Over the years we have raised funds and awareness for causes close to our hearts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={`grid sm:grid-cols-2 gap-3 transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            {causes.map((c) => (
              <div key={c} className="flex items-center gap-3 py-3 px-4 border border-stone-800/60 rounded-sm">
                <span className="w-1 h-1 rounded-full bg-sage-500 flex-shrink-0" />
                <span className="font-body text-xs text-stone-400 tracking-wide">{c}</span>
              </div>
            ))}
          </div>

          <div className={`transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <div className="relative overflow-hidden rounded-sm aspect-square">
              <Image
                src="/community-feet.jpg"
                alt="Namaste Yoga community circle"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // Slight delay so the page fade-in feels intentional
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Page hero ── */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 bg-stone-950 overflow-hidden">
        <Image src="/hero-studio1.jpeg" alt="" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40" />

        <div
          ref={heroRef}
          className={`relative z-10 max-w-3xl mx-auto transition-all duration-1000 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-10 h-px bg-gold-500/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400/70">Our Story</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 leading-tight mb-8">
            Twenty years of<br />
            <span className="italic text-sage-300">community & breath.</span>
          </h1>

          <p className="font-body font-light text-stone-400 text-base leading-relaxed max-w-2xl mb-6">
            Namaste Yoga Studio was born from a simple idea: that yoga belongs to everyone.
            For over two decades, this studio has been a refuge — a place where competition
            dissolves, where judgment is left at the door, and where the only thing asked of
            you is that you show up.
          </p>
        </div>
      </section>

      {/* ── Jolynn's story ── */}
      <section className="py-24 px-6 md:px-12 bg-stone-950 border-t border-stone-800/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* Photo */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-sm aspect-[3/4]">
              <Image
                src="/jolynn.jpeg"
                alt="Jolynn McFerren, owner of Namaste Yoga Studio"
                fill
                className="object-cover object-top grayscale-[20%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle warm overlay */}
              <div className="absolute inset-0 bg-stone-950/10 mix-blend-multiply" />
            </div>
            {/* Caption */}
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 mt-3 text-center">
              Jolynn McFerren — Owner
            </p>
          </div>

          {/* Text */}
          <div className="md:pt-4">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-sage-500 mb-3">The Owner</p>
            <h2 className="font-display text-4xl font-light text-stone-100 mb-6">Jolynn McFerren</h2>
            <div className="w-8 h-px bg-gold-500/40 mb-7" />
            <p className="font-body text-sm text-stone-400 leading-relaxed mb-5">
              Mother of three, wife to Brent, and tireless community volunteer — Jolynn came
              to ownership not by ambition, but by love. She inherited a studio with deep roots
              and a loyal community, and she has spent every year since honoring both.
            </p>
            <p className="font-body text-sm text-stone-400 leading-relaxed mb-5">
              A certified RYT500 with additional training in Thai yoga massage, Jolynn has
              built a faculty of over twenty instructors who share her belief that yoga should
              feel like coming home.
            </p>
            <p className="font-body text-sm text-stone-400 leading-relaxed mb-8">
              She is quick to deflect credit to the students. <span className="text-stone-300 italic">
              "They are the heart of this business,"</span> she says. <span className="text-stone-300 italic">
              "Their passion for health and healing is what keeps this place alive."</span>
            </p>

            <div className="border border-stone-800/60 p-6 rounded-sm mb-6">
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-sage-600 mb-3">Certifications</p>
              <ul className="space-y-1.5">
                {["RYT 500", "YACEP (Continuing Education Provider)", "2× 200-hr Teacher Training", "300-hr Advanced Training", "Thai Yoga Massage"].map((cert) => (
                  <li key={cert} className="flex items-center gap-2.5 text-xs text-stone-400">
                    <span className="w-1 h-1 rounded-full bg-sage-600 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-2 border-sage-700 pl-5">
              <p className="font-display italic text-xl text-stone-300 leading-relaxed">
                "Yoga is not about touching your toes. It's about what you learn on the way down."
              </p>
            </div>
          </div>
        </div>
      </section>

      <TimelineSection />
      <CommunitySection />
    </>
  );
}
