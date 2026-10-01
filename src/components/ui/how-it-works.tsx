"use client";

import { cn } from "@/lib/utils";
import { MapPin, Car, ShieldCheck } from "lucide-react";
import type React from "react";

// The main props for the HowItWorks component
interface HowItWorksProps extends React.HTMLAttributes<HTMLElement> {}

// The props for a single step card
interface StepCardProps {
  icon: React.ReactNode;
  stepNumber: string;
  title: string;
  description: string;
  benefits: string[];
}

/**
 * A single step card within the "How It Works" section.
 * Tailored for luxury airport & mountain transportation.
 */
const StepCard: React.FC<StepCardProps> = ({
  icon,
  stepNumber,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "relative rounded-2xl border border-[#c9a84c]/20 bg-[#141414] p-7 text-[#f0ebe0] transition-all duration-300 ease-in-out shadow-xl flex flex-col justify-between group",
      "hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(201,168,76,0.15)] hover:border-[#c9a84c]/50 hover:bg-[#181818]"
    )}
  >
    <div>
      {/* Top row with icon & step badge */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 group-hover:bg-[#c9a84c] group-hover:text-black transition-colors duration-300">
          {icon}
        </div>
        <span className="font-serif text-2xl font-bold text-[#c9a84c]/40 group-hover:text-[#c9a84c] transition-colors duration-300">
          {stepNumber}
        </span>
      </div>

      {/* Title and Description */}
      <h3 className="mb-2 text-xl font-bold text-white font-serif tracking-tight">{title}</h3>
      <p className="mb-6 text-sm text-[#b0a898] leading-relaxed">{description}</p>
    </div>

    {/* Benefits List */}
    <ul className="space-y-2.5 border-t border-white/10 pt-5">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3 text-xs text-stone-300">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a84c]/20">
            <div className="h-1.5 w-1.5 rounded-full bg-[#c9a84c]"></div>
          </div>
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * A responsive "How It Works" section for Denvertrip.
 */
export const HowItWorks: React.FC<HowItWorksProps> = ({
  className,
  ...props
}) => {
  const stepsData = [
    {
      stepNumber: "01",
      icon: <MapPin className="h-6 w-6" />,
      title: "Choose Your Destination",
      description:
        "Input your pickup and drop-off points — from Denver International Airport to downtown or any Colorado mountain resort.",
      benefits: [
        "Live flight number & arrival tracking",
        "Curbside or inside baggage claim pickup",
        "Direct airport-to-resort routing",
      ],
    },
    {
      stepNumber: "02",
      icon: <Car className="h-6 w-6" />,
      title: "Select Your Vehicle",
      description:
        "Choose the ideal luxury vehicle class for your group size, luggage, and mountain driving conditions.",
      benefits: [
        "Luxury 4WD Cadillac Escalade SUVs",
        "Executive Mercedes S-Class sedans",
        "Spacious custom Sprinter passenger vans",
      ],
    },
    {
      stepNumber: "03",
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Ride in Comfort",
      description:
        "Enjoy a seamless, private chauffeur experience with complimentary refreshments, Wi-Fi, and luggage handling.",
      benefits: [
        "Professional, background-checked chauffeurs",
        "Complimentary child car seats & ski racks",
        "All-inclusive upfront fixed pricing",
      ],
    },
  ];

  return (
    <section
      id="how-it-works"
      className={cn("w-full bg-transparent py-12", className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        {/* Step Indicators with Connecting Line */}
        <div className="relative mx-auto mb-10 w-full max-w-4xl hidden sm:block">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-[#c9a84c]/20"
          ></div>
          <div className="relative grid grid-cols-3">
            {stepsData.map((step, index) => (
              <div
                key={index}
                className="flex h-9 w-9 items-center justify-center justify-self-center rounded-full bg-[#141414] font-semibold text-[#c9a84c] border border-[#c9a84c]/40 ring-4 ring-[#080808]"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              stepNumber={step.stepNumber}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
