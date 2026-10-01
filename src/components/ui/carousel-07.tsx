"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
  time?: string;
}

const slides: Slide[] = [
  {
    image: "/dest_vail_mountain_1786504003022.jpg",
    title: "Vail & Beaver Creek",
    description: "World-class mountain resort transfers with luxury all-weather 4WD SUVs.",
    badge: "Ski Resort",
    time: "~2h 30min",
  },
  {
    image: "/dest_aspen_1786508288136.jpg",
    title: "Aspen & Snowmass",
    description: "Premier private chauffeur service to Aspen's luxury resorts and private residences.",
    badge: "Executive",
    time: "~4h",
  },
  {
    image: "/dest_breckenridge_1786508308049.jpg",
    title: "Breckenridge & Summit",
    description: "Direct airport transfers to Breckenridge, Keystone, and Copper Mountain.",
    badge: "Mountain",
    time: "~1h 45min",
  },
  {
    image: "/dest_downtown_denver_1786503992679.jpg",
    title: "Downtown Denver",
    description: "Corporate travel, hotel transfers, and luxury transportation across the Denver Metro.",
    badge: "Metro & DIA",
    time: "~45 min",
  },
  {
    image: "/dest_boulder_1786508277820.jpg",
    title: "Boulder & Flatirons",
    description: "Executive and university transfers between DIA and Boulder with premium comfort.",
    badge: "VIP Service",
    time: "~1h 15min",
  },
  {
    image: "/dest_colorado_springs_1786508297951.jpg",
    title: "Colorado Springs",
    description: "Long-distance luxury chauffeured rides to The Broadmoor and Garden of the Gods.",
    badge: "Long Distance",
    time: "~2h 10min",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 100,
      velocityDivisor: 450,
      sensitivity: 120,
      xMultiplier: 60,
      yMultiplier: 10,
      rotationMultiplier: 4,
      scaleReduction: 0.07,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 150,
      velocityDivisor: 600,
      sensitivity: 200,
      xMultiplier: 100,
      yMultiplier: 25,
      rotationMultiplier: 8,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export const CarouselStacked = () => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-6 select-none">
      <div className="relative w-full max-w-6xl h-[320px] sm:h-96 lg:h-[450px] flex items-center justify-center">
        {/* Transparent Drag Surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />

        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
          />
        ))}
      </div>
      <p className="text-xs text-[#b89535] mt-4 uppercase tracking-widest">
        ← Swipe to Explore Destinations →
      </p>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

const Card = ({ slide, index, total, progress, config }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

  // Title and description are always visible on active card, fade slightly on side cards
  const textOpacity = useTransform(offset, [-1, -0.3, 0, 0.3, 1], [0.5, 0.7, 1, 0.7, 0.5]);

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "absolute rounded-2xl overflow-hidden bg-[#161616] border border-[#d4af37]/30 shadow-2xl group pointer-events-none",
        // Larger cards on mobile for readability
        "w-56 h-72 sm:w-64 sm:h-88 lg:w-72 lg:h-96",
      )}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
      />

      <motion.div
        style={{
          opacity: useTransform(
            offset,
            [-2, -0.5, 0, 0.5, 2],
            [0.6, 0.25, 0, 0.25, 0.6],
          ),
        }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-full bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-widest shadow-md">
        {slide.badge}
      </Badge>

      {/* Drive time chip */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-[10px] text-white/80 font-medium backdrop-blur-sm">
        {slide.time}
      </div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white text-left"
      >
        <p className="text-base sm:text-lg font-bold leading-tight mb-1 text-white drop-shadow-md font-serif">
          {slide.title}
        </p>
        <p className="text-xs text-white/80 line-clamp-2 font-normal leading-relaxed">
          {slide.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CarouselStacked;
