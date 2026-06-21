import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileNavWrapper from "./MobileNavWrapper";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/cottages", label: "Cottages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-warm-50/90 backdrop-blur-md border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl font-semibold text-brown-900 tracking-wide">
            HOTEL_NAME
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brown-700 hover:text-terracotta-500 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Book Now + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link href="/booking" className="hidden md:block">
              <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 rounded-full px-5 text-sm font-medium transition-colors duration-200">
                Book Now
              </Button>
            </Link>
            <MobileNavWrapper links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
