"use client";

import React, { useState } from "react";
import Script from "next/script";

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

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
    <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

{/*  Mobile Menu  */}
<div className={`mobile-menu${menuOpen ? " open" : ""}`}>
  <button className="mobile-close" aria-label="Close menu" onClick={closeMenu}>✕</button>
  <ul>
    <li><a href="/#airport-section" onClick={closeMenu}>Airport Transfer</a></li>
    <li><a href="/#fleet-section" onClick={closeMenu}>Fleet</a></li>
    <li><a href="/#destinations-section" onClick={closeMenu}>Destinations</a></li>
    <li><a href="/#corporate-section" onClick={closeMenu}>Corporate</a></li>
    <li><a href="/#about-section" onClick={closeMenu}>About</a></li>
  </ul>
  <a href="/#planner-section" className="btn-gold mobile-cta" style={{"textDecoration": "none", "textAlign": "center"}} onClick={closeMenu}>Plan Your Ride</a>
</div>

{/*  ─── HEADER ───  */}
<header className="page-hero">  {/*  Google Consent Mode v2 Default  */}
  



  <h1 className="page-title">Contact Us</h1>
  <p className="page-sub">We are here to assist you with reservations, special requests, and inquiries. Reach out to our concierge team 24/7.</p>
</header>

{/*  ─── CONTACT SECTION ───  */}
<section className="contact-container">
  <div className="contact-info-panel">
    <h3>Get in Touch</h3>
    <p>Our dedicated team is ready to ensure your journey is seamless from start to finish. Whether you need an immediate airport transfer or are planning complex corporate transportation, we are at your service.</p>
    
    <div className="contact-method">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <div className="c-method-details">
        <h4>Phone</h4>
        <p><a href="tel:+17205680206">+1 (720) 568-0206</a></p>
        <p style={{"fontSize": "0.8rem", "marginTop": "4px"}}>Available 24/7 for immediate assistance</p>
      </div>
    </div>
    
    <div className="contact-method">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      <div className="c-method-details">
        <h4>Email</h4>
        <p><a href="mailto:coloradodenverlimousine@gmail.com">coloradodenverlimousine@gmail.com</a></p>
        <p style={{"fontSize": "0.8rem", "marginTop": "4px"}}>Expect a response within 2 hours</p>
      </div>
    </div>
    
    <div className="contact-method">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      <div className="c-method-details">
        <h4>Headquarters</h4>
        <p>Denver, Colorado</p>
        <p style={{"fontSize": "0.8rem", "marginTop": "4px"}}>Serving the greater metropolitan area and beyond</p>
      </div>
    </div>
  </div>
  
  <div className="contact-form-panel">
    <form className="contact-form" >
      <div className="field-row">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" required placeholder="Enter your first name" />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" required placeholder="Enter your last name" />
        </div>
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" required placeholder="Enter your email" />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input type="tel" placeholder="Enter your phone number (optional)" />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea required placeholder="How can we assist you?"></textarea>
      </div>
      <button type="submit" className="btn-gold">Send Inquiry</button>
    </form>
  </div>
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
      <h4>Services</h4>
      <ul>
        <li><a href="/#airport-section">Airport Transportation</a></li>
        <li><a href="/#fleet-section">Fleet</a></li>
        <li><a href="/#destinations-section">Destinations</a></li>
        <li><a href="/#corporate-section">Corporate</a></li>
      </ul>
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
    <div className="footer-contact">
      <h4>Contact</h4>
      <div className="contact-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>+1 (720) 568-0206</span>
      </div>
      <div className="contact-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <a href="mailto:coloradodenverlimousine@gmail.com">coloradodenverlimousine@gmail.com</a>
      </div>
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
