"use client";

import React from "react";

export function ColoradoCoverageMap() {
  return (
    <div className="w-full bg-[#0a0a0a] border border-white/5 overflow-hidden flex justify-center py-10 md:py-16">
      <div className="relative w-full max-w-5xl px-6">
        <img 
          src="/colorado_map.jpg" 
          alt="Colorado Coverage Map showing routes from Denver to Vail, Aspen, and Boulder"
          className="w-full h-auto object-contain rounded-sm opacity-90 contrast-[1.05]"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))" }}
        />
        
        {/* Simple textual legend matching the monochrome style */}
        <div className="mt-8 flex flex-wrap gap-8 justify-center items-center border-t border-white/10 pt-6">
          <div className="text-center">
            <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-1">Hub</span>
            <span className="text-sm font-semibold text-white">Denver (DIA)</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="text-center">
            <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-1">Destinations</span>
            <span className="text-sm text-white/80">Vail, Aspen, Boulder, & Statewide</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColoradoCoverageMap;
