"use client";

import React, { useState } from "react";

// ─── Coordinate System ────────────────────────────────────────────────────────
// Viewport: 1200 x 600
// Lon range: 112°W → 99°W  (width 13°)   x = (112 - lon) / 13 * 1200
// Lat range: 35°N  → 43°N  (height 8°)   y = (43  - lat) / 8  * 600
// → Colorado fills ~65% of the width and ~50% of the height (nicely centered)

function toXY(lon: number, lat: number) {
  return { x: ((112 - lon) / 13) * 1200, y: ((43 - lat) / 8) * 600 };
}

// ─── Colorado state outline ────────────────────────────────────────────────────
// Colorado is nearly rectangular; add a slight southern-border dip for realism
const CO_POLY = [
  toXY(109.06, 41.003),  // NW
  toXY(102.052, 41.003), // NE
  toXY(102.052, 36.993), // SE
  toXY(109.06,  36.993), // SW
];
const COLORADO_PATH =
  `M ${CO_POLY[0].x} ${CO_POLY[0].y} ` +
  CO_POLY.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ") +
  " Z";

// Clipping check
const CO = { lonW: 109.06, lonE: 102.052, latN: 41.003, latS: 36.993 };
function isInColorado(lon: number, lat: number) {
  return lon <= CO.lonW && lon >= CO.lonE && lat <= CO.latN && lat >= CO.latS;
}

// ─── Dot grid ─────────────────────────────────────────────────────────────────
const GRID = 15; // SVG px spacing
const dots: { cx: number; cy: number; inside: boolean }[] = [];
for (let px = GRID / 2; px < 1200; px += GRID) {
  for (let py = GRID / 2; py < 600; py += GRID) {
    const lon = 112 - (px / 1200) * 13;
    const lat = 43  - (py / 600) * 8;
    dots.push({ cx: px, cy: py, inside: isInColorado(lon, lat) });
  }
}

// ─── Destinations ─────────────────────────────────────────────────────────────
const HUB = {
  id: "den", name: "Denver International Airport", shortName: "DEN AIRPORT",
  lon: 104.674, lat: 39.856, distance: "Hub", drive: "—", tag: "Airport Hub", isHub: true,
};

const DESTINATIONS = [
  { id: "boulder",       name: "Boulder",           lon: 105.270, lat: 40.015, distance: "30 mi",  drive: "45 min",   tag: "City" },
  { id: "fort-collins",  name: "Fort Collins",      lon: 105.084, lat: 40.585, distance: "65 mi",  drive: "1h 10min", tag: "City" },
  { id: "co-springs",    name: "Colorado Springs",  lon: 104.821, lat: 38.834, distance: "70 mi",  drive: "1h 15min", tag: "City" },
  { id: "breckenridge",  name: "Breckenridge",      lon: 106.038, lat: 39.482, distance: "85 mi",  drive: "1h 30min", tag: "Ski Resort" },
  { id: "vail",          name: "Vail",              lon: 106.374, lat: 39.643, distance: "100 mi", drive: "1h 45min", tag: "Ski Resort" },
  { id: "keystone",      name: "Keystone",          lon: 105.964, lat: 39.607, distance: "80 mi",  drive: "1h 25min", tag: "Ski Resort" },
  { id: "aspen",         name: "Aspen",             lon: 106.818, lat: 39.191, distance: "200 mi", drive: "3h 15min", tag: "Luxury Resort" },
  { id: "steamboat",     name: "Steamboat Springs", lon: 106.832, lat: 40.485, distance: "160 mi", drive: "2h 45min", tag: "Ski Resort" },
  { id: "telluride",     name: "Telluride",         lon: 107.812, lat: 37.938, distance: "330 mi", drive: "5h 30min", tag: "Luxury Resort" },
  { id: "glenwood",      name: "Glenwood Springs",  lon: 107.325, lat: 39.551, distance: "160 mi", drive: "2h 30min", tag: "Resort Town" },
  { id: "durango",       name: "Durango",           lon: 107.880, lat: 37.275, distance: "340 mi", drive: "5h 45min", tag: "City" },
  { id: "pueblo",        name: "Pueblo",            lon: 104.609, lat: 38.254, distance: "110 mi", drive: "1h 45min", tag: "City" },
  { id: "grand-jct",     name: "Grand Junction",    lon: 108.551, lat: 39.064, distance: "245 mi", drive: "4h",       tag: "City" },
  { id: "winter-park",   name: "Winter Park",       lon: 105.763, lat: 39.887, distance: "67 mi",  drive: "1h 15min", tag: "Ski Resort" },
  { id: "crested-butte", name: "Crested Butte",     lon: 106.988, lat: 38.870, distance: "230 mi", drive: "3h 45min", tag: "Ski Resort" },
  { id: "copper",        name: "Copper Mountain",   lon: 106.149, lat: 39.502, distance: "78 mi",  drive: "1h 25min", tag: "Ski Resort" },
];

type AnyDest = typeof HUB | typeof DESTINATIONS[number];

