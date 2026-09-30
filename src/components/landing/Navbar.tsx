"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F8FA] border-b border-black/[0.08] text-[#0B1440]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logos/logo.jpeg"
            alt="Kalkii Forex Education"
            width={150}
            height={60}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-[15px] font-medium">

          {/* 1. Company Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-8 group-hover:text-[#2F6FFF] transition-colors">
              Company
              <ChevronDownIcon className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-2 top-[68px] bg-white border border-black/[0.08] rounded-xl shadow-xl py-2 min-w-[200px] hidden group-hover:block">
              <Link href="#about" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">About Kalkii</Link>
              <Link href="#why" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Why Kalkii</Link>
              <Link href="#mentors" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Mentors</Link>
              <Link href="#careers" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Careers</Link>
              <Link href="#contact" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Contact</Link>
            </div>
          </div>

          {/* 2. Curriculum Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-8 group-hover:text-[#2F6FFF] transition-colors">
              Curriculum
              <ChevronDownIcon className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-2 top-[68px] bg-white border border-black/[0.08] rounded-xl shadow-xl py-2 min-w-[220px] hidden group-hover:block">
              <Link href="#phase-01" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Forex Foundations</Link>
              <Link href="#phase-02" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Technical Analysis</Link>
              <Link href="#phase-03" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Macro & Fundamentals</Link>
              <Link href="#phase-04" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Risk & Position Sizing</Link>
              <Link href="#phase-05" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Trading Psychology</Link>
              <Link href="#phase-06" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Applied Practice Lab</Link>
            </div>
          </div>

          {/* 3. Markets Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-8 group-hover:text-[#2F6FFF] transition-colors">
              Markets
              <ChevronDownIcon className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-2 top-[68px] bg-white border border-black/[0.08] rounded-xl shadow-xl py-2 min-w-[200px] hidden group-hover:block">
              <Link href="#markets" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Majors</Link>
              <Link href="#markets" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Minors & Exotics</Link>
              <Link href="#markets" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Gold & Commodities</Link>
            </div>
          </div>

          {/* 4. Learn Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-8 group-hover:text-[#2F6FFF] transition-colors">
              Learn
              <ChevronDownIcon className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-2 top-[68px] bg-white border border-black/[0.08] rounded-xl shadow-xl py-2 min-w-[200px] hidden group-hover:block">
              <Link href="#faq" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">FAQs</Link>
              <Link href="#curriculum" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">Curriculum guide</Link>
              <Link href="#about" className="block px-4 py-2.5 text-sm text-[#0B1440]/70 hover:bg-[#2F6FFF]/[0.06] hover:text-[#2F6FFF]">About Kalkii</Link>
            </div>
          </div>

          {/* Simple Links */}
          <Link href="#reviews" className="px-4 py-8 hover:text-[#2F6FFF] transition-colors">Reviews</Link>
          <Link href="#faq" className="px-4 py-8 hover:text-[#2F6FFF] transition-colors">FAQ</Link>
          <Link href="#contact" className="px-4 py-8 hover:text-[#2F6FFF] transition-colors">Contact</Link>
        </nav>



        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="p-2 text-[#0B1440] focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon />}
          </button>

          {isMobileMenuOpen && (
            <div
              id="mobile-navigation"
              className="fixed inset-x-0 top-0 z-[60] max-h-[100dvh] overflow-y-auto border-b border-black/[0.08] bg-white text-[#0B1440] shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-black/[0.08] px-6 py-4">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="shrink-0">
                  <Image
                    src="/logos/logo.jpeg"
                    alt="Kalkii Forex Education"
                    width={150}
                    height={60}
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] text-[#0B1440] transition-colors hover:bg-black/[0.04]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="px-6 py-3">
                <div className="flex flex-col text-[15px] text-[#0B1440]/80">
                  {([
                    ["Company", "#about"],
                    ["Curriculum", "#curriculum"],
                    ["Markets", "#markets"],
                    ["Reviews", "#reviews"],
                    ["FAQ", "#faq"],
                    ["Contact", "#contact"],
                  ] as const).map(([label, href]) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="border-b border-black/[0.06] py-3.5 transition-colors last:border-b-0 hover:text-[#2F6FFF]"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </nav>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}

// --- Static SVG Icons ---
function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`opacity-60 ${className}`}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}