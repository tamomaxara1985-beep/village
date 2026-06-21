import type { Metadata } from "next";
import { Car, Bus, Plane, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Location & Map",
  description:
    "Find HOTEL_NAME — directions, nearby attractions, and how to reach us.",
};

const nearbyAttractions = [
  { name: "Old Town Historic Centre", distance: "2 km", type: "Culture" },
  { name: "Local Fish Market", distance: "1.5 km", type: "Food" },
  { name: "Hilltop Viewpoint", distance: "4 km", type: "Nature" },
  { name: "Ancient Ruins", distance: "6 km", type: "History" },
  { name: "Sandy Beach", distance: "8 km", type: "Beach" },
  { name: "Winery & Vineyard Tour", distance: "12 km", type: "Experience" },
];

const gettingHere = [
  {
    icon: Plane,
    method: "By Air",
    desc: "Nearest airport is HOTEL_CITY Airport (approximately 30 minutes by car). We can arrange private transfers on request.",
  },
  {
    icon: Car,
    method: "By Car",
    desc: "We have private on-site parking. From the city centre, follow signs toward HOTEL_DISTRICT and look for HOTEL_NAME signage.",
  },
  {
    icon: Bus,
    method: "By Bus",
    desc: "Local bus lines stop 300 m from the property. Ask our team for current timetables.",
  },
];

export default function LocationPage() {
  return (
    <div className="bg-warm-50">
      {/* Page Header */}
      <section className="py-20 bg-warm-100 text-center px-4">
        <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
          Find Us
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-brown-900 mb-4">
          Location & Map
        </h1>
        <p className="text-brown-700 max-w-xl mx-auto leading-relaxed">
          Set in the heart of HOTEL_CITY, HOTEL_NAME is perfectly located to
          explore the region while remaining a peaceful retreat from the world.
        </p>
      </section>

      {/* Map */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div
          className="w-full h-80 md:h-96 rounded-xl overflow-hidden border border-warm-200 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #c8d8c0 0%, #a8c8a0 50%, #98b890 100%)",
          }}
        >
          <div className="text-center">
            <MapPin size={32} className="text-terracotta-500 mx-auto mb-2" />
            <p className="text-brown-800 font-medium">HOTEL_NAME</p>
            <p className="text-sm text-brown-600">
              Replace with Google Maps embed before launch
            </p>
          </div>
        </div>
        <p className="text-center text-sm text-brown-600 mt-3">
          <strong>Address:</strong> HOTEL_ADDRESS, HOTEL_CITY, HOTEL_COUNTRY
        </p>
      </section>

      {/* Getting Here */}
      <section className="py-16 bg-warm-100 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-semibold text-brown-900 mb-10 text-center">
            Getting Here
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {gettingHere.map(({ icon: Icon, method, desc }) => (
              <div
                key={method}
                className="bg-white rounded-xl p-6 border border-warm-200 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracotta-500/10 text-terracotta-500 mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-brown-900 mb-2">
                  {method}
                </h3>
                <p className="text-sm text-brown-700 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl font-semibold text-brown-900 mb-8 text-center">
          Nearby Attractions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nearbyAttractions.map(({ name, distance, type }) => (
            <div
              key={name}
              className="flex items-center justify-between bg-white border border-warm-200 rounded-lg px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-terracotta-500 shrink-0" />
                <div>
                  <p className="font-medium text-brown-900 text-sm">{name}</p>
                  <p className="text-xs text-brown-500">{type}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-terracotta-600 bg-terracotta-50 px-2 py-1 rounded-full">
                {distance}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
