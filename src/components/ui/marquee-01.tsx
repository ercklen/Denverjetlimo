import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { ReviewStars } from "@/components/ui/animated-cards-stack"; // Keeping the stars component

const reviews = [
  {
    name: "James Morgan",
    username: "Executive Transfer",
    body: "“Booked Denver Jet Limo for an early morning DIA pickup. The driver was already waiting at baggage claim holding my name sign. The Escalade was spotless, quiet, and I closed two deals on calls during the ride. This is the only way I travel now.”",
    profile: "/client_james_morgan.png",
  },
  {
    name: "Sophia Carter",
    username: "Vail Resort Transfer",
    body: "“We traveled as a family of 5 with all our ski gear to Vail. The Executive Jet Sprinter had more than enough room, the driver was patient and professional, and our flight delay was tracked automatically. Zero stress the entire trip.”",
    profile: "/client_sophia_carter.png",
  },
  {
    name: "Robert Hayes",
    username: "Corporate Program",
    body: "“Our firm has been using Denver Jet Limo for all executive board transfers for 6 months. Flawless every single time — punctual, discreet, immaculate vehicles. Their corporate program is exactly what a premium business needs.”",
    profile: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Aisha Williams",
    username: "Wedding Day",
    body: "“Denver Jet Limo handled transportation for our entire wedding party from DEN to Breckenridge. Two vehicles, coordinated perfectly. The drivers were so kind and professional. They made the whole day feel like a VIP experience.”",
    profile: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80",
  },
  // Duplicating to make the marquee fuller since we only have 4
  {
    name: "Michael Vance",
    username: "Aspen Ski Trip",
    body: "“Arrived at DIA during a heavy snowstorm. Our chauffeur was waiting at baggage claim, guided us to a pristine 4WD Escalade with ski racks, and navigated I-70 to Aspen effortlessly. Flawless 5-star experience.”",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Sarah Jenkins",
    username: "Cherry Creek Travel",
    body: "“We rely on Denver Jet Limo for all our executive board transportation between Denver Airport and our headquarters in Cherry Creek. Punctual, discreet, and exceptionally professional every single time.”",
    profile: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  profile,
  name,
  username,
  body,
}: {
  profile: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <Card className="relative h-full w-[350px] cursor-pointer overflow-hidden border border-white/10 bg-[#0e0e0e] shadow-2xl p-6 transition-transform hover:scale-[1.02]">
      <CardContent className="p-0 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <img
            className="rounded-full size-12 border-2 border-[#b0b5b9] object-cover"
            alt={name}
            src={profile}
          />
          <div className="flex flex-col">
            <p className="text-base font-semibold text-white tracking-tight">{name}</p>
            <p className="text-xs font-medium text-[#b0b5b9]">
              {username}
            </p>
          </div>
        </div>
        <ReviewStars rating={5} />
        <p className="text-sm leading-relaxed text-[#e8e0d0] font-light italic">
          {body}
        </p>
      </CardContent>
    </Card>
  );
};

export default function TestimonialMarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-20 bg-transparent">
      
      <div className="mb-10 text-center z-10 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
          Client Experiences
        </h2>
        <p className="mt-4 text-[#b0b5b9] uppercase tracking-widest text-sm font-semibold max-w-lg mx-auto">
          Trusted by executives and families across Colorado
        </p>
      </div>

      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s] mt-4">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      
      {/* Gradient edges for smooth fade out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent"></div>
    </div>
  );
}
