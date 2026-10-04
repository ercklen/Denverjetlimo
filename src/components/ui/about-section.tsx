import React from "react";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 sm:py-32 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-6 block">
              Who we are
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Just tell us what you need,<br/>
              <span className="text-white/50">we'll make it happen.</span>
            </h2>
            
            <div className="space-y-6 text-[#a3a3a3] text-lg font-light leading-relaxed">
              <p>
                Denver Jet Limo is a leading luxury transportation company in Colorado. With years of experience in the industry, our team of professionals provides top-notch service tailored to any unique travel requirement. Whether you're traveling alone for an important event or coordinating transportation for a group vacation, corporate outing, or international trip, we've got you covered.
              </p>
              <p>
                At Denver Jet Limo, our clients' satisfaction is always our top priority. We take every detail into consideration to ensure a seamless travel experience, wherever in the state your journey takes you. With us, you are in good hands and will always receive the high-quality service you deserve.
              </p>
            </div>
            
            <div className="mt-10">
              <a href="#booking" className="inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-medium px-8 py-4 rounded-sm hover:bg-transparent hover:text-white border border-white transition-colors duration-300">
                Reserve your ride
              </a>
            </div>
          </div>

          {/* Right: Image Grid / Bento style */}
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="col-span-2 h-64 sm:h-80 relative rounded-lg overflow-hidden">
              <img 
                src="/hero_jet_limo.png" 
                alt="Denver Jet Limo Service" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-75"
              />
            </div>
            <div className="h-48 sm:h-64 relative rounded-lg overflow-hidden bg-[#111]">
              <img 
                src="/fleet_escalade.png" 
                alt="Luxury SUV" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-75"
              />
            </div>
            <div className="h-48 sm:h-64 relative rounded-lg overflow-hidden bg-[#111]">
              <img 
                src="/fleet_sprinter.png" 
                alt="Executive Sprinter" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-75"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;
