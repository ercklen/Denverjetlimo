"use client";

import React, { useState } from "react";

// ─── Destination Data ───────────────────────────────────────────────
// Coordinates are % positions within the Colorado SVG viewport
// Colorado bounding box: Lon 109.06°W → 102.05°W | Lat 37.0°N → 41.0°N
// SVG is 1000 x 600. x = (109.06 - lon) / 7.01 * 1000, y = (41.0 - lat) / 4.0 * 600

const HUB = {
  id: "den",
  name: "Denver International Airport",
  shortName: "DEN Airport",
  x: 626,
  y: 172,
  distance: "Hub",
  drive: "—",
  tag: "Airport Hub",
  isHub: true,
};

const DESTINATIONS = [
  { id: "boulder", name: "Boulder", x: 541, y: 148, distance: "30 mi", drive: "45 min", tag: "City" },
  { id: "fort-collins", name: "Fort Collins", x: 567, y: 62, distance: "65 mi", drive: "1h 10min", tag: "City" },
  { id: "colorado-springs", name: "Colorado Springs", x: 605, y: 325, distance: "70 mi", drive: "1h 15min", tag: "City" },
  { id: "breckenridge", name: "Breckenridge", x: 431, y: 228, distance: "85 mi", drive: "1h 30min", tag: "Ski Resort" },
  { id: "keystone", name: "Keystone", x: 442, y: 209, distance: "80 mi", drive: "1h 25min", tag: "Ski Resort" },
  { id: "vail", name: "Vail", x: 383, y: 204, distance: "100 mi", drive: "1h 45min", tag: "Ski Resort" },
  { id: "loveland", name: "Loveland Ski Area", x: 494, y: 198, distance: "75 mi", drive: "1h 20min", tag: "Ski Resort" },
  { id: "glenwood", name: "Glenwood Springs", x: 248, y: 217, distance: "160 mi", drive: "2h 30min", tag: "Resort Town" },
  { id: "aspen", name: "Aspen", x: 320, y: 271, distance: "200 mi", drive: "3h 15min", tag: "Luxury Resort" },
  { id: "steamboat", name: "Steamboat Springs", x: 318, y: 77, distance: "160 mi", drive: "2h 45min", tag: "Ski Resort" },
  { id: "telluride", name: "Telluride", x: 178, y: 459, distance: "330 mi", drive: "5h 30min", tag: "Luxury Resort" },
  { id: "durango", name: "Durango", x: 210, y: 500, distance: "340 mi", drive: "5h 45min", tag: "City" },
  { id: "pueblo", name: "Pueblo", x: 590, y: 395, distance: "110 mi", drive: "1h 45min", tag: "City" },
  { id: "grand-junction", name: "Grand Junction", x: 115, y: 235, distance: "245 mi", drive: "4h", tag: "City" },
  { id: "copper", name: "Copper Mountain", x: 418, y: 218, distance: "78 mi", drive: "1h 25min", tag: "Ski Resort" },
  { id: "winter-park", name: "Winter Park", x: 468, y: 170, distance: "67 mi", drive: "1h 15min", tag: "Ski Resort" },
  { id: "crested-butte", name: "Crested Butte", x: 298, y: 340, distance: "230 mi", drive: "3h 45min", tag: "Ski Resort" },
];

// ─── Colorado dot-grid generation ──────────────────────────────────
// Simple bounding rectangle with a lightweight "inside Colorado" check
function isInsideColorado(cx: number, cy: number): boolean {
  // SVG coords: x 0-1000 maps to 109.06°W – 102.05°W, y 0-600 maps to 41°N – 37°N
  const lon = 109.06 - (cx / 1000) * 7.01;
  const lat = 41.0 - (cy / 600) * 4.0;
  // Colorado is roughly 37°–41°N, 102.05°–109.06°W with minor border tweaks
  if (lat < 37.0 || lat > 41.0) return false;
  if (lon < 102.05 || lon > 109.06) return false;
  // Oklahoma panhandle notch: below 37° doesn't exist, handled above
  // Four Corners notch: SW corner is clean
  return true;
}

const GRID_SPACING = 18;
const dots: { cx: number; cy: number }[] = [];
for (let cx = GRID_SPACING / 2; cx < 1000; cx += GRID_SPACING) {
  for (let cy = GRID_SPACING / 2; cy < 600; cy += GRID_SPACING) {
    if (isInsideColorado(cx, cy)) {
      dots.push({ cx, cy });
    }
  }
}

// ─── Component ─────────────────────────────────────────────────────
type Dest = typeof DESTINATIONS[number];

