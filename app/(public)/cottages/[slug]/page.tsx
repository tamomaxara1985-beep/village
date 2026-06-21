import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cottages, getCottageBySlug } from "@/lib/data/cottages";
import {
  Users,
  BedDouble,
  Bath,
  Maximize2,
  Check,
  ArrowLeft,
  Star,
} from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cottages.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cottage = getCottageBySlug(slug);
  if (!cottage) return {};
  return {
    title: cottage.name,
    description: cottage.description,
  };
}

export default async function CottageDetailPage({ params }: Props) {
  const { slug } = await params;
  const cottage = getCottageBySlug(slug);
  if (!cottage) notFound();

  const gradients: Record<string, string> = {
    garden: "linear-gradient(135deg, #7a9b6a 0%, #a8c896 100%)",
    terrace: "linear-gradient(135deg, #c2714f 0%, #e8a882 100%)",
    villa: "linear-gradient(135deg, #8a5e4a 0%, #c2714f 60%, #e8c4a8 100%)",
  };

  return (
    <div className="bg-warm-50 min-h-screen">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-2">
        <Link
          href="/cottages"
          className="inline-flex items-center gap-1.5 text-sm text-brown-600 hover:text-terracotta-500 transition-colors"
        >
          <ArrowLeft size={14} />
          All Cottages
        </Link>
      </div>

      {/* Hero image */}
      <div
        className="h-72 sm:h-96 w-full"
        style={{ background: gradients[cottage.category] }}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-terracotta-500 text-xs font-medium tracking-widest uppercase mb-1">
                  {cottage.category} cottage
                </p>
                <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-brown-900">
                  {cottage.name}
                </h1>
                <p className="text-brown-600 italic mt-1">{cottage.tagline}</p>
              </div>
              <div className="text-right">
                <p className="font-heading text-3xl font-semibold text-terracotta-500">
                  €{cottage.pricePerNight}
                </p>
                <p className="text-sm text-brown-600">per night</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-5 mb-8 text-sm text-brown-700">
              <span className="flex items-center gap-1.5">
                <Users size={15} className="text-terracotta-500" />
                Up to {cottage.maxGuests} guests
              </span>
              <span className="flex items-center gap-1.5">
                <BedDouble size={15} className="text-terracotta-500" />
                {cottage.bedrooms} bedroom{cottage.bedrooms > 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <Bath size={15} className="text-terracotta-500" />
                {cottage.bathrooms} bathroom{cottage.bathrooms > 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize2 size={15} className="text-terracotta-500" />
                {cottage.size} m²
              </span>
            </div>

            <Separator className="bg-warm-200 mb-8" />

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-semibold text-brown-900 mb-3">
                About this cottage
              </h2>
              <p className="text-brown-700 leading-relaxed">{cottage.longDescription}</p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-semibold text-brown-900 mb-4">
                Highlights
              </h2>
              <div className="flex flex-wrap gap-2">
                {cottage.highlights.map((h) => (
                  <Badge
                    key={h}
                    className="bg-terracotta-50 text-terracotta-700 border border-terracotta-200 text-sm"
                  >
                    <Star size={11} className="mr-1" />
                    {h}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-brown-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cottage.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-brown-700">
                    <Check size={14} className="text-terracotta-500 shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-warm-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-heading text-2xl font-semibold text-brown-900 mb-1">
                Reserve Your Stay
              </h3>
              <p className="text-sm text-brown-600 mb-6">
                Starting from{" "}
                <span className="text-terracotta-500 font-semibold text-base">
                  €{cottage.pricePerNight}
                </span>{" "}
                / night
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-brown-700">
                  <span>Max guests</span>
                  <span className="font-medium">{cottage.maxGuests}</span>
                </div>
                <div className="flex justify-between text-sm text-brown-700">
                  <span>Size</span>
                  <span className="font-medium">{cottage.size} m²</span>
                </div>
                <div className="flex justify-between text-sm text-brown-700">
                  <span>Bedrooms</span>
                  <span className="font-medium">{cottage.bedrooms}</span>
                </div>
              </div>

              <Link href={`/booking?cottage=${cottage.slug}`}>
                <Button className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 rounded-lg py-5 text-base font-medium">
                  Check Availability
                </Button>
              </Link>

              <p className="text-xs text-center text-brown-500 mt-3">
                Free cancellation up to 48 hours before check-in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
