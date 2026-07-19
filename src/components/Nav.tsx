"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

// ── Nav structure ─────────────────────────────────────────────────────────────
type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; href?: never; children: { label: string; href: string }[] };

const NAV: NavItem[] = [
  {
    label: "Yoga",
    children: [
      { label: "Classes", href: "/classes" },
      { label: "Workshops", href: "/workshops" },
      { label: "Class Descriptions", href: "/class-descriptions" },
      { label: "New Students", href: "/new-students" },
    ],
  },
  {
    label: "Studio",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Faculty", href: "/instructors" },
      { label: "Contact", href: "/contact" },
      { label: "Mindful Musings", href: "/mindful-musings" },
      { label: "Yoga Teacher Training", href: "/teacher-training" },
    ],
  },
  {
    label: "Shop",
    children: [
      { label: "Buy Passes", href: "/pricing" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Custom Event", href: "/customize-your-event" },
    ],
  },
];

// ── Dropdown item ─────────────────────────────────────────────────────────────
function DropdownMenu({
  item,
  onClose,
}: {
  item: NavItem & { children: { label: string; href: string }[] };
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 font-body text-xs tracking-[0.18em] uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300"
      >
        {item.label}
        <ChevronDown
          size={11}
          className={`transition-transform duration-200 opacity-60 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[200px] transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {/* Arrow */}
        <div className="flex justify-center mb-0">
          <div className="w-2 h-2 rotate-45 bg-stone-900 border-l border-t border-stone-700/60 -mb-1 relative z-10" />
        </div>
        <ul className="bg-stone-900/95 backdrop-blur-md border border-stone-700/60 rounded-sm shadow-2xl overflow-hidden">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => { setOpen(false); onClose(); }}
                className="block px-5 py-3 font-body text-xs tracking-[0.18em] uppercase text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 transition-all duration-150"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

// ── Main nav ──────────────────────────────────────────────────────────────────
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-stone-950/90 backdrop-blur-md border-b border-stone-800/60"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="/logo-greige.png"
            alt="Namaste Yoga Studio"
            width={160}
            height={56}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label} item={item} onClose={() => {}} />
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-xs tracking-[0.18em] uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Book CTA */}
        <Link
          href="/classes"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.18em] uppercase border border-sage-500/60 text-sage-300 hover:bg-sage-700/30 hover:border-sage-400 transition-all duration-300 rounded-sm"
        >
          First In-Studio Class Free
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-stone-400 hover:text-stone-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        } bg-stone-950/95 backdrop-blur-md border-t border-stone-800/40`}
      >
        <ul className="flex flex-col px-6 py-6 gap-1">
          {NAV.map((item) =>
            item.children ? (
              <li key={item.label}>
                {/* Group toggle */}
                <button
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                  }
                  className="flex items-center justify-between w-full py-3 font-body text-sm tracking-[0.15em] uppercase text-stone-400 hover:text-stone-100 transition-colors"
                >
                  {item.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 opacity-50 ${
                      mobileExpanded === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Sub-items */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileExpanded === item.label ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="pl-4 pb-2 flex flex-col gap-1 border-l border-stone-800/60 ml-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => { setOpen(false); setMobileExpanded(null); }}
                          className="block py-2 font-body text-xs tracking-[0.18em] uppercase text-stone-500 hover:text-stone-200 transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-body text-sm tracking-[0.15em] uppercase text-stone-400 hover:text-stone-100 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}

          <li className="pt-3">
            <Link
              href="/classes"
              onClick={() => setOpen(false)}
              className="inline-flex px-5 py-2.5 text-xs tracking-[0.18em] uppercase border border-sage-500/60 text-sage-300 hover:bg-sage-700/30 transition-all rounded-sm"
            >
              First In-Studio Class Free
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
