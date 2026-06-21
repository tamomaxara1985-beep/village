export interface Cottage {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  amenities: string[];
  highlights: string[];
  category: "garden" | "terrace" | "villa";
  featured: boolean;
}

export const cottages: Cottage[] = [
  {
    slug: "garden-cottage",
    name: "Garden Cottage",
    tagline: "Peaceful garden views and rustic charm",
    description:
      "A cozy retreat surrounded by blooming gardens, perfect for couples seeking tranquility.",
    longDescription:
      "Nestled among fragrant herbs and blossoming flowers, the Garden Cottage offers a serene escape from the everyday. Wake up to birdsong and the gentle scent of lavender drifting through your window. This intimate cottage features handcrafted wooden furniture, terracotta tile floors, and a private patio where you can enjoy your morning coffee in perfect solitude.",
    pricePerNight: 150,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    size: 45,
    amenities: [
      "Free WiFi",
      "Air conditioning",
      "Private patio",
      "Garden view",
      "Kitchenette",
      "Flat-screen TV",
      "Daily housekeeping",
      "Artisan toiletries",
    ],
    highlights: ["Private garden patio", "Garden-view windows", "Handcrafted décor"],
    category: "garden",
    featured: true,
  },
  {
    slug: "terrace-cottage",
    name: "Terrace Cottage",
    tagline: "Private terrace with panoramic courtyard views",
    description:
      "An elevated retreat with a generous private terrace overlooking the sun-drenched courtyard.",
    longDescription:
      "Step onto your own private terrace and breathe in the warm Mediterranean air. The Terrace Cottage combines elegant interior design with an expansive outdoor living space — ideal for al fresco dining at sunset or simply lounging with a good book. Inside, warm earth tones, linen fabrics, and local artisan touches create a space that feels both luxurious and genuinely home-like.",
    pricePerNight: 220,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    size: 60,
    amenities: [
      "Free WiFi",
      "Air conditioning",
      "Private terrace with outdoor furniture",
      "Courtyard view",
      "Kitchenette",
      "Flat-screen TV",
      "Daily housekeeping",
      "Artisan toiletries",
      "Nespresso machine",
      "Minibar",
    ],
    highlights: ["Large private terrace", "Outdoor dining area", "Sunset views"],
    category: "terrace",
    featured: true,
  },
  {
    slug: "premium-villa-cottage",
    name: "Premium Villa Cottage",
    tagline: "Spacious luxury with full villa amenities",
    description:
      "Our finest cottage — a full villa experience with sweeping views and premium finishes throughout.",
    longDescription:
      "The Premium Villa Cottage is the pinnacle of our hospitality. Spanning two levels, it features a master bedroom with king-size bed, a fully equipped kitchen, a living and dining area, and a sprawling private terrace with a whirlpool. Every detail has been considered: from the hand-woven textiles to the curated selection of local wines waiting on arrival. This is not just a room — it is an experience.",
    pricePerNight: 350,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    size: 110,
    amenities: [
      "Free WiFi",
      "Air conditioning & underfloor heating",
      "Private terrace with whirlpool",
      "Panoramic views",
      "Full kitchen",
      "Living & dining area",
      "Two flat-screen TVs",
      "Daily housekeeping + turndown service",
      "Premium artisan toiletries",
      "Nespresso machine",
      "Stocked minibar",
      "Welcome wine & local products",
    ],
    highlights: [
      "Private whirlpool terrace",
      "Two-level layout",
      "Panoramic views",
      "Welcome amenity basket",
    ],
    category: "villa",
    featured: true,
  },
];

export function getCottageBySlug(slug: string): Cottage | undefined {
  return cottages.find((c) => c.slug === slug);
}
