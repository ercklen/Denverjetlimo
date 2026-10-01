"use client";

import React, { useState } from "react";
import Script from "next/script";
import CarouselStacked from "@/components/ui/carousel-07";
import TestimonialsStack from "@/components/ui/testimonials-stack";
import ColoradoCoverageMap from "@/components/ui/colorado-coverage-map";
import HowItWorks from "@/components/ui/how-it-works";
import { ExpandRouteMap } from "@/components/ui/expand-map";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";

/* ─── Fleet Data ─── */
const fleetData = {
  suv: {
    type: "Luxury SUV",
    name: "Cadillac Escalade · GMC Yukon Denali · Chevrolet Suburban",
    img: "fleet_suv_black.png",
    desc: "Spacious luxury SUVs engineered for the highest standards of airport and executive transportation. Premium leather seating, climate control, and professional presentation.",
    specs: [
      { icon: "👤", label: "Up to 6 Passengers" },
      { icon: "🧳", label: "6 Checked Bags" },
      { icon: "📏", label: "Full-Size SUV" },
    ],
    features: ["Premium Leather Seating","Climate Control","USB Charging","Tinted Windows","Professional Chauffeur","Flight Monitoring","Complimentary Water","Airport Pickup Sign"],
  },
  sedan: {
    type: "Executive Sedan",
    name: "Mercedes-Benz S-Class · BMW 7 Series · Cadillac CT6",
    img: "fleet_sedan_black.png",
    desc: "The pinnacle of refined executive transportation. Discreet, elegant and engineered for those who demand the highest level of comfort and privacy for every journey.",
    specs: [
      { icon: "👤", label: "Up to 3 Passengers" },
      { icon: "🧳", label: "3 Bags" },
      { icon: "🎯", label: "Executive Class" },
    ],
    features: ["Heated Massaging Seats","Ambient Lighting","Privacy Glass","Noise Isolation","Wi-Fi Hotspot","Premium Audio","Champagne Welcome","Door-to-Door Service"],
  },
  sprinter: {
    type: "Executive Jet Sprinter",
    name: "Mercedes-Benz Sprinter Executive",
    img: "fleet_jet_sprinter.png",
    desc: "A private jet experience on wheels. Premium transportation for executive teams and groups, featuring reclining captain chairs, ambient mood lighting, and full connectivity.",
    specs: [
      { icon: "👥", label: "Up to 14 Passengers" },
      { icon: "🧳", label: "Up to 14 Bags" },
      { icon: "✨", label: "Extended Headroom" },
    ],
    features: ["Luxurious Leather Seating","Extended Headroom","Premium Sound System","Rear Climate Control","Privacy Tint","USB Charging Ports","Ample Legroom","Group Boarding"],
  },
} as const;

const destItems = [
  { name: 'Downtown Denver', icon: '🌆', time: '~45 min' },
  { name: 'Cherry Creek', icon: '🏡', time: '~50 min' },
  { name: 'Boulder', icon: '⛰', time: '~1h 15min' },
  { name: 'Aurora', icon: '🌇', time: '~35 min' },
  { name: 'Lakewood', icon: '🏘', time: '~55 min' },
  { name: 'Centennial', icon: '🏙', time: '~55 min' },
  { name: 'Englewood', icon: '🏢', time: '~50 min' },
  { name: 'Colorado Springs', icon: '🏔', time: '~2h 10min' },
  { name: 'Vail', icon: '⛷', time: '~2h 30min' },
  { name: 'Aspen', icon: '🌿', time: '~4h' },
];

