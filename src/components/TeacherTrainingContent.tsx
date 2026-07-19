"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const stats = [
  { prefix: "", value: 200, suffix: "", label: "Training Hours", sub: "Yoga Alliance RYS 200" },
  { prefix: "", value: 10, suffix: "th", label: "Year of the Program", sub: "Established tradition" },
  { prefix: "", value: 9, suffix: "", label: "Monthly Weekends", sub: "Sept 2026 – May 2027" },
  { prefix: "$", value: 3000, suffix: "", label: "Full Tuition", sub: "Unlimited pass included" },
];

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

function StatPill({ stat, active, delay }: { stat: typeof stats[0]; active: boolean; delay: number }) {
  const count = useCountUp(stat.value, active);
  const display = stat.prefix + (stat.value >= 1000 ? count.toLocaleString() : count) + stat.suffix;
  return (
    <div
      className="flex items-center gap-4 px-6 py-4 rounded-full border border-stone-700/60 bg-stone-900/40 backdrop-blur-sm transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(12px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="font-display text-2xl font-light text-sage-300 min-w-[4rem] text-right tabular-nums">
        {display}
      </span>
      <div className="w-px h-8 bg-stone-700/60" />
      <div>
        <p className="font-body text-xs text-stone-300 tracking-wide leading-tight">{stat.label}</p>
        <p className="font-body text-[10px] text-stone-600 mt-0.5">{stat.sub}</p>
      </div>
    </div>
  );
}

function StatPills() {
  const { ref, visible } = useInView(0.3);
  return (
    <div ref={ref} className="flex flex-col gap-3">
      {stats.map((s, i) => (
        <StatPill key={s.label} stat={s} active={visible} delay={i * 120} />
      ))}
    </div>
  );
}

const curriculum = [
  "A structure around the 7 chakras — aligning energy, breath, meditation & the physical practice of yoga",
  "Analysis of asanas: principles of alignment, benefits, precautions, contraindications & modifications",
  "Pranayama practice and techniques",
  "Meditation practice and techniques",
  "Sanskrit meaning & pronunciations",
  "Anatomy and physiology",
  "Yogic philosophy & psychology — Yoga Sutras, Yamas & Niyamas, Bhagavad Gita, history of yoga & the chakras",
  "Teaching methodology: building relationships, planning a class, sequencing, demonstrations & assists",
  "Teaching at the studio — beginning and ending current classes",
  "The use of language in a yoga class",
  "Creating context and larger meaning through theming",
  "Professional ethics and the business of yoga",
];

const schedule = [
  { dates: "August 7", year: "2026", qna: true },
  { dates: "September 12 & 13", year: "2026" },
  { dates: "October 10 & 11", year: "2026" },
  { dates: "November 14 & 15", year: "2026" },
  { dates: "December 12 & 13", year: "2026" },
  { dates: "January 9 & 10", year: "2027" },
  { dates: "February 13 & 14", year: "2027" },
  { dates: "March 13 & 14", year: "2027" },
  { dates: "April 10 & 11", year: "2027" },
  { dates: "May 15 & 16", year: "2027" },
  { dates: "June 11–13", year: "2027", graduation: true },
];

const instructors = [
  {
    name: "Jolynn McFerren",
    role: "Lead Instructor · Studio Owner",
    photo: "/instructors/cropped-Jolynn.jpg",
    certs: "RYT 500 · YACEP",
  },
  {
    name: "Melissa Crouse",
    role: "Anatomy",
    photo: "/instructors/cropped-Melissa.jpg",
    certs: "RYT 200 · Physical Therapist",
  },
  {
    name: "Cyndy Edwards",
    role: "Meditation & Philosophy",
    photo: "/instructors/cropped-cropped-Cyndy.jpg",
    certs: "RYT 500 · YACEP",
  },
];

type ArketaInstructor = { name: string; photo: string };

const testimonials = [
  {
    quote: "The program is in depth, well balanced, and incredibly organized. The instructors are so knowledgeable in all aspects of Yoga and the course material. I feel very prepared to start my journey as a yoga teacher and would recommend this program to anyone who is interested in becoming certified.",
    name: "Lindsay",
    year: "2026",
  },
  {
    quote: "Namaste Yoga Studio training instructors were incredibly knowledgeable about the coursework and curriculum. Their compassion and presence created a safe, supportive space for all participants to learn, explore, and grow.",
    name: "Melissa",
    year: "2026",
  },
];

function CurriculumSection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="relative py-24 px-6 md:px-12 border-t border-stone-800/40 overflow-hidden">
      <Image
        src="/ytt-anatomy.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-stone-950/88" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-transparent to-stone-950/60" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className={`mb-14 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-500 mb-3">What You Will Study</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-stone-100">Curriculum</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          {curriculum.map((item, i) => (
            <div
              key={i}
              className={`flex gap-4 py-4 border-b border-stone-800/40 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${100 + i * 60}ms` }}
            >
              <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full border border-sage-600/60 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
              </span>
              <p className="font-body text-sm text-stone-400 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
}

