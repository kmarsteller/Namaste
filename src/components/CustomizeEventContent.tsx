"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
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

const sessionTypes = [
  { label: "Private Yoga", icon: "✦", desc: "One-on-one or small group instruction tailored to your goals." },
  { label: "Birthday Party (Kids)", icon: "✦", desc: "A fun, playful yoga experience for little ones to celebrate in style." },
  { label: "Birthday Celebration (Adult)", icon: "✦", desc: "Treat yourself and your friends to a luxurious yoga celebration." },
  { label: "Couples Yoga", icon: "✦", desc: "Deepen your connection through partner poses and shared breath." },
  { label: "Bachelorette Party", icon: "✦", desc: "A memorable send-off — flow, laugh, and celebrate together." },
  { label: "Corporate Activity", icon: "✦", desc: "Bring your team together with mindful movement and stress relief." },
];

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <Image
        src="/jolynn-treecreek.jpg"
        alt="Private yoga session at Namaste Yoga Studio"
        fill
        priority
        className={`object-cover object-center transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        sizes="100vw"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-stone-950/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/80" />

      <div className={`relative z-10 text-center px-6 transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-400 mb-4">
          Private Events &amp; Sessions
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-stone-100 leading-tight">
          Customize Your Event
        </h1>
        <p className="font-display text-xl md:text-2xl text-stone-400 italic mt-4">
          Create your own experience.
        </p>
      </div>
    </section>
  );
}

function IntroSection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="py-20 px-6 md:px-12 max-w-3xl mx-auto text-center">
      <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <p className="font-body text-sm text-stone-400 leading-loose">
          Whether you&apos;re celebrating a milestone, seeking a private session, or planning a team experience,
          Namaste Yoga Studio brings the same warmth and intention to every event we host. We offer in-studio
          events as well as off-site sessions — bringing yoga to wherever you are.
        </p>
        <p className="font-body text-sm text-stone-400 leading-loose mt-4">
          Fill out the form below and we&apos;ll be in touch to bring your vision to life.
        </p>
      </div>
    </section>
  );
}

function EventTypesSection() {
  const { ref, visible } = useInView(0.1);
  return (
    <section ref={ref} className="py-16 px-6 md:px-12 bg-stone-900/40">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-sage-500 mb-3">What We Offer</p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-stone-100">Event Experiences</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessionTypes.map((type, i) => (
            <div
              key={type.label}
              className={`border border-stone-800 rounded-sm p-6 transition-all duration-700 hover:border-sage-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="text-gold-400 text-lg mb-3">{type.icon}</p>
              <h3 className="font-display text-lg text-stone-100 mb-2">{type.label}</h3>
              <p className="font-body text-xs text-stone-500 leading-relaxed">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InquiryForm() {
  const { ref, visible } = useInView(0.05);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    sessionType: "",
    venue: "",
    attendees: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/event-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-stone-900 border border-stone-700 rounded-sm px-4 py-3 text-stone-200 font-body text-sm placeholder:text-stone-600 focus:outline-none focus:border-sage-600 transition-colors";
  const labelClass = "block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2";

  return (
    <section ref={ref} className="py-20 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-sage-500 mb-3">Get In Touch</p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-stone-100">Tell Us About Your Event</h2>
        </div>

        {status === "success" ? (
          <div className={`text-center py-16 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
            <p className="font-display text-2xl text-stone-100 mb-3">Thank you!</p>
            <p className="font-body text-sm text-stone-400">
              We&apos;ve received your inquiry and will be in touch shortly to create something beautiful together.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="First"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Last"
                />
              </div>
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="(330) 000-0000"
                />
              </div>
            </div>

            {/* Session type */}
            <div>
              <label className={labelClass} htmlFor="sessionType">Type of Session *</label>
              <select
                id="sessionType"
                name="sessionType"
                required
                value={form.sessionType}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" disabled>Select a session type…</option>
                <option value="Private Yoga">Private Yoga</option>
                <option value="Birthday Party (Kids)">Birthday Party (Kids)</option>
                <option value="Birthday Celebration (Adult)">Birthday Celebration (Adult)</option>
                <option value="Couples Yoga">Couples Yoga</option>
                <option value="Bachelorette Party">Bachelorette Party</option>
                <option value="Corporate Activity">Corporate Activity</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date + Venue row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="date">Desired Date of Event</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="venue">Desired Venue</label>
                <select
                  id="venue"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">Select a venue…</option>
                  <option value="In Studio">In Studio</option>
                  <option value="Off-Site">Off-Site</option>
                </select>
              </div>
            </div>

            {/* Attendees */}
            <div>
              <label className={labelClass} htmlFor="attendees">Expected Number of Attendees</label>
              <input
                id="attendees"
                name="attendees"
                type="number"
                min="1"
                value={form.attendees}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. 10"
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass} htmlFor="description">Description of Event</label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about your vision, any special requests, or questions you have…"
              />
            </div>

            {status === "error" && (
              <p className="font-body text-xs text-red-400 text-center">
                Something went wrong. Please try again or call us at (330) 908-3900.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 bg-sage-700 hover:bg-sage-600 disabled:opacity-50 disabled:cursor-not-allowed text-stone-100 font-body text-[11px] tracking-[0.25em] uppercase transition-colors rounded-sm"
            >
              {status === "sending" ? "Sending…" : "Submit Inquiry"}
            </button>

            <p className="font-body text-[10px] text-stone-600 text-center">
              Or call us directly: (330) 908-3900
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

export default function CustomizeEventContent() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <EventTypesSection />
      <InquiryForm />
    </>
  );
}
