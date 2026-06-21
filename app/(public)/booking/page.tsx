import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, BedDouble } from "lucide-react";
import { cottages } from "@/lib/data/cottages";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description: "Check availability and book your cottage at HOTEL_NAME.",
};

export default function BookingPage() {
  return (
    <div className="bg-warm-50 min-h-screen">
      {/* Page Header */}
      <section className="py-20 bg-warm-100 text-center px-4">
        <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
          Reserve Your Cottage
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-brown-900 mb-4">
          Book Your Stay
        </h1>
        <p className="text-brown-700 max-w-xl mx-auto leading-relaxed">
          Select your dates and we&apos;ll find the perfect cottage for you.
        </p>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        {/* Search Form */}
        <Card className="border-warm-200 bg-white shadow-sm mb-10">
          <CardContent className="p-8">
            <h2 className="font-heading text-2xl font-semibold text-brown-900 mb-6">
              Check Availability
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-brown-700 text-sm mb-1.5 flex items-center gap-1 block">
                  <CalendarDays size={13} /> Check-in
                </Label>
                <Input
                  type="date"
                  className="border-warm-200 bg-warm-50 focus:border-terracotta-400"
                />
              </div>
              <div>
                <Label className="text-brown-700 text-sm mb-1.5 flex items-center gap-1 block">
                  <CalendarDays size={13} /> Check-out
                </Label>
                <Input
                  type="date"
                  className="border-warm-200 bg-warm-50 focus:border-terracotta-400"
                />
              </div>
              <div>
                <Label className="text-brown-700 text-sm mb-1.5 flex items-center gap-1 block">
                  <Users size={13} /> Guests
                </Label>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  defaultValue={2}
                  className="border-warm-200 bg-warm-50 focus:border-terracotta-400"
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 font-medium">
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Cottages */}
        <h2 className="font-heading text-2xl font-semibold text-brown-900 mb-6">
          Available Cottages
        </h2>
        <div className="space-y-4">
          {cottages.map((cottage) => (
            <Card
              key={cottage.slug}
              className="border-warm-200 bg-white hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className="shrink-0 w-16 h-16 rounded-lg overflow-hidden"
                    style={{
                      background:
                        cottage.category === "garden"
                          ? "linear-gradient(135deg, #7a9b6a 0%, #a8c896 100%)"
                          : cottage.category === "terrace"
                          ? "linear-gradient(135deg, #c2714f 0%, #e8a882 100%)"
                          : "linear-gradient(135deg, #8a5e4a 0%, #c2714f 100%)",
                    }}
                  />
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-brown-900">
                      {cottage.name}
                    </h3>
                    <p className="text-sm text-brown-600 mb-2">{cottage.tagline}</p>
                    <div className="flex items-center gap-3 text-xs text-brown-500">
                      <span className="flex items-center gap-1">
                        <Users size={11} /> {cottage.maxGuests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <BedDouble size={11} /> {cottage.bedrooms} bed
                      </span>
                      <span>{cottage.size} m²</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-heading text-2xl font-semibold text-terracotta-500">
                      €{cottage.pricePerNight}
                    </p>
                    <p className="text-xs text-brown-500">per night</p>
                  </div>
                  <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 whitespace-nowrap">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-brown-500 mt-6 italic">
          Booking backend coming in Phase 4. Contact us directly to reserve.
        </p>
      </section>
    </div>
  );
}
