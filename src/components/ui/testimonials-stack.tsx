"use client"

import * as React from "react"
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/ui/animated-cards-stack"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const REAL_TESTIMONIALS = [
  {
    id: "testimonial-1",
    name: "James Morgan",
    location: "Executive Transfer · Downtown Denver",
    rating: 5,
    description:
      "Booked Denver Jet Limo for an early morning DIA pickup. The driver was already waiting at baggage claim holding my name sign. The Escalade was spotless, quiet, and I closed two deals on calls during the ride. This is the only way I travel now.",
    avatarUrl: "/client_james_morgan.png",
  },
  {
    id: "testimonial-2",
    name: "Sophia Carter",
    location: "Vail Resort Transfer · Family Group",
    rating: 5,
    description:
      "We traveled as a family of 5 with all our ski gear to Vail. The Executive Jet Sprinter had more than enough room, the driver was patient and professional, and our flight delay was tracked automatically. Zero stress the entire trip.",
    avatarUrl: "/client_sophia_carter.png",
  },
  {
    id: "testimonial-3",
    name: "Robert Hayes",
    location: "Corporate Program · Cherry Creek HQ",
    rating: 5,
    description:
      "Our firm has been using Denver Jet Limo for all executive board transfers for 6 months. Flawless every single time — punctual, discreet, immaculate vehicles. Their corporate program is exactly what a premium business needs.",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "testimonial-4",
    name: "Aisha Williams",
    location: "Wedding Day · Breckenridge",
    rating: 5,
    description:
      "Denver Jet Limo handled transportation for our entire wedding party from DEN to Breckenridge. Two vehicles, coordinated perfectly. The drivers were so kind and professional. They made the whole day feel like a VIP experience.",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80",
  },
]

export function TestimonialsStack() {
  return (
    <div className="w-full bg-transparent text-white">
      <ContainerScroll className="container mx-auto h-[320vh] max-w-4xl bg-transparent">
        <div className="sticky left-0 top-0 h-svh w-full flex items-center justify-center py-12 bg-transparent">
          <CardsContainer className="mx-auto size-full h-[450px] w-[90vw] max-w-[340px] sm:max-w-[400px] bg-transparent">
            {REAL_TESTIMONIALS.map((testimonial, index) => (
              <CardTransformed
                arrayLength={REAL_TESTIMONIALS.length}
                key={testimonial.id}
                variant="light"
                index={index + 2}
                role="article"
                aria-labelledby={`card-${testimonial.id}-title`}
                aria-describedby={`card-${testimonial.id}-content`}
                className="bg-[#0e0e0e] border border-[#b0b5b9]/20 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <ReviewStars rating={testimonial.rating} />
                  <div className="mx-auto w-full text-base sm:text-lg text-[#e8e0d0] font-light italic">
                    <blockquote>&quot;{testimonial.description}&quot;</blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-2">
                  <Avatar className="size-12 border-2 border-[#b0b5b9]">
                    <AvatarImage
                      src={testimonial.avatarUrl}
                      alt={`Portrait of ${testimonial.name}`}
                    />
                    <AvatarFallback className="bg-[#1f1f1f] text-[#b0b5b9] font-bold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <span className="block text-base font-semibold text-white tracking-tight">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-[#b0b5b9]">
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
      <p className="text-center text-xs text-[#b0b5b9] uppercase tracking-widest -mt-16 pb-8">
        ↓ Scroll down to reveal all reviews ↓
      </p>
    </div>
  )
}

export default TestimonialsStack