function ScheduleSection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-stone-900/30 border-t border-stone-800/40">
      <div className="max-w-4xl mx-auto">
        <div className={`mb-14 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-500 mb-3">Monthly Weekends</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-stone-100">Course Schedule</h2>
        </div>

        {/* Q&A Night callout */}
        {schedule.filter((s) => s.qna).map((s, i) => (
          <div
            key="qna"
            className={`mb-6 flex items-center gap-5 p-5 border border-sage-700/50 bg-sage-900/20 rounded-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="w-10 h-10 flex-shrink-0 rounded-full border border-sage-600/60 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage-400" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <p className="font-body text-[9px] tracking-[0.25em] uppercase text-sage-500 mb-0.5">{s.year} · Free &amp; Open to All</p>
              <p className="font-display text-lg text-stone-100">Q&amp;A Night — <span className="text-sage-300">{s.dates} at 6:30 pm</span></p>
              <p className="font-body text-xs text-stone-500 mt-0.5">Have questions about the program? Come meet the instructors.</p>
            </div>
          </div>
        ))}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {schedule.filter((s) => !s.qna).map((s, i) => (
            <div
              key={i}
              className={`relative p-5 border rounded-sm transition-all duration-700 ${
                s.graduation
                  ? "border-gold-500/50 bg-gold-500/5"
                  : "border-stone-800/60 bg-stone-900/40"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${(i + 1) * 70}ms` }}
            >
              {s.graduation && (
                <span className="absolute top-3 right-3 font-body text-[9px] tracking-[0.2em] uppercase text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-sm">
                  Graduation
                </span>
              )}
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-1">{s.year}</p>
              <p className={`font-display text-xl font-light ${s.graduation ? "text-gold-300" : "text-stone-200"}`}>
                {s.dates}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-8 p-6 border border-stone-800/40 rounded-sm bg-stone-900/20 transition-all duration-1000 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="font-body text-sm text-stone-500 leading-relaxed">
            All sessions meet at Namaste Yoga Studio unless otherwise noted. Additional hours with guest teachers
            will be offered. <span className="text-stone-300">Program tuition is $3,000</span> — unlimited monthly
            class pass included in the cost of the program.
          </p>
        </div>
      </div>
    </section>
  );
}

