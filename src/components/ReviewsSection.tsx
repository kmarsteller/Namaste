"use client";

import { useEffect, useRef, useState } from "react";

// ── Platform data ─────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    id: "google",
    name: "Google",
    rating: 5.0,
    count: 90,
    countLabel: "reviews",
    reviewUrl: "https://g.page/r/namasteyogaohio/review",
    accentColor: "#4285F4",
    glowColor: "#34A853",
    excerpts: [
      {
        author: "Keith Marsteller",
        text: "A small, local business that cares about its community, and has a really personal feel about it that feels like home.",
      },
      {
        author: "Alexa Pylypiak",
        text: "I've enjoyed every yoga class and teacher at Namaste for the last 13 or so years. Jolynn is a special person — her energy and spirit are contagious.",
      },
      {
        author: "Michelle Hurst",
        text: "Wendy brings an amazing energy to every class — motivating, positive, present, and fun. Her class always offers the perfect level of challenge.",
      },
      {
        author: "Laura Weichel",
        text: "Kathy House's workshops are always so welcoming and insightful. Namaste is a very welcoming studio with great offerings and wonderful instructors.",
      },
      {
        author: "Melissa Pisaneschi",
        text: "I took my first class earlier this summer and know I made a great choice. The staff and environment are welcoming and inviting — I felt comfortable from day one.",
      },
    ],
    Icon: GoogleIcon,
  },
  {
    id: "facebook",
    name: "Facebook",
    rating: 98,
    count: 209,
    countLabel: "recommendations",
    reviewUrl: "https://www.facebook.com/namasteyogaohio/reviews",
    accentColor: "#1877F2",
    glowColor: "#1877F2",
    excerpts: [
      {
        author: "Jean Bon",
        text: "The instructors at Namaste will work with me to provide modifications based on my abilities and needs. Everyone is so helpful all the time. It's my happy place!",
      },
      {
        author: "Joan Mervar",
        text: "Wonderful experience, everything was super clean, instructors extremely knowledgeable and helpful. Great space! Thank you for such a relaxing afternoon.",
      },
      {
        author: "Karen Cole",
        text: "Kind and welcoming atmosphere to embrace the healing grace of breath, movement, and meditation.",
      },
    ],
    Icon: FacebookIcon,
  },
  {
    id: "yelp",
    name: "Yelp",
    rating: 5.0,
    count: 7,
    countLabel: "reviews",
    reviewUrl: "https://www.yelp.com/biz/namaste-yoga-studio-northfield-4",
    accentColor: "#D32323",
    glowColor: "#D32323",
    excerpts: [
      {
        author: "The Community",
        text: "A tranquil and supportive place for mind and body — whether you're on your most consistent streak or need to step away for a while, Namaste welcomes you back.",
      },
    ],
    Icon: YelpIcon,
  },
];

// ── SVG Icons ─────────────────────────────────────────────────────────────────
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function YelpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#D32323" aria-hidden>
      <path d="M20.16 12.73l-4.3 1.43c-.96.36-1.76-.73-1.2-1.56l2.44-3.7c.52-.78 1.64-.57 1.88.34l1.86 2.27c.35.43.19 1.07-.68 1.22zm-5.4 4.1l3.96 2.35c.73.43.6 1.48-.2 1.73l-4.57 1.35c-.73.22-1.4-.47-1.13-1.18l.96-3.7c.28-.98 1.3-1.06 1.98-.55zm-7.5 3.57l.88-4.45c.2-.96 1.36-1.13 1.87-.27l2.57 4.01c.47.73-.06 1.7-.9 1.62l-3.45-.3c-.77-.07-1.16-.92-.97-1.61zM3.83 15.2l3.9-2.26c.87-.5 1.8.4 1.47 1.34l-1.57 4.4c-.28.8-1.26.96-1.74.27L3.5 16.43c-.4-.57-.2-1.08.33-1.23zM3.2 8.64l4.33 1.27c.97.3.97 1.55 0 1.83l-4.33 1.21c-.8.22-1.5-.57-1.2-1.34l.45-2.5c.18-.77.97-1.1 1.75-.47z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#1877F2" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

// ── Star display ──────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          aria-hidden
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            fill={star <= Math.round(rating) ? "#F5A623" : "rgba(255,255,255,0.12)"}
          />
        </svg>
      ))}
    </div>
  );
}

// ── Single platform card ──────────────────────────────────────────────────────
function ReviewCard({
  platform,
  index,
}: {
  platform: (typeof PLATFORMS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Cycle through excerpts if there are multiple
  useEffect(() => {
    if (platform.excerpts.length <= 1) return;
    const id = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % platform.excerpts.length);
        setQuoteVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(id);
  }, [platform.excerpts.length]);

  const excerpt = platform.excerpts[quoteIndex];

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col bg-stone-900/60 rounded-sm p-6 transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        transitionDuration: "700ms",
        border: `1px solid ${platform.glowColor}35`,
        boxShadow: `0 0 35px ${platform.glowColor}40, 0 0 8px ${platform.glowColor}55, inset 0 0 24px ${platform.glowColor}08`,
      }}
    >
      {/* Top: icon + name + rating */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <platform.Icon className="w-7 h-7 flex-shrink-0" />
          <div>
            <p className="font-body text-sm font-medium text-stone-200 leading-none mb-1">
              {platform.name}
            </p>
            {platform.rating !== null && platform.id !== "facebook" && (
              <div className="flex items-center gap-2">
                <Stars rating={platform.rating} />
                <span className="font-body text-xs text-stone-500">
                  {platform.rating.toFixed(1)}
                </span>
              </div>
            )}
            {platform.id === "facebook" && platform.rating !== null && (
              <p className="font-body text-xs text-stone-500 leading-none">
                <span className="text-[#1877F2] font-medium">{platform.rating}%</span> recommend
              </p>
            )}
          </div>
        </div>

        {/* Review count badge */}
        {platform.count !== null && (
          <div className="text-right">
            <span className="font-display text-3xl font-light text-stone-100 leading-none">
              {platform.count}
            </span>
            <p className="font-body text-[10px] tracking-[0.15em] uppercase text-stone-600 mt-0.5">
              {platform.countLabel}
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent mb-5" />

      {/* Excerpt */}
      <div
        className="flex-1 transition-all duration-400"
        style={{ opacity: quoteVisible ? 1 : 0, transitionDuration: "400ms" }}
      >
        <p className="font-display text-base font-light text-stone-300 leading-relaxed italic mb-4">
          &ldquo;{excerpt.text}&rdquo;
        </p>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600">
          — {excerpt.author}
        </p>
      </div>

      {/* CTA */}
      <a
        href={platform.reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 border border-stone-700/60 text-stone-500 hover:border-stone-500 hover:text-stone-200 transition-all duration-200 rounded-sm font-body text-[10px] tracking-[0.2em] uppercase"
      >
        Leave a Review
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3" aria-hidden>
          <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function ReviewsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-stone-950 py-24 px-6 md:px-12 border-t border-stone-800/40">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="block w-10 h-px bg-gold-500/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400/70">
              What students say
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-stone-100">
            Rated 5 stars — everywhere.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLATFORMS.map((platform, i) => (
            <ReviewCard key={platform.id} platform={platform} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
