"use client";

import * as React from "react";
import { HaloReel, type HaloReelItem } from "@/components/ui/halo-reel";

const DESTINATION_CARDS: HaloReelItem[] = [
  {
    src: "/dest_vail_mountain_1786504003022.jpg",
    alt: "Vail Mountain Resort",
    title: "Vail & Beaver Creek",
    subtitle: "~2h 30min · Ski Resort",
  },
  {
    src: "/dest_aspen_1786508288136.jpg",
    alt: "Aspen Colorado",
    title: "Aspen & Snowmass",
    subtitle: "~4h · Executive",
  },
  {
    src: "/dest_breckenridge_1786508308049.jpg",
    alt: "Breckenridge Mountain",
    title: "Breckenridge & Summit",
    subtitle: "~1h 45min · Mountain",
  },
  {
    src: "/dest_downtown_denver_1786503992679.jpg",
    alt: "Downtown Denver Skyline",
    title: "Downtown Denver",
    subtitle: "~45 min · Metro & DIA",
  },
  {
    src: "/dest_boulder_1786508277820.jpg",
    alt: "Boulder Colorado",
    title: "Boulder & Flatirons",
    subtitle: "~1h 15min · VIP Service",
  },
  {
    src: "/dest_colorado_springs_1786508297951.jpg",
    alt: "Colorado Springs",
    title: "Colorado Springs",
    subtitle: "~2h 10min · Long Distance",
  },
  {
    src: "/dest_cherry_creek_1786508268407.jpg",
    alt: "Cherry Creek Denver",
    title: "Cherry Creek",
    subtitle: "~50 min · Executive",
  },
];

export const CarouselStacked = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <HaloReel
        items={DESTINATION_CARDS}
        aria-label="Destinations carousel"
        centerLabel={
          <div className="text-center">
            <p className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Explore<br />Colorado
            </p>
            <p className="text-xs text-[#b0b5b9] mt-2 uppercase tracking-widest">Drag to spin</p>
          </div>
        }
        cardWidth={280}
        cardHeight={380}
        minScale={0.3}
        radiusXRatio={0.42}
        centerXRatio={0.55}
        radiusYRatio={0.4}
        holdDuration={2000}
        stepDuration={800}
        spread={1.4}
        className="h-[700px] bg-transparent"
      />
      <p className="text-xs text-[#b0b5b9] mt-2 uppercase tracking-widest pb-2">
        ← Drag to Explore Destinations →
      </p>
    </div>
  );
};

export default CarouselStacked;
