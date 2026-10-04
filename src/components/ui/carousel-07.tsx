"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Destination {
  image: string;
  title: string;
  description: string;
  badge: string;
  time: string;
}

const DESTINATIONS: Destination[] = [
  {
    image: "/dest_vail_mountain_1786504003022.jpg",
    title: "Vail & Beaver Creek",
    description: "World-class mountain resort transfers with luxury all-weather 4WD SUVs. Direct from DIA to the slopes.",
    badge: "Ski Resort",
    time: "~2h 30min",
  },
  {
    image: "/dest_aspen_1786508288136.jpg",
    title: "Aspen & Snowmass",
    description: "Premier private chauffeur service to Aspen's luxury resorts and private residences. Discreet and seamless.",
    badge: "Executive",
    time: "~4h",
  },
  {
    image: "/dest_breckenridge_1786508308049.jpg",
    title: "Breckenridge & Summit",
    description: "Direct airport transfers to Breckenridge, Keystone, and Copper Mountain in total comfort.",
    badge: "Mountain",
    time: "~1h 45min",
  },
  {
    image: "/dest_downtown_denver_1786503992679.jpg",
    title: "Downtown Denver",
    description: "Corporate travel, hotel drop-offs, and luxury transportation across the entire Denver Metro area.",
    badge: "Metro & DIA",
    time: "~45 min",
  },
  {
    image: "/dest_boulder_1786508277820.jpg",
    title: "Boulder & Flatirons",
    description: "Executive and university transfers between DIA and Boulder with premium, on-time chauffeur service.",
    badge: "VIP Service",
    time: "~1h 15min",
  },
  {
    image: "/dest_colorado_springs_1786508297951.jpg",
    title: "Colorado Springs",
    description: "Long-distance luxury rides to The Broadmoor, Garden of the Gods, and beyond. Always on time.",
    badge: "Long Distance",
    time: "~2h 10min",
  },
  {
    image: "/dest_cherry_creek_1786508268407.jpg",
    title: "Cherry Creek",
    description: "Upscale transportation to Cherry Creek's premier shopping, dining, and residential neighborhoods.",
    badge: "Executive",
    time: "~50 min",
  },
];

export const CarouselStacked = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  return (
    <div className="w-full px-4 md:px-12">
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {DESTINATIONS.map((dest, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-2xl h-[420px] cursor-pointer">
                {/* Background Image */}
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#b0b5b9]/20 backdrop-blur-md border border-[#b0b5b9]/30 text-[#e2e8f0] text-xs font-semibold uppercase tracking-widest">
                    {dest.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 text-xs font-medium">
                    {dest.time}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                    {dest.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[#b0b5b9] text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>✦</span>
                    <span>Book This Route</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="text-center text-xs text-[#b0b5b9] mt-6 uppercase tracking-widest">
        ← Swipe to Explore All Destinations →
      </p>
    </div>
  );
};

export default CarouselStacked;
