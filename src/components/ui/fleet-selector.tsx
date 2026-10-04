"use client";

import React, { useState } from "react";

const FLEET = [
  {
    id: "sedan",
    tier: "Executive Sedan",
    name: "Mercedes-Benz S-Class",
    orSimilar: "or similar",
    passengers: 3,
    luggage: 3,
    img: "/fleet_sedan_black.png",
  },
  {
    id: "suv",
    tier: "Full-Size SUV",
    name: "Cadillac Escalade",
    orSimilar: "or similar",
    passengers: 6,
    luggage: 6,
    img: "/fleet_suv_black.png",
  },
  {
    id: "sprinter",
    tier: "Executive Van",
    name: "Mercedes-Benz Sprinter",
    orSimilar: "or similar",
    passengers: 10,
    luggage: 10,
    img: "/fleet_jet_sprinter.png",
  },
];

export function FleetSelector({ onReserve }: { onReserve?: () => void }) {
  const [index, setIndex] = useState(1); // Start on SUV
  const [dir, setDir] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);

  const vehicle = FLEET[index];
  const prev = FLEET[(index - 1 + FLEET.length) % FLEET.length];
  const next = FLEET[(index + 1) % FLEET.length];

  const navigate = (direction: "left" | "right") => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setIndex((i) =>
        direction === "right"
          ? (i + 1) % FLEET.length
          : (i - 1 + FLEET.length) % FLEET.length
      );
      setDir(null);
      setAnimating(false);
    }, 320);
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(100,75,10,0.35) 0%, #080808 65%)",
        minHeight: "580px",
      }}
    >
      {/* ── Left nav ── */}
      <button
        onClick={() => navigate("left")}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 flex items-center gap-2 group z-10"
        aria-label={`Previous: ${prev.name}`}
        style={{ cursor: "pointer" }}
      >
        <span className="text-white/30 group-hover:text-white/80 transition-colors text-lg">‹</span>
        <span className="hidden md:block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 group-hover:text-white/70 transition-colors">
          {prev.tier}
        </span>
      </button>

      {/* ── Right nav ── */}
      <button
        onClick={() => navigate("right")}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex items-center gap-2 group z-10"
        aria-label={`Next: ${next.name}`}
        style={{ cursor: "pointer" }}
      >
        <span className="hidden md:block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 group-hover:text-white/70 transition-colors">
          {next.tier}
        </span>
        <span className="text-white/30 group-hover:text-white/80 transition-colors text-lg">›</span>
      </button>

      {/* ── Vehicle image ── */}
      <div
        className="flex items-center justify-center pt-20 pb-2 px-24"
        style={{ minHeight: "380px" }}
      >
        <img
          key={vehicle.id}
          src={vehicle.img}
          alt={vehicle.name}
          className="max-w-full object-contain drop-shadow-2xl"
          style={{
            maxHeight: "300px",
            width: "auto",
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${dir === "right" ? "-60px" : "60px"}) scale(0.97)`
              : "translateX(0) scale(1)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.95)) brightness(1.05)",
          }}
        />
      </div>

      {/* ── Info ── */}
      <div
        className="text-center pb-10 px-6"
        style={{
          opacity: animating ? 0 : 1,
          transition: "opacity 0.25s ease",
        }}
      >
        {/* Tier label */}
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] mb-3">
          {vehicle.tier}
        </p>

        {/* Name */}
        <h3
          className="text-white leading-none mb-1"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          {vehicle.name}{" "}
          <span
            style={{
              fontSize: "clamp(13px, 1.5vw, 18px)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Georgia, serif",
            }}
          >
            {vehicle.orSimilar}
          </span>
        </h3>

        {/* Specs */}
        <div className="flex items-center justify-center gap-6 mt-4 mb-8">
          {/* Passengers */}
          <div className="flex items-center gap-2 text-white/50">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <circle cx="12" cy="7.5" r="3.2" />
              <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </svg>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase">
              {vehicle.passengers} passengers
            </span>
          </div>

          <span className="text-white/15">|</span>

          {/* Luggage */}
          <div className="flex items-center gap-2 text-white/50">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect x="5.5" y="7.5" width="13" height="12" rx="2" />
              <path d="M9.5 7.5V5.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2" />
            </svg>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase">
              {vehicle.luggage} luggage
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <button
            onClick={onReserve}
            className="px-8 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
            style={{
              background: "#c9a84c",
              color: "#0a0a0a",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d8b85b")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#c9a84c")}
          >
            Reserve
          </button>
          <a
            href="#fleet-section"
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors flex items-center gap-2"
          >
            Explore the full fleet <span>→</span>
          </a>
        </div>
      </div>

      {/* ── Dots indicator ── */}
      <div className="flex items-center justify-center gap-2 pb-6">
        {FLEET.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!animating && i !== index) {
                setDir(i > index ? "right" : "left");
                setAnimating(true);
                setTimeout(() => {
                  setIndex(i);
                  setDir(null);
                  setAnimating(false);
                }, 320);
              }
            }}
            className="rounded-full transition-all"
            style={{
              width: i === index ? "20px" : "6px",
              height: "6px",
              background: i === index ? "#c9a84c" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
            aria-label={FLEET[i].name}
          />
        ))}
      </div>
    </div>
  );
}

export default FleetSelector;
