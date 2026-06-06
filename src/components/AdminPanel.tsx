"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type SaveState = "idle" | "saving" | "saved" | "error";

function useNoticeEditor(apiPath: string) {
  const [notice, setNotice] = useState("");
  const [savedAt, setSavedAt] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    fetch(apiPath)
      .then((r) => r.json())
      .then((d) => {
        setNotice(d.notice ?? "");
        if (d.updatedAt) setSavedAt(new Date(d.updatedAt).toLocaleString());
      })
      .catch(() => {});
  }, [apiPath]);

  const save = async () => {
    setSaveState("saving");
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notice }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSavedAt(new Date(data.updatedAt).toLocaleString());
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 4000);
    }
  };

  const clear = () => {
    if (notice === "") return;
    if (confirm("Clear this notice? It will be hidden from the website.")) setNotice("");
  };

  return { notice, setNotice, savedAt, saveState, save, clear };
}

// ── Reusable notice editor card ────────────────────────────────────────────
function NoticeCard({
  title,
  description,
  pageHref,
  pageLabel,
  accentClass,
  accentBarClass,
  labelText,
  placeholder,
  apiPath,
}: {
  title: string;
  description: string;
  pageHref: string;
  pageLabel: string;
  accentClass: string;
  accentBarClass: string;
  labelText: string;
  placeholder: string;
  apiPath: string;
}) {
  const { notice, setNotice, savedAt, saveState, save, clear } =
    useNoticeEditor(apiPath);

  return (
    <div className="rounded-sm border border-stone-800/70 bg-stone-900/40 p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-light text-stone-100 mb-1">{title}</h2>
        <p className="font-body text-xs text-stone-500 leading-relaxed">
          {description}{" "}
          <Link
            href={pageHref}
            target="_blank"
            className="text-stone-400 hover:text-stone-200 underline underline-offset-2 transition-colors"
          >
            {pageLabel} →
          </Link>
        </p>
      </div>

      <textarea
        value={notice}
        onChange={(e) => setNotice(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full bg-stone-950/70 border border-stone-700/60 focus:border-stone-500 focus:outline-none rounded-sm px-4 py-3 font-body text-sm text-stone-200 placeholder:text-stone-700 leading-relaxed resize-y transition-colors duration-200"
      />
      <p className="font-body text-[10px] text-stone-700 mt-1.5 text-right">
        {notice.length} characters
      </p>

      {/* Preview */}
      {notice.trim() && (
        <div className={`mt-4 rounded-sm border px-4 py-4 flex gap-3 ${accentClass}`}>
          <div className={`w-0.5 flex-shrink-0 rounded-full self-stretch ${accentBarClass}`} />
          <div>
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-stone-500 mb-1.5">
              Preview
            </p>
            <p className="font-body text-sm text-stone-300 leading-relaxed whitespace-pre-wrap">
              {notice}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          onClick={clear}
          disabled={notice === ""}
          className="font-body text-xs text-stone-600 hover:text-stone-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors tracking-wide"
        >
          Clear notice
        </button>
        <div className="flex items-center gap-4">
          {savedAt && saveState === "idle" && (
            <span className="font-body text-[10px] text-stone-600 tracking-wide">
              Last saved {savedAt}
            </span>
          )}
          {saveState === "saved" && (
            <span className="font-body text-[10px] text-sage-400 tracking-wide">✓ Saved</span>
          )}
          {saveState === "error" && (
            <span className="font-body text-[10px] text-red-400 tracking-wide">
              Save failed — try again
            </span>
          )}
          <button
            onClick={save}
            disabled={saveState === "saving"}
            className={`px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-body font-medium text-xs tracking-[0.18em] uppercase rounded-sm transition-all duration-200 ${labelText}`}
          >
            {saveState === "saving" ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main admin panel ────────────────────────────────────────────────────────
export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-stone-950">

      {/* ── Header ── */}
      <header className="border-b border-stone-800/60 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-greige.png"
              alt="Namaste Yoga Studio"
              width={120}
              height={42}
              className="h-7 w-auto opacity-60"
            />
            <span className="text-stone-700 text-sm select-none">·</span>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500">
              Admin
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/workshops"
              target="_blank"
              className="font-body text-xs text-stone-600 hover:text-stone-300 transition-colors tracking-wide"
            >
              Workshops ↗
            </Link>
            <Link
              href="/classes"
              target="_blank"
              className="font-body text-xs text-stone-600 hover:text-stone-300 transition-colors tracking-wide"
            >
              Classes ↗
            </Link>
            <Link
              href="/"
              className="font-body text-xs text-stone-600 hover:text-stone-300 transition-colors tracking-wide"
            >
              ← Site
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">

        {/* Page title */}
        <div className="mb-2">
          <h1 className="font-display text-3xl font-light text-stone-200 mb-1">
            Site Management
          </h1>
          <p className="font-body text-xs text-stone-600 tracking-wide">
            Changes save instantly and appear on the live site on the next page load.
          </p>
        </div>

        {/* Workshop notice */}
        <NoticeCard
          title="Workshop Notice"
          description="Appears as a highlighted callout at the top of the"
          pageHref="/workshops"
          pageLabel="Workshops & Events page"
          accentClass="border-gold-500/20 bg-gold-500/5"
          accentBarClass="bg-gold-500/40"
          labelText="bg-gold-500/90 hover:bg-gold-400"
          placeholder="e.g. • Renee Hill returns April 19th for Sound Bath & Yin, 2:30–4pm."
          apiPath="/api/workshop-notice"
        />

        {/* Classes notice */}
        <NoticeCard
          title="Classes Notice"
          description="Appears as a highlighted callout at the top of the"
          pageHref="/classes"
          pageLabel="Classes & Schedule page"
          accentClass="border-sage-600/20 bg-sage-900/10"
          accentBarClass="bg-sage-500/40"
          labelText="bg-sage-500 hover:bg-sage-400"
          placeholder="e.g. Studio closed Monday, May 26 for Memorial Day."
          apiPath="/api/classes-notice"
        />

        {/* Placeholder for future sections */}
        <div className="rounded-sm border border-stone-800/40 border-dashed px-6 py-5 text-center">
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-700">
            More admin tools coming soon
          </p>
        </div>

      </div>
    </div>
  );
}
