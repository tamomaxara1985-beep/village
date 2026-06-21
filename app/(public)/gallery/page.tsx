import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse our photo gallery — cottages, gardens, dining, and the natural beauty of HOTEL_NAME.",
};

const categories = ["All", "Cottages", "Gardens", "Dining", "Views"];

const placeholderImages = [
  { label: "Garden Cottage exterior", gradient: "linear-gradient(135deg, #7a9b6a 0%, #a8c896 100%)", span: "col-span-1 row-span-1" },
  { label: "Terrace at sunset", gradient: "linear-gradient(135deg, #c2714f 0%, #e8a882 100%)", span: "col-span-1 row-span-2" },
  { label: "Premium Villa terrace", gradient: "linear-gradient(135deg, #8a5e4a 0%, #c2714f 100%)", span: "col-span-1 row-span-1" },
  { label: "Restaurant dining room", gradient: "linear-gradient(135deg, #9d5a3a 0%, #dda882 100%)", span: "col-span-1 row-span-1" },
  { label: "Garden walkway", gradient: "linear-gradient(135deg, #5c7a4a 0%, #8ab870 100%)", span: "col-span-1 row-span-1" },
  { label: "Cottage interior", gradient: "linear-gradient(135deg, #c8b89a 0%, #f0ebe3 100%)", span: "col-span-1 row-span-1" },
  { label: "Herb garden", gradient: "linear-gradient(135deg, #6b8f5a 0%, #b0cc96 100%)", span: "col-span-1 row-span-2" },
  { label: "Villa whirlpool", gradient: "linear-gradient(135deg, #4a6b8a 0%, #7aabca 100%)", span: "col-span-1 row-span-1" },
  { label: "Courtyard morning", gradient: "linear-gradient(135deg, #d4896a 0%, #f0d4b8 100%)", span: "col-span-1 row-span-1" },
];

export default function GalleryPage() {
  return (
    <div className="bg-warm-50">
      {/* Page Header */}
      <section className="py-20 bg-warm-100 text-center px-4">
        <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
          Visual Tour
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-brown-900 mb-4">
          Photo Gallery
        </h1>
        <p className="text-brown-700 max-w-xl mx-auto leading-relaxed">
          A glimpse into life at HOTEL_NAME — cottages bathed in warm light,
          gardens in full bloom, and tables set for unhurried meals.
        </p>
      </section>

      {/* Category Filter (static for Phase 1) */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-terracotta-500 text-warm-50"
                  : "bg-warm-100 text-brown-700 hover:bg-warm-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
          {placeholderImages.map((img, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${img.span}`}
              style={{ background: img.gradient }}
              title={img.label}
            >
              <div className="w-full h-full flex items-end p-3 bg-gradient-to-t from-brown-900/40 to-transparent">
                <span className="text-warm-50 text-xs font-medium opacity-80">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-brown-500 mt-8 italic">
          Real photography will replace placeholders before launch.
        </p>
      </section>
    </div>
  );
}