type FleetType = keyof typeof fleetData;
type ModalType = "comingSoon" | "fleet" | "inquiry" | null;

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [fleetType, setFleetType] = useState<FleetType>("suv");
  const [passengers, setPassengers] = useState(1);
  const [activeVehicle, setActiveVehicle] = useState<FleetType>("suv");

  // Planner Dropdown States
  const [pickup, setPickup] = useState("Denver International Airport (DEN)");
  const [pickupOpen, setPickupOpen] = useState(false);
  const [destSearch, setDestSearch] = useState("");
  const [destOpen, setDestOpen] = useState(false);

  const [routeModalData, setRouteModalData] = useState<{dest: string, time: string, desc: string} | null>(null);

  React.useEffect(() => {
    // Expose a global function so carousel and map can trigger the React Route Modal
    (window as any).openReactRouteModal = (dest: string, time: string, desc: string) => {
      setRouteModalData({ dest, time, desc });
      document.body.classList.add("modal-open");
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#pickupFieldWrapper')) {
        setPickupOpen(false);
      }
      if (!target.closest('#destFieldWrapper')) {
        setDestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const closeModal = () => setActiveModal(null);
  const openComingSoon = () => setActiveModal("comingSoon");
  const openFleet = (type: FleetType) => { setFleetType(type); setActiveModal("fleet"); };
  const openInquiry = () => setActiveModal("inquiry");

  const scrollTo = (id: string, offset = 80) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  const scrollToPlanner = () => scrollTo("planner-section", 100);
  const scrollToFleet   = () => scrollTo("fleet-section");
  const scrollToTop     = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const adjustPassengers = (delta: number) =>
    setPassengers((p) => Math.max(1, Math.min(14, p + delta)));

  const currentFleet = fleetData[fleetType];

  /* close modal when clicking backdrop */
  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <>
    <div className="min-h-screen w-full overflow-x-clip bg-[#0a0a0a] text-white">



{/*  ─── NAVIGATION ───  */}
<nav className="navbar" id="navbar">
  <div className="nav-inner">
    <a href="#" className="nav-logo">
      <span className="logo-icon">✦</span>
      <div className="logo-text">
        <span className="logo-main">DENVER JET LIMO</span>
        <span className="logo-sub">TRANSPORTATION</span>
      </div>
    </a>
    <ul className="nav-links" id="navLinks">
      <li>
        <a href="#airport-section">
          <RandomLetterSwap label="Airport Transfer" staggerDuration={0.02} />
        </a>
      </li>
      <li>
        <a href="#fleet-section">
          <RandomLetterSwap label="Fleet" staggerDuration={0.02} />
        </a>
      </li>
      <li>
        <a href="#destinations-section">
          <RandomLetterSwap label="Destinations" staggerDuration={0.02} />
        </a>
      </li>
      <li>
        <a href="#corporate-section">
          <RandomLetterSwap label="Corporate" staggerDuration={0.02} />
        </a>
      </li>
      <li>
        <a href="#occasions-section">
          <RandomLetterSwap label="Special Events" staggerDuration={0.02} />
        </a>
      </li>
      <li>
        <a href="#about-section">
          <RandomLetterSwap label="About" staggerDuration={0.02} />
        </a>
      </li>
    </ul>
    <button className="btn-gold nav-cta" onClick={scrollToPlanner}>Plan Your Ride</button>
    <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

{/*  ─── HERO ───  */}
<section className="hero" id="home">
  <div className="hero-bg">
    <img src="hero_jet_limo.png" alt="Sleek black executive Jet Sprinter at Denver Airport" className="hero-img" />
    <div className="hero-overlay"></div>
  </div>
  <div className="hero-content reveal">
    <h1 className="hero-headline">
      Aviation-Grade Transportation,<br />From Denver Airport<br /><em>To Your Final Destination.</em>
    </h1>
    <p className="hero-sub">Experience private jet-level luxury on the ground. Executive transportation and premium chauffeur service throughout Denver and Colorado.</p>
    <div className="hero-ctas">
      <button className="btn-gold hero-btn-primary" onClick={scrollToPlanner}>Plan Your Ride</button>
      <a href="#fleet-section" className="btn-ghost hero-btn-secondary">Explore Our Fleet</a>
    </div>
    <div className="trust-bar">
      <span>Discreet Service</span>
      <span className="trust-dot">•</span>
      <span>Jet-Class Vehicles</span>
      <span className="trust-dot">•</span>
      <span>Airport Specialists</span>
    </div>
  </div>
  <div className="hero-scroll-indicator">
    <span>Scroll</span>
    <div className="scroll-line"></div>
  </div>
</section>

{/*  ─── TRIP PLANNER ───  */}
<section className="planner-section" id="planner-section">
  <div className="planner-card">
    <div className="planner-header">
      <span className="planner-eyebrow">Plan Your Journey</span>
      <h2 className="planner-title">Private Airport Transfer</h2>
    </div>
    <div className="planner-form">
      <div className="field-row">
        <div className="form-field" id="pickupFieldWrapper">
          <label>Pickup Location</label>
          <div className="field-input" onClick={() => { setPickupOpen(!pickupOpen); setDestOpen(false); }} style={{ cursor: 'pointer' }}>
            <span className="field-icon">{pickup.includes('Airport') ? '✈' : '📍'}</span>
            <span className="field-value">{pickup}</span>
            <span className="field-arrow">›</span>
          </div>
          <div className={`field-dropdown${pickupOpen ? " open" : ""}`}>
            <div className={`dropdown-item${pickup === "Denver International Airport (DEN)" ? " active" : ""}`} onClick={() => { setPickup("Denver International Airport (DEN)"); setPickupOpen(false); }}>✈ Denver International Airport (DEN)</div>
            <div className={`dropdown-item${pickup === "Custom Location" ? " active" : ""}`} onClick={() => { setPickup("Custom Location"); setPickupOpen(false); }}>📍 Custom Location</div>
          </div>
        </div>
        <div className="field-swap">⇌</div>
        <div className="form-field" id="destFieldWrapper">
          <label>Destination</label>
          <div className="field-input">
            <span className="field-icon">📍</span>
            <input 
              type="text" 
              placeholder="Where are you going?" 
              autoComplete="off" 
              value={destSearch}
              onChange={(e) => {
                setDestSearch(e.target.value);
                setDestOpen(true);
              }}
              onFocus={() => { setDestOpen(true); setPickupOpen(false); }}
            />
          </div>
          <div className={`field-dropdown${destOpen ? " open" : ""}`}>
            {destItems
              .filter(d => d.name.toLowerCase().includes(destSearch.toLowerCase()))
              .map((d, i) => (
                <div 
                  key={i} 
                  className="dropdown-item" 
                  onClick={() => {
                    setDestSearch(d.name);
                    setDestOpen(false);
                  }}
                >
                  {d.icon} {d.name} <span className="dest-dist">{d.time}</span>
                </div>
            ))}
            {destItems.filter(d => d.name.toLowerCase().includes(destSearch.toLowerCase())).length === 0 && (
              <div className="dropdown-item text-gray-400">No destinations found</div>
            )}
          </div>
        </div>
      </div>
      <div className="field-row field-row-three">
        <div className="form-field">
          <label>Date</label>
          <div className="field-input">
            <span className="field-icon">📅</span>
            <input type="date" id="dateInput" min="" />
          </div>
        </div>
        <div className="form-field">
          <label>Pickup Time</label>
          <div className="field-input">
            <span className="field-icon">🕐</span>
            <input type="time" id="timeInput" />
          </div>
        </div>
        <div className="form-field">
          <label>Passengers</label>
          <div className="field-input passenger-selector">
            <span className="field-icon">👤</span>
            <span id="passengerCount">{passengers === 1 ? "1 Passenger" : `${passengers} Passengers`}</span>
            <div className="passenger-controls">
              <button onClick={() => adjustPassengers(-1)}>−</button>
              <button onClick={() => adjustPassengers(1)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className="vehicle-selector-row">
        <label className="vehicle-label">Select Vehicle Class</label>
        <div className="vehicle-options">
          <button
            className={`vehicle-opt${activeVehicle === "suv" ? " active" : ""}`}
            onClick={() => setActiveVehicle("suv")}
            id="vopt-suv"
          >
            <img className="vopt-img" src="vopt_suv.png" alt="Luxury SUV" />
            <span className="vopt-name">Luxury SUV</span>
            <span className="vopt-cap">Up to 6</span>
          </button>
          <button
            className={`vehicle-opt${activeVehicle === "sedan" ? " active" : ""}`}
            onClick={() => setActiveVehicle("sedan")}
            id="vopt-sedan"
          >
            <img className="vopt-img" src="vopt_sedan.png" alt="Executive Sedan" />
            <span className="vopt-name">Executive Sedan</span>
            <span className="vopt-cap">Up to 3</span>
          </button>
          <button
            className={`vehicle-opt${activeVehicle === "sprinter" ? " active" : ""}`}
            onClick={() => setActiveVehicle("sprinter")}
            id="vopt-sprinter"
          >
            <img className="vopt-img" src="vopt_sprinter.png" alt="Sprinter Van" />
            <span className="vopt-name">Sprinter Van</span>
            <span className="vopt-cap">Up to 14</span>
          </button>
        </div>
      </div>
      <div className="planner-actions">
        <button className="btn-gold planner-btn" onClick={openComingSoon}>
          Continue
          <span className="btn-arrow">→</span>
        </button>
        <p className="planner-note">No credit card required to preview</p>
      </div>
    </div>
  </div>
</section>

{/*  ─── STATS BAR ───  */}
<section className="stats-bar">
  <div className="stats-inner">
    <div className="stat-item">
      <span className="stat-num" data-target="5000">0</span><span className="stat-plus">+</span>
      <span className="stat-label">Trips Completed</span>
    </div>
    <div className="stat-divider"></div>
    <div className="stat-item">
      <span className="stat-num" data-target="12">0</span><span className="stat-plus">+</span>
      <span className="stat-label">Vehicle Fleet</span>
    </div>
    <div className="stat-divider"></div>
    <div className="stat-item">
      <span className="stat-num" data-target="98">0</span><span className="stat-pct">%</span>
      <span className="stat-label">On-Time Rate</span>
    </div>
    <div className="stat-divider"></div>
    <div className="stat-item">
      <span className="stat-num" data-target="24">0</span><span className="stat-plus">/7</span>
      <span className="stat-label">Available</span>
    </div>
  </div>
</section>

{/*  ─── AIRPORT SECTION ───  */}
<section className="airport-section section-pad" id="airport-section">
  <div className="container">
    <div className="airport-grid">
      <div className="airport-text reveal">
        <p className="section-eyebrow">Denver International Airport</p>
        <h2 className="section-heading">Your Journey<br />Starts at <em>DEN.</em></h2>
        <p className="section-body">From the moment you land at Denver International Airport, enjoy a private, comfortable and professional transportation experience tailored around your schedule.</p>
        <div className="airport-features">
          <div className="airport-feat">
            <div className="feat-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <h4>Airport Pickup</h4>
              <p>Professional airport pickups with a seamless arrival experience. Your chauffeur waits for you.</p>
            </div>
          </div>
          <div className="airport-feat">
            <div className="feat-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
            </div>
            <div>
              <h4>Flight Monitoring</h4>
              <p>Designed for reliable airport transportation and changing flight schedules. We adapt to your arrival.</p>
            </div>
          </div>
          <div className="airport-feat">
            <div className="feat-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <h4>Meet &amp; Greet</h4>
              <p>Personalized service from the terminal to your vehicle. Your name card held at baggage claim.</p>
            </div>
          </div>
        </div>
        <button className="btn-gold" onClick={scrollToPlanner}>Book Airport Transfer</button>
      </div>
      <div className="airport-image reveal reveal-right">
        <img src="hero_den_airport_1786503942729.jpg" alt="Denver International Airport luxury transfer" className="airport-img" />
        <div className="airport-badge">
          <span className="badge-icon">✈</span>
          <span>DEN · Denver International</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ─── FLEET SECTION ───  */}
<section className="fleet-section section-pad" id="fleet-section">
  <div className="container">
    <div className="section-header reveal">
      <p className="section-eyebrow">Our Fleet</p>
      <h2 className="section-heading">Travel in Comfort.<br /><em>Arrive in Style.</em></h2>
      <p className="section-sub">Choose the vehicle that matches your journey.</p>
    </div>
    <div className="fleet-grid">
      {/*  SUV Card  */}
      <div className="fleet-card reveal">
        <div className="fleet-img-wrap">
          <img src="fleet_suv_black.png" alt="Cadillac Escalade Luxury SUV" className="fleet-img" />
          <div className="fleet-img-overlay"></div>
          <div className="fleet-badge">Most Popular</div>
        </div>
        <div className="fleet-info">
          <div className="fleet-info-top">
            <h3 className="fleet-name">Luxury SUV</h3>
            <p className="fleet-models">Cadillac Escalade · GMC Yukon Denali · Chevrolet Suburban</p>
          </div>
          <p className="fleet-desc">Spacious luxury SUVs designed for airport transfers, families, executives and groups. Maximum comfort for any journey.</p>
          <div className="fleet-specs">
            <span className="spec"><span className="spec-icon">👤</span> Up to 6 passengers</span>
            <span className="spec"><span className="spec-icon">🧳</span> 6 bags</span>
          </div>
          <button className="fleet-cta" onClick={() => openFleet("suv")}>View SUV <span>→</span></button>
        </div>
      </div>
      {/*  Sedan Card  */}
      <div className="fleet-card reveal">
        <div className="fleet-img-wrap">
          <img src="fleet_sedan_black.png" alt="Executive Sedan" className="fleet-img" />
          <div className="fleet-img-overlay"></div>
        </div>
        <div className="fleet-info">
          <div className="fleet-info-top">
            <h3 className="fleet-name">Executive Sedan</h3>
            <p className="fleet-models">Mercedes-Benz S-Class · BMW 7 Series · Cadillac CT6</p>
          </div>
          <p className="fleet-desc">Discreet, refined transportation for executives and private clients. The pinnacle of understated luxury.</p>
          <div className="fleet-specs">
            <span className="spec"><span className="spec-icon">👤</span> Up to 3 passengers</span>
            <span className="spec"><span className="spec-icon">🧳</span> 3 bags</span>
          </div>
          <button className="fleet-cta" onClick={() => openFleet("sedan")}>View Sedan <span>→</span></button>
        </div>
      </div>
      {/*  Jet Sprinter Van Card  */}
      <div className="fleet-card reveal">
        <div className="fleet-img-wrap">
          <img src="fleet_jet_sprinter.png" alt="Executive Jet Sprinter" className="fleet-img" />
          <div className="fleet-img-overlay"></div>
        </div>
        <div className="fleet-info">
          <div className="fleet-info-top">
            <h3 className="fleet-name">Executive Jet Sprinter</h3>
            <p className="fleet-models">Mercedes-Benz Sprinter Executive</p>
          </div>
          <p className="fleet-desc">A private jet experience on wheels. Premium transportation for executive teams, featuring reclining captain chairs and ambient lighting.</p>
          <div className="fleet-specs">
            <span className="spec"><span className="spec-icon">👥</span> Up to 10 passengers</span>
            <span className="spec"><span className="spec-icon">🥂</span> VIP Amenities</span>
          </div>
          <button className="fleet-cta" onClick={() => openFleet("sprinter")}>View Sprinter <span>→</span></button>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ─── WHY CHOOSE US ───  */}
<section className="why-section section-pad" id="about-section">
  <div className="container">
    <div className="section-header reveal">
      <p className="section-eyebrow">Why Denver Jet Limo</p>
      <h2 className="section-heading">More Than<br /><em>a Ride.</em></h2>
    </div>
    <div className="why-grid">
      <div className="why-card reveal">
        <div className="why-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <h3>Professional Chauffeurs</h3>
        <p>Experienced, courteous and professionally presented drivers who treat your time as a priority.</p>
      </div>
      <div className="why-card reveal">
        <div className="why-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <h3>Premium Fleet</h3>
        <p>Luxury vehicles maintained to the highest standards. Immaculate interiors and flawless exteriors guaranteed.</p>
      </div>
      <div className="why-card reveal">
        <div className="why-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
        </div>
        <h3>Airport Specialists</h3>
        <p>Reliable transportation designed around your flight. Real-time tracking adapts to delays and early arrivals.</p>
      </div>
      <div className="why-card reveal">
        <div className="why-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h3>Privacy &amp; Comfort</h3>
        <p>A quiet, comfortable environment from pickup to destination. Your privacy is always respected.</p>
      </div>
      <div className="why-card reveal">
        <div className="why-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
        </div>
        <h3>Available When You Need Us</h3>
        <p>Transportation designed for business, travel and special occasions. Available around the clock, every day.</p>
      </div>
    </div>
  </div>
</section>

{/*  ─── DESTINATIONS ───  */}
<section className="destinations-section section-pad" id="destinations-section">
  <div className="container">
    <div className="section-header reveal">
      <p className="section-eyebrow">Service Area</p>
      <h2 className="section-heading">Where Will We<br /><em>Take You?</em></h2>
      <p className="section-sub">From Denver International Airport to every corner of Colorado.</p>
    </div>
    <div className="my-4">
      <CarouselStacked />
    </div>
  </div>
</section>

{/*  ─── HOW IT WORKS ───  */}
<section className="how-section section-pad" id="how-it-works-section">
  <div className="container">
    <div className="section-header reveal">
      <p className="section-eyebrow">The Process</p>
      <h2 className="section-heading">Three Steps to<br /><em>Your Journey.</em></h2>
      <p className="section-sub">Simple, transparent, and effortlessly arranged airport and private chauffeur travel.</p>
    </div>
    <div className="w-full">
      <HowItWorks />
    </div>
  </div>
</section>

{/*  ─── PREMIUM EXPERIENCE (SPLIT) ───  */}
<section className="experience-section" id="experience-section">
  <div className="experience-left">
    <img src="fleet_escalade_suv_1786503952518.jpg" alt="Luxury chauffeur vehicle interior" className="experience-img" />
    <div className="experience-img-overlay"></div>
  </div>
  <div className="experience-right">
    <div className="experience-content reveal">
      <p className="section-eyebrow">The Denver Jet Limo Standard</p>
      <h2 className="experience-heading">The Difference Is<br />in the <em>Details.</em></h2>
      <p className="experience-body">From immaculate vehicles to professional service, every part of the journey is designed around comfort, privacy and reliability. We don&apos;t just provide transportation — we deliver an experience.</p>
      <ul className="experience-features">
        <li><span className="feat-check">✓</span> Premium vehicles, always immaculate</li>
        <li><span className="feat-check">✓</span> Professional, uniformed chauffeurs</li>
        <li><span className="feat-check">✓</span> Airport transportation specialists</li>
        <li><span className="feat-check">✓</span> Corporate travel programs</li>
        <li><span className="feat-check">✓</span> Private transfers across Colorado</li>
        <li><span className="feat-check">✓</span> Special events and celebrations</li>
      </ul>
      <button className="btn-gold" onClick={scrollToPlanner}>Plan Your Ride</button>
    </div>
  </div>
</section>

{/*  ─── MAP SECTION ───  */}
<section className="map-section section-pad" id="map-section">
  <div className="container">
    <div className="section-header reveal">
      <p className="section-eyebrow">Service Routes</p>
      <h2 className="section-heading">Denver &amp; Colorado<br /><em>Coverage Map.</em></h2>
      <p className="section-sub">Interactive network connecting Denver International Airport (DEN) to mountain ski resorts, universities, and cities.</p>
    </div>
    <div className="w-full mt-8">
      <ColoradoCoverageMap />
    </div>
  </div>
</section>

{/*  ─── TESTIMONIALS ───  */}
<section className="testimonials-section section-pad" id="testimonials-section">
  <div className="container">
    <div className="section-header reveal">
      <p className="section-eyebrow">Client Reviews</p>
      <h2 className="section-heading">What Our Clients<br /><em>Are Saying.</em></h2>
      <p className="section-sub">Verified 5-star experiences from executive travelers, mountain visitors, and event organizers.</p>
    </div>
    <div className="w-full">
      <TestimonialsStack />
    </div>
  </div>
</section>

{/*  ─── CORPORATE ───  */}
<section className="corporate-section section-pad" id="corporate-section">
  <div className="corporate-bg">
    <img src="fleet_sedan_black.png" alt="Executive corporate transportation" className="corp-bg-img" />
    <div className="corp-overlay"></div>
  </div>
  <div className="container">
    <div className="corporate-content reveal">
      <p className="section-eyebrow" style={{"color": "#c9a84c"}}>Corporate Programs</p>
      <h2 className="corporate-heading">Built for<br /><em>Business.</em></h2>
      <p className="corporate-body">Executive transportation for meetings, airport transfers, corporate events and business travel across Denver and Colorado. Reliable, discreet and always on time.</p>
      <div className="corporate-features">
        <div className="corp-feat">
          <span className="corp-feat-icon">✓</span>
          <span>Dedicated corporate accounts</span>
        </div>
        <div className="corp-feat">
          <span className="corp-feat-icon">✓</span>
          <span>Priority scheduling</span>
        </div>
        <div className="corp-feat">
          <span className="corp-feat-icon">✓</span>
          <span>Monthly billing available</span>
        </div>
        <div className="corp-feat">
          <span className="corp-feat-icon">✓</span>
          <span>Multi-vehicle coordination</span>
        </div>
      </div>
      <button className="btn-gold" onClick={openInquiry}>Corporate Transportation</button>
    </div>
  </div>
</section>

{/*  ─── SPECIAL OCCASIONS ───  */}
<section className="occasions-section section-pad" id="occasions-section">
  <div className="container">
    <div className="section-header reveal">
      <p className="section-eyebrow">Special Events</p>
      <h2 className="section-heading">Make the Occasion<br /><em>Extraordinary.</em></h2>
      <p className="section-sub">Whether it&apos;s a wedding, a night out, or a milestone celebration — arrive in style.</p>
    </div>
    <div className="occasions-layout">
      <div className="occasions-img-wrap reveal">
        <img src="fleet_limousine_1786503972144.jpg" alt="Luxury limousine for special occasions" className="occasions-img" />
        <div className="occasions-img-overlay"></div>
      </div>
      <div className="occasions-grid reveal reveal-right">
        <div className="occasion-card">
          <div className="occ-icon">💍</div>
          <h4>Weddings</h4>
          <p>Make your most important day unforgettable.</p>
        </div>
        <div className="occasion-card">
          <div className="occ-icon">🎓</div>
          <h4>Proms</h4>
          <p>Arrive in style for the night you&apos;ll always remember.</p>
        </div>
        <div className="occasion-card">
          <div className="occ-icon">🥂</div>
          <h4>Anniversaries</h4>
          <p>Celebrate in comfort and luxury.</p>
        </div>
        <div className="occasion-card">
          <div className="occ-icon">🎵</div>
          <h4>Concerts</h4>
          <p>Arrive and depart from any venue with ease.</p>
        </div>
        <div className="occasion-card">
          <div className="occ-icon">🏆</div>
          <h4>Sporting Events</h4>
          <p>Broncos, Nuggets, Rockies — travel like a VIP.</p>
        </div>
        <div className="occasion-card">
          <div className="occ-icon">🌃</div>
          <h4>Night Out</h4>
          <p>Explore Denver in style and comfort.</p>
        </div>
        <div className="occasion-card">
          <div className="occ-icon">💼</div>
          <h4>Corporate Events</h4>
          <p>Impress clients and colleagues alike.</p>
        </div>
        <button className="occasion-card cta-card" onClick={openInquiry} style={{cursor:"pointer",background:"transparent",border:"none",textAlign:"left",width:"100%"}}>
          <div className="occ-icon">✦</div>
          <h4>Explore Special Events</h4>
          <p>Inquire about our full events program</p>
          <span className="occ-arrow">→</span>
        </button>
      </div>
    </div>
  </div>
</section>

{/*  ─── FOOTER ───  */}
<footer className="footer">
  <div className="footer-top">
    <div className="footer-brand">
      <div className="footer-logo">
        <span className="logo-icon">✦</span>
        <div className="logo-text">
          <span className="logo-main">DENVER JET LIMO</span>
          <span className="logo-sub">TRANSPORTATION</span>
        </div>
      </div>
      <p className="footer-tagline">Luxury transportation throughout<br />Denver and Colorado.</p>
      <div className="social-links">
        <a href="#" className="social-link" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="#" className="social-link" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" className="social-link" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="#" className="social-link" aria-label="Twitter/X">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
        </a>
      </div>
    </div>
    <div className="footer-nav-group">
      <h4>Services</h4>
      <ul>
        <li><a href="#airport-section">Airport Transportation</a></li>
        <li><a href="#fleet-section">Fleet</a></li>
        <li><a href="#destinations-section">Destinations</a></li>
        <li><a href="#corporate-section">Corporate Transportation</a></li>
        <li><a href="#occasions-section">Special Events</a></li>
      </ul>
    </div>
    <div className="footer-nav-group">
      <h4>Company</h4>
      <ul>
        <li><a href="#about-section">About Us</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToPlanner(); }}>Reservations</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </div>
    <div className="footer-contact">
      <h4>Contact</h4>
      <div className="contact-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>+1 (303) 322-4499</span>
      </div>
      <div className="contact-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <a href="mailto:coloradodenverlimousine@gmail.com">coloradodenverlimousine@gmail.com</a>
      </div>
      <div className="contact-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>Denver, Colorado</span>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <p>© 2026 Denver Jet Limo. All Rights Reserved.</p>
    <div className="footer-bottom-links">
      <a href="/privacy">Privacy Policy</a>
      <span>|</span>
      <a href="/terms">Terms of Service</a>
    </div>
  </div>
