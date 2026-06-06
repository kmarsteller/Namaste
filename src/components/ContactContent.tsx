"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong.");
      }
      setFormState("sent");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setFormState("error");
    }
  };

  const inputClass =
    "w-full bg-stone-950/70 border border-stone-700/60 focus:border-stone-500 focus:outline-none rounded-sm px-4 py-3 font-body text-sm text-stone-200 placeholder:text-stone-700 transition-colors duration-200";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-16 px-6 md:px-12 bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div className="w-[600px] h-[260px] rounded-full bg-sage-900/15 blur-[140px]" />
        </div>
        <div
          className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-sage-500/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-sage-400/70">
              Reach Out
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-5">
            Contact
          </h1>
          <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-lg">
            Questions or suggestions? We&apos;d love to hear from you. You can also
            stop by 30 minutes before any class on the schedule for a tour.
          </p>
        </div>
      </section>

      {/* ── Two-column: info + form ── */}
      <section className="bg-stone-950 px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left: photo + info ── */}
          <div className="flex flex-col gap-8">
            {/* Jolynn photo */}
            <div
              className="relative overflow-hidden w-full rounded-sm"
              style={{
                aspectRatio: "788 / 1287",
                clipPath: "inset(0 round 50% 50% 6px 6px / 12% 12% 6px 6px)",
              }}
            >
              <Image
                src="/jolynn-treecreek.jpg"
                alt="Jolynn McFerren at Namaste Yoga Studio"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent" />
            </div>

            {/* Contact details */}
            <div className="space-y-5">
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-600 mb-1">Address</p>
                <p className="font-body text-sm text-stone-300 leading-relaxed">
                  9821 Olde Eight Road, Suite H20<br />
                  Northfield, Ohio 44067
                </p>
                <p className="font-body text-xs text-stone-600 mt-1">
                  Located in the Ritenour Building — front or back entrance
                </p>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-600 mb-1">Phone</p>
                <a href="tel:3309080700" className="font-body text-sm text-stone-300 hover:text-sage-300 transition-colors">
                  330-908-0700
                </a>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-600 mb-1">Email</p>
                <a href="mailto:namasteyogaohio@gmail.com" className="font-body text-sm text-stone-300 hover:text-sage-300 transition-colors break-all">
                  namasteyogaohio@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div>
            <h2 className="font-display text-2xl font-light text-stone-100 mb-8">
              Send Us a Message
            </h2>

            {formState === "sent" ? (
              <div className="rounded-sm border border-sage-600/40 bg-sage-900/15 px-6 py-8 text-center">
                <p className="font-display text-2xl font-light text-sage-300 mb-2">Message sent!</p>
                <p className="font-body text-sm text-stone-400">
                  Thank you — we&apos;ll be in touch soon.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-6 font-body text-xs tracking-[0.18em] uppercase text-stone-600 hover:text-stone-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-1.5">
                      Name <span className="text-stone-700">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Optional"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-1.5">
                    Email <span className="text-stone-700">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-1.5">
                    Message <span className="text-stone-700">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us anything…"
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {formState === "error" && (
                  <p className="font-body text-xs text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full py-3.5 bg-sage-500 hover:bg-sage-400 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-body font-medium text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-200"
                >
                  {formState === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Google Map ── */}
      <section className="bg-stone-950 px-6 md:px-12 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-sm overflow-hidden border border-stone-800/60 h-[380px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.4!2d-81.5269!3d41.3317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830e1f1c3c3c3c3%3A0x0!2s9821+Olde+Eight+Rd+%23H20%2C+Northfield%2C+OH+44067!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: "none", filter: "grayscale(30%) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Namaste Yoga Studio location"
            />
          </div>
          <p className="font-body text-xs text-stone-600 mt-3 text-center tracking-wide">
            9821 Olde Eight Road, Suite H20 · Northfield, OH 44067 · Ritenour Building
          </p>
        </div>
      </section>
    </>
  );
}
