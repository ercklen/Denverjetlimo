"use client";

import React from "react";
import Script from "next/script";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      


{/*  ─── NAVIGATION ───  */}
<nav className="navbar" id="navbar">
  <div className="nav-inner">
    <a href="/" className="nav-logo">
      <span className="logo-icon">✦</span>
      <div className="logo-text">
        <span className="logo-main">DENVER</span>
        <span className="logo-sub">TRIP</span>
      </div>
    </a>
    <ul className="nav-links" id="navLinks">
      <li><a href="/#airport-section">Airport Transfer</a></li>
      <li><a href="/#fleet-section">Fleet</a></li>
      <li><a href="/#destinations-section">Destinations</a></li>
      <li><a href="/#corporate-section">Corporate</a></li>
      <li><a href="/#about-section">About</a></li>
    </ul>
    <a href="/#planner-section" className="btn-gold nav-cta" style={{"textDecoration": "none", "textAlign": "center"}}>Plan Your Ride</a>
  </div>
</nav>

<header className="page-hero">  {/*  Google Consent Mode v2 Default  */}
  



  <h1 className="page-title">Terms of Service</h1>
  <p style={{"color": "var(--text-muted)"}}>Last Updated: August 2026</p>
</header>

<section className="legal-content">
  <h2>1. Agreement to Terms</h2>
  <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the service.</p>
  
  <h2>2. Reservations and Cancellations</h2>
  <p>All reservations are subject to availability. We require a minimum of 24 hours notice for any cancellations or changes to your reservation. Cancellations made less than 24 hours before the scheduled pickup time may be subject to a cancellation fee up to the full amount of the reservation.</p>

  <h2>3. Passenger Conduct</h2>
  <p>Denvertrip reserves the right to refuse service to any passenger who exhibits inappropriate behavior, appears intoxicated, or poses a threat to the chauffeur or vehicle. Smoking, drug use, and the consumption of alcohol by minors are strictly prohibited in all of our vehicles.</p>

  <h2>4. Liability</h2>
  <p>Denvertrip is not liable in the event of mechanical breakdown while on charter and will only be responsible for making up lost time at a mutually agreed date. The client assumes full financial liability for any damage to the vehicle caused during the duration of the rental by them or any members of their party.</p>
  
  <h2>5. Changes to Terms</h2>
  <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
</section>

{/*  ─── FOOTER ───  */}
<footer className="footer">
  <div className="footer-top">
    <div className="footer-brand">
      <div className="footer-logo">
        <span className="logo-icon">✦</span>
        <div className="logo-text">
          <span className="logo-main">DENVER</span>
          <span className="logo-sub">TRIP</span>
        </div>
      </div>
      <p className="footer-tagline">Luxury transportation throughout<br />Denver and Colorado.</p>
    </div>
    <div className="footer-nav-group">
      <h4>Company</h4>
      <ul>
        <li><a href="/#about-section">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="#" className="cookie-settings-link">Cookie Settings</a>
      <span>|</span>
      <a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <p>© 2026 Denvertrip. All Rights Reserved.</p>
    <div className="footer-bottom-links">
      <a href="#" className="cookie-settings-link">Cookie Settings</a>
      <span>|</span>
      <a href="/privacy">Privacy Policy</a>
      <span>|</span>
      <a href="/terms">Terms of Service</a>
    </div>
  </div>
</footer>


      <Script src="/script.js" strategy="lazyOnload" />
    </div>
  );
}
