"use client";

// Paths extracted directly from Kohinoor Devanagari font (macOS system font)
// using fontTools. Scaled to fit viewBox="0 0 200 215".
// Drawing order: main body → tail curl → visor arc → dot

import { useEffect, useState } from "react";

// Each stroke uses pathLength="1" so dasharray/dashoffset are in [0,1] — no
// need to pre-compute actual path lengths.
const STROKES = [
  {
    // Main body — the "3" shape with both loops and inner detail
    d: "M 60.2,123.5 L 60.2,122.8 C 66.2,119.5 72.8,112.5 72.8,100.6 C 72.8,84.8 60.9,74.0 44.3,74.0 C 32.2,74.0 23.3,79.2 18.2,85.5 L 27.1,93.9 C 30.5,89.9 35.2,85.9 43.6,85.9 C 53.6,85.9 59.5,92.2 59.5,101.1 C 59.5,113.7 50.6,119.1 33.4,120.5 L 35.5,132.6 L 42.5,131.7 C 43.6,131.6 45.5,131.4 46.6,131.4 C 58.3,131.4 64.6,138.7 64.6,147.5 C 64.6,156.9 58.3,165.8 44.6,165.8 C 31.2,165.8 24.0,157.1 20.5,151.5 L 10.0,159.9 C 15.2,167.8 26.3,178.3 44.1,178.3 C 63.0,178.3 73.5,167.2 75.8,156.4 C 79.1,162.3 86.4,170.4 98.9,170.4 C 111.3,170.4 119.9,162.7 126.9,153.1 C 131.7,163.4 141.2,173.2 158.0,173.2 C 178.5,173.2 190.0,151.7 190.0,133.0 C 190.0,110.2 177.1,97.8 159.9,97.8 C 142.1,97.8 133.8,116.9 124.2,134.0 C 116.5,147.3 109.7,158.3 97.8,158.3 C 85.2,158.3 81.7,148.3 77.0,139.1 C 73.1,131.7 68.4,125.6 60.2,123.5 Z",
    delay: 0.5,
    dur: 7.0,
  },
  {
    // Tail curl — the small teardrop loop at the tip of the tail
    d: "M 156.2,161.3 C 145.4,161.3 137.7,152.7 133.8,142.0 C 134.4,141.2 134.7,140.5 135.2,139.6 C 144.3,123.9 150.6,110.0 160.8,110.0 C 169.7,110.0 176.9,118.1 176.9,131.0 C 176.9,149.2 167.6,161.3 156.2,161.3 Z",
    delay: 7.2,
    dur: 2.4,
  },
  {
    // Visor arc — the crescent above the body
    d: "M 152.4,64.6 L 142.1,59.5 C 137.7,67.7 128.3,74.4 115.5,74.4 C 102.7,74.4 93.8,67.5 89.2,59.3 L 78.7,64.6 C 84.3,76.1 96.4,86.2 115.5,86.2 C 134.5,86.2 146.8,76.1 152.4,64.6 Z",
    delay: 9.2,
    dur: 2.2,
  },
  {
    // Dot — diamond shape at the top
    d: "M 116,37.5 L 125,46.5 L 116,55.5 L 107,46.5 Z",
    delay: 11.0,
    dur: 1.4,
  },
];

export default function OmDraw({ trigger }: { trigger: boolean }) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setGo(true), 500);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]">
      <svg
        viewBox="0 0 200 215"
        className="w-[104vmin] max-w-[880px] opacity-[0.11]"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {STROKES.map((s, i) => (
          <path
            key={i}
            d={s.d}
            pathLength="1"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: go ? 0 : 1,
              transition: go
                ? `stroke-dashoffset ${s.dur}s cubic-bezier(0.37, 0, 0.63, 1) ${s.delay}s`
                : "none",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
