"use client";

import React, { useState } from "react";

// ─── Coordinate System ───────────────────────────────────────────────
// Viewport: 1200 x 620
// Lon range: 115°W → 96°W  (width 19°)  x = (115 - lon) / 19 * 1200
// Lat range: 34°N  → 44°N  (height 10°) y = (44 - lat) / 10 * 620

function toXY(lon: number, lat: number) {
  return {
    x: ((115 - lon) / 19) * 1200,
    y: ((44 - lat) / 10) * 620,
  };
}

// ─── Colorado state border (simplified, 8 points) ────────────────────
// Corners + slight southern indentation for accuracy
const COLORADO_PATH = (() => {
  const pts = [
    toXY(109.06, 41.003), // NW
    toXY(102.052, 41.003), // NE
    toXY(102.052, 36.993), // SE
    toXY(109.06, 36.993), // SW
  ];
  return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y} L ${pts[2].x} ${pts[2].y} L ${pts[3].x} ${pts[3].y} Z`;
})();

// Colorado bounding box for dot containment check
const CO = { lonW: 109.06, lonE: 102.052, latN: 41.003, latS: 36.993 };
function isInColorado(lon: number, lat: number) {
  return lon <= CO.lonW && lon >= CO.lonE && lat <= CO.latN && lat >= CO.latS;
}

// ─── Dot grid ────────────────────────────────────────────────────────
const GRID_PX = 16; // pixel spacing in SVG units
const dots: { cx: number; cy: number; inside: boolean }[] = [];
for (let px = GRID_PX / 2; px < 1200; px += GRID_PX) {
  for (let py = GRID_PX / 2; py < 620; py += GRID_PX) {
    const lon = 115 - (px / 1200) * 19;
    const lat = 44 - (py / 620) * 10;
    dots.push({ cx: px, cy: py, inside: isInColorado(lon, lat) });
  }
}

// ─── Destinations ────────────────────────────────────────────────────
const HUB = { id: "den", name: "Denver International Airport", shortName: "DEN AIRPORT", lon: 104.674, lat: 39.856, distance: "Hub", drive: "—", tag: "Airport Hub", isHub: true };

const DESTINATIONS = [
  { id: "boulder", name: "Boulder", lon: 105.27, lat: 40.015, distance: "30 mi", drive: "45 min", tag: "City" },
  { id: "fort-collins", name: "Fort Collins", lon: 105.084, lat: 40.585, distance: "65 mi", drive: "1h 10min", tag: "City" },
  { id: "colorado-springs", name: "Colorado Springs", lon: 104.821, lat: 38.834, distance: "70 mi", drive: "1h 15min", tag: "City" },
  { id: "breckenridge", name: "Breckenridge", lon: 106.038, lat: 39.482, distance: "85 mi", drive: "1h 30min", tag: "Ski Resort" },
  { id: "vail", name: "Vail", lon: 106.374, lat: 39.643, distance: "100 mi", drive: "1h 45min", tag: "Ski Resort" },
  { id: "keystone", name: "Keystone", lon: 105.964, lat: 39.607, distance: "80 mi", drive: "1h 25min", tag: "Ski Resort" },
  { id: "aspen", name: "Aspen", lon: 106.818, lat: 39.191, distance: "200 mi", drive: "3h 15min", tag: "Luxury Resort" },
  { id: "steamboat", name: "Steamboat Springs", lon: 106.832, lat: 40.485, distance: "160 mi", drive: "2h 45min", tag: "Ski Resort" },
  { id: "telluride", name: "Telluride", lon: 107.812, lat: 37.938, distance: "330 mi", drive: "5h 30min", tag: "Luxury Resort" },
  { id: "glenwood", name: "Glenwood Springs", lon: 107.325, lat: 39.551, distance: "160 mi", drive: "2h 30min", tag: "Resort Town" },
  { id: "durango", name: "Durango", lon: 107.88, lat: 37.275, distance: "340 mi", drive: "5h 45min", tag: "City" },
  { id: "pueblo", name: "Pueblo", lon: 104.609, lat: 38.254, distance: "110 mi", drive: "1h 45min", tag: "City" },
  { id: "grand-junction", name: "Grand Junction", lon: 108.551, lat: 39.064, distance: "245 mi", drive: "4h", tag: "City" },
  { id: "winter-park", name: "Winter Park", lon: 105.763, lat: 39.887, distance: "67 mi", drive: "1h 15min", tag: "Ski Resort" },
  { id: "crested-butte", name: "Crested Butte", lon: 106.988, lat: 38.870, distance: "230 mi", drive: "3h 45min", tag: "Ski Resort" },
  { id: "copper", name: "Copper Mountain", lon: 106.149, lat: 39.502, distance: "78 mi", drive: "1h 25min", tag: "Ski Resort" },
];

type AnyDest = typeof HUB | typeof DESTINATIONS[number];

export function ColoradoCoverageMap() {
  const [active, setActive] = useState<AnyDest | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const allPins: AnyDest[] = [HUB, ...DESTINATIONS];

  return (
    <div className="w-full bg-[#080808] border border-white/5 overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: "51.67%" }}>
        <svg
          viewBox="0 0 1200 620"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          onClick={() => setActive(null)}
        >
          {/* Dark background */}
          <rect width="1200" height="620" fill="#080808" />

          {/* Colorado state land fill */}
          <path d={COLORADO_PATH} fill="#111111" />

          {/* Dot grid — inside Colorado brighter, outside dimmer */}
          {dots.map((d, i) => {
            const nearHub = Math.hypot(d.cx - toXY(HUB.lon, HUB.lat).x, d.cy - toXY(HUB.lon, HUB.lat).y) < 45;
            const nearDest = d.inside && DESTINATIONS.some((dest) => {
              const p = toXY(dest.lon, dest.lat);
              return Math.hypot(d.cx - p.x, d.cy - p.y) < 25;
            });
            return (
              <circle
                key={i}
                cx={d.cx}
                cy={d.cy}
                r={nearHub ? 1.8 : d.inside ? 1.4 : 1.0}
                fill={nearHub ? "#c9a84c" : nearDest ? "#9a7830" : d.inside ? "#2e2e2e" : "#181818"}
                opacity={nearHub ? 0.7 : nearDest ? 0.5 : d.inside ? 0.9 : 0.6}
              />
            );
          })}

          {/* Colorado border outline */}
          <path d={COLORADO_PATH} fill="none" stroke="#2a2a2a" strokeWidth="1.5" />

          {/* Dashed route lines */}
          {DESTINATIONS.map((dest) => {
            const hub = toXY(HUB.lon, HUB.lat);
            const dp = toXY(dest.lon, dest.lat);
            const isHov = hovered === dest.id || active?.id === dest.id;
            return (
              <line key={`line-${dest.id}`}
                x1={hub.x} y1={hub.y} x2={dp.x} y2={dp.y}
                stroke="#c9a84c"
                strokeWidth={isHov ? 1.2 : 0.5}
                strokeDasharray="4 7"
                opacity={isHov ? 0.5 : 0.12}
                style={{ transition: "all 0.3s" }}
              />
            );
          })}

          {/* ── Pins ── */}
          {allPins.map((dest) => {
            const p = toXY(dest.lon, dest.lat);
            const isActive = active?.id === dest.id;
            const isHov = hovered === dest.id;
            const isHub = Boolean("isHub" in dest && dest.isHub);
            const highlight = Boolean(isActive || isHov);
            const labelText = isHub ? (dest as typeof HUB).shortName : dest.name.toUpperCase();
            const labelWidth = labelText.length * (isHub ? 6.5 : 5.8) + 16;

            return (
              <g key={dest.id}
                style={{ cursor: "pointer" }}
                onClick={(e) => { e.stopPropagation(); setActive(isActive ? null : dest); }}
                onMouseEnter={() => setHovered(dest.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Pulse ring */}
                {isHub && (
                  <circle cx={p.x} cy={p.y} r={12} fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.25">
                    <animate attributeName="r" from="8" to="18" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.35" to="0" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                )}
                {highlight && (
                  <circle cx={p.x} cy={p.y} r={isHub ? 20 : 13} fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3">
                    <animate attributeName="r" from={isHub ? 12 : 8} to={isHub ? 24 : 17} dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.4" to="0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Pin outer ring */}
                <circle cx={p.x} cy={p.y} r={isHub ? 9 : highlight ? 6 : 4}
                  fill="none"
                  stroke={highlight || isHub ? "#c9a84c" : "#6b5320"}
                  strokeWidth={isHub ? 1.5 : 1}
                  style={{ transition: "all 0.2s" }}
                />
                {/* Pin center fill */}
                <circle cx={p.x} cy={p.y} r={isHub ? 5 : highlight ? 3.5 : 2.5}
                  fill={highlight || isHub ? "#c9a84c" : "#6b5320"}
                  style={{ transition: "all 0.2s" }}
                />

                {/* Label (always visible for hub, hover for others) */}
                {(isHub || highlight) && (
                  <g>
                    <rect
                      x={p.x + (isHub ? 13 : 9)}
                      y={p.y - 10}
                      width={labelWidth}
                      height={20}
                      rx={2}
                      fill="#c9a84c"
                    />
                    <text
                      x={p.x + (isHub ? 19 : 15)}
                      y={p.y + 4}
                      fontSize={isHub ? "9.5" : "8.5"}
                      fontWeight="700"
                      letterSpacing="0.1em"
                      fill="#0a0a0a"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
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
          <div className="absolute bottom-4 left-4 w-64 bg-black/90 backdrop-blur border border-white/10 p-5 pointer-events-none">
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
            <svg width="20" height="2"><line x1="0" y1="1" x2="20" y2="1" stroke="#c9a84c" strokeWidth="1" strokeDasharray="3 4" opacity="0.5"/></svg>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Service Route</span>
          </div>
        </div>
      </div>

      {/* Destination pills */}
      <div className="border-t border-white/5 px-6 py-4 flex flex-wrap gap-x-5 gap-y-2">
        {DESTINATIONS.map((d) => (
          <button key={d.id}
            onClick={() => setActive(active?.id === d.id ? null : d)}
            className={`text-[11px] tracking-wider uppercase transition-colors ${active?.id === d.id ? "text-[#c9a84c]" : "text-white/30 hover:text-white/70"}`}
          >
            {d.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColoradoCoverageMap;
