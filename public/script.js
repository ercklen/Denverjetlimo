/* ─── APEX CHAUFFEUR — MAIN JAVASCRIPT ─── */

'use strict';

// ═══════════════════════════════════════════════
// NAVBAR — scroll behavior
// ═══════════════════════════════════════════════
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ═══════════════════════════════════════════════
// MOBILE MENU (vanilla fallback — React handles this now)
// ═══════════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.classList.remove('modal-open');
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.classList.add('modal-open');
  });
}

if (mobileClose) {
  mobileClose.addEventListener('click', closeMobileMenu);
}

// ═══════════════════════════════════════════════
// SCROLL TO PLANNER
// ═══════════════════════════════════════════════
function scrollToPlanner() {
  const planner = document.getElementById('planner-section');
  if (planner) {
    const top = planner.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// ═══════════════════════════════════════════════
// TRIP PLANNER — Pickup dropdown
// ═══════════════════════════════════════════════
let passengers = 1;

function togglePickupDropdown() {
  const dd = document.getElementById('pickupDropdown');
  dd.classList.toggle('open');
  // Close dest dropdown
  document.getElementById('destDropdown').classList.remove('open');
}

function selectPickup(val) {
  document.getElementById('pickupValue').textContent = val;
  document.getElementById('pickupDropdown').classList.remove('open');
}

// ═══════════════════════════════════════════════
// TRIP PLANNER — Destination dropdown
// ═══════════════════════════════════════════════
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

function showDestDropdown() {
  document.getElementById('destDropdown').classList.add('open');
  document.getElementById('pickupDropdown').classList.remove('open');
}

function filterDestinations(val) {
  const dd = document.getElementById('destDropdown');
  const lower = val.toLowerCase();
  const filtered = lower
    ? destItems.filter(d => d.name.toLowerCase().includes(lower))
    : destItems;

  dd.innerHTML = filtered.map(d =>
    `<div class="dropdown-item" onclick="selectDest('${d.name}')">
      ${d.icon} ${d.name} <span class="dest-dist">${d.time}</span>
    </div>`
  ).join('');

  dd.classList.add('open');
}

function selectDest(val) {
  document.getElementById('destInput').value = val;
  document.getElementById('destDropdown').classList.remove('open');
}

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
  const pickupDD = document.getElementById('pickupDropdown');
  const destDD = document.getElementById('destDropdown');
  const pickupField = document.getElementById('pickupField');
  const destWrapper = document.getElementById('destFieldWrapper');

  if (!pickupField.contains(e.target) && !pickupDD.contains(e.target)) {
    pickupDD.classList.remove('open');
  }
  if (!destWrapper.contains(e.target) && !destDD.contains(e.target)) {
    destDD.classList.remove('open');
  }
});

// ═══════════════════════════════════════════════
// PASSENGERS
// ═══════════════════════════════════════════════
function adjustPassengers(delta) {
  passengers = Math.max(1, Math.min(14, passengers + delta));
  const label = passengers === 1 ? '1 Passenger' : `${passengers} Passengers`;
  document.getElementById('passengerCount').textContent = label;
}

// ═══════════════════════════════════════════════
// VEHICLE SELECTOR
// ═══════════════════════════════════════════════
function selectVehicle(btn, name) {
  document.querySelectorAll('.vehicle-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ═══════════════════════════════════════════════
// SET MIN DATE
// ═══════════════════════════════════════════════
const dateInput = document.getElementById('dateInput');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
  dateInput.value = `${yyyy}-${mm}-${dd}`;
}

// ═══════════════════════════════════════════════
// MODALS
// ═══════════════════════════════════════════════
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.classList.add('modal-open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  if (!document.querySelector('.modal-overlay.open')) {
    document.body.classList.remove('modal-open');
  }
}

function closeModalOnBg(event, id) {
  if (event.target === document.getElementById(id)) {
    closeModal(id);
  }
}

function openComingSoonModal() {
  openModal('comingSoonModal');
}

function openInquiryModal() {
  openModal('inquiryModal');
}

// Escape key closes modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.classList.remove('modal-open');
  }
});

// ═══════════════════════════════════════════════
// FLEET MODAL DATA
// ═══════════════════════════════════════════════
const fleetData = {
  suv: {
    type: 'Luxury SUV',
    name: 'Cadillac Escalade · GMC Yukon Denali · Chevrolet Suburban',
    img: 'fleet_escalade_suv_1786503952518.jpg',
    desc: 'Spacious luxury SUVs engineered for the highest standards of airport and executive transportation. Spacious interiors with premium leather seating, climate control, and professional presentation.',
    specs: [
      { icon: '👤', label: 'Up to 6 Passengers' },
      { icon: '🧳', label: '6 Checked Bags' },
      { icon: '📏', label: 'Full-Size SUV' },
    ],
    features: ['Premium Leather Seating', 'Climate Control', 'USB Charging', 'Tinted Windows', 'Professional Chauffeur', 'Flight Monitoring', 'Complimentary Water', 'Airport Pickup Sign']
  },
  sedan: {
    type: 'Executive Sedan',
    name: 'Mercedes-Benz S-Class · BMW 7 Series · Cadillac CT6',
    img: 'fleet_executive_sedan_1786503961868.jpg',
    desc: 'The pinnacle of refined executive transportation. Discreet, elegant and engineered for those who demand the highest level of comfort and privacy for every journey.',
    specs: [
      { icon: '👤', label: 'Up to 3 Passengers' },
      { icon: '🧳', label: '3 Bags' },
      { icon: '🎯', label: 'Executive Class' },
    ],
    features: ['Heated Massaging Seats', 'Ambient Lighting', 'Privacy Glass', 'Noise Isolation', 'Wi-Fi Hotspot', 'Premium Audio', 'Champagne Welcome', 'Door-to-Door Service']
  },
  sprinter: {
    type: 'Sprinter Van',
    name: 'Mercedes-Benz Sprinter Executive',
    img: 'vopt_sprinter.jpg',
    desc: 'Premium transportation for groups, corporate roadshows, and extended families. Spacious, comfortable, and luxurious for all your travel needs throughout Denver and Colorado.',
    specs: [
      { icon: '👥', label: 'Up to 14 Passengers' },
      { icon: '🧳', label: 'Up to 14 Bags' },
      { icon: '✨', label: 'Extended Headroom' },
    ],
    features: ['Luxurious Leather Seating', 'Extended Headroom', 'Premium Sound System', 'Rear Climate Control', 'Privacy Tint', 'USB Charging Ports', 'Ample Legroom', 'Group Boarding']
  }
};