</footer>

{/*  ─── MODALS ───  */}

{/*  Coming Soon Modal  */}
<div
  className={`modal-overlay${activeModal === "comingSoon" ? " open" : ""}`}
  id="comingSoonModal"
  onClick={onBackdrop}
>
  <div className="modal-box" style={{ maxWidth: '460px' }}>
    <button className="modal-close" onClick={closeModal}>✕</button>

    {/* Icon */}
    <div className="modal-icon">✦</div>

    {/* Title */}
    <h2 className="modal-title" style={{ marginBottom: '8px' }}>
      Reservations Are<br />Coming Soon
    </h2>
    <p className="modal-body" style={{ marginBottom: '28px' }}>
      Our online booking system is being finalized. In the meantime, call us directly — our team is available 24/7 to arrange your private transfer.
    </p>

    {/* Phone CTA Block */}
    <a
      href="tel:+17205680206"
      onClick={() => {
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {'send_to': 'AW-18485059764/7eS2CIDmoY0dELTBru5E'});
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))',
        border: '1px solid rgba(201,168,76,0.35)',
        borderRadius: '14px',
        padding: '18px 22px',
        marginBottom: '20px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.7)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
    >
      {/* Phone icon */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(201,168,76,0.15)',
        border: '1px solid rgba(201,168,76,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
      }}>
        📞
      </div>
      <div style={{ textAlign: 'left' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
          Call to Reserve — Available 24/7
        </p>
        <p style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-serif, serif)', letterSpacing: '0.05em' }}>
          +1 (303) 322-4499
        </p>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          Speak with a reservation specialist
        </p>
      </div>
    </a>

    {/* Divider */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>or</span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
    </div>

    <div className="modal-actions">
      <button className="btn-gold" onClick={() => { closeModal(); scrollToFleet(); }}>Explore Our Fleet</button>
      <button className="btn-outline" onClick={closeModal}>Close</button>
    </div>
  </div>
</div>

{/*  Fleet Detail Modal  */}
<div
  className={`modal-overlay${activeModal === "fleet" ? " open" : ""}`}
  id="fleetModal"
  onClick={onBackdrop}
>
  <div className="modal-box modal-fleet">
    <button className="modal-close" onClick={closeModal}>✕</button>
    <div className="fleet-modal-img-wrap">
      <img
        id="fleetModalImg"
        src={currentFleet.img}
        alt={currentFleet.name}
        className="fleet-modal-img"
      />
    </div>
    <div className="fleet-modal-content">
      <p className="modal-eyebrow" id="fleetModalType">{currentFleet.type}</p>
      <h2 className="fleet-modal-title" id="fleetModalName">{currentFleet.name}</h2>
      <p className="fleet-modal-desc" id="fleetModalDesc">{currentFleet.desc}</p>
      <div className="fleet-modal-specs" id="fleetModalSpecs">
        {currentFleet.specs.map((s, i) => (
          <div key={i} className="fleet-modal-spec">{s.icon} {s.label}</div>
        ))}
      </div>
      <div className="fleet-modal-features" id="fleetModalFeatures">
        {currentFleet.features.map((f, i) => (
          <span key={i} className="fleet-modal-feat">✓ {f}</span>
        ))}
      </div>
      <button className="btn-gold" onClick={openComingSoon}>Request This Vehicle</button>
    </div>
  </div>
</div>

{/*  Route Preview Modal (React version powered by Framer Motion)  */}
{routeModalData && (
  <div 
    className="modal-overlay open" 
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setRouteModalData(null);
        document.body.classList.remove("modal-open");
      }
    }}
  >
    <ExpandRouteMap 
      destination={routeModalData.dest}
      time={routeModalData.time}
      description={routeModalData.desc}
      onClose={() => {
        setRouteModalData(null);
        document.body.classList.remove("modal-open");
      }}
    />
  </div>
)}

