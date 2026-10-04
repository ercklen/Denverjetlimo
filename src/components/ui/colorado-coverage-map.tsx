"use client";

import React from "react";

export function ColoradoCoverageMap() {
  return (
    <div className="w-full bg-[#0a0a0a] border border-white/5 overflow-hidden flex justify-center py-10 md:py-16">
      <div className="relative w-full max-w-5xl px-6">
        <img 
          src="/colorado_map.png" 
          alt="Colorado Coverage Map showing routes from Denver to Vail, Aspen, and Boulder"
          className="w-full h-auto object-contain rounded-sm opacity-90 contrast-[1.05]"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))" }}
        />
      </div>
    </div>
  );
}

export default ColoradoCoverageMap;
