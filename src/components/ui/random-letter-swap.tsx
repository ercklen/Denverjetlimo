"use client";

import { useState, useRef } from "react";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  revealDirection?: "start" | "end" | "center" | "random";
}

function getRevealOrder(length: number, direction: "start" | "end" | "center" | "random"): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  if (direction === "end") return indices.reverse();
  if (direction === "center") {
    const mid = Math.floor(length / 2);
    return indices.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
  }
  if (direction === "random") return indices.sort(() => Math.random() - 0.5);
  return indices;
}

export function RandomLetterSwap({
  label,
  className = "",
  staggerDuration = 0.02,
  revealDirection = "random",
}: RandomLetterSwapProps) {
  const [displayChars, setDisplayChars] = useState<string[]>(label.split(""));
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const clearAllIntervals = () => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  };

  const handleMouseEnter = () => {
    clearAllIntervals();

    const chars = label.split("");
    const order = getRevealOrder(chars.length, revealDirection);

    order.forEach((charIndex, step) => {
      if (chars[charIndex] === " ") return;

      const delay = step * staggerDuration * 1000;

      const timeout = setTimeout(() => {
        let tick = 0;
        const maxTicks = 6;

        const interval = setInterval(() => {
          setDisplayChars((prev) => {
            const next = [...prev];
            if (tick < maxTicks) {
              next[charIndex] = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            } else {
              next[charIndex] = chars[charIndex];
              clearInterval(interval);
            }
            tick++;
            return next;
          });
        }, 45);

        intervalsRef.current.push(interval);
      }, delay);

      // store timeout cast as interval type so we can clear it too
      intervalsRef.current.push(timeout as unknown as ReturnType<typeof setInterval>);
    });
  };

  const handleMouseLeave = () => {
    clearAllIntervals();
    setDisplayChars(label.split(""));
  };

  return (
    <span
      className={`inline-flex ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={label}
      style={{ whiteSpace: "nowrap" }}
    >
      {displayChars.map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{ minWidth: char === " " ? "0.35em" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
