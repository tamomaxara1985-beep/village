import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cottages } from "@/lib/data/cottages";
import {
  Wifi,
  UtensilsCrossed,
  Flower2,
  Sun,
  Users,
  BedDouble,
  ArrowRight,
  Star,
} from "lucide-react";

const amenities = [
  { icon: Wifi, label: "Free WiFi", desc: "High-speed throughout the property" },
  { icon: UtensilsCrossed, label: "Restaurant", desc: "Farm-to-table Mediterranean cuisine" },
  { icon: Flower2, label: "Gardens", desc: "Landscaped grounds and herb gardens" },
  { icon: Sun, label: "Outdoor Spaces", desc: "Terraces, courtyards, and sun decks" },
];

const testimonials = [
  {
    name: "Elena & Marco",
    country: "Italy",
    text: "Absolutely magical. The Garden Cottage was everything we dreamed of — peaceful, beautifully designed, and the staff made us feel like family.",
    rating: 5,
  },
  {
    name: "Sophie & James",
    country: "UK",
    text: "We've stayed at many boutique hotels but HOTEL_NAME stands apart. The attention to detail, the warm hospitality, and those sunsets from our terrace — perfect.",
    rating: 5,
  },
  {
    name: "Anna K.",
    country: "Germany",
    text: "The Premium Villa is pure luxury without feeling pretentious. The whirlpool terrace at night is something I'll never forget.",
    rating: 5,
  },
];

export default function HomePage() {
  const featuredCottages = cottages.filter((c) => c.featured);

  return (
    <div className="bg-warm-50">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Gradient background (replace with real hero image later) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #8a5e4a 0%, #c2714f 35%, #dda882 60%, #f0ebe3 100%)",
          }}
        />
        <div className="absolute inset-0 bg-brown-900/30" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-warm-200 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Welcome to
          </p>
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-semibold text-warm-50 leading-tight mb-6">
            HOTEL_NAME
          </h1>
          <p className="text-warm-100 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            A boutique cottage resort where Mediterranean warmth meets natural
            beauty. Your escape starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button
                size="lg"
                className="bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 rounded-full px-8 text-base font-medium"
              >
                Book Your Stay
              </Button>
            </Link>
            <Link href="/cottages">
              <Button
                size="lg"
                variant="outline"
                className="border-warm-100 text-warm-50 hover:bg-warm-50/10 rounded-full px-8 text-base font-medium bg-transparent"
              >
                Explore Cottages
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-warm-200 animate-bounce">
          <div className="w-0.5 h-8 bg-warm-200/60 rounded-full" />
        </div>
      </section>

      {/* Featured Cottages */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
            Our Accommodations
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brown-900">
            Cottages & Villas
          </h2>
          <p className="mt-4 text-brown-700 max-w-xl mx-auto leading-relaxed">
            Each cottage is a handcrafted retreat — thoughtfully designed to blend
            natural materials, local character, and modern comforts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {featuredCottages.map((cottage) => (
            <Card
              key={cottage.slug}
              className="overflow-hidden border-warm-200 bg-white hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Image placeholder */}
              <div
                className="h-52 w-full relative overflow-hidden"
                style={{
                  background:
                    cottage.category === "garden"
                      ? "linear-gradient(135deg, #7a9b6a 0%, #a8c896 100%)"
                      : cottage.category === "terrace"
                      ? "linear-gradient(135deg, #c2714f 0%, #e8a882 100%)"
                      : "linear-gradient(135deg, #8a5e4a 0%, #c2714f 60%, #e8c4a8 100%)",
                }}
              >
                <div className="absolute inset-0 bg-brown-900/10" />
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-warm-50 text-brown-900 text-xs font-medium">
                    From €{cottage.pricePerNight}/night
                  </Badge>
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="font-heading text-2xl font-semibold text-brown-900 mb-1">
                  {cottage.name}
                </h3>
                <p className="text-sm text-brown-700 mb-3">{cottage.tagline}</p>

                <div className="flex items-center gap-4 text-xs text-brown-700 mb-4">
                  <span className="flex items-center gap-1">
                    <Users size={13} />
                    {cottage.maxGuests} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <BedDouble size={13} />
                    {cottage.bedrooms} bedroom{cottage.bedrooms > 1 ? "s" : ""}
                  </span>
                  <span>{cottage.size} m²</span>
                </div>

                <Link href={`/cottages/${cottage.slug}`}>
                  <Button
                    variant="outline"
                    className="w-full border-terracotta-400 text-terracotta-600 hover:bg-terracotta-500 hover:text-warm-50 transition-colors group-hover:border-terracotta-500"
                  >
                    View Details
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/cottages">
            <Button
              variant="ghost"
              className="text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50"
            >
              View all accommodations
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-warm-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
              The Experience
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brown-900">
              Resort Amenities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-terracotta-500/10 text-terracotta-500 mb-4 group-hover:bg-terracotta-500 group-hover:text-warm-50 transition-colors duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-brown-900 mb-1">
                  {label}
                </h3>
                <p className="text-sm text-brown-700 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/restaurant">
              <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 rounded-full px-8">
                Explore All Amenities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
            Guest Stories
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-brown-900">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-7 border border-warm-200 shadow-sm"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-terracotta-400 text-terracotta-400"
                  />
                ))}
              </div>
              <p className="text-brown-700 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-brown-900 text-sm">{t.name}</p>
                <p className="text-xs text-brown-600">{t.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-brown-900 text-center px-4">
        <p className="text-terracotta-300 text-sm font-medium tracking-widest uppercase mb-3">
          Ready to Escape?
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-warm-50 mb-5">
          Your Perfect Retreat Awaits
        </h2>
        <p className="text-warm-300 max-w-xl mx-auto mb-10 leading-relaxed">
          Check availability and reserve your cottage today. We look forward to
          welcoming you to HOTEL_NAME.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking">
            <Button
              size="lg"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 rounded-full px-10"
            >
              Check Availability
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-warm-300 text-warm-100 hover:bg-warm-50/10 rounded-full px-10 bg-transparent"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
