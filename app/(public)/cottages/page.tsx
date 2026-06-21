import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cottages } from "@/lib/data/cottages";
import { Users, BedDouble, Bath, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cottages & Villas",
  description:
    "Explore our handcrafted cottages and villa — each a unique retreat designed for comfort, privacy, and Mediterranean warmth.",
};

const gradients: Record<string, string> = {
  garden: "linear-gradient(135deg, #7a9b6a 0%, #a8c896 100%)",
  terrace: "linear-gradient(135deg, #c2714f 0%, #e8a882 100%)",
  villa: "linear-gradient(135deg, #8a5e4a 0%, #c2714f 60%, #e8c4a8 100%)",
};

export default function CottagesPage() {
  return (
    <div className="bg-warm-50">
      {/* Page Header */}
      <section className="py-20 bg-warm-100 text-center px-4">
        <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
          Accommodations
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-brown-900 mb-4">
          Cottages & Villas
        </h1>
        <p className="text-brown-700 max-w-xl mx-auto leading-relaxed">
          Each accommodation is a handcrafted sanctuary — thoughtfully designed
          with natural materials, local character, and every comfort you need.
        </p>
      </section>

      {/* Cottage Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cottages.map((cottage) => (
            <Card
              key={cottage.slug}
              className="overflow-hidden border-warm-200 bg-white hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div
                className="h-56 w-full relative overflow-hidden"
                style={{ background: gradients[cottage.category] }}
              >
                <div className="absolute inset-0 bg-brown-900/10 group-hover:bg-brown-900/5 transition-colors" />
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-warm-50 text-brown-900 font-medium text-xs">
                    From €{cottage.pricePerNight} / night
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                <h2 className="font-heading text-2xl font-semibold text-brown-900 mb-1">
                  {cottage.name}
                </h2>
                <p className="text-sm text-brown-600 italic mb-4">{cottage.tagline}</p>
                <p className="text-sm text-brown-700 leading-relaxed mb-5 flex-1">
                  {cottage.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-brown-600 mb-5 pb-5 border-b border-warm-200">
                  <span className="flex items-center gap-1">
                    <Users size={13} /> {cottage.maxGuests} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <BedDouble size={13} /> {cottage.bedrooms} bed
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={13} /> {cottage.bathrooms} bath
                  </span>
                  <span>{cottage.size} m²</span>
                </div>

                <div className="flex gap-3">
                  <Link href={`/cottages/${cottage.slug}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-terracotta-400 text-terracotta-600 hover:bg-terracotta-500 hover:text-warm-50 transition-colors"
                    >
                      View Details
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </Link>
                  <Link href={`/booking?cottage=${cottage.slug}`}>
                    <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 px-4">
                      Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-warm-100 text-center px-4">
        <h2 className="font-heading text-3xl font-semibold text-brown-900 mb-3">
          Not sure which cottage to choose?
        </h2>
        <p className="text-brown-700 mb-7 max-w-md mx-auto">
          Our team is happy to help you find the perfect fit for your stay.
        </p>
        <Link href="/contact">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 rounded-full px-8">
            Ask Us
          </Button>
        </Link>
      </section>
    </div>
  );
}
