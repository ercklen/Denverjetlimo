"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { MapPin, Plane, Navigation, X } from "lucide-react"

interface RouteMapProps {
  origin?: string
  destination?: string
  time?: string
  description?: string
  className?: string
  onClose?: () => void
}

export function ExpandRouteMap({
  origin = "Denver International Airport (DEN)",
  destination = "Vail & Beaver Creek",
  time = "~2h 30min",
  description = "Mountain resort transfer",
  className,
  onClose
}: RouteMapProps) {
  // We can make it expanded by default if it's used in a modal, or auto-expand on mount
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-expand after a short delay for dramatic effect
    const t = setTimeout(() => setIsExpanded(true), 300)
    return () => clearTimeout(t)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [4, -4])
  const rotateY = useTransform(mouseX, [-50, 50], [-4, 4])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    // Don't toggle if they clicked the close button
    if ((e.target as HTMLElement).closest('button')) return;
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-[#111] border border-[#d4af37]/30 shadow-2xl flex flex-col"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          width: isExpanded ? (window.innerWidth < 600 ? 340 : 450) : 300,
          height: isExpanded ? 460 : 160,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-[#111]" />

        {/* MAP VISUAL SECTION (Top Half when expanded, full when collapsed) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-[220px] pointer-events-none border-b border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-[#0a0a0a]" />

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Decorative map grid lines */}
                {[20, 40, 60, 80].map((y, i) => (
                  <motion.line key={`h-${i}`} x1="0" y1={y} x2="100" y2={y} className="stroke-white/5" strokeWidth="0.5" />
                ))}
                {[10, 30, 50, 70, 90].map((x, i) => (
                  <motion.line key={`v-${i}`} x1={x} y1="0" x2={x} y2="100" className="stroke-white/5" strokeWidth="0.5" />
                ))}
                
                {/* Route Line */}
                <motion.path
                  d="M 15 70 Q 50 20 85 40"
                  fill="none"
                  className="stroke-[#d4af37]"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                />
              </svg>

              {/* Origin Marker */}
              <motion.div
                className="absolute left-[15%] top-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
              >
                <div className="w-8 h-8 rounded-full bg-[#111] border border-white/20 flex items-center justify-center shadow-lg">
                  <Plane className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] text-white/50 font-medium bg-black/50 px-1 rounded">DEN</span>
              </motion.div>

              {/* Destination Marker */}
              <motion.div
                className="absolute left-[85%] top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 1.5 }}
              >
                <div className="relative">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-[#d4af37]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative w-8 h-8 rounded-full bg-[#d4af37] border-2 border-[#111] flex items-center justify-center shadow-lg shadow-[#d4af37]/30">
                    <MapPin className="w-4 h-4 text-black" fill="currentColor" />
                  </div>
                </div>
              </motion.div>

              {/* Route Time Badge in Map */}
              <motion.div
                className="absolute left-[50%] top-[20%] -translate-x-1/2 -translate-y-1/2 bg-[#161616] border border-[#d4af37]/30 px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <Navigation className="w-3 h-3 text-[#d4af37]" />
                <span className="text-xs text-[#d4af37] font-medium tracking-wide">{time}</span>
              </motion.div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-100 h-8 bottom-0 top-auto" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* TEXT CONTENT SECTION (Bottom Half) */}
        <div className={`relative z-10 flex flex-col justify-between p-5 sm:p-6 transition-all duration-500 ${isExpanded ? 'mt-[220px] h-[240px]' : 'h-full'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0"
                animate={{ rotate: isExpanded ? 90 : 0 }}
              >
                <Navigation className="w-4 h-4 text-[#d4af37]" />
              </motion.div>
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-0.5">Route Preview</p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0" />
                  <span className="text-xs text-white/80 font-medium">Live Traffic Checked</span>
                </div>
              </div>
            </div>
            
            {onClose && (
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10 pointer-events-auto shrink-0"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-col gap-1 mb-3">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Plane className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{origin}</span>
              </div>
              <div className="w-px h-3 bg-white/20 ml-1.5" />
              <div className="flex items-center gap-2 text-lg sm:text-xl text-white font-semibold font-serif">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span className="truncate">{destination}</span>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className="text-white/60 text-xs sm:text-sm leading-relaxed pr-6"
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className="h-px bg-gradient-to-r from-[#d4af37]/50 via-[#d4af37]/20 to-transparent mt-4"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
            />
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                   className="mt-4 pointer-events-auto"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 10 }}
                   transition={{ delay: 0.2 }}
                >
                  <button onClick={(e) => { e.stopPropagation(); document.getElementById('planner-section')?.scrollIntoView({behavior:'smooth'}); onClose?.(); }} className="w-full py-2.5 rounded-lg bg-[#d4af37] text-black font-semibold text-sm hover:bg-[#b89535] transition-colors">
                    Plan This Trip
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
