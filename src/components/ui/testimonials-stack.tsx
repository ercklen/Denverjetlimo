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
    name: "Michael Vance",
    location: "Aspen Ski Resort Transfer",
    rating: 5,
    description:
      "Arrived at DIA during a heavy snowstorm. Our chauffeur was waiting at baggage claim, guided us to a pristine 4WD Escalade with ski racks, and navigated I-70 to Aspen effortlessly. Flawless 5-star experience.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "testimonial-2",
    name: "Sarah Jenkins",
    location: "Corporate Travel / Cherry Creek",
    rating: 5,
    description:
      "We rely on DenveroTrip for all our executive board transportation between Denver Airport and our headquarters in Cherry Creek. Punctual, discreet, and exceptionally professional every single time.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "testimonial-3",
    name: "David Sterling",
    location: "Vail Mountain Vacation",
    rating: 5,
    description:
      "Traveling with 4 kids and 6 pieces of luggage is usually chaotic. The custom Sprinter van gave us immense comfort, complimentary drinks, and child car seats pre-installed. The gold standard of airport transfers.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "testimonial-4",
    name: "Elena Rostova",
    location: "Breckenridge Event Chauffeur",
    rating: 5,
    description:
      "Booked two vehicles for our wedding guests from DEN to Breckenridge. Flight delays were tracked automatically and drivers adjusted without any stress. Highly recommend DenveroTrip!",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
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
                className="bg-[#141414] border border-[#c9a84c]/25 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <ReviewStars rating={testimonial.rating} />
                  <div className="mx-auto w-full text-base sm:text-lg text-[#e8e0d0] font-light italic">
                    <blockquote>"{testimonial.description}"</blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-2">
                  <Avatar className="size-12 border-2 border-[#c9a84c]">
                    <AvatarImage
                      src={testimonial.avatarUrl}
                      alt={`Portrait of ${testimonial.name}`}
                    />
                    <AvatarFallback className="bg-[#1f1f1f] text-[#c9a84c] font-bold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <span className="block text-base font-semibold text-white font-serif tracking-tight">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-[#c9a84c]">
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
      <p className="text-center text-xs text-[#c9a84c] uppercase tracking-widest -mt-16 pb-8">
        ↓ Scroll down to reveal all reviews ↓
      </p>
    </div>
  )
}

export default TestimonialsStack
