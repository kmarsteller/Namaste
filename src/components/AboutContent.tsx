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
    body: "Namaste Yoga Studio spent its first 7 years in Richfield, Ohio, with Mary Pat Murphy as its founder and owner. With a basket for checks and cash when you entered the door, it was the start of something beautiful and began the community we now know and love.",
  },
  {
    range: "Years 8 – 13",
    location: "Aurora Road",
    body: "The studio spent its next 6 years on Aurora Road with Mary Pat as the owner for 3 years and Jolynn McFerren for the next three, allowing Namaste Yoga to continue as a small business in Nordonia Hills.",
  },
  {
    range: "Years 14 – 20",
    location: "Olde 8 Road",
    body: "As Namaste Yoga's community grew, we expanded to a much larger space on Olde 8 Road. After 7 years in that location and the covid pandemic, we had to relocate to a smaller space down the road.",
  },
  {
    range: "June 2021",
    location: "9821 Olde 8 Rd. Suite H20",
    body: "Namaste Yoga happily settled into 9821 Olde 8 Road in June of 2021 after renovations and some restructuring within the Ritenour Building.",
  },
];

const causes = [
  "ALS (Lou Gehrig's Disease)",
  "LLS (Leukemia Lymphoma Society)",
  "By the Dawn's Early Light",
  "The Emergency Assistance Center",
  "Veteran's Yoga Project",
  "Knights Caring for Knights",
  "Bath & Body Pantry at Nordonia High School",
  "Nordonia Schools – Mindful Wellness Program",
  "Nordonia Sports – Recovery Yoga with a variety of teams",
  "Rotary Safety & Wellness Fair",
  "Macedonia Safety & Wellness Fair",
  "Safe Decisions Week at Nordonia High School",
  "Summit County Humane Society",
  "Humble Design",
  "Zellie's Home",
  "Because I Said I Would",
  "Individuals and families in the community in need of assistance (Good Karma classes New Year's Day)",
];

function TimelineSection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background image */}
      <Image
        src="/community-feet.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Dark overlays to keep text readable */}
      <div className="absolute inset-0 bg-stone-950/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-transparent to-stone-950/60" />

      <div className="relative z-10 max-w-4xl mx-auto">
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
            Namaste Yoga&apos;s mission includes serving charitable organizations and local community
            groups. Among those we have served in the past 12 years include:
          </p>
        </div>

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
        <Image src="/hero-altar.jpg" alt="" fill className="object-cover object-center" priority />
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
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Text column */}
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-sage-400 mb-3">The Owner</p>
            <h2 className="font-display text-4xl font-light text-stone-50 mb-6">Jolynn McFerren</h2>
            <div className="w-8 h-px bg-gold-500/40 mb-7" />
            <p className="font-body text-sm text-stone-400 leading-relaxed mb-5">
              Jolynn McFerren is the owner of Namaste Yoga, a mom to three wonderful children,
              wife to Brent, and an active volunteer in the community and schools.
            </p>
            <p className="font-body text-sm text-stone-400 leading-relaxed mb-5">
              Throughout her years of owning Namaste Yoga, she has had the support of so many
              wonderful instructors and mentors in the studio and from the yoga community in
              Northeast Ohio. The strength of the Namaste instructors truly guided this business
              past a pandemic that many small businesses did not survive.
            </p>
            <p className="font-body text-sm text-stone-400 leading-relaxed mb-8">
              Jolynn believes the student community at Namaste Yoga is the heart of the business,
              and their passion for health, healing, and love for one another maintains the spirit
              upon which Namaste Yoga was founded many years ago. We are grateful to call Namaste
              Yoga <span className="text-stone-200 italic">h<span className="text-sage-300">O</span>Me</span>.
            </p>

            <div className="border border-stone-800/60 p-6 rounded-sm bg-stone-900/40">
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-sage-500 mb-3">Certifications</p>
              <ul className="space-y-1.5">
                {["RYT 500", "YACEP (Continuing Education Provider)", "2× 200-hr Teacher Training", "300-hr Advanced Training", "Thai Yoga Massage"].map((cert) => (
                  <li key={cert} className="flex items-center gap-2.5 text-xs text-stone-400">
                    <span className="w-1 h-1 rounded-full bg-sage-500 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo column */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-sm" style={{ clipPath: "inset(0 round 50% 50% 6px 6px / 22% 22% 6px 6px)" }}>
              <Image
                src="/jolynn.jpeg"
                alt="Jolynn McFerren"
                width={600}
                height={800}
                className="w-full h-auto object-cover grayscale-[15%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Subtle glow behind photo */}
            <div className="absolute -inset-4 -z-10 bg-sage-900/20 blur-2xl rounded-full" />
          </div>

        </div>
      </section>

      <TimelineSection />
      <CommunitySection />
    </>
  );
}
