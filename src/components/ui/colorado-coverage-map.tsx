"use client";

import React from "react";

export function ColoradoCoverageMap() {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-[#c9a84c]/30 shadow-2xl bg-[#0c0c0c] group">
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
        {/* Detailed Map Image */}
        <img
          src="/colorado_coverage_map.png"
          alt="Colorado Luxury Coverage Map"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

        {/* Floating Legend Badge */}
        <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm bg-[#141414]/90 backdrop-blur-md border border-[#c9a84c]/30 rounded-xl p-5 shadow-2xl pointer-events-auto">
          <div className="text-sm font-semibold text-[#f0ebe0] flex items-center gap-2 mb-2 font-serif tracking-wide">
            <span className="inline-block size-3 rounded-full bg-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.6)]" />
            Colorado Network Coverage
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            Premium chauffeur services connecting Denver International Airport (DEN) to Aspen, Vail, Breckenridge, Boulder, and Colorado Springs.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-[#c9a84c]">
            <span>24/7 Availability</span>
            <span>All-Weather Fleet</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColoradoCoverageMap;