{/*  Inquiry Modal  */}
<div
  className={`modal-overlay${activeModal === "inquiry" ? " open" : ""}`}
  id="inquiryModal"
  onClick={onBackdrop}
>
  <div className="modal-box">
    <button className="modal-close" onClick={closeModal}>✕</button>
    <div className="modal-icon">💼</div>
    <h2 className="modal-title">Corporate &amp; Group<br />Transportation</h2>
    <p className="modal-body">Our corporate inquiry system is being finalized. Soon you&apos;ll be able to set up dedicated accounts, priority scheduling, and custom billing arrangements directly online.</p>
    <div className="modal-actions">
      <button className="btn-gold" onClick={() => { closeModal(); scrollToPlanner(); }}>Explore Reservation Options</button>
      <button className="btn-outline" onClick={closeModal}>Close</button>
    </div>
  </div>
</div>

{/*  Floating Call Icon  */}
<a 
  href="tel:+17205680206" 
  className="floating-call-btn" 
  aria-label="Call Us"
  onClick={() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {'send_to': 'AW-18485059764/7eS2CIDmoY0dELTBru5E'});
    }
  }}
>
  <svg className="call-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
</a>

      <Script src="/script.js" strategy="lazyOnload" />
    </div>

{/*  Mobile Menu — outside overflow-x-clip wrapper so it isn't clipped  */}
<div className={`mobile-menu${menuOpen ? " open" : ""}`}>
  <button className="mobile-close" aria-label="Close menu" onClick={closeMenu}>✕</button>
  <ul>
    <li><a href="#airport-section" onClick={closeMenu}>Airport Transfer</a></li>
    <li><a href="#fleet-section" onClick={closeMenu}>Fleet</a></li>
    <li><a href="#destinations-section" onClick={closeMenu}>Destinations</a></li>
    <li><a href="#corporate-section" onClick={closeMenu}>Corporate</a></li>
    <li><a href="#occasions-section" onClick={closeMenu}>Special Events</a></li>
    <li><a href="#about-section" onClick={closeMenu}>About</a></li>
  </ul>
  <button className="btn-gold mobile-cta" onClick={() => { closeMenu(); scrollToPlanner(); }}>Plan Your Ride</button>
</div>

    </>
  );
}
