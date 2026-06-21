import type { Metadata } from "next";
import { Heart, Leaf, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind HOTEL_NAME — our passion for hospitality, love of nature, and commitment to authentic Mediterranean experiences.",
};

const values = [
  {
    icon: Heart,
    title: "Warm Hospitality",
    desc: "Every guest is welcomed like a long-awaited friend. We believe genuine warmth is the finest luxury.",
  },
  {
    icon: Leaf,
    title: "Connected to Nature",
    desc: "Our cottages are nestled within gardens and natural landscapes — we protect and celebrate the beauty around us.",
  },
  {
    icon: Users,
    title: "Family Spirit",
    desc: "Run by a family with deep roots in the region, we share our culture, cuisine, and stories with every guest.",
  },
  {
    icon: Award,
    title: "Authentic Quality",
    desc: "From handcrafted furniture to locally sourced breakfasts — every detail reflects our commitment to authenticity.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-warm-50">
      {/* Hero */}
      <section className="py-20 bg-warm-100 text-center px-4">
        <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
          Our Story
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-brown-900 mb-4">
          About HOTEL_NAME
        </h1>
        <p className="text-brown-700 max-w-xl mx-auto leading-relaxed">
          More than a place to sleep — a place to belong, even if only for a
          few days.
        </p>
      </section>

      {/* Story */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-brown-900 mb-5">
              How It All Began
            </h2>
            <div className="space-y-4 text-brown-700 leading-relaxed">
              <p>
                HOTEL_NAME was born from a simple dream: to create a place
                where travellers could slow down, breathe deeply, and feel the
                warmth of true Mediterranean hospitality.
              </p>
              <p>
                What began as a family estate has grown — carefully, lovingly —
                into a boutique cottage resort. Every stone was laid with
                purpose, every garden planted with patience.
              </p>
              <p>
                Today, we welcome guests from around the world who come seeking
                rest, beauty, and a genuine connection to place. We are proud to
                share our corner of the world with you.
              </p>
            </div>
          </div>

          {/* Image placeholder */}
          <div
            className="h-72 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #c2714f 0%, #e8a882 60%, #f0ebe3 100%)",
            }}
          />
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-warm-100 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
              What Guides Us
            </p>
            <h2 className="font-heading text-4xl font-semibold text-brown-900">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5">
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-terracotta-500/10 text-terracotta-500 mt-0.5">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-brown-900 mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-brown-700 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Property */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
          The Property
        </p>
        <h2 className="font-heading text-4xl font-semibold text-brown-900 mb-5">
          A Place Apart
        </h2>
        <p className="text-brown-700 leading-relaxed max-w-2xl mx-auto mb-8">
          Set among fragrant gardens in HOTEL_CITY, the resort spans a peaceful
          estate with three distinct cottage types. Our grounds include
          landscaped gardens, shaded terraces, a garden restaurant, and quiet
          corners designed for moments of reflection.
        </p>

        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[
            { num: "3", label: "Cottages" },
            { num: "∞", label: "Moments" },
            { num: "1", label: "Family" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading text-4xl font-semibold text-terracotta-500">{num}</p>
              <p className="text-sm text-brown-700 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
