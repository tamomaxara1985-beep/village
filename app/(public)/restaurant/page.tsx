import type { Metadata } from "next";
import {
  UtensilsCrossed,
  Wifi,
  Flower2,
  Car,
  Sun,
  Coffee,
  ShieldCheck,
  Waves,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Restaurant & Amenities",
  description:
    "Enjoy farm-to-table Mediterranean cuisine and resort amenities at HOTEL_NAME.",
};

const amenities = [
  { icon: Wifi, title: "Free WiFi", desc: "High-speed internet throughout the property." },
  { icon: Flower2, title: "Landscaped Gardens", desc: "Herb gardens, flowering beds, and shaded walkways." },
  { icon: Sun, title: "Sun Terraces", desc: "Multiple outdoor spaces perfect for lounging and reading." },
  { icon: Coffee, title: "Morning Coffee Station", desc: "Complimentary coffee and tea served each morning." },
  { icon: Car, title: "Private Parking", desc: "Secure on-site parking for all guests." },
  { icon: Waves, title: "Courtyard Fountain", desc: "A central courtyard with a calming stone fountain." },
  { icon: ShieldCheck, title: "24h Reception", desc: "Our team is available around the clock for your needs." },
  { icon: Sun, title: "Daily Housekeeping", desc: "Fresh linens and meticulous daily service in every cottage." },
];

const menuHighlights = [
  {
    category: "Breakfast",
    items: [
      "Fresh-baked sourdough with local honey and butter",
      "Garden herb omelette with feta and sun-dried tomatoes",
      "Seasonal fruit platter with Greek yoghurt",
      "Cold cuts, local cheeses, and marinated olives",
    ],
  },
  {
    category: "Lunch & Dinner",
    items: [
      "Grilled catch of the day with lemon-caper butter and herbs",
      "Slow-roasted lamb with rosemary and root vegetables",
      "Charred aubergine with tahini, pomegranate, and pine nuts",
      "House pasta with foraged mushrooms and aged pecorino",
    ],
  },
  {
    category: "Drinks",
    items: [
      "Curated selection of local and regional wines",
      "House cocktails featuring fresh botanicals",
      "Fresh-pressed juices and artisan lemonades",
      "Fine spirits and digestifs",
    ],
  },
];

export default function RestaurantPage() {
  return (
    <div className="bg-warm-50">
      {/* Hero */}
      <section className="py-20 bg-warm-100 text-center px-4">
        <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
          Dining & Facilities
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-brown-900 mb-4">
          Restaurant & Amenities
        </h1>
        <p className="text-brown-700 max-w-xl mx-auto leading-relaxed">
          Savour the flavours of the region in our garden restaurant, and enjoy
          every comfort the property has to offer.
        </p>
      </section>

      {/* Restaurant Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-terracotta-500 text-xs font-medium tracking-widest uppercase mb-2">
              Farm-to-Table
            </p>
            <h2 className="font-heading text-4xl font-semibold text-brown-900 mb-5">
              The Garden Restaurant
            </h2>
            <div className="space-y-4 text-brown-700 leading-relaxed">
              <p>
                Our kitchen celebrates the honest, sun-drenched flavours of the
                Mediterranean. Every dish begins with seasonal ingredients
                sourced from local farmers, fishermen, and our own herb gardens.
              </p>
              <p>
                Breakfast is served on the courtyard terrace each morning.
                Lunch and dinner are relaxed affairs — unhurried, generous, and
                full of flavour. We welcome both guests and outside visitors by
                reservation.
              </p>
            </div>
          </div>
          <div
            className="h-72 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #9d5a3a 0%, #dda882 80%, #f0ebe3 100%)",
            }}
          />
        </div>

        {/* Menu Highlights */}
        <div>
          <h3 className="font-heading text-3xl font-semibold text-brown-900 mb-8 text-center">
            Menu Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuHighlights.map(({ category, items }) => (
              <div key={category} className="bg-white rounded-xl p-6 border border-warm-200">
                <div className="flex items-center gap-2 mb-4">
                  <UtensilsCrossed size={16} className="text-terracotta-500" />
                  <h4 className="font-heading text-xl font-semibold text-brown-900">
                    {category}
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-brown-700 leading-relaxed border-b border-warm-100 pb-2 last:border-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-brown-500 mt-5 italic">
            Menu changes seasonally. Dietary requirements accommodated with notice.
          </p>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-20 bg-warm-100 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
              Property Facilities
            </p>
            <h2 className="font-heading text-4xl font-semibold text-brown-900">
              Resort Amenities
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
            {amenities.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-5 border border-warm-200 text-center hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-terracotta-500/10 text-terracotta-500 mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-brown-900 mb-1">
                  {title}
                </h3>
                <p className="text-xs text-brown-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
