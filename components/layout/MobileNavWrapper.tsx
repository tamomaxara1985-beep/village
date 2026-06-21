"use client";
// Client component wrapper so `ssr: false` is legal here.
// Prevents Radix UI Sheet Portal from causing hydration mismatches.
import dynamic from "next/dynamic";

const MobileNav = dynamic(() => import("./MobileNav"), { ssr: false });

interface NavLink {
  href: string;
  label: string;
}

export default function MobileNavWrapper({ links }: { links: NavLink[] }) {
  return <MobileNav links={links} />;
}
