"use client";

import React, { useState } from "react";

const FLEET = [
  {
    id: "maybach",
    tier: "Flagship Sedan",
    name: "Mercedes-Benz Maybach S-Class",
    orSimilar: "or similar",
    description: "The pinnacle of chauffeured luxury. Extended wheelbase, handcrafted leather interior, and whisper-quiet cabin — designed for executives who demand the very best.",
    features: ["Executive rear suite", "Massage seats", "Privacy glass", "Climate partition"],
    passengers: 3,
    luggage: 3,
    img: "/fleet_maybach.png",
  },
  {
    id: "escalade",
    tier: "Full-Size SUV",
    name: "Cadillac Escalade",
    orSimilar: "or similar",
    description: "America's flagship luxury SUV. Commanding presence with expansive seating and generous cargo capacity — the preferred choice for airport transfers and executive travel.",
    features: ["6 captain-chair seats", "Panoramic sunroof", "Bose sound system", "Heated & cooled seats"],
    passengers: 6,
    luggage: 6,
    img: "/fleet_escalade.png",
  },
  {
    id: "yukon",
    tier: "Premium SUV",
    name: "GMC Yukon Denali",
    orSimilar: "or similar",
    description: "Denali-grade luxury with a refined ride. Ideal for group transfers and mountain runs, delivering premium comfort across every Colorado route.",
    features: ["6 passengers", "Magnetic ride control", "Denali trim package", "All-weather capability"],
    passengers: 6,
    luggage: 6,
    img: "/fleet_yukon.png",
  },
  {
    id: "sprinter",
    tier: "Executive Van",
    name: "Mercedes-Benz Sprinter",
    orSimilar: "or similar",
    description: "A private jet experience on wheels. Custom captain's chairs, ambient mood lighting, and a club layout make this the ultimate group transfer vehicle for ski resorts and corporate events.",
    features: ["Up to 14 passengers", "Captain's chairs", "Mood lighting", "Onboard WiFi"],
    passengers: 14,
    luggage: 12,
    img: "/fleet_sprinter.png",
  },
];

export function FleetSelector({ onReserve }: { onReserve?: () => void }) {
  const [index, setIndex] = useState(1);
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
        direction === "right" ? (i + 1) % FLEET.length : (i - 1 + FLEET.length) % FLEET.length
      );
      setDir(null);
      setAnimating(false);
    }, 320);
  };

  const goTo = (i: number) => {
    if (animating || i === index) return;
    setDir(i > index ? "right" : "left");
    setAnimating(true);
    setTimeout(() => { setIndex(i); setDir(null); setAnimating(false); }, 320);
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(90,65,5,0.4) 0%, #080808 65%)",
        minHeight: "620px",
      }}
    >
      {/* ── Left nav ── */}
      <button
        onClick={() => navigate("left")}
        className="absolute left-4 md:left-10 top-[40%] -translate-y-1/2 flex flex-col items-center gap-1 group z-10"
        aria-label={`Previous: ${prev.name}`}
      >
        <span className="text-white/25 group-hover:text-white/70 transition-colors text-2xl leading-none">‹</span>
        <span className="hidden md:block text-[9px] font-semibold tracking-[0.18em] uppercase text-white/25 group-hover:text-white/60 transition-colors text-center max-w-[80px]">
          {prev.tier}
        </span>
      </button>

      {/* ── Right nav ── */}
      <button
        onClick={() => navigate("right")}
        className="absolute right-4 md:right-10 top-[40%] -translate-y-1/2 flex flex-col items-center gap-1 group z-10"
        aria-label={`Next: ${next.name}`}
      >
        <span className="text-white/25 group-hover:text-white/70 transition-colors text-2xl leading-none">›</span>
        <span className="hidden md:block text-[9px] font-semibold tracking-[0.18em] uppercase text-white/25 group-hover:text-white/60 transition-colors text-center max-w-[80px]">
          {next.tier}
        </span>
      </button>

      {/* ── Vehicle image ── */}
      <div className="flex items-center justify-center pt-16 pb-0 px-28" style={{ minHeight: "340px" }}>
        <img
          key={vehicle.id}
          src={vehicle.img}
          alt={vehicle.name}
          className="max-w-full object-contain"
          style={{
            maxHeight: "320px",
            width: "auto",
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${dir === "right" ? "-50px" : "50px"}) scale(0.96)`
              : "translateX(0) scale(1)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.8)) brightness(1.05)",
          }}
        />
      </div>

      {/* ── Info ── */}
      <div
        className="text-center pb-8 px-6 md:px-16"
        style={{ opacity: animating ? 0 : 1, transition: "opacity 0.25s ease" }}
      >
        {/* Tier */}
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/60 mb-2">
          {vehicle.tier}
        </p>

        {/* Name */}
        <h3
          className="text-white leading-none mb-1"
          style={{
            fontSize: "clamp(22px, 3.5vw, 44px)",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {vehicle.name}{" "}
          <span style={{ fontSize: "clamp(12px, 1.3vw, 16px)", color: "rgba(255,255,255,0.35)", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            {vehicle.orSimilar}
          </span>
        </h3>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed max-w-xl mx-auto mt-3 mb-5">
          {vehicle.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mb-6">
          {vehicle.features.map((f, i) => (
            <span key={i} className="flex items-center gap-1.5 text-[11px] text-white/40 tracking-wide">
              <span className="text-white text-xs">✓</span>
              {f}
            </span>
          ))}
        </div>

        {/* Specs row */}
        <div className="flex items-center justify-center gap-6 mb-7">
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
            className="px-8 py-3 text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors"
            style={{ background: "#ffffff", color: "#0a0a0a" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#e5e5e5")}
            onMouseLeave={e => (e.currentTarget.style.background = "#ffffff")}
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

      {/* ── Dot indicator ── */}
      <div className="flex items-center justify-center gap-2 pb-6">
        {FLEET.map((v, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={v.name}
            className="rounded-full transition-all"
            style={{
              width: i === index ? "22px" : "6px",
              height: "6px",
              background: i === index ? "#ffffff" : "rgba(255,255,255,0.18)",
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default FleetSelector;
