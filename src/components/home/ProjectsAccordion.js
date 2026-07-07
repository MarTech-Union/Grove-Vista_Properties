"use client";

import { useState } from "react";
import Link from "next/link";

const OVERLAY_ACTIVE =
  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(11,18,32,0.45) 50%, #0b1220 100%)";
const SLIDE_TRANSITION =
  "max-width 0.75s cubic-bezier(.4,0,.2,1), max-height 0.75s cubic-bezier(.4,0,.2,1), text-shadow 0.75s cubic-bezier(.4,0,.2,1)";

const projects = [
  {
    slug: "lodha-altamount",
    title: "Lodha Altamount",
    developer: "Lodha Group",
    description:
      "Ultra-luxury sky residences perched on Altamount Road — India's most coveted address. Private pools, curated art installations, and panoramic city views across 3 floors of bespoke living.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",
    href: "/lodha-group",
    badges: [
      { label: "Private Pool", icon: "🏊" },
      { label: "Smart Home", icon: "🏠" },
      { label: "Concierge", icon: "🛎" },
    ],
    location: "Altamount Road, Mumbai",
    price: "From INR 25 Cr",
  },
  {
    slug: "oberoi-three-sixty-west",
    title: "Oberoi 360 West",
    developer: "Oberoi Realty",
    description:
      "Iconic skyscraper rising above Worli, Mumbai — offering 360-degree views of the Arabian Sea and city skyline. Each residence is a masterpiece of spatial design with hotel-grade amenities.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    href: "/oberoi-realty",
    badges: [
      { label: "Sea View", icon: "🌊" },
      { label: "Sky Lounge", icon: "🌆" },
      { label: "Helipad", icon: "🚁" },
    ],
    location: "Worli, Mumbai",
    price: "From INR 18 Cr",
  },
  {
    slug: "godrej-reserve",
    title: "Godrej Reserve",
    developer: "Godrej Properties",
    description:
      "A sanctuary of verdant living spread across 90 acres in Kandivali. Residences surrounded by a private forest reserve, with resort-style amenities and impeccable Godrej craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    href: "/godrej-properties",
    badges: [
      { label: "Forest Reserve", icon: "🌿" },
      { label: "Club House", icon: "🏌️" },
      { label: "24/7 Security", icon: "🔒" },
    ],
    location: "Kandivali East, Mumbai",
    price: "From INR 5 Cr",
  },
  {
    slug: "piramal-aranya",
    title: "Piramal Aranya",
    developer: "Piramal Realty",
    description:
      "A forest-inspired masterpiece in the heart of Byculla. Piramal Aranya offers floor-to-ceiling windows, sky bridges, and lush hanging gardens — redefining urban luxury in Central Mumbai.",
    image:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1400&q=80",
    href: "/piramal-realty",
    badges: [
      { label: "Sky Bridge", icon: "🌉" },
      { label: "Hanging Gardens", icon: "🌺" },
      { label: "Spa & Wellness", icon: "💆" },
    ],
    location: "Byculla, Mumbai",
    price: "From INR 4 Cr",
  },
  {
    slug: "marathon-nexzone",
    title: "Marathon Nexzone",
    developer: "Marathon Group",
    description:
      "A fully integrated township in Panvel offering lifestyle residences with world-class social infrastructure — schools, hospitals, retail, and green zones — all within one self-sufficient community.",
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1400&q=80",
    href: "/marathon-group",
    badges: [
      { label: "Township", icon: "🏙️" },
      { label: "Green Zones", icon: "🌳" },
      { label: "Retail Hub", icon: "🛍️" },
    ],
    location: "Panvel, Navi Mumbai",
    price: "From INR 75 L",
  },
];

function PlusCircle() {
  return (
    <div className="w-9 h-9 rounded-full border-2 border-white/70 flex items-center justify-center transition-all duration-300">
      <svg
        width="14"
        height="14"
        viewBox="0 0 32 32"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="M16 2 L16 30 M2 16 L30 16" />
      </svg>
    </div>
  );
}

