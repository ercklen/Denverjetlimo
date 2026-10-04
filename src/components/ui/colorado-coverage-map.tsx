"use client";

import React from "react";

export function ColoradoCoverageMap() {
  return (
    <div className="w-full relative overflow-hidden bg-[#0d0d0d] border border-white/5 group">
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
        {/* Detailed Map Image */}
        <img
          src="/colorado_coverage_map.png"
          alt="Colorado Luxury Coverage Map"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Floating Legend */}
        <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm bg-black/80 backdrop-blur-md border border-white/10 p-5 pointer-events-auto">
          <div className="text-xs font-semibold text-white flex items-center gap-2 mb-2 tracking-wider uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
            Colorado Network Coverage
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            Premium chauffeur services connecting Denver International Airport (DEN) to Aspen, Vail, Breckenridge, Boulder, and Colorado Springs.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-white/40">
            <span>24/7 Availability</span>
            <span>All-Weather Fleet</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColoradoCoverageMap;
