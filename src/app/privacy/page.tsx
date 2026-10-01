"use client";

import React from "react";
import Script from "next/script";

export default function PrivacyPage() {
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
  



  <h1 className="page-title">Privacy Policy</h1>
  <p style={{"color": "var(--text-muted)"}}>Last Updated: August 2026</p>
</header>

<section className="legal-content">
  <h2>1. Introduction</h2>
  <p>At Denvertrip, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
  
  <h2>2. The Data We Collect About You</h2>
  <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
  <ul>
    <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title.</li>
    <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
    <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of transportation services you have purchased from us.</li>
  </ul>

  <h2>3. How We Use Your Personal Data</h2>
  <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
  <ul>
    <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., providing chauffeur services).</li>
    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
    <li>Where we need to comply with a legal obligation.</li>
  </ul>

  <h2>4. Data Security</h2>
  <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
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