export default function ProjectsAccordion() {
  const [active, setActive] = useState(0);
  const [hoveredPill, setHoveredPill] = useState(null);

  return (
    <section className="bg-white py-20 lg:px-8 2xl:py-28">
 <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 2xl:max-w-screen-2xl">

        {/* ── Heading ── */}
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400 mb-3">
              Landmark Properties
            </p>
            <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Projects that define luxury living.
            </h2>
          </div>
        </div>

        {/* ── Desktop: horizontal accordion ── */}
        <div className="hidden lg:flex gap-3 h-[595px]">
          {projects.map((project, i) => {
            const isActive = i === active;

            return (
              <div
                key={project.slug}
                onClick={() => !isActive && setActive(i)}
                onMouseEnter={() => !isActive && setHoveredPill(i)}
                onMouseLeave={() => setHoveredPill(null)}
                className="relative overflow-hidden rounded-2xl w-full"
                style={{
                  maxWidth: isActive ? 860 : hoveredPill === i ? 175 : 126,
                  minWidth: isActive ? 0 : 126,
                  height: 595,
                  cursor: isActive ? "default" : "pointer",
                  willChange: "max-width",
                  transform: "translateZ(0)",
                  transition: SLIDE_TRANSITION,
                  flexShrink: isActive ? 1 : 0,
                }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${project.image}")`,
                    transform: !isActive && hoveredPill === i ? "scale(1.07)" : "scale(1)",
                    transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
                  }}
                />

                {/* Inactive overlay */}
                <div
                  className="absolute inset-0 backdrop-blur-[15px]"
                  style={{
                    background: !isActive && hoveredPill === i
                      ? "rgba(11,18,32,0.15)"
                      : "rgba(11,18,32,0.35)",
                    opacity: isActive ? 0 : 1,
                    transition: "opacity 0.75s cubic-bezier(.4,0,.2,1), background 0.35s ease",
                  }}
                />

                {/* Active gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: OVERLAY_ACTIVE,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.75s cubic-bezier(.4,0,.2,1)",
                  }}
                />

                {/* Floating amenity badges — active only */}
                {project.badges.map((badge, bi) => (
                  <div
                    key={badge.label}
                    className="absolute z-10 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 shadow-xl border border-white/50 backdrop-blur-sm"
                    style={{
                      left: bi === 0 ? "5%" : bi === 1 ? "55%" : "28%",
                      top: bi === 0 ? "12%" : bi === 1 ? "8%" : "22%",
                      opacity: isActive ? 1 : 0,
                      transition: `opacity 0.75s cubic-bezier(.4,0,.2,1) ${bi * 80}ms`,
                    }}
                  >
                    <span className="text-base leading-none">{badge.icon}</span>
                    <span className="text-xs font-bold text-slate-800 whitespace-nowrap">{badge.label}</span>
                  </div>
                ))}

                {/* Active: details at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-10 pb-8 z-10"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.75s cubic-bezier(.4,0,.2,1)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {project.developer}
                  </p>
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">
                    {project.location}
                  </p>
                  <h2 className="text-white font-serif font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-tight mb-1">
                    {project.title}
                  </h2>
                  <p className="text-white/65 text-sm leading-relaxed line-clamp-2 max-w-[560px] mb-2">
                    {project.description}
                  </p>
                  <p className="text-green-400 text-sm font-bold mb-5">{project.price}</p>
                  <Link
                    href={project.href}
                    tabIndex={isActive ? 0 : -1}
                    className="inline-block bg-white text-[#0b1220] border border-white h-[46px] leading-[42px] no-underline px-[25px] text-sm font-bold whitespace-nowrap hover:bg-transparent hover:text-white hover:border-white transition-all duration-500 rounded-lg"
                  >
                    Explore Project
                  </Link>
                </div>

                {/* Inactive: vertical title + plus */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-between py-8 z-10"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: "opacity 0.75s cubic-bezier(.4,0,.2,1)",
                    pointerEvents: isActive ? "none" : "auto",
                  }}
                >
                  <span
                    className="text-white font-semibold text-[13px] tracking-[0.18em] uppercase select-none [writing-mode:vertical-lr]"
                    style={{
                      textShadow: hoveredPill === i ? "0 0 12px #fff" : "0 1px 4px rgba(0,0,0,0.3)",
                      transition: "text-shadow 0.4s cubic-bezier(.4,0,.2,1)",
                    }}
                  >
                    {project.title}
                  </span>

                  <div
                    style={{
                      transform: hoveredPill === i ? "translateY(0) scale(1.15)" : "translateY(6px) scale(1)",
                      opacity: hoveredPill === i ? 1 : 0.6,
                      transition: "transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s ease",
                    }}
                  >
                    <PlusCircle />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile & Tablet: grid stack ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
          {projects.map((project) => (
            <div key={project.slug} className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div
                className="relative h-52 bg-cover bg-center"
                style={{ backgroundImage: `url("${project.image}")` }}
              >
                <div className="absolute inset-0" style={{ background: OVERLAY_ACTIVE }} />
                <div className="absolute bottom-4 left-5 z-10">
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-0.5">
                    {project.developer}
                  </p>
                  <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {project.location}
                  </p>
                  <h3 className="text-white font-serif text-xl font-bold">{project.title}</h3>
                </div>
              </div>
              <div className="bg-white p-5">
                <p className="text-green-600 text-sm font-bold mb-2">{project.price}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                <Link
                  href={project.href}
                  className="inline-block bg-[#0b1220] text-white px-5 py-2.5 text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explore Project
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