export function ColoradoCoverageMap() {
  const [active, setActive] = useState<Dest | typeof HUB | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const allPins = [HUB, ...DESTINATIONS];

  return (
    <div className="w-full bg-[#080808] border border-white/5 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="relative w-full" style={{ paddingBottom: "60%" }}>
        <svg
          viewBox="0 0 1000 600"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          onClick={() => setActive(null)}
        >
          {/* Background */}
          <rect width="1000" height="600" fill="#080808" />

          {/* Dot grid — Colorado state shape */}
          {dots.map((d, i) => {
            const nearHub = Math.hypot(d.cx - HUB.x, d.cy - HUB.y) < 60;
            const nearDest = DESTINATIONS.some(
              (dest) => Math.hypot(d.cx - dest.x, d.cy - dest.y) < 30
            );
            return (
              <circle
                key={i}
                cx={d.cx}
                cy={d.cy}
                r={nearHub ? 1.8 : nearDest ? 1.6 : 1.2}
                fill={nearHub ? "#c9a84c" : nearDest ? "#a08030" : "#2a2a2a"}
                opacity={nearHub ? 0.6 : nearDest ? 0.4 : 0.8}
              />
            );
          })}

          {/* Connection lines from Hub to destinations */}
          {DESTINATIONS.map((dest) => (
            <line
              key={`line-${dest.id}`}
              x1={HUB.x}
              y1={HUB.y}
              x2={dest.x}
              y2={dest.y}
              stroke="#c9a84c"
              strokeWidth={hovered === dest.id || active?.id === dest.id ? 1.5 : 0.4}
              strokeDasharray="4 6"
              opacity={hovered === dest.id || active?.id === dest.id ? 0.6 : 0.15}
              style={{ transition: "all 0.3s ease" }}
            />
          ))}

          {/* Destination Pins */}
          {allPins.map((dest) => {
            const isActive = active?.id === dest.id;
            const isHov = hovered === dest.id;
            const isHub = "isHub" in dest && Boolean(dest.isHub);
            const highlight = Boolean(isActive || isHov);

            return (
              <g
                key={dest.id}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(isActive ? null : dest);
                }}
                onMouseEnter={() => setHovered(dest.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Outer glow ring */}
                {highlight && (
                  <circle
                    cx={dest.x}
                    cy={dest.y}
                    r={isHub ? 22 : 16}
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="1"
                    opacity="0.4"
                  >
                    <animate attributeName="r" from={isHub ? 16 : 12} to={isHub ? 28 : 22} dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Always-on pulse for hub */}
                {isHub && (
                  <circle cx={dest.x} cy={dest.y} r={14} fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3">
                    <animate attributeName="r" from="10" to="20" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Pin dot */}
                <circle
                  cx={dest.x}
                  cy={dest.y}
                  r={isHub ? 9 : highlight ? 6 : 4.5}
                  fill={highlight || isHub ? "#c9a84c" : "#6b5320"}
                  stroke="#080808"
                  strokeWidth={isHub ? 2 : 1.5}
                  style={{ transition: "all 0.2s ease" }}
                />

                {/* Center dot */}
                <circle
                  cx={dest.x}
                  cy={dest.y}
                  r={isHub ? 3 : 1.5}
                  fill="#080808"
                />

                {/* Label */}
                <g style={{ transition: "opacity 0.2s ease" }} opacity={highlight || isHub ? 1 : 0}>
                  <rect
                    x={dest.x + (isHub ? 12 : 8)}
                    y={dest.y - 10}
                    width={isHub ? dest.shortName!.length * 6.5 + 12 : dest.name.length * 5.5 + 12}
                    height={20}
                    rx={3}
                    fill="#c9a84c"
                    opacity="0.95"
                  />
                  <text
                    x={dest.x + (isHub ? 18 : 14)}
                    y={dest.y + 3.5}
                    fontSize={isHub ? "9" : "8"}
                    fontWeight="700"
                    letterSpacing="0.08em"
                    fill="#0a0a0a"
                    style={{ textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}
                  >
                    {isHub ? dest.shortName : dest.name.toUpperCase()}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Info Panel */}
        {active && (
          <div
            className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-72 bg-[#0d0d0d]/95 backdrop-blur-md border border-white/10 p-5 pointer-events-none"
            style={{ transition: "all 0.3s ease" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c9a84c] mb-1">
                  {"tag" in active ? active.tag : "Hub"}
                </p>
                <h3 className="text-sm font-semibold text-white leading-tight">{active.name}</h3>
              </div>
              {"isHub" in active && active.isHub ? (
                <span className="text-[10px] bg-white/10 text-white/60 px-2 py-1 tracking-wider uppercase">Hub</span>
              ) : null}
            </div>
            {"distance" in active && active.distance !== "Hub" && (
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/10">
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
            {"isHub" in active && active.isHub && (
              <p className="text-xs text-white/40 leading-relaxed mt-2">
                Your journey starts here. Private transfers to all Colorado destinations, available 24/7.
              </p>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Hub / Destination</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 border-t border-dashed border-[#c9a84c]/50" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Service Route</span>
          </div>
        </div>

        {/* Instruction hint */}
        {!active && (
          <div className="absolute bottom-4 right-4">
            <p className="text-[10px] text-white/25 tracking-wider uppercase">Tap a pin for details</p>
          </div>
        )}
      </div>

      {/* Destinations strip */}
      <div className="border-t border-white/5 px-6 py-4 flex flex-wrap gap-x-6 gap-y-2">
        {DESTINATIONS.map((d) => (
          <button
            key={d.id}
            onClick={() => setActive(active?.id === d.id ? null : d)}
            className={`text-[11px] tracking-wider uppercase transition-colors ${
              active?.id === d.id ? "text-[#c9a84c]" : "text-white/30 hover:text-white/70"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColoradoCoverageMap;
