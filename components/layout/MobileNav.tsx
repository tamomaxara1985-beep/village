"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavLink {
  href: string;
  label: string;
}

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-2 text-brown-900 hover:text-terracotta-500 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-warm-50 border-warm-200">
        <SheetTitle className="font-heading text-2xl font-semibold text-brown-900 mb-8">
          HOTEL_NAME
        </SheetTitle>
        <nav className="flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-brown-700 hover:text-terracotta-500 transition-colors border-b border-warm-200 last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="mt-6"
          >
            <Button className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-warm-50">
              Book Now
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
