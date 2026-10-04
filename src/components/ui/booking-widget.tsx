"use client";

import React, { useState } from "react";
import { ChevronDown, Calendar, ChevronRight } from "lucide-react";

type TripMode = "transfer" | "hourly";

export function BookingWidget() {
  const [mode, setMode] = useState<TripMode>("transfer");

  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 mb-20 relative z-20 px-6">
      <div className="bg-[#161616] border border-white/5 shadow-2xl rounded-sm p-8">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("transfer")}
              className={`px-6 py-2 text-xs font-semibold tracking-wider rounded-sm transition-colors ${
                mode === "transfer" 
                  ? "bg-[#ffffff]/10 text-[#ffffff]" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              TRANSFER
            </button>
            <button
              onClick={() => setMode("hourly")}
              className={`px-6 py-2 text-xs font-semibold tracking-wider rounded-sm transition-colors ${
                mode === "hourly" 
                  ? "bg-[#ffffff]/10 text-[#ffffff]" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              HOURLY
            </button>
          </div>
          <button className="text-[#ffffff] text-sm hover:text-white transition-colors">
            Login
          </button>
        </div>

        {/* Inputs Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          
          {/* Pickup */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
              Pick up address
            </label>
            <input 
              type="text" 
              placeholder="Enter a location" 
              className="bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#ffffff] transition-colors"
            />
          </div>

          {/* Dropoff */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
              Drop off address
            </label>
            <input 
              type="text" 
              placeholder="Enter a location" 
              disabled={mode === "hourly"}
              className={`bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#ffffff] transition-colors ${mode === "hourly" ? "opacity-30 cursor-not-allowed" : ""}`}
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
              Pick up date
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="mm/dd/yyyy" 
                className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#ffffff] transition-colors pr-8"
              />
              <Calendar className="w-4 h-4 text-[#ffffff] absolute right-0 top-0 opacity-70" />
            </div>
          </div>

          {/* Time */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
              Pick up time
            </label>
            <div className="relative cursor-pointer">
              <select className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white focus:outline-none focus:border-[#ffffff] transition-colors appearance-none cursor-pointer">
                <option value="7:00 AM">7:00 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#ffffff] absolute right-0 top-0 opacity-70 pointer-events-none" />
            </div>
          </div>

          {/* Passengers */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
              Num. Passengers
            </label>
            <div className="relative">
              <input 
                type="number" 
                min="1"
                placeholder="Num. Pass" 
                className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#ffffff] transition-colors pr-8"
              />
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <button className="bg-[#ffffff] hover:bg-[#e5e5e5] text-black text-xs font-semibold tracking-widest uppercase px-8 py-3 rounded-sm flex items-center gap-2 transition-colors">
            Quote <ChevronRight className="w-4 h-4" />
          </button>
          
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="w-4 h-4 border border-white/30 rounded-sm bg-transparent group-hover:border-[#ffffff] flex items-center justify-center transition-colors">
              <input type="checkbox" className="opacity-0 absolute w-0 h-0" />
            </div>
            <span className="text-[10px] font-semibold text-white/50 tracking-wider uppercase group-hover:text-white/80 transition-colors">
              Add a return trip
            </span>
          </label>
        </div>

      </div>
    </div>
  );
}

export default BookingWidget;
