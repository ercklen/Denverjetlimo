"use client";

import React from "react";
import { Map, MapMarker, MarkerContent, MarkerTooltip } from "@/components/ui/mapcn-marker-tooltip";

interface LocationDestination {
  id: string;
  name: string;
  category: string;
  timeFromDEN: string;
  lng: number;
  lat: number;
  isHub?: boolean;
}

const COLORADO_LOCATIONS: LocationDestination[] = [
  {
    id: "den-airport",
    name: "Denver International Airport (DEN)",
    category: "Primary Airport Hub",
    timeFromDEN: "Departure Point",
    lng: -104.6737,
    lat: 39.8561,
    isHub: true,
  },
  {
    id: "downtown-denver",
    name: "Downtown Denver / LoDo",
    category: "Metro & Business District",
    timeFromDEN: "~45 min",
    lng: -104.9903,
    lat: 39.7392,
  },
  {
    id: "cherry-creek",
    name: "Cherry Creek North",
    category: "Luxury Shopping & Dining",
    timeFromDEN: "~50 min",
    lng: -104.9547,
    lat: 39.7175,
  },
  {
    id: "boulder",
    name: "Boulder & CU Campus",
    category: "University & Tech Corridor",
    timeFromDEN: "~55 min",
    lng: -105.2705,
    lat: 40.0150,
  },
  {
    id: "vail",
    name: "Vail & Beaver Creek",
    category: "World-Class Ski Resort",
    timeFromDEN: "~2 hrs 10 min",
    lng: -106.3742,
    lat: 39.6403,
  },
  {
    id: "breckenridge",
    name: "Breckenridge & Summit County",
    category: "Mountain Ski Village",
    timeFromDEN: "~1 hr 55 min",
    lng: -106.0384,
    lat: 39.4817,
  },
  {
    id: "aspen",
    name: "Aspen & Snowmass",
    category: "Premier Mountain Resort",
    timeFromDEN: "~3 hrs 45 min",
    lng: -106.8175,
    lat: 39.1911,
  },
  {
    id: "colorado-springs",
    name: "Colorado Springs / The Broadmoor",
    category: "Southern Colorado & Resorts",
    timeFromDEN: "~1 hr 20 min",
    lng: -104.8214,
    lat: 38.8339,
  },
  {
    id: "steamboat",
    name: "Steamboat Springs",
    category: "Northern Mountain Resort",
    timeFromDEN: "~3 hrs 30 min",
    lng: -106.8317,
    lat: 40.4850,
  },
];

export function ColoradoCoverageMap() {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-[#c9a84c]/30 shadow-2xl bg-[#0c0c0c]">
      <div className="h-[480px] sm:h-[540px] lg:h-[600px] w-full relative">
        <Map
          center={[-105.6, 39.55]}
          zoom={7.2}
          theme="dark"
          className="size-full"
        >
          {COLORADO_LOCATIONS.map((loc) => (
            <MapMarker
              key={loc.id}
              longitude={loc.lng}
              latitude={loc.lat}
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).openReactRouteModal && !loc.isHub) {
                  (window as any).openReactRouteModal(
                    loc.name,
                    loc.timeFromDEN,
                    `${loc.category} transport from Denver International Airport.`
                  );
                }
              }}
            >
              <MarkerContent>
                {loc.isHub ? (
                  <div className="relative flex items-center justify-center size-7 rounded-full bg-[#c9a84c] border-2 border-white shadow-[0_0_15px_rgba(201,168,76,0.9)] animate-bounce cursor-pointer pointer-events-auto">
                    <span className="text-black text-[12px] font-bold">✈</span>
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center size-5 rounded-full bg-[#161616] border-2 border-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.6)] transition-transform duration-300 hover:scale-125 cursor-pointer pointer-events-auto">
                    <div className="size-2 rounded-full bg-[#c9a84c]" />
                  </div>
                )}
              </MarkerContent>

              <MarkerTooltip className="bg-[#121212] border border-[#c9a84c]/50 p-3 text-left shadow-2xl min-w-[200px] rounded-xl backdrop-blur-md pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#f0ebe0] font-serif">
                    {loc.name}
                  </span>
                </div>
                <div className="text-[11px] text-[#c9a84c] font-medium">
                  {loc.category}
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-stone-300 border-t border-white/10 pt-1.5">
                  <span>From DEN:</span>
                  <span className="font-semibold text-white bg-[#c9a84c]/20 px-1.5 py-0.5 rounded text-[#e4c97e]">
                    {loc.timeFromDEN}
                  </span>
                </div>
              </MarkerTooltip>
            </MapMarker>
          ))}
        </Map>
      </div>

      {/* Floating Legend Badge */}
      <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#141414]/90 backdrop-blur-md border border-[#c9a84c]/25 rounded-xl p-3.5 shadow-xl text-left pointer-events-auto">
        <div className="text-xs font-semibold text-[#f0ebe0] flex items-center gap-2 mb-1.5 font-serif">
          <span className="inline-block size-2.5 rounded-full bg-[#c9a84c]" />
          Interactive Colorado Network
        </div>
        <p className="text-[11px] text-stone-300 leading-tight">
          Hover or tap any pin to view private chauffeur transit times from Denver International Airport.
        </p>
      </div>
    </div>
  );
}

export default ColoradoCoverageMap;