function InstructorsSection({ photoMap }: { photoMap: Map<string, string> }) {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-stone-950 border-t border-stone-800/40">
      <div className="max-w-4xl mx-auto">
        <div className={`mb-14 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-500 mb-3">Your Faculty</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-stone-100">Lead Instructors</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {instructors.map((inst, i) => {
            const photo = photoMap.get(inst.name.toLowerCase().trim()) || inst.photo;
            return (
              <div
                key={inst.name}
                className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative overflow-hidden bg-stone-900 aspect-[3/4] mb-4">
                  <Image
                    src={photo}
                    alt={inst.name}
                    fill
                    className="object-cover object-top grayscale-[15%]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
                </div>
                <p className="font-display text-xl font-light text-stone-100 mb-1">{inst.name}</p>
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-sage-400 mb-1">{inst.role}</p>
                <p className="font-body text-[10px] text-stone-600 tracking-wide">{inst.certs}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-stone-900/30 border-t border-stone-800/40">
      <div className="max-w-4xl mx-auto">
        <div className={`mb-14 text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-500 mb-3">From Our Graduates</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-stone-100">What Students Say</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`p-8 border border-stone-800/50 rounded-sm bg-stone-900/40 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="block font-display text-5xl text-sage-700/60 leading-none mb-4">&ldquo;</span>
              <p className="font-body text-sm text-stone-400 leading-relaxed mb-6 italic">{t.quote}</p>
              <div className="flex items-center gap-3">
                <span className="w-6 h-px bg-sage-600/60" />
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-sage-400">
                  {t.name} &middot; {t.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-stone-950 border-t border-stone-800/40">
      <div className="max-w-4xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Q&A event */}
          <div className="border border-gold-500/30 rounded-sm p-8 bg-gold-500/5">
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400 mb-3">Mark Your Calendar</p>
            <h3 className="font-display text-3xl font-light text-stone-100 mb-2">Q&amp;A Night</h3>
            <p className="font-display text-xl font-light text-gold-300 mb-6">August 7, 2026 · 6:30 pm</p>
            <p className="font-body text-sm text-stone-400 leading-relaxed mb-2">
              9821 Olde 8 Road, Suite H20<br />
              Northfield, Ohio 44067
            </p>
            <p className="font-body text-sm text-stone-500">
              Come meet the faculty, tour the studio, and get all your questions answered before enrolling.
            </p>
          </div>

          {/* Apply */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-500 mb-3">Ready to Begin?</p>
              <h3 className="font-display text-3xl font-light text-stone-100 mb-4">Apply Now</h3>
              <p className="font-body text-sm text-stone-400 leading-relaxed mb-8">
                Contact the studio for more information and an application. Space is limited — this is an
                intimate program designed for deep, personal growth.
              </p>
            </div>
            <div className="space-y-3">
              <a
                href="/ytt-200-2026-2027.pdf"
                download
                className="flex items-center gap-3 px-6 py-4 border border-gold-500/50 text-gold-300 hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-200 rounded-sm font-body text-[10px] tracking-[0.2em] uppercase"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7,10 12,15 17,10" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Program Info (PDF)
              </a>
              <a
                href="tel:3309080700"
                className="flex items-center gap-3 px-6 py-4 border border-sage-600/50 text-sage-300 hover:bg-sage-700/20 hover:border-sage-400 transition-all duration-200 rounded-sm font-body text-[10px] tracking-[0.2em] uppercase"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                330.908.0700
              </a>
              <a
                href="mailto:namasteyogaohio@gmail.com"
                className="flex items-center gap-3 px-6 py-4 border border-sage-600/50 text-sage-300 hover:bg-sage-700/20 hover:border-sage-400 transition-all duration-200 rounded-sm font-body text-[10px] tracking-[0.2em] uppercase"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                namasteyogaohio@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TeacherTrainingContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [photoMap, setPhotoMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    fetch("/api/instructors")
      .then((r) => r.json())
      .then(({ instructors: arketa }: { instructors: ArketaInstructor[] }) => {
        setPhotoMap(new Map(arketa.map((a) => [a.name.toLowerCase().trim(), a.photo])));
      })
      .catch(() => {});
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 px-6 md:px-12 bg-stone-950 overflow-hidden">
        <Image
          src="/ytt-graduation.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-stone-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/50 via-transparent to-stone-950/50" />

        <div
          className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* RYS 200 badge */}
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-10 h-px bg-gold-500/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400/70">
              Yoga Alliance · RYS 200 · 10th Year
            </span>
          </div>

          <p className="font-display text-lg md:text-xl font-light text-sage-300 italic mb-3 tracking-wide">
            Building the Foundation
          </p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 leading-tight mb-6">
            200-Hour<br />
            <span className="italic text-sage-300">Yoga Teacher</span><br />
            Training
          </h1>

          <p className="font-body text-sm text-stone-400 tracking-[0.12em] mb-10">
            September 2026 &nbsp;—&nbsp; June 2027
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#schedule"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-sage-700/40 border border-sage-600/60 text-sage-200 hover:bg-sage-700/60 transition-all duration-200 rounded-sm font-body text-[10px] tracking-[0.2em] uppercase"
            >
              View Schedule
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-stone-600/50 text-stone-300 hover:border-gold-500/60 hover:text-gold-300 transition-all duration-200 rounded-sm font-body text-[10px] tracking-[0.2em] uppercase"
            >
              Apply / Contact
            </a>
            <a
              href="/ytt-200-2026-2027.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold-500/50 text-gold-300 hover:bg-gold-500/10 transition-all duration-200 rounded-sm font-body text-[10px] tracking-[0.2em] uppercase"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Program Info
            </a>
          </div>
        </div>
      </section>

      {/* ── Program overview ── */}
      <section className="py-24 px-6 md:px-12 bg-stone-950 border-t border-stone-800/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-500 mb-3">The Experience</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-stone-100 mb-6">Our Program</h2>
            <div className="w-8 h-px bg-gold-500/40 mb-8" />
            <div className="space-y-5 font-body text-sm text-stone-400 leading-relaxed">
              <p>
                In its ever-evolving state, this is the <span className="text-stone-200">10th year</span> of this
                teacher training program. The strength of this program is in the combination of group experiences
                and self-study.
              </p>
              <p>
                Students learn through small and large group discussion, reading, journaling, and demonstration —
                all reinforced through application in the yoga classroom. Each weekend, students build on the
                knowledge and experience gained in prior sessions, home practice, journaling, and readings.
              </p>
              <p>
                Our instructors support each student&apos;s personal journey as both a yoga practitioner and
                yoga teacher. We provide an <span className="text-stone-200">intimate environment</span> for
                growth and development.
              </p>
              <p>
                Attendance is required at all sessions for graduation. We understand that emergencies occur and
                options for make-up hours will be given.
              </p>
            </div>
          </div>

          {/* At-a-glance stats */}
          <StatPills />
        </div>
      </section>

      <CurriculumSection />

      <span id="schedule" />
      <ScheduleSection />

      <InstructorsSection photoMap={photoMap} />

      <TestimonialsSection />

      <span id="apply" />
      <CTASection />
    </>
  );
}
