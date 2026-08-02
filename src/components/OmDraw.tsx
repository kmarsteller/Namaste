"use client";

// Paths extracted directly from the studio's logo SVG (logo-black.svg).
// Each subpath traces the outline of one element of the Om badge.
// Drawing order: outer circle → main body → right oval → visor arc → diamond dot

import { useEffect, useState } from "react";

const STROKES = [
  {
    // Outer circle
    d: "M53.17 17.14C93.63 13.74 123.95 58.08 100.68 93.51C96.66 99.63 91.49 104.82 85.37 108.86C78.47 113.43 70.62 115.63 62.49 116.63C55.88 117.44 48.56 116.25 42.31 114.18C0.26 100.26 -4.26 40.7 36.39 21.86C41.66 19.41 47.31 17.63 53.17 17.14Z",
    delay: 0.5,
    dur: 4.0,
  },
  {
    // Main Om body
    d: "M70.5 76.11C73.57 79.8 74.96 84.01 79.94 85.86C99.38 93.11 107.5 58.62 90.48 50.02C82.94 46.21 74.99 50.49 71.38 57.55C69.66 60.91 69.06 64.44 66.67 67.5C62.97 72.28 55.64 75.16 50.2 71.5C52.75 66.79 56.86 63.83 54.1 57.75C50.34 49.5 31.51 45.78 26.17 53.52C27.28 55.57 28.39 57.62 29.5 59.67C33.18 59.17 41.51 54.33 43.38 60.51C45.98 69.12 34.87 66.98 32.42 70.5C32.93 72.38 33.08 76.66 34.56 77.97C35.35 78.66 51.64 79.51 45.75 87.58C39.68 95.91 32.48 86.44 27.4 84.14C25.77 83.4 23.03 85.09 22.28 86.5C25.3 98.15 46.63 106.27 54.88 95.72C57.26 92.69 57.79 88.51 56.59 84.87C56.21 83.71 54.79 82.29 54.91 81.17C56.66 80.07 59.42 81.05 61.45 80.57C64.84 79.77 67.38 76.87 70.5 76.11Z",
    delay: 4.2,
    dur: 5.5,
  },
  {
    // Right oval bump
    d: "M83.85 57.8C93.73 56.61 94.52 76.85 85.11 77.51C76.04 78.15 75.29 58.83 83.85 57.8Z",
    delay: 9.4,
    dur: 1.8,
  },
  {
    // Visor arc
    d: "M40.5 35.45C39.82 36.8 39.14 38.15 38.47 39.5C46.95 45.57 57.19 53.97 68.46 49.61C71.87 48.3 74.62 45.83 77.5 43.67C75.17 41.21 72.83 38.76 70.5 36.3C64.47 39.04 59.48 41.33 52.51 39.64C48.82 38.75 44.15 35.31 40.5 35.45Z",
    delay: 10.8,
    dur: 2.0,
  },
  {
    // Diamond dot
    d: "M58.5 23.94C56.1 26.12 53.7 28.31 51.29 30.5C53.7 32.83 56.1 35.15 58.5 37.48C60.76 35.15 63.02 32.83 65.28 30.5C63.02 28.31 60.76 26.12 58.5 23.94Z",
    delay: 12.4,
    dur: 1.2,
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
        viewBox="-10 13 125 110"
        className="w-[104vmin] max-w-[880px] opacity-[0.11]"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
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
