import Link from "next/link";
import { MapPin, Phone, Mail, Share2, Camera } from "lucide-react";

const quickLinks = [
  { href: "/cottages", label: "Cottages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/restaurant", label: "Restaurant & Amenities" },
  { href: "/about", label: "About Us" },
  { href: "/location", label: "Location & Map" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-warm-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-3xl font-semibold text-warm-50 mb-3 tracking-wide">
              HOTEL_NAME
            </h3>
            <p className="text-warm-300 text-sm leading-relaxed mb-5">
              A boutique cottage resort in HOTEL_CITY. Where warmth, nature,
              and Mediterranean hospitality come together for an unforgettable stay.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="text-warm-300 hover:text-terracotta-300 transition-colors"
              >
                <Share2 size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-warm-300 hover:text-terracotta-300 transition-colors"
              >
                <Camera size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-warm-50 mb-5">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-300 hover:text-terracotta-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-warm-50 mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-warm-300">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-terracotta-400"
                />
                <span>
                  HOTEL_ADDRESS
                  <br />
                  HOTEL_CITY, HOTEL_COUNTRY
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-warm-300">
                <Phone size={15} className="shrink-0 text-terracotta-400" />
                <a href="tel:HOTEL_PHONE" className="hover:text-terracotta-300 transition-colors">
                  HOTEL_PHONE
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-warm-300">
                <Mail size={15} className="shrink-0 text-terracotta-400" />
                <a
                  href="mailto:HOTEL_EMAIL"
                  className="hover:text-terracotta-300 transition-colors"
                >
                  HOTEL_EMAIL
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brown-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-warm-300">
          <span>© {new Date().getFullYear()} HOTEL_NAME. All rights reserved.</span>
          <span>Designed with warmth in HOTEL_CITY</span>
        </div>
      </div>
    </footer>
  );
}