export function ColoradoCoverageMap() {
  const [active, setActive]   = useState<AnyDest | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const allPins: AnyDest[] = [HUB, ...DESTINATIONS];
  const hub = toXY(HUB.lon, HUB.lat);

  return (
    <div className="w-full bg-[#080808] border border-white/5 overflow-hidden">
      {/* Map SVG */}
      <div className="relative w-full" style={{ paddingBottom: "50%" }}>
        <svg
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          onClick={() => setActive(null)}
        >
          {/* Background */}
          <rect width="1200" height="600" fill="#080808" />

          {/* Colorado land silhouette */}
          <path d={COLORADO_PATH} fill="#111111" />

          {/* Dot grid */}
          {dots.map((d, i) => {
            const nearHub = Math.hypot(d.cx - hub.x, d.cy - hub.y) < 40;
            const nearDest = d.inside && DESTINATIONS.some(dest => {
              const p = toXY(dest.lon, dest.lat);
              return Math.hypot(d.cx - p.x, d.cy - p.y) < 22;
            });
            const r   = nearHub ? 2.0 : d.inside ? 1.4 : 1.0;
            const fill = nearHub ? "#c9a84c" : nearDest ? "#9a7830" : d.inside ? "#2e2e2e" : "#181818";
            const opacity = nearHub ? 0.75 : nearDest ? 0.55 : d.inside ? 0.9 : 0.55;
            return <circle key={i} cx={d.cx} cy={d.cy} r={r} fill={fill} opacity={opacity} />;
          })}

          {/* Colorado border */}
          <path d={COLORADO_PATH} fill="none" stroke="#303030" strokeWidth="1.5" />

          {/* Route lines */}
          {DESTINATIONS.map(dest => {
            const dp  = toXY(dest.lon, dest.lat);
            const lit = hovered === dest.id || active?.id === dest.id;
            return (
              <line key={`l-${dest.id}`}
                x1={hub.x} y1={hub.y} x2={dp.x} y2={dp.y}
                stroke="#c9a84c" strokeWidth={lit ? 1.3 : 0.5}
                strokeDasharray="4 7" opacity={lit ? 0.55 : 0.13}
                style={{ transition: "all 0.3s" }}
              />
            );
          })}

          {/* Pins */}
          {allPins.map(dest => {
            const p         = toXY(dest.lon, dest.lat);
            const isActive  = active?.id === dest.id;
            const isHov     = hovered === dest.id;
            const isHub     = Boolean("isHub" in dest && dest.isHub);
            const highlight = Boolean(isActive || isHov);
            const labelText = isHub ? (dest as typeof HUB).shortName : dest.name.toUpperCase();
            const labelW    = labelText.length * (isHub ? 6.8 : 5.8) + 18;

            return (
              <g key={dest.id} style={{ cursor: "pointer" }}
                onClick={e => { e.stopPropagation(); setActive(isActive ? null : dest); }}
                onMouseEnter={() => setHovered(dest.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Hub always-pulse */}
                {isHub && (
                  <circle cx={p.x} cy={p.y} r={10} fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.2">
                    <animate attributeName="r" from="7" to="18" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.35" to="0" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Hover pulse */}
                {highlight && (
                  <circle cx={p.x} cy={p.y} r={isHub ? 20 : 12} fill="none" stroke="#c9a84c" strokeWidth="0.8">
                    <animate attributeName="r" from={isHub ? 10 : 6} to={isHub ? 24 : 16} dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.45" to="0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Outer ring */}
                <circle cx={p.x} cy={p.y}
                  r={isHub ? 9 : highlight ? 6 : 4.5}
                  fill="none"
                  stroke={highlight || isHub ? "#c9a84c" : "#6b5320"}
                  strokeWidth={isHub ? 1.5 : 1}
                  style={{ transition: "all 0.2s" }}
                />
                {/* Center dot */}
                <circle cx={p.x} cy={p.y}
                  r={isHub ? 5 : highlight ? 3.2 : 2.2}
                  fill={highlight || isHub ? "#c9a84c" : "#6b5320"}
                  style={{ transition: "all 0.2s" }}
                />
                {/* Label */}
                {(isHub || highlight) && (
                  <g>
                    <rect x={p.x + (isHub ? 13 : 9)} y={p.y - 10}
                      width={labelW} height={20} rx={2} fill="#c9a84c" />
                    <text x={p.x + (isHub ? 19 : 15)} y={p.y + 4}
                      fontSize={isHub ? "9.5" : "8.5"} fontWeight="700"
                      letterSpacing="0.1em" fill="#0a0a0a"
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      {labelText}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Info panel */}
        {active && (
          <div className="absolute bottom-4 left-4 w-60 bg-black/90 backdrop-blur border border-white/10 p-5 pointer-events-none">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c9a84c] mb-1">
              {"tag" in active ? active.tag : "Hub"}
            </p>
            <h3 className="text-sm font-semibold text-white mb-3">{active.name}</h3>
            {"distance" in active && active.distance !== "Hub" && (
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">From DEN</p>
                  <p className="text-sm font-semibold text-white">{active.distance}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Drive Time</p>
                  <p className="text-sm font-semibold text-white">{"drive" in active ? active.drive : "—"}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] inline-block" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Hub / Destination</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="22" height="2" viewBox="0 0 22 2">
              <line x1="0" y1="1" x2="22" y2="1" stroke="#c9a84c" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.5"/>
            </svg>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Service Route</span>
          </div>
        </div>
      </div>

      {/* Destination strip */}
      <div className="border-t border-white/5 px-6 py-4 flex flex-wrap gap-x-5 gap-y-2">
        {DESTINATIONS.map(d => (
          <button key={d.id}
            onClick={() => setActive(active?.id === d.id ? null : d)}
            className={`text-[11px] tracking-wider uppercase transition-colors ${active?.id === d.id ? "text-[#c9a84c]" : "text-white/30 hover:text-white/70"}`}>
            {d.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColoradoCoverageMap;
