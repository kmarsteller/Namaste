"use client";

// Music: "Meditation Impromptu 01" by Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons Attribution 4.0 — https://creativecommons.org/licenses/by/4.0/

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OmDraw from "@/components/OmDraw";

// Module-level singleton — one Audio instance for the lifetime of the page,
// never recreated by React renders or StrictMode double-invocation.
let ambientAudio: HTMLAudioElement | null = null;
function getAudio(): HTMLAudioElement {
  if (!ambientAudio) {
    ambientAudio = new Audio("/ambient.mp3");
    ambientAudio.loop = true;
    ambientAudio.volume = 0.35;
  }
  return ambientAudio;
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reversingRef = useRef(false);

  useEffect(() => {
    const v = videoRef.current as HTMLVideoElement;
    if (!v) return;
    let destroyed = false;

    function stepBackward() {
      if (destroyed) return;
      const next = Math.max(0, v.currentTime - 1 / 24);
      v.currentTime = next;
      v.addEventListener(
        "seeked",
        function onSeeked() {
          if (destroyed) return;
          if (next <= 0) {
            reversingRef.current = false;
            v.play().catch(() => {});
          } else {
            stepBackward();
          }
        },
        { once: true }
      );
    }

    function handleEnded() {
      if (destroyed || reversingRef.current) return;
      reversingRef.current = true;
      stepBackward();
    }

    v.play().catch(() => {});
    v.addEventListener("ended", handleEnded);
    const t = setTimeout(() => setLoaded(true), 3000);

    return () => {
      destroyed = true;
      v.removeEventListener("ended", handleEnded);
      clearTimeout(t);
    };
  }, []);

  function toggleMusic() {
    const audio = getAudio();
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* ── Video layer ── */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src="/hero-web.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setLoaded(true)}
      />

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/30 to-stone-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40" />

      {/* ── Warm colour grade ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, rgba(180,100,30,0.13) 0%, rgba(210,140,40,0.07) 50%, rgba(120,60,20,0.10) 100%)", mixBlendMode: "screen" }} />

      {/* ── Lens flare ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Main orb — upper-left, like sun coming through a window */}
        <div style={{
          position: "absolute", top: "-8%", left: "-4%",
          width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,210,120,0.18) 0%, rgba(255,170,60,0.08) 40%, transparent 70%)",
          filter: "blur(18px)",
        }} />
        {/* Secondary soft bloom — slightly offset */}
        <div style={{
          position: "absolute", top: "4%", left: "8%",
          width: "30vw", height: "30vw", maxWidth: 420, maxHeight: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,240,180,0.10) 0%, transparent 65%)",
          filter: "blur(10px)",
        }} />
        {/* Anamorphic streak — thin horizontal bar through the orb */}
        <div style={{
          position: "absolute", top: "12%", left: "-10%",
          width: "60%", height: "2px",
          background: "linear-gradient(to right, transparent, rgba(255,220,140,0.22), rgba(255,240,200,0.10), transparent)",
          filter: "blur(2px)",
          transform: "rotate(-2deg)",
        }} />
        {/* Ghost flare dot — classic secondary lens reflection */}
        <div style={{
          position: "absolute", top: "38%", right: "22%",
          width: "80px", height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,200,100,0.09) 0%, transparent 70%)",
          filter: "blur(6px)",
        }} />
      </div>

      {/* ── Hand-drawn Om ── */}
      <OmDraw trigger={loaded} />

      {/* ── Content ── */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-[1200ms] delay-300 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex justify-center mb-10">
          <Image
            src="/logo-greige.png"
            alt="Namaste Yoga Studio"
            width={340}
            height={120}
            className="w-56 sm:w-72 md:w-80 lg:w-96 h-auto drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
            priority
          />
        </div>

        <p className="font-body font-light text-sm tracking-[0.12em] text-stone-400 max-w-sm mx-auto mb-12">
          A peaceful space for all bodies, all levels, all seasons of life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/classes"
            className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase bg-sage-500 hover:bg-sage-400 text-stone-950 font-medium transition-all duration-300 rounded-sm"
          >
            View Schedule
          </Link>
          <Link
            href="/class-descriptions"
            className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase border border-stone-500/50 text-stone-300 hover:border-stone-300 hover:text-stone-100 transition-all duration-300 rounded-sm"
          >
            Explore Classes
          </Link>
        </div>

        <p className="mt-8 font-body text-xs tracking-[0.12em] text-sage-400/80">
          First in-studio class free &nbsp;·&nbsp; 45+ weekly classes
        </p>

        <div className="mt-6 flex items-center justify-center gap-5">
          <a href="https://www.facebook.com/namasteyogaohio" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-stone-600 hover:text-stone-300 transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/namasteyogaohio" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-stone-600 hover:text-stone-300 transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCcWvYPcl7tXWaGZlu6N5Qlg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-stone-600 hover:text-stone-300 transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-400">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-stone-400 to-transparent animate-pulse" />
      </div>

      {/* ── Ambient music toggle — fixed so it follows the user while scrolling ── */}
      <button
        onClick={toggleMusic}
        aria-label={playing ? "Mute ambient music" : "Play ambient music"}
        className="fixed bottom-8 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-sm border border-stone-600/40 bg-stone-950/60 backdrop-blur-sm text-stone-400 hover:text-stone-200 hover:border-stone-500/60 transition-all duration-200"
      >
        {playing ? (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden>
            <path d="M4 7.5H2a1 1 0 00-1 1v3a1 1 0 001 1h2l4 3V4.5L4 7.5z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 7a4 4 0 010 6" strokeLinecap="round" />
            <path d="M15.5 4.5a7 7 0 010 11" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden>
            <path d="M4 7.5H2a1 1 0 00-1 1v3a1 1 0 001 1h2l4 3V4.5L4 7.5z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 7l-4 4m0-4l4 4" strokeLinecap="round" />
          </svg>
        )}
        <span className="font-body text-[10px] tracking-[0.15em] uppercase">
          {playing ? "Sound: On" : "Sound: Off"}
        </span>
      </button>
    </section>
  );
}