function openFleetModal(type) {
  const data = fleetData[type];
  if (!data) return;

  document.getElementById('fleetModalType').textContent = data.type;
  document.getElementById('fleetModalName').textContent = data.name;
  document.getElementById('fleetModalImg').src = data.img;
  document.getElementById('fleetModalImg').alt = data.name;
  document.getElementById('fleetModalDesc').textContent = data.desc;

  const specsEl = document.getElementById('fleetModalSpecs');
  specsEl.innerHTML = data.specs.map(s =>
    `<div class="fleet-modal-spec">${s.icon} ${s.label}</div>`
  ).join('');

  const featEl = document.getElementById('fleetModalFeatures');
  featEl.innerHTML = data.features.map(f =>
    `<span class="fleet-modal-feat">✓ ${f}</span>`
  ).join('');

  openModal('fleetModal');
}

// ═══════════════════════════════════════════════
// ROUTE MODAL
// ═══════════════════════════════════════════════
function openRouteModal(dest, time, desc) {
  document.getElementById('routeTitle').textContent = `DEN → ${dest}`;
  document.getElementById('routeDestName').textContent = dest;
  document.getElementById('routeTime').textContent = `Est. ${time}`;
  document.getElementById('routeDesc').textContent = desc;
  openModal('routeModal');
}

// ═══════════════════════════════════════════════
// TESTIMONIALS CAROUSEL
// ═══════════════════════════════════════════════
let currentSlide = 0;
const track = document.getElementById('testimonialsTrack');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
const totalSlides = cards.length;

function buildDots() {
  const container = document.getElementById('carouselDots');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    container.appendChild(dot);
  }
}

function updateCarousel() {
  if (!track) return;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function carouselNext() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
  resetAutoPlay();
}

function carouselPrev() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
  resetAutoPlay();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetAutoPlay();
}

// Auto-play
let autoPlayTimer;
function startAutoPlay() {
  autoPlayTimer = setInterval(carouselNext, 5500);
}

function resetAutoPlay() {
  clearInterval(autoPlayTimer);
  startAutoPlay();
}

buildDots();
startAutoPlay();

// Touch swipe for testimonials
let touchStartX = 0;
if (track) {
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) carouselNext();
      else carouselPrev();
    }
  }, { passive: true });
}

// ═══════════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ═══════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const startVal = 0;

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ═══════════════════════════════════════════════
// MAP — highlight route on hover
// ═══════════════════════════════════════════════
document.querySelectorAll('.map-city').forEach(city => {
  const dest = city.dataset.dest;

  city.addEventListener('mouseenter', () => {
    // Dim all routes
    document.querySelectorAll('.route-line').forEach(line => {
      line.style.opacity = '0.15';
      line.style.strokeWidth = '1';
    });
    // Highlight this route
    const route = document.querySelector(`.route-line[data-dest="${dest}"]`);
    if (route) {
      route.style.opacity = '1';
      route.style.strokeWidth = '2.5';
    }
  });

  city.addEventListener('mouseleave', () => {
    document.querySelectorAll('.route-line').forEach(line => {
      line.style.opacity = '0.6';
      line.style.strokeWidth = '1.5';
    });
  });
});

// ═══════════════════════════════════════════════
// PARALLAX & ZOOM — hero image on scroll
// ═══════════════════════════════════════════════
const heroImg = document.querySelector('.hero-img');

if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      if (window.innerWidth <= 600) {
        // Mobile: Zoom out on scroll
        const scale = Math.max(1, 1.25 - (scrollY / window.innerHeight) * 0.25);
        heroImg.style.transform = `scale(${scale})`;
      } else {
        // Desktop: Parallax translate
        heroImg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
      }
    }
  }, { passive: true });
}

// ═══════════════════════════════════════════════
// SMOOTH ANCHOR LINKS
// ═══════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ═══════════════════════════════════════════════
// VEHICLE CARD TILT EFFECT (Desktop)
// ═══════════════════════════════════════════════
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.fleet-card, .dest-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      card.style.transform = `translateY(-8px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ═══════════════════════════════════════════════
// FOOTER YEAR
// ═══════════════════════════════════════════════
// Already hardcoded as 2026 in HTML

// ═══════════════════════════════════════════════
// PAGE LOAD ANIMATION
// ═══════════════════════════════════════════════
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ═══════════════════════════════════════════════
// DESTINATION CARD SWIPE (Mobile fleet)
// ═══════════════════════════════════════════════
let fleetTouchStartX = 0;
const fleetGrid = document.querySelector('.fleet-grid');

if (fleetGrid) {
  fleetGrid.addEventListener('touchstart', e => {
    fleetTouchStartX = e.touches[0].clientX;
  }, { passive: true });
}
